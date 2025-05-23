import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Dr. Jane Smith",
    role: "General Practitioner",
    text: "Diagnobot has transformed the way I manage patient records and appointments. The AI suggestions are spot on!",
    img: "https://cdn-icons-png.flaticon.com/512/65/65581.png"
  },
  {
    name: "Michael Lee",
    role: "Clinic Admin",
    text: "Automation features save us hours every week. The interface is intuitive and support is excellent.",
    img: "https://cdn-icons-png.flaticon.com/512/0/93.png"
  }
];

const steps = [
  {
    title: "Sign Up",
    desc: "Create your free Diagnobot account in seconds.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
    )
  },
  {
    title: "Add Patients & Data",
    desc: "Easily import or enter patient information and medical data.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2 2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z"/></svg>
    )
  },
  {
    title: "Let AI Assist",
    desc: "Diagnobot automates tasks and provides intelligent recommendations.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2V7a2 2 0 00-2-2h-7a2 2 0 00-2 2v7a2 2 0 002 2h1"/></svg>
    )
  }
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full py-16 px-6 md:px-12">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6 animate-fade-in-up">
          <div className="font-bold text-[22px] text-blue-700 mb-2 tracking-wide">Diagnobot</div>
          <h1 className="text-[2.5rem] md:text-[3rem] font-extrabold text-[#222] leading-tight">
            AI-Powered Healthcare Automation
          </h1>
          <p className="text-[#555] text-lg max-w-lg">
            Streamlined, intelligent solutions to manage healthcare efficiently. Automate workflows, empower providers, and improve patient outcomes with Diagnobot.
          </p>
          <div className="flex gap-4 mt-4">
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
            <button
              className="px-8 py-3 bg-white border border-blue-600 text-blue-700 rounded-lg text-lg font-semibold shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-blue-50 focus:outline-none"
              onClick={() => navigate('/auth/signup')}
            >
              Sign Up
            </button>
          </div>
          <div className="flex gap-4 mt-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-blue-600 underline">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-blue-600 underline">Terms of Service</Link>
          </div>
        </div>
        {/* Right */}
        <div className="flex-1 flex items-center justify-center mt-10 md:mt-0 animate-fade-in">
          <img
            src="/diagnobot home img.png"
            alt="Healthcare Illustration"
            className="max-w-full h-[320px] md:h-[380px] object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12 px-4 md:px-0">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-700">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-sm flex-1 transition-transform duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <div className="mb-3">{step.icon}</div>
                <div className="font-semibold text-lg mb-1">{step.title}</div>
                <div className="text-gray-500 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-700">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 flex-1 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-100" />
                <div className="italic text-gray-600 mb-2">&quot;{t.text}&quot;</div>
                <div className="font-semibold text-blue-700">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Tailwind CSS keyframes for fade-in animations (add to your global CSS if not using Tailwind plugins)
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px);}
  100% { opacity: 1; transform: translateY(0);}
}
@keyframes fade-in {
  0% { opacity: 0;}
  100% { opacity: 1;}
}
.animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both; }
.animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
`;
if (typeof document !== "undefined" && !document.getElementById("diagnobot-landing-animations")) {
  style.id = "diagnobot-landing-animations";
  document.head.appendChild(style);
}

export default Landing;
