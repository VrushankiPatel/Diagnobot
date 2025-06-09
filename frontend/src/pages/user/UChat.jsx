import React, { useState, useRef, useEffect } from "react";

function UChat() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "You can ask follow-up questions about your diagnosis here." }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const exampleQuestions = [
    "Do you also feel nauseous?",
    "Have you recently traveled?",
    "Are you taking any medications?",
    "How long have you had these symptoms?",
    "Is there a family history of similar symptoms?",
  ];

  // Scroll to bottom on new message
 useEffect(() => {
    if (chatEndRef.current) {
      // Only scroll the chat container, not the whole page
      chatEndRef.current.parentNode.scrollTo({
        top: chatEndRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [chatHistory, chatLoading]);

  // Chat send handler
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: chatInput }]);
    setChatLoading(true);
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Thank you for your question. Based on your input, here is some more information..." }
      ]);
      setChatLoading(false);
    }, 1200);
    setChatInput("");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col h-[80vh] min-h-[480px] relative animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center shadow">
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-blue-700 text-lg">Diagnobot Chat</div>
          <div className="text-xs text-blue-500">AI Health Assistant</div>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-4 bg-blue-50/50" style={{ scrollbarWidth: "thin" }}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-3 ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
          >
            {msg.sender === "ai" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 10h.01M12 14h.01M16 10h.01" />
                </svg>
              </div>
            )}
            <div
              className={`
                px-4 py-2 rounded-2xl max-w-[80vw] sm:max-w-xs break-words shadow
                ${msg.sender === "ai"
                  ? "bg-white text-blue-800 border border-blue-100"
                  : "bg-blue-600 text-white"}
              `}
              style={{
                borderBottomLeftRadius: msg.sender === "ai" ? "0.5rem" : "2rem",
                borderBottomRightRadius: msg.sender === "ai" ? "2rem" : "0.5rem"
              }}
            >
              <span className="font-semibold">{msg.sender === "ai" ? "Diagnobot:" : "You:"} </span>
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2">
                <span className="text-white font-bold">U</span>
              </div>
            )}
          </div>
        ))}
        {chatLoading && (
          <div className="flex justify-start mb-3">
            <div className="px-4 py-2 rounded-2xl bg-white text-blue-400 border border-blue-100 italic shadow">
              Diagnobot is typing…
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Example Questions */}
      <div className="px-4 pb-2 pt-1 bg-white border-t border-blue-50 flex flex-wrap gap-2">
        {exampleQuestions.map((q, idx) => (
          <button
            key={idx}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-100 transition mb-1"
            onClick={() => setChatInput(q)}
            type="button"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <form
        className="flex gap-2 px-4 py-3 bg-white rounded-b-2xl border-t border-blue-50"
        onSubmit={e => {
          e.preventDefault();
          handleChatSend();
        }}
      >
        <input
          type="text"
          className="flex-1 rounded-xl border border-blue-200 shadow px-4 py-3 text-gray-800 transition"
          placeholder="Type your question…"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          disabled={chatLoading}
          autoFocus
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleChatSend();
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          type="submit"
          disabled={chatLoading || !chatInput.trim()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>

      <style>{`
        .animate-fade-in { animation: fade-in 0.7s both; }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(24px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 640px) {
          .max-w-lg { max-width: 100vw !important; }
          .rounded-2xl { border-radius: 1rem !important; }
          .shadow-2xl { box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10) !important; }
          .h-\\[80vh\\] { height: 90vh !important; min-height: 400px !important; }
        }
        /* Custom scrollbar for chat */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #e0e7ff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default UChat;