import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BPInputForm from "./components/BPInputForm.jsx";
import './global.css';

export default function App() {
  const [user, setUser] = useState(null);

  // If no user, show onboarding
  if (!user) {
    return <Onboarding onComplete={(profile) => setUser(profile)} />;
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route path="/" element={<Dashboard user={user} readings={[]} riskScore={null} narrative={null} />} />
        <Route path="/log" element={<BPInputForm onSubmit={(data) => console.log(data)} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}