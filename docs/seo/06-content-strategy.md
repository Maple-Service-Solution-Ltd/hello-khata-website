# 06 · Content strategy

## Principles

1. **Bangla first, English as an equal.** Every page and article ships in both locales with identical keys (`messages/bn.json` = `messages/en.json`, type-checked). Write natural Bangla, not translated English, and use the loanwords people actually type: POS, স্টক, সফটওয়্যার, অ্যাপ.
2. **Only claim what ships.** Status comes from `src/content/capabilities.ts`: available / beta / planned. Planned features are labelled as planned in titles, descriptions and on-page badges. When a status changes, update `seoTitle` and `seoDescription` for that page too.
3. **No fabricated proof.**
   - No invented testimonials, ratings, user counts or "#1" claims. `TrustSection` stays empty until there are approved stories.
   - No ranking or traffic promises in any material.
4. **Helpful first.** Write for a shopkeeper deciding whether to switch from a paper khata, not for a keyword count.

## Pillars and clusters

| Pillar (hub) | Cluster pages (existing → future) | Audience |
|---|---|---|
| Digital khata and shop accounts | /features/customers, /solutions/grocery, /features/expenses → guides: moving from a paper khata, collecting baki politely, daily cash count | Grocery and retail owners |
| POS and inventory | /features/sales, /features/inventory, /features/purchases, /features/reports → guides: setting up products and units, low-stock routines | All retail |
| Pharmacy | /solutions/pharmacy → prescription reading page (after confirmation), expiry routines guide | Pharmacy owners |
| Super shop / chains | /solutions/supershop, /features/multi-branch, /features/sms → guides: branch stock transfers, staff roles | Multi-branch retailers |
| Voice/AI assistant | /features/assistant → "what can you ask" examples page | Everyone, the differentiator |
| Online and F-commerce | /solutions/online-store, /solutions/f-commerce (planned): **hold** | — |

## Formats

- **Guides** (`/{locale}/guides/<slug>`, new route when there are ≥3 ready):
  - 800–1,500 words;
  - screenshots from the real app, marked as sample data;
  - each one links to one feature page and one solution page.
- **Help center answers** (`/resources`): short Q&As, already marked up as FAQPage.
- **Video** on Facebook, where the audience is, embedded on the matching page with a transcript in the page language.

## Workflow

1. Pick a cluster query from 02 and confirm the intent by reading the current top results manually.
2. Product confirms the feature behaviour and status.
3. Draft in Bangla. Have a Bangla editor review it. Then write the English version.
4. Add internal links from the hub and one related page.
5. Ship, request indexing in GSC, and track impressions and clicks per page after 4–8 weeks.

## Cadence

Suggested, depending on team capacity: 2 guides per month for the first quarter. Prioritise P1 clusters (khata, grocery, pharmacy, POS).
