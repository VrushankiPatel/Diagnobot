import React, { useState } from 'react';

// --- Mock Data ---
const mockReports = [
  {
    id: 1,
    date: '2025-05-20',
    type: 'General Checkup',
    summary: 'No major issues. Blood pressure and cholesterol normal.',
    file: 'checkup-2025-05-20.pdf',
    doctor: 'Dr. Smith',
    doctorComment: 'Patient is healthy. Continue current lifestyle.',
    notes: '',
    status: 'Reviewed',
  },
  {
    id: 2,
    date: '2025-04-10',
    type: 'Blood Test',
    summary: 'Slightly elevated glucose. Advised to monitor diet.',
    file: 'bloodtest-2025-04-10.pdf',
    doctor: 'Dr. Lee',
    doctorComment: 'Monitor glucose, retest in 3 months.',
    notes: '',
    status: 'New',
  },
];

const mockSymptoms = [
  {
    id: 1,
    date: '2025-05-18',
    symptoms: 'Headache, mild fever',
    diagnosis: 'Likely viral infection. Advised rest and fluids.',
    notes: '',
  },
  {
    id: 2,
    date: '2025-03-22',
    symptoms: 'Cough, sore throat',
    diagnosis: 'Mild cold. No medication required.',
    notes: '',
  },
];

// --- Icons for report types ---
const typeIcons = {
  'General Checkup': (
    <span className="bg-blue-100 text-blue-700 rounded-full p-2">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  ),
  'Blood Test': (
    <span className="bg-red-100 text-red-700 rounded-full p-2">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2v20M5 7l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  ),
  default: (
    <span className="bg-gray-100 text-gray-500 rounded-full p-2">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
      </svg>
    </span>
  ),
};

// --- Badge colors for status ---
const statusBadge = {
  'Reviewed': 'bg-green-100 text-green-700',
  'New': 'bg-yellow-100 text-yellow-700',
  'default': 'bg-gray-100 text-gray-500',
};

