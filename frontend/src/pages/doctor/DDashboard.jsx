import React from "react";
import { Link } from "react-router-dom";

const DDashboard = () => (
  <div className="max-w-5xl mx-auto px-4 py-10">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">Doctor Dashboard</h1>
    <p className="text-gray-600 text-center mb-8">
      Welcome to your DiagnoBot portal. Manage your consultations, schedule, and patient interactions efficiently.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/doctor/schedule" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Schedule</div>
        <div className="text-gray-500 text-sm text-center">View and manage your upcoming appointments and availability.</div>
      </Link>
      <Link to="/doctor/consultation" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Consultations</div>
        <div className="text-gray-500 text-sm text-center">Start or join patient consultations and review case notes.</div>
      </Link>
      <Link to="/doctor/settings" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
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
    <div className="mt-10 bg-white border border-blue-100 rounded-xl p-6 shadow flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <div className="font-semibold text-blue-700 text-lg mb-1">Quick Video Consultation</div>
        <div className="text-gray-500 text-sm mb-2">Start a secure video call session with a patient instantly.</div>
      </div>
      <Link
        to="/consult/session-demo"
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Start Video Call
      </Link>
    </div>
  </div>
);

export default DDashboard;