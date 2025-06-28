import json
from typing import List, Dict

def load_jobs() -> List[Dict]:
    with open("jobs_mock.json", "r", encoding="utf-8") as f:
        return json.load(f)

def find_matching_jobs(resume_skills: List[str], jobs: List[Dict]) -> List[Dict]:
    results = []
    for job in jobs:
        job_skills = set([s.lower() for s in job.get("skills", [])])
        match_count = len(set([s.lower() for s in resume_skills]) & job_skills)
        score = match_count / max(len(job_skills), 1)
        results.append({
            **job,
            "match_score": round(score, 2)
        })
    return sorted(results, key=lambda x: x["match_score"], reverse=True)
