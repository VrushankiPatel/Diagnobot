import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy user and appointments data for demo
const userName = "Chocolate Parfait";

// health tips
const healthTips = [
	"Drink at least 8 glasses of water a day for optimal hydration.",
	"Take a short walk every hour to keep your body active.",
	"Remember to get 7-8 hours of sleep for better health.",
	"Eat a variety of fruits and vegetables daily.",
	"Take deep breaths and stretch to reduce stress.",
	"Wash your hands regularly to prevent illness.",
	"Limit screen time and take breaks to rest your eyes.",
	"Maintain a balanced diet rich in fiber and protein.",
	"Schedule regular checkups with your healthcare provider.",
	"Practice mindfulness or meditation for mental well-being.",
];

const UDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile & Greeting Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in-down gap-6">
        {/* Profile Summary */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-2 border-4 border-white">
            <span className="text-3xl font-bold text-blue-700">{userName[0]}</span>
          </div>
          <div className="font-semibold text-lg text-blue-700">{userName}</div>
          <button
            className="mt-2 px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium shadow"
            onClick={() => navigate("/user/settings")}
          >
            Edit Profile
          </button>
        </div>
        {/* Greeting */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2 text-center md:text-left animate-fade-in-down delay-100">
            Hi {userName.split(" ")[0]} 👋, here is your Diagnobot Dashboard
          </h1>
          <p className="text-gray-600 text-center md:text-left mb-2 animate-fade-in-down delay-200">
            Manage your health journey, appointments, and reports all in one place.
          </p>
        </div>
      </div>

      {/* Health Tip Section */}
      <div className="mb-8 flex items-center gap-3 bg-green-50 border-l-4 border-green-400 rounded-xl p-4 shadow animate-fade-in delay-300">
        <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" />
        </svg>
        <div>
          <div className="font-semibold text-green-700">Health Tip</div>
          <div className="text-green-700 text-sm">{healthTips[Math.floor(Math.random() * healthTips.length)]}</div>
        </div>
      </div>

    
      {/* Quick Actions Section */}
      <div className="mb-10">
        <div className="font-bold text-xl text-blue-700 mb-4">Quick Actions</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/user/chat"
            className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-500"
          >
            <span className="text-blue-600 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            <div className="font-semibold text-lg mb-1">Chat with Diagnobot</div>
            <div className="text-gray-500 text-sm text-center">
              Get instant answers and health advice from our AI-powered assistant.
            </div>
          </Link>
          <Link
            to="/user/appointments"
            className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-600"
          >
            <span className="text-blue-600 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <div className="font-semibold text-lg mb-1">Appointments</div>
            <div className="text-gray-500 text-sm text-center">
              Book, view, or manage your upcoming and past appointments.
            </div>
          </Link>
          <Link
            to="/user/reports"
            className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-700"
          >
            <span className="text-blue-600 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
                <rect x="5" y="3" width="14" height="18" rx="2" />
              </svg>
            </span>
            <div className="font-semibold text-lg mb-1">Reports</div>
            <div className="text-gray-500 text-sm text-center">
              Access your medical reports and download or share them securely.
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mb-10">
        <div className="font-bold text-xl text-blue-700 mb-4">Recent Activity</div>
        <div className="bg-white border border-blue-100 rounded-xl shadow p-5 flex items-center gap-4 animate-fade-in delay-800">
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" />
          </svg>
          <div>
            <div className="font-medium text-blue-700">You viewed your last report on 20/5/2025</div>
            <div className="text-gray-500 text-xs">Keep your records up to date for better care.</div>
          </div>
        </div>
      </div>

      {/* Other Dashboard Tiles */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/user/diagnosis"
          className="bg-white border border-blue-100 hover:shadow-lg rounded-xl p-5 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-900"
        >
          <span className="text-blue-600 mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 20v-6M12 4v4m0 0a4 4 0 110 8 4 4 0 010-8z" />
            </svg>
          </span>
          <div className="font-semibold text-base mb-1">Diagnosis History</div>
          <div className="text-gray-500 text-sm text-center">
            Review your previous AI diagnoses and doctor feedback.
          </div>
        </Link>
        <Link
          to="/user/settings"
          className="bg-white border border-blue-100 hover:shadow-lg rounded-xl p-5 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-1000"
        >
          <span className="text-blue-600 mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 008.6 15a1.65 1.65 0 00-1.82-.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0015.4 9a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 15z" />
            </svg>
          </span>
          <div className="font-semibold text-base mb-1">Settings</div>
          <div className="text-gray-500 text-sm text-center">
            Manage your profile, privacy, and notification preferences.
          </div>
        </Link>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-stagger { animation: fade-in 0.7s both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default UDashboard;