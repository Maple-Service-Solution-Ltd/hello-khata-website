"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dict } from "./dictionaries";

type I18nValue = { locale: Locale; t: Dict };

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Development guard: reading a namespace the page did not send throws a clear error instead of a vague
 * "cannot read properties of undefined". Fix it by adding the namespace to that page's <I18nScope ns>.
 */
function guard(t: Dict): Dict {
  return new Proxy(t, {
    get(target, key, receiver) {
      if (typeof key === "string" && !(key in target) && !key.startsWith("$$") && key !== "then" && key !== "toJSON")
        throw new Error(`i18n: namespace "${key}" was not sent to the client on this page. Add it to the page's <I18nScope ns>.`);
      return Reflect.get(target, key, receiver);
    },
  });
}

/**
 * Provides translations to client components. Only the namespaces a page needs are sent (see I18nScope);
 * a nested provider adds its namespaces on top of the ones from the layout.
 */
export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Partial<Dict>; children: ReactNode }) {
  const parent = useContext(I18nContext);
  const value = useMemo(() => {
    const t = { ...parent?.t, ...dict } as Dict;
    return { locale, t: process.env.NODE_ENV === "production" ? t : guard(t) };
  }, [parent, dict, locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
