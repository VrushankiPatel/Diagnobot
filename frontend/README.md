# DiagnoBot Frontend 🔌

This is the **frontend** component of the DiagnoBot project. It is built using **React.js** and styled with **TailwindCSS**.

---

## 🚀 Tech Stack

* React.js (Vite)
* TailwindCSS
* Axios (API calls)
* React Router DOM
* Zustand (state management)
* WebRTC / Firebase (optional video calls)
* ESLint + Prettier

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
cd Diagnobot/frontend
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## 🌐 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/        # Static files (images, icons)
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── store/         # Zustand store(s)
│   ├── utils/         # Helper functions
│   ├── hooks/         # Custom hooks
│   └── main.jsx       # Entry point
```

---

## 📓 Available Pages

### General

* `/`: Landing page
* `/auth`: Login/Signup

### User

* `/user/dashboard`
* `/user/symptom-checker`
* `/user/diagnosis`
* `/user/appointments`
* `/user/reports`
* `/user/settings`

### Doctor

* `/doctor/dashboard`
* `/doctor/schedule`
* `/doctor/consultation`
* `/doctor/settings`

### Admin

* `/admin/dashboard`

### Shared

* `/consult/:sessionId`: Real-time chat/video session



## 1. **Landing Page**

**Purpose**: Entry point to the platform.

**Features**:

- Tagline + brief explanation of services
- CTA buttons: `Login`, `Sign up`
- Testimonials / Screenshots / How It Works
- Links to Privacy Policy and Terms

**Navigation**:

- Leads to: `/auth` (Login/Signup Page)

---

## 🔐 2. **Auth Page**

Route: `/auth`

### a. **Login Tabs (User/Doctor)**

Features:

- Toggle between **User Login** and **Doctor Login**
- Email + Password fields
- "Forgot password" and "Signup" links
- OAuth option (if enabled)
- Redirect after login:
    - User → `/user/dashboard`
    - Doctor → `/doctor/dashboard`
    
### b. **Signup Tabs (User/Doctor)**

Features:

- Choose role: **User** or **Doctor**
- Standard info (email, password, name, phone)
- For doctors: License upload and verification form
- Privacy Policy and Terms of Service
- Redirect after login:
    - User → `/user/dashboard`
    - Doctor → `/doctor/dashboard`

---

## 🧑‍💻 3. **User Dashboard**

Route: `/user/dashboard`

**Sections**:

1. **Symptom Checker (Form)** — `/user/symptom-checker`
    - Text + Voice-to-Text (Whisper API)
    - Fields: Symptoms, duration, urgency level
    - On submit:
        - If Level 3 → AI Diagnosis page
        - If Level 2 → redirect to live chat/video

2. **AI Diagnosis Page** — `/user/diagnosis`
    - Shows smart diagnosis suggestions from LLM
    - Basic care steps, OTC recommendations
    - Option to book doctor consultation

3. **Appointment History** — `/user/appointments`
    - List of past and upcoming appointments
    - Status (Completed / Pending / Cancelled)
    - View attached reports, join session

4. **Medical Reports** — `/user/reports`
    - Auto-generated reports from past visits
    - Download/print/share options
    - Update to dashboard after each interaction

5. **Payments Page** — `/user/payments`
    - View history
    - Payment method management
    - Pay for appointments or premium access

6. **User Profile/Settings** — `/user/settings`
    - Manage personal info, password
    - Notification preferences

---

## 🩺 4. **Doctor Dashboard**

Route: `/doctor/dashboard`

**Sections**:

1. **Schedule Management** — `/doctor/schedule`
    - Set working hours
    - See upcoming appointments
    - Accept/reschedule appointments
    
2. **Consultation Room** — `/doctor/consultation`
    - Live chat/video UI with patient
    - Access to patient symptom form & history
    - Generate and submit medical report

3. **Patient Reports** — `/doctor/reports`
    - View reports submitted for patients
    - Option to add/update notes

4. **Doctor Profile/Settings** — `/doctor/settings`
    - Manage license details, bio, contact
    - Change availability

---

## 💬 5. **Live Chat / Video Room ⇒ Needs more discussion**

Route: `/consult/:sessionId`

**Shared Between Users & Doctors**

Features:

- Secure room with session ID
- Chat or Video toggle
- End session → triggers report generation
- File sharing (e.g., prescriptions, test results)
- Backend sync to dashboard/report

---

## 📋 6. **Admin Pages (Optional, but useful since we might Manage Doctors)**

### Admin Dashboard — `/admin/dashboard`

- Approve doctor registrations
- View users and data trends
- Manage datasets (for model training)

---

## ✅ Other Pages

### a. **Verification Page** — `/verify-email`

- For email/license verification flows

### b. **Error Pages**

- 404 Page Not Found
- 500 Internal Error

### c. **Privacy Policy Page** - `/privacy`


### d. **Terms of Service Page** - `/terms`


---

## 📂 Components & Integration Checklist

| Feature | Needed Pages/Routes | Dependencies |
| --- | --- | --- |
| Voice-to-Text | `/user/symptom-checker` | Whisper API |
| AI Diagnosis | `/user/diagnosis` | Langchain, RAG, Vector DB |
| Chat/Video | `/consult/:sessionId` | WebRTC, Firebase or custom signaling |
| Doctor Verification | `/auth`, `/admin/dashboard` | Admin backend, File Upload, Review system |
| Payments | `/user/payments` | Stripe / PayPal SDK |
| Report Generation | `/doctor/consultation`, `/user/reports` | LLM + templated report formatting |
| Medical File Attachments | `/user/symptom-checker`, `/user/appointments` | File upload + Firebase/Supabase bucket |

---

## 🚫 Known Issues / To-do

* [ ] Mobile responsiveness polish
* [ ] Dark mode toggle
* [ ] Improved form validation & error boundaries
* [ ] Deploy to Netlify / Vercel
* [ ] Video call integration

---

## ✨ Contributing

Pull requests and suggestions welcome!

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)