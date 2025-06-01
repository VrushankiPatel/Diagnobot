from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.symptom_checker import SymptomCheckerRequest
from app.models.user import SymptomCheckRecord, DiagnosisResponse
from app.services.rag_pipeline import generate_diagnosis
from app.services.sqlite import get_db

router = APIRouter()

@router.post("/symptom-checker")
def symptom_checker(request: SymptomCheckerRequest, db: Session = Depends(get_db)):
    # Prompt for LLM
    prompt = f"""
    The patient presents with the following:
    Symptoms: {', '.join(request.symptomChips)}
    Duration: {request.duration or None}
    Onset Date: {request.onsetDate or None}
    Location: {request.location or None}
    Urgency: {request.urgency}
    Risk Factors: {', '.join(request.riskFactors or [])}
    Similar issues in past: {request.hadSimilar or None}
    """

    response = generate_diagnosis(prompt)

    record = SymptomCheckRecord(
        symptoms=request.symptomChips,
        duration=request.duration,
        onset_date=request.onsetDate,
        location=request.location,
        urgency=request.urgency,
        risk_factors=request.riskFactors,
        had_similar=request.hadSimilar,
        file_name=request.fileName,
        file_url=request.fileUrl,
        response=response
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {"response": response, "id": record.id}

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
