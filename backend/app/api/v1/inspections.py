import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.maintenance import Inspection
from app.schemas.all_schemas import InspectionOut, InspectionCreate
from app.models.enums import InspectionStatus

router = APIRouter()

@router.get("/", response_model=List[InspectionOut])
def get_inspections(db: Session = Depends(get_db)):
    return db.query(Inspection).order_by(Inspection.created_at.desc()).all()

@router.post("/", response_model=InspectionOut)
def create_inspection(inspection_in: InspectionCreate, db: Session = Depends(get_db)):
    code = f"TICK-{uuid.uuid4().hex[:6].upper()}"
    checklist = [
        {"task": "Isolate intake valve", "completed": False},
        {"task": "Check filter pressure differential", "completed": False},
        {"task": "Perform 5-minute backwash cycle", "completed": False},
        {"task": "Re-engage and verify outflow turbidity", "completed": False}
    ]
    inspection = Inspection(
        inspection_code=code,
        tank_id=inspection_in.tank_id,
        priority=inspection_in.priority,
        technician_notes=inspection_in.notes,
        repair_checklist=checklist,
        status=InspectionStatus.ASSIGNED
    )
    db.add(inspection)
    db.commit()
    db.refresh(inspection)
    return inspection

@router.put("/{inspection_id}/complete")
def complete_inspection(inspection_id: str, db: Session = Depends(get_db)):
    inspection = db.query(Inspection).filter(Inspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(status_code=404, detail="Inspection work order not found")
    
    inspection.status = InspectionStatus.COMPLETED
    db.commit()
    return {"status": "success", "message": f"Inspection {inspection.inspection_code} completed successfully."}
