# DiagnoBot 🧰

> Revolutionizing healthcare triage and diagnostics using AI.

---

## 🚨 Problem Statement

Healthcare systems are frequently overwhelmed, especially during emergencies or peak hours. This often leads to:

* Long wait times for non-critical cases
* Delayed attention for urgent cases
* Manual bottlenecks in appointment management and diagnosis

### Project Demo: https://screenrec.com/share/waJq8y6NTM

### We asked ourselves:

> "What if AI could assist in determining patient urgency, suggest first-line care, and help route them to the right doctor immediately?"

---

## 🎯 Our Solution: **DiagnoBot**

DiagnoBot is a smart AI-powered healthcare portal that automates:

* Patient triage
* Preliminary diagnosis
* Instant care suggestions
* Doctor connections via chat/video
* Dashboard-based health records management

It bridges the gap between overwhelmed hospitals and underserved patients using conversational AI, machine learning, and intelligent scheduling.

---

## 🌟 Key Features (MVP)

### 👥 Patient Experience

* Symptom Checker Form with text & voice-to-text (Whisper API)
* AI-based triage:

  * **Level 3 (Non-Urgent)**: LLM-based diagnosis with care tips
  * **Level 2 (Semi-Urgent)**: Redirect to live doctor chat/video
* Medical report generation post-interaction
* Appointment scheduling with file uploads
* Dashboard for past/future appointments & reports

### 👨‍⚕️ Doctor Portal

* License-verified onboarding
* Availability & schedule management
* Patient chat/video consultation room
* Report submission per session

### 📊 Admin Controls

* Review & approve doctors
* View system usage and trends
* Manage datasets for AI training

### 🔎 AI & NLP

* Langchain + RAG for intelligent response generation
* Whisper API / Google Speech-to-Text for voice input
* MongoDB Atlas Vector Store for semantic retrieval
* AI report generation templating with user history

---

## 🔹 Architecture Overview

```
Frontend (React + TailwindCSS)
   ↓
FastAPI Backend (Python)
   ↓
Langchain  →  RAG Pipeline → MongoDB VectorDB
   ↓
GCP Hosting + Whisper API
```

---

## 🛠️ Tech Stack

### 🧬 Backend

* **Python (FastAPI)**
* **Langchain + MongoDB VectorDB** for RAG
* **GCP (Cloud Functions / App Engine)**
* **Whisper API / Google Speech-to-Text**

### 💻 Frontend

* **React.js + TailwindCSS**
* User-friendly dashboards

### 📁 Database

* **MongoDB Atlas**

  * Patients, Doctors, Appointments, Reports
  * VectorStore for smart queries

---

## 🔄 Feature Flow

### 📅 Patient

1. Signup/Login
2. Fill symptom form (text or voice)
3. AI checks urgency level:

   * Level 3: show diagnosis instantly
   * Level 2: connect to doctor
4. Post-session:

   * Auto-generate & store report
   * Dashboard update
   * Option to pay / book again

### 👩‍⚕️ Doctor

1. Register & verify license
2. Set availability
3. Accept appointments
4. Chat/video with patients
5. Submit report

### 📅 Admin (Optional)

* Approve/reject doctor registration
* Moderate system content
* Control dataset ingestion

---

## 📊 Judging Criteria Mapping

| Criteria             | Implementation                                         |
| -------------------- | ------------------------------------------------------ |
| **Software Quality** | GCP Hosting  + MongoDB Atlas + FastAPI                 |
| **UI/UX**            | Fully responsive, modern dashboards using TailwindCSS  |
| **Developer Impact** | Open-source RAG pipeline + Templates + Documentation   |
| **Creativity**       | AI triage logic, live doctor routing, phone bot vision |

---

## 🎨 Future Plans

* **Level 1 Emergency Routing**: Future plans to escalate emergencies to EMS services
* **Phone Bot Integration**: Add AI voice assistant to handle inbound calls
* **Doctor Recommendation Engine**: Match patients to doctors based on symptoms, specialty, and availability
* **Health Insights**: Track user trends and suggest preventive care
* **HIPAA Compliance & Security**: Strengthen data protection for real deployments
* **Clinical Trials / NGO Partnerships**: Validate and pilot in rural or under-resourced areas
* **Payment System Integeration**: Integerate secure appointment payments and history tracking (Stripe for payments)

---

## 👥 Team DiagnoBot

| Name          | Role               | Skills                                | Responsibilities                                                                                                                            |
| ------------- | ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Joanna**    | ML + Data Engineer | Python, LangChain, RAG, MongoDB       | - Develop AI triage logic<br>- Build and fine-tune RAG pipeline<br>- Handle AI chat integerations for symptom diagnosis <br>- Handle file uploads and exports |
| **Ewa**       | Frontend Engineer  | React.js, TailwindCSS, Design Systems | - Build user-friendly dashboards<br>- Implement chat/video UI<br>- Helped connect frontend to APIs<br>- Design responsive UX                       |
| **Vrushanki** | Backend Engineer 1 | Python, RAG, MongoDB                  | - Develop RESTful APIs with FastAPI<br>- Whisper API integration<br>- Implement authentication and routing                        |
| **Akanksh**   | Backend Engineer 2 | RAG, MongoDB                          | - Set up Google Cloud infra<br>- Configure database and deployment<br>- Configure vector DB with medical datasets                    |


> **Built for the AI in Action Hackathon 2025**

---

## 📚 References & Datasets

* [LLM Chat Dataset](https://huggingface.co/datasets/FreedomIntelligence/medical-o1-reasoning-SFT/viewer/en/train?views%5B%5D=en&row=46)
* [https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics](https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics)
* [https://github.com/TAMustafa/Local\_Chat\_RAG](https://github.com/TAMustafa/Local_Chat_RAG)
* [https://www.kaggle.com/datasets/thedevastator/comprehensive-medical-q-a-dataset](https://www.kaggle.com/datasets/thedevastator/comprehensive-medical-q-a-dataset)
* [https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)
* [https://github.com/abachaa/MedQuAD](https://github.com/abachaa/MedQuAD)

---

## ✨ License

MIT License. Use, modify, and contribute to the project as needed!
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
