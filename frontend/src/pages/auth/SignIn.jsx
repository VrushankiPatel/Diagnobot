import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Doctor fields
  const [docEmail, setDocEmail] = useState('');
  const [docName, setDocName] = useState('');
  const [docPhone, setDocPhone] = useState('');
  const [docPassword, setDocPassword] = useState('');
  const [docShowPwd, setDocShowPwd] = useState(false);
  const [docConfirmPassword, setDocConfirmPassword] = useState('');
  const [docShowConfirmPwd, setDocShowConfirmPwd] = useState(false);
  const [license, setLicense] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [licenseFile, setLicenseFile] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docError, setDocError] = useState('');

  const [agreed, setAgreed] = useState(false);
  const [docAgreed, setDocAgreed] = useState(false);

  const navigate = useNavigate();

  // Medical Partner fields
  const [partnerType, setPartnerType] = useState('hospital');
  const [partnerName, setPartnerName] = useState('');
  const [partnerContact, setPartnerContact] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerPassword, setPartnerPassword] = useState('');
  const [partnerShowPwd, setPartnerShowPwd] = useState(false);
  const [partnerConfirmPassword, setPartnerConfirmPassword] = useState('');
  const [partnerShowConfirmPwd, setPartnerShowConfirmPwd] = useState(false);
  const [partnerRegNo, setPartnerRegNo] = useState('');
  const [partnerLicenseFile, setPartnerLicenseFile] = useState(null);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerError, setPartnerError] = useState('');
  const [partnerAgreed, setPartnerAgreed] = useState(false);

  // Simulate registration (replace with real API call)
  const fakeRegister = (type = 'user') =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (type === 'user' &&
            email &&
            password &&
            password === confirmPassword &&
            name &&
            phone &&
            agreed) ||
          (type === 'doctor' &&
            docEmail &&
            docPassword &&
            docPassword === docConfirmPassword &&
            docName &&
            docPhone &&
            license &&
            specialty &&
            licenseFile &&
            docAgreed) ||
          (type === 'partner' &&
             partnerType &&
            partnerName &&
            partnerContact &&
            partnerEmail &&
            partnerPassword &&
            partnerPassword === partnerConfirmPassword &&
            partnerRegNo &&
            partnerLicenseFile &&
            partnerAgreed)
        ) {
         localStorage.setItem("userType", type);
          resolve();
        } else {
          reject(new Error("Please fill all fields correctly and agree to the Privacy Policy & TOS."));
        }
      }, 1500);
    });

  const handleUserSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await fakeRegister('user');
      setLoading(false);
      localStorage.setItem("userType", "user");
      navigate('/user/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleDoctorSignUp = async (e) => {
    e.preventDefault();
    setDocError('');
    setDocLoading(true);
    try {
      await fakeRegister('doctor');
      setDocLoading(false);
      localStorage.setItem("userType", "doctor");
      navigate('/doctor/dashboard');
    } catch (err) {
      setDocLoading(false);
      setDocError(err.message);
    }
  };

   const handlePartnerSignUp = async (e) => {
    e.preventDefault();
    setPartnerError('');
    setPartnerLoading(true);
    try {
      await fakeRegister('partner');
      setPartnerLoading(false);
      localStorage.setItem("userType", "partner");
      navigate('/medical/dashboard');
    } catch (err) {
      setPartnerLoading(false);
      setPartnerError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in py-12 px-2 sm:px-8">
      <div className="bg-white py-12 px-4 sm:px-8 rounded-2xl shadow-2xl min-w-[320px] w-full max-w-md flex flex-col gap-6 border border-blue-100 animate-slide-up">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-2 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition self-start"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

            <h2 className="m-0 font-extrabold text-3xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Sign Up Page
            </h2>

         {/* Toggle Tabs */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg font-semibold transition-colors duration-200 ${
              activeTab === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('user')}
            type="button"
          >
            User
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-colors duration-200 ${
              activeTab === 'doctor'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('doctor')}
            type="button"
          >
            Doctor
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold transition-colors duration-200 ${
              activeTab === 'partner'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('partner')}
            type="button"
          >
            Medical Partner
          </button>
        </div>

        {/* User Sign Up */}
        {activeTab === 'user' && (
          <form onSubmit={handleUserSignUp} className="flex flex-col gap-5">
            <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Create Account
            </h2>
            <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
              Sign up for a free DiagnoBot account
            </p>
            {error && (
              <div className="bg-red-50 text-red-700 rounded px-3 py-2 text-sm text-center animate-fade-in">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-100"
              disabled={loading}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-120"
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-150"
              disabled={loading}
            />
            <div className="relative animate-fade-in delay-200">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={showPwd ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
            <div className="relative animate-fade-in delay-250">
              <input
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setShowConfirmPwd((v) => !v)}
                tabIndex={-1}
                aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showConfirmPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm mt-2 animate-fade-in delay-300">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                required
                disabled={loading}
                className="accent-blue-600"
              />
              <span>
                I have read and agree to the{" "}
                <Link to="/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link> and{" "}
                <Link to="/terms" target="_blank" className="text-blue-600 underline">Terms of Service</Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-300 flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loader"></span> Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-400">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Log In
              </Link>
            </div>
          </form>
        )}

        {/* Doctor Sign Up */}
        {activeTab === 'doctor' && (
          <form onSubmit={handleDoctorSignUp} className="flex flex-col gap-5">
            <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Doctor Registration
            </h2>
            <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
              Register as a verified healthcare professional
            </p>
            {docError && (
              <div className="bg-red-50 text-red-700 rounded px-3 py-2 text-sm text-center animate-fade-in">
                {docError}
              </div>
            )}
            <input
              type="text"
              placeholder="Full Name"
              value={docName}
              onChange={e => setDocName(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-100"
              disabled={docLoading}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={docPhone}
              onChange={e => setDocPhone(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-120"
              disabled={docLoading}
            />
            <input
              type="email"
              placeholder="Doctor Email address"
              value={docEmail}
              onChange={e => setDocEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-150"
              disabled={docLoading}
            />
            <div className="relative animate-fade-in delay-200">
              <input
                type={docShowPwd ? "text" : "password"}
                placeholder="Password"
                value={docPassword}
                onChange={e => setDocPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={docLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setDocShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={docShowPwd ? "Hide password" : "Show password"}
                disabled={docLoading}
              >
                {docShowPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
            <div className="relative animate-fade-in delay-250">
              <input
                type={docShowConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                value={docConfirmPassword}
                onChange={e => setDocConfirmPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={docLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setDocShowConfirmPwd((v) => !v)}
                tabIndex={-1}
                aria-label={docShowConfirmPwd ? "Hide password" : "Show password"}
                disabled={docLoading}
              >
                {docShowConfirmPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
            <input
              type="text"
              placeholder="Medical License Number"
              value={license}
              onChange={e => setLicense(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-300"
              disabled={docLoading}
            />
            <input
              type="text"
              placeholder="Specialty (e.g. Cardiology)"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-350"
              disabled={docLoading}
            />
            {/* License Upload */}
            <div className="animate-fade-in delay-375">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Medical License <span className="text-red-500">*</span></label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={e => setLicenseFile(e.target.files[0])}
                required
                disabled={docLoading}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {licenseFile && (
                <div className="text-xs text-green-600 mt-1 animate-fade-in">
                  Selected: {licenseFile.name}
                </div>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm mt-2 animate-fade-in delay-400">
              <input
                type="checkbox"
                checked={docAgreed}
                onChange={e => setDocAgreed(e.target.checked)}
                required
                disabled={docLoading}
                className="accent-blue-600"
              />
              <span>
                I have read and agree to the{" "}
                <Link to="/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link> and{" "}
                <Link to="/terms" target="_blank" className="text-blue-600 underline">Terms of Service</Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={docLoading}
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-400 flex items-center justify-center ${
                docLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {docLoading ? (
                <span className="flex items-center gap-2">
                  <span className="loader"></span> Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}

            </button>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-450">
              Already have a doctor account?{' '}
              <Link to="/auth/login" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Log In
              </Link>
            </div>
          </form>
        )}
         {/* Medical Partner Login */}
        {activeTab === 'partner' && (
          <form onSubmit={handlePartnerSignUp} className="flex flex-col gap-5">
            <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Medical Partner Registration
            </h2>
            <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
              Register your medical organization or business
            </p>
            {partnerError && (
              <div className="bg-red-50 text-red-700 rounded px-3 py-2 text-sm text-center animate-fade-in">
                {partnerError}
              </div>
            )}
             <div className="animate-fade-in delay-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Type</label>
              <select
                value={partnerType}
                onChange={e => setPartnerType(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full"
                disabled={partnerLoading}
              >
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="lab">Diagnostic Lab</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Organization Name"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-120"
              disabled={partnerLoading}
            />
            <input
              type="tel"
              placeholder="Contact Phone Number"
              value={partnerContact}
              onChange={e => setPartnerContact(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-140"
              disabled={partnerLoading}
            />

            <input
              type="email"
              placeholder="Partner Email address"
              value={partnerEmail}
              onChange={e => setPartnerEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-100"
              disabled={partnerLoading}
            />
            <div className="relative animate-fade-in delay-150">
              <input
                type={partnerShowPwd ? "text" : "password"}
                placeholder="Password"
                value={partnerPassword}
                onChange={e => setPartnerPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={partnerLoading}
                 />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setPartnerShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={partnerShowPwd ? "Hide password" : "Show password"}
                disabled={partnerLoading}
              >
                {partnerShowPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
              <div className="relative animate-fade-in delay-200">
              <input
                type={partnerShowConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                value={partnerConfirmPassword}
                onChange={e => setPartnerConfirmPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
                disabled={partnerLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setPartnerShowConfirmPwd((v) => !v)}
                tabIndex={-1}
                aria-label={partnerShowConfirmPwd ? "Hide password" : "Show password"}
                disabled={partnerLoading}
              >
                {partnerShowConfirmPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.879.176-1.716.49-2.47" />
                  </svg>
                )}
              </button>
            </div>
               <input
              type="text"
              placeholder="Organization Registration Number"
              value={partnerRegNo}
              onChange={e => setPartnerRegNo(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-220"
              disabled={partnerLoading}
            />
            {/* License Upload */}
            <div className="animate-fade-in delay-240">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Organization License <span className="text-red-500">*</span></label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={e => setPartnerLicenseFile(e.target.files[0])}
                required
                disabled={partnerLoading}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {partnerLicenseFile && (
                <div className="text-xs text-green-600 mt-1 animate-fade-in">
                  Selected: {partnerLicenseFile.name}
                </div>
              )}
            </div>
             <label className="flex items-center gap-2 text-sm mt-2 animate-fade-in delay-300">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                required
                disabled={loading}
                className="accent-blue-600"
              />
              <span>
                I have read and agree to the{" "}
                <Link to="/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link> and{" "}
                <Link to="/terms" target="_blank" className="text-blue-600 underline">Terms of Service</Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={partnerLoading}
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-200 flex items-center justify-center ${
                partnerLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {partnerLoading ? (
                 <span className="flex items-center gap-2">
                  <span className="loader"></span> Logging In...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-450">
              Already have a medical account?{' '}
              <Link to="/auth/login" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Log In
              </Link>
            </div>
          </form>
        )}

      </div>
      {/* Animations & Loader */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0 }
          100% { opacity: 1 }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(.4,0,.2,1) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-120 { animation-delay: 0.12s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-250 { animation-delay: 0.25s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-375 { animation-delay: 0.375s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-450 { animation-delay: 0.45s; }
        .loader {
          border: 3px solid #e0e7ef;
          border-top: 3px solid #2563eb;
          border-radius: 50%;
          width: 1.2em;
          height: 1.2em;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default SignIn;