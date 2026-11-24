# 05 · Page-by-page plan

## A. Titles now live in code (from the production build, 2026-11-24)

Titles come from `messages/{bn,en}.json`:
- `meta.pages.*.title`
- `features.items.*.seoTitle`
- `solutions.items.*.seoTitle`

`titleTemplate` appends " · HelloKhata". Each page also has its own description (see the JSON files). H1s were **not** changed. Section B proposes changes.

| URL | Title (now) | Was | Indexed | H1 (unchanged) |
|---|---|---|---|---|
| `/bn` | HelloKhata — POS, ডিজিটাল বাকির খাতা ও ব্যবসার হিসাবের অ্যাপ | HelloKhata — আপনার ব্যবসা, আপনার ভাষায় | yes | আপনার ব্যবসা,আপনার ভাষায়। |
| `/bn/features` | ফিচার — POS, স্টক, বাকি ও রিপোর্ট · HelloKhata | ফিচারসমূহ · HelloKhata | yes | ব্যবসার সারা দিনের কাজ, এক জায়গায়। |
| `/bn/solutions` | দোকান, ফার্মেসি ও সুপারশপের সফটওয়্যার · HelloKhata | ব্যবসার ধরন অনুযায়ী সমাধান · HelloKhata | yes | বাংলাদেশ আজ যেভাবে বিক্রি করে, তার জন্য একটি প্ল্যাটফর্ম। |
| `/bn/pricing` | মূল্য ও প্ল্যান — মাসে ৳১৯৯ থেকে · HelloKhata | মূল্য · HelloKhata | yes | যার যেমন ব্যবসা, তার তেমন প্ল্যান। |
| `/bn/how-it-works` | HelloKhata যেভাবে কাজ করে · HelloKhata | যেভাবে কাজ করে · HelloKhata | yes | প্রথম পণ্য থেকে প্রথম প্রশ্ন পর্যন্ত। |
| `/bn/about` | আমাদের সম্পর্কে — কেন HelloKhata · HelloKhata | HelloKhata সম্পর্কে · HelloKhata | yes | এমন ব্যবসা সফটওয়্যার, যা আপনার ভাষায় কথা বলে। |
| `/bn/resources` | সহায়তা কেন্দ্র ও সাধারণ প্রশ্ন · HelloKhata | সহায়তা কেন্দ্র · HelloKhata | yes | কীভাবে সাহায্য করতে পারি? |
| `/bn/contact` | যোগাযোগ — ডেমো ও সহায়তা · HelloKhata | যোগাযোগ · HelloKhata | yes | চলুন, আপনার ব্যবসা নিয়ে কথা বলি। |
| `/bn/get-started` | শুরু করুন — ১৪ দিন ফ্রি ট্রায়াল · HelloKhata | শুরু করুন · HelloKhata | yes | HelloKhata চালু করুন |
| `/bn/sign-in` | সাইন ইন · HelloKhata | সাইন ইন · HelloKhata | noindex | আবারও স্বাগতম |
| `/bn/privacy` | গোপনীয়তা নীতি · HelloKhata | গোপনীয়তা নীতি · HelloKhata | noindex | গোপনীয়তা নীতি |
| `/bn/terms` | শর্তাবলি · HelloKhata | শর্তাবলি · HelloKhata | noindex | শর্তাবলি |
| `/bn/features/sales` | POS ও বিলিং সফটওয়্যার · HelloKhata | বিক্রি ও বিল · HelloKhata | yes | বিক্রি হোক দ্রুত, হিসাব থাকুক নিখুঁত। |
| `/bn/features/inventory` | স্টক ও ইনভেন্টরি ব্যবস্থাপনা · HelloKhata | পণ্যের মজুত · HelloKhata | yes | না গুনেই জানুন তাকে কী আছে। |
| `/bn/features/purchases` | ক্রয় ও সরবরাহকারীর হিসাব · HelloKhata | ক্রয় ও সরবরাহকারী · HelloKhata | yes | জানুন মজুতের প্রকৃত খরচ কত। |
| `/bn/features/expenses` | দোকানের খরচের হিসাব · HelloKhata | খরচ ও লেনদেন · HelloKhata | yes | দেখুন টাকা কোথায় যাচ্ছে। |
| `/bn/features/customers` | ডিজিটাল বাকির খাতা — গ্রাহকের বকেয়া · HelloKhata | গ্রাহক ও বকেয়া · HelloKhata | yes | প্রতিটি বকেয়ার স্পষ্ট হিসাব। |
| `/bn/features/reports` | বিক্রি ও ব্যবসার রিপোর্ট · HelloKhata | প্রতিবেদন ও বিশ্লেষণ · HelloKhata | yes | আপনার ব্যবসা, সহজে বোঝা যায় এমন সংখ্যায়। |
| `/bn/features/assistant` | বাংলায় ভয়েস AI ব্যবসা সহকারী · HelloKhata | AI সহকারী · HelloKhata | yes | আপনি বলুন।হ্যালো খাতা বুঝে নেবে। |
| `/bn/features/sms` | গ্রাহকদের জন্য বাল্ক এসএমএস · HelloKhata | বাল্ক এসএমএস · HelloKhata | yes | এক বার্তায় পৌঁছে যান সব গ্রাহকের কাছে। |
| `/bn/features/multi-branch` | একাধিক শাখার দোকান পরিচালনা · HelloKhata | একাধিক শাখা পরিচালনা · HelloKhata | yes | সব শাখা, এক নজরে। |
| `/bn/solutions/grocery` | মুদি দোকানের POS ও হিসাবের অ্যাপ · HelloKhata | মুদি ও খুচরা দোকান · HelloKhata | yes | দোকানের হিসাবথাকুক হাতের মুঠোয়। |
| `/bn/solutions/pharmacy` | ফার্মেসি ম্যানেজমেন্ট সফটওয়্যার · HelloKhata | ফার্মেসি · HelloKhata | yes | ফার্মেসি চালানস্পষ্টতা আর আত্মবিশ্বাসে। |
| `/bn/solutions/supershop` | সুপারশপ POS ও মাল্টি-ব্রাঞ্চ সফটওয়্যার · HelloKhata | সুপারশপ · HelloKhata | yes | একাধিক শাখা, একটি নিয়ন্ত্রণকেন্দ্র। |
| `/bn/solutions/online-store` | অনলাইন স্টোর বিল্ডার (পরিকল্পিত) · HelloKhata | অনলাইন বিক্রেতা · HelloKhata | yes | আপনার পণ্য, আপনার অনলাইন স্টোর। |
| `/bn/solutions/f-commerce` | ফেসবুক বিক্রেতাদের এফ-কমার্স টুল (পরিকল্পিত) · HelloKhata | এফ-কমার্স বিক্রেতা · HelloKhata | yes | মেসেজ থেকে অর্ডার⁠—আরও সহজে। |
| `/bn/solutions/other` | ছোট ব্যবসার হিসাবের অ্যাপ · HelloKhata | অন্যান্য ব্যবসা · HelloKhata | yes | যে ব্যবসা বড় হচ্ছে, তার জন্য। |
| `/en` | HelloKhata — POS, digital khata & business app for Bangladesh | HelloKhata — Your business, in your language | yes | Your business,in your language. |
| `/en/features` | Features — POS, inventory, dues & reports · HelloKhata | Features · HelloKhata | yes | Everything your business does in a day, in one place. |
| `/en/solutions` | Business software for shops, pharmacies & super shops · HelloKhata | Solutions by business type · HelloKhata | yes | One platform for how Bangladesh sells today. |
| `/en/pricing` | Pricing — plans from ৳199/month · HelloKhata | Pricing · HelloKhata | yes | A plan for every kind of business. |
| `/en/how-it-works` | How HelloKhata works · HelloKhata | How it works · HelloKhata | yes | From your first product to your first question. |
| `/en/about` | About us — why we build HelloKhata · HelloKhata | About HelloKhata · HelloKhata | yes | Business software that speaks your language. |
| `/en/resources` | Help Center & FAQs · HelloKhata | Help Center · HelloKhata | yes | How can we help? |
| `/en/contact` | Contact — demo & support · HelloKhata | Contact · HelloKhata | yes | Let's talk about your business. |
| `/en/get-started` | Get started — 14-day free trial · HelloKhata | Get started · HelloKhata | yes | Set up HelloKhata |
| `/en/sign-in` | Sign in · HelloKhata | Sign in · HelloKhata | noindex | Welcome back |
| `/en/privacy` | Privacy Policy · HelloKhata | Privacy Policy · HelloKhata | noindex | Privacy Policy |
| `/en/terms` | Terms and Conditions · HelloKhata | Terms and Conditions · HelloKhata | noindex | Terms and Conditions |
| `/en/features/sales` | POS & Billing Software · HelloKhata | Sales & Billing · HelloKhata | yes | Sell faster. Keep every sale on record. |
| `/en/features/inventory` | Inventory & Stock Management · HelloKhata | Inventory · HelloKhata | yes | Know what's on your shelves without counting. |
| `/en/features/purchases` | Purchase & Supplier Records · HelloKhata | Purchases & Suppliers · HelloKhata | yes | Know exactly what your stock costs you. |
| `/en/features/expenses` | Expense Tracking for Shops · HelloKhata | Expenses & Transactions · HelloKhata | yes | See where the money goes. |
| `/en/features/customers` | Digital Baki Khata — Customer Dues · HelloKhata | Customers & Dues · HelloKhata | yes | Every due, clearly accounted for. |
| `/en/features/reports` | Sales & Business Reports · HelloKhata | Reports & Insights · HelloKhata | yes | Your business, in numbers you can read. |
| `/en/features/assistant` | Voice AI Business Assistant in Bangla · HelloKhata | AI Assistant · HelloKhata | yes | You say it.HelloKhata understands. |
| `/en/features/sms` | Bulk SMS for Customers · HelloKhata | Bulk SMS · HelloKhata | yes | Reach your customers with one message. |
| `/en/features/multi-branch` | Multi-Branch Store Management · HelloKhata | Multi-Branch Management · HelloKhata | yes | Every branch, in one view. |
| `/en/solutions/grocery` | Grocery Shop POS & Khata App · HelloKhata | Grocery & retail · HelloKhata | yes | Your shop's accounts,at your fingertips. |
| `/en/solutions/pharmacy` | Pharmacy Management Software · HelloKhata | Pharmacy · HelloKhata | yes | Run your pharmacy withclarity and confidence. |
| `/en/solutions/supershop` | Super Shop POS & Multi-Branch Software · HelloKhata | Super Shop · HelloKhata | yes | Every branch. One control center. |
| `/en/solutions/online-store` | Online Store Builder (Planned) · HelloKhata | Online Seller · HelloKhata | yes | Your products. Your own store. |
| `/en/solutions/f-commerce` | F-Commerce Tools for Facebook Sellers (Planned) · HelloKhata | F-Commerce Seller · HelloKhata | yes | Turn customer conversations into orders. |
| `/en/solutions/other` | Business App for Small Shops · HelloKhata | Other businesses · HelloKhata | yes | For every business that's growing. |

