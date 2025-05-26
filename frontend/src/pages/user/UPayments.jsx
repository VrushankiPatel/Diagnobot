import React, { useState } from "react";

// Mock Data
const mockHistory = [
  {
    id: "pay_001",
    date: "2025-05-01",
    amount: 49.99,
    method: "Visa **** 4242",
    status: "Completed",
    desc: "Premium Access (1 month)",
    items: [
      { label: "Premium Access", price: 49.99 }
    ],
    type: "Subscription"
  },
  {
    id: "pay_002",
    date: "2025-04-15",
    amount: 19.99,
    method: "Mastercard **** 1234",
    status: "Completed",
    desc: "Doctor Appointment",
    items: [
      { label: "Consultation", price: 19.99 }
    ],
    type: "Consultation"
  },
  {
    id: "pay_003",
    date: "2025-05-10",
    amount: 25.00,
    method: "Visa **** 4242",
    status: "Pending",
    desc: "Pharmacy Order",
    items: [
      { label: "Medication", price: 25.00 }
    ],
    type: "Pharmacy"
  },
  {
    id: "pay_004",
    date: "2025-05-12",
    amount: 30.00,
    method: "Visa **** 4242",
    status: "Unpaid",
    desc: "Doctor Appointment",
    items: [
      { label: "Consultation", price: 30.00 }
    ],
    type: "Consultation",
    due: "2025-05-15"
  }
];

const mockMethods = [
  { type: "Visa", last4: "4242", exp: "12/27", primary: true },
  { type: "Mastercard", last4: "1234", exp: "09/26", primary: false }
];

const planInfo = {
  plan: "Premium",
  nextBilling: "2025-06-01",
  features: [
    "Unlimited consultations",
    "Priority support",
    "Pharmacy discounts"
  ]
};

const paymentLogos = {
  Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  Mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  Amex: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDv9uqUHNQfTOwyYVKEqM6XP1O38yP8qobFPeRy2oo6afVdC7Ha9Va9Ukjxbj7kFhJBc&usqp=CAU"
};

const discountCodes = [
  { code: "FIRSTVISIT10", desc: "10% off your first payment" },
  { code: "HEALTHY2025", desc: "5% off all consultations" }
];

