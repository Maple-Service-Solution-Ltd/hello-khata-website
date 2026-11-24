"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { P, Wash, Occlude, box, quad, palette as c } from "@/components/illustrations/ink";
import { Person } from "@/components/illustrations/InkPeople";
import { branches } from "@/content/demo-data";
import type { FeatureSlug } from "@/content/site";

/**
 * Hero artwork for each feature page: a small pen-and-wash scene that tells that feature's own story in a
 * short loop, in the same drawing style as the rest of the site. Every figure is sample data and every
 * action shown is something the feature page already describes. Reduced motion shows the finished frame.
 */

const W = 480;
const H = 340;
const FLOOR = 300;
const ease = [0.45, 0, 0.55, 1] as const;

/** Steps through 0..count-1 every `ms`, looping; reduced motion holds the last step. */
function useStep(count: number, ms: number) {
  const reduce = useReducedMotion();
  const [s, setS] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setS((v) => (v + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms, reduce]);
  return reduce ? count - 1 : s;
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-ink" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** A HelloKhata screen card drawn in ink: paper surface, green header strip. */
function Card({ x, y, w, h, title, children }: { x: number; y: number; w: number; h: number; title?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={c.cream} stroke={c.ink} strokeWidth="1.2" />
      <path d={`M${x} ${y + 10} a10 10 0 0 1 10 -10 h${w - 20} a10 10 0 0 1 10 10 v14 h-${w} z`} fill="var(--color-leaf-deep)" />
      {title && (
        <text x={x + 12} y={y + 17} fontSize="11" fontWeight="600" fill={c.cream} style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </text>
      )}
      {children}
    </g>
  );
}

const T = ({ x, y, size = 11, weight = 500, fill = c.ink, anchor = "start", latin, children }: { x: number; y: number; size?: number; weight?: number; fill?: string; anchor?: "start" | "middle" | "end"; latin?: boolean; children: ReactNode }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} style={{ fontFamily: latin ? "var(--font-latin)" : "var(--font-sans)" }}>
    {children}
  </text>
);

function Floor({ seed = 1 }: { seed?: number }) {
  const s = new Sketch(seed);
  return <P d={s.line(10, FLOOR, 470, FLOOR, 0.5)} w={1.1} o={0.7} />;
}

