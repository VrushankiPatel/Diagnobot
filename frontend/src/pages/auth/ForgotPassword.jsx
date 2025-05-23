import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add password reset logic here (API call)
    setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl min-w-[340px] flex flex-col gap-6 border border-blue-100 animate-slide-up"
      >
        <h2 className="m-0 font-extrabold text-2xl text-blue-700 text-center tracking-wide animate-fade-in-down">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center text-sm mb-2 animate-fade-in-down delay-100">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        {!submitted ? (
          <>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-200 text-base focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none animate-fade-in delay-150"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2 shadow-md hover:scale-105 transition-transform duration-200 animate-fade-in delay-200"
            >
              Send Reset Link
            </button>
            <div className="text-[15px] text-[#666] mt-2 text-center animate-fade-in delay-300">
              Remembered your password?{" "}
              <Link to="/auth/login" className="text-blue-700 no-underline font-semibold hover:underline transition-colors">
                Sign In
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center animate-fade-in delay-200">
            <div className="text-green-600 font-semibold mb-2">Check your email!</div>
            <div className="text-gray-500 text-sm mb-4">
              If an account exists for <span className="font-medium">{email}</span>, you’ll receive a password reset link shortly.
            </div>
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Login
            </button>
          </div>
        )}
      </form>
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
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default ForgotPassword;