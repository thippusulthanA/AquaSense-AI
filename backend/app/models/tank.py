import uuid
from sqlalchemy import Column, String, Float, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.enums import TankStatus

class Tank(Base):
    __tablename__ = "tanks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    location_building = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    capacity_liters = Column(Float, nullable=False)
    current_volume_liters = Column(Float, default=0.0)
    status = Column(Enum(TankStatus), default=TankStatus.OPTIMAL)
    health_score = Column(Integer, default=100)
    last_cleaned_at = Column(DateTime(timezone=True), nullable=True)
    next_recommended_cleaning = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    sensors = relationship("Sensor", back_populates="tank", cascade="all, delete-orphan")
    faults = relationship("Fault", back_populates="tank", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="tank", cascade="all, delete-orphan")
