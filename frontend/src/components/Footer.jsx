import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-400 text-center py-5 text-[15px] border-t border-gray-200 mt-10">
      &copy; {new Date().getFullYear()} Diagnobot. All rights reserved.
    </footer>
  );
};

export default Footer;
