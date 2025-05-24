import React from "react";
import { Link } from "react-router-dom";

const UDashboard = () => (
  <div className="max-w-5xl mx-auto px-4 py-10">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">Welcome to Your DiagnoBot Dashboard</h1>
    <p className="text-gray-600 text-center mb-8">
      Manage your health journey, appointments, and reports all in one place.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/user/symptom-checker" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Symptom Checker</div>
        <div className="text-gray-500 text-sm text-center">Describe your symptoms and get instant AI-powered triage.</div>
      </Link>
      <Link to="/user/appointments" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Appointments</div>
        <div className="text-gray-500 text-sm text-center">Book, view, or manage your upcoming and past appointments.</div>
      </Link>
      <Link to="/user/reports" className="bg-blue-50 hover:bg-blue-100 rounded-xl shadow p-6 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
            <rect x="5" y="3" width="14" height="18" rx="2" />
          </svg>
        </span>
        <div className="font-semibold text-lg mb-1">Reports</div>
        <div className="text-gray-500 text-sm text-center">Access your medical reports and download or share them securely.</div>
      </Link>
    </div>
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link to="/user/diagnosis" className="bg-white border border-blue-100 hover:shadow-lg rounded-xl p-5 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 20v-6M12 4v4m0 0a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        </span>
        <div className="font-semibold text-base mb-1">Diagnosis History</div>
        <div className="text-gray-500 text-sm text-center">Review your previous AI diagnoses and doctor feedback.</div>
      </Link>
      <Link to="/user/settings" className="bg-white border border-blue-100 hover:shadow-lg rounded-xl p-5 flex flex-col items-center transition">
        <span className="text-blue-600 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 008.6 15a1.65 1.65 0 00-1.82-.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0015.4 9a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 15z" />
          </svg>
        </span>
        <div className="font-semibold text-base mb-1">Settings</div>
        <div className="text-gray-500 text-sm text-center">Manage your profile, privacy, and notification preferences.</div>
      </Link>
    </div>
  </div>
);

export default UDashboard;