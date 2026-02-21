import React from 'react';
import './Pilltoggle.css';

export default function PillToggle({
  label,
  options,      // [{ value: 'low', label: 'Low' }, ...]
  value,
  onChange,
}) {
  return (
    <div className="pill-toggle">
      {label && (
        <span className="pill-toggle__label">{label}</span>
      )}
      <div className="pill-toggle__group" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`pill-toggle__pill ${
              value === option.value ? 'pill-toggle__pill--active' : ''
            }`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}