/* ---------------- Sales: from the counter to a paid bill ---------------- */
function SalesArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.sales;
  const step = useStep(8, 1100);
  const prices = [350, 190, 150];
  const s = new Sketch(4101);
  const shown = (i: number) => step > i;
  return (
    <Frame label={t.features.items.sales.title}>
      <Floor seed={1} />
      {/* The shop's shelf behind the counter */}
      <g filter="url(#hk-wobble)">
        <Wash d={box(70, 70, 210, 150)} fill={c.clay} o={0.16} />
        <P d={s.rect(70, 70, 210, 150, 0.4)} w={1.1} />
        {[120, 170].map((y) => (
          <P key={y} d={s.line(70, y, 280, y, 0.3)} w={1} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <Wash d={box(80 + i * 33, 92, 22, 27)} fill={[c.rice, c.marigold, c.leafWash, c.vermilion, c.sky, c.rice][i]} o={0.6} />
            <P d={s.rect(80 + i * 33, 92, 22, 27, 0.2, 1)} w={0.7} />
            <Wash d={box(82 + i * 33, 146, 20, 23)} fill={[c.sky, c.rice, c.vermilion, c.marigold, c.leafWash, c.clay][i]} o={0.5} />
            <P d={s.rect(82 + i * 33, 146, 20, 23, 0.2, 1)} w={0.7} />
          </g>
        ))}
      </g>
      <g transform={`translate(178 ${FLOOR}) scale(1.3)`}>
        <Person seed={81} shirt={c.sky} hair="tupi" look={-1} />
      </g>
      <g filter="url(#hk-wobble)">
        <Occlude d={box(84, 252, 186, 48)} />
        <Wash d={box(84, 252, 186, 48)} fill={c.clay} o={0.35} />
        <P d={s.hatch(86, 256, 182, 42, 9, 0.3)} w={0.4} o={0.35} />
        <P d={s.rect(84, 252, 186, 48, 0.4)} w={1.2} />
        <Wash d={box(80, 244, 194, 10)} fill={c.clay} o={0.7} />
        <P d={s.rect(80, 244, 194, 10, 0.3)} w={1.1} />
      </g>
      {/* The customer with her basket */}
      <g transform={`translate(48 ${FLOOR}) scale(1.32)`}>
        <Person seed={84} shirt={c.vermilion} pants={c.vermilion} hair="bun" look={1}>
          <path d="M-14 -38 l-6 12 h14 l-2 -12 z" fill={c.marigold} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
        </Person>
      </g>
      {/* The goods on the counter; each one leaves as it's billed */}
      <g transform="translate(40 30)">
      {[
        <path key="rice" d="M58 214 c-2 -14 2 -22 6 -24 h18 c4 2 8 10 6 24 z" fill={c.rice} stroke={c.ink} strokeWidth="1" />,
        <path key="oil" d="M110 214 v-22 q0 -5 4 -6 v-5 h5 v5 q4 1 4 6 v22 z" fill={c.marigold} fillOpacity="0.6" stroke={c.ink} strokeWidth="1" />,
        <g key="eggs">
          <rect x="140" y="202" width="34" height="12" rx="2" fill={c.cream} stroke={c.ink} strokeWidth="1" />
          {[146, 154, 162, 170].map((x) => (
            <ellipse key={x} cx={x - 2} cy="202" rx="3.4" ry="4" fill="#f6ead2" stroke={c.ink} strokeWidth="0.7" />
          ))}
        </g>,
      ].map((el, i) => (
        <motion.g key={i} animate={{ opacity: shown(i) ? 0 : 1, x: shown(i) ? 30 : 0 }} transition={{ duration: 0.45 }}>
          {el}
        </motion.g>
      ))}
      </g>
      <Card x={290} y={44} w={170} h={250} title={a.bill}>
        {a.items.map((name, i) => (
          <motion.g key={name} initial={false} animate={{ opacity: shown(i) ? 1 : 0, x: shown(i) ? 0 : -8 }} transition={{ duration: 0.4 }}>
            <T x={302} y={96 + i * 30}>{name}</T>
            <T x={448} y={96 + i * 30} anchor="end" weight={600}>
              {fmtTaka(prices[i], locale)}
            </T>
            <path d={`M302 ${104 + i * 30} h146`} stroke={c.ink} strokeOpacity="0.1" />
          </motion.g>
        ))}
        <motion.g initial={false} animate={{ opacity: step > 3 ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <T x={302} y={200} weight={700}>{a.total}</T>
          <T x={448} y={200} anchor="end" size={15} weight={700} fill="var(--color-leaf-deep)">
            {fmtTaka(690, locale)}
          </T>
        </motion.g>
        <motion.g initial={false} animate={{ opacity: step > 4 ? 1 : 0 }} transition={{ duration: 0.4 }}>
          {a.methods.map((mth, i) => (
            <g key={mth}>
              <rect x={302 + i * 50} y={216} width="44" height="20" rx="10" fill={i === 0 ? "var(--color-leaf-deep)" : c.cream} stroke={i === 0 ? "none" : c.ink} strokeOpacity="0.3" />
              <T x={324 + i * 50} y={230} size={10} anchor="middle" fill={i === 0 ? c.cream : c.ink}>
                {mth}
              </T>
            </g>
          ))}
        </motion.g>
        <AnimatePresence>
          {step > 5 && (
            <motion.g key="stamp" initial={{ opacity: 0, scale: 1.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} style={{ originX: 0.5, originY: 0.5 }}>
              <g transform="rotate(-10 375 266)">
                <rect x="330" y="252" width="90" height="28" rx="6" fill="none" stroke="var(--color-leaf)" strokeWidth="2" />
                <T x={375} y={271} size={13} weight={700} anchor="middle" fill="var(--color-leaf-deep)">
                  ✓ {a.paid}
                </T>
              </g>
            </motion.g>
          )}
        </AnimatePresence>
      </Card>
      {/* Scanner beep at the counter while items are billed */}
      {step > 0 && step < 4 && (
        <motion.path key={`beep-${step}`} d="M230 236 q8 -8 16 0" fill="none" stroke={c.vermilion} strokeWidth="1.6" strokeLinecap="round" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -10 }} transition={{ duration: 0.7 }} />
      )}
      <rect x="228" y="236" width="20" height="9" rx="2" fill={c.ink} fillOpacity="0.75" />
    </Frame>
  );
}

