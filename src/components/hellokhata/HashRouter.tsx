'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

function getPageIdFromPathname(pathname: string): string {
  const clean = pathname.replace(/^\//, '').replace(/\/$/, '');
  return clean || 'home';
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
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>(() => getPageIdFromPathname(pathname));
  const [previousPage, setPreviousPage] = useState<string>('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync state with path updates (e.g. back/forward buttons or direct navigation)
  useEffect(() => {
    const pageId = getPageIdFromPathname(pathname);
    if (pageId !== currentPage) {
      setPreviousPage(currentPage);
      setCurrentPage(pageId);
      updateDocumentTitle(pageId);
    }
  }, [pathname, currentPage]);

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
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsNavigating(true);

    // Small delay for exit animation
    setTimeout(() => {
      setPreviousPage(currentPage);
      router.push(targetPath);
      setTimeout(() => {
        setIsNavigating(false);
      }, 50);
    }, 280);
  }, [currentPage, pathname, router]);

  return (
    <RouterContext.Provider
      value={{ currentPage, previousPage, navigate, isNavigating, searchOpen, setSearchOpen }}
    >
      {children}
    </RouterContext.Provider>
  );
}
