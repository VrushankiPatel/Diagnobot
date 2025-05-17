import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add authentication logic here
    navigate('/');
  };

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f7f9' }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        minWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: '#222' }}>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 16 }}
        />
        <button type="submit" style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 17,
          fontWeight: 600,
          padding: '10px 0',
          cursor: 'pointer',
          marginTop: 8,
        }}>
          Sign In
        </button>
        <div style={{ fontSize: 15, color: '#666', marginTop: 8 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
