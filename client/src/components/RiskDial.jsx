import React from 'react';
import './RiskDial.css';

/*
 * STUB — Beejay builds the shell, Praise wires real score
 * Props:
 *   score: number | null  (0–100)
 *   level: 'low' | 'moderate' | 'high' | 'critical' | null
 */
export default function RiskDial({ score = null, level = null }) {
  const RADIUS = 70;
  const STROKE = 8;
  const CIRCUMFERENCE = Math.PI * RADIUS; // half-circle arc
  const safeScore = score ?? 0;
  const progress = (safeScore / 100) * CIRCUMFERENCE;

  const colorMap = {
    low: 'var(--accent-safe)',
    moderate: 'var(--accent-warning)',
    high: 'var(--accent-danger)',
    critical: '#b91c1c',
  };

  const arcColor = level ? colorMap[level] : 'var(--accent-muted)';
  const displayLevel = level
    ? level.charAt(0).toUpperCase() + level.slice(1)
    : 'No Data';

  return (
    <div className="risk-dial">
      <svg
        className="risk-dial__svg"
        viewBox="0 0 160 90"
        width="200"
        height="112"
      >
        {/* Track */}
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke="var(--accent-muted)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke={arcColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
          className="risk-dial__arc"
        />
      </svg>

      <div className="risk-dial__center">
        <span className="risk-dial__level" style={{ color: arcColor }}>
          {displayLevel}
        </span>
        {score !== null && (
          <span className="risk-dial__score">{score}/100</span>
        )}
      </div>

      <p className="risk-dial__note">Based on your last 7 readings</p>
    </div>
  );
}