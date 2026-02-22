
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';



async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Users ──────────────────────────────────────────────
export const createUser = (profile) =>
  request('/api/users', {
    method: 'POST',
    body: JSON.stringify(profile),
  });

export const getUser = (userId) =>
  request(`/api/users/${userId}`);

// ── BP Readings ────────────────────────────────────────
export const addReading = (userId, reading) =>
  request(`/api/bp/${userId}`, {
    method: 'POST',
    body: JSON.stringify(reading),
  });

export const getReadings = (userId) =>
  request(`/api/bp/${userId}`);

export const getLatestReading = (userId) =>
  request(`/api/bp/${userId}/latest`);

// ── AI ────────────────────────────────────────────────
export const generateNarrative = (userId, systolic, diastolic, riskLevel) =>
  request('/api/ai/narrative', {
    method: 'POST',
    body: JSON.stringify({ userId, systolic, diastolic, riskLevel }),
  });

export const chat = (message, mode = 'optimal', conversationHistory = []) =>
  request('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, mode, conversationHistory }),
  });
