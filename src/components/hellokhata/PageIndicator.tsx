'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHashRouter } from './HashRouter';
import { PAGES, getPageConfig } from '@/lib/pages';
import { cn } from '@/lib/utils';

export default function PageIndicator() {
  const { currentPage } = useHashRouter();

  const { pageIndex, pageConfig } = useMemo(() => {
    const idx = PAGES.findIndex((p) => p.id === currentPage);
    const config = getPageConfig(currentPage);
    return {
      pageIndex: idx >= 0 ? idx : 0,
      pageConfig: config ?? PAGES[0],
    };
  }, [currentPage]);

  const isDark = pageConfig.dark;
  const totalPages = PAGES.length;

  /* ─── Indicator position as percentage ─── */
  const indicatorPercent =
    totalPages > 1 ? (pageIndex / (totalPages - 1)) * 100 : 0;

  return (
    <div
      className={cn(
        'fixed top-[76px] left-0 right-0 z-35 h-[32px] hidden md:flex items-center transition-all duration-300 ease-out',
        'border-b',
        isDark
          ? 'bg-[rgba(13,15,14,0.85)] backdrop-blur-[12px] border-b-[var(--ink-border)]'
          : 'bg-[rgba(250,247,240,0.88)] backdrop-blur-[12px] border-b-[var(--canvas-border)]'
      )}
    >
      <div className="w-full max-w-[var(--site-max)] mx-auto px-6 flex items-center justify-between">
        {/* ─── Left: Breadcrumb label ─── */}
        <div className="flex items-center gap-1.5 min-w-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPage}
              initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'font-bengali text-[13px] truncate whitespace-nowrap transition-colors duration-300',
                isDark
                  ? 'text-[var(--text-cream-muted)]'
                  : 'text-[var(--text-muted)]'
              )}
            >
              {/* Home prefix for non-home pages */}
              {currentPage !== 'home' && (
                <>
                  <span
                    className={cn(
                      'opacity-50 transition-colors duration-300',
                      isDark ? 'text-[var(--text-cream-muted)]' : 'text-[var(--text-muted)]'
                    )}
                  >
                    হোম
                  </span>
                  <span
                    className={cn(
                      'mx-1.5 opacity-30',
                      isDark ? 'text-[var(--text-cream-muted)]' : 'text-[var(--text-muted)]'
                    )}
                  >
                    ›
                  </span>
                </>
              )}
              {/* Current page label */}
              <span className={cn('font-medium', isDark ? 'text-[var(--text-cream)]' : 'text-[var(--text-ink)]')}>
                {pageConfig.label}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ─── Center: Sliding gold indicator ─── */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
          <motion.div
            className="relative w-full h-0"
            initial={false}
          >
            {/* Gold dot indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              animate={{ left: `${indicatorPercent}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-[6px] h-[6px] rounded-full bg-[var(--gold)]"
                style={{
                  boxShadow: '0 0 6px var(--gold-glow), 0 0 12px var(--gold-glow-strong)',
                }}
              />
            </motion.div>

            {/* Thin gold trail behind the dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--gold-glow) 60%, var(--gold) 100%)',
              }}
              animate={{ width: `${indicatorPercent}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>

        {/* ─── Right: Page counter ─── */}
        <div
          className={cn(
            'font-body text-[11px] tracking-wide whitespace-nowrap shrink-0 transition-colors duration-300',
            isDark ? 'text-[var(--text-cream-muted)] opacity-50' : 'text-[var(--text-ghost)]'
          )}
        >
          {currentPage !== 'home' ? (
            <>
              page{' '}
              <span className="text-[var(--gold)] font-medium">
                {pageIndex + 1}
              </span>
              {' '}of{' '}
              {totalPages}
            </>
          ) : (
            <span className="opacity-0">page 1 of {totalPages}</span>
          )}
        </div>
      </div>
    </div>
  );
}