/* ---------------- Inventory: stock comes in, sells down, a low-stock flag ---------------- */
function InventoryArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.inventory;
  const step = useStep(6, 1300);
  const s = new Sketch(4202);
  const levels = [
    [5, 5, 5, 5, 5, 5],
    [4, 4, 4, 3, 2, 2],
    [2, 5, 5, 5, 5, 5],
  ].map((row) => row[step]);
  const tints = [c.rice, c.marigold, "#f0ece2"];
  return (
    <Frame label={t.features.items.inventory.title}>
      <Floor seed={2} />
      <g filter="url(#hk-wobble)">
        <Wash d={box(40, 70, 210, 230)} fill={c.clay} o={0.2} />
        <P d={s.rect(40, 70, 210, 230, 0.5)} w={1.2} />
        {[140, 210, 280].map((y) => (
          <P key={y} d={s.line(40, y, 250, y, 0.3)} w={1.1} />
        ))}
      </g>
      {levels.map((n, row) => (
        <g key={row}>
          <AnimatePresence>
            {Array.from({ length: n }, (_, i) => (
              <motion.g key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.35, delay: i * 0.03 }}>
                {row === 1 ? (
                  <path d={`M${56 + i * 31} ${140 + row * 70} v-30 q0 -6 5 -7 v-6 h6 v6 q5 1 5 7 v30 z`} fill={tints[row]} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.9" />
                ) : (
                  <rect x={52 + i * 31} y={110 + row * 70} width="26" height="30" rx="2" fill={tints[row]} stroke={c.ink} strokeWidth="0.9" />
                )}
              </motion.g>
            ))}
          </AnimatePresence>
          <T x={244} y={130 + row * 70} size={11} anchor="end" fill={c.ink} weight={600}>
            {a.products[row]}
          </T>
        </g>
      ))}
      {/* A carton arrives for the sugar shelf */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g key="carton" initial={{ x: 220, opacity: 0 }} animate={{ x: 0, opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease }}>
            <rect x="150" y="262" width="34" height="26" fill={c.clay} fillOpacity="0.6" stroke={c.ink} strokeWidth="1" />
            <path d="M167 262 v8" stroke={c.ink} strokeWidth="0.8" />
          </motion.g>
        )}
      </AnimatePresence>
      <Card x={280} y={56} w={180} h={236} title={a.title}>
        {a.products.map((name, i) => {
          const n = levels[i];
          const low = n <= 2;
          return (
            <g key={name}>
              <T x={292} y={104 + i * 56} weight={600}>{name}</T>
              <T x={448} y={104 + i * 56} anchor="end" weight={700} fill={low ? c.vermilion : c.ink} latin>
                {fmtNumber(n * 4, locale)}
              </T>
              <rect x={292} y={112 + i * 56} width="156" height="8" rx="4" fill={c.ink} fillOpacity="0.08" />
              <motion.rect x={292} y={112 + i * 56} height="8" rx="4" fill={low ? c.vermilion : "var(--color-leaf)"} initial={false} animate={{ width: (156 * n) / 5 }} transition={{ duration: 0.55, ease }} />
              <AnimatePresence>
                {low && (
                  <motion.g key="low" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ originX: 0.5, originY: 0.5 }}>
                    <rect x={292} y={124 + i * 56} width="62" height="16" rx="8" fill={c.vermilion} fillOpacity="0.15" />
                    <T x={323} y={135.5 + i * 56} size={9.5} anchor="middle" weight={700} fill={c.vermilion}>
                      {a.low}
                    </T>
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          );
        })}
        <AnimatePresence>
          {step === 1 && (
            <motion.g key="in" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <rect x={370} y={236} width="78" height="18" rx="9" fill="var(--color-leaf)" />
              <T x={409} y={248.5} size={9.5} anchor="middle" weight={700} fill="#fff">
                {a.stockIn} +{fmtNumber(16, locale)}
              </T>
            </motion.g>
          )}
        </AnimatePresence>
      </Card>
    </Frame>
  );
}

