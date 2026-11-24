import type { Metadata } from "next";
import { defaultLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { siteUrl } from "./site";

/** Absolute URL of a page in one locale. `path` is "/" for the home page or starts with "/". */
export const localeUrl = (locale: Locale, path: string) => `${siteUrl}/${locale}${path === "/" ? "" : path}`;

/** hreflang map for a path: one entry per locale plus x-default (Bangla, the default market). Used by pages and the sitemap. */
export function hreflangMap(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = localeUrl(l, path);
  languages["x-default"] = localeUrl(defaultLocale, path);
  return languages;
}

/**
 * Per-page metadata: self-referencing canonical (each locale canonicalises to itself, never bn → en),
 * reciprocal hreflang alternates, Open Graph and Twitter cards.
 */
export function pageMetadata(locale: Locale, path: string, title?: string, description?: string, opts: { noindex?: boolean } = {}): Metadata {
  const t = getDict(locale);
  const url = localeUrl(locale, path);
  const desc = description ?? t.meta.defaultDescription;
  const fullTitle = title ? t.meta.titleTemplate.replace("%s", title) : t.meta.defaultTitle;
  const image = { url: `${siteUrl}/${locale}/opengraph-image`, width: 1200, height: 630, alt: t.meta.ogImageAlt };

  return {
    title: title ?? { absolute: t.meta.defaultTitle },
    description: desc,
    alternates: { canonical: url, languages: hreflangMap(path) },
    openGraph: {
      type: "website",
      siteName: t.meta.siteName,
      title: fullTitle,
      description: desc,
      url,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [image] },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
