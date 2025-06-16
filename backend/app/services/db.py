from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client["health_app"]

users_collection = db["users"]
doctors_collection = db["doctors"]
sessions_collection = db["sessions"]