/* ---------------- Purchases: goods arrive, costs add up, a real cost per unit ---------------- */
function PurchasesArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.purchases;
  const step = useStep(7, 1150);
  const s = new Sketch(4303);
  const rows = [3000, 200, 100];
  return (
    <Frame label={t.features.items.purchases.title}>
      <Floor seed={3} />
      {/* The supplier's godown behind the van */}
      <g filter="url(#hk-wobble)">
        <Occlude d={box(24, 108, 200, 132)} />
        <Wash d={box(24, 108, 200, 132)} fill={c.rice} o={0.35} />
        <P d={s.rect(24, 108, 200, 132, 0.5)} w={1.2} />
        <Wash d={box(20, 96, 208, 22)} fill={c.leafDeep} o={0.85} />
        <P d={s.rect(20, 96, 208, 22, 0.3)} w={1.1} />
        <Wash d={box(120, 140, 88, 100)} fill={c.ink} o={0.12} />
        <P d={s.rect(120, 140, 88, 100, 0.3)} w={1} />
        {[152, 164, 176, 188, 200, 212, 224].map((y) => (
          <P key={y} d={s.line(122, y, 206, y, 0.2, 1)} w={0.5} o={0.6} />
        ))}
        {[[34, 196], [62, 196], [48, 172]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <Wash d={`M${x} ${y + 24} c-2 -14 2 -22 6 -24 h16 c4 2 8 10 6 24 z`} fill={c.rice} o={0.9} />
            <P d={s.curve([[x, y + 24], [x - 2, y + 10], [x + 6, y], [x + 22, y], [x + 28, y + 10], [x + 28, y + 24]], 0.3)} w={0.8} />
          </g>
        ))}
      </g>
      <T x={124} y={111} size={11} weight={600} anchor="middle" fill={c.cream}>{a.supplier}</T>
      {/* Delivery van and sacks being carried in */}
      <g filter="url(#hk-wobble)">
        <Wash d="M20 288 v-46 h70 l20 18 v28 z" fill={c.leafWash} o={0.5} />
        <P d={s.poly([[20, 288], [20, 242], [90, 242], [110, 260], [110, 288]], true, 0.4)} w={1.2} />
        <Wash d={box(94, 248, 12, 10)} fill={c.sky} o={0.5} />
      </g>
      <circle cx="40" cy="292" r="8" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.3" />
      <circle cx="94" cy="292" r="8" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.3" />
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${0} ${0} c-2 -14 2 -22 6 -24 h18 c4 2 8 10 6 24 z`}
          fill={c.rice}
          stroke={c.ink}
          strokeWidth="1"
          initial={false}
          animate={step > i ? { x: 172 + (i % 2) * 34, y: 300 - Math.floor(i / 2) * 24, opacity: 1 } : { x: 46 + i * 12, y: 256, opacity: step === 0 ? 1 : 0.9 }}
          transition={{ duration: 0.8, ease }}
        />
      ))}
      <Card x={250} y={40} w={210} h={256} title={a.supplier}>
        {a.rows.map((name, i) => (
          <motion.g key={name} initial={false} animate={{ opacity: step > i ? 1 : 0, x: step > i ? 0 : -8 }} transition={{ duration: 0.4 }}>
            <T x={264} y={94 + i * 30}>{i > 0 ? `+ ${name}` : name}</T>
            <T x={448} y={94 + i * 30} anchor="end" weight={600}>
              {fmtTaka(rows[i], locale)}
            </T>
          </motion.g>
        ))}
        <motion.g initial={false} animate={{ opacity: step > 3 ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <path d="M264 176 h184" stroke={c.ink} strokeOpacity="0.3" strokeDasharray="3 3" />
          <T x={264} y={200} size={10.5} fill={c.ink}>{a.perUnit}</T>
          <T x={448} y={222} anchor="end" size={18} weight={700} fill="var(--color-leaf-deep)">
            {fmtTaka(66, locale)}
          </T>
        </motion.g>
        <AnimatePresence>
          {step > 4 && (
            <motion.g key="owed" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <rect x={264} y={242} width="184" height="34" rx="8" fill={c.marigold} fillOpacity="0.18" />
              <T x={274} y={262} size={10.5}>{a.owed}</T>
              <T x={440} y={263} anchor="end" weight={700}>
                {fmtTaka(3300, locale)}
              </T>
            </motion.g>
          )}
        </AnimatePresence>
      </Card>
    </Frame>
  );
}

/* ---------------- Expenses: from the cash box into labelled jars ---------------- */
function ExpensesArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.expenses;
  const step = useStep(6, 1200);
  const s = new Sketch(4404);
  const amounts = [8000, 2400, 900, 600];
  const filled = (i: number) => step > i;
  const total = amounts.reduce((sum, v, i) => sum + (filled(i) ? v : 0), 0);
  const jarX = (i: number) => 200 + i * 70;
  return (
    <Frame label={t.features.items.expenses.title}>
      <Floor seed={4} />
      {/* Wall calendar: this month */}
      <g filter="url(#hk-wobble)">
        <Occlude d={box(46, 56, 110, 110)} />
        <P d={s.rect(46, 56, 110, 110, 0.4)} w={1.1} />
        <Wash d={box(46, 56, 110, 22)} fill={c.vermilion} o={0.7} />
        {[90, 75, 120, 135].map((x) => (
          <P key={x} d={s.line(x, 52, x, 60, 0.1, 1)} w={1.4} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={i} x={54 + (i % 5) * 20} y={86 + Math.floor(i / 5) * 19} width="14" height="13" rx="2" fill={i === 13 ? c.leaf : c.ink} fillOpacity={i === 13 ? 0.5 : 0.08} />
        ))}
      </g>
      {/* Cash box */}
      <g filter="url(#hk-wobble)">
        <Wash d={box(40, 230, 110, 66)} fill={c.clay} o={0.6} />
        <P d={s.rect(40, 230, 110, 66, 0.4)} w={1.3} />
        <Wash d={quad([[36, 230], [154, 230], [144, 206], [46, 206]])} fill={c.clay} o={0.8} />
        <P d={s.poly([[36, 230], [154, 230], [144, 206], [46, 206]], true, 0.3)} w={1.2} />
        <P d={s.rect(84, 252, 22, 10, 0.2, 1)} w={1} />
      </g>
      {/* A note flies from the box into the next jar */}
      {step > 0 && step < 5 && (
        <motion.g key={`note-${step}`} initial={{ x: 70, y: 200, opacity: 0, rotate: -10 }} animate={{ x: jarX(step - 1) - 14, y: [200, 150, 196], opacity: [0, 1, 1, 0], rotate: 10 }} transition={{ duration: 0.9, ease }}>
          <rect width="30" height="16" rx="2" fill={c.leafWash} fillOpacity="0.7" stroke={c.ink} strokeWidth="0.8" />
          <circle cx="15" cy="8" r="3.5" fill="none" stroke={c.ink} strokeWidth="0.6" />
        </motion.g>
      )}
      {a.cats.map((cat, i) => {
        const x = jarX(i);
        const fillH = filled(i) ? 20 + (amounts[i] / 8000) * 50 : 0;
        return (
          <g key={cat}>
            <motion.rect x={x - 24} width="48" rx="3" fill={[c.leaf, c.marigold, c.sky, c.vermilion][i]} fillOpacity="0.35" initial={false} animate={{ y: 294 - fillH, height: fillH }} transition={{ duration: 0.55, ease }} />
            <path d={`M${x - 26} 214 v76 q0 6 6 6 h40 q6 0 6 -6 v-76`} fill="none" stroke={c.ink} strokeWidth="1.2" />
            <path d={`M${x - 30} 214 h60`} stroke={c.ink} strokeWidth="1.6" strokeLinecap="round" />
            <rect x={x - 26} y={238} width="52" height="18" rx="3" fill={c.cream} stroke={c.ink} strokeWidth="0.6" />
            <T x={x} y={251} size={10} anchor="middle" weight={600}>{cat}</T>
            <motion.g initial={false} animate={{ opacity: filled(i) ? 1 : 0 }}>
              <T x={x} y={206} size={10.5} anchor="middle" weight={700} latin>
                {fmtTaka(amounts[i], locale)}
              </T>
            </motion.g>
          </g>
        );
      })}
      <Card x={200} y={40} w={250} h={120} title={a.month}>
        <T x={214} y={104} size={30} weight={700} fill="var(--color-leaf-deep)" latin>
          {fmtTaka(total, locale)}
        </T>
        <rect x={214} y={124} width="222" height="10" rx="5" fill={c.ink} fillOpacity="0.07" />
        {(() => {
          let x0 = 214;
          return amounts.map((v, i) => {
            const w = filled(i) ? (v / 11900) * 222 : 0;
            const el = <motion.rect key={i} y={124} height="10" initial={false} animate={{ x: x0, width: w }} fill={[c.leaf, c.marigold, c.sky, c.vermilion][i]} fillOpacity="0.75" transition={{ duration: 0.5 }} />;
            x0 += w;
            return el;
          });
        })()}
      </Card>
    </Frame>
  );
}

/* ---------------- Digital khata: handwritten dues become a clear digital balance ---------------- */
function CustomersArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.customers;
  const step = useStep(6, 1250);
  const s = new Sketch(4505);
  const dues = [450, step > 3 ? 700 : 1200, 300];
  const total = dues.reduce((x, y) => x + y, 0);
  return (
    <Frame label={t.features.items.customers.title}>
      {/* The khata */}
      <g filter="url(#hk-wobble)" transform="rotate(-5 120 180)">
        <Wash d="M24 270 l6 -180 h188 l6 180 z" fill={c.vermilion} o={0.75} />
        <path d="M34 262 l4 -164 h80 l1 164 z" fill={c.cream} />
        <path d="M122 262 l-1 -164 h84 l5 164 z" fill={c.cream} />
        <P d={s.poly([[34, 262], [38, 98], [118, 98], [119, 262]], true, 0.3)} w={1} />
        <P d={s.poly([[122, 262], [121, 98], [205, 98], [210, 262]], true, 0.3)} w={1} />
        {a.names.map((n, i) => (
          <g key={n}>
            <text x="46" y={134 + i * 36} fontSize="13" className="font-hand" fill={c.ink}>
              {n}
            </text>
            <P d={s.curve([[128, 130 + i * 36], [150, 126 + i * 36], [170, 132 + i * 36], [196, 128 + i * 36]], 0.4)} w={0.9} />
          </g>
        ))}
        {[220, 236].map((y) => (
          <P key={y} d={s.curve([[46, y], [80, y - 2], [110, y + 1]], 0.3)} w={0.6} o={0.6} />
        ))}
      </g>
      {/* Green ink lines from each handwritten line to its digital row */}
      {a.names.map((n, i) => (
        <motion.path key={n} d={`M200 ${128 + i * 36} C 240 ${128 + i * 36}, 250 ${112 + i * 48}, 284 ${112 + i * 48}`} fill="none" stroke="var(--color-leaf)" strokeWidth="1.8" strokeLinecap="round" initial={false} animate={{ pathLength: step > i ? 1 : 0, opacity: step > i ? 1 : 0 }} transition={{ duration: 0.6, ease }} />
      ))}
      <Card x={284} y={50} w={180} h={250} title={a.title}>
        {a.names.map((n, i) => (
          <motion.g key={n} initial={false} animate={{ opacity: step > i ? 1 : 0, x: step > i ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <circle cx={302} cy={108 + i * 48} r="10" fill={[c.clay, c.plum, c.teal][i]} fillOpacity="0.35" />
            <T x={302} y={112 + i * 48} size={10} anchor="middle" weight={700}>{n.slice(0, 1)}</T>
            <T x={320} y={112 + i * 48} weight={600}>{n}</T>
            <motion.text key={dues[i]} x={452} y={112 + i * 48} fontSize="12" fontWeight="700" fill={c.vermilion} textAnchor="end" initial={{ scale: 1.25 }} animate={{ scale: 1 }} style={{ fontFamily: "var(--font-manrope)", originX: 1, originY: 0.5 }}>
              {fmtTaka(dues[i], locale)}
            </motion.text>
          </motion.g>
        ))}
        <AnimatePresence>
          {step === 3 && (
            <motion.g key="paid" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <rect x={344} y={172} width="108" height="18" rx="9" fill="var(--color-leaf)" />
              <T x={398} y={184.5} size={9.5} anchor="middle" weight={700} fill="#fff">
                ✓ {a.paid} {fmtTaka(500, locale)}
              </T>
            </motion.g>
          )}
        </AnimatePresence>
        <path d="M296 248 h156" stroke={c.ink} strokeOpacity="0.15" />
        <motion.g initial={false} animate={{ opacity: step > 2 ? 1 : 0 }}>
          <T x={298} y={276} size={11}>{a.total}</T>
          <T x={452} y={277} anchor="end" size={15} weight={700} fill="var(--color-leaf-deep)" latin>
            {fmtTaka(total, locale)}
          </T>
        </motion.g>
      </Card>
    </Frame>
  );
}

/* ---------------- Reports: a pile of receipts becomes a week you can read ---------------- */
function ReportsArt() {
  const { t } = useI18n();
  const a = t.features.art.reports;
  const step = useStep(8, 900);
  const sales = [62, 48, 70, 55, 80, 66, 92];
  const spend = [30, 26, 34, 28, 38, 30, 40];
  return (
    <Frame label={t.features.items.reports.title}>
      <Floor seed={6} />
      {/* Receipts pile; one flies off with each new day */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${[-8, 6, -3, 10][i]} ${70 + i * 6} 270)`}>
          <path d={`M${44 + i * 6} ${250 - i * 6} h40 v44 l-5 -3 l-5 3 l-5 -3 l-5 3 l-5 -3 l-5 3 l-5 -3 l-5 3 z`} fill={c.cream} stroke={c.ink} strokeWidth="0.9" />
          <path d={`M${50 + i * 6} ${262 - i * 6} h26 M${50 + i * 6} ${270 - i * 6} h20`} stroke={c.ink} strokeOpacity="0.4" />
        </g>
      ))}
      {step > 0 && step < 8 && (
        <motion.path key={`slip-${step}`} d="M0 0 h18 v22 h-18 z" fill={c.cream} stroke={c.ink} strokeWidth="0.8" initial={{ x: 70, y: 240, opacity: 0 }} animate={{ x: 212 + (step - 1) * 34, y: [240, 120, 230], opacity: [0, 1, 0] }} transition={{ duration: 0.8, ease }} />
      )}
      <Card x={160} y={30} w={300} h={268} title={a.title}>
        {a.periods.map((p, i) => (
          <g key={p}>
            <rect x={174 + i * 58} y={64} width="52" height="20" rx="10" fill={i === 1 ? "var(--color-leaf-deep)" : c.cream} stroke={i === 1 ? "none" : c.ink} strokeOpacity="0.25" />
            <T x={200 + i * 58} y={78} size={10} anchor="middle" fill={i === 1 ? c.cream : c.ink}>{p}</T>
          </g>
        ))}
        {sales.map((v, i) => {
          const on = step > i;
          return (
            <g key={i}>
              <motion.rect x={186 + i * 36} width="14" rx="2" fill="var(--color-leaf)" initial={false} animate={{ y: on ? 236 - v * 1.3 : 236, height: on ? v * 1.3 : 0 }} transition={{ duration: 0.55, ease }} />
              <motion.rect x={201 + i * 36} width="8" rx="2" fill={c.marigold} fillOpacity="0.8" initial={false} animate={{ y: on ? 236 - spend[i] * 1.3 : 236, height: on ? spend[i] * 1.3 : 0 }} transition={{ duration: 0.55, ease, delay: 0.08 }} />
              <T x={197 + i * 36} y={252} size={9} anchor="middle" fill={c.ink}>{a.days[i]}</T>
            </g>
          );
        })}
        <path d="M178 236 h270" stroke={c.ink} strokeOpacity="0.25" />
        <rect x={176} y={266} width="10" height="10" rx="2" fill="var(--color-leaf)" />
        <T x={190} y={275} size={9.5}>{a.sales}</T>
        <rect x={236} y={266} width="10" height="10" rx="2" fill={c.marigold} />
        <T x={250} y={275} size={9.5}>{a.expenses}</T>
        <AnimatePresence>
          {step === 7 && (
            <motion.g key="best" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ originX: 1, originY: 0.5 }}>
              <rect x={330} y={262} width="120" height="20" rx="10" fill="var(--color-leaf)" fillOpacity="0.15" />
              <T x={390} y={276} size={9.5} anchor="middle" weight={700} fill="var(--color-leaf-deep)">
                ★ {a.best}: {a.bestItem}
              </T>
            </motion.g>
          )}
        </AnimatePresence>
      </Card>
    </Frame>
  );
}

