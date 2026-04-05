'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

/**
 * Global command palette hook.
 *
 * Provides `isOpen`, `setIsOpen`, and `toggle`.
 * Listens for Cmd+K (Mac) / Ctrl+K (Windows) globally to open.
 */

/* ─────────────── Shared state singleton ─────────────── */
let globalOpen: boolean = false;
let globalListeners: Set<() => void> = new Set();

function setGlobalOpen(open: boolean) {
  globalOpen = open;
  globalListeners.forEach((fn) => fn());
}

function subscribeToGlobalOpen(listener: () => void) {
  globalListeners.add(listener);
  return () => globalListeners.delete(listener);
}

function getGlobalOpenSnapshot() {
  return globalOpen;
}

/* ─────────────── Hook ─────────────── */

export function useCommandPalette() {
  const isOpen = useSyncExternalStore(subscribeToGlobalOpen, getGlobalOpenSnapshot);

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

  return { isOpen, open, close, toggle, setIsOpen: setGlobalOpen as typeof isOpen extends boolean ? (v: boolean) => void : never };
}
