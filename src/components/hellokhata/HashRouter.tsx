'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/* ─────────────── Context ─────────────── */

interface RouterContextType {
  currentPage: string;
  navigate: (page: string) => void;
  isNavigating: boolean;
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'home',
  navigate: () => {},
  isNavigating: false,
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

/* ─────────────── Provider ─────────────── */

interface HashRouterProps {
  children: React.ReactNode;
}

export function HashRouter({ children }: HashRouterProps) {
  const [currentPage, setCurrentPage] = useState<string>(() => getHashPage());
  const [isNavigating, setIsNavigating] = useState(false);

  /* Sync from hash changes */
  useEffect(() => {
    const handleHashChange = () => {
      setIsNavigating(true);
      // Small delay so exit animation can start before content swap
      setTimeout(() => {
        setCurrentPage(getHashPage());
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        setTimeout(() => setIsNavigating(false), 50);
      }, 300);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((page: string) => {
    const newHash = page === 'home' ? '' : page;
    const currentHash = window.location.hash.replace('#', '');

    if (currentHash === newHash) {
      // Same page — just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = newHash;
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigate, isNavigating }}>
      {children}
    </RouterContext.Provider>
  );
}
