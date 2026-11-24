import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "@/lib/site";

/**
 * Production: everything is crawlable. Sign-in is kept out of the index with a
 * `noindex` meta tag, which crawlers can only see if the page is NOT disallowed here.
 * Any other host (staging, preview) blocks all crawling.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
