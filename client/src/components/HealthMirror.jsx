import React from 'react';
import './HealthMirror.css';

/*
 * STUB — Praise wires real narrative from LLM
 * Props:
 *   narrative: string | null
 *   isLoading: boolean
 */
export default function HealthMirror({ narrative = null, isLoading = false }) {
  return (
    <div className="health-mirror">
      <p className="health-mirror__label">Your Health Narrative</p>

      {isLoading ? (
        <div className="health-mirror__skeleton">
          <div className="health-mirror__skeleton-line health-mirror__skeleton-line--full" />
          <div className="health-mirror__skeleton-line health-mirror__skeleton-line--full" />
          <div className="health-mirror__skeleton-line health-mirror__skeleton-line--three-quarter" />
        </div>
      ) : narrative ? (
        <p className="health-mirror__narrative">{narrative}</p>
      ) : (
        <p className="health-mirror__empty">
          Log your first reading to receive a personalised health narrative.
        </p>
      )}
    </div>
  );
}