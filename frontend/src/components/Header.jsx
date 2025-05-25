import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const userLinks = [
  { to: "/user/dashboard", label: "Dashboard" },
  { to: "/user/symptom-checker", label: "Symptom Checker" },
  { to: "/user/diagnosis", label: "Diagnosis" },
  { to: "/user/appointments", label: "Appointments" },
  { to: "/user/reports", label: "Reports" },
  { to: "/user/settings", label: "Settings" },
  { to: "/user/payments", label: "Payments" },
];

const doctorLinks = [
  { to: "/doctor/dashboard", label: "Dashboard" },
  { to: "/doctor/schedule", label: "Schedule" },
  { to: "/doctor/consultation", label: "Consultation" },
  { to: "/doctor/reports", label: "Reports" },
  { to: "/doctor/settings", label: "Settings" },
];

const Header = () => {
  // Use state and effect to react to changes in localStorage (userType)
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "user");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen for changes in location and localStorage (userType)
  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "user");
  }, [location]);

  const links = userType === "doctor" ? doctorLinks : userLinks;

  const handleVideoCall = () => {
    const sessionId = Math.random().toString(36).substring(2, 10);
    navigate(`/consult/${sessionId}`);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={userType === "doctor" ? "/doctor/dashboard" : "/user/dashboard"} className="font-bold text-xl text-blue-700">
          DiagnoBot
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleVideoCall}
            className="ml-2 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
            title="Start Video Call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Open menu"
        >
          <svg className="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-blue-50 animate-fade-in-down">
          <nav className="flex flex-col gap-2 px-6 py-4">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-700 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleVideoCall}
              className="flex items-center gap-2 text-blue-700 font-semibold py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Video Call
            </button>
          </nav>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-16px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down { animation: fade-in-down 0.3s both; }
      `}</style>
    </header>
  );
};

export default Header;