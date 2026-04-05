'use client';

import { create } from 'zustand';

export type Language = 'bn' | 'en';

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
}

const STORAGE_KEY = 'hellokhata-lang';

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bn') return stored;
  } catch {
    // localStorage not available
  }
  return 'bn';
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: 'bn',
  setLang: (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage not available
    }
    set({ lang });
  },
}));

/* Hydrate from localStorage on client mount */
if (typeof window !== 'undefined') {
  const stored = getInitialLang();
  useLanguageStore.setState({ lang: stored });
}
