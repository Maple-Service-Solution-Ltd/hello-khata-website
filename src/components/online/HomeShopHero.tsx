"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { P, Wash, Occlude, box, quad, palette as c } from "@/components/illustrations/ink";
import { Person, Section, skin } from "@/components/illustrations/InkPeople";

/**
 * Online Store hero: "ঘরের ভেতরে দোকান", a shop that lives inside a home.
 * A seller's room in a Dhaka flat, cut open like a dollhouse; one whole wall has become the online store,
 * drawn as a big browser window. A product photographed on the stool flies into the catalogue, the theme
 * changes, the shop's own domain types itself in, a customer orders and pays, the order comes back into the
 * room, the seller packs it and a courier rider carries it away. Visitors can click the theme swatches, and
 * hover or tap products, the address bar, the order panel, the parcels, the photo corner and the rider.
 * All figures are sample data.
 */

const W = 640;
const H = 560;
const FLOOR = 446;

/** The browser wall. */
const BX = 342;
const BY = 124;
const BW = 252;
const BH = 306;
/** Product grid: 3 × 2 cards. */
const cardXY = (i: number) => [352 + (i % 3) * 52, 200 + Math.floor(i / 3) * 68] as const;
const CARD_W = 48;
const CARD_H = 64;
const products = [
  { price: 1250, stock: 8, orders: 0, tint: c.vermilion, icon: "bag" },
  { price: 4800, stock: 5, orders: 3, tint: c.teal, icon: "sari" },
  { price: 1950, stock: 12, orders: 4, tint: c.sky, icon: "panjabi" },
  { price: 350, stock: 40, orders: 9, tint: c.clay, icon: "earrings" },
  { price: 1450, stock: 14, orders: 2, tint: c.plum, icon: "kurti" },
  { price: 420, stock: 22, orders: 5, tint: c.marigold, icon: "mug" },
] as const;
const themes = [c.leaf, c.marigold, c.plum, c.vermilion];
const swatchAt = (i: number) => [398 + i * 20, 362] as const;
const DOMAIN = "rangdhanu.com.bd";

const STOOL = [126, 386] as const;
const SELLER_X = 268;
const DOOR_X = 108;
const PHONE = [250, 378] as const;
const inkLine = "M246 372 C 290 330, 300 262, 342 238";
const ease = [0.45, 0, 0.55, 1] as const;
const LOOP = 19500;

type Zone = "domain" | "orders" | "parcels" | "photo" | "rider" | `p${number}`;
type Step = 0 | 1 | 2 | 3;

