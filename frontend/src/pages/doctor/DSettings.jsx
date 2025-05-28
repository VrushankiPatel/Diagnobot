import React, { useState, useRef } from 'react';

// --- Initial Data ---
const initialProfile = {
  name: "Jane Doe",
  username: "jane",
  email: "jane@email.com",
  phone: "+2348000000000",
  about: "",
  image: "",
  license: "MED-123456",
  specialty: "General Practitioner",
  bio: "Experienced GP with a passion for preventive care.",
  contact: "+2348000000000",
  qualifications: "",
  certifications: [],
  yearsOfExperience: "",
  telemedicineLink: "",
};

const initialAvailability = {
  monday: [{ start: "09:00", end: "17:00" }],
  tuesday: [{ start: "09:00", end: "17:00" }],
  wednesday: [{ start: "09:00", end: "17:00" }],
  thursday: [{ start: "09:00", end: "17:00" }],
  friday: [{ start: "09:00", end: "17:00" }],
  saturday: [],
  sunday: [],
  vacations: [],
};

const initialSecurity = {
  lastLogin: "2025-05-25 21:12",
  activity: [
    { type: "Login", time: "2025-05-25 21:12", device: "Chrome, Windows" },
    { type: "Password Change", time: "2025-05-20 13:44", device: "Mobile" },
    { type: "2FA Enabled", time: "2025-05-18 10:22", device: "Chrome, Windows" },
  ],
  sessions: [
    { id: 1, device: "Chrome, Windows", location: "Lagos", active: true },
    { id: 2, device: "Safari, iPhone", location: "Abuja", active: false },
  ],
  twofaQr: "https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/Diagnobot:JaneDoe?secret=JBSWY3DPEHPK3PXP&issuer=Diagnobot&size=150x150",
};

const initialPrivacy = {
  aiData: true,
  autoDelete: false,
  consent: true,
};

const initialNotif = {
  appointment_email: true,
  appointment_sms: false,
  appointment_push: true,
  health: true,
  offers: false,
  urgent_sms: false,
  cancellation_email: true,
};

const specialtyOptions = [
  "General Practitioner",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Psychiatrist",
  "Surgeon",
  "Radiologist",
  "Oncologist",
  "Neurologist",
  "Orthopedic",
  "Gynecologist",
  "Ophthalmologist",
  "ENT Specialist",
  "Urologist",
  "Endocrinologist",
  "Other",
];

const calendarProviders = [
  { name: "Google", icon: "G" },
  { name: "Outlook", icon: "O" },
  { name: "Apple", icon: "A" },
];

