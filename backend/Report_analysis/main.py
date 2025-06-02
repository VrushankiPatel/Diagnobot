from vertexai.generative_models import GenerativeModel
import vertexai
from vertexai.tuning import sft

# Project configuration
PROJECT_ID = "1066114559013" 
LOCATION = "us-central1"
TUNING_JOB_ID = "3951065777095835648"

# Initialize Vertex AI
vertexai.init(project=PROJECT_ID, location=LOCATION)
tuning_job_name = f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{TUNING_JOB_ID}"

# Load the tuning job
sft_tuning_job = sft.SupervisedTuningJob(tuning_job_name)

# Read your input text
with open("Medical_report.txt", "r") as file:
    medical_report = file.read()

# Initialize the tuned model from endpoint name
tuned_model = GenerativeModel(sft_tuning_job.tuned_model_endpoint_name)

# Generate content
response = tuned_model.generate_content(medical_report)
print(response.text)
