from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.telemetry import Sensor, SensorReading
from app.schemas.all_schemas import SensorReadingCreate, SensorReadingOut

router = APIRouter()

@router.get("/readings/{tank_id}", response_model=List[SensorReadingOut])
def get_sensor_readings(tank_id: str, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(SensorReading).filter(SensorReading.tank_id == tank_id).order_by(SensorReading.timestamp.desc()).limit(limit).all()

@router.post("/ingest", response_model=SensorReadingOut)
def ingest_sensor_reading(reading_in: SensorReadingCreate, db: Session = Depends(get_db)):
    sensor = db.query(Sensor).filter(Sensor.sensor_code == reading_in.sensor_code).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor code not recognized")

    is_anomaly = (reading_in.value < sensor.min_threshold) or (reading_in.value > sensor.max_threshold)

    reading = SensorReading(
        sensor_id=sensor.id,
        tank_id=sensor.tank_id,
        value=reading_in.value,
        is_anomaly=is_anomaly
    )
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return reading
