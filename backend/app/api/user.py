from fastapi import APIRouter, Body
from app.models.user import SymptomCheckRequest, DiagnosisResponse
from app.services.rag_pipeline import query_rag_pipeline

router = APIRouter()

@router.post("/symptom-checker", response_model=DiagnosisResponse)
async def symptom_checker(payload: SymptomCheckRequest):
    suggestions = await query_rag_pipeline(payload.text_input)
    return DiagnosisResponse(suggestions=suggestions)

@router.get("/dashboard")
async def user_dashboard():
    return {"msg": "User Dashboard"}

@router.get("/appointments")
async def user_appointments():
    return {"appointments": []}

@router.get("/reports")
async def user_reports():
    return {"reports": []}

@router.get("/payments")
async def user_payments():
    return {"payments": []}

@router.get("/settings")
async def user_settings():
    return {"settings": {}}