function DSettings() {
  // Tabs
  const [activeTab, setActiveTab] = useState("profile");
  const [tabAnim, setTabAnim] = useState("animate-fade-in-up");

  // Profile
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [certFiles, setCertFiles] = useState([]);
  const [availability, setAvailability] = useState(initialAvailability);
  const [editAvailability, setEditAvailability] = useState(false);
  const [vacationInput, setVacationInput] = useState("");
  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);

  // Account
  const [editAccount, setEditAccount] = useState(false);
  const [accountForm, setAccountForm] = useState({
    email: profile.email,
    username: profile.username,
    phone: profile.phone,
    twofa: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Password
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pwStrength, setPwStrength] = useState(0);

  // Notification
  const [notif, setNotif] = useState(initialNotif);

  // Privacy
  const [privacy, setPrivacy] = useState(initialPrivacy);

  // Security
  const [security, setSecurity] = useState(initialSecurity);

  // Toast
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Calendar
  const [calendar, setCalendar] = useState({ linked: false, provider: "" });

  // Save/Cancel loading
  const [saving, setSaving] = useState(false);

  // --- Handlers ---
  // Tab animation
  const handleTab = (tab) => {
    setTabAnim("animate-fade-out-left");
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnim("animate-fade-in-up");
    }, 250);
  };

  // Profile
  const handleProfileChange = e => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
    } else if (name === "certifications") {
      setCertFiles([...files]);
      setForm({ ...form, certifications: [...files].map(f => f.name) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleProfileSave = e => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setProfile(form);
      setEdit(false);
      setSaving(false);
      setToast({ show: true, msg: "Profile updated!", type: "success" });
    }, 1200);
  };
  const handleImageClick = () => fileInputRef.current.click();
  const handleCertClick = () => certInputRef.current.click();

  // Availability
  const handleAvailabilityChange = (dayIdx, slotIdx, field, value) => {
    const days = Object.keys(availability);
    const day = days[dayIdx];
    const updated = { ...availability };
    updated[day][slotIdx][field] = value;
    setAvailability(updated);
  };
  const handleAddSlot = (dayIdx) => {
    const days = Object.keys(availability);
    const day = days[dayIdx];
    setAvailability({
      ...availability,
      [day]: [...availability[day], { start: "", end: "" }]
    });
  };
  const handleRemoveSlot = (dayIdx, slotIdx) => {
    const days = Object.keys(availability);
    const day = days[dayIdx];
    setAvailability({
      ...availability,
      [day]: availability[day].filter((_, i) => i !== slotIdx)
    });
  };
  const handleVacationAdd = () => {
    if (vacationInput) {
      setAvailability({
        ...availability,
        vacations: [...availability.vacations, vacationInput]
      });
      setVacationInput("");
    }
  };
  const handleVacationRemove = (idx) => {
    setAvailability({
      ...availability,
      vacations: availability.vacations.filter((_, i) => i !== idx)
    });
  };
  const handleAvailabilitySave = e => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setEditAvailability(false);
      setSaving(false);
      setToast({ show: true, msg: "Availability updated!", type: "success" });
    }, 1200);
  };

  // Account
  const handleAccountChange = e => setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
  const handle2FAToggle = () => setAccountForm(f => ({ ...f, twofa: !f.twofa }));
  const handleAccountSave = e => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setProfile(p => ({ ...p, ...accountForm }));
      setEditAccount(false);
      setSaving(false);
      setToast({ show: true, msg: "Account settings updated!", type: "success" });
    }, 1200);
  };

  // Session management
  const handleLogoutSession = (id) => {
    setSecurity(s => ({
      ...s,
      sessions: s.sessions.map(sess =>
        sess.id === id ? { ...sess, active: false } : sess
      )
    }));
    setToast({ show: true, msg: "Session logged out!", type: "success" });
  };

  // Delete/Deactivate
  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    setToast({ show: true, msg: "Account deactivated. (Demo only)", type: "error" });
  };

  // Password
  const handlePwChange = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    if (e.target.name === "new") setPwStrength(getPwStrength(e.target.value));
  };
  const handlePwSubmit = e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setToast({ show: true, msg: "New passwords do not match.", type: "error" });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setPasswords({ current: "", new: "", confirm: "" });
      setPwStrength(0);
      setSaving(false);
      setToast({ show: true, msg: "Password updated! (Demo only)", type: "success" });
    }, 1200);
  };
  const toggleShowPw = field => setShowPw(prev => ({ ...prev, [field]: !prev[field] }));

  // Notification
  const handleNotifChange = e => setNotif({ ...notif, [e.target.name]: e.target.checked });

  // Privacy
  const handlePrivacyChange = e => setPrivacy({ ...privacy, [e.target.name]: e.target.checked });

  // Calendar
  const handleCalendarLink = (provider) => setCalendar({ linked: true, provider });

  // Telemedicine
  const handleTelemedicineChange = e => setForm({ ...form, telemedicineLink: e.target.value });

  // Export Health Data
  const handleExport = () => {
    setToast({ show: true, msg: "Exported as PDF! (Demo only)", type: "success" });
  };

  // Export Activity Logs
  const handleExportLogs = () => {
    setToast({ show: true, msg: "Activity logs exported! (Demo only)", type: "success" });
  };

  // Toast close
  const closeToast = () => setToast({ show: false, msg: "", type: "success" });

  // Password strength
  function getPwStrength(pw) {
    let score = 0;
    if (pw.length > 7) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  // --- UI ---
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-fade-in sm:max-w-3xl">
      {/* Animated background blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 opacity-30 rounded-full blur-2xl animate-blob1 pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 opacity-20 rounded-full blur-2xl animate-blob2 pointer-events-none"></div>

      {/* Toast */}
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

      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-tight animate-fade-in-down">Settings</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "profile" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("profile")}
          aria-label="Profile"
        >Profile</button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "account" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("account")}
          aria-label="Account"
        >Account</button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "notifications" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("notifications")}
          aria-label="Notifications"
        >Notifications</button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "privacy" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("privacy")}
          aria-label="Privacy"
        >Privacy</button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "security" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("security")}
          aria-label="Security"
        >Security</button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow transition
            ${activeTab === "export" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("export")}
          aria-label="Export Data"
        >Export Data</button>
      </div>
      
      {/* --- Profile Tab (Merged with Doctor Profile) --- */}
      {activeTab === "profile" && (
        <div className={tabAnim}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-2 border-4 border-white overflow-hidden group transition-all duration-300 hover:scale-105">
              {form.image || profile.image ? (
                <img
                  src={edit ? form.image : profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-blue-700">{profile.name[0]}</span>
              )}
              {edit && (
                <>
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    tabIndex={-1}
                  >
                    <span className="px-3 py-1 bg-blue-600 text-white rounded shadow font-semibold text-sm hover:bg-blue-700 transition">
                      Choose Image
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleProfileChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
            {edit && (
              <div className="text-xs text-gray-400 mb-1">Hover on image to edit</div>
            )}
            {!edit && (
              <>
                <div className="font-semibold text-lg text-blue-700">{profile.name}</div>
                <div className="text-gray-600">{profile.email}</div>
                {profile.about && <div className="text-blue-500 text-sm mt-1">{profile.about}</div>}
              </>
            )}
          </div>
          <hr className="my-6 border-blue-100" />
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="doctor">🩺</span> Doctor Profile
          </h3>
          {edit ? (
            <form onSubmit={handleProfileSave} className="space-y-5 animate-fade-in" aria-label="Edit Profile">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Name
                  <span className="ml-1 text-blue-400" title="Your full name for patients and colleagues.">ⓘ</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  aria-label="Name"
                />
              </div>
              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  About Me
                  <span className="ml-1 text-blue-400" title="A short bio for your profile.">ⓘ</span>
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={2}
                  aria-label="About Me"
                />
              </div>
              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Qualifications
                  <span className="ml-1 text-blue-400" title="E.g. MBBS, MD, FRCS">ⓘ</span>
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={form.qualifications}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm"
                  aria-label="Qualifications"
                />
              </div>
              {/* Certifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Certifications
                  <span className="ml-1 text-blue-400" title="Upload certificates or licenses (PDF, image)">ⓘ</span>
                </label>
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={handleCertClick}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded shadow font-semibold text-sm hover:bg-blue-100 transition"
                  >
                    Upload
                  </button>
                  <input
                    ref={certInputRef}
                    type="file"
                    name="certifications"
                    accept=".pdf,image/*"
                    multiple
                    onChange={handleProfileChange}
                    className="hidden"
                  />
                  <span className="text-xs text-gray-500">
                    {form.certifications && form.certifications.length > 0
                      ? form.certifications.join(", ")
                      : "No files uploaded"}
                  </span>
                </div>
              </div>
              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Years of Experience
                  <span className="ml-1 text-blue-400" title="How many years have you practiced?">ⓘ</span>
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm"
                  min={0}
                  aria-label="Years of Experience"
                />
              </div>
              {/* License */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  License Number
                  <span className="ml-1 text-blue-400" title="Your medical license number.">ⓘ</span>
                </label>
                <input
                  type="text"
                  name="license"
                  value={form.license}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm"
                  required
                  aria-label="License Number"
                />
              </div>
              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Specialty
                  <span className="ml-1 text-blue-400" title="Your medical specialty.">ⓘ</span>
                </label>
                <select
                  name="specialty"
                  value={form.specialty}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm"
                  aria-label="Specialty"
                >
                  {specialtyOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Bio
                  <span className="ml-1 text-blue-400" title="Short professional bio.">ⓘ</span>
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm"
                  rows={2}
                  aria-label="Bio"
                />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Contact
                  <span className="ml-1 text-blue-400" title="Contact number for patients.">ⓘ</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm"
                  aria-label="Contact"
                />
              </div>
              {/* Telemedicine Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Telemedicine Link
                  <span className="ml-1 text-blue-400" title="Paste your video call link (Zoom, Google Meet, etc.)">ⓘ</span>
                </label>
                <input
                  type="url"
                  name="telemedicineLink"
                  value={form.telemedicineLink}
                  onChange={handleTelemedicineChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm"
                  aria-label="Telemedicine Link"
                  placeholder="https://meet.example.com/your-link"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={saving}
                  aria-label="Save Profile"
                >
                  {saving && <span className="loader"></span>}
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setEdit(false)}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              
              <div className="mb-6">
                <div className="font-semibold text-2xl text-blue-700 text-center">{profile.name}</div>
                <div className="text-gray-500 text-center mb-2">{profile.email}</div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <div className="bg-blue-50 rounded-lg px-4 py-2 min-w-[160px]">
                    <div className="text-xs text-gray-500">License</div>
                    <div className="font-medium text-blue-800">{profile.license || <span className="text-gray-400">—</span>}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-4 py-2 min-w-[160px]">
                    <div className="text-xs text-gray-500">Specialty</div>
                    <div className="font-medium text-blue-800">{profile.specialty || <span className="text-gray-400">—</span>}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-4 py-2 min-w-[160px]">
                    <div className="text-xs text-gray-500">Contact</div>
                    <div className="font-medium text-blue-800">{profile.contact || <span className="text-gray-400">—</span>}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg px-4 py-3">
                    <div className="text-xs text-gray-500 mb-1">Qualifications</div>
                    <div className="text-gray-800">{profile.qualifications || <span className="text-gray-400">—</span>}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-4 py-3">
                    <div className="text-xs text-gray-500 mb-1">Years of Experience</div>
                    <div className="text-gray-800">{profile.yearsOfExperience || <span className="text-gray-400">—</span>}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 col-span-1 sm:col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Certifications</div>
                    <div className="text-gray-800">
                      {profile.certifications && profile.certifications.length > 0
                        ? profile.certifications.join(", ")
                        : <span className="text-gray-400">—</span>}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 col-span-1 sm:col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Telemedicine Link</div>
                    <div className="text-blue-700 break-all">
                      {profile.telemedicineLink
                        ? <a href={profile.telemedicineLink} target="_blank" rel="noopener noreferrer" className="underline">{profile.telemedicineLink}</a>
                        : <span className="text-gray-400">—</span>}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 mt-6 border border-blue-50">
                  <div className="text-xs text-gray-500 mb-1">Bio</div>
                  <div className="text-gray-800">{profile.bio || <span className="text-gray-400">—</span>}</div>
                </div>
                {profile.about && (
                  <div className="bg-white rounded-lg px-4 py-3 mt-3 border border-blue-50">
                    <div className="text-xs text-gray-500 mb-1">About Me</div>
                    <div className="text-gray-800">{profile.about}</div>
                  </div>
                )}
              </div>
              <button
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition w-full animate-fade-in"
                onClick={() => setEdit(true)}
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </div>
          )}
          
          {/* --- Availability Section --- */}
          <hr className="my-6 border-blue-100" />
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="calendar">📅</span> Availability
          </h3>
          {editAvailability ? (
            <form onSubmit={handleAvailabilitySave} className="space-y-3 animate-fade-in" aria-label="Edit Availability">
              {Object.keys(availability).filter(day => day !== "vacations").map((day, dayIdx) => (
                <div key={day} className="mb-2">
                  <label className="capitalize text-gray-700">{day}</label>
                  {availability[day].map((slot, slotIdx) => (
                    <div key={slotIdx} className="flex items-center gap-2 mt-1">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={e => handleAvailabilityChange(dayIdx, slotIdx, "start", e.target.value)}
                        className="rounded-lg border-gray-300 px-2 py-1 shadow-sm"
                        aria-label={`${day} start time`}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={e => handleAvailabilityChange(dayIdx, slotIdx, "end", e.target.value)}
                        className="rounded-lg border-gray-300 px-2 py-1 shadow-sm"
                        aria-label={`${day} end time`}
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => handleRemoveSlot(dayIdx, slotIdx)}
                        aria-label={`Remove slot for ${day}`}
                      >×</button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-1 px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs"
                    onClick={() => handleAddSlot(dayIdx)}
                    aria-label={`Add slot for ${day}`}
                  >Add Slot</button>
                </div>
              ))}
              {/* Vacation/Leave */}
              <div>
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
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs"
                    onClick={handleVacationAdd}
                    aria-label="Add vacation"
                  >Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availability.vacations.map((date, idx) => (
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
              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={saving}
                >
                  {saving && <span className="loader"></span>}
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setEditAvailability(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(availability).filter(([day]) => day !== "vacations").map(([day, slots]) => (
                  <div key={day} className="flex flex-col text-gray-700">
                    <span className="capitalize font-semibold">{day}:</span>
                    {slots.length === 0 ? (
                      <span className="text-gray-400">Not available</span>
                    ) : (
                      slots.map((slot, idx) => (
                        <span key={idx}>{slot.start} - {slot.end}</span>
                      ))
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <span className="font-semibold text-blue-700">Vacations:</span>
                {availability.vacations.length === 0 ? (
                  <span className="text-gray-400 ml-2">None</span>
                ) : (
                  availability.vacations.map((date, idx) => (
                    <span key={idx} className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{date}</span>
                  ))
                )}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition w-full animate-fade-in"
                onClick={() => setEditAvailability(true)}
              >
                Edit Availability
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- Account Tab --- */}
      {activeTab === "account" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="user">👤</span> Account Settings
          </h3>
          <form onSubmit={handleAccountSave} className="space-y-3" aria-label="Account Settings">
            <input
              name="email"
              value={accountForm.email}
              onChange={handleAccountChange}
              className="rounded-lg border-gray-300 px-4 py-2 shadow-sm w-full"
              placeholder="Email"
              aria-label="Email"
            />
            <input
              name="username"
              value={accountForm.username}
              onChange={handleAccountChange}
              className="rounded-lg border-gray-300 px-4 py-2 shadow-sm w-full"
              placeholder="Username"
              aria-label="Username"
            />
            <input
              name="phone"
              value={accountForm.phone}
              onChange={handleAccountChange}
              className="rounded-lg border-gray-300 px-4 py-2 shadow-sm w-full"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={accountForm.twofa}
                onChange={handle2FAToggle}
                className="accent-blue-600"
                aria-label="Enable 2FA"
              />
              Enable 2FA (Two-Factor Authentication)
            </label>
            {accountForm.twofa && (
              <div className="flex items-center gap-4 mt-2">
                <img src={security.twofaQr} alt="2FA QR" className="w-24 h-24 border rounded" />
                <span className="text-xs text-gray-500">Scan with your authenticator app</span>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={saving}
                aria-label="Save Account Settings"
              >
                {saving && <span className="loader"></span>}
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                onClick={() => setEditAccount(false)}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition ml-auto"
                onClick={() => setShowDeleteModal(true)}
                aria-label="Delete Account"
              >
                Delete/Deactivate Account
              </button>
            </div>
          </form>

          {/* --- Change Password Section --- */}
          <hr className="my-6 border-blue-100" />
          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="lock">🔒</span> Change Password
          </h4>
          <form onSubmit={handlePwSubmit} className="space-y-3 w-full" aria-label="Change Password">
            <div className="relative w-full">
              <input
                type={showPw.current ? "text" : "password"}
                name="current"
                value={passwords.current}
                onChange={handlePwChange}
                className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm pr-10 transition"
                placeholder="Current password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => toggleShowPw("current")}
                aria-label={showPw.current ? "Hide password" : "Show password"}
              >
                {showPw.current ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.21.41 4.5 1.125M19.07 4.93A9.953 9.953 0 0121 12c0 3-4 7-9 7-1.657 0-3.21-.41-4.5-1.125M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <ellipse cx="12" cy="12" rx="10" ry="7" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div className="relative w-full">
              <input
                type={showPw.new ? "text" : "password"}
                name="new"
                value={passwords.new}
                onChange={handlePwChange}
                className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm pr-10 transition"
                placeholder="New password"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => toggleShowPw("new")}
                aria-label={showPw.new ? "Hide password" : "Show password"}
              >
                {showPw.new ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.21.41 4.5 1.125M19.07 4.93A9.953 9.953 0 0121 12c0 3-4 7-9 7-1.657 0-3.21-.41-4.5-1.125M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <ellipse cx="12" cy="12" rx="10" ry="7" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              {/* Password strength bar */}
              <div className="pw-strength-bar">
                <div
                  className="pw-strength-inner"
                  style={{
                    width: `${(pwStrength / 4) * 100}%`,
                    background:
                      pwStrength < 2
                        ? "#f87171"
                        : pwStrength < 3
                        ? "#fbbf24"
                        : "#34d399",
                  }}
                />
              </div>
            </div>
            <div className="relative w-full">
              <input
                type={showPw.confirm ? "text" : "password"}
                name="confirm"
                value={passwords.confirm}
                onChange={handlePwChange}
                className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm pr-10 transition"
                placeholder="Confirm new password"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700"
                onClick={() => toggleShowPw("confirm")}
                aria-label={showPw.confirm ? "Hide password" : "Show password"}
              >
                {showPw.confirm ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.21.41 4.5 1.125M19.07 4.93A9.953 9.953 0 0121 12c0 3-4 7-9 7-1.657 0-3.21-.41-4.5-1.125M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <ellipse cx="12" cy="12" rx="10" ry="7" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
              disabled={saving}
            >
              {saving ? <span className="loader"></span> : "Update Password"}
            </button>
          </form>

          {/* --- Delete Modal --- */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
                <button
                  className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                >×</button>
                <div className="font-bold text-red-700 mb-2">Deactivate Account</div>
                <div className="text-blue-900 text-sm mb-4">
                  Are you sure you want to deactivate your account? This cannot be undone.
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
                    onClick={handleDeleteAccount}
                  >
                    Deactivate
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- Linked Calendar Section --- */}
          <hr className="my-6 border-blue-100" />
          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="calendar">📅</span> Linked Calendar
          </h4>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {calendar.linked ? (
              <span className="text-green-600 font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Linked with {calendar.provider}
              </span>
            ) : (
              calendarProviders.map(p => (
                <button
                  key={p.name}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => handleCalendarLink(p.name)}
                  aria-label={`Link ${p.name} Calendar`}
                >
                  Link {p.name} Calendar
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- Notifications Tab --- */}
      {activeTab === "notifications" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="bell">🔔</span> Notification Preferences
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="appointment_email"
                checked={notif.appointment_email}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Appointment reminders (Email)"
              />
              Appointment reminders (Email)
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="appointment_sms"
                checked={notif.appointment_sms}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Appointment reminders (SMS)"
              />
              Appointment reminders (SMS)
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="appointment_push"
                checked={notif.appointment_push}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Appointment reminders (Push)"
              />
              Appointment reminders (Push)
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="urgent_sms"
                checked={notif.urgent_sms}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Urgent notifications (SMS)"
              />
              Urgent notifications (SMS)
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="cancellation_email"
                checked={notif.cancellation_email}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Cancellation notifications (Email)"
              />
              Cancellation notifications (Email)
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="health"
                checked={notif.health}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Health check-ins"
              />
              Health check-ins
            </label>
            <label className="flex items-center gap-2 cursor-pointer transition hover:bg-blue-50 px-2 py-1 rounded">
              <input
                type="checkbox"
                name="offers"
                checked={notif.offers}
                onChange={handleNotifChange}
                className="accent-blue-600"
                aria-label="Offers and promotions"
              />
              Offers/promotions
            </label>
          </div>
        </div>
      )}

      {/* --- Privacy Tab --- */}
      {activeTab === "privacy" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="lock">📌</span> Privacy & Data Controls
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="aiData"
                checked={privacy.aiData}
                onChange={handlePrivacyChange}
                className="accent-blue-600"
                aria-label="Allow AI to use my past data"
              />
              Allow AI to use my past data for better suggestions
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="autoDelete"
                checked={privacy.autoDelete}
                onChange={handlePrivacyChange}
                className="accent-blue-600"
                aria-label="Auto-delete symptom history"
              />
              Auto-delete symptom history after 30 days
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={privacy.consent}
                onChange={handlePrivacyChange}
                className="accent-blue-600"
                aria-label="Consent for data sharing"
              />
              Consent for patient data sharing (required for referrals)
            </label>
            <button
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition"
              onClick={handleExportLogs}
              aria-label="Export Activity Logs"
            >
              Export Activity Logs
            </button>
            <a href="/privacy" className="text-blue-600 underline text-sm px-2" rel="noopener noreferrer">
              View Privacy Policy
            </a>
          </div>
        </div>
      )}

      {/* --- Security Tab --- */}
      {activeTab === "security" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="shield">🔒</span> Security
          </h3>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-1">Last login: <b>{security.lastLogin}</b></div>
            <div className="text-xs text-blue-500 mb-2">Your data is protected and encrypted.</div>
            <button
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
              onClick={() => setToast({ show: true, msg: "Logged out from all devices! (Demo only)", type: "success" })}
              aria-label="Logout from all devices"
            >
              Logout from all devices
            </button>
          </div>

          <div>
            <div className="font-semibold text-blue-700 mb-1">Active Sessions</div>
            <ul className="space-y-1 text-sm">
              {security.sessions.map(sess => (
                <li key={sess.id} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${sess.active ? "bg-green-500" : "bg-gray-300"}`}></span>
                  <span>{sess.device} ({sess.location})</span>
                  {sess.active && (
                    <button
                      className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      onClick={() => handleLogoutSession(sess.id)}
                      aria-label="Logout session"
                    >Logout</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <div className="font-semibold text-blue-700 mb-1">Recent Activity</div>
            <ul className="space-y-1 text-sm">
              {security.activity.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{a.type} — {a.time} <span className="text-gray-400">({a.device})</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* --- Export Data Tab --- */}
      {activeTab === "export" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="download">📥</span> Export Health Data
          </h3>
          <div className="mb-4 text-gray-600 text-sm">
            Download your diagnosis or medical history as PDF for your records or to share with other healthcare providers.
          </div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={handleExport}
            aria-label="Export Health Data"
          >
            Export as PDF
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .max-w-2xl, .sm\\:max-w-3xl { max-width: 100vw !important; }
          .p-8 { padding: 1rem !important; }
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
        @keyframes fade-out-left {
          0% { opacity: 1; transform: translateX(0);}
          100% { opacity: 0; transform: translateX(-40px);}
        }
        @keyframes blob1 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.2) translateY(20px);}
        }
        @keyframes blob2 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(-20px);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-fade-out-left { animation: fade-out-left 0.25s both; }
        .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
        .animate-blob2 { animation: blob2 7s infinite ease-in-out; }
        .loader {
          border: 2px solid #fff;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          width: 1em;
          height: 1em;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        /* Password strength bar */
        .pw-strength-bar {
          height: 6px;
          border-radius: 4px;
          margin-top: 4px;
          background: #e5e7eb;
          overflow: hidden;
        }
        .pw-strength-inner {
          height: 100%;
          transition: width 0.3s;
        }
      `}</style>
    </div>
  );
}

export default DSettings;