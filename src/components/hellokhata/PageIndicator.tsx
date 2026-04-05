'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHashRouter } from './HashRouter';
import { PAGES, getPageConfig } from '@/lib/pages';
import { cn } from '@/lib/utils';

export default function PageIndicator() {
  const { currentPage, navigate } = useHashRouter();

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

  const handlePageClick = useCallback(
    (pageId: string) => {
      navigate(pageId);
    },
    [navigate]
  );

  return (
    <div
      className={cn(
        'fixed top-[76px] left-0 right-0 z-35 h-[32px] hidden md:flex items-center transition-all duration-300 ease-out',
        'border-b',
        isDark
          ? 'bg-[rgba(13,15,14,0.85)] backdrop-blur-[12px] border-b-[var(--ink-border)]'
          : 'bg-[rgba(250,247,240,0.92)] backdrop-blur-[12px] border-b-[var(--canvas-border)]'
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
              {currentPage !== 'home' && (
                <>
                  <button
                    onClick={() => handlePageClick('home')}
                    className={cn(
                      'opacity-50 hover:opacity-80 transition-opacity cursor-pointer',
                      isDark ? 'text-[var(--text-cream-muted)]' : 'text-[var(--text-muted)]'
                    )}
                  >
                    হোম
                  </button>
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
              <span
                className={cn(
                  'font-medium',
                  isDark ? 'text-[var(--text-cream)]' : 'text-[var(--text-ink)]'
                )}
              >
                {pageConfig.icon} {pageConfig.label}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ─── Center: Page dot navigation ─── */}
        <div className="hidden lg:flex items-center gap-1.5">
          {PAGES.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => handlePageClick(page.id)}
              className={cn(
                'relative transition-all duration-300 cursor-pointer rounded-full',
                idx === pageIndex
                  ? 'w-6 h-[6px]'
                  : 'w-[6px] h-[6px] hover:w-4'
              )}
              style={{
                backgroundColor:
                  idx === pageIndex
                    ? 'var(--gold)'
                    : isDark
                      ? 'var(--ink-border-strong)'
                      : 'var(--canvas-border-strong)',
                boxShadow:
                  idx === pageIndex
                    ? '0 0 6px var(--gold-glow), 0 0 12px var(--gold-glow-strong)'
                    : 'none',
              }}
              aria-label={`Go to ${page.label}`}
              title={`${page.icon} ${page.label}`}
            />
          ))}
        </div>

        {/* ─── Right: Page counter ─── */}
        <div
          className={cn(
            'font-body text-[11px] tracking-wide whitespace-nowrap shrink-0 transition-colors duration-300',
            isDark
              ? 'text-[var(--text-cream-muted)] opacity-50'
              : 'text-[var(--text-ghost)]'
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