## B. Proposed H1 changes (copy decision, not yet applied)

Each page has one H1. Today it is a brand slogan. Search engines weigh the H1, and the category term sits only in the eyebrow above it.

Two options:
1. Keep the slogan and prepend the category in the same H1: `<h1><span class="eyebrow-style">ফার্মেসি ম্যানেজমেন্ট সফটওয়্যার</span> ফার্মেসি চালান স্পষ্টতা আর আত্মবিশ্বাসে।</h1>`. This is visible text, styled like today's eyebrow, so there is no visual change.
2. Rewrite the slogan to include the term.

**Recommendation:** option 1 on the flagship and feature pages. Product or brand owners should sign it off, because it changes what screen readers announce as the page heading.

| Page | Proposed H1 lead-in (bn / en) |
|---|---|
| Home | বাকির খাতা, POS ও ব্যবসার হিসাব — / Digital khata, POS and business accounts — |
| /solutions/grocery | মুদি দোকানের হিসাবের অ্যাপ / Grocery shop accounting app |
| /solutions/pharmacy | ফার্মেসি ম্যানেজমেন্ট সফটওয়্যার / Pharmacy management software |
| /solutions/supershop | সুপারশপ POS সফটওয়্যার / Super shop POS software |
| /features/customers | ডিজিটাল বাকির খাতা / Digital baki khata |
| /features/sales | POS ও বিলিং / POS and billing |
| /features/inventory | স্টক ব্যবস্থাপনা / Inventory management |
| /features/assistant | বাংলায় ভয়েস AI সহকারী / Voice AI assistant in Bangla |

