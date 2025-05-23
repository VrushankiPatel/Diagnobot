import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-[100%] bg-white shadow-md px-10 h-16 flex items-center justify-between sticky top-0 z-10">
      <Link
        to="/"
        className="font-bold text-[22px] text-blue-600 no-underline tracking-wide"
      >
        Diagnobot
      </Link>
      <nav className="flex gap-6">
        <Link
          to="/"
          className={`no-underline font-medium text-base transition-colors duration-200 ${
            location.pathname === '/' ? 'text-blue-600' : 'text-gray-900'
          }`}
        >
          Home
        </Link>
        <Link
          to="/login"
          className={`no-underline font-medium text-base transition-colors duration-200 ${
            location.pathname === '/login' ? 'text-blue-600' : 'text-gray-900'
          }`}
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
