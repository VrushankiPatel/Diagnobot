from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def admin_dashboard():
    return {
        "analytics": {},
        "pending_doctors": []
    }

# TODO: finalize above or below
# if using dependencies.py then change the route as below
from api.dependencies import get_current_user
from fastapi import Depends

@router.get("/dashboard")
async def user_dashboard(current_user: dict = Depends(get_current_user)):
    return {"message": f"Welcome {current_user['email']}"}