/* ---------------- Assistant: a question in Bangla, an answer from the records ---------------- */
function AssistantArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.assistant;
  const step = useStep(6, 1300);
  const answer = interpolate(a.a, { amount: fmtTaka(24530, locale), n: fmtNumber(86, locale) });
  return (
    <Frame label={t.features.items.assistant.title}>
      <Floor seed={7} />
      <g transform={`translate(110 ${FLOOR}) scale(1.6)`}>
        <Person seed={83} shirt={c.sky} hair="tupi" look={1} arms={false}>
          <path d="M-10 -56 C-14 -50 -14 -44 -12 -40 M10 -56 C16 -54 20 -52 22 -50" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
          <rect x="21" y="-58" width="7" height="12" rx="1.4" fill={c.ink} fillOpacity="0.85" />
        </Person>
      </g>
      {/* The spoken question */}
      <motion.g initial={false} animate={{ opacity: step > 0 ? 1 : 0, y: step > 0 ? 0 : 6 }} transition={{ duration: 0.4 }}>
        <path d="M30 46 h170 a12 12 0 0 1 12 12 v20 a12 12 0 0 1 -12 12 h-120 l-14 12 v-12 h-36 a12 12 0 0 1 -12 -12 v-20 a12 12 0 0 1 12 -12 z" fill={c.cream} stroke={c.ink} strokeWidth="1.1" />
        <T x={116} y={73} size={13} weight={600} anchor="middle">{a.q}</T>
      </motion.g>
      {step === 1 &&
        [0, 1, 2].map((i) => (
          <motion.path key={i} d={`M${158 + i * 8} ${170 - i * 4} q${6 + i * 2} ${14 + i * 4} 0 ${28 + i * 8}`} fill="none" stroke="var(--color-leaf)" strokeWidth="2" strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: [0, 6] }} transition={{ duration: 0.9, delay: i * 0.15, repeat: 1 }} />
        ))}
      {/* Phone with the conversation */}
      <rect x="272" y="30" width="180" height="270" rx="22" fill={c.ink} fillOpacity="0.9" />
      <rect x="280" y="40" width="164" height="250" rx="16" fill="var(--color-forest)" />
      <circle cx="294" cy="58" r="3" fill="var(--color-leaf-glow)" />
      <T x={302} y={62} size={10} weight={600} fill={c.cream} latin>HelloKhata</T>
      <motion.g initial={false} animate={{ opacity: step > 1 ? 1 : 0, x: step > 1 ? 0 : 10 }} transition={{ duration: 0.4 }}>
        <rect x="320" y="84" width="114" height="34" rx="12" fill={c.cream} />
        <T x={377} y={105} size={10.5} anchor="middle">{a.q}</T>
      </motion.g>
      {step === 2 && (
        <g>
          {[300, 310, 320].map((x, i) => (
            <motion.circle key={x} cx={x} cy="142" r="3" fill={c.cream} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </g>
      )}
      <motion.g initial={false} animate={{ opacity: step > 2 ? 1 : 0, y: step > 2 ? 0 : 8 }} transition={{ duration: 0.45 }}>
        <foreignObject x="290" y="130" width="144" height="92">
          <div className="rounded-xl rounded-bl-sm bg-leaf-deep px-3 py-2 text-[11px] leading-snug text-cream">{answer}</div>
        </foreignObject>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step > 3 ? 1 : 0 }} transition={{ duration: 0.4 }}>
        <rect x="290" y="232" width="144" height="22" rx="11" fill={c.cream} fillOpacity="0.12" stroke="var(--color-leaf-glow)" strokeOpacity="0.5" />
        <T x={362} y={247} size={9.5} anchor="middle" fill="var(--color-leaf-glow)">↳ {a.source}</T>
      </motion.g>
      <circle cx="362" cy="272" r="9" fill="var(--color-leaf)" />
      <path d="M362 267v6M359 271c.1 2 1.4 3 3 3s2.9-1 3-3" fill="none" stroke={c.cream} strokeWidth="1.2" strokeLinecap="round" />
    </Frame>
  );
}

