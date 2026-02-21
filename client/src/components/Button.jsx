import React from 'react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',          // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    isLoading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : null}
      <span className={isLoading ? 'btn__label--hidden' : ''}>{children}</span>
    </button>
  );
}