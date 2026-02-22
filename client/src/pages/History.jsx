import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../components/Card';
import './History.css';

/*
 * Props:
 *   readings: Array from backend — { _id, systolic, diastolic, pulse, riskLevel, createdAt }
 *   isLoading: boolean
 */

const RISK_CONFIG = {
  normal:   { label: 'Normal',   color: 'var(--accent-safe)',    bg: 'var(--accent-safe-dim)' },
  elevated: { label: 'Elevated', color: 'var(--accent-warning)', bg: 'var(--accent-warning-dim)' },
  high:     { label: 'High',     color: 'var(--accent-danger)',  bg: 'var(--accent-danger-dim)' },
  crisis:   { label: 'Crisis',   color: '#f87171',               bg: 'rgba(185,28,28,0.15)' },
};

const FILTERS = ['All', 'Normal', 'Elevated', 'High', 'Crisis'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getTrend(readings, index) {
  if (index >= readings.length - 1) return 'flat';
  const curr = readings[index].systolic;
  const prev = readings[index + 1].systolic;
  if (curr > prev + 5) return 'up';
  if (curr < prev - 5) return 'down';
  return 'flat';
}

export default function History({ readings = [], isLoading = false }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? readings
    : readings.filter(r => r.riskLevel === activeFilter.toLowerCase());

  return (
    <div className="history">
      {/* Header */}
      <div className="history__header">
        <div>
          <h1 className="history__title">Reading History</h1>
          <p className="history__sub">
            {readings.length} total reading{readings.length !== 1 ? 's' : ''} logged
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="history__filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`history__filter-btn ${activeFilter === f ? 'history__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="history__loading">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="history__skeleton-row" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="history__empty">
          <Activity size={32} color="var(--text-caption)" />
          <p className="history__empty-text">
            {readings.length === 0
              ? 'No readings yet. Log your first blood pressure reading to get started.'
              : `No ${activeFilter.toLowerCase()} readings found.`}
          </p>
        </Card>
      ) : (
        <div className="history__list">
          {filtered.map((reading, index) => {
            const risk = RISK_CONFIG[reading.riskLevel] || RISK_CONFIG.normal;
            const trend = getTrend(filtered, index);

            return (
              <Card key={reading._id} className="history__row">
                {/* Left — BP values */}
                <div className="history__bp">
                  <span className="history__bp-value">
                    {reading.systolic}
                    <span className="history__bp-sep">/</span>
                    {reading.diastolic}
                  </span>
                  <span className="history__bp-unit">mmHg</span>
                </div>

                {/* Center — meta */}
                <div className="history__meta">
                  <div className="history__meta-top">
                    <span
                      className="history__risk-badge"
                      style={{ color: risk.color, background: risk.bg }}
                    >
                      {risk.label}
                    </span>
                    {reading.pulse && (
                      <span className="history__pulse">
                        ♥ {reading.pulse} bpm
                      </span>
                    )}
                  </div>
                  <span className="history__datetime">
                    {formatDate(reading.createdAt)} · {formatTime(reading.createdAt)}
                  </span>
                </div>

                {/* Right — trend */}
                <div className="history__trend">
                  {trend === 'up' && <TrendingUp size={18} color="var(--accent-danger)" />}
                  {trend === 'down' && <TrendingDown size={18} color="var(--accent-safe)" />}
                  {trend === 'flat' && <Minus size={18} color="var(--text-caption)" />}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}