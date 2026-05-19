'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BengaliNumber } from './BengaliNumber';

import { useLanguageStore } from '@/lib/language-store';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [currentValue, setCurrentValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { lang } = useLanguageStore();

  const animate = useCallback(() => {
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let rafId: number;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);

      const value = easedProgress * target;
      // Round to remove excessive decimal places during animation
      setCurrentValue(value >= 10 ? Math.round(value) : Math.round(value * 10) / 10);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCurrentValue(target);
        setIsComplete(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) {
      const cleanup = animate();
      return cleanup;
    }
  }, [isInView, animate]);

  // Format the display value
  const displayValue = isComplete
    ? String(target)
    : currentValue >= 10
      ? String(Math.round(currentValue))
      : currentValue.toFixed(1);

  return (
    <span ref={ref} className={cn('inline-flex items-baseline', className)}>
      {prefix && (
        <span className="font-body mr-0.5">{prefix}</span>
      )}
      {isComplete ? (
        lang === 'bn' ? (
          <BengaliNumber value={displayValue} />
        ) : (
          <span className="font-body font-semibold">
            {Number(displayValue).toLocaleString('en-US')}
          </span>
        )
      ) : (
        <span className="font-mono tabular-nums">{displayValue}</span>
      )}
      {suffix && (
        <span className="font-body ml-0.5">{suffix}</span>
      )}
    </span>
  );
}

export default AnimatedCounter;
