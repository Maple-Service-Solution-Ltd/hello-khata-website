# 09 · 90-day roadmap

Starts on the deploy date of this change. These are planned activities; no outcomes are promised.

## Days 0–14 — Fix indexing foundations

- [ ] **Deploy this change.** It is the localhost canonical fix, and it is critical. After deploy, check that `https://hellokhata.com/bn` has `canonical https://hellokhata.com/bn` and that robots.txt lists the hellokhata.com sitemap.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://hellokhata.com` in the production environment explicitly (belt and braces).
- [ ] DNS: add `www` and 301 it to the apex.
- [ ] Verify GSC (Domain property) and Bing. Submit the sitemap. Inspect and request indexing for home, pricing, grocery, pharmacy and super shop in both locales.
- [ ] Install GTM + GA4 once, with the events in 08.
- [ ] Confirm the product statuses in `capabilities.ts`, especially the prescription OCR fields.

## Days 15–45 — Content and on-page

- [ ] Decide on the H1 change (05-B) and apply it on the 8 listed pages.
- [ ] Bangla editor reviews the new titles and descriptions in `messages/bn.json`.
- [ ] Publish the Google Play / App Store listings when ready. Set `appLinks` in `src/lib/site.ts`, and add them to Organization `sameAs` and SoftwareApplication.
- [ ] Final logo → add `logo` to the Organization schema.
- [ ] Get legal to review privacy and terms, then remove noindex and add them to the sitemap.
- [ ] First 2–4 guides from the P1 clusters (06).
- [ ] Facebook page and LinkedIn: link to the matching bn/en pages (brand signals, referral traffic).

## Days 46–90 — Performance and growth

- [ ] Measure CWV on the live site (PageSpeed Insights, plus the CrUX report in GSC once data exists). Try `content-visibility: auto` on below-the-fold scenes first (07).
- [ ] Prescription-reading landing page, if confirmed (05-D).
- [ ] Re-prioritise keywords with real GSC and Keyword Planner data (02).
- [ ] Bengali-font OG image for Bangla shares (audit #14).
- [ ] Earn local, genuine mentions: business press, partner pages, trade associations. No paid links, no PBNs, no link schemes.
- [ ] Day-90 review: GSC coverage (all 48 URLs indexed?), queries per cluster, conversions per landing page.
