from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.notification import Notification

router = APIRouter()

@router.get("/")
def get_notifications(db: Session = Depends(get_db)):
    notifications = db.query(Notification).all()
    if not notifications:
        return [
            {
                "id": "notif-001",
                "title": "Critical RUL Warning: Dispenser WD-005",
                "message": "Sub-Agent 2 detected RUL drops below 3.5 days. Auto work order TICK-9081 created.",
                "is_read": False,
                "created_at": "2026-07-31T08:00:00Z"
            },
            {
                "id": "notif-002",
                "title": "Turbidity Spike: Tank TANK-02",
                "message": "Sub-Agent 5 flagged turbidity reading at 2.8 NTU. Sanitation schedule auto-updated.",
                "is_read": True,
                "created_at": "2026-07-31T06:30:00Z"
            }
        ]
    return notifications
