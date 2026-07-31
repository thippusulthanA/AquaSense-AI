import os
import sys

# Ensure backend imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.core.database import engine, Base, SessionLocal
from app.core.security import get_password_hash
from app.models import User, UserRole, Tank, TankStatus, Sensor, SensorType, Inspection, InspectionStatus, FaultSeverity

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Admin User
        admin_user = db.query(User).filter(User.email == "admin@aquasense.ai").first()
        if not admin_user:
            admin_user = User(
                email="admin@aquasense.ai",
                hashed_password=get_password_hash("admin123"),
                full_name="Alex Rivera (Master Admin)",
                role=UserRole.ADMIN,
                campus_building="HQ Admin Control"
            )
            db.add(admin_user)

        # 2. Technician User
        tech_user = db.query(User).filter(User.email == "tech@aquasense.ai").first()
        if not tech_user:
            tech_user = User(
                email="tech@aquasense.ai",
                hashed_password=get_password_hash("tech123"),
                full_name="Jordan Lee (Field Engineer)",
                role=UserRole.TECHNICIAN,
                campus_building="Engineering Wing"
            )
            db.add(tech_user)

        # 3. Resident User
        resident_user = db.query(User).filter(User.email == "user@aquasense.ai").first()
        if not resident_user:
            resident_user = User(
                email="user@aquasense.ai",
                hashed_password=get_password_hash("user123"),
                full_name="Sarah Miller (Student Union Rep)",
                role=UserRole.USER,
                campus_building="Student Union"
            )
            db.add(resident_user)

        db.commit()

        # 4. Tanks
        tank1 = db.query(Tank).filter(Tank.code == "TANK-01").first()
        if not tank1:
            tank1 = Tank(
                name="North Campus Main Reservoir",
                code="TANK-01",
                location_building="North Quad",
                latitude=37.7749,
                longitude=-122.4194,
                capacity_liters=50000.0,
                current_volume_liters=46000.0,
                health_score=92,
                status=TankStatus.OPTIMAL
            )
            db.add(tank1)

        tank2 = db.query(Tank).filter(Tank.code == "TANK-02").first()
        if not tank2:
            tank2 = Tank(
                name="Engineering Quad Tower",
                code="TANK-02",
                location_building="Engineering Bldg B",
                latitude=37.7752,
                longitude=-122.4180,
                capacity_liters=25000.0,
                current_volume_liters=19500.0,
                health_score=78,
                status=TankStatus.WARNING
            )
            db.add(tank2)

        db.commit()
        print("Database successfully seeded with AquaSense-AI v2.0 baseline data!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
