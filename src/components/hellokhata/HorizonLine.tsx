'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type HorizonLineVariant = 'subtle' | 'strong' | 'glowing';

interface HorizonLineProps {
  variant?: HorizonLineVariant;
  className?: string;
}

const variantStyles: Record<HorizonLineVariant, { strokeWidth: number; opacity: number; filter?: string }> = {
  subtle: { strokeWidth: 1, opacity: 0.2 },
  strong: { strokeWidth: 2, opacity: 0.4 },
  glowing: { strokeWidth: 2, opacity: 0.6, filter: 'drop-shadow(0 0 6px var(--green-glow-strong))' },
};

export function HorizonLine({
  variant = 'subtle',
  className,
}: HorizonLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const style = variantStyles[variant];

  // Undulating path: slight sine wave across the width
  const pathD = 'M 0 12 Q 50 4, 100 12 Q 150 20, 200 12 Q 250 4, 300 12 Q 350 20, 400 12 Q 450 4, 500 12 Q 550 20, 600 12 Q 650 4, 700 12 Q 750 20, 800 12 Q 850 4, 900 12 Q 950 20, 1000 12 Q 1050 4, 1100 12 Q 1150 20, 1200 12';

  return (
    <div
      ref={ref}
      className={cn('w-full overflow-hidden', className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="block w-full h-3"
        style={{ filter: style.filter }}
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--green)"
          strokeWidth={style.strokeWidth}
          strokeLinecap="round"
          opacity={style.opacity}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>
    </div>
  );
}

export default HorizonLine;
