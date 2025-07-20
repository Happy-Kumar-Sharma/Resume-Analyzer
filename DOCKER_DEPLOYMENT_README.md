# Docker Deployment Guide for Resume-Analyzer

This guide explains how to build, run, and push the Resume-Analyzer application as a Docker image, and how to pass environment variables securely.

## Prerequisites
- Docker installed
- Docker Hub account

## 1. Build the Docker Image

From the root of the project, run:

docker compose up --build

ngrok http 80

To push your container images to Docker Hub, follow these steps:

Log in to Docker Hub (if not already):
docker login

Tag your images for Docker Hub: Replace <your-dockerhub-username> with your Docker Hub username.

For backend:
docker tag resume-analyzer-backend thunderhappy/resume-backend:latest

For frontend:
 docker tag resume-analyzer-frontend thunderhappy/resume-frontend:latest

Push the images:
docker push thunderhappy/resume-backend:latest
docker push thunderhappy/resume-frontend:latest

After pushing, your images will be available on Docker Hub for deployment anywhere!

