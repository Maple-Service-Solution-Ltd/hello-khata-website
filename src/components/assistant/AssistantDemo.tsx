"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { detectIntent } from "@/content/voice";
import { customerDues, expenseEntries, lowStock, products, purchaseExample, today, type ProductKey } from "@/content/demo-data";
import { Container, Eyebrow } from "@/components/ui/Section";
import { AssistantPhone, type ChatMsg } from "./AssistantPhone";

/**
 * The assistant doing real work, as a scripted demonstration. Four everyday moments: a sale on credit, a stock
 * purchase, who owes what, and how much dal is left. Each plays as a spoken request; the assistant answers, and the
 * matching business record builds beside the phone. Anything that would change the books (the sale, the purchase)
 * stays a draft until the visitor taps Confirm, and even then it is only added inside this demo.
 *
 * Typed questions about sales, dues, stock or expenses get answers from the same sample data. No microphone is used
 * and nothing is sent anywhere. All figures come from content/demo-data, so they agree with the rest of the site.
 */

type Kind = "sale" | "purchase" | "dues" | "stock" | "summary";
type Phase = "idle" | "listening" | "thinking" | "answered";
const KINDS: Kind[] = ["sale", "purchase", "dues", "stock"];

const product = (k: ProductKey) => products.find((p) => p.key === k)!;

/** The sample sale: Salma apa, 2 kg miniket and 1 litre of soybean oil, on credit. */
const SALE: { key: ProductKey; qty: number }[] = [
  { key: "rice", qty: 2 },
  { key: "oil", qty: 1 },
];
const saleTotal = SALE.reduce((sum, l) => sum + product(l.key).price * l.qty, 0);
const salma = customerDues.find((c) => c.key === "salma")!;
/** The sample purchase: 10 sacks of miniket with transport and labour (content/demo-data purchaseExample). */
const P = purchaseExample;
const purchaseSubtotal = P.sacks * P.pricePerSack;
const purchaseTotal = purchaseSubtotal + P.transport + P.labour;
const purchaseKg = P.sacks * P.kgPerSack;
const riceStock = products.find((p) => p.key === "rice")!.stock;
const lentil = products.find((p) => p.key === "lentil")!;
const INVOICE = 1087;

