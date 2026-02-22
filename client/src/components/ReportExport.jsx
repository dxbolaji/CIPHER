import React, { useRef } from 'react';
import { Download, Printer, Activity } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './ReportExport.css';

/*
 * Props:
 *   user: { name, age, sex }
 *   readings: Array<{ systolic, diastolic, pulse, riskLevel, createdAt }>
 *   narrative: string | null
 *   riskScore: number | null
 */

const RISK_CONFIG = {
  normal:   { label: 'Normal',   color: '#2DD4BF' },
  elevated: { label: 'Elevated', color: '#F59E0B' },
  high:     { label: 'High',     color: '#EF4444' },
  crisis:   { label: 'Crisis',   color: '#b91c1c' },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function ReportExport({
  user = {},
  readings = [],
  narrative = null,
  riskScore = null,
}) {
  const reportRef = useRef(null);

  const avgSystolic = readings.length
    ? Math.round(readings.reduce((s, r) => s + r.systolic, 0) / readings.length)
    : '--';
  const avgDiastolic = readings.length
    ? Math.round(readings.reduce((s, r) => s + r.diastolic, 0) / readings.length)
    : '--';
  const highCount = readings.filter(r => r.riskLevel === 'high' || r.riskLevel === 'crisis').length;
  const latestRisk = readings[0]?.riskLevel || null;
  const riskInfo = latestRisk ? RISK_CONFIG[latestRisk] : null;

  const handlePrint = () => {
    window.print();
  };

  const generatedDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="report-export">
      {/* Action bar — hidden on print */}
      <div className="report-export__actions no-print">
        <div>
          <h1 className="report-export__page-title">Health Report</h1>
          <p className="report-export__page-sub">
            Share this with your doctor at your next visit
          </p>
        </div>
        <div className="report-export__btns">
          <Button variant="secondary" size="md" onClick={handlePrint}>
            <Printer size={16} /> Print Report
          </Button>
        </div>
      </div>

      {/* Printable report */}
      <div className="report-export__doc" ref={reportRef}>
        {/* Report header */}
        <div className="report-export__header">
          <div className="report-export__brand">
            <Activity size={20} color="#2DD4BF" />
            <span className="report-export__brand-name">CIPHER</span>
          </div>
          <div className="report-export__header-right">
            <p className="report-export__meta">Cardiovascular Health Report</p>
            <p className="report-export__meta">Generated: {generatedDate}</p>
          </div>
        </div>

        <div className="report-export__divider" />

        {/* Patient info */}
        <div className="report-export__section">
          <p className="report-export__section-title">Patient Information</p>
          <div className="report-export__info-grid">
            <div className="report-export__info-item">
              <span className="report-export__info-label">Name</span>
              <span className="report-export__info-value">{user.name || '--'}</span>
            </div>
            <div className="report-export__info-item">
              <span className="report-export__info-label">Age</span>
              <span className="report-export__info-value">{user.age || '--'}</span>
            </div>
            <div className="report-export__info-item">
              <span className="report-export__info-label">Sex</span>
              <span className="report-export__info-value">{user.sex || '--'}</span>
            </div>
            <div className="report-export__info-item">
              <span className="report-export__info-label">Total Readings</span>
              <span className="report-export__info-value">{readings.length}</span>
            </div>
          </div>
        </div>

        <div className="report-export__divider" />

        {/* Summary stats */}
        <div className="report-export__section">
          <p className="report-export__section-title">Summary Statistics</p>
          <div className="report-export__stats-grid">
            <div className="report-export__stat-box">
              <span className="report-export__stat-value">{avgSystolic}</span>
              <span className="report-export__stat-label">Avg Systolic (mmHg)</span>
            </div>
            <div className="report-export__stat-box">
              <span className="report-export__stat-value">{avgDiastolic}</span>
              <span className="report-export__stat-label">Avg Diastolic (mmHg)</span>
            </div>
            <div className="report-export__stat-box">
              <span
                className="report-export__stat-value"
                style={{ color: riskInfo?.color || 'inherit' }}
              >
                {riskInfo?.label || '--'}
              </span>
              <span className="report-export__stat-label">Current Risk Level</span>
            </div>
            <div className="report-export__stat-box">
              <span
                className="report-export__stat-value"
                style={{ color: highCount > 0 ? '#EF4444' : '#2DD4BF' }}
              >
                {highCount}
              </span>
              <span className="report-export__stat-label">High/Crisis Readings</span>
            </div>
          </div>
        </div>

        <div className="report-export__divider" />

        {/* Narrative */}
        {narrative && (
          <>
            <div className="report-export__section">
              <p className="report-export__section-title">AI Health Assessment</p>
              <div className="report-export__narrative">
                <p className="report-export__narrative-salutation">
                  Dear {user.name?.split(' ')[0] || 'Patient'},
                </p>
                <p className="report-export__narrative-body">{narrative}</p>
                <p className="report-export__narrative-sign">— CIPHER AI Health Partner</p>
              </div>
            </div>
            <div className="report-export__divider" />
          </>
        )}

        {/* Reading log */}
        <div className="report-export__section">
          <p className="report-export__section-title">
            Reading Log (Last {Math.min(readings.length, 10)})
          </p>
          <table className="report-export__table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Systolic</th>
                <th>Diastolic</th>
                <th>Pulse</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {readings.slice(0, 10).map((r, i) => {
                const risk = RISK_CONFIG[r.riskLevel] || RISK_CONFIG.normal;
                return (
                  <tr key={r._id || i}>
                    <td>{formatDate(r.createdAt)}</td>
                    <td>{r.systolic}</td>
                    <td>{r.diastolic}</td>
                    <td>{r.pulse || '--'}</td>
                    <td style={{ color: risk.color, fontWeight: 600 }}>
                      {risk.label}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="report-export__footer">
          <p>This report was generated by CIPHER — Cardiovascular Intelligence for Predictive Health and Early Risk Analysis.</p>
          <p>This is not a substitute for professional medical advice. Please consult your doctor.</p>
        </div>
      </div>
    </div>
  );
}