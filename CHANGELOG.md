# CHANGELOG - AquaSense-AI Integration & Architectural Release Notes

## [v2.0.0] - 2026-07-31

### Integrated Features from AquaGuardian-AI into AquaSense-AI Base
- **Python FastAPI Backend (`backend/`)**:
  - Implemented asynchronous REST API and WebSockets server (`backend/main.py`).
  - Added JWT Authentication and Passlib password hashing (`backend/app/api/v1/auth.py`).
  - Created endpoints for Tanks, Sensors, Inspections, Analytics, Reports, Notifications, and Admin management.
  - Implemented Groq LLaMA 3.3 70B AI Assistant endpoint (`backend/app/api/v1/ai_chat.py`) maintaining strict Groq API + LangChain/LangGraph workflow.
- **Relational PostgreSQL Database (`database/`)**:
  - Added PostgreSQL schema definition (`database/init.sql`) with 16 tables, UUIDs, indexes, and triggers.
  - Added database seeder (`database/seed_data.py`) for baseline Admin, Technician, User, Tanks, and Sensors.
  - Added schema migration script (`database/migration_v2.sql`) introducing Dispenser telemetry tracking and Sub-agent audit logs.
- **Machine Learning Suite (`ml/`)**:
  - Integrated 5 Python ML Agents (`health_agent.py`, `maintenance_agent.py`, `alert_booking_agent.py`, `fault_diagnosis_agent.py`, `analytics_agent.py`).
  - Added model retraining pipeline (`ml/retraining_pipeline.py`) with XGBoost RUL forecasting, Isolation Forest anomaly detection, and SHAP feature importance explainability.
  - Added ESP32 IoT node simulator script (`scripts/mock_iot_generator.py`).
- **Containerization & DevOps (`docker/`)**:
  - Added `docker/docker-compose.yml` for PostgreSQL, Redis, FastAPI Backend, and Nginx.
  - Added backend `Dockerfile` and Nginx reverse proxy configuration (`docker/nginx/nginx.conf`).
- **Unified Multi-Role React Frontend (`src/`)**:
  - Added `AuthContext.tsx` and `api.ts` with Bearer Token interceptor.
  - Enhanced `src/App.tsx` with Master Control Tower (8 Sub-Agents overview), Admin Portal, Service Technician Dispatch Queue (with interactive Groq SOP repair checklists and sign-offs), Resident User View (inspection booking), and persistent Groq LLaMA 3.3 AI Copilot drawer.
  - Added Quick Role Switcher Pill (Admin, Service Technician, User) in the top navbar.
- **Preserved Standalone Micro-Agents (`standalone_agents/`)**:
  - Retained all 4 standalone micro-agent sub-projects completely intact and individually deployable to Vercel.
