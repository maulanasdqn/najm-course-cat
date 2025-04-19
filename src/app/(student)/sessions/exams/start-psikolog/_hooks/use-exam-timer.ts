import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useExamTimer = (
  startDate: string | undefined,
  endDate: string | undefined,
  sessionId: string,
) => {
  const navigate = useNavigate();
  const [timeUntilStart, setTimeUntilStart] = useState<number>(-1);
  const [timeLeft, setTimeLeft] = useState<number>(-1);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false);

  const calculateTime = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);

    if (!startDate || !endDate) {
      console.log("Timer: No start or end date provided", { startDate, endDate });
      return { untilStart: 0, left: 0 };
    }

    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    const untilStart = Math.max(startTimestamp - now, 0);
    const left = endTimestamp > now ? Math.max(endTimestamp - now, 0) : 0;

    console.log("Timer Update:", { untilStart, left, now, startTimestamp, endTimestamp });
    return { untilStart, left };
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setTimeUntilStart(0);
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const { untilStart, left } = calculateTime();
      setTimeUntilStart(untilStart);
      setTimeLeft(left);

      if (untilStart === 0 && left === 0) {
        setIsTimerActive(false);
      }
    };

    updateTimer();
    setIsTimerActive(true);
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
      setIsTimerActive(false);
    };
  }, [calculateTime, startDate, endDate]);

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const handleTimerEnd = useCallback(() => {
    if (timeLeft === 0 && timeUntilStart === 0 && isExamFinished) {
      console.log("Timer: Exam finished, navigating to exams page");
      navigate(`/student/sessions/${sessionId}/exams`, { replace: true });
    } else {
      console.log("Timer: Time up but exam not finished yet", {
        timeLeft,
        timeUntilStart,
        isExamFinished,
      });
    }
  }, [timeLeft, timeUntilStart, isExamFinished, sessionId, navigate]);

  const finishExamTimer = useCallback(() => {
    setIsExamFinished(true);
    handleTimerEnd();
  }, [handleTimerEnd]);

  return {
    timeUntilStart,
    timeLeft,
    isTimerActive,
    formatTime,
    handleTimerEnd,
    finishExamTimer,
  };
};