function Icon({ kind, x, y, tint }: { kind: string; x: number; y: number; tint: string }) {
  const sw = { stroke: c.ink, strokeWidth: 0.7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  switch (kind) {
    case "bag":
      return (
        <g>
          <path d={`M${x - 9} ${y + 9} l2 -14 h14 l2 14 z`} fill={tint} fillOpacity="0.45" {...sw} />
          <path d={`M${x - 4} ${y - 5} q4 -7 8 0`} fill="none" {...sw} />
          <path d={`M${x - 6} ${y + 1} h12 M${x - 6.5} ${y + 5} h13`} fill="none" stroke={c.ink} strokeWidth="0.5" strokeDasharray="1.2 1.2" />
        </g>
      );
    case "sari":
      return (
        <g>
          <path d={box(x - 11, y - 7, 22, 15)} fill={tint} fillOpacity="0.4" {...sw} />
          <path d={`M${x - 11} ${y + 4} h22`} stroke={c.marigold} strokeWidth="2" />
          <path d={`M${x - 11} ${y - 1} h22`} fill="none" stroke={c.ink} strokeWidth="0.4" />
        </g>
      );
    case "panjabi":
      return <path d={`M${x - 5} ${y - 8} l-7 4 l2 5 l3 -1 v10 h14 v-10 l3 1 l2 -5 l-7 -4 q-5 4 -10 0 z`} fill={tint} fillOpacity="0.45" {...sw} />;
    case "earrings":
      return (
        <g>
          {[-5, 5].map((dx) => (
            <g key={dx}>
              <circle cx={x + dx} cy={y - 6} r="1.4" fill="none" {...sw} />
              <path d={`M${x + dx} ${y - 4.6} l-3.5 8 q3.5 4 7 0 z`} fill={tint} fillOpacity="0.55" {...sw} />
            </g>
          ))}
        </g>
      );
    case "kurti":
      return <path d={`M${x - 4} ${y - 9} l-5 3 l1 5 l2 -1 l-2 11 h16 l-2 -11 l2 1 l1 -5 l-5 -3 q-4 3 -8 0 z`} fill={tint} fillOpacity="0.45" {...sw} />;
    default:
      return (
        <g>
          <path d={`M${x - 6} ${y - 7} h12 v13 q0 3 -3 3 h-6 q-3 0 -3 -3 z`} fill={tint} fillOpacity="0.5" {...sw} />
          <path d={`M${x + 6} ${y - 4} q5 0 5 4 q0 4 -5 4`} fill="none" {...sw} />
        </g>
      );
  }
}

/** The room, the stairwell outside the door, the floor below and the street. */
function Room({ m }: { m: { street: string } }) {
  const s = new Sketch(6110);
  return (
    <g filter="url(#hk-wobble)">
      {/* Back wall */}
      <Occlude d={box(84, 110, 516, 336)} />
      <Wash d={box(84, 110, 258, 336)} fill={c.marigold} o={0.12} />
      <Wash d={box(342, 110, 258, 336)} fill={c.sky} o={0.08} />
      {/* Ceiling, floor slab, walls */}
      <Section x={70} y={96} w={548} h={14} />
      <Section x={70} y={FLOOR} w={548} h={12} />
      <Section x={74} y={110} w={10} h={238} />
      <Section x={600} y={110} w={10} h={336} />

      {/* Window with curtains, city outside */}
      <Wash d={box(102, 140, 76, 64)} fill={c.sky} o={0.3} />
      <P d={s.rect(102, 140, 76, 64, 0.4)} w={1.1} />
      <P d={s.line(140, 140, 140, 204, 0.2, 1)} w={0.7} />
      {[[108, 186, 8, 18], [120, 176, 12, 28], [146, 182, 10, 22], [160, 172, 12, 32]].map(([x, y, w, h], i) => (
        <g key={i}>
          <Wash d={box(x, y, w, h)} fill={c.ink} o={0.12} />
          <P d={s.rect(x, y, w, h, 0.2, 1)} w={0.5} o={0.6} />
        </g>
      ))}
      <P d={s.line(98, 136, 182, 136, 0.3)} w={1.2} />

      {/* Exterior: stairwell to the door, the floor below, the street */}
      <Section x={10} y={FLOOR} w={64} h={6} />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 16 + i * 8;
        const y = 516 - i * 10;
        return <P key={i} d={s.poly([[x, y + 10], [x, y], [x + 8, y]], false, 0.2, 1)} w={0.8} />;
      })}
      <P d={s.line(14, 528, 70, 460, 0.3)} w={0.6} o={0.5} />
      <Wash d={box(84, 458, 516, 52)} fill={c.rice} o={0.2} />
      <P d={s.rect(84, 458, 516, 52, 0.4, 1)} w={0.8} o={0.6} />
      <Wash d={box(130, 468, 90, 42)} fill={c.ink} o={0.1} />
      <P d={s.rect(130, 468, 90, 42, 0.3, 1)} w={0.8} />
      {[476, 484, 492, 500].map((y) => (
        <P key={y} d={s.line(132, y, 218, y, 0.2, 1)} w={0.5} o={0.6} />
      ))}
      <Wash d={box(420, 470, 60, 26)} fill={c.sky} o={0.3} />
      <P d={s.rect(420, 470, 60, 26, 0.3, 1)} w={0.8} />
      <P d={s.line(0, 548, 640, 548, 0.5, 1)} w={0.6} o={0.35} />
      <P d={s.line(0, 512, 640, 512, 0.5)} w={1.1} />
      {[60, 200, 340, 480, 610].map((x) => (
        <P key={x} d={s.line(x - 18, 532, x + 18, 532, 0.3, 1)} w={0.6} o={0.4} />
      ))}
      <text x="560" y="530" textAnchor="middle" fontSize="8" fill={c.ink} fillOpacity="0.45" style={{ fontFamily: "var(--font-sans)" }}>
        {m.street}
      </text>

      {/* Door (ajar) */}
      <Wash d={quad([[84, 348], [104, 354], [104, 440], [84, 446]])} fill={c.clay} o={0.5} />
      <P d={s.poly([[84, 348], [104, 354], [104, 440], [84, 446]], true, 0.3)} w={1} />
      <circle cx="99" cy="400" r="1.6" fill={c.ink} />

      {/* Photo corner: ring light and stool */}
      <P d={s.line(104, 446, 104, 312, 0.3)} w={1} />
      <P d={s.poly([[96, 446], [104, 432], [112, 446]], false, 0.2)} w={0.9} />
      <P d={s.ellipse(104, 296, 16, 16, 0.3)} w={1.4} />
      <P d={s.ellipse(104, 296, 12, 12, 0.2)} w={0.6} o={0.6} />
      <Wash d={box(112, 396, 30, 6)} fill={c.clay} o={0.7} />
      <P d={s.rect(112, 396, 30, 6, 0.2)} w={0.9} />
      <P d={s.line(116, 402, 113, 446, 0.2, 1)} w={0.9} />
      <P d={s.line(138, 402, 141, 446, 0.2, 1)} w={0.9} />
      <P d={s.line(115, 426, 139, 426, 0.2, 1)} w={0.6} />

      {/* Clothes rack with saris and bags, folded sari below */}
      <P d={s.line(150, 246, 214, 246, 0.3)} w={1.2} />
      <P d={s.line(152, 246, 150, 446, 0.3, 1)} w={1} />
      <P d={s.line(212, 246, 214, 446, 0.3, 1)} w={1} />
      {[
        [158, c.teal, 76],
        [172, c.vermilion, 88],
        [186, c.marigold, 70],
        [200, c.plum, 82],
      ].map(([x, tint, h]) => {
        const X = x as number;
        const d = `M${X - 6} 250 h12 l2 ${h} h-16 z`;
        return (
          <g key={X}>
            <P d={s.curve([[X - 2, 250], [X, 244], [X + 2, 246]], 0.1)} w={0.6} />
            <Wash d={d} fill={tint as string} o={0.45} />
            <P d={s.poly([[X - 6, 250], [X + 6, 250], [X + 8, 250 + (h as number)], [X - 8, 250 + (h as number)]], true, 0.3)} w={0.8} />
            <P d={s.line(X - 7.5, 242 + (h as number), X + 7.5, 242 + (h as number), 0.2, 1)} w={1.6} c={c.marigold} o={0.7} />
          </g>
        );
      })}
      <P d={s.line(150, 420, 214, 420, 0.3)} w={1} />
      <Wash d={box(156, 404, 52, 16)} fill={c.teal} o={0.4} />
      <P d={s.rect(156, 404, 52, 16, 0.3, 1)} w={0.8} />
      <P d={s.line(156, 412, 208, 412, 0.2, 1)} w={0.5} />
      {[[158, 432], [180, 432]].map(([x, y]) => (
        <g key={x}>
          <Wash d={box(x, y, 18, 14)} fill={c.clay} o={0.45} />
          <P d={s.rect(x, y, 18, 14, 0.2, 1)} w={0.7} />
        </g>
      ))}

      {/* Parcel shelf above the table */}
      <P d={s.line(222, 264, 334, 264, 0.3)} w={1.2} />
      <P d={s.line(230, 264, 234, 272, 0.2, 1)} w={0.8} />
      <P d={s.line(326, 264, 322, 272, 0.2, 1)} w={0.8} />
      {[[226, 240, 24, 24], [252, 246, 20, 18], [274, 236, 26, 28], [302, 244, 28, 20]].map(([x, y, w, h], i) => (
        <g key={i}>
          <Wash d={box(x, y, w, h)} fill={c.clay} o={0.5} />
          <P d={s.rect(x, y, w, h, 0.2, 1)} w={0.8} />
          <path d={box(x + 4, y + 5, w * 0.5, 6)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
        </g>
      ))}
    </g>
  );
}

