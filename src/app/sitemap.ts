import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { categorySlugs, featureSlugs } from "@/content/site";
import { hreflangMap, localeUrl } from "@/lib/metadata";

// Only indexable pages. Sign-in and the draft legal pages are noindex, so they are left out.
// No lastModified: a build timestamp on every URL would be inaccurate, and search engines learn to ignore inaccurate lastmod.
const paths = ["/", "/features", "/solutions", "/pricing", "/how-it-works", "/about", "/resources", "/contact", "/get-started", ...featureSlugs.map((s) => `/features/${s}`), ...categorySlugs.map((s) => `/solutions/${s}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: { languages: hreflangMap(path) },
    })),
  );
}
