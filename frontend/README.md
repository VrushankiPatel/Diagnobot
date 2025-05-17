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
cd diagnobot/frontend
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
│   ├── routes/        # Route definitions
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