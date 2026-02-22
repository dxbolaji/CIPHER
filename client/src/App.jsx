

import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BPInputForm from "./components/BPInputForm.jsx";
import History from "./pages/History.jsx";
import ReportExport from "./components/ReportExport.jsx";
import * as api from "./api.js";
import './global.css';

// ─── helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Map backend riskLevel string → numeric score for RiskDial (0–100)
function riskLevelToScore(level) {
  return { normal: 20, elevated: 50, high: 75, crisis: 100 }[level] ?? 20;
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser]           = useState(() => {
    // Persist user across page refreshes
    const saved = localStorage.getItem('cipher_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [readings, setReadings]   = useState([]);
  const [riskScore, setRiskScore] = useState(null);
  const [narrative, setNarrative] = useState(null);
  const [isLogging, setIsLogging] = useState(false);

  // ── Load readings whenever we have a user ─────────────────────────────────
  const loadReadings = useCallback(async (userId) => {
    try {
      const data = await api.getReadings(userId);
      // Add human-readable timeAgo to each reading
      const enriched = data.map(r => ({ ...r, timeAgo: timeAgo(r.createdAt) }));
      setReadings(enriched);

      // Set risk score from latest reading
      if (enriched.length > 0) {
        setRiskScore(riskLevelToScore(enriched[0].riskLevel));
      }
    } catch (err) {
      console.error('Failed to load readings:', err);
    }
  }, []);

  useEffect(() => {
    if (user?._id) loadReadings(user._id);
  }, [user, loadReadings]);

  // ── Onboarding complete → create user in DB ───────────────────────────────
  const handleOnboardingComplete = async (profile) => {
    try {
      const newUser = await api.createUser({
        name: profile.name,
        age: Number(profile.age),
        smoker: false,
        diabetic: profile.conditions?.includes('Diabetes') ?? false,
        exerciseFrequency: 'low',
      });
      localStorage.setItem('cipher_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      console.error('Failed to create user:', err);
      // Fallback: store locally so the app still works if backend is down
      const fallback = { ...profile, _id: null };
      localStorage.setItem('cipher_user', JSON.stringify(fallback));
      setUser(fallback);
    }
  };

  // ── BP form submit → log reading + fetch narrative ────────────────────────
  const handleBPSubmit = async (formData) => {
    if (!user?._id) return;
    setIsLogging(true);

    try {
      const { systolic, diastolic, pulse, notes } = formData;

      // 1. Save reading
      const reading = await api.addReading(user._id, {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        pulse: pulse ? Number(pulse) : undefined,
        notes,
      });

      // 2. Update risk score immediately (no waiting for narrative)
      setRiskScore(riskLevelToScore(reading.riskLevel));

      // 3. Refresh readings list
      await loadReadings(user._id);

      // 4. Fetch narrative in background
      const { narrative: text } = await api.generateNarrative(
        user._id,
        reading.systolic,
        reading.diastolic,
        reading.riskLevel
      );
      setNarrative(text);

      // 5. Navigate back to dashboard
      window.location.hash = '#/';
    } catch (err) {
      console.error('Failed to submit reading:', err);
    } finally {
      setIsLogging(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              user={user}
              readings={readings}
              riskScore={riskScore}
              narrative={narrative}
            />
          }
        />
        <Route
          path="/log"
          element={
            <BPInputForm
              onSubmit={handleBPSubmit}
              isLoading={isLogging}
            />
          }
        />
        <Route
          path="/history"
          element={<History readings={readings} isLoading={false} />}
        />
        <Route
          path="/report"
          element={
            <ReportExport
              user={user}
              readings={readings}
              narrative={narrative}
              riskScore={riskScore}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}