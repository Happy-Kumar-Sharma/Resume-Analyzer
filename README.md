# Resume Analyzer

An AI Resume Analyzer web app that extracts text from resumes on the backend and performs AI analysis in the browser. The frontend is a React + Vite single-page app that uses Puter.js (GPT-4o) in the client for analysis. The backend is a lightweight FastAPI service responsible for file upload, text extraction (PyPDF2 / python-docx), and persisting structured resume data to MySQL.

---

## Quick summary

- Frontend: React + Vite. All AI analysis runs in-browser using Puter.js (privacy first).
- Backend: FastAPI (Uvicorn) that accepts uploads and extracts plain text from PDF/DOCX resumes.
- Storage: MySQL for structured resume records; optional file storage (local or S3-compatible).
- Deployment: Nginx reverse-proxy + optional Docker containers (Dockerfile and nginx.conf included).

---

## Contents

- `frontend/` — React + Vite frontend application
- `BackEnd/` — FastAPI backend and utilities
  - `BackEnd/main.py` — FastAPI app entry (example)
  - `BackEnd/resume_parser.py` — PDF/DOCX parsing logic
  - `BackEnd/job_recommender.py` — simple job matching utilities
  - `BackEnd/tools/generate_dataflow.py` — script that generates a PlantUML dataflow diagram from a parsed resume JSON
- `architecture.puml` — simplified architecture PlantUML
- `architecture_deep.puml` — deeper architecture PlantUML
- `architecture_dataflow.puml` — generated dataflow PlantUML (created by the generate script)
- `Dockerfile`, `nginx.conf` — deployment artifacts

---

## Architecture diagrams (placeholders)

The repository contains PlantUML sources for architecture diagrams. Add rendered images (PNG/SVG) at these paths or generate them with PlantUML.

