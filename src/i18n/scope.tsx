import type { ReactNode } from "react";
import type { Locale } from "./config";
import { getDict, type Dict } from "./dictionaries";
import { I18nProvider } from "./client";

export type Namespace = keyof Dict;

/** Namespaces every page sends (nav, language switcher, forms' shared labels, the 404 page). */
export const baseNamespaces = ["common", "nav", "app", "notFound"] as const satisfies readonly Namespace[];

export function pickDict(locale: Locale, ns: readonly Namespace[]): Partial<Dict> {
  const d = getDict(locale);
  return Object.fromEntries(ns.map((k) => [k, d[k]])) as Partial<Dict>;
}

/**
 * Sends only the listed dictionary namespaces to the client components below it, instead of the whole
 * dictionary (about 290 KB in Bangla) on every page. Server components keep using getDict directly.
 * In development, a client component that reads a namespace missing here throws a clear error.
 */
export function I18nScope({ locale, ns, children }: { locale: Locale; ns: readonly Namespace[]; children: ReactNode }) {
  return (
    <I18nProvider locale={locale} dict={pickDict(locale, ns)}>
      {children}
    </I18nProvider>
  );
}
