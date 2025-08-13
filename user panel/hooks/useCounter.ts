import { useState, useEffect } from 'react';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCounter = (end: number, duration: number = 2000, startInView: boolean = false, decimals: number = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startInView) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);
      const easedT = easeOutExpo(t);
      let currentCount = easedT * end;
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end); // Ensure it ends on the exact value
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, startInView]);
  
  const hasDecimals = end % 1 !== 0 || decimals > 0;
  return hasDecimals ? parseFloat(count.toFixed(decimals)) : Math.floor(count);
};