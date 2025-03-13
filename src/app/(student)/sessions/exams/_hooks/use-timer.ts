import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDidEffect } from "@/app/_hooks/use-did-effect";

export const useTimer = (startDateStr?: string, endDateStr?: string, sessionId?: string) => {
  const navigate = useNavigate();
  const [timeUntilStart, setTimeUntilStart] = useState<number>(-1);
  const [timeLeft, setTimeLeft] = useState<number>(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useDidEffect(() => {
    if (!startDateStr || !endDateStr || !sessionId) return;

    const startDate = new Date(startDateStr).getTime();
    const endDate = new Date(endDateStr).getTime();
    const now = new Date().getTime();

    let timeUntilStartDiff = 0;
    // Handle start date
    if (startDate - now > 0) {
      timeUntilStartDiff = Math.max(0, Math.floor((startDate - now) / 1000));
      setTimeUntilStart(timeUntilStartDiff);
    }

    let timeDiff = 0;
    // Handle end date
    if (now - endDate > 0) {
      timeDiff = Math.max(0, Math.floor((now - endDate) / 1000));
      setTimeLeft(timeDiff);
    } else if (now - endDate <= 0) {
      setTimeLeft(0);
      navigate(`/student/sessions/${sessionId}/exams`, { replace: true });
      toast.error("Waktu ujian telah berakhir.");
      return;
    }

    // Start the appropriate timer
    timerRef.current = setInterval(() => {
      if (timeUntilStartDiff > 0) {
        setTimeUntilStart((prev) => Math.max(0, prev - 1));
      } else if (timeDiff > 0) {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      } else {
        setTimeUntilStart(0);
        setTimeLeft(0);
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startDateStr, endDateStr, sessionId]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return { timeUntilStart, timeLeft, clearTimer };
};
