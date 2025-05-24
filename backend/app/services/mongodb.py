from motor.motor_asyncio import AsyncIOMotorClient
from langchain.vectorstores import MongoDBAtlasVectorSearch
from langchain.embeddings import OpenAIEmbeddings
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client["health_app"]

async def get_vectorstore():
    embeddings = OpenAIEmbeddings()
    return MongoDBAtlasVectorSearch(collection=db["vectors"], embedding=embeddings)
