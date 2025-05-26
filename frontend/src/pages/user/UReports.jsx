import React, { useState } from 'react';

const mockReports = [
  {
    id: 1,
    date: '2025-05-20',
    type: 'General Checkup',
    summary: 'No major issues. Blood pressure and cholesterol normal.',
    file: 'checkup-2025-05-20.pdf',
  },
  {
    id: 2,
    date: '2025-04-10',
    type: 'Blood Test',
    summary: 'Slightly elevated glucose. Advised to monitor diet.',
    file: 'bloodtest-2025-04-10.pdf',
  },
];

const mockSymptoms = [
  {
    id: 1,
    date: '2025-05-18',
    symptoms: 'Headache, mild fever',
    diagnosis: 'Likely viral infection. Advised rest and fluids.',
  },
  {
    id: 2,
    date: '2025-03-22',
    symptoms: 'Cough, sore throat',
    diagnosis: 'Mild cold. No medication required.',
  },
];

function UReports() {
  const [reports] = useState(mockReports);
  const [symptoms] = useState(mockSymptoms);

  const handleDownload = (file) => {
    // Replace with real download logic
    alert(`Downloading ${file}...`);
  };

  const handleShare = (file) => {
    // Replace with real share logic
    alert(`Sharing ${file}...`);
  };

  const handlePrint = (file) => {
    // Replace with real print logic
    alert(`Printing ${file}...`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Medical Reports</h2>
      <div className="mb-8">
        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
          <span role="img" aria-label="file">📄</span> Auto-generated Reports
        </h3>
        {reports.length === 0 ? (
          <div className="text-gray-500">No reports available yet.</div>
        ) : (
          <ul className="space-y-4">
            {reports.map((report) => (
              <li key={report.id} className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="font-semibold text-blue-800">{report.type}</div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                  <div className="text-gray-700 mt-1">{report.summary}</div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleDownload(report.file)}
                  >
                    Download
                  </button>
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={() => handlePrint(report.file)}
                  >
                    Print
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    onClick={() => handleShare(report.file)}
                  >
                    Share
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-8 border-blue-100" />

      <div>
        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
          <span role="img" aria-label="history">🩺</span> Symptom History & Previous Diagnoses
        </h3>
        {symptoms.length === 0 ? (
          <div className="text-gray-500">No symptom history yet.</div>
        ) : (
          <ul className="space-y-4">
            {symptoms.map((entry) => (
              <li key={entry.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-blue-800">{entry.date}</div>
                    <div className="text-gray-700 mt-1">
                      <span className="font-medium">Symptoms:</span> {entry.symptoms}
                    </div>
                    <div className="text-gray-700 mt-1">
                      <span className="font-medium">Diagnosis:</span> {entry.diagnosis}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UReports;