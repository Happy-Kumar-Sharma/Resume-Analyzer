# Contributing Guide: AI-Powered Resume Analyzer and Job Matcher

## Backend (FastAPI, Python)

### 1. Setup Python Environment
```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 2. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 3. Download spaCy Model
```powershell
python -m spacy download en_core_web_sm
```

### 4. (Optional) Setup MySQL Database
- Ensure MySQL is running and update `config.py` with your credentials.
- To create tables:
```powershell
python db.py
```

### 5. Run the Backend Server
```powershell
.venv\Scripts\uvicorn.exe main:app --reload
```

---

## Frontend (React + Vite)

### 1. Install Node.js (if not already installed)
- Download from https://nodejs.org/

### 2. Install Dependencies
```powershell
npm install
```

### 3. Install Axios (if not already installed)
```powershell
npm install axios
```

### 4. Start the Frontend Dev Server
```powershell
npm run dev
```

---

## General Notes
- Make sure the backend is running before using the frontend.
- Update API URLs in `src/api/resumeApi.ts` if deploying to production.
- For deployment, see the respective `README.md` files in each folder.
