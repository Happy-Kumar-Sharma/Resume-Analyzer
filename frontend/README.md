
# 🚀 Resume Analyzer Frontend (React + Vite)

Welcome to the next-generation Resume Analyzer! This beautiful, modern web app lets you instantly analyze your resume and job descriptions using cutting-edge AI—all right in your browser. No backend AI calls, no waiting, just instant results and actionable insights.

## ✨ Features
- **Drag & Drop Resume Upload:** Upload your PDF or DOCX resume and get instant text extraction.
- **In-Browser AI Analysis:** All resume parsing, JD matching, suggestions, and job recommendations are powered by Puter.js (GPT-4o) running in your browser.
- **Unified, Modern UI:** Enjoy a seamless stepper flow, beautiful cards, and a delightful user experience.
- **Actionable Suggestions:** Get clear, AI-powered tips to improve your resume and match your dream job.
- **Job Recommendations:** Instantly see which jobs you’re a great fit for, with smart AI matching.
- **No Data Leaves Your Browser:** All AI analysis happens locally—your data stays private.

## 🛠️ Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚦 How It Works
1. **Upload Resume:** Drag and drop or select your resume file.
2. **AI Extraction:** The backend extracts plain text and returns it to the frontend.
3. **AI Analysis:** Paste a job description and let Puter.js (GPT-4o) analyze your resume, match skills, and suggest improvements—all in-browser.
4. **Save & Track:** Save your structured resume data for analytics and history.

## 🤖 AI Bot Integration
- Make sure Puter.js is loaded in your app (via CDN or npm).
- All AI features use `window.puter.ai.chat` with the GPT-4o model for blazing-fast, private analysis.

## 🌍 Deployment
- Deploy on Vercel, Netlify, or any static host in seconds.

## 💡 Why Use This?
- **Instant Feedback:** No more waiting for backend processing—get results in seconds.
- **Privacy First:** Your resume and job data never leave your browser during analysis.
- **Modern UX:** Built with React, Vite, and the latest AI tech for a world-class experience.

## 📄 License
MIT
