'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 40%, #E8C88A 70%, var(--gold) 100%)',
        boxShadow: '0 0 8px var(--gold-glow), 0 0 16px var(--gold-glow-strong)',
      }}
    />
  );
}

export default ScrollProgress;
