import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white rounded-lg shadow mt-10 mb-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors font-medium"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">
        <strong>Last updated:</strong> May 2025
      </p>
      <p className="mb-4 text-gray-700">
        DiagnoBot (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website and related services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">1. Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>
          <strong>Personal Information:</strong> Name, email address, phone number, and other registration details.
        </li>
        <li>
          <strong>Medical Data:</strong> Information you provide through symptom checkers, appointment forms, and health records.
        </li>
        <li>
          <strong>Usage Data:</strong> Log data, device information, and analytics about your interactions with DiagnoBot.
        </li>
        <li>
          <strong>Doctor Credentials:</strong> For healthcare providers, we collect license and verification documents.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>To provide and improve our AI-powered healthcare services.</li>
        <li>To personalize your experience and deliver relevant content.</li>
        <li>To facilitate appointments, consultations, and communication with healthcare providers.</li>
        <li>To generate and store medical reports for your reference.</li>
        <li>To ensure security, verify identities, and prevent fraud.</li>
        <li>For research and analytics to enhance our platform (using anonymized data).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">3. Data Sharing & Disclosure</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>
          We do <strong>not</strong> sell your personal information.
        </li>
        <li>
          Data may be shared with healthcare professionals you interact with, and with trusted third-party service providers (e.g., cloud hosting, analytics) under strict confidentiality.
        </li>
        <li>
          We may disclose information if required by law or to protect the rights and safety of users.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">4. Data Security</h2>
      <p className="mb-4 text-gray-700">
        We use industry-standard security measures (encryption, secure storage, access controls) to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">5. Your Rights & Choices</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>You can access, update, or delete your personal information at any time via your account settings.</li>
        <li>You may request a copy of your data or ask us to erase your account by contacting support@diagnobot.com.</li>
        <li>You can opt out of non-essential communications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">6. Children’s Privacy</h2>
      <p className="mb-4 text-gray-700">
        DiagnoBot is not intended for use by children under 16. We do not knowingly collect data from children. If you believe a child has provided us with personal information, please contact us.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">7. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-600">8. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@diagnobot.com" className="text-blue-600 underline">support@diagnobot.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;