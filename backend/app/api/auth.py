from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserOut
from app.services.db import users_collection
from passlib.hash import bcrypt

router = APIRouter()

@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.dict()
    user_dict["password"] = bcrypt.hash(user.password)
    user_dict["is_verified"] = False
    user_dict["role"] = "user"

    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    return UserOut(**user_dict)