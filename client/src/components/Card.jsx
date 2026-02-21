import React from 'react';
import './Card.css';

export default function Card({
  children,
  className = '',
  elevated = false,
  accentBorder = null, // 'safe' | 'warning' | 'danger'
  onClick,
  style,
}) {
  const classes = [
    'card',
    elevated ? 'card--elevated' : '',
    accentBorder ? `card--border-${accentBorder}` : '',
    onClick ? 'card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} style={style}>
      {children}
    </div>
  );
}