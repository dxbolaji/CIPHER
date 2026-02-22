import { useState } from "react";
import { useVoiceChat } from "../hooks/useVoiceChat";
import "./VoiceChatDrawer.css";

export default function VoiceChatDrawer({ isOpen, onClose, mode: initialMode = "optimal" }) {
  const [mode, setMode] = useState(initialMode);
  const [messages, setMessages] = useState([]);

  const {
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
  } = useVoiceChat(mode);

  const prevTranscript = useState("")[0];

  function handleMicPress() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  const [chatLog, setChatLog] = useState([]);

  const handleStart = async () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening();
  };

  const lastTranscript = useState("")[0];

  return (
    <div className={`vcd ${isOpen ? "vcd--open" : ""} vcd--${mode}`}>
      {/* Backdrop */}
      {isOpen && <div className="vcd__backdrop" onClick={onClose} />}

      {/* Drawer panel */}
      <div className="vcd__panel">
        {/* Handle bar */}
        <div className="vcd__handle" onClick={onClose} />

        {/* Header */}
        <div className="vcd__header">
          <div className="vcd__title">
            <span className="vcd__title-text">CIPHER Voice</span>
            <span className={`vcd__status-dot ${isListening ? "vcd__status-dot--active" : ""}`} />
          </div>

          {/* Mode toggle */}
          <div className="vcd__mode-toggle">
            <button
              className={`vcd__mode-btn ${mode === "ghost" ? "vcd__mode-btn--active" : ""}`}
              onClick={() => setMode("ghost")}
            >
              Ghost
            </button>
            <button
              className={`vcd__mode-btn ${mode === "optimal" ? "vcd__mode-btn--active" : ""}`}
              onClick={() => setMode("optimal")}
            >
              Optimal
            </button>
          </div>
        </div>

        {/* Mode description */}
        <p className="vcd__mode-desc">
          {mode === "ghost"
            ? "I'm here with you. Take your time."
            : "You're doing great. Let's keep it going."}
        </p>

        {/* Chat area */}
        <div className="vcd__chat">
          {chatLog.length === 0 && (
            <div className="vcd__empty">
              <p>Press the mic and start talking.</p>
              <p>CIPHER is listening.</p>
            </div>
          )}
          {chatLog.map((msg, i) => (
            <div key={i} className={`vcd__msg vcd__msg--${msg.role}`}>
              <span className="vcd__msg-label">{msg.role === "user" ? "You" : "CIPHER"}</span>
              <p className="vcd__msg-text">{msg.text}</p>
            </div>
          ))}

          {/* Live transcript while listening */}
          {isListening && (
            <div className="vcd__msg vcd__msg--user vcd__msg--live">
              <span className="vcd__msg-label">You</span>
              <p className="vcd__msg-text vcd__listening-text">
                <span className="vcd__dot-pulse" />
                Listening...
              </p>
            </div>
          )}

          {/* Speaking indicator */}
          {isSpeaking && (
            <div className="vcd__msg vcd__msg--cipher vcd__msg--live">
              <span className="vcd__msg-label">CIPHER</span>
              <p className="vcd__msg-text vcd__listening-text">
                <span className="vcd__dot-pulse" />
                Speaking...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="vcd__error">{error}</p>
          )}
        </div>

        {/* Mic button */}
        <div className="vcd__footer">
          <button
            className={`vcd__mic ${isListening ? "vcd__mic--active" : ""} ${isSpeaking ? "vcd__mic--speaking" : ""}`}
            onClick={handleStart}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <StopIcon /> : isSpeaking ? <WaveIcon /> : <MicIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
      <path
        d="M4 18 C7 12, 10 24, 13 18 C16 12, 19 24, 22 18 C25 12, 28 24, 31 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}