function UPayments() {
  const [history] = useState(mockHistory);
  const [methods, setMethods] = useState(mockMethods);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [newCard, setNewCard] = useState({ type: "", number: "", exp: "", cvc: "" });
  const [editCard, setEditCard] = useState({ type: "", last4: "", exp: "" });
  const [payAmount, setPayAmount] = useState("");
  const [payDesc, setPayDesc] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [discount, setDiscount] = useState("");
  const [discountApplied, setDiscountApplied] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const [search, setSearch] = useState("");
  const [showReceipt, setShowReceipt] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [insurance, setInsurance] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [notification, setNotification] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // Filtered history
  const filteredHistory = history.filter(h => {
    let ok = true;
    if (filterType && h.type !== filterType) ok = false;
    if (filterStatus && h.status !== filterStatus) ok = false;
    if (filterStart && h.date < filterStart) ok = false;
    if (filterEnd && h.date > filterEnd) ok = false;
    if (search && !h.desc.toLowerCase().includes(search.toLowerCase())) ok = false;
    return ok;
  });

  // Spending summary (simple)
  const monthlySpending = history
    .filter(h => h.status === "Completed" && h.date.startsWith("2025-05"))
    .reduce((sum, h) => sum + h.amount, 0);

  // Handle Add Card
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.type || !newCard.number || !newCard.exp || !newCard.cvc) return;
    setMethods([
      ...methods,
      {
        type: newCard.type,
        last4: newCard.number.slice(-4),
        exp: newCard.exp,
        primary: false
      }
    ]);
    setShowAdd(false);
    setNewCard({ type: "", number: "", exp: "", cvc: "" });
    setNotification("Card added successfully!");
    setTimeout(() => setNotification(""), 2000);
  };

  // Handle Edit Card
  const handleEditCard = (e) => {
    e.preventDefault();
    setMethods(methods.map((m, i) =>
      i === showEdit ? { ...m, ...editCard } : m
    ));
    setShowEdit(null);
    setNotification("Card updated!");
    setTimeout(() => setNotification(""), 2000);
  };

  // Handle Delete Card
  const handleDeleteCard = () => {
    setMethods(methods.filter((_, i) => i !== showDelete));
    setShowDelete(null);
    setNotification("Card removed.");
    setTimeout(() => setNotification(""), 2000);
  };

  // Set Primary Card
  const handleSetPrimary = (idx) => {
    setMethods((prev) =>
      prev.map((m, i) => ({ ...m, primary: i === idx }))
    );
    setNotification("Primary card updated.");
    setTimeout(() => setNotification(""), 2000);
  };

  // Handle Discount
  const handleDiscount = (e) => {
    e.preventDefault();
    const found = discountCodes.find(d => d.code === discount.trim().toUpperCase());
    if (found) {
      setDiscountApplied(found);
      setNotification("Discount applied!");
    } else {
      setDiscountApplied(null);
      setNotification("Invalid code.");
    }
    setTimeout(() => setNotification(""), 2000);
  };

  // Handle Payment
  const handlePay = (e) => {
    e.preventDefault();
    setPayLoading(true);
    setTimeout(() => {
      setPayLoading(false);
      setPaySuccess(true);
      setPayAmount("");
      setPayDesc("");
      setTimeout(() => setPaySuccess(false), 2000);
      setNotification("Payment successful!");
      setTimeout(() => setNotification(""), 2000);
    }, 1500);
  };

  // Download Receipt
  const handleDownloadReceipt = (h) => {
    const text = `
Receipt for Payment ID: ${h.id}
Date: ${h.date}
Description: ${h.desc}
Amount: $${h.amount.toFixed(2)}
Method: ${h.method}
Status: ${h.status}
Items:
${h.items.map(i => `- ${i.label}: $${i.price.toFixed(2)}`).join("\n")}
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${h.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Outstanding payments
  const outstanding = history.filter(h => h.status === "Unpaid" || h.status === "Pending");

  // Currency symbol
  const currencySymbol =
    currency === "USD"
      ? "$"
      : currency === "NGN"
      ? "₦"
      : currency === "EUR"
      ? "€"
      : currency === "GBP"
      ? "£"
      : currency === "INR"
      ? "₹"
      : "";

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden transition-all duration-500">
      {/* Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold animate-fade-in-up">
          {notification}
        </div>
      )}

      {/* Secure Payment Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-600 text-xl">🔒</span>
        <span className="text-sm font-semibold text-blue-700">
          All transactions are secured via Stripe/Paystack.
        </span>
      </div>

      {/* Currency/Country Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-blue-700 font-semibold">Currency:</label>
        <select
          className="rounded-lg border border-blue-200 px-2 py-1 text-blue-700"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option value="USD">USD ($)</option>
          <option value="NGN">NGN (₦)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>

      {/* Subscription Overview */}
      <div className="mb-8 bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-xl shadow p-6 border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
        <div>
          <div className="font-bold text-blue-700 text-lg flex items-center gap-2">
            <span role="img" aria-label="star">🌟</span> Current Plan: <span className="text-blue-900">{planInfo.plan}</span>
          </div>
          <div className="text-sm text-blue-700 mt-1">
            Next billing: <b>{planInfo.nextBilling}</b>
          </div>
          <ul className="text-xs text-blue-600 mt-2 list-disc pl-5">
            {planInfo.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Upgrade</button>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition">Cancel</button>
        </div>
      </div>

      {/* Outstanding Payments */}
      {outstanding.length > 0 && (
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 shadow animate-fade-in flex flex-col gap-2">
          <div className="font-semibold text-yellow-700 flex items-center gap-2">
            <span role="img" aria-label="alert">⏰</span> Outstanding Payments
          </div>
          {outstanding.map(h => (
            <div key={h.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="font-semibold">{h.desc}</span> — Due: <span className="font-bold">{h.due || h.date}</span>
              </div>
              <button
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-semibold shadow hover:bg-yellow-500 transition"
                onClick={() => setNotification("Redirecting to payment...")}
              >
                Pay Now ({currencySymbol}{h.amount})
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Spending Summary */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 border border-blue-100 animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="font-semibold text-blue-700 mb-2 md:mb-0 flex items-center gap-2">
          <span role="img" aria-label="pie">📊</span> May 2025 Spending:
        </div>
        <div className="text-2xl font-bold text-blue-900">{currencySymbol}{monthlySpending.toFixed(2)}</div>
      </div>

      {/* Insurance Section */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 border border-blue-100 animate-fade-in flex flex-col gap-2">
        <div className="font-semibold text-blue-700 flex items-center gap-2">
          <span role="img" aria-label="insurance">🩺</span> Insurance Information
        </div>
        {showInsurance ? (
          <div className="flex flex-col gap-2">
            <input
              className="rounded-lg border border-blue-200 px-3 py-2 text-gray-800"
              placeholder="Enter insurance provider or policy number"
              value={insurance}
              onChange={e => setInsurance(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={() => setShowInsurance(false)}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-100 transition w-max"
            onClick={() => setShowInsurance(true)}
          >
            {insurance ? "Edit Insurance" : "Add Insurance"}
          </button>
        )}
        {insurance && (
          <div className="text-blue-900 text-sm mt-1">Current: <b>{insurance}</b></div>
        )}
      </div>

      {/* Discount Codes */}
      <div className="mb-8 bg-gradient-to-r from-green-50 via-white to-green-100 rounded-xl shadow p-6 border border-green-100 animate-fade-in">
        <div className="font-semibold text-green-700 mb-2 flex items-center gap-2">
          <span role="img" aria-label="ticket">🎟️</span> Discount Code / Voucher
        </div>
        <form className="flex flex-col md:flex-row gap-2" onSubmit={handleDiscount}>
          <input
            className="rounded-lg border border-green-200 px-3 py-2 text-gray-800 flex-1"
            placeholder="Enter code (e.g. FIRSTVISIT10)"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            type="submit"
          >
            Apply
          </button>
        </form>
        <div className="text-xs text-green-700 mt-2">
          Try: {discountCodes.map(d => <span key={d.code} className="bg-green-100 px-2 py-1 rounded-full mx-1">{d.code}</span>)}
        </div>
        {discountApplied && (
          <div className="mt-2 text-green-800 font-semibold animate-fade-in">
            {discountApplied.desc}
          </div>
        )}
      </div>

      {/* Refund & Cancellation Policy */}
      <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow animate-fade-in flex items-center justify-between">
        <div>
          <span className="font-semibold text-blue-700">Refund & Cancellation Policy:</span>
          <span className="ml-2 text-blue-900">
            You may cancel your appointment up to <b>12 hours in advance</b> for a full refund.
          </span>
        </div>
        <button
          className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-200 transition text-xs"
          onClick={() => setShowPolicy(true)}
        >
          Details
        </button>
      </div>
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowPolicy(false)}
              aria-label="Close"
            >×</button>
            <div className="font-bold text-blue-700 mb-2">Refund & Cancellation Policy</div>
            <div className="text-blue-900 text-sm">
              You may cancel your appointment up to <b>12 hours in advance</b> for a full refund.<br /><br />
              Refunds for subscriptions are processed within 5 business days. For pharmacy orders, please contact support.<br /><br />
              <span className="text-blue-600 underline cursor-pointer" onClick={() => { setShowPolicy(false); setShowHelp(true); }}>Need help?</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Filters */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          className="rounded-lg border border-blue-200 px-3 py-2 text-gray-800"
          placeholder="Search description"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="rounded-lg border border-blue-200 px-2 py-2 text-blue-700"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Consultation">Consultation</option>
          <option value="Subscription">Subscription</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
        <select
          className="rounded-lg border border-blue-200 px-2 py-2 text-blue-700"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <input
          type="date"
          className="rounded-lg border border-blue-200 px-2 py-2 text-blue-700"
          value={filterStart}
          onChange={e => setFilterStart(e.target.value)}
        />
        <input
          type="date"
          className="rounded-lg border border-blue-200 px-2 py-2 text-blue-700"
          value={filterEnd}
          onChange={e => setFilterEnd(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          onClick={() => { setFilterType(""); setFilterStatus(""); setFilterStart(""); setFilterEnd(""); setSearch(""); }}
          type="button"
        >
          Reset
        </button>
      </div>

        <div className="mb-8 bg-white rounded-xl shadow p-6 border border-blue-100 animate-fade-in overflow-x-auto">
          <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center gap-2">
            <span role="img" aria-label="history">📜</span> Payment History
          </div>
          {filteredHistory.length === 0 ? (
            <div className="text-blue-500">No payments found.</div>
          ) : (
            <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-blue-700 border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Method</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Type</th>
              <th className="py-2 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((h) => (
              <tr key={h.id} className="hover:bg-blue-50 transition">
            <td className="py-2">{h.date}</td>
            <td className="py-2">{h.desc}</td>
            <td className="py-2 font-semibold">{currencySymbol}{h.amount.toFixed(2)}</td>
            <td className="py-2">{h.method}</td>
            <td className="py-2">
              <span className={`px-2 py-1 rounded-full text-xs font-bold
                ${h.status === "Completed" ? "bg-green-100 text-green-700" :
              h.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"}`}>
                {h.status}
              </span>
            </td>
            <td className="py-2 ">{h.type}</td>
            <td className="py-2 px-1">
              <div className="flex gap-3 items-center">
                <button
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold shadow hover:bg-blue-200 transition"
              onClick={() => setShowReceipt(h)}
                >
              View
                </button>
                <button
              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold shadow hover:bg-green-200 transition"
              onClick={() => handleDownloadReceipt(h)}
                >
              Download
                </button>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
            </table>
          )}
        </div>

        {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowReceipt(null)}
              aria-label="Close"
            >×</button>
            <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
              <span role="img" aria-label="receipt">📄</span> Receipt
            </div>
            <div className="text-blue-900 text-sm mb-2">
              <b>Date:</b> {showReceipt.date}<br />
              <b>Description:</b> {showReceipt.desc}<br />
              <b>Amount:</b> {currencySymbol}{showReceipt.amount.toFixed(2)}<br />
              <b>Method:</b> {showReceipt.method}<br />
              <b>Status:</b> {showReceipt.status}<br />
              <b>Type:</b> {showReceipt.type}<br />
            </div>
            <div className="mb-2">
              <b>Items:</b>
              <ul className="list-disc pl-6 text-blue-800">
                {showReceipt.items.map((i, idx) => (
                  <li key={idx}>{i.label} — {currencySymbol}{i.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
              onClick={() => handleDownloadReceipt(showReceipt)}
            >
              Download as PDF
            </button>
            <button
              className="mt-2 ml-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-200 transition"
              onClick={() => window.open(`mailto:?subject=Receipt&body=${encodeURIComponent('See attached receipt:\n\n' + JSON.stringify(showReceipt, null, 2))}`)}
            >
              Email Receipt
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 border border-blue-100 animate-fade-in">
        <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center gap-2">
          <span role="img" aria-label="card">💳</span> Payment Methods
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {methods.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start border rounded-xl px-4 py-3 shadow transition min-w-[160px] relative
                ${m.primary ? "border-blue-500 bg-blue-50" : "border-blue-100 bg-white"}`}
            >
              <div className="flex items-center gap-2">
                {paymentLogos[m.type] && (
                  <img src={paymentLogos[m.type]} alt={m.type} className="w-7 h-5 object-contain" />
                )}
                <span className="font-semibold text-blue-800">{m.type} **** {m.last4}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">Exp: {m.exp}</div>
              {m.primary ? (
                <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">Primary</span>
              ) : (
                <button
                  className="mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
                  onClick={() => handleSetPrimary(idx)}
                >
                  Set as Primary
                </button>
              )}
              <div className="flex gap-1 mt-2">
                <button
                  className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold shadow hover:bg-yellow-200 transition"
                  onClick={() => { setShowEdit(idx); setEditCard({ ...m }); }}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold shadow hover:bg-red-200 transition"
                  onClick={() => setShowDelete(idx)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl px-6 py-6 text-blue-400 hover:text-blue-600 hover:border-blue-500 transition min-w-[120px]"
            onClick={() => setShowAdd(true)}
            type="button"
          >
            <span className="text-3xl">＋</span>
            <span className="text-xs font-semibold mt-1">Add Card</span>
          </button>
        </div>

        {/* Add Card Modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <form
              className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 animate-pop relative"
              onSubmit={handleAddCard}
              style={{ minWidth: 0 }}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
                onClick={() => setShowAdd(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="card">💳</span> Add New Card
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <select
                  className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-full"
                  value={newCard.type}
                  onChange={e => setNewCard({ ...newCard, type: e.target.value })}
                  required
                >
                  <option value="">Type</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">Amex</option>
                </select>
                <input
                  type="text"
                  className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-full"
                  placeholder="Card Number"
                  maxLength={16}
                  value={newCard.number}
                  onChange={e => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, "") })}
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-1/2"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={newCard.exp}
                    onChange={e => setNewCard({ ...newCard, exp: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-1/2"
                    placeholder="CVC"
                    maxLength={4}
                    value={newCard.cvc}
                    onChange={e => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, "") })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                  disabled={!newCard.type || !newCard.number || !newCard.exp || !newCard.cvc}
                >
                  Add Card
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Card Modal */}
        {showEdit !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <form
              className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 animate-pop relative"
              onSubmit={handleEditCard}
              style={{ minWidth: 0 }}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
                onClick={() => setShowEdit(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="card">💳</span> Edit Card
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <select
                  className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-full"
                  value={editCard.type}
                  onChange={e => setEditCard({ ...editCard, type: e.target.value })}
                  required
                >
                  <option value="">Type</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">Amex</option>
                </select>
                <input
                  type="text"
                  className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-full"
                  placeholder="Last 4 digits"
                  maxLength={4}
                  value={editCard.last4}
                  onChange={e => setEditCard({ ...editCard, last4: e.target.value.replace(/\D/g, "") })}
                  required
                />
                <input
                  type="text"
                  className="rounded-xl border border-blue-200 px-3 py-2 text-gray-800 w-full"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={editCard.exp}
                  onChange={e => setEditCard({ ...editCard, exp: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                  onClick={() => setShowEdit(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Card Modal */}
        {showDelete !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
              <button
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
                onClick={() => setShowDelete(null)}
                aria-label="Close"
              >×</button>
              <div className="font-bold text-blue-700 mb-2">Remove Card</div>
              <div className="text-blue-900 text-sm mb-4">
                Are you sure you want to remove this card? This action cannot be undone.
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
                  onClick={handleDeleteCard}
                >
                  Remove
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                  onClick={() => setShowDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Make a Payment */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 border border-blue-100 animate-fade-in">
        <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center gap-2">
          <span role="img" aria-label="pay">🛒</span> Make a Payment
        </div>
        <form className="flex flex-col gap-3" onSubmit={handlePay}>
          <input
            type="number"
            min="1"
            step="0.01"
            className="rounded-xl border border-blue-200 px-4 py-3 text-gray-800"
            placeholder={`Amount (${currencySymbol})`}
            value={payAmount}
            onChange={e => setPayAmount(e.target.value)}
            required
          />
          <input
            type="text"
            className="rounded-xl border border-blue-200 px-4 py-3 text-gray-800"
            placeholder="Description (e.g. Appointment, Premium Access)"
            value={payDesc}
            onChange={e => setPayDesc(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition transform duration-200 animate-fade-in-up flex items-center justify-center gap-2 ${
              payLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={payLoading}
          >
            {payLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>
          {paySuccess && (
            <div className="flex items-center gap-2 text-green-600 font-semibold mt-2 animate-fade-in">
              <span className="text-2xl">✅</span> Payment successful! Thank you.
            </div>
          )}
        </form>
      </div>

      {/* Help/FAQ Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-200 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setShowHelp(false)}
              aria-label="Close"
            >×</button>
            <div className="font-bold text-blue-700 mb-2">Payment Help & FAQ</div>
            <div className="text-blue-900 text-sm">
              <b>How does billing work?</b><br />
              You can pay for appointments, subscriptions, and pharmacy orders using your saved cards.<br /><br />
              <b>How do I get a refund?</b><br />
              See our refund policy above or contact support.<br /><br />
              <b>Is my payment secure?</b><br />
              Yes! All payments are processed via Stripe/Paystack and are fully encrypted.<br /><br />
              <b>Need more help?</b> Contact <a href="mailto:support@diagnobot.com" className="text-blue-600 underline">support@diagnobot.com</a>
            </div>
          </div>
        </div>
      )}

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
        @keyframes pop {
          0% { transform: scale(0.7);}
          80% { transform: scale(1.1);}
          100% { transform: scale(1);}
        }
        @keyframes blob1 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.2) translateY(20px);}
        }
        @keyframes blob2 {
          0%,100% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.1) translateY(-20px);}
        }
        .animate-fade-in { animation: fade-in 0.7s both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-pop { animation: pop 0.5s both; }
        .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
        .animate-blob2 { animation: blob2 7s infinite ease-in-out; }
        .min-w-[600px] { min-width: 600px; }
        .min-w-[120px] { min-width: 120px; }
        .min-w-[160px] { min-width: 160px; }
      `}</style>
    </div>
  );
}

export default UPayments;