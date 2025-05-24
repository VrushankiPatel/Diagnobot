from fastapi import APIRouter

router = APIRouter()

@router.get("/{session_id}")
async def consult_session(session_id: str):
    return {"session_id": session_id, "status": "active"}