/** Work table with the sewing machine, drawn over the seller. */
function Table() {
  const s = new Sketch(6201);
  return (
    <g filter="url(#hk-wobble)">
      <Occlude d={box(220, 392, 114, 8)} />
      <Wash d={box(220, 392, 114, 8)} fill={c.clay} o={0.75} />
      <P d={s.rect(220, 392, 114, 8, 0.3)} w={1.1} />
      <P d={s.line(226, 400, 226, 446, 0.2)} w={1.1} />
      <P d={s.line(328, 400, 328, 446, 0.2)} w={1.1} />
      <P d={s.line(226, 430, 328, 430, 0.2, 1)} w={0.6} o={0.6} />
      {/* Sewing machine */}
      <path d="M290 392 v-18 q0 -6 6 -6 h24 q6 0 6 6 v6 h-6 v12 z" fill="var(--color-paper)" />
      <Wash d="M290 392 v-18 q0 -6 6 -6 h24 q6 0 6 6 v6 h-6 v12 z" fill={c.ink} o={0.35} />
      <P d={s.curve([[290, 392], [290, 372], [296, 368], [320, 368], [326, 374], [326, 380], [320, 380], [320, 392]], 0.2)} w={1} />
      <P d={s.rect(288, 389, 40, 3, 0.1, 1)} w={0.8} />
      <P d={s.ellipse(310, 375, 3, 3, 0.1)} w={0.6} />
    </g>
  );
}

