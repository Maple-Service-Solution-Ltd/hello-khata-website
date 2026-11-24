# 10 · Remaining issues and access needed

## Remaining issues

| # | Severity | Issue | Owner | Blocked on |
|---|---|---|---|---|
| R1 | **Critical until deployed** | The live site still serves localhost canonicals and sitemap. The fix is in code only. | Dev/ops | Deploy access |
| R2 | Medium | `www.hellokhata.com` does not resolve | Ops | DNS access |
| R3 | Medium | No GSC, GA4, GTM or Bing | Marketing / ops | Google and Microsoft accounts, DNS |
| R4 | Medium | Home HTML 1.26 MB; CWV unmeasured on real users | Dev | Live PSI/CrUX data, then an art-pipeline decision |
| R5 | Medium | H1s are slogans without the category term | Product / brand | Copy sign-off (05-B) |
| R6 | Medium | Prescription OCR fields unconfirmed, which blocks a dedicated landing page | Product | Confirmation |
| R7 | Low | Privacy and terms are drafts, noindex | Legal | Review |
| R8 | Low | No Organization `logo` (placeholder icon) | Brand | Final logo files |
| R9 | Low | App store links empty | Product | Store listings |
| R10 | Low | OG image is English-only | Dev | Decide; bundle a Bengali TTF |
| R11 | Low | 404 shell client-rendered (status and noindex correct) | Dev | — |
| R12 | Info | Keyword priorities are estimates | Marketing | Keyword Planner / GSC data |
| R13 | Info | `operatingSystem: "Web, Mobile"` in the schema is generic | Product | Confirm Android/iOS availability |
| R14 | Info | A second copy of the app exists in `hellokhata-web/` (older). Make sure it is not what gets deployed. | Dev | — |

## Access needed

| Access | Why | Minimum scope |
|---|---|---|
| Hosting / deploy pipeline for hellokhata.com (nginx on Ubuntu, per the response headers) | Deploy the fix; set `NEXT_PUBLIC_SITE_URL` | Deploy + environment variables |
| DNS for hellokhata.com | GSC Domain verification TXT; `www` record + redirect | Add TXT / CNAME records |
| Google Search Console | Verify, submit sitemap, inspect URLs, read performance | Owner (to add others) |
| Google Analytics 4 + Tag Manager | Create the container and property, configure events | Editor / Publish |
| Google Ads (Keyword Planner) | Real Bangladesh volume ranges for 02 | Any account; no spend required |
| Bing Webmaster Tools | Import from GSC | Microsoft account |
| Facebook page / LinkedIn admin | Link profiles to the site; keep `sameAs` accurate | Page admin |
| Product team | Confirm `capabilities.ts` statuses and OCR fields; app store URLs | — |
| Bangla editor | Review the new bn titles and descriptions | — |
| Optional: Ahrefs or Semrush | Competitor keyword and backlink data | Read-only seat |
