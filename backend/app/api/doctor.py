from fastapi import APIRouter, Depends, HTTPException
from models.doctor import Appointment
from sqlalchemy.orm import Session
from services.sqlite import get_db
from typing import List

router = APIRouter()

@router.get("/dashboard")
async def doctor_dashboard():
    return {"message": "Doctor Dashboard"}

@router.get("/schedule")
async def doctor_schedule():
    return {"availability": []}

@router.get("/consultation")
async def doctor_consultation():
    return {"consultations": []}

@router.get("/reports")
async def doctor_reports():
    return {"reports": []}

@router.get("/settings")
async def doctor_settings():
    return {"settings": {}}

@router.post("/appointment")
async def doctor_appointment_bookings(data: Appointment, db: Session = Depends(get_db)):
    try:
        appointment = Appointment(
            user_id=data.user_id,
            doctor_id=data.doctor_id,
            time=data.time,
            link=data.link,
            status=data.status,
            created_at=data.created_at,  # will be None → defaults to DB value
            updated_at=data.updated_at   # will be None → updated on change
        )
        db.add(appointment)
        db.commit()
        db.refresh(appointment)
        return {
            "id": appointment.id,
            "user_id": appointment.user_id,
            "doctor_id": appointment.doctor_id,
            "time": appointment.time,
            "link": appointment.link,
            "status": appointment.status,
            "created_at": appointment.created_at,
            "updated_at": appointment.updated_at
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Could not book appointment: {str(e)}")

@router.get("/appointment/doctor/{doctor_id}", response_model=List[Appointment])
async def get_appointments_by_doctor(doctor_id: int, db: Session = Depends(get_db)):
    appointments = db.query(Appointment)\
                     .filter(Appointment.doctor_id == doctor_id)\
                     .filter(Appointment.status == "scheduled")\
                     .all()
    
    if not appointments:
        raise HTTPException(status_code=404, detail="No scheduled appointments found for this doctor.")

    return appointments