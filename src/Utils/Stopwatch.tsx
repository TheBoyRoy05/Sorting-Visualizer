import { useState, useRef } from 'react';

const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef(0);

  const startTimer = () => {
    const startTime = Date.now();
    countRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  }

  const stopTimer = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
  }

  return { elapsedTime, isRunning, startTimer, stopTimer };
}

export default useStopwatch;