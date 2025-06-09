import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const educationalLinks = [
  { name: "CDC Symptom Checker", url: "https://www.cdc.gov/symptoms" },
  { name: "NHS Health A-Z", url: "https://www.nhs.uk/conditions/" },
  { name: "Mayo Clinic Symptoms", url: "https://www.mayoclinic.org/symptom-checker/select-symptom/itt-20009075" },
  { name: "What is this condition?", url: "https://www.mayoclinic.org/diseases-conditions" },
];

const defaultDifferentials = [
  { name: "Common Cold", confidence: 0.12 },
  { name: "Allergic Rhinitis", confidence: 0.06 },
];


function UDiagnosis() {
  const [diagnosis, setDiagnosis] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [showConditionInfo, setShowConditionInfo] = useState(false);
  const [symptomUpdate, setSymptomUpdate] = useState("");
  const [symptomHistory, setSymptomHistory] = useState([]);
  
  const [userComment, setUserComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [communityStats] = useState("25% of users with your symptoms reported improvement in 3 days.");
  const navigate = useNavigate();

  // Simulate confidence and differentials if not present
  const confidence = diagnosis?.confidence ?? 0.82;
  const confidenceLabel =
    confidence > 0.85 ? "High confidence"
      : confidence > 0.6 ? "Moderate confidence"
      : "Low confidence";
  const differentials = diagnosis?.differentials || defaultDifferentials;

  useEffect(() => {
    setLoading(true);
    const data = sessionStorage.getItem("diagnosisResult");
    if (data) {
      const parsed = JSON.parse(data);
      setDiagnosis(parsed);
      setEditForm({
        symptomChips: parsed.summary.symptomChips || [],
        duration: parsed.summary.duration?.split(" ")[0] || "",
        durationUnit: parsed.summary.duration?.split(" ")[1] || "days",
        onsetDate: parsed.summary.onsetDate || "",
        location: parsed.summary.location || "",
        urgency: parsed.summary.urgency || "",
        riskFactors: parsed.summary.riskFactors || [],
        hadSimilar: parsed.summary.hadSimilar,
      });
      setSymptomHistory([
        { date: parsed.summary.onsetDate, status: "Started", note: "Symptoms began" }
      ]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
      setTimeout(() => setLoading(false), 800);
    } else {
      setLoading(false);
    }
  }, []);

  // --- Edit Form Logic ---
  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditChipAdd = (chip) => {
    if (
      chip &&
      !editForm.symptomChips.includes(chip) &&
      chip.length > 1
    ) {
      setEditForm((prev) => ({
        ...prev,
        symptomChips: [...prev.symptomChips, chip],
      }));
    }
  };

  const handleEditChipRemove = (chip) => {
    setEditForm((prev) => ({
      ...prev,
      symptomChips: prev.symptomChips.filter((c) => c !== chip),
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditError(null);
    if (!editForm.symptomChips.length) {
      setEditError("Please add at least one symptom.");
      return;
    }
    if (!editForm.urgency) {
      setEditError("Please select urgency.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Update diagnosis object
      const updatedDiagnosis = {
        ...diagnosis,
        summary: {
          ...diagnosis.summary,
          symptomChips: editForm.symptomChips,
          symptoms: editForm.symptomChips.join(", "),
          duration: editForm.duration ? `${editForm.duration} ${editForm.durationUnit}` : "",
          onsetDate: editForm.onsetDate,
          location: editForm.location,
          urgency: editForm.urgency,
          riskFactors: editForm.riskFactors,
          hadSimilar: editForm.hadSimilar,
        },
      };
      setDiagnosis(updatedDiagnosis);
      sessionStorage.setItem("diagnosisResult", JSON.stringify(updatedDiagnosis));
      setEditMode(false);
      setLoading(false);
    }, 1200);
  };

  // PDF/Print/Email
  const handleExport = () => {
    if (!diagnosis) return;
    const text = `
Symptom Checker Summary

Symptoms: ${diagnosis.summary.symptomChips.join(", ")}
Duration: ${diagnosis.summary.duration}
Onset Date: ${diagnosis.summary.onsetDate}
Location: ${diagnosis.summary.location}
Urgency: Level ${diagnosis.summary.urgency}
Risk Factors: ${diagnosis.summary.riskFactors.join(", ")}
Had Similar Before: ${diagnosis.summary.hadSimilar ? "Yes" : "No"}

Diagnosis: ${diagnosis.probable}
Advice: ${diagnosis.advice}
Recommendations: ${diagnosis.recommendations.join("; ")}
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "symptom-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const handleEmail = () => {
    if (!diagnosis) return;
    window.open(`mailto:?subject=Diagnosis Summary&body=${encodeURIComponent('See my diagnosis summary below:\n\n' + JSON.stringify(diagnosis, null, 2))}`);
  };

  // Feedback
  const handleFeedback = (val) => {
    setFeedback(val);
    setTimeout(() => setFeedback(null), 2000);
  };

  // Symptom Tracker
  const handleSymptomUpdate = (status) => {
    if (!symptomUpdate) return;
    setSymptomHistory((prev) => [
      ...prev,
      { date: new Date().toISOString().split("T")[0], status, note: symptomUpdate }
    ]);
    setSymptomUpdate("");
  };

  // Red Flag logic
  const isRedFlag = (
    diagnosis?.summary?.urgency === "3" ||
    diagnosis?.summary?.symptomChips.some(sym =>
      /chest pain|shortness of breath|loss of consciousness/i.test(sym)
    )
  );

  // Personalized Next Steps
  const nextSteps = [
    ...(diagnosis?.summary?.urgency === "3"
      ? ["Call emergency services immediately."]
      : diagnosis?.summary?.urgency === "2"
      ? ["Book a doctor appointment.", "Start a live chat with a doctor."]
      : ["Monitor your symptoms.", "Take recommended OTC medications."]),
    "Drink water",
    "Rest as needed"
  ];

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-20 flex flex-col items-center justify-center text-blue-700">
        <svg className="w-12 h-12 text-blue-500 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <div className="font-semibold text-lg">Loading diagnosis...</div>
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-blue-700 font-semibold">
        No diagnosis found. Please use the Symptom Checker first.
        <button
          className="block mx-auto mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 shadow-lg transition"
          onClick={() => navigate("/user/symptom-checker")}
        >
          Go to Symptom Checker
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden transition-all duration-500 print:bg-white print:shadow-none print:p-2">
      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center animate-fade-in-up">
          <span className="text-6xl">🎉</span>
        </div>
      )}

      {/* Summary Banner */}
      <div className="mb-6 flex items-center gap-4 bg-blue-100 rounded-xl p-4 shadow animate-fade-in">
        <span className="text-3xl" role="img" aria-label="diagnosis">🩺</span>
        <div>
          <div className="text-xl font-bold text-blue-800">{diagnosis.probable}</div>
          <div className="text-sm text-blue-700">Urgency: <b>
            {diagnosis.summary.urgency === "3" ? "Severe" :
              diagnosis.summary.urgency === "2" ? "Moderate" : "Mild"}
          </b></div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">Confidence:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-bold
            ${confidence > 0.85 ? "bg-green-100 text-green-700" :
              confidence > 0.6 ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"}`}>
            {confidenceLabel}
          </span>
          <span className="ml-2 text-blue-900 font-semibold">{Math.round(confidence * 100)}%</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-2 mt-1">
          <div
            className={`h-2 rounded-full transition-all
              ${confidence > 0.85 ? "bg-green-500" :
                confidence > 0.6 ? "bg-yellow-500" :
                "bg-red-500"}`}
            style={{ width: `${Math.round(confidence * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Red Flag Alert */}
      {isRedFlag && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg font-semibold flex items-center gap-2 animate-fade-in">
          <span role="img" aria-label="warning">⚠️</span>
          Red Flag: Seek emergency care immediately!
        </div>
      )}

      {/* Reasoning */}
      <div className="mb-4">
        <button
          className="text-blue-600 underline font-semibold"
          onClick={() => setShowReasoning(v => !v)}
          type="button"
        >
          {showReasoning ? "Hide" : "Why this diagnosis?"}
        </button>
        {showReasoning && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
            Based on your symptoms: <b>{diagnosis.summary.symptomChips.join(", ")}</b>,
            common causes include viral infections, but other possibilities were considered.
            The AI weighs your urgency, risk factors, and symptom pattern.
          </div>
        )}
      </div>

      {/* Differential Diagnosis */}
      <div className="mb-4">
        <div className="font-semibold text-blue-700 mb-1">Other possible causes:</div>
        <ul className="list-disc pl-6 text-blue-900">
          {differentials.map(diff => (
            <li key={diff.name}>
              {diff.name} <span className="text-xs text-gray-500">({Math.round(diff.confidence * 100)}%)</span>
            </li>
          ))}
        </ul>
      </div>

      {/* User input summary */}
      <div className="mb-6 bg-white rounded-xl shadow p-4 border border-blue-100 animate-fade-in" aria-live="polite">
        <div className="font-semibold text-blue-700 mb-1">Your Input:</div>
        <div>
          <span className="font-medium">Symptoms:</span> {diagnosis.summary.symptomChips.join(", ")}
        </div>
        <div>
          <span className="font-medium">Duration:</span>{" "}
          {diagnosis.summary.duration || "—"}
        </div>
        <div>
          <span className="font-medium">Onset Date:</span>{" "}
          {diagnosis.summary.onsetDate || "—"}
        </div>
        <div>
          <span className="font-medium">Location:</span>{" "}
          {diagnosis.summary.location || "—"}
        </div>
        <div>
          <span className="font-medium">Urgency:</span> Level {diagnosis.summary.urgency}
        </div>
        <div>
          <span className="font-medium">Risk Factors:</span>{" "}
          {diagnosis.summary.riskFactors.length > 0
            ? diagnosis.summary.riskFactors.join(", ")
            : "—"}
        </div>
        <div>
          <span className="font-medium">Had Similar Before:</span>{" "}
          {diagnosis.summary.hadSimilar === null ? "—" : diagnosis.summary.hadSimilar ? "Yes" : "No"}
        </div>
        {diagnosis.file instanceof File && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(diagnosis.file)}
              alt="Symptom upload preview"
              className="w-24 h-24 object-cover rounded-xl border border-blue-200 shadow"
            />
          </div>
        )}
      </div>

      {/* Diagnosis */}
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 mb-4 shadow animate-fade-in">
        <div className="font-semibold text-blue-700 mb-1">
          Probable Condition:
        </div>
        <div className="text-lg text-blue-900 mb-2">
          {diagnosis.probable}
        </div>
        <div className="font-semibold text-blue-700 mb-1">Advice:</div>
        <div className="text-blue-900 mb-2">{diagnosis.advice}</div>
        <div className="font-semibold text-blue-700 mb-1">
          Recommendations:
        </div>
        <ul className="list-disc pl-6 text-blue-900">
          {diagnosis.recommendations.map((rec, i) => (
            <li
              key={i}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${0.2 + i * 0.1}s`,
              }}
            >
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Symptom Tracker */}
      <div className="mb-4 bg-white rounded-xl shadow p-4 border border-blue-100">
        <div className="font-semibold text-blue-700 mb-2">Symptom Tracker</div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 rounded-xl border border-blue-200 shadow px-3 py-2 text-gray-800"
            placeholder="Describe any changes (better, worse, same)..."
            value={symptomUpdate}
            onChange={e => setSymptomUpdate(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => handleSymptomUpdate("Update")}
          >
            Log Update
          </button>
        </div>
        <ul className="text-xs text-blue-900">
          {symptomHistory.map((entry, idx) => (
            <li key={idx}>
              <span className="font-semibold">{entry.date}:</span> {entry.note}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps Checklist */}
      <div className="mb-4 bg-white rounded-xl shadow p-4 border border-blue-100">
        <div className="font-semibold text-blue-700 mb-2">Take Next Steps</div>
        <ul className="list-none pl-0">
          {nextSteps.map((step, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-1">
              <span className="text-green-600">✅</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual Aids (simple emoji heatmap) */}
      <div className="mb-4 bg-white rounded-xl shadow p-4 border border-blue-100">
        <div className="font-semibold text-blue-700 mb-2">Symptom Location</div>
        <div className="text-3xl">
          {diagnosis.summary.location?.toLowerCase().includes("chest") && "❤️"}
          {diagnosis.summary.location?.toLowerCase().includes("head") && "🧠"}
          {diagnosis.summary.location?.toLowerCase().includes("stomach") && "🤢"}
          {!diagnosis.summary.location && "🩺"}
        </div>
        <div className="text-xs text-gray-500 mt-1">*Visual aid is illustrative only</div>
      </div>

      {/* Community Insights */}
      <div className="mb-4 bg-blue-50 rounded-xl shadow p-4 border border-blue-100">
        <span className="font-semibold text-blue-700">Community Insights:</span>
        <span className="ml-2 text-blue-900">{communityStats}</span>
      </div>

      {/* Educational links & FAQ */}
      <div className="mb-4">
        <div className="font-semibold text-blue-700 mb-2">Learn More:</div>
        <ul className="list-disc pl-6">
          {educationalLinks.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="mt-2 text-blue-600 underline font-semibold"
          onClick={() => setShowConditionInfo(v => !v)}
          type="button"
        >
          {showConditionInfo ? "Hide" : "What is this condition?"}
        </button>
        {showConditionInfo && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
            This is a brief, trusted explanation of your probable condition. For more, visit the links above or consult a healthcare provider.
          </div>
        )}
      </div>

      {/* Export/share */}
      <div className="flex gap-4 mb-4 print:hidden">
        <button
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          onClick={handleExport}
        >
          Download Summary
        </button>
        <button
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          onClick={handlePrint}
        >
          Save as PDF / Print
        </button>
        <button
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          onClick={handleEmail}
        >
          Share with Doctor
        </button>
        <button
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          onClick={() => setEditMode(true)}
        >
          Edit Input
        </button>
      </div>

     { /* Feedback prompt */}
        <div className="mb-4 flex items-center gap-3">
          <span className="font-semibold text-blue-700">Was this helpful?</span>
          <button
            className={`text-2xl ${feedback === "yes" ? "scale-125" : ""}`}
            onClick={() => handleFeedback("yes")}
            aria-label="Helpful"
          >
            👍
          </button>
          <button
            className={`text-2xl ${feedback === "no" ? "scale-125" : ""}`}
            onClick={() => handleFeedback("no")}
            aria-label="Not helpful"
          >
            👎
          </button>
          {feedback && (
            <span className="ml-2 text-green-600 font-semibold animate-fade-in">
          {feedback === "yes" ? "Thank you!" : "We'll improve this"}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-700 mb-1">Leave a comment:</label>
          <textarea
            className="w-full rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
            rows={2}
            value={userComment}
            onChange={e => setUserComment(e.target.value)}
            placeholder="Your feedback helps us improve…"
            disabled={feedbackSubmitted}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => {
          setFeedbackSubmitted(true);
          setTimeout(() => setFeedbackSubmitted(false), 3000);
          setUserComment("");
            }}
            disabled={!userComment.trim() || feedbackSubmitted}
            type="button"
          >
            Submit
          </button>
          {feedbackSubmitted && (
            <div className="mt-2 text-green-600 font-semibold animate-fade-in">
          Thanks for your feedback. We really appreciate
            </div>
          )}
        </div>

        {/* Next steps CTA */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 print:hidden">
        <button
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/user/appointments")}
        >
          Book an appointment
        </button>
        <button
          className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          onClick={() => navigate("/user/live-chat")}
        >
          Start a live chat
        </button>
        <button
          className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          onClick={() => navigate("/user/dashboard")}
        >
          Return to dashboard
        </button>
      </div>
      <button
        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 shadow-lg transition animate-fade-in-up print:hidden"
        onClick={() => {
          sessionStorage.removeItem("diagnosisResult");
          navigate("/user/symptom-checker");
        }}
      >
        Check Another Symptom
      </button>

     
      {/* Edit Form */}
      {editMode && (
        <form onSubmit={handleEditSubmit} className="mb-8 space-y-6 bg-white rounded-xl shadow p-4 border border-blue-100 animate-fade-in absolute left-0 top-0 w-full z-50">
          <div className="font-semibold text-blue-700 mb-1">Edit Your Input:</div>
          {editError && (
            <div className="mb-2 text-red-600 bg-red-50 border border-red-200 rounded px-3 py-1">{editError}</div>
          )}
          {/* Symptoms as chips */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Symptoms</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editForm.symptomChips.map((chip) => (
                <span key={chip} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow">
                  {chip}
                  <button
                    type="button"
                    className="ml-2 text-blue-500 hover:text-red-500 focus:outline-none"
                    onClick={() => handleEditChipRemove(chip)}
                    aria-label={`Remove ${chip}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
              placeholder="Type a symptom and press Enter…"
              onKeyDown={e => {
                if (
                  (e.key === "Enter" || e.key === "," || e.key === "Tab") &&
                  e.target.value.trim()
                ) {
                  e.preventDefault();
                  handleEditChipAdd(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
          </div>
          {/* Duration and onset */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-blue-700 mb-1">Onset Date</label>
              <input
                type="date"
                className="w-full rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
                value={editForm.onsetDate}
                onChange={e => handleEditChange("onsetDate", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-blue-700 mb-1">Duration</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  className="w-2/3 rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
                  value={editForm.duration}
                  onChange={e => handleEditChange("duration", e.target.value)}
                  placeholder="e.g. 2"
                />
                <select
                  className="w-1/3 rounded-xl border border-blue-200 shadow px-2 py-2 text-gray-800 transition"
                  value={editForm.durationUnit}
                  onChange={e => handleEditChange("durationUnit", e.target.value)}
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                </select>
              </div>
            </div>
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
              value={editForm.location}
              onChange={e => handleEditChange("location", e.target.value)}
              placeholder="e.g. chest, stomach, head"
            />
          </div>
          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Urgency</label>
            <select
              className="w-full rounded-xl border border-blue-200 shadow px-4 py-2 text-gray-800 transition"
              value={editForm.urgency}
              onChange={e => handleEditChange("urgency", e.target.value)}
              required
            >
              <option value="">Select urgency</option>
              <option value="1">Level 1 – Mild (Can wait)</option>
              <option value="2">Level 2 – Moderate (Need advice soon)</option>
              <option value="3">Level 3 – Severe (Need urgent help)</option>
            </select>
          </div>
          {/* Risk factors */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Risk Factors</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Asthma", "Diabetes", "Heart condition", "Hypertension", "Immunosuppression", "Pregnancy", "Chronic kidney disease", "COPD", "Cancer"
              ].map((factor) => (
                <button
                  type="button"
                  key={factor}
                  className={`px-3 py-1 rounded-full border font-medium text-xs transition
                    ${
                      editForm.riskFactors.includes(factor)
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    }
                  `}
                  onClick={() =>
                    handleEditChange(
                      "riskFactors",
                      editForm.riskFactors.includes(factor)
                        ? editForm.riskFactors.filter((f) => f !== factor)
                        : [...editForm.riskFactors, factor]
                    )
                  }
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>
          {/* Had similar symptoms before */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Had Similar Symptoms Before?</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  editForm.hadSimilar === true
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
                onClick={() => handleEditChange("hadSimilar", true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  editForm.hadSimilar === false
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
                onClick={() => handleEditChange("hadSimilar", false)}
              >
                No
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        @media print {
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default UDiagnosis;