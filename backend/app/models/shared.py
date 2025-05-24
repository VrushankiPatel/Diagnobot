from pydantic import BaseModel
from typing import Optional
from app.models.base import MongoModel

class ConsultationSession(MongoModel):
    session_id: str
    user_id: str
    doctor_id: str
    start_time: str
    status: str  # active, completed
