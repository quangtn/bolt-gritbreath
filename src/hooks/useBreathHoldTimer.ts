import { useState, useEffect, useRef } from 'react';

export const useBreathHoldTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 50); // Update every 50ms for smooth animation
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startTime]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        // Store the current elapsed time when tab becomes hidden
        const now = Date.now();
        setElapsedTime(now - startTime);
      } else if (!document.hidden && isRunning) {
        // Recalculate start time when tab becomes visible again
        const now = Date.now();
        setStartTime(now - elapsedTime);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, startTime, elapsedTime]);

  const start = () => {
    const now = Date.now();
    setStartTime(now);
    setElapsedTime(0);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(0);
  };

  const getFormattedTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    return {
      formatted: `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`,
      totalSeconds: elapsedTime / 1000,
      minutes,
      seconds,
      milliseconds
    };
  };

  return {
    isRunning,
    elapsedTime,
    start,
    stop,
    reset,
    getFormattedTime
  };
};