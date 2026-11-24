# 04 · Site architecture

## URL model

- `https://hellokhata.com/{locale}{path}` with `locale` ∈ `bn` (default) and `en`. There is no trailing slash.
- `/` redirects with a 307 to `/bn`, or to `/en` when the `HK_LOCALE` cookie says so (`src/middleware.ts`). Accept-Language is deliberately ignored.
- Each locale's canonical points to itself. hreflang: `bn-BD`, `en`, and `x-default` → bn.
- Only `https://hellokhata.com` is indexable. Any other `NEXT_PUBLIC_SITE_URL` (staging, preview) gets `noindex, nofollow` plus `Disallow: /`.

## Tree (indexable)

```
/{bn,en}
├── /features                 hub → 9 feature pages
│   ├── /sales                POS & billing
│   ├── /inventory
│   ├── /purchases
│   ├── /expenses
│   ├── /customers            digital baki khata
│   ├── /reports
│   ├── /assistant            voice AI
│   ├── /sms                  (part of Super Shop)
│   └── /multi-branch         (part of Super Shop)
├── /solutions                hub → 6 segment pages
│   ├── /grocery              live
│   ├── /pharmacy             live
│   ├── /supershop            live
│   ├── /online-store         PLANNED
│   ├── /f-commerce           PLANNED
│   └── /other                live (core app)
├── /pricing
├── /how-it-works
├── /about
├── /resources                help center (FAQPage)
├── /contact
└── /get-started              sign-up wizard
noindex: /sign-in, /privacy, /terms (draft legal)
```

## Linking

- Header nav and the features mega-menu link to the hubs and to every detail page.
- The footer links all 9 features, all 6 solutions, pricing, the company pages and help.
- Detail pages carry breadcrumbs (visible plus BreadcrumbList JSON-LD), related-feature cards and solution links.
- Hubs link to every child page, so every page is within 2 clicks of home.

## Structured data (one `@graph` per script)

| Where | Nodes |
|---|---|
| Every page (`[locale]/layout.tsx`) | `Organization` (`@id` `/#organization`) + `WebSite` (`/#website`, publisher → org) |
| Home | `SoftwareApplication` (`/#software`): BDT `Offer`s for Mini/Basic/Premium/Intelligence, read from `src/content/pricing.ts`. Enterprise is excluded because it has no list price. |
| Feature and solution detail pages | `BreadcrumbList`: HelloKhata › Features/Solutions › page |
| /resources | `FAQPage` (pre-existing) |

There are no `aggregateRating` or `review` nodes. None are verified, and fabricating them would violate Google's policies. As a result the SoftwareApplication node won't get star rich results, which is expected and fine.

## Code map

| Concern | File |
|---|---|
| Origin, production guard | `src/lib/site.ts` (`productionUrl`, `siteUrl`, `isProductionSite`) |
| Page metadata, canonical, hreflang, OG and Twitter | `src/lib/metadata.ts` (`pageMetadata`, `hreflangMap`, `localeUrl`) |
| JSON-LD builders | `src/lib/structured-data.ts`, `src/components/seo/JsonLd.tsx` |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Localised 404 | `src/app/[locale]/[...rest]/page.tsx` → `[locale]/not-found.tsx` |
| Copy | `messages/{bn,en}.json`: `meta.*`, `features.items.*.seoTitle/seoDescription`, `solutions.items.*.seoTitle/seoDescription` |

## Future URL slots

Create these only when the conditions in 05 are met.
- `/{locale}/solutions/pharmacy/prescription-reading`, or `/features/prescription-reading`: a candidate, once the OCR fields are confirmed.
- `/{locale}/guides/...`: an informational hub, once there are writers (see 06).
- Keep English slugs for both locales. Bangla URL slugs add encoding noise and no ranking benefit. The Bangla title and H1 carry the language signal.
