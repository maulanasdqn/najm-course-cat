import { useState, useEffect, useCallback } from "react";

export const useCountdown = (
  durationMs: number,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  times: number;
  retry: () => void;
} => {
  const [targetTime, setTargetTime] = useState(Date.now() + durationMs);
  const [remaining, setRemaining] = useState(durationMs);

  const retry = useCallback(() => {
    const newTargetTime = Date.now() + durationMs;
    setTargetTime(newTargetTime);
    setRemaining(durationMs);
  }, [durationMs]);

  useEffect(() => {
    retry();
  }, [durationMs, retry]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateTimer = () => {
      const now = Date.now();
      const newRemaining = targetTime - now;

      if (newRemaining <= 0) {
        setRemaining(0);
      } else {
        setRemaining(newRemaining);
        // Schedule next update dynamically
        const delay = Math.min(1000, newRemaining);
        timeoutId = setTimeout(updateTimer, delay);
      }
    };

    // Initial scheduling with proper delay calculation
    const initialDelay = Math.max(0, Math.min(1000, targetTime - Date.now()));
    timeoutId = setTimeout(updateTimer, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [targetTime]);

  const secondsTotal = Math.max(0, Math.floor(remaining / 1000));
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return { days, hours, minutes, seconds, times: remaining, retry };
};
