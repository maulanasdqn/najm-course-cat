import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useTimer = (startDateStr: string, endDateStr: string, sessionId: string) => {
  const navigate = useNavigate();
  const [timeUntilStart, setTimeUntilStart] = useState<number>(-1);
  const [timeLeft, setTimeLeft] = useState<number>(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!startDateStr || !endDateStr) return;

    const startDate = new Date(startDateStr).getTime();
    const endDate = new Date(endDateStr).getTime();
    const now = new Date().getTime();

    // Handle start date
    if (startDate - now > 0) {
      const timeDiff = Math.max(0, Math.floor((startDate - now) / 1000));
      setTimeUntilStart(timeDiff);
    }

    // Handle end date
    if (endDate - now > 0) {
      const timeDiff = Math.max(0, Math.floor((endDate - now) / 1000));
      setTimeLeft(timeDiff);
    } else if (endDate - now <= 0) {
      navigate(`/student/sessions/${sessionId}/exams`, { replace: true });
      toast.error("Waktu ujian telah berakhir.");
      return;
    }

    // Start the appropriate timer
    timerRef.current = setInterval(() => {
      if (timeUntilStart > 0) {
        setTimeUntilStart((prev) => Math.max(0, prev - 1));
      } else if (timeLeft > 0) {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startDateStr, endDateStr, sessionId, navigate, timeUntilStart, timeLeft]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return { timeUntilStart, timeLeft, clearTimer };
};
