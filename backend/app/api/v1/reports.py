from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.tank import Tank
from app.services.report_generator import ReportGeneratorService

router = APIRouter()

@router.get("/export/dispensers/csv")
def export_dispensers_csv(db: Session = Depends(get_db)):
    headers = ["Dispenser ID", "Location", "Health Index (%)", "Predicted RUL (Days)", "Status", "Failure Cause"]
    data = [
        ["WD-001", "Student Union Center", 98.5, 115, "Healthy", "Normal Operating Conditions"],
        ["WD-002", "Computer Science Dept", 68.4, 18, "Warning", "Filter Clogging & Flow Restriction"],
        ["WD-005", "Medical Sciences Wing", 42.0, 3.5, "Critical", "Pump Overheating & Mechanical Friction"],
        ["WD-003", "Library Reading Hall", 95.2, 102, "Healthy", "Normal Operating Conditions"]
    ]
    filepath = ReportGeneratorService.generate_csv_report("dispensers_audit", data, headers)
    return FileResponse(filepath, media_type="text/csv", filename="dispensers_audit.csv")

@router.get("/export/tanks/csv")
def export_tanks_csv(db: Session = Depends(get_db)):
    tanks = db.query(Tank).all()
    headers = ["Tank ID", "Name", "Building Location", "Capacity (L)", "Health Score", "Status"]
    data = []
    for t in tanks:
        data.append([t.code, t.name, t.location_building, t.capacity_liters, t.health_score, t.status.value])
    
    if not data:
        data = [
            ["TANK-01", "North Campus Main Reservoir", "North Campus", 50000.0, 92, "optimal"],
            ["TANK-02", "Engineering Quad Tower", "Engineering Quad", 25000.0, 78, "warning"]
        ]
        
    filepath = ReportGeneratorService.generate_csv_report("tanks_sanitation_audit", data, headers)
    return FileResponse(filepath, media_type="text/csv", filename="tanks_sanitation_audit.csv")
