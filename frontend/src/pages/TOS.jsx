import React from "react";
import { useNavigate } from "react-router-dom";

const TOS = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white rounded-lg shadow mt-10 mb-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors font-medium"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Terms of Service</h1>
      <p className="mb-4 text-gray-700">
        <strong>Last updated:</strong> May 2025
      </p>
      <p className="mb-4 text-gray-700">
        Welcome to DiagnoBot. By accessing or using our platform, you agree to be bound by these Terms of Service (“Terms”). Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">1. Use of the Platform</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>DiagnoBot provides AI-powered healthcare triage, diagnosis, and appointment management services.</li>
        <li>You must be at least 16 years old to use DiagnoBot.</li>
        <li>You agree to provide accurate and complete information during registration and use.</li>
        <li>Healthcare professionals must provide valid credentials for verification.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">2. User Responsibilities</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree not to misuse the platform, attempt unauthorized access, or disrupt services.</li>
        <li>You will not use DiagnoBot for unlawful, harmful, or fraudulent activities.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">3. Medical Disclaimer</h2>
      <p className="mb-4 text-gray-700">
        DiagnoBot provides AI-generated suggestions and triage. It does <strong>not</strong> replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns. In emergencies, call your local emergency number.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">4. Intellectual Property</h2>
      <p className="mb-4 text-gray-700">
        All content, trademarks, and software on DiagnoBot are the property of the DiagnoBot team or its licensors. You may not copy, modify, or distribute any part of the platform without permission.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">5. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700">
        DiagnoBot is provided “as is” without warranties of any kind. We are not liable for any damages resulting from your use of the platform, including but not limited to indirect, incidental, or consequential damages.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">6. Account Termination</h2>
      <p className="mb-4 text-gray-700">
        We reserve the right to suspend or terminate your account if you violate these Terms or misuse the platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">7. Changes to Terms</h2>
      <p className="mb-4 text-gray-700">
        We may update these Terms from time to time. Continued use of DiagnoBot after changes means you accept the new Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">8. Governing Law</h2>
      <p className="mb-4 text-gray-700">
        These Terms are governed by the laws of your jurisdiction. Any disputes will be resolved in accordance with applicable law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">9. Contact</h2>
      <p className="mb-4 text-gray-700">
        For questions about these Terms, contact us at <a href="mailto:support@diagnobot.com" className="text-blue-600 underline">support@diagnobot.com</a>.
      </p>
    </div>
  );
};

export default TOS;