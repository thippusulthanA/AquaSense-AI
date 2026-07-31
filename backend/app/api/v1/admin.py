from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, Technician

router = APIRouter()

@router.get("/users")
def get_admin_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/technicians")
def get_admin_technicians(db: Session = Depends(get_db)):
    return db.query(Technician).all()
