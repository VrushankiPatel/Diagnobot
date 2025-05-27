import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Privacy from "./pages/PrivacyPolicy";
import Terms from "./pages/TOS";

//USER PAGES
import UserDashboard from "./pages/user/UDashboard";
import USymptomChecker from "./pages/user/USymptomChecker";
import UDiagnosis from "./pages/user/UDiagnosis";
import UAppointments from "./pages/user/UAppointments";
import UReports from "./pages/user/UReports";
import USettings from "./pages/user/USettings";
import UPayments from './pages/user/UPayments';

// DOCTOR PAGES
import DoctorDashboard from "./pages/doctor/DDashboard";
import DoctorSchedule from "./pages/doctor/DSchedule";
import DoctorConsultation from "./pages/doctor/DConsult";
import DoctorSettings from "./pages/doctor/DSettings";
import DoctorReports from "./pages/doctor/DReports";

import './App.css';

function App() {
 const location = useLocation();
  // List all paths where i'll HIDE the header
  const hideHeaderPaths = ['/', '/auth/login', '/auth/signup', '/privacy', '/terms', '/auth/forgot-password'];

  const hideHeader = hideHeaderPaths.includes(location.pathname);

  // Helper to go back to previous page
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignIn />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/symptom-checker" element={<USymptomChecker />} />
          <Route path="/user/diagnosis" element={<UDiagnosis />} />
          <Route path="/user/appointments" element={<UAppointments />} />
          <Route path="/user/reports" element={<UReports />} />
          <Route path="/user/settings" element={<USettings />} />
          <Route path="/user/payments" element={<UPayments />} />

          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
          <Route path="/doctor/consultation" element={<DoctorConsultation />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />
          <Route path="/doctor/reports" element={<DoctorReports />} />

          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
                <p className="mb-6 text-gray-500 text-center max-w-md">
                  Sorry, the page you are looking for does not exist or has been moved.<br />
                  Please check the URL or return to your previous page.
                </p>
                <button
                  onClick={handleGoBack}
                  className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                >
                  Go Back
                </button>
              </div>
            }
          />

            {/* 500 Internal Error Route */}
          <Route
            path="/500"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-6xl font-extrabold text-red-600 mb-4">500</h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Internal Server Error</h2>
                <p className="mb-6 text-gray-500 text-center max-w-md">
                  Oops! Something went wrong on our end.<br />
                  Please try again later or return to your previous page.
                </p>
                <button
                  onClick={handleGoBack}
                  className="px-6 py-2 rounded bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                >
                  Go Back
                </button>
              </div>
            }
          />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
