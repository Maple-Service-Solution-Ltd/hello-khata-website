'use client';

import { useLanguageStore } from '@/lib/language-store';
import { translations, getTranslation } from '@/lib/translations';
import type { Language } from '@/lib/language-store';

/* ── Recursive dot-path type helper ── */
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? T[K] extends readonly (infer _U)[] // handle string[] / readonly string[]
          ? K
          : `${K}.${NestedKeyOf<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

/**
 * `useTranslation` — lightweight i18n hook.
 *
 * @example
 * ```tsx
 * const { t, lang } = useTranslation();
 * <h1>{t('hero.headline')}</h1>         // returns string
 * <p>{t('hero.headline.0')}</p>         // first array element (if needed)
 * ```
 */
export function useTranslation() {
  const { lang } = useLanguageStore();

  /**
   * Resolve a dot-separated key to a string value.
   * Falls back to the raw key string when the path is not found.
   *
   * - `t('nav.home')`              → "হোম" | "Home"
   * - `t('hero.eyebrow')`          → "Voice-Powered · ..."
   * - `t('nonexistent.key')`       → "nonexistent.key"
   */
  function t(key: string): string {
    const value = getTranslation(lang, key);

    if (typeof value === 'string') {
      return value;
    }

    if (Array.isArray(value)) {
      // Join arrays with space when accessed as a single string
      return value.join(' ');
    }

    return key;
  }

  /**
   * Resolve a dot-separated key to a string array (for headlines, feature lists, etc.).
   * Returns `undefined` if the key is not an array.
   *
   * @example
   * ```tsx
   * const headline = tArray('hero.headline'); // ['খাতা এখন', 'কথা বলে।']
   * ```
   */
  function tArray(key: string): readonly string[] | undefined {
    const value = getTranslation(lang, key);
    return Array.isArray(value) ? value : undefined;
  }

  /**
   * Resolve a dot-separated key to its raw value (string | string[] | undefined).
   * Useful when you need the exact type without coercion.
   */
  function tRaw(key: string): string | readonly string[] | undefined {
    return getTranslation(lang, key);
  }

  return { t, tArray, tRaw, lang } as {
    t: (key: string) => string;
    tArray: (key: string) => readonly string[] | undefined;
    tRaw: (key: string) => string | readonly string[] | undefined;
    lang: Language;
  };
}

export type { NestedKeyOf };
