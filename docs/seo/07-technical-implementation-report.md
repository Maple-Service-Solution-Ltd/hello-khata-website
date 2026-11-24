# 07 · Technical implementation report

All changes are in this working copy. The project is not a git repo, so nothing is committed. They take effect on the live site only after a rebuild and deploy.

## Changes

| File | Change | Fixes audit # |
|---|---|---|
| `src/lib/site.ts` | Adds `productionUrl = "https://hellokhata.com"`. `siteUrl` = `NEXT_PUBLIC_SITE_URL`, else productionUrl in production builds, else localhost in dev. Adds `isProductionSite`. | 1, 7 |
| `src/lib/metadata.ts` | Rewritten. `localeUrl()`, a shared `hreflangMap()` (bn-BD, en, x-default), and `pageMetadata()` with self canonical, OG + Twitter both with the brand suffix, a localised OG image alt and an optional `noindex`. | 1, 8, 16 |
| `src/lib/structured-data.ts` (new) | Builders: Organization (`@id`, areaServed BD), WebSite, SoftwareApplication (BDT offers from `pricingConfig`), BreadcrumbList. `jsonLdString()` emits a single `@graph` and escapes `<`. | 3 |
| `src/components/seo/JsonLd.tsx` (new) | Server component that renders a JSON-LD script. | 3 |
| `src/app/[locale]/layout.tsx` | The inline Organization object is replaced by `organizationJsonLd + websiteJsonLd`. Non-production hosts get `robots: noindex, nofollow`. | 3, 7 |
| `src/app/[locale]/page.tsx` | Adds SoftwareApplication JSON-LD. | 3 |
| `src/app/[locale]/features/[slug]/page.tsx` | Metadata uses `seoTitle` / `seoDescription`. Adds BreadcrumbList on all 9 pages, including the assistant page. | 2, 3, 4 |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Same for all 6 pages. The body moved into `SolutionBody` so the flagship pages also get the breadcrumb. | 2, 3, 4, 5 |
| `src/app/[locale]/[...rest]/page.tsx` (new) | Catch-all → `notFound()`, so unknown `/bn/*` and `/en/*` URLs get the localised 404 inside the layout. | 9 |
| `src/app/robots.ts` | Production: `Allow: /`, sitemap and host. The sign-in Disallow is removed so its `noindex` is seen. Non-production: `Disallow: /`. | 1, 6, 7 |
| `src/app/sitemap.ts` | Uses `localeUrl` + `hreflangMap`, which adds x-default. No fake `lastmod`. | 1, 8 |
| `messages/bn.json`, `messages/en.json` | New `defaultTitle` / `defaultDescription`. Retitled `meta.pages.*` (features, solutions, pricing, how-it-works, about, resources, contact, get-started). New `features.items.*.seoTitle/seoDescription` (9) and `solutions.items.*.seoTitle/seoDescription` (6). New `meta.homeCrumb` and `meta.ogImageAlt`. Keys are identical in both files (enforced by `Dict` typing). | 2, 4, 5 |

The art and animations were not touched: no file under `components/illustrations`, `components/home/Hero*` or `StreetScene` changed.

## Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass (no output) |
| `npx eslint src` | Pass (no output) |
| `npm run build:preview` | Pass. 60 static pages; `[locale]/[...rest]` is dynamic (ƒ). |
| Crawl of 54 URLs (Googlebot UA, production build on :3200) | 48 indexable URLs with keyword titles and self canonicals on `https://hellokhata.com`; 6 noindex (sign-in, privacy, terms × 2); all 200 |
| `robots.txt` | `Allow: /`, `Host: https://hellokhata.com`, `Sitemap: https://hellokhata.com/sitemap.xml` |
| `sitemap.xml` | 48 `<loc>`, each with bn-BD, en and x-default alternates |
| JSON-LD | Home: SoftwareApplication + Organization + WebSite. Detail pages: BreadcrumbList + Organization + WebSite. All parse as JSON. |
| `/bn/nope`, `/en/old/page` | HTTP 404, `noindex`; renders the "এই পেজটি খাতায় নেই।" page with `lang="bn-BD"` (checked in the browser) |
| Browser head check (`/en/solutions/pharmacy`) | canonical `https://hellokhata.com/en/solutions/pharmacy`; hreflang bn-BD/en/x-default; og:title/url/image/locale; twitter card; `lang="en"`; switcher `hreflang` links to `/bn/solutions/pharmacy` |

Before/after values for every URL are in 05 (the "Was" column).

## Known limitations

- **The 404 HTML shell is client-rendered.** Server HTML for unknown URLs is Next's error shell, and the localised page renders on the client. Status and noindex are correct, so this has no indexing impact.
- **HTML weight (CWV).** Not changed, to keep the art intact. Options, in order of safety:
  1. Make the large decorative scenes client components that render only after `requestIdleCallback`, with the same SVG. This removes them from the RSC payload but delays their paint, so confirm LCP is the headline and not the art.
  2. Move static parts of the skyline/street into a cached external `.svg` used via `<use href>`. This keeps the ink filters.
  3. Lazy-render below-the-fold scenes with `content-visibility: auto`. This is CSS only and the cheapest win; test it first.

  Measure with PageSpeed Insights on the deployed site before and after each change.
- **The domain is a default.** If production moves (e.g. to www), change `productionUrl` or set `NEXT_PUBLIC_SITE_URL` in the deploy environment.
