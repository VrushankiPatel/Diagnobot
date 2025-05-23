import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f6f7f9] py-10">
      {/* Left Section */}
      <div className="flex-1 max-w-[500px] flex flex-col justify-center gap-6 pl-10">
        <div className="font-bold text-[22px] text-[#222] mb-4">Diagnobot</div>
        <h1 className="text-[36px] font-bold text-[#222] m-0">
          AI-Powered Healthcare Automation
        </h1>
        <p className="text-[#666] text-lg m-0">
          Streamlined, intelligent solutions to manage healthcare efficiently.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-lg font-semibold cursor-pointer shadow-md w-fit"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center min-w-[320px] pr-10">
        <img
          src={'/diagnobot home img.png'}
          alt="Healthcare Illustration"
          className="max-w-full h-[320px] object-contain rounded-xl shadow-lg"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
        />
      </div>
    </div>
  );
};

export default Landing;
