'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Global command palette hook.
 *
 * Provides `isOpen`, `setIsOpen`, and `toggle`.
 * Listens for Cmd+K (Mac) / Ctrl+K (Windows) globally to open.
 * Escape is handled inside the CommandPalette component via cmdk.
 */

/* ─────────────── Shared state singleton ─────────────── */
let globalOpen: boolean = false;
let globalListeners: Set<(open: boolean) => void> = new Set();

function setGlobalOpen(open: boolean) {
  globalOpen = open;
  globalListeners.forEach((fn) => fn(open));
}

/* ─────────────── Hook ─────────────── */

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  /* Keep local state in sync with global */
  useEffect(() => {
    globalListeners.add(setIsOpen);
    setIsOpen(globalOpen);
    return () => {
      globalListeners.delete(setIsOpen);
    };
  }, []);

  const open = useCallback(() => setGlobalOpen(true), []);
  const close = useCallback(() => setGlobalOpen(false), []);
  const toggle = useCallback(() => setGlobalOpen(!globalOpen), []);

  /* Listen for Cmd+K / Ctrl+K globally */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setGlobalOpen(!globalOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, open, close, toggle, setIsOpen: setGlobalOpen as typeof setIsOpen };
}
