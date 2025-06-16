from fastapi import APIRouter, HTTPException , Depends
from models.shared import SignupRequest, User, LoginRequest
from sqlalchemy.orm import Session
from services.sqlite import get_db
from passlib.hash import bcrypt
from api.helper import verify_password,create_access_token

router = APIRouter()

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = bcrypt.hash(request.password)

    new_user = User(
        full_name=request.full_name,
        phone=request.phone,
        email=request.email,
        hashed_password=hashed_pwd,
        user_type=request.user_type,
        license=request.license if request.user_type == "doctor" else None,
        specialty=request.specialty if request.user_type == "doctor" else None
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": f"{request.user_type.capitalize()} account created successfully"}

@router.post("/login")
def login_user(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "user_type": user.user_type
    }

    access_token = create_access_token(token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "user_type": user.user_type
        }
    }