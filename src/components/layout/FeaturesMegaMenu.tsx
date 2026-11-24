"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { Sketch } from "@/lib/sketch";
import { P, Wash, box, palette as c } from "@/components/illustrations/ink";

/**
 * The Features mega menu: four groups of features and a promo panel with a small pen-and-wash drawing.
 * Every link goes to a page that exists, and every claim matches what those pages say (see capabilities.ts):
 * nothing here promises barcode scanning, sync, offline use or AI insights the product doesn't have.
 */

type IconKey = "sales" | "inventory" | "purchases" | "expenses" | "assistant" | "ocr" | "customers" | "sms" | "reports" | "branches" | "solutions";
type GroupKey = "manage" | "ai" | "connect" | "grow";

/** Destinations, relative to the locale. Copy for each key lives in messages under nav.mega. */
const groups: { key: GroupKey; items: { key: IconKey; href: string }[] }[] = [
  {
    key: "manage",
    items: [
      { key: "sales", href: "/features/sales" },
      { key: "inventory", href: "/features/inventory" },
      { key: "purchases", href: "/features/purchases" },
      { key: "expenses", href: "/features/expenses" },
    ],
  },
  {
    key: "ai",
    items: [
      { key: "assistant", href: "/features/assistant" },
      { key: "ocr", href: "/solutions/pharmacy#ocr" },
    ],
  },
  {
    key: "connect",
    items: [
      { key: "customers", href: "/features/customers" },
      { key: "sms", href: "/features/sms" },
    ],
  },
  {
    key: "grow",
    items: [
      { key: "reports", href: "/features/reports" },
      { key: "branches", href: "/features/multi-branch" },
      { key: "solutions", href: "/solutions" },
    ],
  },
];

