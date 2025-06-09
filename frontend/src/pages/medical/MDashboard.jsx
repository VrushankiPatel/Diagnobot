import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy medical partner profile and data
const partnerProfile = {
  name: "Sunrise Medical Center",
  type: "Hospital",
  image: "",
};

const metrics = [
  { label: "Total Patients Served", value: 1240, icon: "👥", color: "bg-blue-100 text-blue-700" },
  { label: "Active Doctors", value: 38, icon: "🩺", color: "bg-green-100 text-green-700" },
  { label: "Appointments This Month", value: 312, icon: "📅", color: "bg-yellow-100 text-yellow-700" },
  { label: "Reports Uploaded", value: 210, icon: "📄", color: "bg-purple-100 text-purple-700" },
];

const recentActivities = [
  { date: "09/06/2025", activity: "Uploaded 12 new lab reports." },
  { date: "08/06/2025", activity: "Added 2 new doctors to the platform." },
  { date: "07/06/2025", activity: "Scheduled 30+ appointments." },
];

const partnerMessages = [
  { from: "Diagnobot Admin", message: "Your monthly report is ready for download.", date: "Today" },
  { from: "Support", message: "System maintenance scheduled for 12th June.", date: "Yesterday" },
];

function MDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile & Greeting Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in-down gap-6">
        {/* Profile Summary */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-2 border-4 border-white overflow-hidden">
            {partnerProfile.image ? (
              <img src={partnerProfile.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-blue-700">{partnerProfile.name[0]}</span>
            )}
          </div>
          <div className="font-semibold text-lg text-blue-700">{partnerProfile.name}</div>
          <div className="text-gray-500 text-sm">{partnerProfile.type}</div>
          <Link
            to="/medical/settings"
            onClick={() => navigate("/medical/settings")}
            className="mt-2 px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium shadow"
          >
            Edit Profile
          </Link>
        </div>
        {/* Greeting */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2 text-center md:text-left animate-fade-in-down delay-100">
            Welcome, {partnerProfile.name} 👋
          </h1>
          <p className="text-gray-600 text-center md:text-left mb-2 animate-fade-in-down delay-200">
            View your organization’s key metrics, manage doctors, and monitor activities.
          </p>
          {/* Quick Info */}
          <div className="mt-4 flex items-center gap-2 bg-green-50 border-l-4 border-green-400 rounded-xl p-3 shadow animate-fade-in delay-300 max-w-xs">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold text-green-700">
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-${(i + 4) * 100} ${m.color}`}
          >
            <span className="text-3xl mb-2">{m.icon}</span>
            <div className="font-bold text-2xl">{m.value}</div>
            <div className="text-gray-600 text-sm text-center mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link to="#" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-600">
          <span className="text-blue-600 mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Manage Doctors</div>
          <div className="text-gray-500 text-sm text-center">Add, remove, or update doctors in your organization.</div>
        </Link>
        <Link to="/medical/appointments" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-700">
          <span className="text-blue-600 mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Appointments</div>
          <div className="text-gray-500 text-sm text-center">View and manage all organization appointments.</div>
        </Link>
        <Link to="/medical/settings" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-800">
          <span className="text-blue-600 mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 008.6 15a1.65 1.65 0 00-1.82-.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0015.4 9a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 15z" />
            </svg>
          </span>
          <div className="font-semibold text-lg mb-1">Settings</div>
          <div className="text-gray-500 text-sm text-center">Update organization profile and preferences.</div>
        </Link>
      </div>

      {/* Recent Activities & Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Recent Activities */}
        <div className="bg-white border border-blue-100 rounded-xl shadow p-5 animate-fade-in delay-900">
          <div className="font-bold text-lg text-blue-700 mb-3">Recent Activities</div>
          {recentActivities.length === 0 ? (
            <div className="text-gray-400 text-sm">No recent activities.</div>
          ) : (
            <ul className="space-y-3">
              {recentActivities.map((a, i) => (
                <li key={i} className="border-b last:border-b-0 pb-2">
                  <div className="font-semibold text-blue-600">{a.activity}</div>
                  <div className="text-gray-500 text-xs">{a.date}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Partner Messages */}
        <div className="bg-white border border-blue-100 rounded-xl shadow p-5 animate-fade-in delay-1000">
          <div className="font-bold text-lg text-blue-700 mb-3">Organization Messages</div>
          {partnerMessages.length === 0 ? (
            <div className="text-gray-400 text-sm">No new messages.</div>
          ) : (
            <ul className="space-y-3">
              {partnerMessages.map((msg, i) => (
                <li key={i} className="border-b last:border-b-0 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold">{msg.from}</span>
                    <span className="text-gray-400 text-xs">{msg.date}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{msg.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Download Report */}
      <div className="mt-10 bg-white border border-blue-100 rounded-xl p-6 shadow flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in delay-1100">
        <div>
          <div className="font-semibold text-blue-700 text-lg mb-1">Download Monthly Report</div>
          <div className="text-gray-500 text-sm mb-2">Get a summary of your organization's activities and metrics.</div>
        </div>
        <button
          type="button"
          onClick={() => alert("Download started!")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Report
        </button>
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
        .delay-1100 { animation-delay: 1.1s; }
      `}</style>
    </div>
  );
}

export default MDashboard;