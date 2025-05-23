import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import Privacy from "./pages/PrivacyPolicy";
import Terms from "./pages/TOS";
import './App.css';

function App() {
 const location = useLocation();
  // List all paths where i'll HIDE the header
  const hideHeaderPaths = ['/', '/auth/login', '/auth/signup', '/privacy', '/terms'];

  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
      <div className="flex flex-col min-h-screen">
        {!hideHeader && <Header />}
        <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignIn />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
