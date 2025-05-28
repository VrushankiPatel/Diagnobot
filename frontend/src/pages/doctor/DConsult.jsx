import React, { useState } from 'react';

// --- Mock Data ---
const mockPatient = {
  name: "Mary Smith",
  age: 34,
  gender: "Female",
  photo: "",
  allergies: "Penicillin",
  chronic: "Hypertension",
  contact: "+2348000000000",
  email: "mary.smith@email.com",
};

const mockHistory = [
  {
    date: "2025-05-20",
    symptoms: "Headache, mild fever",
    diagnosis: "Likely viral infection. Advised rest and fluids.",
    notes: "Patient responded well to paracetamol.",
  },
  {
    date: "2025-04-10",
    symptoms: "Cough, sore throat",
    diagnosis: "Mild cold. No medication required.",
    notes: "",
  },
];

function DConsult() {
  const [tab, setTab] = useState("room");
  const [chat, setChat] = useState([
    { from: "patient", text: "Hello doctor!", time: "09:00" },
    { from: "doctor", text: "Good morning, how can I help you today?", time: "09:01" },
  ]);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [report, setReport] = useState({
    summary: "",
    diagnosis: "",
    prescription: "",
    followup: "",
  });
  const [showReportModal, setShowReportModal] = useState(false);

  // --- Handlers ---
  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, { from: "doctor", text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage("");
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setShowReportModal(false);
    setReport({ summary: "", diagnosis: "", prescription: "", followup: "" });
    alert("Medical report submitted!");
  };

  // --- UI ---
  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow-2xl p-4 sm:p-8 animate-fade-in relative">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center animate-fade-in-down">Consultation Room</h2>
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Left: Patient Info & History */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* Patient Card */}
          <div className="bg-blue-50 rounded-xl p-4 shadow flex flex-col items-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 mb-2">
              {mockPatient.photo ? (
                <img src={mockPatient.photo} alt="Patient" className="w-full h-full object-cover rounded-full" />
              ) : (
                mockPatient.name[0]
              )}
            </div>
            <div className="font-semibold text-lg text-blue-800">{mockPatient.name}</div>
            <div className="text-gray-500 text-sm">{mockPatient.gender}, {mockPatient.age} yrs</div>
            <div className="text-xs text-gray-400">{mockPatient.email}</div>
            <div className="text-xs text-gray-400">{mockPatient.contact}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">Allergy: {mockPatient.allergies}</span>
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">Chronic: {mockPatient.chronic}</span>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 px-3 py-2 rounded-t-lg font-semibold ${tab === "room" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
              onClick={() => setTab("room")}
            >
              Consultation
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-t-lg font-semibold ${tab === "history" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
              onClick={() => setTab("history")}
            >
              History
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-t-lg font-semibold ${tab === "notes" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
              onClick={() => setTab("notes")}
            >
              Notes
            </button>
          </div>
          {/* Tab Content */}
          <div className="bg-white rounded-b-xl shadow p-3 min-h-[120px] animate-fade-in-up">
            {tab === "history" && (
              <div>
                <div className="font-semibold text-blue-700 mb-2">Consultation History</div>
                {mockHistory.length === 0 ? (
                  <div className="text-gray-400 text-sm">No previous consultations.</div>
                ) : (
                  <ul className="space-y-2">
                    {mockHistory.map((h, idx) => (
                      <li key={idx} className="border-b pb-2">
                        <div className="text-xs text-gray-500">{h.date}</div>
                        <div className="text-sm text-blue-800 font-medium">Symptoms: <span className="text-gray-700">{h.symptoms}</span></div>
                        <div className="text-xs text-gray-600">Diagnosis: {h.diagnosis}</div>
                        {h.notes && <div className="text-xs text-blue-500">Note: {h.notes}</div>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {tab === "notes" && (
              <div>
                <div className="font-semibold text-blue-700 mb-2">Doctor's Notes</div>
                <textarea
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm"
                  rows={4}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add notes for this consultation..."
                />
                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => alert("Notes saved!")}
                >
                  Save Notes
                </button>
              </div>
            )}
            {tab === "room" && (
              <div className="text-gray-500 text-sm">
                <span className="text-blue-700 font-semibold">Live consultation in progress...</span>
                <br />
                Use the chat/video panel to interact with the patient.
              </div>
            )}
          </div>
        </div>
        {/* Right: Consultation Room */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Video/Chat UI */}
          <div className="bg-gray-50 rounded-xl shadow p-4 flex flex-col gap-2 min-h-[320px] animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-blue-700">Consultation Room</div>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => setShowReportModal(true)}
              >
                + Generate Medical Report
              </button>
            </div>
            {/* Video Placeholder */}
            <div className="bg-black rounded-lg h-40 flex items-center justify-center text-white text-lg mb-2 relative">
              <span className="opacity-60">[Video Call Placeholder]</span>
              <button className="absolute top-2 right-2 bg-white text-black rounded-full px-2 py-1 text-xs shadow">End</button>
            </div>
            {/* Chat */}
            <div className="flex-1 overflow-y-auto max-h-40 mb-2">
              <ul className="space-y-2">
                {chat.map((msg, idx) => (
                  <li
                    key={idx}
                    className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`px-3 py-2 rounded-lg shadow text-sm max-w-xs ${msg.from === "doctor" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                      {msg.text}
                      <span className="block text-[10px] text-right text-gray-300 mt-1">{msg.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="flex-1 rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
          {/* Symptom Form (Quick View) */}
          <div className="bg-white rounded-xl shadow p-4 animate-fade-in-up">
            <div className="font-semibold text-blue-700 mb-2">Symptom Form</div>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Symptoms</label>
                <input type="text" className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm" placeholder="e.g. headache, fever" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Duration</label>
                <input type="text" className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm" placeholder="e.g. 2 days" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Severity</label>
                <select className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm">
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Other Notes</label>
                <input type="text" className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm text-sm" placeholder="Additional info" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Medical Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-lg w-full relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowReportModal(false)}
              aria-label="Close"
            >×</button>
            <h4 className="font-semibold text-blue-700 mb-3">Generate Medical Report</h4>
            <form onSubmit={handleReportSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <textarea
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  rows={2}
                  value={report.summary}
                  onChange={e => setReport({ ...report, summary: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  value={report.diagnosis}
                  onChange={e => setReport({ ...report, diagnosis: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prescription</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  value={report.prescription}
                  onChange={e => setReport({ ...report, prescription: e.target.value })}
                  placeholder="e.g. Paracetamol 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Plan</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  value={report.followup}
                  onChange={e => setReport({ ...report, followup: e.target.value })}
                  placeholder="e.g. Review in 2 weeks"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animations & Styles */}
      <style>{`
        @media (max-width: 900px) {
          .flex-row { flex-direction: column !important; }
          .gap-6 { gap: 1rem !important; }
        }
        @media (max-width: 640px) {
          .max-w-5xl { max-width: 100vw !important; }
          .p-8, .p-4 { padding: 1rem !important; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        button:focus { outline: none; box-shadow: 0 0 0 2px #3b82f6; }
      `}</style>
    </div>
  );
}

export default DConsult;