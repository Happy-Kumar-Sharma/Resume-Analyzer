# Multi-stage Dockerfile for Resume-Analyzer
# 1. Build frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 2. Build backend
FROM python:3.11-slim AS backend-build
WORKDIR /app/BackEnd
COPY BackEnd/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY BackEnd/ .

# 3. Final stage: Nginx + Backend
FROM python:3.11-slim
WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*


# Copy backend
COPY --from=backend-build /app/BackEnd /app/BackEnd

# Copy frontend build to Nginx html dir
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Install backend dependencies
RUN pip install --no-cache-dir -r /app/BackEnd/requirements.txt

# Expose ports
EXPOSE 80
EXPOSE 8000

# Start Nginx and Uvicorn
CMD service nginx start && uvicorn BackEnd.run_server:app --host 0.0.0.0 --port 8000
