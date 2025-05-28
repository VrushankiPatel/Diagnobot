import React, { useState } from 'react';

// --- Mock Data ---
const mockPatientReports = [
  {
    id: 1,
    patient: 'Chocolate Parfait',
    date: '2025-05-20',
    type: 'General Checkup',
    summary: 'No major issues. Blood pressure and cholesterol normal.',
    file: 'checkup-2025-05-20.pdf',
    notes: 'Patient is healthy. Continue current lifestyle.',
    doctorNotes: '',
    status: 'Reviewed',
    tags: ['General'],
  },
  {
    id: 2,
    patient: 'Mary Smith',
    date: '2025-05-18',
    type: 'Blood Test',
    summary: 'Slightly elevated glucose. Advised to monitor diet.',
    file: 'bloodtest-2025-05-18.pdf',
    notes: 'Monitor glucose, retest in 3 months.',
    doctorNotes: '',
    status: 'New',
    tags: ['Blood Test'],
  },
  {
    id: 3,
    patient: 'Alex Brown',
    date: '2025-05-15',
    type: 'X-ray',
    summary: 'No fractures detected.',
    file: 'xray-2025-05-15.jpg',
    notes: 'Normal X-ray.',
    doctorNotes: '',
    status: 'Reviewed',
    tags: ['X-ray'],
  },
];

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
  'X-ray': (
    <span className="bg-yellow-100 text-yellow-700 rounded-full p-2">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <path d="M8 8h8M8 12h8M8 16h8" />
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

const statusBadge = {
  'Reviewed': 'bg-green-100 text-green-700',
  'New': 'bg-yellow-100 text-yellow-700',
  'default': 'bg-gray-100 text-gray-500',
};

const tagColors = {
  'X-ray': 'bg-yellow-100 text-yellow-700',
  'Blood Test': 'bg-red-100 text-red-700',
  'General': 'bg-blue-100 text-blue-700',
  'Other': 'bg-gray-100 text-gray-700',
};

function DReports() {
  const [reports, setReports] = useState(mockPatientReports);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [modalReport, setModalReport] = useState(null);
  const [doctorNotesDraft, setDoctorNotesDraft] = useState('');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [uploadFile, setUploadFile] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  

  // --- Filtering ---
  const filteredReports = reports.filter(r =>
    (filterType === 'All' || r.type === filterType) &&
    (
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      (r.tags && r.tags.join(' ').toLowerCase().includes(search.toLowerCase())) ||
      r.date.includes(search)
    ))
    .sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
  );

  // --- Handlers ---
  const handleDownload = (file) => {
    setToast({ show: true, msg: `Downloading ${file}...`, type: 'success' });
    // Real download logic here
  };

  const handlePrint = (file) => {
    setToast({ show: true, msg: `Printing ${file}...`, type: 'success' });
    // Real print logic here
  };

  const handleUploadClick = () => {
    document.getElementById('external-report-upload').click();
  };
  
   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setToast({ show: true, msg: `Selected file: ${file.name}`, type: 'success' });
      // Here you can add logic to actually upload or process the file
    }
  };

  const handleSaveDoctorNote = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, doctorNotes: doctorNotesDraft } : r));
    setModalReport({ ...modalReport, doctorNotes: doctorNotesDraft });
    setToast({ show: true, msg: 'Doctor note saved!', type: 'success' });
  };

  const closeToast = () => setToast({ show: false, msg: '', type: 'success' });

  // --- UI ---
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-2xl p-4 sm:p-8 animate-fade-in relative">
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

      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center animate-fade-in-down">Patient Reports</h2>
      <p className="text-center text-gray-500 mb-6">View, review, and manage patient diagnosis results, treatment plans, and medical documents.</p>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
       {/* Hidden file input */}
        <input
          id="external-report-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
        <button
          className="px-1 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
          onClick={handleUploadClick}
          aria-label="Add External Report"
        >
          <span className="mr-1">📎</span> Add External Report
        </button>
        <input
          type="text"
          placeholder="Search by patient, type, or tag..."
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search reports"
        />
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-auto"
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
            className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-auto"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            aria-label="Sort by date"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
      </div>

      {/* Reports List */}
      <div className="mb-8">
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400 py-10 animate-fade-in-up">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="4 2"/>
              <path d="M9 12h6M9 16h6" />
            </svg>
            <div>No patient reports found.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredReports.map((report, idx) => (
              <li
                key={report.id}
                className={`border rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 animate-fade-in`}
                style={{ animationDelay: `${idx * 60}ms` }}
                tabIndex={0}
                aria-label={`Report: ${report.type} for ${report.patient} on ${report.date}`}
                onClick={() => { setModalReport(report); setDoctorNotesDraft(report.doctorNotes || ''); }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {typeIcons[report.type] || typeIcons.default}
                  <div className="min-w-0">
                    <div className="font-semibold text-blue-800 flex items-center gap-2 flex-wrap">
                      {report.type}
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs">{report.patient}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${statusBadge[report.status] || statusBadge.default}`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {report.tags && report.tags.map(tag => (
                        <span key={tag} className={`px-2 py-0.5 rounded-full text-xs ${tagColors[tag] || tagColors.Other}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{report.date}</div>
                    <div className="text-gray-700 mt-1 truncate">{report.summary}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
                    onClick={e => { e.stopPropagation(); handleDownload(report.file); }}
                    aria-label={`Download ${report.type} report`}
                  >
                    <span className="inline-block align-middle mr-1">⬇️</span> Download
                  </button>
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition focus:ring-2 focus:ring-green-400"
                    onClick={e => { e.stopPropagation(); handlePrint(report.file); window.print(); }}
                    aria-label={`Print ${report.type} report`}
                  >
                    <span className="inline-block align-middle mr-1">🖨️</span> Print
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Report Modal */}
      {modalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  animate-fade-in">
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
            <div className="flex flex-wrap gap-1 mb-2">
              {modalReport.tags && modalReport.tags.map(tag => (
                <span key={tag} className={`px-2 py-0.5 rounded-full text-xs ${tagColors[tag] || tagColors.Other}`}>{tag}</span>
              ))}
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs">{modalReport.patient}</span>
            </div>
            <div className="mb-2 text-gray-700">{modalReport.summary}</div>
            <div className="mb-2 text-sm text-blue-700">
              <span className="font-medium">Patient:</span> {modalReport.patient}
            </div>
            <div className="mb-2 text-sm">
              <span className="font-medium">Status:</span> <span className={`px-2 py-0.5 rounded-full ${statusBadge[modalReport.status] || statusBadge.default}`}>{modalReport.status}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">File:</span> <span className="text-blue-600 underline cursor-pointer" onClick={() => handleDownload(modalReport.file)}>{modalReport.file}</span>
              <span className="ml-2 text-gray-400">(PDF/Image)</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Patient Notes:</span>
              <div className="text-gray-700 mt-1">{modalReport.notes || <span className="text-gray-400">No notes</span>}</div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor's Notes:</label>
              <textarea
                className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm"
                rows={2}
                value={doctorNotesDraft}
                onChange={e => setDoctorNotesDraft(e.target.value)}
                placeholder="Add your notes here..."
              />
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleSaveDoctorNote(modalReport.id)}
              >
                Save Note
              </button>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
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
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .max-w-4xl { max-width: 100vw !important; }
          .p-8, .p-4 { padding: 1rem !important; }
          .flex-row { flex-direction: column !important; }
          .gap-4 { gap: 1rem !important; }
        }
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
        button:focus { outline: none; box-shadow: 0 0 0 2px #3b82f6; }
      `}</style>
    </div>
  );
}

export default DReports;