function UReports() {
  // --- State ---
  const [reports, setReports] = useState(mockReports);
  const [symptoms, setSymptoms] = useState(mockSymptoms);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [modalReport, setModalReport] = useState(null);
  const [modalSymptom, setModalSymptom] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [notesDraft, setNotesDraft] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // --- Filtering, Searching, Sorting ---
  const filteredReports = reports
    .filter(r =>
      (filterType === 'All' || r.type === filterType) &&
      (r.type.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase()) ||
        r.date.includes(search))
    )
    .sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const paginatedReports = filteredReports.slice(0, page * pageSize);

  // --- Handlers ---
  const handleDownload = (file) => {
    setToast({ show: true, msg: `Downloading ${file}...`, type: 'success' });
    // Real download logic here
  };

  const handleShare = (file) => {
    setToast({ show: true, msg: `Sharing ${file}...`, type: 'success' });
    // Real share logic here
  };

  const handlePrint = (file) => {
    setToast({ show: true, msg: `Printing ${file}...`, type: 'success' });
    // Real print logic here
  };

  const handleExport = (type) => {
    setToast({ show: true, msg: `Exporting ${type} as PDF...`, type: 'success' });
    // Real export logic here
  };

  const handleAddNote = (id, type) => {
    if (type === 'report') {
      setReports(reports.map(r => r.id === id ? { ...r, notes: notesDraft } : r));
      setModalReport({ ...modalReport, notes: notesDraft });
    } else {
      setSymptoms(symptoms.map(s => s.id === id ? { ...s, notes: notesDraft } : s));
      setModalSymptom({ ...modalSymptom, notes: notesDraft });
    }
    setToast({ show: true, msg: 'Note saved!', type: 'success' });
  };

  const closeToast = () => setToast({ show: false, msg: '', type: 'success' });

  // --- UI ---
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in relative">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold animate-fade-in-up
            ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          role="alert"
          aria-live="polite"
        >
          {toast.msg}
          <button className="ml-4 text-white/70 hover:text-white" onClick={closeToast} aria-label="Close notification">×</button>
        </div>
      )}

      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center animate-fade-in-down">Medical Reports</h2>

      {/* Search, Filter, Sort, Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search reports..."
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full md:w-1/2"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search reports"
        />
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            aria-label="Filter by report type"
          >
            <option value="All">All Types</option>
            {[...new Set(reports.map(r => r.type))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            aria-label="Sort by date"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => handleExport('reports')}
            aria-label="Export all reports"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="mb-8">
        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
          <span role="img" aria-label="file">📄</span> Auto-generated Reports
        </h3>
        {paginatedReports.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400 py-10 animate-fade-in-up">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="4 2"/>
              <path d="M9 12h6M9 16h6" />
            </svg>
            <div>No reports yet. Your reports will appear here after your visits.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {paginatedReports.map((report, idx) => (
              <li
                key={report.id}
                className={`border rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 animate-fade-in`}
                style={{ animationDelay: `${idx * 60}ms` }}
                tabIndex={0}
                aria-label={`Report: ${report.type} on ${report.date}`}
                onClick={() => setModalReport(report)}
              >
                <div className="flex items-center gap-3">
                  {typeIcons[report.type] || typeIcons.default}
                  <div>
                    <div className="font-semibold text-blue-800 flex items-center gap-2">
                      {report.type}
                      <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${statusBadge[report.status] || statusBadge.default}`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{report.date}</div>
                    <div className="text-gray-700 mt-1">{report.summary}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
                    onClick={e => { e.stopPropagation(); handleDownload(report.file); }}
                    aria-label={`Download ${report.type} report`}
                  >
                    <span className="inline-block align-middle mr-1">⬇️</span> Download
                  </button>
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition focus:ring-2 focus:ring-green-400"
                    onClick={e => { e.stopPropagation(); handlePrint(report.file); }}
                    aria-label={`Print ${report.type} report`}
                  >
                    <span className="inline-block align-middle mr-1">🖨️</span> Print
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition focus:ring-2 focus:ring-blue-200"
                    onClick={e => { e.stopPropagation(); handleShare(report.file); }}
                    aria-label={`Share ${report.type} report`}
                  >
                    <span className="inline-block align-middle mr-1">🔗</span> Share
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Pagination/Infinite Scroll */}
        {paginatedReports.length < filteredReports.length && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
              onClick={() => setPage(page + 1)}
              aria-label="Load more reports"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {modalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-lg w-full relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setModalReport(null)}
              aria-label="Close"
            >×</button>
            <div className="flex items-center gap-3 mb-2">
              {typeIcons[modalReport.type] || typeIcons.default}
              <div>
                <div className="font-semibold text-blue-800">{modalReport.type}</div>
                <div className="text-xs text-gray-500">{modalReport.date}</div>
              </div>
            </div>
            <div className="mb-2 text-gray-700">{modalReport.summary}</div>
            <div className="mb-2 text-sm text-blue-700">
              <span className="font-medium">Doctor:</span> {modalReport.doctor}
            </div>
            <div className="mb-2 text-sm text-blue-700">
              <span className="font-medium">Doctor's Comment:</span> {modalReport.doctorComment}
            </div>
            <div className="mb-2 text-sm">
              <span className="font-medium">Status:</span> <span className={`px-2 py-0.5 rounded-full ${statusBadge[modalReport.status] || statusBadge.default}`}>{modalReport.status}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">File:</span> <span className="text-blue-600 underline cursor-pointer" onClick={() => handleDownload(modalReport.file)}>{modalReport.file}</span>
              <span className="ml-2 text-gray-400">(PDF)</span>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Notes:</label>
              <textarea
                className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                rows={2}
                value={notesDraft}
                onChange={e => setNotesDraft(e.target.value)}
                placeholder="Add your notes here..."
              />
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleAddNote(modalReport.id, 'report')}
              >
                Save Note
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleDownload(modalReport.file)}
              >
                Download
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => handlePrint(modalReport.file)}
              >
                Print
              </button>
              <button
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                onClick={() => handleShare(modalReport.file)}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="my-8 border-blue-100" />

      {/* Symptom History */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="history">🩺</span> Symptom History & Previous Diagnoses
          </h3>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => handleExport('symptoms')}
            aria-label="Export symptom history"
          >
            Export PDF
          </button>
        </div>
        {symptoms.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400 py-10 animate-fade-in-up">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="4 2"/>
              <path d="M9 12h6M9 16h6" />
            </svg>
            <div>No symptom history yet.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {symptoms.map((entry, idx) => (
              <li
                key={entry.id}
                className="border rounded-xl p-4 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-100 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${idx * 60}ms` }}
                tabIndex={0}
                aria-label={`Symptom entry on ${entry.date}`}
                onClick={() => setModalSymptom(entry)}
              >
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
                  {entry.notes && (
                    <div className="text-xs text-blue-500 mt-2 md:mt-0">
                      <span className="font-medium">Note:</span> {entry.notes}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Symptom Modal */}
      {modalSymptom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-lg w-full relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setModalSymptom(null)}
              aria-label="Close"
            >×</button>
            <div className="font-semibold text-blue-800 mb-1">{modalSymptom.date}</div>
            <div className="mb-2 text-gray-700">
              <span className="font-medium">Symptoms:</span> {modalSymptom.symptoms}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-medium">Diagnosis:</span> {modalSymptom.diagnosis}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Notes:</label>
              <textarea
                className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                rows={2}
                value={notesDraft}
                onChange={e => setNotesDraft(e.target.value)}
                placeholder="Add your notes here..."
              />
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleAddNote(modalSymptom.id, 'symptom')}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline/Chart (Symptom History) */}
      {symptoms.length > 1 && (
        <div className="mt-10">
          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <span role="img" aria-label="timeline">📈</span> Symptom Timeline
          </h4>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-6">
              {symptoms.map((entry, idx) => (
                <div key={entry.id} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                  <div className="w-4 h-4 rounded-full bg-blue-500 mb-1"></div>
                  <div className="text-xs text-blue-700 font-semibold">{entry.date}</div>
                  <div className="text-xs text-gray-500 text-center max-w-[120px]">{entry.symptoms}</div>
                  {idx < symptoms.length - 1 && (
                    <div className="w-12 h-1 bg-blue-200 my-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animations & Styles */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        /* Button focus ring for accessibility */
        button:focus { outline: none; box-shadow: 0 0 0 2px #3b82f6; }
      `}</style>
    </div>
  );
}

export default UReports;