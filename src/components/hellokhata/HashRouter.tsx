'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getPageConfig } from '@/lib/pages';

/* ─────────────── Context ─────────────── */

interface RouterContextType {
  currentPage: string;
  previousPage: string;
  navigate: (page: string) => void;
  isNavigating: boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'home',
  previousPage: 'home',
  navigate: () => {},
  isNavigating: false,
  searchOpen: false,
  setSearchOpen: () => {},
});

export function useHashRouter() {
  return useContext(RouterContext);
}

/* ─────────────── Helpers ─────────────── */

function getHashPage(): string {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return hash || 'home';
}

function updateDocumentTitle(pageId: string) {
  const config = getPageConfig(pageId);
  if (config) {
    document.title = config.title;
  }
}

/* ─────────────── Provider ─────────────── */

interface HashRouterProps {
  children: React.ReactNode;
}

export function HashRouter({ children }: HashRouterProps) {
  const [currentPage, setCurrentPage] = useState<string>(() => getHashPage());
  const [previousPage, setPreviousPage] = useState<string>('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isNavigatingRef = useRef(false);

  /* Sync from hash changes (browser back/forward) */
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getHashPage();
      if (newPage === currentPage) return;

      setIsNavigating(true);
      isNavigatingRef.current = true;

      setTimeout(() => {
        setPreviousPage(currentPage);
        setCurrentPage(newPage);
        updateDocumentTitle(newPage);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        setTimeout(() => {
          setIsNavigating(false);
          isNavigatingRef.current = false;
        }, 50);
      }, 300);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  /* Set initial title on mount */
  useEffect(() => {
    updateDocumentTitle(currentPage);
  }, [currentPage]);

  /* Keyboard shortcut: Cmd/Ctrl + K for search */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const navigate = useCallback((page: string) => {
    const newHash = page === 'home' ? '' : page;
    const currentHash = window.location.hash.replace('#', '');

    if (currentHash === newHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsNavigating(true);
    isNavigatingRef.current = true;

    // Small delay for exit animation
    setTimeout(() => {
      setPreviousPage(currentPage);
      window.location.hash = newHash;
      // hashchange event will handle the rest
    }, 280);
  }, [currentPage]);

  return (
    <RouterContext.Provider
      value={{ currentPage, previousPage, navigate, isNavigating, searchOpen, setSearchOpen }}
    >
      {children}
    </RouterContext.Provider>
  );
}