## C. Per-page actions

| Page | Status | Next action |
|---|---|---|
| Home | Live | Add one crawlable paragraph near the top that names the segments (grocery, pharmacy, super shop) with links. It already exists lower down in SolutionsShowcase, so check that it renders as server HTML. |
| /features/customers | Live | Strongest P1 page (baki khata). Add a "how to move from a paper khata" FAQ entry. |
| /features/sales | Live | Mention "POS software price" and link to /pricing. |
| /solutions/pharmacy | Live | Confirm the OCR output fields with the product team. Then consider a dedicated prescription-reading page (search intent is distinct). |
| /solutions/supershop | Live | Add the monthly price for multi-branch plans if one exists, a differentiator against licence-plus-hardware vendors. |
| /solutions/online-store | **Planned** | Keep it indexable as an honest "coming" page with a contact/waitlist CTA. No new landing pages until launch. Update `capabilities.ts` and the seoTitle "(Planned)" suffix at launch. |
| /solutions/f-commerce | **Planned** | Same as online-store. |
| /pricing | Live | Already has BDT prices and a FAQ. Keep the numbers in HTML (they are). |
| /resources | Live | Grow into a guide hub only with real, reviewed articles. |
| /get-started | Live | Fine as an indexable "free trial" landing page. If the wizard becomes an app hand-off with no content, switch it to noindex. |
| /privacy, /terms | Draft, noindex | Remove `noindex` (`privacy/page.tsx`, `terms/page.tsx`) and add them to the sitemap once legal has reviewed them. |
| /sign-in | noindex | Keep. |

## D. New landing pages — only where intent + capability justify them

| Candidate | Distinct intent? | Capability | Decision |
|---|---|---|---|
| Prescription reading / OCR (bn + en) | Yes ("prescription scan", "প্রেসক্রিপশন পড়া") | Available, fields to confirm | **Propose.** Create after the product team confirms the OCR fields. Not created now, to avoid overclaiming. |
| Medicine expiry tracking | Partly (overlaps pharmacy) | Available | Section on the pharmacy page first; split out only if GSC shows separate demand. |
| Due-reminder SMS | Yes (long-tail) | Available (Super Shop) | Section on /features/sms is enough. |
| Online store builder, F-commerce sub-pages | Yes | **Planned** | **Do not create.** |
| Competitor comparison pages | Yes | — | Not now (see 03). |

No new landing pages were created in this pass. Every existing page already maps to a distinct intent. The one strong candidate (prescription OCR) needs product confirmation first.
