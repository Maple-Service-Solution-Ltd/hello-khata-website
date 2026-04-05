'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Download,
  MessageCircle,
  Mic,
  Search,
  MessageSquare,
} from 'lucide-react';
import { useHashRouter } from '@/components/hellokhata/HashRouter';

/* ─── Arc positions for action buttons relative to FAB center ─── */

const ARC_POSITIONS = [
  { x: -10, y: -64 },   // closest to FAB (bottom)
  { x: -24, y: -128 },
  { x: -32, y: -192 },   // middle – maximum left curve
  { x: -24, y: -256 },
  { x: -10, y: -320 },   // farthest from FAB (top)
];

/* ─── Component ─── */

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hasScrolledRef = useRef(false);
  const timerDoneRef = useRef(false);
  const { navigate, setSearchOpen } = useHashRouter();

  /* ── Entrance: show after 5s delay AND 300px scroll ── */
  useEffect(() => {
    const tryShow = () => {
      if (timerDoneRef.current && hasScrolledRef.current) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      timerDoneRef.current = true;
      tryShow();
    }, 5000);

    const onScroll = () => {
      if (window.scrollY > 300) {
        hasScrolledRef.current = true;
        tryShow();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Close on Escape key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  /* ── Handlers ── */
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const executeAction = useCallback((fn: () => void) => {
    setIsOpen(false);
    fn();
  }, []);

  /* ── Action definitions ── */
  const actions = [
    {
      icon: Download,
      label: 'ডাউনলোড',
      fn: () => navigate('pricing'),
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      fn: () =>
        window.open(
          'https://wa.me/8801XXXXXXXXX',
          '_blank',
          'noopener,noreferrer',
        ),
    },
    {
      icon: Mic,
      label: 'ভয়েস ডেমো',
      fn: () => navigate('voice'),
    },
    {
      icon: Search,
      label: 'সার্চ',
      fn: () => setSearchOpen(true),
    },
    {
      icon: MessageSquare,
      label: 'ফিডব্যাক',
      fn: () => navigate('contact'),
    },
  ];

  return (
    <>
      {/* ── Semi-transparent backdrop overlay ── */}
      <AnimatePresence>
        {isVisible && isOpen && (
          <motion.div
            key="fab-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 z-[29]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── FAB container ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="fab-container"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 z-30"
            style={{ width: 56, height: 56 }}
          >
            {/* ── Action buttons ── */}
            <AnimatePresence>
              {isOpen &&
                actions.map((item, i) => {
                  const Icon = item.icon;
                  const pos = ARC_POSITIONS[i];
                  const reverseDelay = (actions.length - 1 - i) * 0.04;

                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: pos.x,
                        y: pos.y,
                        transition: {
                          type: 'spring',
                          stiffness: 320,
                          damping: 24,
                          delay: i * 0.05,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 320,
                          damping: 24,
                          delay: reverseDelay,
                        },
                      }}
                      onClick={() => executeAction(item.fn)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="absolute bottom-[6px] right-[6px] flex items-center justify-center w-11 h-11 rounded-full cursor-pointer border bg-[var(--ink-1)] border-[var(--ink-border)] hover:bg-[var(--ink-2)] transition-colors duration-200"
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      }}
                      aria-label={item.label}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="text-[var(--text-cream)]"
                      />

                      {/* Tooltip – Bengali label on hover */}
                      <AnimatePresence>
                        {hoveredIndex === i && (
                          <motion.span
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] font-medium pointer-events-none"
                            style={{
                              backgroundColor: 'var(--ink-1)',
                              color: 'var(--text-cream)',
                              border: '1px solid var(--ink-border)',
                              fontFamily:
                                'var(--font-bengali), Tiro Bangla, serif',
                            }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
            </AnimatePresence>

            {/* ── Main FAB button ── */}
            <motion.button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
              style={{
                backgroundColor: 'var(--gold)',
                boxShadow: isOpen
                  ? '0 4px 20px rgba(201, 169, 110, 0.5)'
                  : '0 4px 16px rgba(201, 169, 110, 0.3)',
                transition: 'box-shadow 0.3s ease',
              }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              aria-label={
                isOpen
                  ? 'কুইক অ্যাকশন বন্ধ করুন'
                  : 'কুইক অ্যাকশন খুলুন'
              }
              aria-expanded={isOpen}
            >
              {/* Pulse-glow ring when collapsed */}
              {!isOpen && (
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                />
              )}

              {/* Plus icon – rotates 45° to become × when open */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="pointer-events-none"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
