'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type TransitionDirection = 'dark-to-light' | 'light-to-dark';

interface SectionTransitionProps {
  direction: TransitionDirection;
  className?: string;
}

/**
 * Smooth curved SVG divider between dark (--ink) and light (--cream) sections.
 * Includes a subtle gold stroke along the curve and a gentle parallax effect on scroll.
 */
export function SectionTransition({
  direction,
  className,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const isDarkToLight = direction === 'dark-to-light';
  const topColor = isDarkToLight ? 'var(--ink)' : 'var(--cream)';
  const bottomColor = isDarkToLight ? 'var(--cream)' : 'var(--ink)';

  // Smooth S-curve path across 1440×120 viewBox
  const curvePath =
    'M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z';

  // Thin gold accent stroke along the visible curve edge
  const strokePath =
    'M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60';

  return (
    <div
      ref={ref}
      className={cn('relative w-full leading-[0]', className)}
      aria-hidden="true"
      style={{ marginTop: '-1px' }}
    >
      <motion.div
        className="relative w-full"
        style={{ y, height: 'clamp(60px, 8vw, 120px)' }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`fill-${direction}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={topColor} />
              <stop offset="100%" stopColor={bottomColor} />
            </linearGradient>
          </defs>
          {/* Filled curve area */}
          <path
            d={curvePath}
            fill={`url(#fill-${direction})`}
          />
          {/* Gold accent stroke along the curve edge */}
          <path
            d={strokePath}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.2"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default SectionTransition;
