import React, { useState, useRef } from 'react';

// --- Initial Data ---
const initialProfile = {
  name: "Chocolate Parfait",
  username: "parfait",
  email: "parfait@email.com",
  phone: "+2348000000000",
  about: "",
  image: "",
};

const initialMedical = {
  age: "",
  gender: "",
  bloodType: "",
  allergies: "",
  chronic: "",
  meds: "",
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

const calendarProviders = [
  { name: "Google", icon: "G" },
  { name: "Outlook", icon: "O" },
  { name: "Apple", icon: "A" },
];

function USettings() {
  // Tabs
  const [activeTab, setActiveTab] = useState("profile");
  const [tabAnim, setTabAnim] = useState("animate-fade-in-up");

  // Profile
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const fileInputRef = useRef(null);

  // Medical
   const [medical, setMedical] = useState(initialMedical);
  const [editMedical, setEditMedical] = useState(false);

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
    if (name === "image" && files[0]) {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
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

  // Medical
  const handleMedicalChange = e => setMedical({ ...medical, [e.target.name]: e.target.value });
  const handleMedicalSave = e => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setEditMedical(false);
      setSaving(false);
      setToast({ show: true, msg: "Medical profile updated!", type: "success" });
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
  const handleCalendarLink = () => setCalendar({ linked: true, provider: "Google" });

  // Export Health Data
  const handleExport = () => {
    setToast({ show: true, msg: "Exported as PDF! (Demo only)", type: "success" });
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
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-fade-in">
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
            ${activeTab === "medical" ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          onClick={() => handleTab("medical")}
          aria-label="Medical Profile"
        >Medical Profile</button>
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

      {/* --- Profile Tab --- */}
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
          {edit ? (
            <form onSubmit={handleProfileSave} className="space-y-5 animate-fade-in" aria-label="Edit Profile">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">Name</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">About Me</label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleProfileChange}
                  className="mt-1 px-4 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={2}
                  aria-label="About Me"
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
            <button
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition w-full animate-fade-in"
              onClick={() => setEdit(true)}
              aria-label="Edit Profile"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}

      {activeTab === "medical" && (
        <div className={tabAnim}>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="stethoscope">🩺</span> Medical Profile
          </h3>
          <form onSubmit={handleMedicalSave} className="space-y-3" aria-label="Medical Profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="age" value={medical.age} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" placeholder="Age" aria-label="Age" />
              <select name="gender" value={medical.gender} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" aria-label="Gender">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select name="bloodType" value={medical.bloodType} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" aria-label="Blood Type">
                <option value="">Blood Type</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
              <input name="allergies" value={medical.allergies} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" placeholder="Allergies" aria-label="Allergies" />
              <input name="chronic" value={medical.chronic} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" placeholder="Chronic Conditions" aria-label="Chronic Conditions" />
              <input name="meds" value={medical.meds} onChange={handleMedicalChange} className="rounded-lg border-gray-300 px-4 py-2 shadow-sm" placeholder="Medications" aria-label="Medications" />
            </div>
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={saving}
                aria-label="Save Medical Profile"
              >
                {saving && <span className="loader"></span>}
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                onClick={() => setEditMedical(false)}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
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
            <a href="/privacy" className="text-blue-600 underline text-sm"  rel="noopener noreferrer">
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
            Download your diagnosis or medical history as PDF for your records or to share with your doctor.
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

      {/* --- Payment & Subscription Shortcut --- */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-xl shadow p-4 border border-blue-100 animate-fade-in">
        <div>
          <div className="font-bold text-blue-700 text-lg flex items-center gap-2">
            <span role="img" aria-label="credit card">💳</span> Current Plan: <span className="text-blue-900">Premium</span>
          </div>
          <div className="text-sm text-blue-700 mt-1">
            Next billing: <b>2025-06-01</b>
          </div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <a href="/user/payments" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Manage Billing</a>
          <a href="/user/payments" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition">View Payments</a>
        </div>
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

export default USettings;