- [Low level architecture](https://www.plantuml.com/plantuml/svg/VLR1RXit4BtpAmQwT8L4KT42FVXGnBPin4PYgr4J5AWBWzgTbHXpIPRaojuM1VeH_S9-IOVaqk7QJMxKp9kPDyCtNBrsdblVTv9z0s_4Rh-GU409xz7r7IwE5PV37sZXtx__WGDQBsekGV91zvunToUKuPPtKElEQ8NAR_mW4IpMdgkTn0BYzhpHzqBjeENIbHuf5Fh186ZhzxfmMAxk71huuLlcjG6lOQkzrnqq8bGGMZ76QwyjpCvK0nySsXbm5m-CFPA0sQaKn0sMS6BrVKQDP_YJmMV-C3ktMdcaTDLxfEJm0ZuAZ_COadtJY7NlqRxwvA0IQh4TinvVf93eP7ynfdH3J5Pef1wwnEQisM40nKFayUlLJgW7cZxDsY6ihNuOVWk8Q0-0ZUTq2V16Em_LwUfg7jt96enKgkpyXDTtePaDseEe4QfpxlpnUYINlKz6y86WsYfYEA9lLCU5EkB6XB1idGObnS2Q4t5xewhri5wTV_SIp42NgXQDhXzIqOIO1b_gBJLDXexen70bpMtlXNGluPFUtjhFpbTcI8cAW6asuWOa2AE5ykv6hQytFyFIXBAK9x3CDiSFsNJRSCzZMeeEGmo_jzpH3DyDcv_UGcNGEk5ygE2yjdmtYYAwMQibyO3PMnqsv5n8X4r2mH8stqEbJH0ibp4e-rWRW3FgqDrskhuZ5Ma5bUET8Nim9_WbdTwHdz6MVinhs4fz3rNOZCMFusRCMT0-BCZmgECZq0OLS6E8IK_oumsadkctuTGHNAvOXeVOGauKtQAlz-2IxhXpw1qh04zgEH8QmhPNZSH9qYHXGZo_3gZ26EOi8GYR5HQgQtlFRM3yUuyax-m9gAGa0k63js5NFHsW8jqjLzUdlynP0Zp962itO2H9EaQKESjMBFhUgenFkIytrrVpILzfmmdEqrivmR-WqO8Caf33rwRnL8Wa0M_xckfZkYpflpwUaE3_PfJKIS1HlV0aRuSJT9RiKQ7Ng7Q4S4LBJj9hQTAkZ2eNaIBfR7eVrGiT9-sWOoLYse3D7XxAkI_THUYl0T70yba4hSG5mInn9M-c7RTZcYulKQpA6oYsZ1J8fTpISpZ_mZnqsyRDaTpkqZ0SU3tTx42bUE3tuVafRksiYPcQYC06k0SCfigEpxq9ppqiywxjjVCJEZd3TdosRQySR97gD6DiLTF4IDTeGTinGL904TvnHJqri3e9eCU8y8do25uRQhRyr5sKNpMeykTkpY3-BJ1M77WzB5fXdH_NWAIMs6Nj1xeXVIgIl-EwBRub9xahT4Oh9xP22Y_G7P5l4JI6uf0dpmbNBds4h9zBFEnIybbz40s24_dEd-a8eBhIb3L9ARGQg3jehUxooET58w_fs7VoFm00) (render from `architecture_deep.puml`)
- [High level architecture](https://www.plantuml.com/plantuml/svg/VLJ1RjGm4BtxAqPxQLPbAUB0eGVKbcsbLj26NUY5eigRp1PJnpRsPBi18N7Y0n1Vs2zXxCs6f1NSufdtPjuyZtCGI7ggAorsOAugfzLIOGap37M5S6YaRhwYX_iVls65dbGXDIorlHCYt2hZf9SL5BPorg2XEJKQmMD1qjnex46yDBS17Rnu9iWw80iBIsGhA5M4Ask4a0LP3wDZKyBxW7u4CgGF8RgAC3hozevZi0UljEAM2RKDVXFmLmoCJhmrX5mkco4NXrsuL8JZHDdcXeoy9lHFFuShaoapMRHb3qytd9GLtuTwP76RMfp8G8TvYsoZ3mNbqWS4HbsP_6B-3lPS35pxP7OY9WG3XhovN0reWSyjwxgK91CrWXWJzSNOGWQMzwQPltsTqjCZ8OmjEJP5fsrJRStR79FK3-StogpPsnckC4hDlLqt7oCgPMBj7RZixm5ayJxlV_vgBtGiufN1PF8IElltmJeq89tZqZLtaoLirFFPoK08PrFHmICtjMFYOviWMogDOv4G4Tjvnl2bzNVIn-fVQWmakjG37Ax9nuqW_e0iR_BfoVCdu1hwPCsajCLwtACEH_58jJUG99LjWRFvnVbuE43Q5ORBpGiQu7TvND2MBTJD_yP-UCsG1V9rmVrnOw2clW-y0F-meSqarFI80GvzK85WM2-w6_l4HI64UB5ssNyff_qt0TdsjOm5f1-4ysebYsQoL3vGEpgt0L-RqCqRHutbsoQRhU4-tVv2ztfOahCcg8NIYXI6VSvDO8O5gXL2N8EG8iUzsqo1_F5uQIw0xDm2ez2pjZX3r1J6FL47_5bN-Wy0) (render from `architecture.puml`)
- [Architecture dataflow diagram](https://www.plantuml.com/plantuml/svg/PPD1RnCn48Nl_XLFEMrKKYX85UA0MbGgWK0g3N2VxCusfbxR6i-sX5-FdTMcRdD8DFPyRpn-dhr8IgBZu8nQTOmhKkfTU4GV18c6w7XrPjAzzP641hHXYC6prxNkCYxSAlaxnnKYvEyJHvo_CHeYD60JLCE0pXRS1cyCjHe4Yr-9PG5AA84vrCRYMe9NzXsQMyuiJl3RAY_tx9oh-HkInBYy-OBccfBcO6Bt-t94TlZ9V_M9wCgofZvxjMevxP5vKGFhU-lSb9x2EddBUJ7a5gdSTgBoNZ9vWpQK68llk_MFR_l4rQTdxOtASledeR5-jP7mc5XmET-c98qfPc6r-dXm0XyG8djGZ7YDCRf07OJJEB0vC4KmsP7ntZgUmKRe4PkTSbgQ2IXiPKpcyxzGgzn1oqRp_XpjbYGhAYoh3bvbJSVAhO87iYwXELk-Gjm6poK-qaqc7bISstft11KFCtB7deMKqRmzGYfBX7KKZrY0gUyNPXGtCqUUtEuVro1EyFKAZGijkUKpLNwkB4dqm4WgOwkZyEIrKpGFbh0kkJA09gClMaeQ2cwx_4njyBsLWQOFmWTbQ8W8VJsIA8j3LpP1jumeTY3PWKHjJwsY5IRDq6OtvOj4JaqvizITYekzssekFyyhPiz9k7fVdXzmJ4yL-_aAb7_oVBghSyn53iV1_GS0) (render from `architecture_dataflow.puml`)

---

## Running locally

Follow these steps to run the project locally on Windows (PowerShell). Paths are relative to the repository root.

### Backend (FastAPI)

1. Create and activate a virtual environment:

```powershell
python -m venv BackEnd\venv
BackEnd\venv\Scripts\Activate.ps1
```

2. Install backend dependencies:

```powershell
pip install -r BackEnd\requirements.txt
```

3. Start the backend (development):

```powershell
cd BackEnd
uvicorn main:app --reload
```

By default the API will run at http://127.0.0.1:8000 .

### Frontend (React + Vite)

1. Install frontend dependencies and run dev server:

```powershell
cd frontend
npm install
npm run dev
```

2. Open the provided local URL (typically http://localhost:5173) to use the UI.

Notes:
- The frontend calls the backend endpoints `POST /parse_resume` and `POST /save_resume_data` for upload and save operations.
- Puter.js must be loaded in the frontend (project includes notes on how to wire it). Analysis runs in the user’s browser — no backend AI calls.

---

## Generate the dataflow diagram from a parsed resume

The script `BackEnd/tools/generate_dataflow.py` reads a parsed resume JSON and writes a PlantUML diagram describing the dataflow (extracted text → entities → skills → recommendations → persistence).

Example (PowerShell):

```powershell
python BackEnd\tools\generate_dataflow.py --input BackEnd\parsed_resume.json --output architecture_dataflow.puml
```

Then render `architecture_dataflow.puml` with PlantUML (VS Code PlantUML extension or CLI) to produce `architecture_dataflow.png` or `architecture_dataflow.svg`.

If the input JSON is missing, the script will create a sample file `sample_parsed.json` and generate the diagram from that.

---

## API Endpoints (summary)

- POST /parse_resume — accept a file (PDF or DOCX) and return extracted plain text (JSON).
- POST /save_resume_data — accept structured resume data (skills, entities, recommendations) and persist to DB.

Check `BackEnd/main.py` and `BackEnd/resume_parser.py` for implementation details.

---

## Storage and persistence

- Structured resume records are stored in MySQL. Configure DB credentials in `BackEnd/config.py`.
- Uploaded files may be stored locally (default) or offloaded to S3-compatible object storage. See `BackEnd/config.py` and `nginx.conf` for examples.

---

## Deployment

This repository includes a `Dockerfile` and `nginx.conf` for containerized deployment. A typical deployment layout:

- Nginx as the reverse proxy and static file server
- FastAPI (Uvicorn) for backend API
- MySQL as managed DB or container

Build and run locally with Docker (example):

```powershell
# build image
docker build -t resume-analyzer:latest .

# run container (example)
docker run -p 80:80 resume-analyzer:latest
```

Adjust commands and orchestration to your environment (docker-compose, Kubernetes, etc.).

---

## Tests & linting

- Backend: add pytest tests under `BackEnd/tests/` and run `pytest` from the `BackEnd` folder.
- Frontend: use the React testing tools configured in the `frontend` workspace.

---

## Contributing

Contributions and fixes are welcome. Please open issues or PRs. See `BackEnd/contributing.md` and `frontend/contributing.md` for local guidelines.

---

## License

This project is distributed under the MIT License. See `BackEnd/LICENSE` for details.

---
