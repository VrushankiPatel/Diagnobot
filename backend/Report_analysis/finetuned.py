import time
from google import genai
from google.genai.types import HttpOptions, CreateTuningJobConfig
import vertexai
from vertexai.tuning import sft
from vertexai.generative_models import GenerativeModel
from datasets import load_dataset
from google.cloud import aiplatform
PROJECT_ID = "medical-report-diagnosis"
LOCATION = "us-central1"

with open("Medical Rerort - Michael Johnson - Panic Attack Disorder.txt", "r") as file:
    medical_report = file.read()
vertexai.init(project="medical-report-diagnosis", location="us-central1")
sft_tuning_job = sft.train(
    source_model="gemini-2.0-flash-001",
    train_dataset="gs://diagnosis_chat/medical_gemini_format_full.jsonl",
)

# Polling for job completion
while not sft_tuning_job.has_ended:
    time.sleep(60)
    sft_tuning_job.refresh()

print(sft_tuning_job.tuned_model_name)
print(sft_tuning_job.tuned_model_endpoint_name)
print(sft_tuning_job.experiment)