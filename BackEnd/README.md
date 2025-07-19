
# 🛠️ Resume Analyzer Backend (FastAPI)

Welcome to the backend for the Resume Analyzer SaaS platform! This FastAPI server is the engine that powers file uploads, text extraction, and secure data storage—leaving all the AI magic to the frontend.

## 🚀 What Makes It Special?
- **Lightning-fast file parsing:** Upload PDF or DOCX resumes and get clean, extracted text in seconds.
- **Zero AI/ML in backend:** All AI analysis is handled in-browser for privacy and speed.
- **Simple, secure endpoints:** Only handles file uploads and saving structured data—no unnecessary complexity.

## ⚙️ Tech Stack
- FastAPI
- PyPDF2, python-docx
- httpx
- MySQL

## 🏁 Getting Started
1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```
2. **Activate the environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up MySQL** and update your DB credentials in the config.
5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```

## 🔌 API Endpoints
- `POST /parse_resume`: Upload a resume and get extracted text
- `POST /save_resume_data`: Save structured resume data

## 💡 How It Works
1. Start the backend server.
2. Use the frontend to upload resumes and analyze them with Puter.js.
3. The backend only handles file uploads and saving data—no AI analysis is performed here.

## 🌟 Why This Architecture?
- **Privacy-first:** No resume data is sent to third-party AI services from the backend.
- **Separation of concerns:** Backend is lean and secure; frontend handles all AI/ML.
- **Easy to deploy:** Works on Render, DigitalOcean, or any FastAPI-compatible host.

## 📄 License
MIT
