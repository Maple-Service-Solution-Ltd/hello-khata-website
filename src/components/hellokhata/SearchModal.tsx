'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Command } from 'lucide-react';
import { useHashRouter } from './HashRouter';
import { PAGES, getPageConfig } from '@/lib/pages';
import { cn } from '@/lib/utils';

/* ─── Recent pages storage (localStorage) ─── */
const RECENT_PAGES_KEY = 'hk-recent-pages';
const MAX_RECENT = 5;

function getRecentPages(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_PAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentPage(pageId: string) {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentPages().filter((id) => id !== pageId);
    recent.unshift(pageId);
    localStorage.setItem(RECENT_PAGES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // Silently fail
  }
}

/* ─── Inner component that remounts each time (resets state) ─── */
function SearchModalInner({
  currentPage,
  navigate,
  onClose,
}: {
  currentPage: string;
  navigate: (page: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* Filter pages based on query */
  const results = useMemo(() => {
    if (!query.trim()) {
      const recentIds = getRecentPages();
      const recentPages = recentIds
        .map((id) => getPageConfig(id))
        .filter(Boolean) as typeof PAGES;
      return recentPages.length > 0 ? recentPages : PAGES;
    }

    const q = query.toLowerCase();
    return PAGES.filter((page) => {
      const searchable = [
        page.id,
        page.label,
        page.labelEn,
        page.description,
        page.title,
        ...page.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(q);
    });
  }, [query]);

  /* Focus input on mount (after animation) */
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  /* Select a page and navigate */
  const handleSelect = useCallback(
    (pageId: string) => {
      addRecentPage(pageId);
      navigate(pageId);
      onClose();
    },
    [navigate, onClose]
  );

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex].id);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, handleSelect, onClose]
  );

  /* Scroll selected item into view */
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  /* Close on click outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'search-backdrop') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        id="search-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-[var(--ink)]/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[calc(100%-2rem)] max-w-[580px]"
      >
        <div className="bg-[var(--cream)] rounded-2xl border border-[var(--canvas-border)] shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Input row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--canvas-border)]">
            <Search
              size={20}
              strokeWidth={2}
              className="text-[var(--text-muted)] shrink-0"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="পৃষ্ঠা খুঁজুন..."
              className="flex-1 bg-transparent font-bengali text-[16px] text-[var(--text-ink)] placeholder:text-[var(--text-muted)] outline-none"
            />
            <div className="flex items-center gap-2">
              {!query && (
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--cream-2)] border border-[var(--canvas-border)] text-[11px] font-body text-[var(--text-muted)]">
                  <Command size={10} strokeWidth={2} />
                  K
                </kbd>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--cream-2)] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Results list */}
          <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
            {!query && (
              <div className="px-4 py-1.5">
                <span className="font-body text-[11px] text-[var(--text-ghost)] uppercase tracking-wider">
                  {getRecentPages().length > 0 ? 'সাম্প্রতিক' : 'সব পৃষ্ঠা'}
                </span>
              </div>
            )}

            {results.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="font-bengali text-[14px] text-[var(--text-muted)]">
                  কোনো ফলাফল পাওয়া যায়নি
                </p>
              </div>
            ) : (
              results.map((page, index) => {
                const isActive = page.id === currentPage;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={page.id}
                    onClick={() => handleSelect(page.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full flex items-center gap-4 px-5 py-3 text-left transition-colors cursor-pointer',
                      isSelected && 'bg-[var(--cream-2)]'
                    )}
                  >
                    <span className="text-[20px] shrink-0 w-8 text-center">
                      {page.icon}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bengali text-[15px] font-medium text-[var(--text-ink)]">
                          {page.label}
                        </span>
                        <span className="font-body text-[12px] text-[var(--text-muted)]">
                          {page.labelEn}
                        </span>
                        {isActive && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[rgba(201,169,110,0.12)] text-[10px] font-body font-medium text-[var(--gold)]">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-body text-[12px] text-[var(--text-muted)] truncate mt-0.5">
                        {page.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className={cn(
                        'shrink-0 transition-all duration-200',
                        isSelected
                          ? 'text-[var(--gold)] opacity-100'
                          : 'text-[var(--text-ghost)] opacity-0'
                      )}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--canvas-border)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-[var(--text-ghost)] font-body">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--cream-2)] border border-[var(--canvas-border)] text-[10px]">
                  ↑↓
                </kbd>
                নেভিগেট
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[var(--text-ghost)] font-body">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--cream-2)] border border-[var(--canvas-border)] text-[10px]">
                  ↵
                </kbd>
                নির্বাচন
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-ghost)] font-body">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--cream-2)] border border-[var(--canvas-border)] text-[10px]">
                esc
              </kbd>{' '}
              বন্ধ
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Search modal with AnimatePresence key-based remount ─── */
let searchCounter = 0;

export default function SearchModal() {
  const { currentPage, navigate, searchOpen, setSearchOpen } = useHashRouter();
  const [mountKey, setMountKey] = useState(0);

  const handleClose = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  /* Increment key when opening to force inner remount */
  const prevSearchOpen = useRef(searchOpen);
  if (searchOpen && !prevSearchOpen.current) {
    searchCounter++;
    setMountKey(searchCounter);
  }
  prevSearchOpen.current = searchOpen;

  return (
    <AnimatePresence>
      {searchOpen && (
        <SearchModalInner
          key={mountKey}
          currentPage={currentPage}
          navigate={navigate}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
}
