# from sentence_transformers import SentenceTransformer
# import openai
# import os
# import pymongo
# from dotenv import load_dotenv
# from google import genai
# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# import main import app
#
# # Allow frontend to call backend (CORS)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Or restrict to your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# @app.post("/api/diagnosis")
# async def diagnosis(request: Request):
#     data = await request.json()
#     query = data.get("query")
#     response, context = handle_user_query(query, collection)
#     return {"response": response, "context": context}
# # Load environment variables
# load_dotenv()
#
# # Initialize local embedding model
# model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings
#
# # Load OpenAI API Key
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# client = genai.Client(api_key=GOOGLE_API_KEY)
# # Connect to MongoDB
# mongo_uri = os.getenv("MONGO_URI")
# if not mongo_uri:
#     raise ValueError("MONGO_URI is not set in environment variables.")
#
# try:
#     mongo_client = pymongo.MongoClient(mongo_uri)
#     db = mongo_client['diagnosis_llm']
#     collection = db['llm_question_response']
#     print("MongoDB connection successful.")
# except Exception as e:
#     raise ConnectionError(f"MongoDB connection failed: {e}")
#
# def get_local_embedding(text):
#     if not text or not isinstance(text, str):
#         return None
#     try:
#         return model.encode(text).tolist()
#     except Exception as e:
#         print(f"Error in get_local_embedding: {e}")
#         return None
#
# def vector_search(user_query, collection):
#     query_embedding = get_local_embedding(user_query)
#     if query_embedding is None:
#         return []
#
#     pipeline = [
#     {
#         "$vectorSearch": {
#             "index": "vector_index",
#             "queryVector": query_embedding,
#             "path": "Question_embedding_optimised",
#             "numCandidates": 150,
#             "limit": 5
#         }
#     },
#     {
#         "$project": {
#             "_id": 0,
#             "Complex_CoT": 1,
#             "Response": 1,
#             "score": { "$meta": "vectorSearchScore" }
#         }
#     }
#     ]
#
#
#     try:
#         return list(collection.aggregate(pipeline))
#     except Exception as e:
#         print(f"Vector search error: {e}")
#         return []
# def handle_user_query(query, collection):
#     knowledge = vector_search(query, collection)
#     if not knowledge:
#         return "No relevant context found.", ""
#
#     context = "\n".join(
#         f"Reason: {r.get('Complex_CoT', 'N/A')}, Response: {r.get('Response', 'N/A')}"
#         for r in knowledge
#     )
#
#     try:
#         response = client.models.generate_content(
#             model = "gemini-1.5-flash",
#             contents=f"You are a system that provides potential disease diagnoses. "
#             "Use the following knowledge as background information ONLY to support your answer. "
#             "Based on the user's symptoms and the knowledge base, always suggest at least one possible disease or condition, even if you are uncertain."
#             "Do NOT analyze or summarize the knowledge itself. "
#             "Focus on answering the user's query directly and accurately. "
#             "If the knowledge is relevant, use it to support your answer, but do not repeat or explain it. "
#             f"User query: {query}\n"
#             f"Knowledge base:\n{context}"
#         )
#         return response.text, context
#     except Exception as e:
#         return f"Gemini API error: {e}", context
#
# # Test it
# #query = "What can I do for a persistent cough and fever, fatigue, and muscle pain for 3 days?"
# #response, source_information = handle_user_query(query, collection)
#
# #print(f"Response: {response}")
# #print(f"Source Information:\n{source_information}")