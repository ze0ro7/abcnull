"use client";

import { useEffect, useState, useRef } from "react";

export function AnimatedNumber({
  value,
  className,
  start = 0,
  duration = 1500,
}: {
  value: number;
  className?: string;
  start?: number;
  duration?: number;
}) {
  const [currentValue, setCurrentValue] = useState(start);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const animatedValue = start + (value - start) * percentage;

      setCurrentValue(animatedValue);

      if (progress < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, start, duration]);

  return <span className={className}>{Math.round(currentValue).toLocaleString()}</span>;
}
