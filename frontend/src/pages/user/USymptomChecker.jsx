import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import symptomList from "../../data/symptomList.json";

const riskFactorsList = [
  "Asthma", "Diabetes", "Heart condition", "Hypertension", "Immunosuppression", "Pregnancy", "Chronic kidney disease", "COPD", "Cancer",
];

function USymptomChecker() {
  // Form state
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomChips, setSymptomChips] = useState([]);
  const [duration, setDuration] = useState("");
  const [onsetDate, setOnsetDate] = useState("");
  const [durationUnit, setDurationUnit] = useState("days");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");
  const [recording, setRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [riskFactors, setRiskFactors] = useState([]);
  const [hadSimilar, setHadSimilar] = useState(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [showVoiceConfirm, setShowVoiceConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();
  const formRef = useRef();

  // Multi-symptom input logic
  const handleSymptomInputChange = (e) => {
    setSymptomInput(e.target.value);
    if (e.target.value.length > 0) {
      const filtered = symptomList.filter((sym) =>
        sym.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSymptomInputKeyDown = (e) => {
    if (
      (e.key === "Enter" || e.key === "," || e.key === "Tab") &&
      symptomInput.trim()
    ) {
      e.preventDefault();
      addSymptomChip(symptomInput.trim());
    }
  };

  const addSymptomChip = (symptom) => {
    if (
      symptom &&
      !symptomChips.includes(symptom) &&
      symptom.length > 1
    ) {
      setSymptomChips([...symptomChips, symptom]);
      setSymptomInput("");
      setShowSuggestions(false);
    }
  };

  const removeSymptomChip = (symptom) => {
    setSymptomChips(symptomChips.filter((chip) => chip !== symptom));
  };

  const handleSuggestionClick = (suggestion) => {
    addSymptomChip(suggestion);
  };

  // Risk factor toggle
  const handleRiskToggle = (factor) => {
    setRiskFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((f) => f !== factor)
        : [...prev, factor]
    );
  };

  // Placeholder for voice-to-text (Whisper API integration)
  const handleVoiceInput = async () => {
    setRecording(true);
    // TODO: Integrate Whisper API here
    setTimeout(() => {
      setVoiceTranscript("Serious Constipation, Vomiting, Stooling, Headache, and fever");
      setShowVoiceConfirm(true);
      setRecording(false);
    }, 2000);
  };

  // Voice confirmation: add all symptoms at once
  const handleVoiceConfirm = (confirmed) => {
    if (confirmed) {
      const newChips = voiceTranscript
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 1 && !symptomChips.includes(s));
      if (newChips.length > 0) {
        setSymptomChips([...symptomChips, ...newChips]);
      }
      setShowVoiceConfirm(false);
      setShowSuggestions(false);
    } else {
      setShowVoiceConfirm(false);
      setVoiceTranscript("");
    }
  };

  // File upload with error handling
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: "File must be less than 5MB." }));
      setFile(null);
    } else {
      setFile(selected);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  // Error handling and validation
  const validateForm = () => {
    const newErrors = {};
    if (symptomChips.length === 0) newErrors.symptoms = "Please add at least one symptom.";
    if (!urgency) newErrors.urgency = "Please select urgency.";
    if (file && file.size > 5 * 1024 * 1024) newErrors.file = "File must be less than 5MB.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit: Save to sessionStorage and navigate to diagnosis page
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLoading(true);

    //setTimeout(() => {
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const diagnosisObj = {
        probable: "Viral Infection (e.g., Flu)",
        advice:
          urgency === "3"
            ? "Seek urgent medical attention immediately."
            : urgency === "2"
            ? "Consider speaking to a doctor soon. You may start a live chat or book an appointment."
            : "Monitor your symptoms. If they worsen, seek medical advice.",
        recommendations: [
          "Stay hydrated and rest.",
          "Monitor your temperature.",
          "If symptoms persist or worsen, contact a healthcare provider.",
        ],
        summary: {
          symptoms: symptomChips.join(", "),
          symptomChips,
          duration: duration ? `${duration} ${durationUnit}` : "",
          onsetDate,
          location,
          urgency,
          riskFactors,
          hadSimilar,
        },
        file,
      };
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);

      // Save to sessionStorage for UDiagnosis page
      sessionStorage.setItem("diagnosisResult", JSON.stringify(diagnosisObj));
      navigate("/user/diagnosis");
    } catch {
      setLoading(false);
      setSubmitError("An unexpected error occurred. Please try again.");
    }
  };

  // Progress bar (simple, based on filled fields)
  const progress =
    [
      symptomChips.length > 0,
      onsetDate || duration,
      urgency,
      location,
      riskFactors.length > 0 || hadSimilar !== null,
    ].filter(Boolean).length / 5;


  return (
    <div ref={formRef} className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden transition-all duration-500">
      {/* Decorative animated background blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-blob1 pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl animate-blob2 pointer-events-none"></div>
      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center animate-fade-in-up">
          <span className="text-6xl">🎉</span>
        </div>
      )}
      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-blue-100 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.round(progress * 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-blue-700 mt-1 text-right">
          {Math.round(progress * 100)}% complete
        </div>
      </div>
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight animate-fade-in-down transition-all duration-500">
        <span role="img" aria-label="stethoscope">
          🩺
        </span>{" "}
        Symptom Checker
      </h2>
      {submitError && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center">
          {submitError}
        </div>
      )}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up transition-all duration-500">
          <svg className="w-12 h-12 text-blue-500 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <div className="text-blue-700 font-semibold text-lg">Hang tight! Our assistant is reviewing your symptoms…</div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 animate-fade-in transition-all duration-500"
          autoComplete="off"
        >
          {/* Multi-symptom input with chips */}
          <div className="flex flex-col gap-2 relative">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2 animate-fade-in-right">
              Describe your symptoms
            </label>
            <div className={`flex flex-wrap gap-2 mb-2`}>
              {symptomChips.map((chip) => (
                <span
                  key={chip}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow"
                >
                  {chip}
                  <button
                    type="button"
                    className="ml-2 text-blue-500 hover:text-red-500 focus:outline-none"
                    onClick={() => removeSymptomChip(chip)}
                    aria-label={`Remove ${chip}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className={`w-full rounded-xl border ${errors.symptoms ? "border-red-400" : "border-blue-200"} shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-3 text-gray-800 transition`}
              value={symptomInput}
              onChange={handleSymptomInputChange}
              onKeyDown={handleSymptomInputKeyDown}
              placeholder="Type a symptom and press Enter…"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={showSuggestions}
            />
            {errors.symptoms && (
              <div className="text-red-600 text-xs mt-1">{errors.symptoms}</div>
            )}
            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg max-h-40 overflow-auto animate-fade-in-up z-30"
                style={{ top: "70%" }}
                role="listbox"
              >
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-blue-700"
                    onClick={() => handleSuggestionClick(suggestion)}
                    role="option"
                    tabIndex={0}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {/* Voice input button/modal */}
            <div className="relative w-fit">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`mt-2 px-4 py-2 rounded-xl font-semibold shadow flex items-center gap-2 transition
                  ${recording
                    ? "bg-blue-200 text-blue-800 animate-pulse"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"}
                `}
                disabled={recording}
                id="voice-btn"
              >
                <svg
                  className={`w-5 h-5 ${recording ? "animate-mic" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 18v2m0 0a4 4 0 01-4-4h8a4 4 0 01-4 4zm0-14a4 4 0 014 4v4a4 4 0 01-8 0V8a4 4 0 014-4z" />
                </svg>
                {recording ? "Listening..." : "Voice Input"}
              </button>
              {/* Voice confirmation modal */}
              {showVoiceConfirm && (
                <div
                  className="absolute left-0 mt-2 z-50 w-80 max-w-xs bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border border-blue-200 animate-fade-in"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    background: "rgba(255,255,255,0.98)"
                  }}
                >
                  <div className="text-blue-700 font-bold text-lg mb-2">Voice Transcript</div>
                  <div className="mb-4 text-gray-700 text-center">{voiceTranscript}</div>
                  <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                      onClick={() => handleVoiceConfirm(true)}
                    >
                      ✔️ Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
                      onClick={() => handleVoiceConfirm(false)}
                    >
                      ❌ No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Onset time/date input */}
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <div className="flex-1">
              <label className="block text-base font-semibold text-blue-700 mb-1 pl-2 animate-fade-in-right delay-100">
                When did your symptoms start?
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-blue-200 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-3 text-gray-800 transition"
                value={onsetDate}
                onChange={(e) => setOnsetDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex-1">
              <label className="block text-base font-semibold text-blue-700 mb-1 pl-2 animate-fade-in-right delay-100">
                Or how long have these lasted?
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  className="w-2/3 rounded-xl border border-blue-200 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-3 text-gray-800 transition"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 2"
                />
                <select
                  className="w-1/3 rounded-xl border border-blue-200 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-2 py-3 text-gray-800 transition"
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                </select>
              </div>
            </div>
          </div>
          {/* Location of symptoms */}
          <div className="flex flex-col gap-2">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2 animate-fade-in-right delay-200">
              Where do you feel the symptoms? <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-blue-200 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-3 text-gray-800 transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. chest, stomach, head"
            />
          </div>
          {/* Risk factors */}
          <div className="flex flex-col gap-2">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2">
              Do you have any of these risk factors? <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {riskFactorsList.map((factor) => (
                <button
                  type="button"
                  key={factor}
                  className={`px-3 py-1 rounded-full border font-medium text-sm transition
                    ${
                      riskFactors.includes(factor)
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    }
                  `}
                  onClick={() => handleRiskToggle(factor)}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>
          {/* Had similar symptoms before */}
          <div className="flex flex-col gap-2">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2">
              Have you had similar symptoms before?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  hadSimilar === true
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
                onClick={() => setHadSimilar(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  hadSimilar === false
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
                onClick={() => setHadSimilar(false)}
              >
                No
              </button>
            </div>
          </div>
          {/* File/Image upload with error */}
          <div className="flex flex-col gap-2">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2">
              Upload a photo <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className={`block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.file ? "border-red-400" : ""}`}
              onChange={handleFileChange}
            />
            {errors.file && (
              <div className="text-red-600 text-xs mt-1">{errors.file}</div>
            )}
            {file && !errors.file && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Symptom upload preview"
                  className="w-24 h-24 object-cover rounded-xl border border-blue-200 shadow"
                />
              </div>
            )}
          </div>
          {/* Urgency */}
          <div className="flex flex-col gap-2">
            <label className="block text-base font-semibold text-blue-700 mb-1 pl-2 animate-fade-in-right delay-300">
              How urgent is your situation?
            </label>
            <select
              className={`w-full rounded-xl border ${errors.urgency ? "border-red-400" : "border-blue-200"} shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-3 text-gray-800 transition`}
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              required
            >
              <option value="">Select urgency</option>
              <option value="1">Level 1 – Mild (Can wait)</option>
              <option value="2">Level 2 – Moderate (Need advice soon)</option>
              <option value="3">Level 3 – Severe (Need urgent help)</option>
            </select>
            {errors.urgency && (
              <div className="text-red-600 text-xs mt-1">{errors.urgency}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition transform duration-200 animate-fade-in-up"
          >
           {loading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
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
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(-24px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes pop {
          0% { transform: scale(0.7);}
          80% { transform: scale(1.1);}
          100% { transform: scale(1);}
        }
        @keyframes blob1 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.2) translateY(20px);}
        }
        @keyframes blob2 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(-20px);}
        }
        @keyframes mic {
          0%,100% { transform: scale(1);}
          50% { transform: scale(1.2);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-right { animation: fade-in-right 0.7s both; }
        .animate-pop { animation: pop 0.5s both; }
        .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
        .animate-blob2 { animation: blob2 7s infinite ease-in-out; }
        .animate-mic { animation: mic 1s infinite; }
      `}</style>
    </div>
  );
}

export default USymptomChecker;