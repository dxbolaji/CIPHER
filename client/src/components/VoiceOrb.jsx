import "./VoiceOrb.css";

export default function VoiceOrb({ mode = "optimal", isListening, isSpeaking, onClick }) {
  const state = isListening ? "listening" : isSpeaking ? "speaking" : "idle";

  return (
    <button
      className={`voice-orb voice-orb--${mode} voice-orb--${state}`}
      onClick={onClick}
      aria-label="Open CIPHER Voice"
    >

      {isListening && (
        <>
          <span className="voice-orb__ring voice-orb__ring--1" />
          <span className="voice-orb__ring voice-orb__ring--2" />
        </>
      )}

      <span className="voice-orb__core">
        {isListening ? <MicIcon /> : isSpeaking ? <SpeakerIcon /> : <OrbIcon />}
      </span>

      <span className="voice-orb__label">CIPHER Voice</span>
    </button>
  );
}

function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OrbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
}