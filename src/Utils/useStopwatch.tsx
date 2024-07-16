import { useState, useRef } from 'react';

const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef(0);

  const handleStart = () => {
    const startTime = Date.now() - elapsedTime;
    countRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  }

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
  }

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  }

  return { elapsedTime, isRunning, handleStart, handlePause, handleReset };
}

export default useStopwatch;