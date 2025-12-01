import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000,
  delay = 300
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start: number | null = null;
    let animationFrameId: number;

    const startTimestamp = performance.now() + delay;

    const step = (timestamp: number) => {
      if (timestamp < startTimestamp) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      if (!start) start = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const nextCount = Math.floor(progress * value);
      
      if (nextCount !== countRef.current) {
        setCount(nextCount);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, delay, isVisible]);

  return <div ref={ref}>{count}</div>;
};