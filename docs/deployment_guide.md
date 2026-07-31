# AquaSense-AI v2.0 Production Deployment Guide

This guide outlines deployment options for AquaSense-AI v2.0, covering Docker Compose local production deployment, Vercel frontend deployment, and Standalone Micro-Agents deployment.

---

## 🐳 Option 1: Full-Stack Docker Deployment (Recommended)

### Prerequisites
- Docker Engine >= 24.0
- Docker Compose >= 2.20

### Steps
1. Clone the AquaSense-AI repository:
   ```bash
   git clone https://github.com/thippusulthanA/AquaSense-AI.git
   cd AquaSense-AI
   ```
2. Configure Environment Variables (`.env`):
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   POSTGRES_PASSWORD=postgres
   SECRET_KEY=production_secret_key
   ```
3. Build and launch containers with Docker Compose:
   ```bash
   docker-compose -f docker/docker-compose.yml up -d --build
   ```
4. Access system services:
   - **Frontend App**: `http://localhost:80`
   - **FastAPI REST API**: `http://localhost:8000`
   - **Swagger API Docs**: `http://localhost:8000/docs`
   - **PostgreSQL Database**: `localhost:5432`

---

## ⚡ Option 2: Vercel Frontend Deployment

1. Connect `thippusulthanA/AquaSense-AI` to Vercel.
2. Root Directory: `./`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variables:
   - `VITE_API_BASE_URL`: URL of deployed FastAPI backend.

---

## 🤖 Option 3: Standalone Micro-Agents Vercel Deployment

Each standalone agent in `standalone_agents/` can be deployed individually:
1. Agent 1: `standalone_agents/1-telemetry-anomaly-agent`
2. Agent 2: `standalone_agents/2-rul-predictor-agent`
3. Agent 3: `standalone_agents/3-rag-diagnostic-agent`
4. Agent 4: `standalone_agents/4-autonomous-dispatch-agent`
