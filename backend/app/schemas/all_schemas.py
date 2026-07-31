from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.enums import UserRole, TankStatus, SensorType, FaultSeverity, FaultStatus, InspectionStatus, AlertType

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: Optional[str] = None
    role: Optional[UserRole] = UserRole.USER
    campus_building: Optional[str] = None

class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: UserRole
    campus_building: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# Tank Schemas
class TankBase(BaseModel):
    name: str
    code: str
    location_building: str
    latitude: float
    longitude: float
    capacity_liters: float

class TankCreate(TankBase):
    pass

class TankOut(TankBase):
    id: str
    current_volume_liters: float
    status: TankStatus
    health_score: int
    last_cleaned_at: Optional[datetime] = None
    next_recommended_cleaning: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Sensor & Telemetry Schemas
class SensorReadingCreate(BaseModel):
    sensor_code: str
    value: float

class SensorReadingOut(BaseModel):
    id: str
    sensor_id: str
    tank_id: str
    value: float
    timestamp: datetime
    is_anomaly: bool

    class Config:
        from_attributes = True

# Inspection & Maintenance Schemas
class InspectionCreate(BaseModel):
    tank_id: str
    title: str
    priority: Optional[FaultSeverity] = FaultSeverity.MEDIUM
    notes: Optional[str] = None

class InspectionOut(BaseModel):
    id: str
    inspection_code: str
    tank_id: str
    technician_id: Optional[str] = None
    status: InspectionStatus
    priority: FaultSeverity
    scheduled_at: datetime
    technician_notes: Optional[str] = None
    repair_checklist: Optional[Any] = None
    created_at: datetime

    class Config:
        from_attributes = True

# AI Chat Schemas
class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    suggested_actions: Optional[List[str]] = None
    cited_sop: Optional[str] = None
