'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHashRouter } from './HashRouter';
import { PAGES } from '@/lib/pages';

export default function SidePageNav() {
  const { currentPage, navigate } = useHashRouter();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  /* ─── Derive active page index ─── */
  const activeIndex = PAGES.findIndex((p) => p.id === currentPage);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  /* ─── Derive dark/light from current page config ─── */
  const isDark = useMemo(() => {
    const config = PAGES[safeActiveIndex];
    return config?.dark ?? true;
  }, [safeActiveIndex]);

  /* ─── Click handler ─── */
  const handleDotClick = useCallback(
    (pageId: string) => {
      navigate(pageId);
    },
    [navigate],
  );

  /* ─── Keyboard: up/down arrows to navigate pages (only when no input focused) ─── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = safeActiveIndex < PAGES.length - 1 ? safeActiveIndex + 1 : 0;
        navigate(PAGES[next].id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = safeActiveIndex > 0 ? safeActiveIndex - 1 : PAGES.length - 1;
        navigate(PAGES[prev].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeActiveIndex, navigate]);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center"
      role="navigation"
      aria-label="Page navigation"
    >
      {/* ─── Vertical track with glass-morphism background ─── */}
      <div
        className="relative flex flex-col items-center gap-3 py-4 px-3 rounded-2xl"
        style={{
          background: isDark
            ? 'rgba(22, 25, 24, 0.6)'
            : 'rgba(250, 247, 240, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${isDark ? 'var(--ink-border)' : 'var(--canvas-border)'}`,
        }}
      >
        {PAGES.map((page, idx) => {
          const isActive = idx === safeActiveIndex;
          const isHovered = hoveredIndex === idx && !isActive;

          return (
            <button
              key={page.id}
              onClick={() => handleDotClick(page.id)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex items-center justify-center group cursor-pointer outline-none"
              aria-label={`Go to ${page.label} page`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* ─── Dot ─── */}
              <motion.span
                layout
                layoutId="sidenav-active"
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
                className="block rounded-full shrink-0"
                style={{
                  width: isActive ? 10 : 10,
                  height: isActive ? 10 : 10,
                  backgroundColor: isActive
                    ? 'var(--gold)'
                    : isHovered
                      ? 'var(--gold)'
                      : isDark
                        ? 'var(--ink-border-strong)'
                        : 'var(--ink-border-strong)',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: isActive
                    ? '0 0 8px var(--gold-glow), 0 0 16px var(--gold-glow-strong)'
                    : isHovered
                      ? '0 0 6px var(--gold-glow)'
                      : 'none',
                  transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                }}
              />

              {/* ─── Tooltip (appears to the LEFT of the dot) ─── */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ opacity: 0, x: 8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 28,
                    }}
                    className="absolute right-full mr-3 whitespace-nowrap pointer-events-none"
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                      style={{
                        background: 'var(--ink-1)',
                        border: '1px solid var(--ink-border)',
                      }}
                    >
                      {/* Icon (emoji) */}
                      <span className="text-sm leading-none">{page.icon}</span>

                      {/* Label (Bengali) */}
                      <span
                        className="font-bengali text-[13px] leading-none"
                        style={{
                          color: 'var(--text-cream)',
                        }}
                      >
                        {page.label}
                      </span>
                    </div>

                    {/* Tooltip arrow pointing right toward the dot */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-0 h-0"
                      style={{
                        borderLeft: '5px solid var(--ink-1)',
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
