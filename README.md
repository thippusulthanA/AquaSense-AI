# 🤖 AquaSense-AI v2.0 — Enterprise Smart Water Infrastructure & Predictive Maintenance Platform

**AquaSense-AI** is an enterprise-grade AI-powered Smart Water Infrastructure Management, Water Dispenser Monitoring, and Storage Tank Quality Platform. Powered by a **Unified 8-Subagent Master Control Architecture**, **Groq LLaMA 3.3 70B RAG Engine**, **FastAPI Backend**, **PostgreSQL Database**, and **Multi-Role Frontend (Admin, Technician, Resident User)**.

---

## 🌟 Key Architecture & Capabilities

- **👑 Master Control Tower**: Real-time orchestration of 8 Sub-Agents across campus dispensers and water storage tanks.
- **🤖 Groq LLaMA 3.3 70B AI Assistant**: RAG Copilot providing maintenance reasoning, root cause analysis, SOP citations (`[SOP-FLT-001]`), and technician repair guidance.
- **🔮 Machine Learning Engine**: XGBoost & Random Forest RUL Predictor, Isolation Forest Telemetry Anomaly Detector, Sediment/Algae Growth Regressor, and automated retraining pipeline (`ml/retraining_pipeline.py`).
- **🛡️ Multi-Role Enterprise UI**:
  - **Master Orchestrator View**: Live health scores and sub-agent metric outputs.
  - **Admin Control Portal**: Infrastructure statistics, technician availability, and system metrics.
  - **Service Technician View**: Mobile-optimized field dispatch, interactive Groq SOP repair checklists, and digital sign-off.
  - **Resident User View**: Building water quality indexes and automated inspection booking form.
  - **Executive Audit Center**: One-click PDF, Excel, and CSV export engines.
- **⚡ FastAPI Backend & WebSockets**: Asynchronous REST API with JWT authentication, RBAC, live telemetry streaming (`/ws`), and Swagger documentation (`/docs`).
- **🐳 Docker Suite**: Complete orchestration with Docker Compose (FastAPI, PostgreSQL, Redis, Nginx).
- **📦 4 Standalone Micro-Agents**: Preserved in `standalone_agents/` for individual Vercel deployments.

---

## 📂 Project Structure

```
AquaSense-AI/
├── backend/                  # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/          # REST Routes (auth, tanks, sensors, inspections, ai, reports)
│   │   ├── core/            # Config, Security (JWT/Bcrypt), Database
│   │   ├── models/          # SQLAlchemy Relational Models
│   │   ├── schemas/         # Pydantic Schemas
│   │   ├── services/        # Report Generator (PDF/CSV/XLS)
│   │   └── websockets/      # Live WebSockets Pub/Sub Manager
│   ├── Dockerfile
│   ├── main.py              # Application Entrypoint
│   └── requirements.txt
├── database/                 # Relational PostgreSQL Database Engine
│   ├── init.sql             # Relational Schema
│   ├── seed_data.py         # Database Seeder
│   └── migration_v2.sql     # Schema Migration Script
├── docker/                   # Container Orchestration
│   ├── docker-compose.yml
│   └── nginx/nginx.conf
├── docs/                     # Documentation Specs
│   ├── api_documentation.md # OpenAPI & REST API Spec
│   └── deployment_guide.md  # Production Deployment Guide
├── ml/                       # Machine Learning & AI Suite
│   ├── agents/              # Python ML Agents 1 to 8
│   ├── retraining_pipeline.py
│   └── training/
├── scripts/                  # ESP32 IoT Node Simulator
│   └── mock_iot_generator.py
├── src/                      # Unified React Enterprise Frontend
│   ├── context/AuthContext.tsx
│   ├── services/api.ts
│   └── App.tsx               # Multi-Role Dashboard & AI Copilot Drawer
├── standalone_agents/        # 4 Individually Deployable Micro-Agent Apps
│   ├── 1-telemetry-anomaly-agent/
│   ├── 2-rul-predictor-agent/
│   ├── 3-rag-diagnostic-agent/
│   └── 4-autonomous-dispatch-agent/
├── CHANGELOG.md              # Complete Release Notes & Integration Log
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Frontend Development Server
```bash
npm install
npm run dev
```
Open `http://localhost:5173` to explore the Master Control Tower and switch roles between Admin, Technician, and User.

### 2. Backend FastAPI Server
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Access interactive API docs at `http://localhost:8000/docs`.

### 3. Docker Full-Stack Deployment
```bash
docker-compose -f docker/docker-compose.yml up -d --build
```
Access the unified application at `http://localhost:80`.
