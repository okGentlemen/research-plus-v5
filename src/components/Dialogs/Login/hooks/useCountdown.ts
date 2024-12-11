import { useState, useEffect, useCallback } from 'react';

export function useCountdown(initialTime: number) {
  const [countdown, setCountdown] = useState(0);

  const startCountdown = useCallback(() => {
    setCountdown(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return { countdown, startCountdown };
}