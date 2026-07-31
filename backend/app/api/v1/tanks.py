from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.tank import Tank
from app.schemas.all_schemas import TankOut, TankCreate

router = APIRouter()

@router.get("/", response_model=List[TankOut])
def get_tanks(db: Session = Depends(get_db)):
    return db.query(Tank).all()

@router.get("/{tank_id}", response_model=TankOut)
def get_tank(tank_id: str, db: Session = Depends(get_db)):
    tank = db.query(Tank).filter(Tank.id == tank_id).first()
    if not tank:
        raise HTTPException(status_code=404, detail="Tank not found")
    return tank

@router.post("/", response_model=TankOut)
def create_tank(tank_in: TankCreate, db: Session = Depends(get_db)):
    tank = Tank(
        name=tank_in.name,
        code=tank_in.code,
        location_building=tank_in.location_building,
        latitude=tank_in.latitude,
        longitude=tank_in.longitude,
        capacity_liters=tank_in.capacity_liters,
        current_volume_liters=tank_in.capacity_liters * 0.85
    )
    db.add(tank)
    db.commit()
    db.refresh(tank)
    return tank
