// Save structured resume data to backend
export const saveResumeData = async (data: any) => {
  const res = await axios.post(`${API_BASE}/save_resume_data`, data);
  return res.data;
};
import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // Change to your Render backend URL after deployment

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`${API_BASE}/parse_resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const matchJD = async (resume: any, jd: string) => {
  const res = await axios.post(`${API_BASE}/match_jd`, {
    resume,
    jd
  });
  return res.data;
};

export const getSuggestions = async (resume: any, jd: string) => {
  const res = await axios.post(`${API_BASE}/suggestions`, {
    resume,
    jd
  });
  return res.data;
};

export const recommendJobs = async (resume: any) => {
  const res = await axios.post(`${API_BASE}/recommend_jobs`, resume);
  return res.data;
};

// New: Fetch resume history for a user (by email)

// If email is provided, filter; else get all
export const fetchResumeHistory = async (email?: string) => {
  const params = email ? { email } : {};
  const res = await axios.get(`${API_BASE}/resume_history`, { params });
  return res.data;
};

// New: Fetch analytics for a user (by email)

// If email is provided, filter; else get all
export const fetchAnalytics = async (email?: string) => {
  const params = email ? { email } : {};
  const res = await axios.get(`${API_BASE}/analytics`, { params });
  return res.data;
};

// Unified AI-powered analysis
export const analyzeResumeAndJD = async (resume: any, jd: string) => {
  const res = await axios.post(`${API_BASE}/analyze_resume_and_jd`, { resume, jd });
  return res.data;
};