export function HomeShopHero() {
  const { t, locale } = useI18n();
  const m = t.onlineStore.heroHome;
  const reduce = useReducedMotion();

  const [flash, setFlash] = useState(0);
  const [fly, setFly] = useState(false);
  const [listed, setListed] = useState(!!reduce);
  const [theme, setTheme] = useState(0);
  const picked = useRef(false);
  const [typed, setTyped] = useState(reduce ? DOMAIN.length : 0);
  const [cursor, setCursor] = useState<"off" | "card" | "cart" | "order">("off");
  const [tap, setTap] = useState(0);
  const [order, setOrder] = useState<Step | null>(reduce ? 3 : null);
  const [paid, setPaid] = useState(false);
  const [buzz, setBuzz] = useState(0);
  const [slip, setSlip] = useState(false);
  const [parcel, setParcel] = useState<"none" | "bag" | "box" | "carry" | "rider">("none");
  const [seller, setSeller] = useState<"table" | "door" | "back">("table");
  const [rider, setRider] = useState<"off" | "door" | "ride">("off");
  const [orders, setOrders] = useState(23);
  const [zone, setZone] = useState<Zone | null>(null);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const run = () => {
      // Photographed on the stool, the bag flies into the catalogue
      at(500, () => setFlash((f) => f + 1));
      at(1100, () => setFly(true));
      at(2800, () => {
        setFly(false);
        setListed(true);
      });
      // The theme changes (unless the visitor picked one), the domain types itself in
      if (!picked.current) {
        at(3700, () => !picked.current && setTheme(1));
        at(4400, () => !picked.current && setTheme(2));
        at(5100, () => !picked.current && setTheme(0));
      }
      for (let i = 1; i <= DOMAIN.length; i++) at(5800 + i * 80, () => setTyped(i));
      // A customer orders and pays
      at(7600, () => setCursor("card"));
      at(8200, () => {
        setCursor("cart");
        setTap((k) => k + 1);
      });
      at(9000, () => {
        setCursor("order");
        setTap((k) => k + 1);
      });
      at(9500, () => {
        setOrder(0);
        setPaid(true);
        setOrders((n) => n + 1);
      });
      at(10300, () => {
        setCursor("off");
        setPaid(false);
      });
      // The order comes home: phone buzzes, slip on the table, the seller packs the bag
      at(10200, () => setBuzz((b) => b + 1));
      at(10600, () => setSlip(true));
      at(11100, () => setParcel("bag"));
      at(11800, () => setParcel("box"));
      // She takes it to the door; the rider takes it away
      at(12400, () => {
        setRider("door");
        setSeller("door");
        setParcel("carry");
        setSlip(false);
      });
      at(14000, () => {
        setParcel("rider");
        setOrder(1);
        setSeller("back");
      });
      at(14700, () => setRider("ride"));
      at(15200, () => setOrder(2));
      at(15500, () => setSeller("table"));
      at(17600, () => setOrder(3));
      // Reset, quietly
      at(19000, () => {
        setRider("off");
        setParcel("none");
        setOrder(null);
        setListed(false);
        setTyped(0);
      });
    };
    let loop = 0;
    const start = window.setTimeout(() => {
      run();
      loop = window.setInterval(run, LOOP);
    }, 1200);
    return () => {
      clearTimeout(start);
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const tc = themes[theme];
  const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const [s0x, s0y] = cardXY(0);
  const cursorAt = { off: [s0x + 24, s0y + 30], card: [s0x + 30, s0y + 26], cart: [s0x + 24, s0y + 58], order: [548, 318] }[cursor];
  const steps = [m.steps.packed, m.steps.onTheWay, m.steps.delivered];

  const card = (() => {
    if (!zone) return null;
    if (/^p\d+$/.test(zone)) {
      const i = Number(zone.slice(1));
      const p = products[i];
      const [x, y] = cardXY(i);
      return {
        at: [x + CARD_W / 2, y] as const,
        title: m.products[i],
        body: (
          <dl className="mt-1 space-y-0.5 text-[0.7rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.price}</dt>
              <dd className="font-latin font-bold text-leaf-deep">{fmtTaka(p.price, locale)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.stock}</dt>
              <dd className="font-latin font-semibold">{fmtNumber(p.stock, locale)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.ordersToday}</dt>
              <dd className="font-latin font-semibold">{fmtNumber(p.orders + (i === 0 && order !== null ? 1 : 0), locale)}</dd>
            </div>
          </dl>
        ),
      };
    }
    const z = m.zones[zone as "domain" | "orders" | "parcels" | "photo" | "rider"];
    const at = { domain: [468, 134], orders: [548, 198], parcels: [278, 234], photo: [120, 276], rider: [52, 360] }[zone as "domain"] as [number, number];
    return { at, title: z.title, body: <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{interpolate(z.body, { n: fmtNumber(orders, locale), domain: DOMAIN })}</p> };
  })();

  const hit = (key: Zone, x: number, y: number, w: number, h: number, label: string) => (
    <rect
      key={key}
      x={x}
      y={y}
      width={w}
      height={h}
      fill="transparent"
      tabIndex={0}
      role="button"
      aria-label={label}
      className="cursor-pointer outline-none"
      onPointerEnter={(e) => e.pointerType === "mouse" && setZone(key)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setZone(null)}
      onClick={() => setZone(key)}
      onFocus={() => setZone(key)}
      onBlur={() => setZone(null)}
    />
  );

  return (
    <div className="relative">
      <span className="absolute top-1 right-1 z-10 rounded-full bg-marigold-soft px-2 py-0.5 text-[0.65rem] font-semibold text-[#6b4a07]">{t.common.sampleData}</span>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-ink" role="img" aria-label={m.alt}>
        <motion.g initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Room m={m} />
        </motion.g>

        {/* Ambient: curtains sway, the fan turns, the ring light glows on a photo */}
        <path d="M102 138 q8 30 -2 70 h14 q-8 -36 4 -70 z" fill={c.vermilion} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" className="hk-sway" style={{ transformOrigin: "108px 138px" }} />
        <path d="M178 138 q-8 30 2 70 h-14 q8 -36 -4 -70 z" fill={c.vermilion} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" className="hk-sway" style={{ transformOrigin: "172px 138px", animationDelay: "-1.4s" }} />
        <path d="M250 110 V128" stroke={c.ink} strokeWidth="1" />
        <ellipse cx="250" cy="130" rx="25" ry="2.2" fill={c.ink} fillOpacity="0.35" stroke={c.ink} strokeWidth="0.6" className="hk-fan" />
        <circle cx="250" cy="130" r="3.2" fill="var(--color-paper)" stroke={c.ink} strokeWidth="0.9" />
        <motion.circle key={`ring-${flash}`} cx="104" cy="296" r="14" fill="none" stroke="#fff4c2" strokeWidth="6" initial={{ opacity: 0 }} animate={flash ? { opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.7 }} />
        <motion.circle key={`flash-${flash}`} cx={STOOL[0]} cy={STOOL[1]} r="12" fill="#fff" initial={{ opacity: 0 }} animate={flash ? { opacity: [0, 0.9, 0], scale: [0.4, 1.8, 2.4] } : { opacity: 0 }} transition={{ duration: 0.6 }} style={{ originX: 0.5, originY: 0.5 }} />

        {/* Sleeping cat on the folded sari: the tail flicks */}
        <g>
          <path d="M168 404 q-2 -11 12 -12 q12 0 14 8 q2 4 -2 4 z" fill="#c9c2b4" fillOpacity="0.8" stroke={c.ink} strokeWidth="0.8" />
          <path d="M190 397 l2 -5 l2 5 M185 396 l1 -5 l3 4" fill="none" stroke={c.ink} strokeWidth="0.7" />
          <path d="M187 400 q1.5 1 3 0" fill="none" stroke={c.ink} strokeWidth="0.6" />
          <path d="M168 403 q-8 0 -8 -6" fill="none" stroke={c.ink} strokeWidth="1" strokeLinecap="round" className="hk-tail" style={{ transformOrigin: "168px 403px" }} />
        </g>

        {/* The bag on the stool, waiting for its photo */}
        {!fly && !listed && <Icon kind="bag" x={STOOL[0]} y={STOOL[1]} tint={c.vermilion} />}

        {/* The browser wall: the online store */}
        <g>
          <g filter="url(#hk-wobble)">
            <Occlude d={box(BX, BY, BW, BH)} />
            <Wash d={box(BX, BY, BW, BH)} fill={c.cream} o={0.6} />
            <path d={box(BX, BY, BW, BH)} fill="none" stroke={c.ink} strokeWidth="1.3" />
            <path d={`M${BX} ${BY + 28} h${BW}`} stroke={c.ink} strokeWidth="0.9" />
          </g>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={BX + 10 + i * 8} cy={BY + 14} r="2.4" fill={[c.vermilion, c.marigold, c.leaf][i]} fillOpacity="0.7" stroke={c.ink} strokeWidth="0.5" />
          ))}
          <rect x={BX + 40} y={BY + 6} width="196" height="16" rx="8" fill="var(--color-paper)" stroke={c.ink} strokeWidth="0.7" />
          {typed > 0 && <path d={`M${BX + 49} ${BY + 15} v-2 a2.2 2.2 0 0 1 4.4 0 v2 M${BX + 48} ${BY + 15} h6.4 v4 h-6.4 z`} fill="none" stroke={c.leaf} strokeWidth="0.8" />}
          <text x={BX + 60} y={BY + 17.6} fontSize="8" fill={c.ink} style={{ fontFamily: "var(--font-manrope)" }}>
            {DOMAIN.slice(0, typed)}
            {typed > 0 && typed < DOMAIN.length && "|"}
          </text>
          {/* Store header in the current theme */}
          <rect x={BX + 8} y={BY + 34} width={BW - 16} height="30" rx="2" fill={tc} fillOpacity="0.88" style={{ transition: "fill 0.6s" }} />
          <text x={BX + 18} y={BY + 54} fontSize="13" fill={c.cream} style={{ fontFamily: "var(--font-tiro)" }}>
            {m.storeName}
          </text>
          {m.nav.map((n, i) => (
            <text key={n} x={BX + 146 + i * 30} y={BY + 52} fontSize="6.6" fill={c.cream} fillOpacity="0.85" style={{ fontFamily: "var(--font-sans)" }}>
              {n}
            </text>
          ))}
          {/* Product grid */}
          {products.map((p, i) => {
            const [x, y] = cardXY(i);
            const empty = i === 0 && !listed;
            return (
              <g key={i}>
                <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="2" fill={empty ? "none" : c.cream} stroke={c.ink} strokeWidth="0.7" strokeDasharray={empty ? "2 2" : undefined} strokeOpacity={empty ? 0.5 : 1} />
                {empty ? (
                  <text x={x + CARD_W / 2} y={y + 35} textAnchor="middle" fontSize="7" fill={c.ink} fillOpacity="0.45" style={{ fontFamily: "var(--font-sans)" }}>
                    + {m.addProduct}
                  </text>
                ) : (
                  <motion.g initial={i === 0 && !reduce ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <rect x={x + 3} y={y + 3} width={CARD_W - 6} height="32" rx="1.5" fill={p.tint} fillOpacity="0.12" />
                    <Icon kind={p.icon} x={x + CARD_W / 2} y={y + 19} tint={p.tint} />
                    <text x={x + 4} y={y + 44} fontSize="5.4" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
                      {m.productsShort[i]}
                    </text>
                    <text x={x + 4} y={y + 52} fontSize="6.2" fontWeight="700" fill={c.ink} style={{ fontFamily: "var(--font-manrope)" }}>
                      {fmtTaka(p.price, locale)}
                    </text>
                    <rect x={x + 4} y={y + 55} width={CARD_W - 8} height="6.5" rx="3.2" fill={tc} fillOpacity="0.85" style={{ transition: "fill 0.6s" }} />
                    <text x={x + CARD_W / 2} y={y + 59.8} textAnchor="middle" fontSize="4.4" fill={c.cream} style={{ fontFamily: "var(--font-sans)" }}>
                      {m.addToCart}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
          {/* Order panel */}
          <rect x="510" y="200" width="76" height="132" rx="2" fill={c.cream} stroke={c.ink} strokeWidth="0.7" />
          <text x="516" y="212" fontSize="7.4" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
            {order === null ? m.ordersTitle : m.newOrder}
          </text>
          {order === null ? (
            <g>
              <text x="516" y="224" fontSize="6" fill={c.ink} fillOpacity="0.65" style={{ fontFamily: "var(--font-sans)" }}>
                {interpolate(m.ordersCount, { n: fmtNumber(orders, locale) })}
              </text>
              {[234, 248, 262, 276, 290].map((y, i) => (
                <g key={y}>
                  <rect x="516" y={y} width="64" height="10" rx="2" fill={c.ink} fillOpacity="0.05" />
                  <circle cx="521" cy={y + 5} r="2" fill={i < 3 ? c.leaf : c.marigold} fillOpacity="0.7" />
                  <rect x="526" y={y + 3.5} width={30 + ((i * 13) % 20)} height="3" rx="1.5" fill={c.ink} fillOpacity="0.18" />
                </g>
              ))}
            </g>
          ) : (
            <g>
              <text x="516" y="224" fontSize="6" fill={c.ink} fillOpacity="0.65" style={{ fontFamily: "var(--font-sans)" }}>
                {m.products[0]} · {fmtTaka(products[0].price, locale)}
              </text>
              {steps.map((st, i) => {
                const done = order > i;
                return (
                  <g key={st}>
                    <circle cx="522" cy={244 + i * 18} r="4" fill={done ? c.leaf : "none"} stroke={done ? c.leaf : c.ink} strokeWidth="0.8" strokeOpacity={done ? 1 : 0.4} style={{ transition: "fill 0.3s" }} />
                    {done && <path d={`M520 ${244 + i * 18} l1.5 1.5 l3 -3`} fill="none" stroke={c.cream} strokeWidth="1" />}
                    {i < 2 && <path d={`M522 ${248 + i * 18} v10`} stroke={done ? c.leaf : c.ink} strokeOpacity={done ? 1 : 0.3} strokeWidth="0.8" />}
                    <text x="530" y={246.4 + i * 18} fontSize="6.4" fill={c.ink} fillOpacity={done ? 1 : 0.5} style={{ fontFamily: "var(--font-sans)" }}>
                      {st}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
          <rect x="516" y="312" width="64" height="13" rx="6.5" fill={tc} fillOpacity="0.85" style={{ transition: "fill 0.6s" }} />
          <text x="548" y="320.6" textAnchor="middle" fontSize="6" fill={c.cream} style={{ fontFamily: "var(--font-sans)" }}>
            {m.placeOrder}
          </text>
          {/* Theme swatches (clickable) and payment / courier strip */}
          <text x="352" y="365" fontSize="7.4" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
            {m.theme}
          </text>
          {themes.map((col, i) => {
            const [x, y] = swatchAt(i);
            return (
              <g
                key={col}
                role="button"
                tabIndex={0}
                aria-label={`${m.theme} ${i + 1}`}
                aria-pressed={theme === i}
                className="cursor-pointer outline-none"
                onClick={() => {
                  picked.current = true;
                  setTheme(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    picked.current = true;
                    setTheme(i);
                  }
                }}
              >
                <circle cx={x} cy={y} r="11" fill="transparent" />
                <circle cx={x} cy={y} r="6.5" fill={col} fillOpacity="0.85" stroke={c.ink} strokeWidth="0.7" />
                {theme === i && <circle cx={x} cy={y} r="9" fill="none" stroke={c.ink} strokeWidth="1" />}
              </g>
            );
          })}
          <text x="486" y="365" fontSize="6" fill={c.ink} fillOpacity="0.6" style={{ fontFamily: "var(--font-sans)" }}>
            {m.liveHint}
          </text>
          <path d="M352 384 h232" stroke={c.ink} strokeOpacity="0.2" strokeWidth="0.7" />
          {m.badges.map((b, i) => (
            <g key={b}>
              <rect x={352 + i * 79} y="394" width="74" height="22" rx="4" fill={c.cream} stroke={c.ink} strokeWidth="0.6" />
              <circle cx={362 + i * 79} cy="405" r="3.6" fill={[c.leaf, c.marigold, c.sky][i]} fillOpacity="0.7" />
              <text x={369 + i * 79} y="407.4" fontSize="6.4" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
                {b}
              </text>
            </g>
          ))}
        </g>

        {/* The green ink line from the seller's phone into the store */}
        <motion.path d={inkLine} fill="none" stroke="var(--color-leaf-ink)" strokeWidth="2.2" strokeLinecap="round" filter="url(#hk-wobble)" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1, ease }} />
        <path d={inkLine} fill="none" stroke="var(--color-leaf-glow)" strokeWidth="7" strokeLinecap="round" opacity={fly || order === 0 ? 0.35 : 0} style={{ transition: "opacity 0.4s" }} />
        <path d={inkLine} fill="none" stroke="var(--color-cream)" strokeWidth="1" strokeDasharray="2 12" className="hk-flow" opacity={fly || order === 0 ? 1 : 0} />
        <circle cx="342" cy="238" r="3.6" fill="var(--color-cream)" stroke="var(--color-leaf)" strokeWidth="1.6" />

        {/* The bag's drawing flies from the stool into the catalogue */}
        {fly && (
          <motion.g initial={{ x: 0, y: 0, scale: 1 }} animate={{ x: [0, 120, s0x + 24 - STOOL[0]], y: [0, -90, s0y + 19 - STOOL[1]], scale: [1, 1.3, 1] }} transition={{ duration: 1.6, ease, times: [0, 0.45, 1] }}>
            <Icon kind="bag" x={STOOL[0]} y={STOOL[1]} tint={c.vermilion} />
          </motion.g>
        )}

        {/* Seller at her table, phone in hand; she walks the parcel to the door */}
        <motion.g initial={false} animate={{ x: seller === "door" ? DOOR_X - SELLER_X : 0 }} transition={{ duration: 1.5, ease: "linear" }}>
          <g transform={`translate(${SELLER_X} ${FLOOR}) scale(1.35)`}>
            <Person seed={61} shirt={c.plum} pants={c.plum} hair="bun" look={seller === "table" ? -1 : seller === "door" ? -1 : 1} walking={seller !== "table"} pace={0.62} arms={false}>
              <path d="M10 -56 C14 -48 14 -42 12 -36" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
              <path d="M-10 -56 C-14 -50 -14 -46 -12 -46" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
              {parcel === "carry" && (
                <g>
                  <path d={box(-22, -54, 18, 14)} fill="var(--color-paper)" />
                  <path d={box(-22, -54, 18, 14)} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
                  <path d={box(-19, -50, 8, 4)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
                </g>
              )}
            </Person>
          </g>
          {seller === "table" && (
            <g>
              <rect x={PHONE[0] - 5} y={PHONE[1] - 9} width="10" height="16" rx="1.6" fill={c.ink} fillOpacity="0.85" />
              <rect x={PHONE[0] - 3.8} y={PHONE[1] - 7} width="7.6" height="12" rx="1" fill="var(--color-forest-2)" />
              <rect x={PHONE[0] - 2.6} y={PHONE[1] - 5.6} width="5" height="1.4" rx="0.7" fill="var(--color-leaf-glow)" />
              <ellipse cx={PHONE[0]} cy={PHONE[1] + 7} rx="3.2" ry="2.8" fill={skin} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.8" />
              <motion.g key={`buzz-${buzz}`} initial={{ opacity: 0 }} animate={buzz ? { opacity: [0, 1, 1, 0], x: [0, -1, 1, -1, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.8 }}>
                <path d={`M${PHONE[0] - 9} ${PHONE[1] - 6} q-3 5 0 10 M${PHONE[0] + 9} ${PHONE[1] - 6} q3 5 0 10`} fill="none" stroke={c.leaf} strokeWidth="1.1" strokeLinecap="round" />
              </motion.g>
            </g>
          )}
        </motion.g>

        <Table />

        {/* On the table: the order slip, then the bag being packed into a parcel */}
        <AnimatePresence>
          {slip && (
            <motion.g key="slip" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <path d={box(252, 382, 18, 10)} fill={c.cream} stroke={c.ink} strokeWidth="0.6" transform="rotate(-6 261 387)" />
              <path d="M255 385 h11 M255 388 h8" stroke={c.ink} strokeWidth="0.5" transform="rotate(-6 261 387)" />
            </motion.g>
          )}
          {parcel === "bag" && (
            <motion.g key="pbag" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.35 }}>
              <Icon kind="bag" x={238} y={383} tint={c.vermilion} />
            </motion.g>
          )}
          {parcel === "box" && (
            <motion.g key="pbox" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} style={{ originX: 0.5, originY: 1 }}>
              <path d={box(228, 376, 22, 16)} fill="var(--color-paper)" />
              <path d={box(228, 376, 22, 16)} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.8" />
              <path d={box(232, 380, 10, 5)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
              <path d="M239 376 v5" stroke={c.ink} strokeWidth="0.5" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Courier rider: at the door, then away on the bike along the street */}
        <AnimatePresence>
          {rider === "door" && (
            <motion.g key="atdoor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, ease }}>
              <g transform={`translate(52 ${FLOOR}) scale(1.25)`}>
                <Person seed={62} shirt={c.marigold} hair="cap" look={1} arms={parcel !== "rider"}>
                  {parcel === "rider" && (
                    <g>
                      <path d={box(-4, -52, 18, 14)} fill="var(--color-paper)" />
                      <path d={box(-4, -52, 18, 14)} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
                    </g>
                  )}
                </Person>
              </g>
            </motion.g>
          )}
        </AnimatePresence>
        <motion.g initial={false} animate={rider === "ride" ? { x: 720, opacity: 1 } : { x: 0, opacity: rider === "off" ? 0 : 1 }} transition={rider === "ride" ? { x: { duration: 3.2, ease: [0.5, 0, 0.75, 0] }, opacity: { duration: 0.2 } } : { duration: 0 }}>
          <g transform="translate(40 530)">
            <circle cx="-14" cy="8" r="7" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.2" />
            <circle cx="16" cy="8" r="7" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.2" />
            <path d="M-14 8 L-4 -2 H10 L16 8 M10 -2 l-3 -8 h5" fill="none" stroke={c.ink} strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M-8 -2 q8 -6 16 0 z" fill={c.vermilion} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.8" />
            <path d={box(-26, -12, 14, 11)} fill={c.clay} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.7" />
            <g transform="translate(0 -2) scale(0.9)" opacity={rider === "ride" ? 1 : 0}>
              <Person seed={63} shirt={c.marigold} hair="cap" look={1} arms={false}>
                <path d="M8 -54 L16 -34" stroke={c.ink} strokeWidth="1" strokeLinecap="round" />
              </Person>
            </g>
          </g>
        </motion.g>

        {/* Customer's cursor taps "add to cart", then "order" */}
        <AnimatePresence>
          {cursor !== "off" && (
            <motion.g key="cursor" initial={{ opacity: 0, x: cursorAt[0] + 20, y: cursorAt[1] + 20 }} animate={{ opacity: 1, x: cursorAt[0], y: cursorAt[1] }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease }}>
              <motion.circle key={`tap-${tap}`} r="5" fill="none" stroke={tc} strokeWidth="1.2" initial={{ opacity: 0, scale: 0.4 }} animate={tap ? { opacity: [0, 1, 0], scale: [0.4, 1.6, 2] } : { opacity: 0 }} transition={{ duration: 0.5 }} />
              <path d="M0 0 l0 12 l3.4 -3 l2.6 5.4 l2.2 -1 l-2.6 -5.2 l4.6 -0.4 z" fill={c.cream} stroke={c.ink} strokeWidth="0.9" strokeLinejoin="round" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Hit areas */}
        {products.map((_, i) => {
          const [x, y] = cardXY(i);
          return hit(`p${i}`, x, y, CARD_W, CARD_H, m.products[i]);
        })}
        {hit("domain", BX + 40, BY + 6, 196, 16, m.zones.domain.title)}
        {hit("orders", 510, 200, 76, 132, m.zones.orders.title)}
        {hit("parcels", 222, 234, 112, 32, m.zones.parcels.title)}
        {hit("photo", 88, 278, 56, 168, m.zones.photo.title)}
        {hit("rider", 10, 340, 64, 106, m.zones.rider.title)}
      </svg>

      {/* Payment chip */}
      <AnimatePresence>
        {paid && (
          <motion.span
            key="paid"
            className="pointer-events-none absolute -translate-x-1/2 rounded-full bg-leaf px-1.5 py-0.5 text-[0.6rem] font-bold whitespace-nowrap text-white shadow sm:text-xs"
            style={pct(548, 180)}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            ✓ {m.paid}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hover / tap card */}
      <AnimatePresence>
        {card && (
          <motion.div
            key={zone}
            className="pointer-events-none absolute z-20 w-max max-w-[13rem] min-w-[9rem] -translate-x-1/2 -translate-y-full rounded-xl bg-white/95 px-3 py-2 text-left shadow-[var(--shadow-float)] ring-1 ring-ink/10 backdrop-blur"
            style={{ left: `clamp(6.6rem, ${(card.at[0] / W) * 100}%, calc(100% - 6.6rem))`, top: `${(card.at[1] / H) * 100}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-bold text-ink">{card.title}</p>
            {card.body}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
