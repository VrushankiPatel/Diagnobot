# DiagnoBot 🧰

> Revolutionizing healthcare triage and diagnostics using AI.

---

## 🚨 Problem Statement

Healthcare systems are frequently overwhelmed, especially during emergencies or peak hours. This often leads to:

* Long wait times for non-critical cases
* Delayed attention for urgent cases
* Manual bottlenecks in appointment management and diagnosis

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
* Chat/Video room (WebRTC or Firebase)
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

## 🔍 Pages Overview

### General

* `/`: Landing page
* `/auth`: Login/Signup
* `/verify-email`: Verification

### User

* `/user/dashboard`: Main dashboard
* `/user/symptom-checker`: Form with voice/text
* `/user/diagnosis`: AI suggestions
* `/user/appointments`: View & manage
* `/user/reports`: Downloadable health reports
* `/user/payments`: Transactions & billing
* `/user/settings`: Profile config

### Doctor

* `/doctor/dashboard`: Overview
* `/doctor/schedule`: Manage availability
* `/doctor/consultation`: Consultation interface
* `/doctor/reports`: Patient reports
* `/doctor/settings`: Profile config

### Shared

* `/consult/:sessionId`: Live chat/video room

### Admin

* `/admin/dashboard`: Doctor approvals, analytics

---

## 📊 Judging Criteria Mapping

| Criteria             | Implementation                                         |
| -------------------- | ------------------------------------------------------ |
| **Software Quality** | GCP Hosting + GitLab CI + MongoDB Atlas + FastAPI      |
| **UI/UX**            | Fully responsive, modern dashboards using TailwindCSS  |
| **Developer Impact** | Open-source RAG pipeline + Templates + Documentation   |
| **Creativity**       | AI triage logic, live doctor routing, phone bot vision |

---

## 🎨 Future Plans

* Add Phone Call AI Bot (Twilio or similar)
* More language support
* Multi-specialty dataset enhancement
* AI-powered doctor assistant mode

---

## 👥 Team DiagnoBot

| Name     | Role                          | Skills                                |
| -------- | ----------------------------- | ------------------------------------- |
| Ewa      | ML + Data + Backend           | Python, Langchain, RAG, MongoDB       |
| Person 1 | Frontend & UI/UX Lead         | React.js, TailwindCSS, Design Systems |
| Person 2 | Data Engineer + Viz           | Python, Pandas, Chart.js, Plotly      |
| Person 3 | XR/VR Enthusiast + AI Trainee | XR Tools, Prompting, Frontend         |

> **Built for the AI in Action Hackathon 2025**

---

## 📚 References & Datasets

* [https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics](https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics)
* [https://github.com/TAMustafa/Local\_Chat\_RAG](https://github.com/TAMustafa/Local_Chat_RAG)
* [https://www.kaggle.com/datasets/thedevastator/comprehensive-medical-q-a-dataset](https://www.kaggle.com/datasets/thedevastator/comprehensive-medical-q-a-dataset)
* [https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research](https://www.kaggle.com/datasets/pythonafroz/medquad-medical-question-answer-for-ai-research)
* [https://github.com/abachaa/MedQuAD](https://github.com/abachaa/MedQuAD)

---

## ✨ License

MIT License. Use, modify, and contribute to the project as needed!
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
