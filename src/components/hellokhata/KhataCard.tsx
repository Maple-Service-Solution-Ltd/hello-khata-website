'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KhataCardProps {
  className?: string;
  children: React.ReactNode;
}

export function KhataCard({ className, children }: KhataCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative rounded-[var(--card-r)]',
        'bg-[var(--cream)] khata-lines',
        'shadow-[0_2px_12px_rgba(0,0,0,0.04)]',
        'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
        'transition-shadow duration-500',
        'p-6',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default KhataCard;
