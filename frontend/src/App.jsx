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

// DOCTOR PAGES
import DoctorDashboard from "./pages/doctor/DDashboard";

import './App.css';

function App() {
 const location = useLocation();
  // List all paths where i'll HIDE the header
  const hideHeaderPaths = ['/', '/auth/login', '/auth/signup', '/privacy', '/terms', '/auth/forgot-password'];

  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
      <div className="flex flex-col min-h-screen">
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

          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<div className="text-center text-gray-500 mt-10">Page not found</div>} />
        </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