/* ---------------- Bulk SMS: one message, a whole group ---------------- */
function SmsArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.sms;
  const step = useStep(5, 1300);
  const homes = [70, 160, 250];
  return (
    <Frame label={t.features.items.sms.title}>
      <Floor seed={8} />
      <rect x="30" y="30" width="180" height="270" rx="22" fill={c.ink} fillOpacity="0.9" />
      <rect x="38" y="40" width="164" height="250" rx="16" fill={c.cream} />
      <rect x="50" y="56" width="140" height="22" rx="11" fill="var(--color-leaf)" fillOpacity="0.15" />
      <T x={120} y={71} size={10} anchor="middle" weight={600} fill="var(--color-leaf-deep)">{a.group}</T>
      <foreignObject x="50" y="90" width="140" height="110">
        <div className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-[11px] leading-snug text-ink">{a.msg}</div>
      </foreignObject>
      <T x={120} y={222} size={9.5} anchor="middle" fill={c.ink}>{interpolate(a.recipients, { n: fmtNumber(37, locale) })}</T>
      <motion.g animate={step === 1 ? { scale: [1, 0.92, 1] } : { scale: 1 }} transition={{ duration: 0.4 }} style={{ originX: 0.5, originY: 0.5 }}>
        <rect x="70" y="238" width="100" height="30" rx="15" fill="var(--color-leaf-deep)" />
        <T x={120} y={257} size={12} anchor="middle" weight={700} fill={c.cream}>{a.send}</T>
      </motion.g>
      {/* Envelopes fly to each customer */}
      {homes.map((y, i) => (
        <g key={y}>
          <g filter="url(#hk-wobble)">
            <path d={`M${360} ${y + 36} v-30 l30 -20 l30 20 v30 z`} fill={c.cream} stroke={c.ink} strokeWidth="1.2" />
            <rect x="383" y={y + 16} width="14" height="20" fill={[c.clay, c.teal, c.plum][i]} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" />
          </g>
          <AnimatePresence>
            {step === 2 && (
              <motion.g key={`env-${i}`} initial={{ x: 180, y: 250, opacity: 0, scale: 0.6 }} animate={{ x: 320, y: y + 4, opacity: [0, 1, 1, 0], scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, delay: i * 0.15, ease }}>
                <rect width="26" height="18" rx="2" fill={c.cream} stroke={c.ink} strokeWidth="1" />
                <path d="M0 0 l13 10 l13 -10" fill="none" stroke={c.ink} strokeWidth="1" />
              </motion.g>
            )}
          </AnimatePresence>
          <motion.g initial={false} animate={{ opacity: step > 2 ? 1 : 0, scale: step > 2 ? 1 : 0.6 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.1 }} style={{ originX: 0.5, originY: 0.5 }}>
            <circle cx="428" cy={y + 4} r="11" fill="var(--color-leaf)" />
            <path d={`M423 ${y + 4} l3.4 3.4 l6 -6`} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>
      ))}
    </Frame>
  );
}

