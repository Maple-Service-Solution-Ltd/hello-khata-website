'use client';

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';

interface RevealProps {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  once?: boolean;
}

const variantMap: Record<RevealVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className,
  children,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });

  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
