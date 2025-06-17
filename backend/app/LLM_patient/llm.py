from datasets import load_dataset
import pandas as pd
import openai
from dotenv import load_dotenv
import os
from sentence_transformers import SentenceTransformer
import pymongo
# Load the .env file
load_dotenv()
# Set API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")
dataset = load_dataset("FreedomIntelligence/medical-o1-reasoning-SFT", name="en")

dataset_df = pd.DataFrame(dataset['train'])
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_local_embedding(text):
    if not text or not isinstance(text, str):
        return None
    try:
        return model.encode(text).tolist()
    except Exception as e:
        print(f"Error in get_local_embedding: {e}")
        return None

# Apply the local embedding
dataset_df["Question_embedding_optimised"] = dataset_df['Question'].apply(get_local_embedding)

print(dataset_df.head())
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")
def get_mongo_client(mongo_uri):
  """Establish connection to the MongoDB."""
  try:
    client = pymongo.MongoClient(mongo_uri)
    print("Connection to MongoDB successful")
    return client
  except pymongo.errors.ConnectionFailure as e:
    print(f"Connection failed: {e}")
    return None
if not mongo_uri:
  print("MONGO_URI not set in environment variables")

mongo_client = get_mongo_client(mongo_uri)

# Ingest data into MongoDB
db = mongo_client['diagnosis_llm']
collection = db['llm_question_response']
documents = dataset_df.to_dict('records')
collection.insert_many(documents)

print("Data ingestion into MongoDB completed")

first_embedding = next((e for e in dataset_df["Question_embedding_optimised"] if e is not None), None)

next_embedding = next((e for e in dataset_df["Question_embedding_optimised"] if e is not None), None)

nexttt_embedding = next((e for e in dataset_df["Question_embedding_optimised"] if e is not None), None)


# if first_embedding:
#     n1 = len(first_embedding)
#     n2= len(next_embedding)
#     n3= len(nexttt_embedding)
#     print(f"Number of dimensions (numDimensions): {n1},{n2},{n3}")
# else:
#     print("No valid embedding found to determine numDimensions.")
