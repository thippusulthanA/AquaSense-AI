import uuid
from sqlalchemy import Column, String, Float, Boolean, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.enums import SensorType

class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    tank_id = Column(String(36), ForeignKey("tanks.id", ondelete="CASCADE"), nullable=False)
    sensor_code = Column(String(50), unique=True, nullable=False)
    type = Column(Enum(SensorType), nullable=False)
    unit = Column(String(20), nullable=False)
    min_threshold = Column(Float, nullable=False)
    max_threshold = Column(Float, nullable=False)
    is_online = Column(Boolean, default=True)
    last_calibrated_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    tank = relationship("Tank", back_populates="sensors")
    readings = relationship("SensorReading", back_populates="sensor", cascade="all, delete-orphan")

class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sensor_id = Column(String(36), ForeignKey("sensors.id", ondelete="CASCADE"), nullable=False)
    tank_id = Column(String(36), ForeignKey("tanks.id", ondelete="CASCADE"), nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    is_anomaly = Column(Boolean, default=False)
    raw_payload = Column(JSON, nullable=True)

    sensor = relationship("Sensor", back_populates="readings")