/** Small hand-drawn line icons, all on one 24-unit grid with the same pen weight. */
const iconPaths: Record<IconKey, string> = {
  sales: "M6.5 3.6c3.7-.2 7.3-.1 11 .1l-.2 16.6-2.1-1.3-2 1.4-2.1-1.4-2.1 1.4-2.2-1.4.1-15.4M9 8.2c2.1-.1 4.1 0 6.1.1M9 11.6c1.6 0 3.2 0 4.8.1",
  inventory: "M4 12.4c2.6-.1 5.2-.1 7.8 0l.1 7.6c-2.6.1-5.2 0-7.8 0zM12.2 12.4c2.6-.1 5.2 0 7.8 0v7.5c-2.6.2-5.2.1-7.8 0M8.1 4.6c2.6-.1 5.2 0 7.8 0l.1 7.6M8.1 4.6l-.1 7.7M10.6 4.8v2.6M6.5 12.6v2.4M14.7 12.6v2.4",
  purchases: "M3.5 7.2c3.2-.1 6.3-.1 9.5.1l-.1 9.5c-3.2.1-6.3 0-9.4 0zM13 10.2c1.8-.1 3.4 0 4.6.1l2.9 3.2v3.4l-7.5.1M7 19.6a1.7 1.7 0 1 0 .1 0M16.8 19.6a1.7 1.7 0 1 0 .1 0",
  expenses: "M4 7.5c5.3-.2 10.7-.1 16 .1l-.1 11.2c-5.3.1-10.6.1-15.9 0zM4.2 7.4c2.4-1.6 6.6-3.4 10.7-3.7l.8 3.8M15.8 12.4c1.4-.1 2.8 0 4.1 0l-.1 3.1c-1.3.1-2.7.1-4 0z",
  assistant: "M12 3.8c1.6 0 2.8 1.2 2.8 2.9v4.6c0 1.6-1.2 2.9-2.8 2.9s-2.8-1.3-2.8-2.9V6.7c0-1.7 1.2-2.9 2.8-2.9zM6.6 11.2c.1 3.2 2.5 5.6 5.4 5.6s5.3-2.4 5.4-5.6M12 16.9v3.4M9.2 20.4c1.9-.1 3.8 0 5.6.1",
  ocr: "M6.2 3.7c3.1-.1 6.1 0 9.2.1l2.6 2.8-.1 13.6c-3.9.1-7.8.1-11.7 0zM9 9.4c.6-1.6 2.1-1.6 2.3-.2.2 1.5-1.6 2.3-2.4 4.1M10.4 11.6c1.1.9 2 1.8 2.8 2.9M12.6 11.8l-1.6 2.4M3.6 3.4v3M3.6 3.4h3M20.4 20.6v-3M20.4 20.6h-3",
  customers: "M5 4c4.6-.2 9.2-.1 13.8.1l-.1 16c-4.6.2-9.2.1-13.8 0zM8 4.1l-.1 16M10.6 8.6c2.1-.1 4.2 0 6.2 0M10.6 12c2.1 0 4.2 0 6.2.1M10.6 15.4c1.4 0 2.6 0 3.8.1",
  sms: "M4 6.2c5.3-.3 10.7-.2 16 0l-.1 9.4c-3.4.1-6.6 0-9.9.1L6 19.1l.2-3.5H4c-.1-3.1-.1-6.3 0-9.4zM8 10.9h.1M12 10.9h.1M16 10.9h.1",
  reports: "M4 19.8c5.4-.2 10.8-.1 16.2 0M6.4 19.6l.1-5.6c1-.1 1.9 0 2.8 0l-.1 5.6M10.6 19.6l.1-9.2c1-.1 1.9-.1 2.8 0v9.2M14.9 19.6l.1-12.8c1-.1 1.9 0 2.8 0l-.1 12.9",
  branches: "M12 4c1.6 0 2.8 1.2 2.8 2.7S13.6 9.5 12 9.5 9.2 8.2 9.2 6.7 10.4 4 12 4zM12 9.5v3.3M6.2 15.2c.1-1.6.7-2.4 5.8-2.4s5.8.8 5.9 2.4M6.1 15.3a2.3 2.3 0 1 0 .1 0M17.9 15.3a2.3 2.3 0 1 0 .1 0",
  solutions: "M4 9.6c5.3-.2 10.7-.2 16 0L18.6 5c-4.4-.2-8.8-.1-13.2 0zM4 9.6c.3 1.6 2.4 1.6 2.7 0 .3 1.6 2.4 1.6 2.6 0 .3 1.6 2.4 1.6 2.7 0 .3 1.6 2.4 1.6 2.7 0 .3 1.6 2.4 1.6 2.6 0 .3 1.6 2.4 1.6 2.7 0M5.6 12.2l.1 7.8c4.2.1 8.4.1 12.6 0v-7.8M10.2 20v-4.4c1.2-.1 2.4-.1 3.6 0V20",
};

