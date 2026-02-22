import { useState, useEffect, useRef } from "react";

const BUFFER_SIZE = 50;
const VARIANCE_THRESHOLD = 1.8;
const COOLDOWN_MS = 10000;

function calcVariance(arr) {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, val) => sum + (val - mean) ** 2, 0) / arr.length;
}

export function useTremorDetection() {
  const [tremorDetected, setTremorDetected] = useState(false);
  const [motionVariance, setMotionVariance] = useState(0);

  const bufferX = useRef([]);
  const bufferY = useRef([]);
  const bufferZ = useRef([]);
  const cooldownActive = useRef(false);

  useEffect(() => {
    function handleMotion(e) {
      const { x, y, z } = e.accelerationIncludingGravity ?? {};
      if (x == null || y == null || z == null) return;

      // Push to rolling buffers
      bufferX.current.push(x);
      bufferY.current.push(y);
      bufferZ.current.push(z);

      if (bufferX.current.length > BUFFER_SIZE) bufferX.current.shift();
      if (bufferY.current.length > BUFFER_SIZE) bufferY.current.shift();
      if (bufferZ.current.length > BUFFER_SIZE) bufferZ.current.shift();

      // Only calculate once buffer is full
      if (bufferX.current.length < BUFFER_SIZE) return;

      const variance =
        (calcVariance(bufferX.current) +
          calcVariance(bufferY.current) +
          calcVariance(bufferZ.current)) /
        3;

      setMotionVariance(parseFloat(variance.toFixed(3)));

      if (variance > VARIANCE_THRESHOLD && !cooldownActive.current) {
        setTremorDetected(true);
        cooldownActive.current = true;
        setTimeout(() => {
          cooldownActive.current = false;
        }, COOLDOWN_MS);
      }
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  function resetTremor() {
    setTremorDetected(false);
  }

  return { tremorDetected, motionVariance, resetTremor };
}