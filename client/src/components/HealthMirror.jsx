import React from 'react';
import './HealthMirror.css';

export default function HealthMirror({
  narrative = null,
  isLoading = false,
  userName = '',
  riskLevel = null,
}) {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const firstName = userName?.split(' ')[0] || 'there';

  return (
    <div className="health-mirror">
      <p className="health-mirror__label">Your Health Narrative</p>

      <div className={`health-mirror__letter ${riskLevel ? `health-mirror__letter--${riskLevel}` : ''}`}>
        <div className="health-mirror__letter-header">
          <span className="health-mirror__date">{today}</span>
          {riskLevel && (
            <span className={`health-mirror__risk-tag health-mirror__risk-tag--${riskLevel}`}>
              {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
            </span>
          )}
        </div>

        <p className="health-mirror__salutation">Dear {firstName},</p>

        {isLoading ? (
          <div className="health-mirror__skeleton">
            <div className="health-mirror__skeleton-line health-mirror__skeleton-line--full" />
            <div className="health-mirror__skeleton-line health-mirror__skeleton-line--full" />
            <div className="health-mirror__skeleton-line health-mirror__skeleton-line--wide" />
            <div className="health-mirror__skeleton-line health-mirror__skeleton-line--full" />
            <div className="health-mirror__skeleton-line health-mirror__skeleton-line--half" />
          </div>
        ) : narrative ? (
          <>
            <p className="health-mirror__body">{narrative}</p>
            <p className="health-mirror__sign-off">
              Stay consistent,<br />
              <span className="health-mirror__signature">CIPHER</span>
            </p>
          </>
        ) : (
          <>
            <p className="health-mirror__body health-mirror__body--empty">
              Your health story starts with your first reading. Log your blood
              pressure today and CIPHER will write you a personalised narrative
              — one that speaks your language, knows your diet, and tracks your
              progress honestly.
            </p>
            <p className="health-mirror__sign-off">
              Ready when you are,<br />
              <span className="health-mirror__signature">CIPHER</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}