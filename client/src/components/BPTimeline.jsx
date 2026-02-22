import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './BPTimeline.css';

/*
 * STUB — Praise wires real readings array
 * Props:
 *   readings: Array<{ date: string, systolic: number, diastolic: number }>
 */

const MOCK = [
  { date: 'Mon', systolic: 128, diastolic: 84 },
  { date: 'Tue', systolic: 132, diastolic: 86 },
  { date: 'Wed', systolic: 125, diastolic: 82 },
  { date: 'Thu', systolic: 138, diastolic: 90 },
  { date: 'Fri', systolic: 130, diastolic: 85 },
  { date: 'Sat', systolic: 135, diastolic: 88 },
  { date: 'Sun', systolic: 129, diastolic: 83 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bp-timeline__tooltip">
      <p className="bp-timeline__tooltip-date">{label}</p>
      <p style={{ color: 'var(--accent-safe)' }}>
        Sys: {payload[0]?.value} mmHg
      </p>
      <p style={{ color: 'var(--accent-warning)' }}>
        Dia: {payload[1]?.value} mmHg
      </p>
    </div>
  );
};

export default function BPTimeline({ readings = [] }) {
  // Backend sends newest first — reverse for chronological chart display
  const transformed = readings
    .slice(0, 10)
    .reverse()
    .map(r => ({
      date: new Date(r.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
      systolic: r.systolic,
      diastolic: r.diastolic,
    }));

  const data = transformed.length ? transformed : MOCK;
  const isUsingMock = !transformed.length;
  return (
    <div className="bp-timeline">
      <div className="bp-timeline__header">
        <p className="bp-timeline__title">Blood Pressure Trend</p>
        {isUsingMock && (
          <span className="bp-timeline__mock-badge">Sample data</span>
        )}
      </div>

      <div className="bp-timeline__legend">
        <span className="bp-timeline__legend-item bp-timeline__legend-item--sys">
          Systolic
        </span>
        <span className="bp-timeline__legend-item bp-timeline__legend-item--dia">
          Diastolic
        </span>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--accent-muted)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--text-caption)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-caption)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="var(--accent-safe)"
            strokeWidth={2}
            dot={{ fill: 'var(--accent-safe)', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="var(--accent-warning)"
            strokeWidth={2}
            dot={{ fill: 'var(--accent-warning)', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}