export function AssistantDemo() {
  const { t, locale } = useI18n();
  const d = t.features.assistantPage.demo;
  const reduce = !!useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, margin: "0px 0px -35% 0px" });

  const [kind, setKind] = useState<Kind>("sale");
  const [phase, setPhase] = useState<Phase>("idle");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [saved, setSaved] = useState<{ sale: boolean; purchase: boolean }>({ sale: false, purchase: false });
  const [run, setRun] = useState(0);
  const [text, setText] = useState("");
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const item = (k: ProductKey, qty: number) => `${t.demo.products[k]} ${fmtNumber(qty, locale)} ${t.demo.units[product(k).unit]}`;
  const dues = customerDues.map((c) => ({ ...c, due: c.due + (c.key === "salma" && saved.sale ? saleTotal : 0) }));
  const duesTotal = dues.reduce((s, c) => s + c.due, 0);
  const top = [...dues].sort((a, b) => b.due - a.due)[0];

  const replyFor = (k: Kind): string => {
    const sc = d.scenarios;
    if (k === "sale")
      return interpolate(sc[0].reply, {
        customer: t.demo.customers.salma,
        customerOf: d.customerOf,
        items: SALE.map((l) => `${item(l.key, l.qty)} ${fmtTaka(product(l.key).price * l.qty, locale)}`).join(", "),
        total: fmtTaka(saleTotal, locale),
      });
    if (k === "purchase")
      return interpolate(sc[1].reply, {
        supplier: d.supplier,
        item: t.demo.products.rice,
        qty: fmtNumber(P.sacks, locale),
        kg: `${fmtNumber(purchaseKg, locale)} ${t.demo.units.kg}`,
        price: fmtTaka(P.pricePerSack, locale),
        subtotal: fmtTaka(purchaseSubtotal, locale),
        transport: fmtTaka(P.transport, locale),
        labour: fmtTaka(P.labour, locale),
        total: fmtTaka(purchaseTotal, locale),
        perKg: `৳${fmtNumber(purchaseTotal / purchaseKg, locale, 2)}`,
      });
    if (k === "dues")
      return interpolate(sc[2].reply, {
        count: fmtNumber(dues.length, locale),
        total: fmtTaka(duesTotal, locale),
        top: t.demo.customers[top.key],
        amount: fmtTaka(top.due, locale),
        since: d.since[top.key],
      });
    if (k === "stock")
      return interpolate(sc[3].reply, {
        item: t.demo.products.lentil,
        qty: `${fmtNumber(lentil.stock, locale)} ${t.demo.units[lentil.unit]}`,
        min: `${fmtNumber(lentil.min, locale)} ${t.demo.units[lentil.unit]}`,
        others: lowStock
          .filter((p) => p.key !== "lentil")
          .map((p) => `${t.demo.products[p.key]} ${fmtNumber(p.stock, locale)} ${t.demo.units[p.unit]}`)
          .join(", "),
      });
    return "";
  };

  const doneFor = (k: "sale" | "purchase") =>
    k === "sale"
      ? interpolate(d.scenarios[0].done, { customer: t.demo.customers.salma, customerOf: d.customerOf, due: fmtTaka(salma.due + saleTotal, locale) })
      : interpolate(d.scenarios[1].done, { item: t.demo.products.rice, stock: `${fmtNumber(riceStock + purchaseKg, locale)} ${t.demo.units.kg}` });

  const confirm = (k: "sale" | "purchase", replyId: number) => {
    setMsgs((list) => [...list.map((x) => (x.id === replyId ? { ...x, actions: undefined } : x)), { id: nextId.current++, from: "user", text: `✓ ${d.confirm}` }]);
    setSaved((s) => ({ ...s, [k]: true }));
    const id = nextId.current++;
    setPhase("thinking");
    later(reduce ? 0 : 650, () => {
      setMsgs((list) => [...list, { id, from: "ai", text: doneFor(k), ok: true }]);
      setPhase("answered");
    });
  };
  const change = (replyId: number) => {
    setMsgs((list) => [...list.map((x) => (x.id === replyId ? { ...x, actions: undefined } : x)), { id: nextId.current++, from: "user", text: d.edit }, { id: nextId.current++, from: "ai", text: d.editReply }]);
  };

  const actionsFor = (k: Kind, replyId: number) =>
    k === "sale" || k === "purchase" ? (
      <span className="mt-2 flex gap-1.5">
        <button type="button" onClick={() => confirm(k, replyId)} className="rounded-full bg-cream px-3 py-1 text-[0.74rem] font-bold text-leaf-deep transition-transform active:scale-95">
          {d.confirm}
        </button>
        <button type="button" onClick={() => change(replyId)} className="rounded-full bg-white/10 px-3 py-1 text-[0.74rem] font-semibold text-cream ring-1 ring-white/20">
          {d.edit}
        </button>
      </span>
    ) : undefined;

  /** Plays one exchange: the request is heard (or typed), the assistant thinks, then answers. */
  const play = (k: Kind, question: string, voice: boolean, answer?: string) => {
    clear();
    setKind(k);
    setRun((r) => r + 1);
    if (k === "sale" || k === "purchase") setSaved((s) => ({ ...s, [k]: false }));
    const ask = nextId.current++;
    const reply = nextId.current++;
    const respond = () => {
      setMsgs([{ id: ask, from: "user", text: question, voice }, { id: reply, from: "ai", text: answer ?? replyFor(k), actions: answer ? undefined : actionsFor(k, reply) }]);
      setPhase("answered");
    };
    if (reduce) return respond();
    setMsgs(voice ? [] : [{ id: ask, from: "user", text: question }]);
    let at = 0;
    if (voice) {
      setPhase("listening");
      const words = question.split(" ");
      words.forEach((_, i) => later(250 + i * 170, () => setMsgs([{ id: ask, from: "user", text: words.slice(0, i + 1).join(" "), voice: true }])));
      at = 250 + words.length * 170 + 250;
    }
    later(at, () => setPhase("thinking"));
    later(at + 900, respond);
  };

  const pick = (i: number) => play(KINDS[i], d.scenarios[i].say, true);
  const onMic = () => {
    if (phase === "listening" || phase === "thinking") return;
    pick(Math.max(0, KINDS.indexOf(kind)));
  };
  const onType = () => {
    const q = text.trim();
    if (!q || phase === "listening" || phase === "thinking") return;
    setText("");
    const intent = detectIntent(q);
    if (intent === "dues") return play("dues", q, false);
    if (intent === "stock") return play("stock", q, false);
    if (intent === "sales") return play("summary", q, false, interpolate(d.salesAnswer, { total: fmtTaka(today.sales, locale), n: fmtNumber(today.salesCount, locale) }));
    if (intent === "expenses") return play("summary", q, false, interpolate(d.expensesAnswer, { total: fmtTaka(expenseEntries.reduce((s, e) => s + e.amount, 0), locale) }));
    play(kind, q, false, d.unknown);
  };

  // The first moment plays when the section comes into view, so the phone never waits empty
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => pick(0), reduce ? 0 : 500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const shown = phase === "answered" || reduce;

  return (
    <section id="demo" aria-labelledby="as-demo" className="on-dark grain-dark relative scroll-mt-16 overflow-hidden bg-forest py-20 text-cream sm:py-28">
      <div aria-hidden="true" className="absolute top-0 left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(22_163_74/0.18),transparent)]" />
      <Container className="relative">
        <div ref={root} className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1fr)] lg:gap-12">
          {/* Moments to try */}
          <div className="lg:pt-6">
            <Eyebrow tone="light">{d.eyebrow}</Eyebrow>
            <h2 id="as-demo" className="font-display mt-4 text-[2rem] leading-snug text-balance text-cream sm:text-5xl lg:text-[2.6rem]">
              {d.title}
            </h2>
            <p className="mt-4 text-lg text-pretty text-cream/75">{d.lead}</p>
            <p className="mt-8 text-sm font-semibold text-leaf-glow">{d.pick}</p>
            <div className="no-scrollbar -mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
              {d.scenarios.map((s, i) => {
                const active = KINDS[i] === kind;
                return (
                  <button
                    key={s.tab}
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={active}
                    className={cn(
                      "w-[15.5rem] shrink-0 snap-start rounded-2xl px-4 py-3 text-left transition-colors lg:w-full",
                      active ? "bg-white/[0.12] ring-1 ring-leaf-glow/60" : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.08]",
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-cream">{s.tab}</span>
                      <span className="text-[0.7rem] text-cream/65">{s.hint}</span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-cream/70">“{s.say}”</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* The assistant */}
          <div className="flex flex-col items-center">
            <AssistantPhone tall msgs={msgs} typing={phase === "thinking"} listening={phase === "listening"} reduce={reduce} onMic={onMic} input={{ value: text, onChange: setText, onSubmit: onType }} />
            <p className="mt-4 max-w-[18rem] text-center text-xs text-cream/70">{d.status}</p>
          </div>

          {/* What it did, as a record */}
          <div className="lg:pt-6" aria-live="polite">
            <AnimatePresence mode="wait">
              {shown && (
                <motion.div key={`${kind}-${run}`} initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <Record kind={kind} saved={saved} dues={dues} duesTotal={duesTotal} />
                </motion.div>
              )}
            </AnimatePresence>
            {!shown && <div className="hidden min-h-[22rem] rounded-[1.6rem] border border-dashed border-white/15 lg:block" aria-hidden="true" />}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The record card: a page of the digital khata, built row by row. */
function Record({ kind, saved, dues, duesTotal }: { kind: Kind; saved: { sale: boolean; purchase: boolean }; dues: typeof customerDues; duesTotal: number }) {
  const { t, locale } = useI18n();
  const d = t.features.assistantPage.demo;
  const k = d.card;
  const row = (i: number) => ({ initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 + i * 0.12, duration: 0.35 } });
  const isEntry = kind === "sale" || kind === "purchase";
  const done = kind === "sale" ? saved.sale : kind === "purchase" ? saved.purchase : false;
  const title = { sale: k.sale, purchase: k.purchase, dues: k.dues, stock: k.stock, summary: k.summary }[kind];

  return (
    <div className="paper-cream relative overflow-hidden rounded-[1.6rem] p-6 text-ink shadow-[var(--shadow-float)] sm:p-7">
      {/* Ruled like a khata page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgb(127_167_217/0.18)_31px,rgb(127_167_217/0.18)_32px)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 left-12 w-px bg-vermilion/30" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-2xl">{title}</p>
          {isEntry ? (
            <span className={cn("rounded-full px-2.5 py-1 text-[0.7rem] font-bold", done ? "bg-leaf text-white" : "bg-marigold-soft text-[#6b4a07]")}>{done ? `✓ ${d.saved}` : d.draft}</span>
          ) : (
            <span className="rounded-full bg-marigold-soft px-2.5 py-1 text-[0.7rem] font-semibold text-[#6b4a07]">{t.common.sampleData}</span>
          )}
        </div>

        {kind === "sale" && (
          <div className="mt-4">
            <motion.p {...row(0)} className="text-sm text-muted">
              {interpolate(k.invoice, { n: fmtNumber(INVOICE, locale) })} · {k.customer}: <span className="font-semibold text-ink">{t.demo.customers.salma}</span>
            </motion.p>
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {SALE.map((l, i) => (
                <motion.li key={l.key} {...row(i + 1)} className="flex items-baseline justify-between gap-4 py-2.5">
                  <span>
                    {t.demo.products[l.key]} <span className="text-muted">· {fmtNumber(l.qty, locale)} {t.demo.units[product(l.key).unit]}</span>
                  </span>
                  <span className="font-latin font-semibold">{fmtTaka(product(l.key).price * l.qty, locale)}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div {...row(3)} className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-muted">
                {k.method}: <span className="font-semibold text-vermilion">{k.credit}</span>
              </span>
              <span className="font-latin text-2xl font-extrabold">{fmtTaka(saleTotal, locale)}</span>
            </motion.div>
            <motion.div {...row(4)} className="mt-4 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2.5 ring-1 ring-ink/10">
              <span className="text-sm">
                {t.demo.customers.salma} · {k.totalDues}
              </span>
              <span className="font-latin font-bold">
                {done ? (
                  <>
                    <span className="mr-1.5 text-muted line-through">{fmtTaka(salma.due, locale)}</span>
                    <span className="text-vermilion">{fmtTaka(salma.due + saleTotal, locale)}</span>
                  </>
                ) : (
                  fmtTaka(salma.due, locale)
                )}
              </span>
            </motion.div>
          </div>
        )}

        {kind === "purchase" && (
          <div className="mt-4">
            <motion.p {...row(0)} className="text-sm text-muted">
              {k.supplier}: <span className="font-semibold text-ink">{d.supplier}</span>
            </motion.p>
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {[
                [`${t.demo.products.rice} · ${interpolate(k.sacks, { n: fmtNumber(P.sacks, locale), kg: fmtNumber(P.kgPerSack, locale) })}`, purchaseSubtotal],
                [k.transport, P.transport],
                [k.labour, P.labour],
              ].map(([label, amount], i) => (
                <motion.li key={label as string} {...row(i + 1)} className="flex items-baseline justify-between gap-4 py-2.5">
                  <span>{label}</span>
                  <span className="font-latin font-semibold">{fmtTaka(amount as number, locale)}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div {...row(4)} className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-muted">
                {k.perKg}: <span className="font-latin font-semibold text-ink">৳{fmtNumber(purchaseTotal / purchaseKg, locale, 2)}</span>
              </span>
              <span className="font-latin text-2xl font-extrabold">{fmtTaka(purchaseTotal, locale)}</span>
            </motion.div>
            <motion.div {...row(5)} className="mt-4 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2.5 ring-1 ring-ink/10">
              <span className="text-sm">
                {t.demo.products.rice} · {k.stockAfter}
              </span>
              <span className="font-latin font-bold">
                {done ? (
                  <>
                    <span className="mr-1.5 text-muted line-through">{fmtNumber(riceStock, locale)}</span>
                    <span className="text-leaf-deep">
                      {fmtNumber(riceStock + purchaseKg, locale)} {t.demo.units.kg}
                    </span>
                  </>
                ) : (
                  `${fmtNumber(riceStock, locale)} ${t.demo.units.kg}`
                )}
              </span>
            </motion.div>
          </div>
        )}

        {kind === "dues" && (
          <div className="mt-4">
            <ul className="space-y-3">
              {dues.map((c, i) => (
                <motion.li key={c.key} {...row(i)}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">
                      {t.demo.customers[c.key]} <span className="text-xs font-normal text-muted">· {interpolate(k.since, { date: d.since[c.key] })}</span>
                    </span>
                    <span className="font-latin font-bold text-vermilion">{fmtTaka(c.due, locale)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <motion.div className="h-full rounded-full bg-vermilion/70" initial={{ width: 0 }} animate={{ width: `${(c.due / dues[0].due) * 100}%` }} transition={{ delay: 0.25 + i * 0.12, duration: 0.6 }} />
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div {...row(4)} className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-3">
              <span className="text-sm text-muted">{k.totalDues}</span>
              <span className="font-latin text-2xl font-extrabold">{fmtTaka(duesTotal, locale)}</span>
            </motion.div>
          </div>
        )}

        {kind === "stock" && (
          <div className="mt-4">
            <ul className="space-y-3">
              {lowStock.map((p, i) => (
                <motion.li key={p.key} {...row(i)} className={cn(p.key === "lentil" && "-mx-2 rounded-xl bg-marigold-soft/60 px-2 py-1.5")}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{t.demo.products[p.key]}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-latin font-bold">
                        {fmtNumber(p.stock, locale)} {t.demo.units[p.unit]}
                      </span>
                      <span className={cn("rounded-full px-1.5 text-[0.62rem] font-bold text-white", p.stock === 0 ? "bg-vermilion" : "bg-[#b45309]")}>{p.stock === 0 ? k.out : k.low}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <motion.div className="h-full rounded-full bg-[#b45309]/70" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (p.stock / p.min) * 100)}%` }} transition={{ delay: 0.25 + i * 0.12, duration: 0.6 }} />
                    </div>
                    <span className="text-[0.66rem] text-muted">{interpolate(k.min, { min: `${fmtNumber(p.min, locale)}` })}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.p {...row(4)} className="mt-5 border-t border-ink/10 pt-3 text-sm font-semibold text-[#b45309]">
              {k.restock}
            </motion.p>
          </div>
        )}

        {kind === "summary" && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <motion.div {...row(0)} className="rounded-xl bg-white/70 p-4 ring-1 ring-ink/10">
              <p className="text-sm text-muted">{t.features.assistantPage.hero.result}</p>
              <p className="font-latin text-2xl font-extrabold">{fmtTaka(today.sales, locale)}</p>
              <p className="text-xs text-leaf-deep">{interpolate(k.salesCount, { n: fmtNumber(today.salesCount, locale) })}</p>
            </motion.div>
            <motion.div {...row(1)} className="rounded-xl bg-white/70 p-4 ring-1 ring-ink/10">
              <p className="text-sm text-muted">{k.monthExpenses}</p>
              <p className="font-latin text-2xl font-extrabold">{fmtTaka(expenseEntries.reduce((s, e) => s + e.amount, 0), locale)}</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
