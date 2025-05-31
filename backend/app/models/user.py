from pydantic import EmailStr, BaseModel, validator
from typing import List, Optional
from app.models.base import MongoModel

from sqlalchemy.ext.declarative import declarative_base

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

class SymptomCheckRequest(BaseModel):
    text_input: str
    voice_input_url: Optional[str] = None

class DiagnosisResponse(BaseModel):
    suggestions: List[str]

