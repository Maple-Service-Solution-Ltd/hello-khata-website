# 01 · SEO audit — HelloKhata website

Audit date: 2026-11-24. Scope: every public route under `src/app/[locale]/`, in bn and en (54 URLs), plus `robots.txt`, `sitemap.xml`, the live site at `https://hellokhata.com` and a local production build (`npm run build:preview`, served on :3200).

Method:
- A script fetched every URL with a Googlebot user agent.
- It pulled the status, `<html lang>`, title, description, canonical, hreflang, robots meta, H1s, JSON-LD types, OG/Twitter tags and HTML weight.
- Raw before/after JSON was kept outside the repo. The figures below come from it.

Severity: **Critical** blocks correct indexing. **High** materially limits rankings or eligibility. **Medium** is worth fixing soon. **Low** is polish.

## Findings

| # | Severity | Finding | Evidence (before) | Status |
|---|---|---|---|---|
| 1 | **Critical** | Production canonicals, hreflang, sitemap URLs, OG URLs and the robots `Sitemap:` line all pointed at `http://localhost:3000`. `siteUrl` fell back to localhost when `NEXT_PUBLIC_SITE_URL` was unset at build time. | Live `https://hellokhata.com/` served `<link rel="canonical" href="http://localhost:3000/bn">`, and its robots.txt had `Sitemap: http://localhost:3000/sitemap.xml` (checked 2026-11-24). | **Fixed.** Production builds now default to `https://hellokhata.com`. Needs a redeploy. |
| 2 | **High** | Title tags were one- or two-word labels with no search terms: "ফার্মেসি · HelloKhata", "Pharmacy · HelloKhata", "Inventory · HelloKhata", "মূল্য · HelloKhata". The About page title repeated the brand: "About HelloKhata · HelloKhata". | Before: 18–36 chars, no category terms. | **Fixed.** Every page has a localised, intent-matched title (see 05). |
| 3 | **High** | No WebSite, SoftwareApplication or BreadcrumbList structured data. Only Organization existed, without an `@id`. | JSON-LD on every page: `Organization` only, plus `FAQPage` on /resources. | **Fixed.** One `@graph`: Organization (with `@id`) + WebSite on every page, SoftwareApplication with BDT offers on home, BreadcrumbList on all 15 feature/solution detail pages. |
| 4 | **High** | Feature and solution meta descriptions were slogan + lead joined together. They did not say what the product is, and some ran to 219 chars. | e.g. en f-commerce 219 chars. | **Fixed.** Purpose-written `seoDescription` per page, 97–191 chars. |
| 5 | **High** | Planned products (online store builder, F-commerce tools) had titles that read as live products. | "Online Seller · HelloKhata", "F-Commerce Seller · HelloKhata" | **Fixed.** Titles and descriptions say "Planned" / "পরিকল্পিত" and "Not available yet", matching `src/content/capabilities.ts`. |
| 6 | **High** | `robots.txt` disallowed `/bn/sign-in` and `/en/sign-in`. Those pages carry `noindex`, which crawlers cannot see if crawling is blocked, so the URLs could still be indexed from links. | `Disallow: /bn/sign-in` | **Fixed.** Crawling allowed; `noindex, follow` stays. |
| 7 | **High** | Staging or preview deployments would be fully indexable, with no guard. | — | **Fixed.** When `siteUrl` ≠ `https://hellokhata.com`, the layout emits `noindex, nofollow` and robots.txt is `Disallow: /`. |
| 8 | Medium | Sitemap had no `x-default` alternate, while page heads did. | — | **Fixed.** Sitemap and heads share one `hreflangMap()`. |
| 9 | Medium | Unknown URLs under a locale (e.g. `/bn/old-page`) returned Next's bare English 404 without the site layout or `lang`. | `/bn/nope` → title "404: This page could not be found." | **Fixed.** A `[locale]/[...rest]` catch-all calls `notFound()`. Status stays 404 + `noindex`, and the localised page renders with `lang="bn-BD"`. The HTML shell is client-rendered (see 10). |
| 10 | Medium | **Core Web Vitals risk: HTML weight.** Home is 1.26 MB of HTML (≈280 KB gzipped), with ~1,940 `<path>` elements and ~4,100 elements in total. About is ~690 KB and solution pages 380–640 KB. About 685 KB of the home HTML is the RSC flight payload, which repeats the server-rendered SVG art. | Measured on the production build. | **Open.** Needs an art-pipeline change; see 07 and 10. |
| 11 | Medium | H1s are brand slogans ("আপনার ব্যবসা, আপনার ভাষায়।", "Every branch, in one view."). The category term sits in the eyebrow just above, not in the H1. Every page has exactly one H1, so structure is fine. | — | **Open (copy decision).** Proposed H1s are in 05. |
| 12 | Medium | No analytics, Search Console or Bing verification anywhere in code or on the live site. | No gtag/GTM/verification tags found. | **Open.** Needs access; see 08. |
| 13 | Medium | `www.hellokhata.com` does not resolve. Anyone typing www gets an error. | `curl https://www.hellokhata.com` → no response. | **Open (DNS).** Add a DNS record + 301 to the apex. |
| 14 | Low | OG image is Latin-only for both locales. That was deliberate, because the OG renderer has no Bengali font. Bangla shares show an English card. | `opengraph-image.tsx` | Open. Bundle a Bengali TTF into the OG route if wanted. |
| 15 | Low | Organization has no `logo`, because the icon is a placeholder (README). | — | Open until the brand assets are final. |
| 16 | Low | Twitter title had no brand suffix, unlike OG, and the OG image alt was hard-coded. | — | **Fixed.** |
| 17 | Low | Root `/` returns a 307 to `/bn` (or the cookie locale). That is acceptable for a cookie-adaptive root, and x-default points to `/bn`. | — | No change. |

## What was already right

- `<html lang>` is `bn-BD` on Bangla pages and `en` on English pages, set in `[locale]/layout.tsx`.
- Canonicals are self-referencing per locale. bn is never canonicalised to en.
- hreflang is generated uniformly for every page, so it is reciprocal by construction.
- The language switcher (`LanguageSwitcher.tsx`) maps `/bn/x` ↔ `/en/x` and carries `hreflang` and `lang` attributes.
- Internal linking is strong: the footer links every feature and solution, detail pages cross-link related features, and breadcrumbs appear on detail pages.
- No orphan pages: every sitemap URL is linked from the nav or footer.
- No `<img>` without alt. Decorative SVGs are `aria-hidden`; meaningful scenes use `role="img"` + `aria-label`.
- Draft legal pages and sign-in are `noindex, follow`.
- Fonts use `next/font` with `display: swap`. Handwriting, Arabic and digit fonts are not preloaded.
- The hero headline animates with CSS, so it paints before hydration (LCP-friendly).

## Route inventory (after fixes)

48 indexable URLs are in the sitemap: 24 paths × 2 locales. 6 URLs are noindex: sign-in, privacy and terms × 2. Full per-URL titles are in 05.
