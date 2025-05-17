import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f6f7f9',
      padding: '40px 0',
    }}>
      {/* Left Section */}
      <div style={{
        flex: 1,
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        paddingLeft: 40,
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 16 }}>Diagnobot</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, color: '#222' }}>
          AI-Powered Healthcare Automation
        </h1>
        <p style={{ color: '#666', fontSize: 18, margin: 0 }}>
          Streamlined, intelligent solutions to manage healthcare efficiently.
        </p>
        <button
          style={{
            marginTop: 24,
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
            width: 'fit-content',
          }}
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
      {/* Right Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 320,
        paddingRight: 40,
      }}>
        <img
          src={'/AI Healthcare App UI Designs.png'}
          alt="Healthcare Illustration"
          style={{ maxWidth: '100%', height: 320, objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
        />
      </div>
    </div>
  );
};

export default Landing;
