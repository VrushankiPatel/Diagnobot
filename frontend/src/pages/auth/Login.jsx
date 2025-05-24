import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  // Doctor fields
  const [docEmail, setDocEmail] = useState('');
  const [docPassword, setDocPassword] = useState('');
  const [docShowPwd, setDocShowPwd] = useState(false);
  const [license, setLicense] = useState('');
  const [specialty, setSpecialty] = useState('');

  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    // Placeholder: Add user authentication logic here
    navigate('/');
  };

  const handleDoctorLogin = (e) => {
    e.preventDefault();
    // Placeholder: Add doctor authentication logic here
    navigate('/');
  };

  return (
   <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in py-12 px-8">
      <div className="bg-white py-12 px-8 rounded-2xl shadow-2xl min-w-[340px] w-full max-w-md flex flex-col gap-6 border border-blue-100 animate-slide-up">
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
            User Login
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold transition-colors duration-200 ${
              activeTab === 'doctor'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('doctor')}
            type="button"
          >
            Doctor Login
          </button>
        </div>

        {/* User Login */}
        {activeTab === 'user' && (
          <form onSubmit={handleUserLogin} className="flex flex-col gap-5">
            <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
              Log in to your DiagnoBot account
            </p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-150"
            />
            <div className="relative animate-fade-in delay-200">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={showPwd ? "Hide password" : "Show password"}
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
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-300"
            >
              Log In
            </button>
            <div className="flex justify-between items-center mt-2 text-sm animate-fade-in delay-400">
              <Link to="/auth/forgot-password" className="text-blue-600 hover:underline font-medium transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-500">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Sign Up
              </Link>
            </div>
          </form>
        )}

        {/* Doctor Login */}
        {activeTab === 'doctor' && (
          <form onSubmit={handleDoctorLogin} className="flex flex-col gap-5">
            <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
              Doctor Login
            </h2>
            <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
              Log in as a verified healthcare professional
            </p>
            <input
              type="email"
              placeholder="Doctor Email address"
              value={docEmail}
              onChange={e => setDocEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-150"
            />
            <div className="relative animate-fade-in delay-200">
              <input
                type={docShowPwd ? "text" : "password"}
                placeholder="Password"
                value={docPassword}
                onChange={e => setDocPassword(e.target.value)}
                required
                className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setDocShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={docShowPwd ? "Hide password" : "Show password"}
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
            <input
              type="text"
              placeholder="Medical License Number"
              value={license}
              onChange={e => setLicense(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-250"
            />
            <input
              type="text"
              placeholder="Specialty (e.g. Cardiology)"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-300"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-350"
            >
              Log In
            </button>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-400">
              Don't have a doctor account?{' '}
              <Link to="/auth/signup" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Sign Up
              </Link>
            </div>
          </form>
        )}
      </div>
      {/* Animations */}
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
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-250 { animation-delay: 0.25s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default Login;
