import React from 'react';
import './Inputfield.css';

export default function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  unit,           // e.g. "mmHg", "bpm"
  optional = false,
  error,
  autoFocus = false,
  inputMode,      // 'numeric' | 'text' etc
  max,
  min,
}) {
  return (
    <div className="input-field">
      <label className="input-field__label" htmlFor={id}>
        {label}
        {optional && (
          <span className="input-field__optional">optional</span>
        )}
      </label>

      <div className={`input-field__wrapper ${error ? 'input-field__wrapper--error' : ''}`}>
        <input
          id={id}
          className="input-field__input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          inputMode={inputMode}
          max={max}
          min={min}
        />
        {unit && <span className="input-field__unit">{unit}</span>}
      </div>

      {error && (
        <span className="input-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}