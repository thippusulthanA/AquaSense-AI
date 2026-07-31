import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    TECHNICIAN = "technician"
    USER = "user"

class TankStatus(str, enum.Enum):
    OPTIMAL = "optimal"
    GOOD = "good"
    WARNING = "warning"
    CRITICAL = "critical"
    OFFLINE = "offline"

class SensorType(str, enum.Enum):
    PH = "ph"
    TDS = "tds"
    TURBIDITY = "turbidity"
    TEMPERATURE = "temperature"
    WATER_LEVEL = "water_level"
    FLOW_RATE = "flow_rate"

class FaultSeverity(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class FaultStatus(str, enum.Enum):
    DETECTED = "detected"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"

class InspectionStatus(str, enum.Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class AlertType(str, enum.Enum):
    WATER_QUALITY = "water_quality"
    LEAKAGE = "leakage"
    PUMP_FAILURE = "pump_failure"
    VALVE_FAILURE = "valve_failure"
    OVERFLOW = "overflow"
    SENSOR_FAULT = "sensor_fault"
    SEDIMENT = "sediment"
