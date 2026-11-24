# 02 · Keyword research — Bangladesh (bn, en, mixed)

**No search volumes, CPC, difficulty or ranking figures appear in this document.** None were available from a verified source: no Search Console data exists yet (the site has none set up), and no paid keyword tool was connected.

Priority labels (P1–P3) are **estimates**. They come from:
- search intent;
- product fit;
- the competitors that already target each term (see 03).

Validate them with Google Keyword Planner (needs a Google Ads account), Search Console impressions after launch, or a paid tool such as Ahrefs or Semrush (see 10).

## How people in Bangladesh phrase these searches

- **Three scripts for one intent.**
  - Bangla script: "বাকির খাতা অ্যাপ".
  - Romanised Bangla: "bakir khata app", "hisab rakhar app".
  - English: "khata app Bangladesh".
  - Code-mixed Bangla with English nouns: "দোকানের POS সফটওয়্যার", "ফার্মেসি ম্যানেজমেন্ট সফটওয়্যার".
- English loanwords are normally written as-is, even in Bangla queries: POS, software, app, stock, inventory, SMS, F-commerce.
- Many devices default to an English keyboard, so romanised and English queries are common even from Bangla speakers. That is why the English pages matter for a Bangladeshi audience, not just for foreigners.
- "Khata" / "খাতা" (ledger), "baki" / "বাকি" (credit given to customers) and "hisab" / "হিসাব" (accounts) are the core vocabulary of the grocery-shop segment.

## Keyword map

The columns are: cluster, example queries (bn / romanised / en), intent, target page, product status (from `src/content/capabilities.ts`) and priority (estimate).

### A. Digital khata / baki / shop accounts — core, live

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| বাকির খাতা অ্যাপ, ডিজিটাল বাকির খাতা, বাকি হিসাব রাখার অ্যাপ | Find a credit-ledger app | `/bn/features/customers` | Live | P1 |
| digital khata app, baki khata app, khata app Bangladesh | same (en / romanised) | `/en/features/customers` | Live | P1 |
| দোকানের হিসাব রাখার অ্যাপ, ব্যবসার হিসাব রাখার অ্যাপ, hisab rakhar app | Shop accounting app | `/bn/solutions/grocery`, `/bn` | Live | P1 |
| মুদি দোকানের হিসাব, মুদি দোকান সফটওয়্যার, grocery shop software Bangladesh | Grocery-specific | `/{bn,en}/solutions/grocery` | Live | P1 |

### B. POS / billing / inventory — live

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| POS সফটওয়্যার, দোকানের POS, POS software Bangladesh, POS software price in Bangladesh | Commercial | `/features/sales`, `/pricing` | Live | P1 |
| স্টক ম্যানেজমেন্ট সফটওয়্যার, ইনভেন্টরি সফটওয়্যার, inventory management software Bangladesh | Commercial | `/features/inventory` | Live | P2 |
| বিলিং সফটওয়্যার, মেমো / ক্যাশ মেমো সফটওয়্যার, billing software Bangladesh | Commercial | `/features/sales` | Live | P2 |
| দৈনিক খরচের হিসাব, ব্যবসার খরচের হিসাব | Informational / commercial | `/features/expenses` | Live | P3 |
| বিক্রির রিপোর্ট, লাভ ক্ষতির হিসাব | Informational | `/features/reports` + future guide | Live | P3 |

### C. Pharmacy — live, including prescription OCR and batch/expiry

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| ফার্মেসি ম্যানেজমেন্ট সফটওয়্যার, ফার্মেসি সফটওয়্যার, ওষুধের দোকানের সফটওয়্যার | Commercial | `/bn/solutions/pharmacy` | Live | P1 |
| pharmacy management software Bangladesh, pharmacy POS software BD, medicine shop software | Commercial | `/en/solutions/pharmacy` | Live | P1 |
| ওষুধের মেয়াদ ট্র্যাকিং, medicine expiry tracking software | Feature | pharmacy page section, later its own page | Live | P2 |
| প্রেসক্রিপশন স্ক্যান / prescription OCR Bangla | Feature, novel | pharmacy page, later its own page | Live (fields still to be confirmed by the product team) | P2 |
| model pharmacy software / মডেল ফার্মেসি সফটওয়্যার | Regulatory-driven | future guide page (only after confirming DGDA requirements) | — | P3 |

### D. Super shop / multi-branch — live

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| সুপারশপ সফটওয়্যার, সুপার শপ POS, super shop software Bangladesh, super shop POS software | Commercial | `/{bn,en}/solutions/supershop` | Live | P1 |
| multi branch POS software, একাধিক শাখার সফটওয়্যার | Commercial | `/features/multi-branch` | Live | P2 |
| retail ERP Bangladesh, HRM software for shop | Commercial | supershop page | Live | P3 |

### E. Bulk SMS — live, part of Super Shop

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| বাল্ক এসএমএস, bulk SMS Bangladesh, bulk SMS service BD, বাকির রিমাইন্ডার এসএমএস | Commercial (crowded with SMS gateways) | `/features/sms` | Live | P3: a lot of SMS-gateway competition; aim for "due reminder SMS" long-tail |

### F. Voice / AI assistant — live

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| বাংলা ভয়েস অ্যাসিস্ট্যান্ট ব্যবসা, AI business assistant Bangla, কথা বলে হিসাব | Emerging, low competition | `/features/assistant` | Live | P2: little competition and a strong differentiator |

### G. Online store builder — PLANNED

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| ই-কমার্স ওয়েবসাইট বানানো, ecommerce website builder Bangladesh, online shop website BD | Commercial | `/solutions/online-store` (honest "planned" page / waitlist) | **Planned** | P3 until launch: do not build more pages yet |

### H. F-commerce — PLANNED

| Queries | Intent | Target | Status | Priority (est.) |
|---|---|---|---|---|
| এফ-কমার্স সফটওয়্যার, ফেসবুক পেজের অর্ডার ম্যানেজমেন্ট, F-commerce software Bangladesh, Facebook page inbox management | Commercial | `/solutions/f-commerce` (honest "planned" page) | **Planned** | P3 until launch |

### I. Brand

| Queries | Notes |
|---|---|
| HelloKhata, hello khata, হ্যালো খাতা, hellokhata app | A web search for "hellokhata" on 2026-11-24 returned no HelloKhata results. The brand has no search footprint yet, so brand SERP work (GSC, Organization schema, social profiles, app listings) comes first. Note: "হ্যালো খাতা" in Bangla script is already used in the assistant H1. |

## Long-tail / informational ideas

Write these as guides only when someone qualified can write them accurately.
- "কীভাবে দোকানের বাকির হিসাব রাখবেন" (how to keep track of shop credit)
- "খাতা থেকে অ্যাপে হিসাব নেওয়ার উপায়" (moving from a paper ledger to an app)
- "মুদি দোকানের দৈনিক হিসাব" (daily accounts for a grocery shop)
- "ফার্মেসিতে ওষুধের মেয়াদ কীভাবে ট্র্যাক করবেন" (tracking medicine expiry in a pharmacy)
- "সুপারশপে একাধিক শাখার স্টক মেলানো" (reconciling stock across super shop branches)
- "POS software price in Bangladesh": a comparison and buyer's-guide intent. Answer it on `/pricing` with clear prices, which the page already has.

## Next step to replace estimates with data

1. Verify the domain in Search Console, then wait 4–8 weeks for impressions.
2. Run the clusters above through Keyword Planner with location = Bangladesh and language = Bengali + English.
3. Re-rank P1–P3 with real data, and record the source and date next to each number.
