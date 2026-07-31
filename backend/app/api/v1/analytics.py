from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.tank import Tank
from app.models.maintenance import Inspection

router = APIRouter()

@router.get("/kpis")
def get_analytics_kpis(db: Session = Depends(get_db)):
    tanks = db.query(Tank).all()
    inspections = db.query(Inspection).all()

    avg_health = sum([t.health_score for t in tanks]) / len(tanks) if tanks else 100.0
    active_tickets = len([i for i in inspections if i.status.value != "completed"])
    completed_tickets = len([i for i in inspections if i.status.value == "completed"])

    return {
        "overall_health_index": round(avg_health, 1),
        "total_storage_reservoirs": len(tanks),
        "active_work_orders": active_tickets,
        "completed_services": completed_tickets,
        "water_quality_index": 92.4,
        "total_water_consumed_liters": 142800.0,
        "ai_prediction_accuracy": "98.5%"
    }
