import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy doctor profile and data
const doctorProfile = {
  name: "Dr. Jane Doe",
  specialty: "General Practitioner",
  image: "",
};

const todayAppointments = [
  { time: "9:00 AM", patient: "Chocolate Parfait", type: "General Checkup" },
  { time: "2:00 PM", patient: "Alex Kim", type: "Consultation" },
];

const recentCases = [
  { patient: "John Smith", date: "24/5/2025", summary: "Follow-up on blood test results." },
  { patient: "Lisa Wong", date: "23/5/2025", summary: "Discussed allergy symptoms and prescribed medication." },
];

const patientMessages = [
  { from: "Chocolate Parfait", message: "Thank you for the last consultation!", date: "Today" },
  { from: "Alex Kim", message: "Can I reschedule my appointment?", date: "Yesterday" },
];

const DDashboard = () => {
  const navigate = useNavigate();

  const handleVideoCall = () => {
    //const sessionId = Math.random().toString(36).substring(2, 10);
    navigate('/doctor/consultation');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
    {/* Profile & Greeting Row */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in-down gap-6">
      {/* Profile Summary */}
      <div className="flex flex-col items-center md:items-start">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-2 border-4 border-white overflow-hidden">
          {doctorProfile.image ? (
            <img src={doctorProfile.image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-blue-700">{doctorProfile.name[4]}</span>
          )}
        </div>
        <div className="font-semibold text-lg text-blue-700">{doctorProfile.name}</div>
        <div className="text-gray-500 text-sm">{doctorProfile.specialty}</div>
        <Link
          to="/doctor/settings"
          className="mt-2 px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium shadow"
        >
          Edit Profile
        </Link>
      </div>
      {/* Greeting */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2 text-center md:text-left animate-fade-in-down delay-100">
          Welcome to your Diagnobot Dashboard {doctorProfile.name.split(" ")[1]} 👋
        </h1>
        <p className="text-gray-600 text-center md:text-left mb-2 animate-fade-in-down delay-200">
          Manage your consultations, schedule, and patient interactions efficiently.
        </p>
        {/* Pending Tasks */}
        <div className="mt-4 flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-3 shadow animate-fade-in delay-300 max-w-xs">
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="font-semibold text-yellow-700">
            You have {todayAppointments.length} upcoming appointment{todayAppointments.length > 1 ? "s" : ""} today
          </span>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Link to="/doctor/schedule" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-400">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Schedule</div>
        <div className="text-gray-500 text-sm text-center">View and manage your upcoming appointments and availability.</div>
      </Link>
      <Link to="/doctor/consultation" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-500">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Consultations</div>
        <div className="text-gray-500 text-sm text-center">Start or join patient consultations and review case notes.</div>
      </Link>
      <Link to="/doctor/settings" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition hover:scale-105 animate-fade-in delay-600">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 008.6 15a1.65 1.65 0 00-1.82-.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0015.4 9a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 15z" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Settings</div>
        <div className="text-gray-500 text-sm text-center">Update your profile, specialties, and notification preferences.</div>
      </Link>
    </div>

    {/* Upcoming Appointments */}
    <div className="mb-10">
      <div className="font-bold text-xl text-blue-700 mb-4">Today's Appointments</div>
      <div className="space-y-4">
        {todayAppointments.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <svg className="mx-auto mb-2 w-10 h-10 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="font-medium">No appointments scheduled for today.</div>
          </div>
        ) : (
          todayAppointments.map((appt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-md border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-xl hover:border-blue-300 animate-stagger"
              style={{ animationDelay: `${idx * 0.08 + 0.2}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center pr-6 border-r border-blue-50">
                  <div className="text-blue-600 font-bold text-xl">{appt.time}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-700">{appt.type}</span>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{appt.patient}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/doctor/consultation"
                className="mt-3 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-blue-700 transition text-center text-sm"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Recent Cases & Patient Messages */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* Recent Cases */}
      <div className="bg-white border border-blue-100 rounded-xl shadow p-5 animate-fade-in delay-700">
        <div className="font-bold text-lg text-blue-700 mb-3">Recent Cases</div>
        {recentCases.length === 0 ? (
          <div className="text-gray-400 text-sm">No recent cases.</div>
        ) : (
          <ul className="space-y-3">
            {recentCases.map((c, i) => (
              <li key={i} className="border-b last:border-b-0 pb-2">
                <div className="font-semibold text-blue-600">{c.patient}</div>
                <div className="text-gray-500 text-xs">{c.date}</div>
                <div className="text-gray-700 text-sm">{c.summary}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Patient Messages */}
      <div className="bg-white border border-blue-100 rounded-xl shadow p-5 animate-fade-in delay-800">
        <div className="font-bold text-lg text-blue-700 mb-3">Patient Messages</div>
        {patientMessages.length === 0 ? (
          <div className="text-gray-400 text-sm">No new messages.</div>
        ) : (
          <ul className="space-y-3">
            {patientMessages.map((msg, i) => (
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

    {/* Quick Video Consultation */}
    <div className="mt-10 bg-white border border-blue-100 rounded-xl p-6 shadow flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in delay-900">
      <div>
        <div className="font-semibold text-blue-700 text-lg mb-1">Quick Video Consultation</div>
        <div className="text-gray-500 text-sm mb-2">Start a secure video call session with a patient instantly.</div>
      </div>
      <button
        type="button"
        onClick={handleVideoCall}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Start Video Call
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
}

export default DDashboard;