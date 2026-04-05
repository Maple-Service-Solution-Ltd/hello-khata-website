'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Home } from 'lucide-react';
import { useHashRouter } from './HashRouter';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentPage, navigate } = useHashRouter();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 600;
      setIsVisible(show);
      setShowHome(show && currentPage !== 'home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const goToTop = useCallback(() => {
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('home');
    }
  }, [currentPage, navigate]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-30 flex flex-col gap-2 items-end"
        >
          {/* Home button (only shown when not on home page) */}
          <AnimatePresence>
            {showHome && (
              <motion.button
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
                onClick={() => navigate('home')}
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full border cursor-pointer group',
                  'transition-colors duration-300',
                  'bg-[var(--cream-2)] border-[var(--canvas-border-strong)]',
                  'hover:bg-[var(--cream)] hover:border-[var(--gold)]',
                  'hover:shadow-[0_0_20px_var(--gold-glow)]'
                )}
                aria-label="Go to home"
              >
                <Home
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors duration-300"
                />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Back to top button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={goToTop}
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full border cursor-pointer group',
              'transition-colors duration-300',
              'bg-[var(--cream-2)] border-[var(--canvas-border-strong)]',
              'hover:bg-[var(--cream)] hover:border-[var(--gold)]',
              'hover:shadow-[0_0_20px_var(--gold-glow)]'
            )}
            aria-label="Back to top"
          >
            <ArrowUp
              size={20}
              strokeWidth={2.5}
              className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors duration-300"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
