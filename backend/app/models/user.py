from pydantic import EmailStr, BaseModel, validator
from typing import List, Optional
from app.models.base import MongoModel

from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserOut(MongoModel):
    email: EmailStr
    full_name: Optional[str]
    is_verified: bool = False
    role: str = "user"  # TODO: "doctor", "admin"

class SymptomCheckRecord(Base):
    __tablename__ = "symptom_checker"

    id = Column(Integer, primary_key=True, index=True)
    symptoms = Column(JSON, nullable=False)
    duration = Column(String, nullable=True)
    onset_date = Column(String, nullable=True)
    location = Column(String, nullable=True)
    urgency = Column(String, nullable=False)
    risk_factors = Column(JSON, nullable=True)
    had_similar = Column(String, nullable=True)
    file_name = Column(String, nullable=True)
    file_url = Column(String, nullable=True)
    response = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DiagnosisResponse(BaseModel):
    suggestions: List[str]

