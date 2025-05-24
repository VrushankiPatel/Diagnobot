from pydantic import BaseModel
from typing import List, Optional
from app.models.base import MongoModel

class DoctorProfile(MongoModel):
    name: str
    specialization: str
    availability: List[str]  # ISO timestamps
    approved: bool = False

class ConsultationNote(BaseModel):
    session_id: str
    patient_id: str
    notes: str
