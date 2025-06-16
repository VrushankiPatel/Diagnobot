# backend/app/main.py
from fastapi import FastAPI
from api import auth
from api.auth import router as auth_router
from api.user import router as user_router
from api.doctor import router as doctor_router
from api.shared import router as shared_router
from api.admin import router as admin_router
from api.chatroom import router as chatroom_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/user")
app.include_router(doctor_router, prefix="/doctor")
app.include_router(shared_router, prefix="/consult")
app.include_router(admin_router, prefix="/admin")
app.include_router(chatroom_router, prefix="/chat")

########################################
from vertexai.generative_models import GenerativeModel
import vertexai
from vertexai.tuning import sft
from fastapi import File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# For PDF extraction
#import PyPDF2

# Project configuration
PROJECT_ID = "1066114559013"
LOCATION = "us-central1"
TUNING_JOB_ID = "3951065777095835648"

# Initialize Vertex AI
vertexai.init(project=PROJECT_ID, location=LOCATION)
tuning_job_name = f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{TUNING_JOB_ID}"

# Load the tuning job
sft_tuning_job = sft.SupervisedTuningJob(tuning_job_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def extract_text_from_pdf(file):
#     reader = PyPDF2.PdfReader(file)
#     text = ""
#     for page in reader.pages:
#         text += page.extract_text() or ""
#     return text

import logging

logging.basicConfig(format='[ %(levelname)s ] %(message)s', level=logging.DEBUG)

@app.post("/api/analyze-report")
async def analyze_report(file: UploadFile = File(...)):
    logging.debug(f"Received file: {file.filename}")
    filename = file.filename.lower()
    logging.debug(f"Lowercased file name: {filename}")
    if filename.endswith(".txt"):
        content = (await file.read()).decode("utf-8")
        logging.debug("Read .txt file successfully.")
    elif filename.endswith(".pdf"):
        content = extract_text_from_pdf(file.file)
        logging.debug("Extracted PDF content successfully.")
    else:
        logging.error("Unsupported file.")
        return {"error": "Unsupported file type. Please upload a .txt or .pdf file."}

    logging.debug("Generating content with tuned model.")
    tuned_model = GenerativeModel(sft_tuning_job.tuned_model_endpoint_name)
    response = tuned_model.generate_content(content)
    logging.debug("Model responded.")
    return {"analysis": response.text}