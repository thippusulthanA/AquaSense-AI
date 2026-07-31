import uuid
from sqlalchemy import Column, String, Text, Float, Integer, DateTime, Enum, ForeignKey, JSON, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.enums import AlertType, FaultSeverity, FaultStatus, InspectionStatus

class Fault(Base):
    __tablename__ = "faults"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    tank_id = Column(String(36), ForeignKey("tanks.id", ondelete="CASCADE"), nullable=False)
    fault_type = Column(Enum(AlertType), nullable=False)
    severity = Column(Enum(FaultSeverity), nullable=False)
    status = Column(Enum(FaultStatus), default=FaultStatus.DETECTED)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    ai_diagnosis = Column(Text, nullable=True)
    recommended_action = Column(Text, nullable=True)
    detected_at = Column(DateTime(timezone=True), server_default=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    tank = relationship("Tank", back_populates="faults")

class Inspection(Base):
    __tablename__ = "inspections"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_code = Column(String(50), unique=True, nullable=False)
    tank_id = Column(String(36), ForeignKey("tanks.id", ondelete="CASCADE"), nullable=False)
    fault_id = Column(String(36), ForeignKey("faults.id", ondelete="SET NULL"), nullable=True)
    technician_id = Column(String(36), ForeignKey("technicians.id", ondelete="SET NULL"), nullable=True)
    created_by_user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    status = Column(Enum(InspectionStatus), default=InspectionStatus.PENDING)
    priority = Column(Enum(FaultSeverity), default=FaultSeverity.MEDIUM)
    scheduled_at = Column(DateTime(timezone=True), server_default=func.now())
    accepted_at = Column(DateTime(timezone=True), nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    technician_notes = Column(Text, nullable=True)
    repair_checklist = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    tank_id = Column(String(36), ForeignKey("tanks.id", ondelete="CASCADE"), nullable=False)
    predicted_cleaning_date = Column(DateTime(timezone=True), nullable=True)
    sediment_buildup_percentage = Column(Float, default=0.0)
    algae_growth_risk = Column(Float, default=0.0)
    contamination_risk = Column(Float, default=0.0)
    remaining_useful_life_days = Column(Integer, default=365)
    confidence_score = Column(Float, default=0.95)
    generated_at = Column(DateTime(timezone=True), server_default=func.now())

    tank = relationship("Tank", back_populates="predictions")
