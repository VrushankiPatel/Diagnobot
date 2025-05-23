import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add registration logic here
    navigate('/login');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f6f7f9]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] flex flex-col gap-5"
      >
        <h2 className="m-0 font-bold text-2xl text-[#222]">Sign Up</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2.5 rounded-md border border-gray-300 text-base"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2.5 rounded-md border border-gray-300 text-base"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="p-2.5 rounded-md border border-gray-300 text-base"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-base font-semibold py-2.5 cursor-pointer mt-2"
        >
          Sign Up
        </button>
        <div className="text-[15px] text-[#666] mt-2">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-700 no-underline font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
