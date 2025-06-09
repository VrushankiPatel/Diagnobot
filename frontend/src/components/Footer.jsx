import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-10 pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Brand & Description */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="font-bold text-blue-600 text-xl mb-2">Diagnobot</div>
          <p className="text-gray-500 text-sm max-w-xs">
            Diagnobot leverages AI to streamline healthcare management, automate workflows, and empower providers and patients with intelligent solutions.
          </p>
        </div>
        {/* Navigation */}
        <div className="flex-1 flex flex-col md:flex-row gap-8">
          <div>
            <div className="font-semibold text-gray-700 mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-500 hover:text-blue-600 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-2">Resources</div>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Support</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Contact & Social */}
        <div className="flex-1">
          <div className="font-semibold text-gray-700 mb-2">Contact</div>
          <p className="text-gray-500 text-sm mb-2">Email: <a href="mailto:support@diagnobot.com" className="text-blue-600 hover:underline">support@diagnobot.com</a></p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-500 transition-colors">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.935 9.935 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-700 transition-colors">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Diagnobot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
