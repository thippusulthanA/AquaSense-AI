import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.api.v1 import auth, tanks, sensors, inspections, analytics, reports, notifications, admin, ai_chat
from app.websockets.connection_manager import manager

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/api/v1/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload/reports directories exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.REPORT_DIR, exist_ok=True)

# Static file mounts
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
app.mount("/reports", StaticFiles(directory=settings.REPORT_DIR), name="reports")

# Router Registrations
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(tanks.router, prefix="/api/v1/tanks", tags=["Tanks & Storage Reservoirs"])
app.include_router(sensors.router, prefix="/api/v1/sensors", tags=["Sensors & Telemetry"])
app.include_router(inspections.router, prefix="/api/v1/inspections", tags=["Inspections & Work Orders"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics & Master KPIs"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Export & Audit Reports"])
app.include_router(notifications.router, prefix="/api/v1/notifications", tags=["System Notifications"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin Portal"])
app.include_router(ai_chat.router, prefix="/api/v1/ai", tags=["Groq LLaMA 3.3 AI Copilot"])

@app.get("/")
def root_check():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "version": "2.0.0",
        "ai_engine": "Groq LLaMA 3.3 70B",
        "documentation": "/docs"
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"ACK: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
