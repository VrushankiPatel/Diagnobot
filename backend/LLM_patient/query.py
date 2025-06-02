from sentence_transformers import SentenceTransformer
import openai
import os
import pymongo
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize local embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings

# Load OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Connect to MongoDB
mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise ValueError("MONGO_URI is not set in environment variables.")

try:
    mongo_client = pymongo.MongoClient(mongo_uri)
    db = mongo_client['diagnosis_llm']
    collection = db['llm_question_response'] 
    print("MongoDB connection successful.")
except Exception as e:
    raise ConnectionError(f"MongoDB connection failed: {e}")

def get_local_embedding(text):
    if not text or not isinstance(text, str):
        return None
    try:
        return model.encode(text).tolist()
    except Exception as e:
        print(f"Error in get_local_embedding: {e}")
        return None

def vector_search(user_query, collection):
    query_embedding = get_local_embedding(user_query)
    if query_embedding is None:
        return []

    pipeline = [
    {
        "$vectorSearch": {
            "index": "vector_index",
            "queryVector": query_embedding,
            "path": "Question_embedding_optimised", 
            "numCandidates": 150,
            "limit": 5
        }
    },
    {
        "$project": {
            "_id": 0,
            "Complex_CoT": 1,
            "Response": 1,
            "score": { "$meta": "vectorSearchScore" }
        }
    }
    ]


    try:
        return list(collection.aggregate(pipeline))
    except Exception as e:
        print(f"Vector search error: {e}")
        return []

def handle_user_query(query, collection):
    get_knowledge = vector_search(query, collection)

    if not get_knowledge:
        return "No relevant context found.", ""

    search_result = ''
    for result in get_knowledge:
        search_result += f"Reason: {result.get('Complex_CoT', 'N/A')}, Response: {result.get('Response', 'N/A')}\n"

    try:
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a system that provides potential disease diagnoses."},
                {"role": "user", "content": f"Answer this user query: {query} with the following context:\n{search_result}"}
            ]
        )
        return completion.choices[0].message.content, search_result
    except Exception as e:
        return f"OpenAI API error: {e}", search_result

# Sample query
query = "What can I do for a persistent cough and fever, fatigue, and muscle pain for 3 days?"
response, source_information = handle_user_query(query, collection)

print(f"Response: {response}")
print(f"Source Information:\n{source_information}")
