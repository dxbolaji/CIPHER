import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import RiskDial from './RiskDial';
import HealthMirror from './HealthMirror';
import BPTimeline from './BPTimeline';
import './Dashboard.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard({ user, readings = [], riskScore = null, narrative = null }) {
  const navigate = useNavigate();
  const firstName = user?.name?.split(' ')[0] || 'there';
  const lastReading = readings[readings.length - 1];

  const avgSystolic = readings.length
    ? Math.round(readings.reduce((s, r) => s + r.systolic, 0) / readings.length)
    : '--';
  const avgDiastolic = readings.length
    ? Math.round(readings.reduce((s, r) => s + r.diastolic, 0) / readings.length)
    : '--';

  return (
    <div className="dashboard">
      {/* Top zone */}
      <Card elevated className="dashboard__header">
        <div className="dashboard__header-left">
          <h1 className="dashboard__greeting">
            {getGreeting()}, {firstName}
          </h1>
          <p className="dashboard__sub">
            {lastReading ? (
              <>
                <Clock size={13} />
                Last reading logged {lastReading.timeAgo || 'recently'}
              </>
            ) : (
              'No readings yet — log your first reading below'
            )}
          </p>
        </div>
        <span className="dashboard__date">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </span>
      </Card>

      {/* Middle zone */}
      <div className="dashboard__middle">
        {/* Left column — 60% */}
        <div className="dashboard__left-col">
          <Card className="dashboard__risk-card">
            <p className="dashboard__card-label">Risk Assessment</p>
            <RiskDial score={riskScore} />
          </Card>

          <Card accentBorder="safe" className="dashboard__mirror-card">
            <HealthMirror narrative={narrative} isLoading={false} />
          </Card>
        </div>

        {/* Right column — 40% */}
        <div className="dashboard__right-col">
          <Card className="dashboard__timeline-card">
            <BPTimeline readings={readings} />
          </Card>

          <Card elevated className="dashboard__stats-card">
            <p className="dashboard__card-label">This Week</p>
            <div className="dashboard__stats-row">
              <div className="dashboard__stat">
                <span className="dashboard__stat-value">{avgSystolic}</span>
                <span className="dashboard__stat-label">Avg Systolic</span>
              </div>
              <div className="dashboard__stat-divider" />
              <div className="dashboard__stat">
                <span className="dashboard__stat-value">{avgDiastolic}</span>
                <span className="dashboard__stat-label">Avg Diastolic</span>
              </div>
              <div className="dashboard__stat-divider" />
              <div className="dashboard__stat">
                <span className="dashboard__stat-value">{readings.length}</span>
                <span className="dashboard__stat-label">Readings</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom CTA zone */}
      <Card elevated className="dashboard__cta-card">
        <div className="dashboard__cta-left">
          <h3 className="dashboard__cta-title">Ready to log today's reading?</h3>
          <p className="dashboard__cta-sub">
            Takes less than a minute. Your trend depends on it.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/log')}
        >
          Log Reading <ArrowRight size={16} />
        </Button>
      </Card>
    </div>
  );
}