from pydantic import BaseModel
from typing import List, Optional
from app.models.base import MongoModel
from datetime import datetime


class DoctorProfile(MongoModel):
    name: str
    specialization: str
    availability: List[str]  # ISO timestamps
    approved: bool = False

class ConsultationNote(BaseModel):
    session_id: str
    patient_id: str
    notes: str


class Appointment(BaseModel):
    user_id: int
    doctor_id: int
    time: datetime
    link: Optional[str] = None
    status: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

