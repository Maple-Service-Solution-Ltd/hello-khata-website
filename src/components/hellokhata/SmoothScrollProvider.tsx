'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { WaveformMark } from '@/components/hellokhata/WaveformMark';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading overlay for at least 800ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let gsapModule: typeof import('gsap') | null = null;
    let scrollTriggerModule: typeof import('gsap/ScrollTrigger') | null = null;
    let rafId: number;

    async function init() {
      // Dynamic imports for GSAP (avoid SSR)
      gsapModule = await import('gsap');
      scrollTriggerModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      // Register plugin
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Cleanup on unmount
      return () => {
        gsap.ticker.remove((time: number) => {
          lenis.raf(time * 1000);
        });
        lenis.destroy();
        ScrollTrigger.killAll();
      };
    }

    const cleanupPromise = init();
    const cleanup = () => {
      cleanupPromise.then((cleanupFn) => {
        if (cleanupFn) cleanupFn();
      });
    };

    return cleanup;
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: 'var(--ink)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulsing WaveformMark */}
              <div style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
                <WaveformMark active size="lg" color="green" />
              </div>

              {/* Brand text */}
              <motion.span
                className="font-display font-bold tracking-tight"
                style={{
                  fontSize: '24px',
                  color: 'var(--text-cream)',
                  letterSpacing: '-0.02em',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                HelloKhata
              </motion.span>

              {/* Subtle tagline */}
              <motion.span
                className="font-body"
                style={{
                  fontSize: '13px',
                  color: 'var(--text-cream-muted)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                খাতা এখন কথা বলে।
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SmoothScrollProvider;
