# 08 · Analytics plan

## Current state (checked 2026-11-24)

| Tool | Code in repo | Live site |
|---|---|---|
| Google Search Console | No verification meta | No verification meta found. A DNS TXT record is possible; check in GSC. |
| GA4 (gtag) | None | None |
| Google Tag Manager | None | None |
| Bing Webmaster Tools | No `msvalidate.01` | None |
| Meta Pixel / others | None | None |

Nothing exists yet, so there is no risk of duplicate scripts. **Add exactly one tag loader.** Recommendation: GTM, with GA4 configured inside it, so you never add both gtag.js and GTM.

## Setup steps (need access, see 10)

1. **Search Console.** Add a Domain property `hellokhata.com` and verify it with a DNS TXT record (preferred: no code, covers http/https/www). Submit `https://hellokhata.com/sitemap.xml`. Use URL Inspection on `/bn`, `/en`, `/bn/solutions/pharmacy`.
2. **Bing Webmaster Tools.** Import from GSC (no code needed). Submit the sitemap.
3. **GTM + GA4.**
   - Load GTM with `next/script` (`strategy="afterInteractive"`) in `src/app/[locale]/layout.tsx`, behind an env var (`NEXT_PUBLIC_GTM_ID`). Render nothing when it is unset, so dev and staging send no data.
   - Inside GTM, add a GA4 Configuration tag. Set the `language` user property from `<html lang>`.
   - Consent: if you add a consent banner, use Consent Mode v2 defaults set to denied until accepted.
4. **If a meta-tag verification is preferred** over DNS, add `verification: { google: "...", other: { "msvalidate.01": "..." } }` to `generateMetadata` in the layout. Never hard-code a token without the account owner's confirmation.

## Events to track (GA4)

| Event | Trigger | Parameters |
|---|---|---|
| `sign_up_start` | Get-started wizard step 1 shown | locale, segment |
| `sign_up_submit` | Wizard submit (only when the API is connected; today forms return "not connected") | locale, segment, plan |
| `contact_submit` | Contact form submit | locale, topic |
| `click_call` / `click_whatsapp` / `click_email` | `tel:` / `wa.me` / `mailto:` links | locale, location (footer/contact) |
| `language_switch` | LanguageSwitcher click | from, to |
| `pricing_plan_click` | Plan CTA | plan, billing (monthly/yearly) |
| `demo_interact` | First interaction with a demo (voice demo, app preview) | demo |

Mark `sign_up_submit`, `contact_submit` and `click_whatsapp` as key events.

## Reporting

- GSC: impressions and clicks by page and query, segmented by country = Bangladesh. Compare `/bn/*` against `/en/*`.
- GA4: conversions by landing page and locale.
- Review monthly. Record numbers with date and source. Never estimate them.