function FeatureIcon({ name, className }: { name: IconKey; className?: string }) {
  return (
    <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-leaf-soft/70 text-leaf-ink ring-1 ring-leaf/15 transition-colors", className)} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-[1.15rem]">
        <path d={iconPaths[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function useMega() {
  const { locale, t } = useI18n();
  return { m: t.nav.mega, p: (path: string) => `/${locale}${path}` };
}

function FeatureLink({ href, icon, label, desc, active }: { href: string; icon: IconKey; label: string; desc: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/feat flex gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-leaf-soft/45 focus-visible:bg-leaf-soft/45",
        active && "bg-leaf-soft/45",
      )}
    >
      <FeatureIcon name={icon} className="group-hover/feat:bg-leaf-soft group-hover/feat:ring-leaf/30" />
      <span className="min-w-0">
        <span className="block text-[0.93rem] leading-snug font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-[0.8rem] leading-snug text-pretty text-muted">{desc}</span>
      </span>
    </Link>
  );
}

function FeatureCategory({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p id={id} className="flex items-center gap-2 px-2.5 text-[0.72rem] font-semibold tracking-[0.12em] text-leaf-deep uppercase">
        <svg viewBox="0 0 18 6" className="h-1.5 w-4" aria-hidden="true">
          <path d="M1 3.8C5 1.6 11 4.8 17 2.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {title}
      </p>
      <ul aria-labelledby={id} className="mt-2 space-y-0.5">
        {children}
      </ul>
    </div>
  );
}

/** The khata on the left becomes a clear overview on the phone, joined by the green ink line used across the site. */
function PromoArt() {
  const s = new Sketch(9105);
  return (
    <svg viewBox="0 0 240 132" className="block w-full text-ink" aria-hidden="true">
      <g filter="url(#hk-wobble)">
        {/* Open khata */}
        <g transform="rotate(-6 64 82)">
          <Wash d="M18 110 l4 -48 h84 l4 48 z" fill={c.vermilion} o={0.8} />
          <path d="M24 106 l3 -40 h36 l1 40 z" fill={c.cream} />
          <path d="M66 106 l-1 -40 h37 l3 40 z" fill={c.cream} />
          <P d={s.poly([[24, 106], [27, 66], [63, 66], [64, 106]], true, 0.3)} w={1} />
          <P d={s.poly([[66, 106], [65, 66], [102, 66], [105, 106]], true, 0.3)} w={1} />
          {[76, 84, 92, 100].map((y) => (
            <g key={y}>
              <P d={s.curve([[30, y], [38, y - 1.5], [46, y + 0.6], [58, y - 1]], 0.2)} w={0.6} />
              <P d={s.curve([[70, y], [80, y - 1.4], [88, y + 0.5], [98, y - 1]], 0.2)} w={0.6} />
            </g>
          ))}
        </g>
        {/* A little stack of stock behind the book */}
        <Wash d={box(10, 44, 22, 18)} fill={c.clay} o={0.5} />
        <P d={s.rect(10, 44, 22, 18, 0.2, 1)} w={0.8} />
        <Wash d={box(16, 28, 18, 16)} fill={c.marigold} o={0.45} />
        <P d={s.rect(16, 28, 18, 16, 0.2, 1)} w={0.8} />
      </g>
      {/* The ink line from the khata to the phone */}
      <path d="M100 72 C 128 44, 150 92, 168 60" fill="none" stroke="var(--color-leaf-ink)" strokeWidth="2.2" strokeLinecap="round" filter="url(#hk-wobble)" />
      <circle cx="100" cy="72" r="3" fill="var(--color-cream)" stroke="var(--color-leaf)" strokeWidth="1.4" />
      {/* Phone with today's overview */}
      <g filter="url(#hk-wobble)">
        <rect x="166" y="14" width="58" height="108" rx="9" fill={c.ink} fillOpacity="0.88" />
      </g>
      <rect x="171" y="22" width="48" height="92" rx="5" fill="var(--color-forest-2)" />
      <rect x="176" y="29" width="18" height="3" rx="1.5" fill="var(--color-leaf-glow)" />
      <rect x="176" y="38" width="36" height="7" rx="2" fill={c.cream} fillOpacity="0.9" />
      <rect x="176" y="49" width="24" height="2.4" rx="1.2" fill="var(--color-leaf-glow)" fillOpacity="0.8" />
      {[8, 13, 10, 17, 14, 21].map((h, i) => (
        <rect key={i} x={177 + i * 6} y={80 - h} width="3.6" height={h} rx="1" fill={i === 5 ? "var(--color-leaf-glow)" : c.cream} fillOpacity={i === 5 ? 1 : 0.35} />
      ))}
      <rect x="176" y="88" width="38" height="8" rx="4" fill={c.cream} fillOpacity="0.14" />
      <circle cx="195" cy="105" r="5" fill="var(--color-leaf)" />
      <path d="M195 102.4v3.4M193.4 105.2c.1 1 .8 1.6 1.6 1.6s1.5-.6 1.6-1.6" fill="none" stroke={c.cream} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * "menu": a slim strip with the CTA on narrower desktops, the full card with artwork from xl up.
 * "stack": the full card, used at the end of the mobile menu.
 */
function FeaturesPromoPanel({ layout }: { layout: "menu" | "stack" }) {
  const { m, p } = useMega();
  const menu = layout === "menu";
  return (
    <div className={cn("flex h-full rounded-2xl bg-[#eef4ea] ring-1 ring-leaf/15", menu ? "items-center gap-5 px-5 py-4 xl:flex-col xl:items-stretch xl:gap-0 xl:p-4" : "flex-col p-4")}>
      <div className={menu ? "hidden xl:block" : undefined}>
        <PromoArt />
      </div>
      <div className={menu ? "min-w-0 flex-1 xl:mt-3 xl:flex-none" : "mt-3"}>
        <p className="font-display text-[1.05rem] leading-snug text-ink">{m.promo.title}</p>
        <p className="mt-1.5 text-[0.8rem] leading-snug text-pretty text-muted">{m.promo.body}</p>
      </div>
      <Link
        href={p("/features")}
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-leaf-deep px-4 py-2.5 text-[0.85rem] font-semibold text-cream transition-colors duration-200 hover:bg-leaf-ink",
          menu ? "xl:mt-4 xl:self-start" : "mt-4 self-start",
        )}
      >
        {m.promo.cta}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/** Desktop panel. Rendered inside the Features list item, positioned against the fixed header. */
export function FeaturesMegaMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const { m, p } = useMega();
  const reduce = useReducedMotion();
  return (
    <motion.div
      id="menu-features"
      role="region"
      aria-label={m.label}
      initial={{ opacity: 0, y: reduce ? 0 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -4, transition: { duration: 0.14 } }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full z-10"
    >
      <div className="mx-auto max-w-[1320px] px-5 pt-2 sm:px-8">
        <div className="paper-cream rounded-[1.5rem] p-3 shadow-[0_1px_0_rgb(23_34_28/0.04),0_24px_60px_-24px_rgb(12_35_24/0.35)] ring-1 ring-ink/10">
          <div className="grid grid-cols-4 gap-y-3 xl:grid-cols-[24fr_19fr_20fr_19fr_18fr]">
            {groups.map((g, i) => (
              <motion.div
                key={g.key}
                className={cn("px-2 py-2", i > 0 && "border-l border-ink/[0.08]")}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: reduce ? 0 : 0.03 * i }}
              >
                <FeatureCategory id={`mega-${g.key}`} title={m.groups[g.key].title}>
                  {g.items.map((it) => (
                    <li key={it.key}>
                      <FeatureLink href={p(it.href)} icon={it.key} label={m.items[it.key].label} desc={m.items[it.key].desc} active={isActive(p(it.href.split("#")[0]))} />
                    </li>
                  ))}
                </FeatureCategory>
              </motion.div>
            ))}
            <div className="col-span-4 pl-2 xl:col-span-1 xl:pl-3">
              <FeaturesPromoPanel layout="menu" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Mobile: the same groups as collapsible sections inside the existing full-screen menu, with the CTA last. */
export function MobileFeatures() {
  const { m, p } = useMega();
  const [openGroup, setOpenGroup] = useState<GroupKey | null>("manage");
  return (
    <div className="pb-4">
      {groups.map((g) => {
        const open = openGroup === g.key;
        return (
          <div key={g.key} className="border-t border-ink/[0.07] first:border-t-0">
            <button
              type="button"
              onClick={() => setOpenGroup(open ? null : g.key)}
              aria-expanded={open}
              aria-controls={`m-mega-${g.key}`}
              className="flex w-full items-center justify-between gap-3 py-3 text-left text-[0.8rem] font-semibold tracking-[0.1em] text-leaf-deep uppercase"
            >
              {m.groups[g.key].title}
              <svg viewBox="0 0 12 12" className={cn("size-3 shrink-0 transition-transform duration-200", open && "rotate-180")} aria-hidden="true">
                <path d="M2.5 4.6c1.2 1.1 2.3 2.2 3.5 3.2 1.2-1 2.3-2.1 3.5-3.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul id={`m-mega-${g.key}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  {g.items.map((it) => (
                    <li key={it.key}>
                      <Link href={p(it.href)} className="flex gap-3 rounded-xl py-2.5 pr-1">
                        <FeatureIcon name={it.key} />
                        <span className="min-w-0">
                          <span className="block text-[1rem] leading-snug font-semibold text-ink">{m.items[it.key].label}</span>
                          <span className="mt-0.5 block text-[0.85rem] leading-snug text-muted">{m.items[it.key].desc}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="h-2" aria-hidden="true" />
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <div className="mt-3">
        <FeaturesPromoPanel layout="stack" />
      </div>
    </div>
  );
}
