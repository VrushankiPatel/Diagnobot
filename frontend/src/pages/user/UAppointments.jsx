import React, { useState } from "react";


const sessionId = Math.random().toString(36).substring(2, 10);

// Shared appointments data (sync with dashboard)
const Appointments = [
  {
    id: 1,
    time: "9:00 AM",
    date: "2025-06-24",
    doctor: "Dr. Jane Doe",
    type: "General Checkup",
    location: "City Clinic, Room 12",
    notes: "Routine annual checkup.",
    status: "Upcoming",
    report: null,
    joinLink: `/consult/${sessionId}`
  },
  {
    id: 2,
    time: "11:30 AM",
    date: "2025-07-04",
    doctor: "Dr. Alex Kim",
    type: "Dental Cleaning",
    location: "Smile Dental, Suite 3",
    notes: "Teeth cleaning and oral hygiene review.",
    status: "Upcoming",
    report: null,
    joinLink: `/consult/${sessionId}`
  },
  {
    id: 3,
    time: "2:30 PM",
    date: "2025-08-15",
    doctor: "Dr. John Smith",
    type: "Consultation",
    location: "Virtual (Video Call)",
    notes: "Discuss recent symptoms and review test results.",
    status: "upcoming",
    report: { name: "Consultation_Report.pdf", url: "/reports/consultation.pdf" },
    joinLink: null
  },
  {
    id: 4,
    time: "4:00 PM",
    date: "2025-09-20",
    doctor: "Dr. Lisa Wong",
    type: "Eye Exam",
    location: "Vision Center, Room 5",
    notes: "Vision test and prescription update.",
    status: "Upcoming",
    report: null,
    joinLink: `/consult/${sessionId}`
  },
  {
    id: 5,
    time: "10:00 AM",
    date: "2025-10-01",
    doctor: "Dr. Emily White",
    type: "Follow-up",
    location: "City Clinic, Room 8",
    notes: "Follow-up on previous treatment.",
    status: "Completed",
    report: { name: "Followup_Report.pdf", url: "/reports/followup.pdf" },
    joinLink: null
  },
  {
    id: 6,
    time: "1:00 PM",
    date: "2025-11-05",
    doctor: "Dr. Mark Brown",
    type: "Physical Therapy",
    location: "Health Center, Room 2",
    notes: "Physical therapy session for injury recovery.",
    status: "Cancelled",
    report: null,
    joinLink: null
  },
  {
    id: 7,
    time: "3:30 PM",
    date: "2025-12-10",
    doctor: "Dr. Sarah Green",
    type: "Nutrition Consultation",
    location: "Wellness Clinic, Room 4",
    notes: "Discuss dietary habits and nutrition plan.",
    status: "Completed",
    report: { name: "Nutrition_Report.pdf", url: "/reports/nutrition.pdf" },
    joinLink: null
  },
  {
    id: 8,
    time: "5:00 PM",
    date: "2025-12-20",
    doctor: "Dr. Tom Black",
    type: "Specialist Consultation",
    location: "Specialty Clinic, Room 10",
    notes: "Consultation with a specialist for ongoing issues.",
    status: "Completed",
    report: null,
    joinLink: null
  }
];

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" }
];


function UAppointments() {
  const [tab, setTab] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter appointments by tab
  const filtered = tab === "All"
    ? Appointments
    : Appointments.filter(a => a.status === tab);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Appointment History</h1>
      <div className="flex justify-center gap-2 mb-8">
        {statusTabs.map(t => (
          <button
            key={t.value}
            className={`px-4 py-2 rounded-lg font-semibold shadow transition
              ${tab === t.value
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <svg className="mx-auto mb-2 w-10 h-10 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="font-medium">No appointments in this category.</div>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map(appt => (
            <div
              key={appt.id}
              className={`relative group bg-white rounded-xl p-6 shadow-md border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-2xl hover:border-blue-400 animate-fade-in`}
            >
              <div className="flex items-center gap-4">
                {/* Time & Date */}
                <div className="hidden md:flex flex-col items-center pr-6 border-r border-blue-50">
                  <div className="text-blue-600 font-bold text-xl">{appt.time}</div>
                  <div className="text-xs text-gray-400">{appt.date}</div>
                </div>
                {/* Doctor Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shadow border border-blue-100 mr-3">
                  <span className="text-lg font-bold text-blue-600">{appt.doctor.split(" ")[1]?.[0] || "D"}</span>
                </div>
                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-700">{appt.type}</span>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full hidden md:inline">{appt.doctor}</span>
                  </div>
                  <div className="md:hidden mb-1">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{appt.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-gray-600 text-sm">{appt.location}</span>
                  </div>
                  <div className="text-gray-500 text-xs italic">{appt.notes}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                      ${appt.status === "Completed" ? "bg-green-100 text-green-700" :
                        appt.status === "Upcoming" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"}`}>
                      {appt.status}
                    </span>
                    {appt.status === "Upcoming" && appt.joinLink && (
                      <a
                        href={appt.joinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-blue-700 transition"
                      >
                        Join Session
                      </a>
                    )}
                    {appt.status === "Completed" && appt.report && (
                      <button
                        className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold shadow hover:bg-green-200 transition"
                        onClick={() => setSelectedReport(appt.report)}
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setSelectedReport(null)}
              aria-label="Close"
            >×</button>
            <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
              <span role="img" aria-label="report">📄</span> Attached Report
            </div>
            <div className="text-blue-900 text-sm mb-4">
              <b>{selectedReport.name}</b>
            </div>
            <a
              href={selectedReport.url}
              download
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Download Report
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
      `}</style>
    </div>
  );
}

export default UAppointments;