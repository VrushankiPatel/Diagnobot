from pydantic import BaseModel
from typing import Optional
from models.base import MongoModel
from sqlalchemy import Column, String, Integer
from pydantic import EmailStr, BaseModel, validator
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ConsultationSession(MongoModel):
    session_id: str
    user_id: str
    doctor_id: str
    start_time: str
    status: str  # active, completed

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    user_type = Column(String, nullable=False)  # 'user' or 'doctor'
    license = Column(String, nullable=True)
    specialty = Column(String, nullable=True)

class SignupRequest(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    password: str
    user_type: str  # "user" or "doctor"
    license: str = None
    specialty: str = None

    @validator("user_type")
    def validate_user_type(cls, v):
        if v not in {"user", "doctor"}:
            raise ValueError("user_type must be 'user' or 'doctor'")
        return v

    @validator("license", always=True)
    def validate_license_for_doctor(cls, v, values):
        if values.get("user_type") == "doctor" and not v:
            raise ValueError("Medical license is required for doctors")
        return v

    @validator("specialty", always=True)
    def validate_specialty_for_doctor(cls, v, values):
        if values.get("user_type") == "doctor" and not v:
            raise ValueError("Specialty is required for doctors")
        return v
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str




