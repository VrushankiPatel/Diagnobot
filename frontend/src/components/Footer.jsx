import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      background: '#f6f7f9',
      color: '#888',
      textAlign: 'center',
      padding: '20px 0',
      fontSize: 15,
      borderTop: '1px solid #e5e7eb',
      marginTop: 40,
    }}>
      &copy; {new Date().getFullYear()} Diagnobot. All rights reserved.
    </footer>
  );
};

export default Footer;
