import { useState, useCallback, useRef, useEffect } from "react";
import { useDidEffect } from "./use-did-effect";
import { EventEmitter } from "@/utils/event-emitter";

const eventEmitter = new EventEmitter();

interface OnCompleteProps {
  reset: () => void;
  start: () => void;
}

interface TimerOptions {
  autoStart?: boolean;
  onComplete?: (props: OnCompleteProps) => void;
  interval?: number; // in milliseconds
}

interface TimerControls {
  start: () => void;
  pause: () => void;
  reset: () => void;
  isRunning: boolean;
  remainingTime: number;
  formattedTime: string;
  progress: number; // 0 to 1 value representing progress
}

/**
 * A custom hook for creating a countdown timer
 *
 * @param seconds - The total number of seconds for the timer
 * @param options - Optional configuration
 * @returns Timer control functions and state
 */
export const useTimer = (seconds: number, options?: TimerOptions): TimerControls => {
  const { autoStart = false, onComplete, interval = 1000 } = options || {};

  const [remainingTime, setRemainingTime] = useState(seconds);
  const remainingTimeRef = useRef(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const totalSeconds = useRef(seconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleSetRemainingTime = (newRemainingTime: number) => {
    if (newRemainingTime < 0) {
      setRemainingTime(0);
      remainingTimeRef.current = 0;
    } else {
      setRemainingTime(newRemainingTime);
      remainingTimeRef.current = newRemainingTime;
    }
  };

  // Clear timer on unmount
  useDidEffect(() => {
    eventEmitter.on("on-complete", () => {
      onCompleteRef.current?.({ reset, start });
    });
    return () => {
      eventEmitter.off("on-complete");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Update total seconds ref when seconds prop changes
  useDidEffect(() => {
    totalSeconds.current = seconds;
    handleSetRemainingTime(seconds);
  }, [seconds]);

  // Pause the timer
  const pause = useCallback(() => {
    if (!isRunning) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
  }, [isRunning]);

  // Reset the timer
  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    handleSetRemainingTime(totalSeconds.current);
    setIsRunning(false);
  }, []);

  // Start the timer
  const start = useCallback(() => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      if (remainingTimeRef.current <= 1) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setIsRunning(false);
        eventEmitter.emit("on-complete");
        handleSetRemainingTime(remainingTimeRef.current - 1);
      } else {
        handleSetRemainingTime(remainingTimeRef.current - 1);
      }
    }, interval);
  }, [isRunning, remainingTime, interval, onComplete, reset]);

  // Auto-start timer if configured
  useDidEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoStart, start]);

  // Format the time as HH:MM:SS or MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // If hours > 0, show HH:MM:SS format
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    // Otherwise show MM:SS format
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress (0 to 1)
  const progress = totalSeconds.current > 0 ? 1 - remainingTime / totalSeconds.current : 0;

  return {
    start,
    pause,
    reset,
    isRunning,
    remainingTime,
    formattedTime: formatTime(remainingTime),
    progress,
  };
};
