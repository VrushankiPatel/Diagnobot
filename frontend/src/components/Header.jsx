import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header style={{
      width: '90%',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      padding: '0 40px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Link to="/" style={{
        fontWeight: 700,
        fontSize: 22,
        color: '#2563eb',
        textDecoration: 'none',
        letterSpacing: 1,
      }}>
        Diagnobot
      </Link>
      <nav style={{ display: 'flex', gap: 24 }}>
        <Link
          to="/"
          style={{
            color: location.pathname === '/' ? '#2563eb' : '#222',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 16,
            transition: 'color 0.2s',
          }}
        >
          Home
        </Link>
        <Link
          to="/login"
          style={{
            color: location.pathname === '/login' ? '#2563eb' : '#222',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 16,
            transition: 'color 0.2s',
          }}
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
