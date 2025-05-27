import React, { useState } from 'react';

// --- Mock Data ---
const mockWorkingHours = {
  monday: [{ start: "09:00", end: "17:00" }],
  tuesday: [{ start: "09:00", end: "17:00" }],
  wednesday: [{ start: "09:00", end: "17:00" }],
  thursday: [{ start: "09:00", end: "17:00" }],
  friday: [{ start: "09:00", end: "17:00" }],
  saturday: [],
  sunday: [],
  vacations: ["2025-06-01"],
};

const mockAppointments = [
  {
    id: 1,
    patient: "Mary Smith",
    date: "2025-05-28",
    time: "10:00",
    type: "Consultation",
    status: "Pending",
    contact: "+2348000000000",
    notes: "Follow-up on hypertension.",
  },
  {
    id: 2,
    patient: "John Doe",
    date: "2025-05-29",
    time: "14:30",
    type: "Checkup",
    status: "Accepted",
    contact: "+2348000001111",
    notes: "",
  },
  {
    id: 3,
    patient: "Alex Brown",
    date: "2025-05-30",
    time: "09:00",
    type: "Consultation",
    status: "Rescheduled",
    contact: "+2348000002222",
    notes: "Requested earlier slot.",
  },
];

// --- Helper ---
const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function DSchedule() {
  const [workingHours, setWorkingHours] = useState(mockWorkingHours);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [editHours, setEditHours] = useState(false);
  const [editDay, setEditDay] = useState(null);
  const [vacationInput, setVacationInput] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  // --- Handlers ---
  const handleAddSlot = (day) => {
    setWorkingHours({
      ...workingHours,
      [day]: [...workingHours[day], { start: "09:00", end: "17:00" }],
    });
  };

  const handleRemoveSlot = (day, idx) => {
    setWorkingHours({
      ...workingHours,
      [day]: workingHours[day].filter((_, i) => i !== idx),
    });
  };

  const handleSlotChange = (day, idx, field, value) => {
    setWorkingHours({
      ...workingHours,
      [day]: workingHours[day].map((slot, i) =>
        i === idx ? { ...slot, [field]: value } : slot
      ),
    });
  };

  const handleSaveHours = () => {
    setEditHours(false);
    setToast({ show: true, msg: "Working hours updated!", type: "success" });
  };

  const handleVacationAdd = () => {
    if (vacationInput && !workingHours.vacations.includes(vacationInput)) {
      setWorkingHours({
        ...workingHours,
        vacations: [...workingHours.vacations, vacationInput],
      });
      setVacationInput("");
    }
  };

  const handleVacationRemove = (idx) => {
    setWorkingHours({
      ...workingHours,
      vacations: workingHours.vacations.filter((_, i) => i !== idx),
    });
  };

  const handleAccept = (id) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: "Accepted" } : a));
    setToast({ show: true, msg: "Appointment accepted!", type: "success" });
  };

  const handleReschedule = (appt) => {
    setRescheduleModal(appt);
    setRescheduleDate(appt.date);
    setRescheduleTime(appt.time);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setAppointments(appointments.map(a =>
      a.id === rescheduleModal.id
        ? { ...a, date: rescheduleDate, time: rescheduleTime, status: "Rescheduled" }
        : a
    ));
    setRescheduleModal(null);
    setToast({ show: true, msg: "Appointment rescheduled!", type: "success" });
  };

 const handleDecline = (id) => {
  setAppointments(appointments.map(a =>
    a.id === id ? { ...a, status: "Declined" } : a
  ));
  setToast({ show: true, msg: "Appointment declined.", type: "error" });
};

  const closeToast = () => setToast({ show: false, msg: "", type: "success" });

  // --- UI ---
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-2xl p-4 sm:p-8 animate-fade-in relative">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold animate-fade-in-up
            ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          role="alert"
          aria-live="polite"
        >
          {toast.msg}
          <button className="ml-4 text-white/70 hover:text-white" onClick={closeToast} aria-label="Close notification">×</button>
        </div>
      )}

      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center animate-fade-in-down">Schedule Management</h2>
      <p className="text-center text-gray-500 mb-6">
        Set your working hours, manage vacations, and handle upcoming appointments.
      </p>

      {/* Working Hours */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="clock">🕒</span> Working Hours
          </h3>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setEditHours(!editHours)}
          >
            {editHours ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow animate-fade-in-up">
          {editHours ? (
            <form onSubmit={e => { e.preventDefault(); handleSaveHours(); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {days.map(day => (
                  <div key={day}>
                    <div className="capitalize font-semibold text-blue-700 mb-1">{day}</div>
                    {workingHours[day].length === 0 ? (
                      <div className="text-gray-400 text-xs mb-1">Not available</div>
                    ) : (
                      workingHours[day].map((slot, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1">
                          <input
                            type="time"
                            value={slot.start}
                            onChange={e => handleSlotChange(day, idx, "start", e.target.value)}
                            className="rounded-lg border-gray-300 px-2 py-1 shadow-sm text-xs"
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={slot.end}
                            onChange={e => handleSlotChange(day, idx, "end", e.target.value)}
                            className="rounded-lg border-gray-300 px-2 py-1 shadow-sm text-xs"
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 text-lg"
                            onClick={() => handleRemoveSlot(day, idx)}
                            aria-label={`Remove slot for ${day}`}
                          >×</button>
                        </div>
                      ))
                    )}
                    <button
                      type="button"
                      className="mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                      onClick={() => handleAddSlot(day)}
                      aria-label={`Add slot for ${day}`}
                    >Add Slot</button>
                  </div>
                ))}
              </div>
              {/* Vacation/Leave */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vacations/Leave</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={vacationInput}
                    onChange={e => setVacationInput(e.target.value)}
                    className="rounded-lg border-gray-300 px-2 py-1 shadow-sm"
                    aria-label="Add vacation date"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                    onClick={handleVacationAdd}
                    aria-label="Add vacation"
                  >Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {workingHours.vacations.map((date, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                      {date}
                      <button
                        type="button"
                        className="ml-1 text-red-500 hover:text-red-700"
                        onClick={() => handleVacationRemove(idx)}
                        aria-label="Remove vacation"
                      >×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setEditHours(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {days.map(day => (
                <div key={day}>
                  <div className="capitalize font-semibold text-blue-700 mb-1">{day}</div>
                  {workingHours[day].length === 0 ? (
                    <div className="text-gray-400 text-xs">Not available</div>
                  ) : (
                    workingHours[day].map((slot, idx) => (
                      <div key={idx} className="text-xs text-blue-800">{slot.start} - {slot.end}</div>
                    ))
                  )}
                </div>
              ))}
              <div className="col-span-2 mt-2">
                <span className="font-semibold text-blue-700">Vacations:</span>
                {workingHours.vacations.length === 0 ? (
                  <span className="text-gray-400 ml-2">None</span>
                ) : (
                  workingHours.vacations.map((date, idx) => (
                    <span key={idx} className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{date}</span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="calendar">📅</span> Upcoming Appointments
          </h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow animate-fade-in-up">
          {appointments.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No upcoming appointments.</div>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appt, idx) => (
                <li
                  key={appt.id}
                  className={`border rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 animate-fade-in`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  tabIndex={0}
                  aria-label={`Appointment with ${appt.patient} on ${appt.date} at ${appt.time}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-blue-800 flex items-center gap-2 flex-wrap">
                      {appt.patient}
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs">{appt.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                        appt.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "Rescheduled"
                          ? "bg-yellow-100 text-yellow-700"
                          : appt.status === "Declined"
                           ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{appt.date} at {appt.time}</div>
                    <div className="text-xs text-gray-500">Contact: {appt.contact}</div>
                    {appt.notes && <div className="text-xs text-blue-500 mt-1">Notes: {appt.notes}</div>}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
                    {appt.status === "Pending" && (
                      <>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                          onClick={() => handleAccept(appt.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                          onClick={() => handleReschedule(appt)}
                        >
                          Reschedule
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                          onClick={() => handleDecline(appt.id)}
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {appt.status === "Accepted" && (
                      <button
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                        onClick={() => handleReschedule(appt)}
                      >
                        Reschedule
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setRescheduleModal(null)}
              aria-label="Close"
            >×</button>
            <h4 className="font-semibold text-blue-700 mb-3">Reschedule Appointment</h4>
            <form onSubmit={handleRescheduleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={e => setRescheduleDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={rescheduleTime}
                  onChange={e => setRescheduleTime(e.target.value)}
                  className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                  required
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setRescheduleModal(null)}
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
        @media (max-width: 640px) {
          .max-w-4xl { max-width: 100vw !important; }
          .p-8, .p-4 { padding: 1rem !important; }
          .flex-row { flex-direction: column !important; }
          .gap-4, .gap-8 { gap: 1rem !important; }
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

export default DSchedule;