from fastapi import FastAPI
from app.api import auth, user, doctor, shared, admin

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
app.include_router(doctor.router, prefix="/doctor")
app.include_router(shared.router, prefix="/consult")
app.include_router(admin.router, prefix="/admin")