import logging
from fastapi import FastAPI, UploadFile, File, Body, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from config import settings

import requests
from resume_parser import extract_text
from job_recommender import load_jobs, find_matching_jobs
import os
from db import get_db_connection, create_tables



app = FastAPI()
# --- New Endpoints for Resume History & Analytics ---
from fastapi.responses import JSONResponse

# --- AI Resume Enhancement Endpoint (Cohere) ---
class EnhanceRequest(BaseModel):
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[List[str]] = None
    education: Optional[List[str]] = None
    section: Optional[str] = None  # If only one section to enhance
    action: Optional[str] = None   # 'improve', 'generate', etc.

@app.post("/enhance_resume")
async def enhance_resume(data: EnhanceRequest):
    """
    Uses Cohere API to suggest improvements or auto-generate resume sections.
    """
    # cohere_api_key = os.getenv("COHERE_API_KEY", "test_key")  # Replace with your actual key
    cohere_api_key = settings.COHERE_API_KEY
    if not cohere_api_key:
        return {"error": "Cohere API key not set in environment variable COHERE_API_KEY."}

    if data.action == 'generate':
        if data.section == 'summary':
            prompt = f"Generate a professional, concise resume summary for this background.\nSkills: {', '.join(data.skills or [])}\nExperience: {', '.join(data.experience or [])}\nEducation: {', '.join(data.education or [])}"
        elif data.section == 'skills':
            prompt = f"Generate a list of 8-12 key skills for this candidate.\nExperience: {', '.join(data.experience or [])}\nEducation: {', '.join(data.education or [])}"
        elif data.section == 'experience':
            prompt = f"Generate 3-5 impactful, quantified bullet points for this job experience.\nExperience: {', '.join(data.experience or [])}"
        else:
            prompt = "Generate a resume section."
    else:
        # Default: improve all provided sections
        prompt = "You are a world-class resume writing assistant. Suggest improvements, better wording, and formatting for each section.\n"
        if data.summary:
            prompt += f"Summary: {data.summary}\n"
        if data.skills:
            prompt += f"Skills: {', '.join(data.skills)}\n"
        if data.experience:
            prompt += f"Experience: {', '.join(data.experience)}\n"
        if data.education:
            prompt += f"Education: {', '.join(data.education)}\n"

    try:
        response = requests.post(
            "https://api.cohere.ai/v1/generate",
            headers={
                "Authorization": f"Bearer {cohere_api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "command-r-plus",  # Use Cohere's best free model
                "prompt": prompt,
                "max_tokens": 400,
                "temperature": 0.7
            }
        )
        if response.status_code == 200:
            result = response.json()
            return {"result": result.get("generations", [{}])[0].get("text", "")}
        else:
            return {"error": response.text}
    except Exception as e:
        return {"error": str(e)}

# Ensure tables are created on startup
# @app.on_event("startup")
# def on_startup():
#     create_tables()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ResumeParseResult(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    skills: List[str]
    education: List[str]
    experience: List[str]

class JDMatchResult(BaseModel):
    similarity_score: float
    matched_keywords: List[str]
    missing_skills: List[str]

class SuggestionResult(BaseModel):
    suggestions: List[str]
    courses: List[str]

class JobRecommendation(BaseModel):
    job_title: str
    company: str
    match_score: float
    link: Optional[str]

def get_learning_path(missing_skills: List[str]) -> List[str]:
    # Simple mapping for demo
    course_map = {
        "docker": "https://www.coursera.org/learn/docker",
        "aws": "https://www.coursera.org/learn/aws-fundamentals",
        "react": "https://www.udemy.com/course/react-the-complete-guide/",
        "sql": "https://www.coursera.org/learn/sql-for-data-science",
        "nlp": "https://www.coursera.org/learn/language-processing",
        "machine learning": "https://www.coursera.org/learn/machine-learning"
    }
    return [course_map[s.lower()] for s in missing_skills if s.lower() in course_map]


# Extract plain text from resume file (no entity extraction)
@app.post("/parse_resume")
async def parse_resume(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"temp_{file.filename}", "wb") as f:
        f.write(contents)
    text = extract_text(f"temp_{file.filename}", file.filename)
    os.remove(f"temp_{file.filename}")
    if text is None:
        return {"text": None}
    return {"text": text}

# New endpoint: Save structured resume data (from frontend AI)
class ResumeData(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    skills: List[str] = []
    education: List[str] = []
    experience: List[str] = []
    filename: Optional[str] = None

@app.post("/save_resume_data")
async def save_resume_data(data: ResumeData):
    conn = get_db_connection()
    cursor = conn.cursor()
    import random
    score = round(random.uniform(0.7, 0.95), 2)
    cursor.execute('''
        INSERT INTO resumes (name, email, phone, skills, education, experience, score, filename)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    ''', (
        data.name,
        data.email,
        data.phone,
        ', '.join(data.skills or []),
        ', '.join(data.education or []),
        ', '.join(data.experience or []),
        score,
        data.filename
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return {"success": True}

@app.get("/")
def root():
    return {"message": "AI-Powered Resume Analyzer Backend"}

# --- New Endpoints for Resume History & Analytics ---
from fastapi.responses import JSONResponse


# If email is provided, filter; else return all
@app.get("/resume_history")
def get_resume_history(email: str = None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    if email:
        cursor.execute("SELECT id, name, email, phone, skills, education, experience, score, filename, created_at FROM resumes WHERE email=%s ORDER BY created_at DESC", (email,))
    else:
        cursor.execute("SELECT id, name, email, phone, skills, education, experience, score, filename, created_at FROM resumes ORDER BY created_at DESC")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows


# If email is provided, filter; else show analytics for all resumes
@app.get("/analytics")
def get_analytics(email: str = None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    if email:
        cursor.execute("SELECT COUNT(*) as resume_count FROM resumes WHERE email=%s", (email,))
        resume_count = cursor.fetchone()["resume_count"]
        cursor.execute("SELECT skills FROM resumes WHERE email=%s", (email,))
    else:
        cursor.execute("SELECT COUNT(*) as resume_count FROM resumes")
        resume_count = cursor.fetchone()["resume_count"]
        cursor.execute("SELECT skills FROM resumes")
    skill_map = {}
    for row in cursor.fetchall():
        skills = row["skills"]
        logging.info(f"Processing skills: {skills}")
        if skills:
            for skill in skills.split(","):
                s = skill.strip().lower()
                if s:
                    skill_map[s] = skill_map.get(s, 0) + 1
    # Top 15 skills
    top_skills = sorted(skill_map.items(), key=lambda x: x[1], reverse=True)[:15]
    cursor.close()
    conn.close()
    return JSONResponse({
        "resume_count": resume_count,
        "top_skills": top_skills
    })
