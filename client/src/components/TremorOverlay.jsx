import "./TremorOverlay.css";

export default function TremorOverlay({ visible, onDismiss, onLogFeeling }) {
  if (!visible) return null;

  return (
    <div className="tremor-overlay">
      <div className="tremor-overlay__backdrop" onClick={onDismiss} />

      <div className="tremor-overlay__card">
        {/* Header */}
        <div className="tremor-overlay__header">
          <span className="tremor-overlay__logo">CIPHER</span>
          <span className="tremor-overlay__pulse" />
        </div>

        {/* Icon */}
        <div className="tremor-overlay__icon">
          <WaveIcon />
        </div>

        {/* Message */}
        <p className="tremor-overlay__message">
          We noticed some unusual hand movement.
        </p>
        <p className="tremor-overlay__sub">
          How are you feeling right now?
        </p>

        {/* Actions */}
        <div className="tremor-overlay__actions">
          <button
            className="tremor-overlay__btn tremor-overlay__btn--secondary"
            onClick={onDismiss}
          >
            I'm fine
          </button>
          <button
            className="tremor-overlay__btn tremor-overlay__btn--primary"
            onClick={onLogFeeling}
          >
            Log how I feel
          </button>
        </div>
      </div>
    </div>
  );
}

function WaveIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M4 18 C7 12, 10 24, 13 18 C16 12, 19 24, 22 18 C25 12, 28 24, 31 18"
        stroke="var(--accent-purple)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}