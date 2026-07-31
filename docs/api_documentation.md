# AquaSense-AI v2.0 REST & WebSockets API Documentation

## Overview
AquaSense-AI v2.0 provides an enterprise asynchronous REST API and WebSockets server built with Python FastAPI and PostgreSQL.

**Interactive OpenAPI Docs**: `http://localhost:8000/docs`  
**ReDoc Spec**: `http://localhost:8000/redoc`

---

## Base URLs
- **REST Base URL**: `http://localhost:8000/api/v1`
- **WebSockets Base URL**: `ws://localhost:8000/ws`

---

## Endpoints Summary

### 🔑 Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/login` - Authenticate user credentials and return JWT bearer token.
- `POST /api/v1/auth/register` - Register new Admin, Service Technician, or Resident User.
- `GET /api/v1/auth/me` - Retrieve current user profile and role details.

### 🚰 Storage Tanks & Reservoirs (`/api/v1/tanks`)
- `GET /api/v1/tanks/` - List all campus water storage tanks and health scores.
- `GET /api/v1/tanks/{tank_id}` - Fetch single reservoir metrics, volume, and cleaning schedule.
- `POST /api/v1/tanks/` - Register a new campus water tank.

### 📡 Sensors & Telemetry Ingestion (`/api/v1/sensors`)
- `GET /api/v1/sensors/readings/{tank_id}` - Retrieve recent time-series telemetry (pH, TDS, Turbidity, Temp).
- `POST /api/v1/sensors/ingest` - High-throughput ingestion endpoint for IoT nodes (ESP32). Automatic anomaly detection.

### 🛠️ Inspections & Maintenance Work Orders (`/api/v1/inspections`)
- `GET /api/v1/inspections/` - Retrieve all work orders and technician assignments.
- `POST /api/v1/inspections/` - Create a work order with AI-generated repair checklist.
- `PUT /api/v1/inspections/{inspection_id}/complete` - Sign-off and verify work order completion.

### 🤖 Groq LLaMA 3.3 AI Copilot (`/api/v1/ai`)
- `POST /api/v1/ai/chat` - Query Groq LLaMA 3.3 70B AI Assistant for maintenance reasoning, SOP citations (`[SOP-FLT-001]`), root cause diagnostics, and predictive insights.

### 📊 Analytics & Master KPIs (`/api/v1/analytics`)
- `GET /api/v1/analytics/kpis` - Executive stats: Overall Health Index, Active Tickets, AI Prediction Accuracy.

### 📁 Export & Audit Reports (`/api/v1/reports`)
- `GET /api/v1/reports/export/dispensers/csv` - Download CSV report for dispensers and RUL scores.
- `GET /api/v1/reports/export/tanks/csv` - Download CSV report for tanks and sanitation status.
