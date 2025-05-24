from fastapi import APIRouter

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
