'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  className?: string;
  children: React.ReactNode;
}

export function GlowCard({ className, children }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        'relative rounded-[var(--card-r)] border border-transparent',
        'bg-[var(--ink-1)]',
        'transition-shadow duration-500',
        'hover:shadow-[0_0_0_1px_var(--green),0_0_40px_var(--green-glow)]',
        'p-6',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default GlowCard;