/* ---------------- Multi-branch: each branch's sales come together ---------------- */
function MultiBranchArt() {
  const { t, locale } = useI18n();
  const a = t.features.art.multiBranch;
  const names = t.supershop.dashboard.locations;
  const step = useStep(5, 1300);
  const s = new Sketch(4909);
  const list = branches.slice(0, 3);
  const total = list.reduce((sum, b, i) => sum + (step > i ? b.sales : 0), 0);
  const max = Math.max(...list.map((b) => b.sales));
  const ys = [44, 134, 224];
  return (
    <Frame label={t.features.items["multi-branch"].title}>
      {list.map((b, i) => {
        const y = ys[i];
        return (
          <g key={b.key}>
            <g filter="url(#hk-wobble)">
              <Occlude d={box(30, y, 110, 66)} />
              <Wash d={box(26, y, 118, 14)} fill={[c.marigold, c.vermilion, c.leafWash][i]} o={0.8} />
              <P d={s.rect(26, y, 118, 14, 0.3)} w={1.1} />
              <P d={s.rect(30, y + 14, 110, 52, 0.4)} w={1.1} />
              <Wash d={box(40, y + 24, 30, 22)} fill={c.sky} o={0.3} />
              <P d={s.rect(40, y + 24, 30, 22, 0.2, 1)} w={0.8} />
              <P d={s.rect(98, y + 30, 22, 36, 0.2, 1)} w={0.9} />
            </g>
            <T x={85} y={y + 82} size={11} anchor="middle" weight={600}>{names[b.key]}</T>
            <path d={`M140 ${y + 40} C 180 ${y + 40}, 190 ${120 + i * 48}, 230 ${120 + i * 48}`} fill="none" stroke="var(--color-leaf)" strokeWidth="1.8" strokeOpacity="0.5" />
            {step === i + 1 && (
              <motion.circle key={`drop-${i}`} r="4.5" fill="var(--color-leaf-glow)" stroke="#fff" strokeWidth="1.4" initial={{ cx: 140, cy: y + 40, opacity: 0 }} animate={{ cx: [140, 185, 230], cy: [y + 40, (y + 40 + 120 + i * 48) / 2, 120 + i * 48], opacity: [0, 1, 0] }} transition={{ duration: 0.8, ease }} />
            )}
          </g>
        );
      })}
      <Card x={230} y={40} w={230} h={256} title={a.total}>
        <T x={244} y={98} size={24} weight={700} fill="var(--color-leaf-deep)" latin>
          {fmtTaka(total, locale)}
        </T>
        {list.map((b, i) => (
          <g key={b.key}>
            <T x={244} y={128 + i * 48} size={10.5} weight={600}>{names[b.key]}</T>
            <T x={448} y={128 + i * 48} size={10.5} anchor="end" weight={600} latin>
              {step > i ? fmtTaka(b.sales, locale) : "—"}
            </T>
            <rect x={244} y={136 + i * 48} width="204" height="8" rx="4" fill={c.ink} fillOpacity="0.07" />
            <motion.rect x={244} y={136 + i * 48} height="8" rx="4" fill="var(--color-leaf)" initial={false} animate={{ width: step > i ? (204 * b.sales) / max : 0, opacity: step > i ? 1 : 0 }} transition={{ duration: 0.55, ease }} />
          </g>
        ))}
      </Card>
    </Frame>
  );
}

const scenes: Record<FeatureSlug, () => ReactNode> = {
  sales: SalesArt,
  inventory: InventoryArt,
  purchases: PurchasesArt,
  expenses: ExpensesArt,
  customers: CustomersArt,
  reports: ReportsArt,
  assistant: AssistantArt,
  sms: SmsArt,
  "multi-branch": MultiBranchArt,
};

export function FeatureArt({ slug }: { slug: FeatureSlug }) {
  const Scene = scenes[slug];
  return <Scene />;
}
