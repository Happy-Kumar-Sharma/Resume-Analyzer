# 1. Build frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend

# Copy only package info first to leverage caching
COPY frontend/package.json frontend/package-lock.json ./

# Clean install without native Rollup binary
RUN npm ci --no-optional

# Now copy actual source code
COPY frontend/ .

# Run build (should now succeed)
RUN npm run build

# 2. Build backend
FROM python:3.11-slim AS backend-build
WORKDIR /app/BackEnd
COPY BackEnd/requirements.txt ./
RUN pip install -r requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt
COPY BackEnd/ .

# 3. Final stage: Nginx + Backend
FROM python:3.11-slim
WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*


# Copy backend code and installed dependencies from backend-build stage
COPY --from=backend-build /app/BackEnd /app/BackEnd
COPY --from=backend-build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-build /usr/local/bin /usr/local/bin

# Copy frontend build output to Nginx html directory
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Install backend dependencies again (safer for final image)
# RUN pip install --no-cache-dir -r /app/BackEnd/requirements.txt

# Expose Nginx (80) and Uvicorn (8000) ports
EXPOSE 80
EXPOSE 8000

# Start both Nginx and Uvicorn
CMD service nginx start && uvicorn BackEnd.run_server:app --host 0.0.0.0 --port 8000
