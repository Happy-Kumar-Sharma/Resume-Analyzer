# Docker Deployment Guide for Resume-Analyzer

This guide explains how to build, run, and push the Resume-Analyzer application as a Docker image, and how to pass environment variables securely.

## Prerequisites
- Docker installed
- Docker Hub account

## 1. Build the Docker Image

From the root of the project, run:

```
docker build -t <your-dockerhub-username>/resume-analyzer:latest .
```

Replace `<your-dockerhub-username>` with your Docker Hub username.

## 2. Run the Docker Image

You can pass environment variables at runtime using either method below:

### Option A: Pass variables directly

```
docker run -p 80:80 -p 8000:8000 \
  -e MYSQL_USER=youruser \
  -e MYSQL_PASSWORD=yourpass \
  -e MYSQL_HOST=yourhost \
  -e MYSQL_DB=yourdb \
  <your-dockerhub-username>/resume-analyzer:latest
```

### Option B: Use an env file

Create a `.env` file (e.g., in `BackEnd/.env`) with your variables:

```
MYSQL_USER=youruser
MYSQL_PASSWORD=yourpass
MYSQL_HOST=yourhost
MYSQL_DB=yourdb
```

Then run:

```
docker run -p 80:80 -p 8000:8000 --env-file ./BackEnd/.env <your-dockerhub-username>/resume-analyzer:latest
```

## 3. Push the Image to Docker Hub

1. Log in to Docker Hub:
   ```
   docker login
   ```
2. Push the image:
   ```
   docker push <your-dockerhub-username>/resume-analyzer:latest
   ```

## 4. Accessing the Application

- The frontend will be available at `http://<host-ip>/`
- The backend API will be available at `http://<host-ip>:8000/api/`

## Notes
- Do **not** commit sensitive `.env` files to version control.
- For production, always use secure passwords and consider Docker secrets or a secrets manager.

---

For any issues, please open an issue or contact the maintainer.
