"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { Person, Section, skin } from "@/components/illustrations/InkPeople";

/**
 * Grocery hero: "দোকানের একটা দিন", one day in a neighbourhood mudi shop, as a time-lapse. At dawn the shutter rolls
 * up and a sack of rice is delivered (a purchase); at midday a customer buys oil and eggs (sales); in the afternoon a
 * regular takes lentils and sugar on credit (a due) and the oil on the shelf runs low (a stock alert); at night the bulb
 * comes on, the shutter comes half down and the shopkeeper asks his phone how much he sold. Each moment flies to his
 * phone as a little paper chit. The sky, the light and the wall clock follow the hour. The four times of day below
 * the scene play on their own and can be picked; the day can be paused. All figures are sample data, and the night's
 * total is the site's sample day (৳24,530 from 86 sales).
 */

const W = 640;
const H = 560;
const FLOOR = 470;
const STREET = 512;
const OPEN_TOP = 138;
const OPEN_H = FLOOR - OPEN_TOP;
const PHONE = [323, 379] as const;
/** The bulb hangs low on its wire, just below the edge of the half-closed shutter at night. */
const BULB = 246;
const COUNTER_TOP = 392;
const ease = [0.45, 0, 0.55, 1] as const;
const PHASE_MS = 7000;

/**
 * When each beat of each phase happens (ms from the phase start). Customers walk at an everyday pace (about 1.3 m/s at
 * this scale, where a person is ~155 units tall), so the midday and afternoon visitors take most of three seconds to
 * reach the counter.
 */
const BEATS: [number, number][][] = [
  [[300, 1], [1700, 2], [3700, 3], [4400, 4], [5300, 5]],
  [[100, 0], [3400, 1], [4100, 2], [5000, 3], [5900, 4]],
  [[100, 0], [2900, 1], [3900, 2], [5600, 3]],
  [[200, 0], [1000, 1], [2000, 2], [3500, 3], [6000, 4]],
];
/** The beat a paused (or reduced-motion) day shows for each phase: the moment itself, with its people in the shop. */
const STILL = [4, 3, 2, 3];

/** Sample amounts, and today's running sales at the start of each phase (the hours between happen off-screen). */
const AMOUNT = { rice: 3600, oil: 190, eggs: 156, due: 275 };
const BASE = [
  { total: 0, n: 0 },
  { total: 9654, n: 34 },
  { total: 17505, n: 61 },
  { total: 24530, n: 86 },
];

const SKY = ["#F4C08A", "#BFDDF2", "#F0A867", "#2E3D5E"];
const SKY_O = [0.85, 0.8, 0.85, 0.95];
const TINT = ["#F4C08A", "#BFDDF2", "#F0A867", "#1D2A44"];
const TINT_O = [0.1, 0, 0.12, 0.24];
const SUN = [
  { x: 74, y: 96 },
  { x: 320, y: 30 },
  { x: 566, y: 86 },
  { x: 566, y: 140 },
];
/** Hour hand angle on the wall clock: 6:10, 12:40, 4:30, 9:30. */
const HOUR = [185, 20, 135, 285];

const hourHand = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `M96 172 L${(96 + Math.sin(a) * 8).toFixed(2)} ${(172 - Math.cos(a) * 8).toFixed(2)}`;
};

/** Oil bottles on the middle shelf (the stock that runs low). */
const BOTTLES = Array.from({ length: 6 }, (_, i) => 398 + i * 26);
/** Sacks on the shop floor: [x, label index, wash]; slot 0 (left) is where the delivered sack goes. */
const SACK_SLOTS = [72, 112, 152, 486, 526];

type Chit = { id: number; from: readonly [number, number]; tone: "sale" | "purchase" | "due" };

function Sack({ x, label, fill }: { x: number; label: string; fill: string }) {
  const s = new Sketch(911 + x * 7);
  const body = `M${x - 17} ${FLOOR} C${x - 20} ${FLOOR - 16} ${x - 17} ${FLOOR - 28} ${x - 14} ${FLOOR - 32} L${x + 14} ${FLOOR - 32} C${x + 17} ${FLOOR - 28} ${x + 20} ${FLOOR - 16} ${x + 17} ${FLOOR} Z`;
  return (
    <g>
      <Occlude d={body} />
      <Wash d={body} fill={c.rice} o={0.75} />
      <P d={body} w={1} />
      {/* Rolled rim and the grain heaped inside */}
      <Wash d={`M${x - 14} ${FLOOR - 32} C${x - 8} ${FLOOR - 42} ${x + 8} ${FLOOR - 42} ${x + 14} ${FLOOR - 32} Z`} fill={fill} o={0.8} />
      <P d={s.curve([[x - 14, FLOOR - 32], [x - 8, FLOOR - 41], [x + 8, FLOOR - 41], [x + 14, FLOOR - 32]], 0.2)} w={0.8} />
      <P d={s.line(x - 15, FLOOR - 29, x + 15, FLOOR - 29, 0.2, 1)} w={0.7} o={0.7} />
      {/* Price tag on a stick */}
      <P d={s.line(x + 6, FLOOR - 36, x + 8, FLOOR - 52, 0.1, 1)} w={0.7} />
      <rect x={x - 6} y={FLOOR - 62} width="26" height="12" fill={c.cream} stroke={c.ink} strokeWidth="0.7" />
      <text x={x + 7} y={FLOOR - 53.3} textAnchor="middle" fontSize="7" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {label}
      </text>
    </g>
  );
}

const Shop = memo(function Shop({ sign, sacks, eggs }: { sign: string; sacks: string[]; eggs: string }) {
  const s = new Sketch(4417);
  return (
    <g filter="url(#hk-wobble)">
      {/* Distant rooftops and a palm behind the shop */}
      <g opacity="0.3">
        <P d={s.poly([[0, 124], [0, 70], [26, 70], [26, 58], [44, 58], [44, 124]], false, 0.4)} w={0.9} />
        <P d={s.rect(8, 82, 9, 12, 0.3, 1)} w={0.7} />
        <P d={s.poly([[596, 124], [596, 64], [640, 64]], false, 0.4)} w={0.9} />
        <P d={s.ellipse(620, 56, 12, 3, 0.3)} w={0.8} />
        <P d={s.curve([[612, 124], [610, 90], [606, 46]], 0.4)} w={1} />
        <P d={s.curve([[606, 46], [592, 40], [580, 46]], 0.3)} w={0.8} />
        <P d={s.curve([[606, 46], [600, 30], [588, 26]], 0.3)} w={0.8} />
        <P d={s.curve([[606, 46], [618, 32], [632, 32]], 0.3)} w={0.8} />
      </g>

      {/* Signboard on the parapet */}
      <P d={s.line(170, 110, 170, 116, 0.2, 1)} w={1.1} />
      <P d={s.line(470, 110, 470, 116, 0.2, 1)} w={1.1} />
      <Occlude d={box(130, 58, 380, 52)} />
      <Wash d={box(130, 58, 380, 52)} fill={c.vermilion} o={0.8} />
      <P d={s.rect(130, 58, 380, 52, 0.5)} w={1.3} />
      <P d={s.rect(137, 64, 366, 40, 0.3, 1)} w={0.6} c={c.cream} o={0.75} />
      <text x="320" y="91" textAnchor="middle" fontSize="23" fill={c.cream} style={{ fontFamily: "var(--font-tiro)" }}>
        {sign}
      </text>

      {/* Roof slab, walls, the shutter box */}
      <Section x={30} y={112} w={580} h={12} />
      <Occlude d={box(42, OPEN_TOP, 556, OPEN_H)} />
      <Wash d={box(42, OPEN_TOP, 556, OPEN_H)} fill={c.rice} o={0.32} />
      <Wash d={box(42, OPEN_TOP, 120, OPEN_H)} fill={c.leafWash} o={0.12} />
      <Section x={30} y={124} w={12} h={FLOOR - 124} />
      <Section x={598} y={124} w={12} h={FLOOR - 124} />
      <Occlude d={box(42, 124, 556, 14)} />
      <Wash d={box(42, 124, 556, 14)} fill="#8f9aa3" o={0.45} />
      <P d={s.rect(42, 124, 556, 14, 0.3)} w={1} />

      {/* Left wall: a calendar with a red header */}
      <Occlude d={box(70, 206, 52, 58)} />
      <Wash d={box(70, 206, 52, 16)} fill={c.vermilion} o={0.6} />
      <P d={s.rect(70, 206, 52, 58, 0.3)} w={0.9} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={75 + (i % 4) * 11.5} y={228 + Math.floor(i / 4) * 11} width="7" height="6" fill={c.ink} fillOpacity="0.18" />
      ))}
      <P d={s.line(96, 198, 96, 206, 0.1, 1)} w={0.7} />

      {/* Shelves */}
      <Wash d={box(162, 150, 424, 168)} fill={c.clay} o={0.2} />
      {[198, 258, 318].map((y) => (
        <P key={y} d={s.line(160, y, 588, y, 0.4)} w={1.8} />
      ))}
      <P d={s.line(162, 150, 162, 320, 0.3)} w={1.2} />
      <P d={s.line(586, 150, 586, 320, 0.3)} w={1.2} />
      {/* Top shelf: glass jars of dal, sugar, rice, chira, muri */}
      {[c.marigold, c.cream, c.rice, c.clay, c.marigold, c.leafWash, c.rice, c.vermilion, c.cream, c.clay, c.marigold, c.rice, c.leafWash].map((fill, i) => {
        const x = 172 + i * 31;
        return (
          <g key={i}>
            <Occlude d={box(x, 166, 24, 32)} />
            <Wash d={box(x + 2, 176, 20, 22)} fill={fill} o={0.65} />
            <P d={s.rect(x, 166, 24, 32, 0.3, 1)} w={0.8} />
            <path d={box(x + 3, 161, 18, 5)} fill={c.ink} fillOpacity="0.55" />
          </g>
        );
      })}
      {/* Middle shelf: tea and soap boxes (the oil bottles are drawn live, on the right) */}
      {[c.vermilion, c.leaf, c.sky, c.marigold, c.plum, c.vermilion, c.teal, c.sky, c.leaf].map((fill, i) => {
        const x = 172 + i * 23;
        const h = 22 + ((i * 5) % 12);
        return (
          <g key={i}>
            <Occlude d={box(x, 258 - h, 19, h)} />
            <Wash d={box(x, 258 - h, 19, h)} fill={fill} o={0.5} />
            <P d={s.rect(x, 258 - h, 19, h, 0.3, 1)} w={0.8} />
            <P d={s.line(x + 3, 258 - h + 6, x + 15, 258 - h + 6, 0.2, 1)} w={0.5} o={0.6} />
          </g>
        );
      })}
      {/* Bottom shelf: atta bags, salt, biscuits */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = 170 + i * 29.5;
        const fill = [c.clay, c.cream, c.sky, c.marigold][i % 4];
        const h = i % 4 === 0 ? 36 : 26;
        return (
          <g key={i}>
            <Occlude d={box(x, 318 - h, 24, h)} />
            <Wash d={box(x, 318 - h, 24, h)} fill={fill} o={0.55} />
            <P d={s.rect(x, 318 - h, 24, h, 0.35, 1)} w={0.8} />
            {i % 4 === 0 && <P d={s.curve([[x + 3, 318 - h], [x + 12, 318 - h - 4], [x + 21, 318 - h]], 0.2)} w={0.7} />}
          </g>
        );
      })}

      {/* Strings of sachets hanging from the shutter box */}
      {[56, 70, 570, 584].map((x, k) => (
        <g key={x} className="hk-sway" style={{ transformOrigin: `${x}px ${OPEN_TOP}px`, animationDelay: `${-k * 1.3}s` }}>
          <P d={s.line(x, OPEN_TOP, x, OPEN_TOP + 96, 0.2, 1)} w={0.5} />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={x - 5 + (i % 2 ? 1 : -1)} y={OPEN_TOP + 4 + i * 13} width="10" height="11" fill={[c.vermilion, c.leafWash, c.marigold, c.sky][(i + k) % 4]} fillOpacity="0.7" stroke={c.ink} strokeWidth="0.5" />
          ))}
        </g>
      ))}

      {/* Bulb on its wire */}
      <P d={s.line(300, OPEN_TOP, 300, BULB - 8, 0.1, 1)} w={0.7} />
      <path d={box(297, BULB - 9, 6, 5)} fill={c.ink} fillOpacity="0.6" />

      {/* Floor and plinth, street */}
      <Section x={24} y={FLOOR} w={592} h={8} />
      <Occlude d={box(30, FLOOR + 8, 580, 24)} />
      <Wash d={box(30, FLOOR + 8, 580, 24)} fill={c.clay} o={0.18} />
      <P d={s.rect(30, FLOOR + 8, 580, 24, 0.4)} w={1} />
      <P d={s.line(0, STREET, W, STREET, 0.6)} w={1.3} />
      {[40, 150, 290, 430, 560].map((x) => (
        <P key={x} d={s.line(x, STREET + 8, x + 26, STREET + 8, 0.3, 1)} w={0.6} o={0.5} />
      ))}

      {/* Sacks on the floor (slot 0 waits for the morning delivery); a stack of egg trays */}
      <Sack x={SACK_SLOTS[1]} label={sacks[0]} fill={c.cream} />
      <Sack x={SACK_SLOTS[2]} label={sacks[1]} fill={c.marigold} />
      <Sack x={SACK_SLOTS[3]} label={sacks[2]} fill={c.vermilion} />
      <Sack x={SACK_SLOTS[4]} label={sacks[3]} fill={c.clay} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Occlude d={box(552, FLOOR - 9 - i * 9, 38, 9)} />
          <Wash d={box(552, FLOOR - 9 - i * 9, 38, 9)} fill={c.rice} o={0.7} />
          <P d={s.rect(552, FLOOR - 9 - i * 9, 38, 9, 0.2, 1)} w={0.7} />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={556 + k * 7.5} cy={FLOOR - 11 - i * 9} r="2.8" fill={c.cream} stroke={c.ink} strokeWidth="0.45" />
          ))}
        </g>
      ))}
      <text x="571" y={FLOOR - 46} textAnchor="middle" fontSize="7" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {eggs}
      </text>
    </g>
  );
});

const Counter = memo(function Counter() {
  const s = new Sketch(4431);
  return (
    <g filter="url(#hk-wobble)">
      {/* Candy and biscuit jars, and a hanging scale (daripalla) */}
      {[
        [188, c.vermilion],
        [212, c.marigold],
        [236, c.leafWash],
      ].map(([x, fill]) => (
        <g key={x as number}>
          <Occlude d={box(x as number, COUNTER_TOP - 26, 20, 26)} />
          <Wash d={box((x as number) + 2, COUNTER_TOP - 18, 16, 18)} fill={fill as string} o={0.6} />
          <P d={s.rect(x as number, COUNTER_TOP - 26, 20, 26, 0.3, 1)} w={0.8} />
          <path d={box((x as number) + 2, COUNTER_TOP - 31, 16, 5)} fill={c.vermilion} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.5" />
        </g>
      ))}
      <P d={s.line(416, COUNTER_TOP, 416, COUNTER_TOP - 40, 0.2)} w={1.1} />
      <P d={s.line(394, COUNTER_TOP - 38, 438, COUNTER_TOP - 38, 0.2)} w={1} />
      {[396, 436].map((x) => (
        <g key={x}>
          <P d={s.line(x, COUNTER_TOP - 38, x - 6, COUNTER_TOP - 18, 0.1, 1)} w={0.5} />
          <P d={s.line(x, COUNTER_TOP - 38, x + 6, COUNTER_TOP - 18, 0.1, 1)} w={0.5} />
          <path d={`M${x - 9} ${COUNTER_TOP - 18} q9 6 18 0 z`} fill={c.marigold} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.7" />
        </g>
      ))}
      {/* The counter */}
      <Occlude d={box(176, COUNTER_TOP, 276, FLOOR - COUNTER_TOP)} />
      <Wash d={box(176, COUNTER_TOP + 8, 276, FLOOR - COUNTER_TOP - 8)} fill={c.clay} o={0.5} />
      <P d={s.rect(176, COUNTER_TOP + 8, 276, FLOOR - COUNTER_TOP - 8, 0.4)} w={1.2} />
      {[222, 268, 314, 360, 406].map((x) => (
        <P key={x} d={s.line(x, COUNTER_TOP + 10, x, FLOOR - 2, 0.3, 1)} w={0.6} o={0.6} />
      ))}
      <Occlude d={box(170, COUNTER_TOP, 288, 8)} />
      <Wash d={box(170, COUNTER_TOP, 288, 8)} fill={c.clay} o={0.7} />
      <P d={s.rect(170, COUNTER_TOP, 288, 8, 0.3)} w={1.2} />
    </g>
  );
});

export function GroceryDay() {
  const { t, locale } = useI18n();
  const m = t.grocery.heroDay;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });

  const [phase, setPhase] = useState(reduce ? 1 : 0);
  const [beat, setBeat] = useState(reduce ? STILL[1] : 0);
  const [playing, setPlaying] = useState(!reduce);
  const [cycle, setCycle] = useState(0);
  const [chits, setChits] = useState<Chit[]>([]);
  const running = playing && inView;

  // Reduced motion is only known after the first render: hold the day still on its midday moment
  useEffect(() => {
    if (!reduce) return;
    setPlaying(false);
    setPhase(1);
    setBeat(STILL[1]);
  }, [reduce]);

  useEffect(() => {
    if (!running) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    setBeat(phase === 0 ? 0 : -1);
    BEATS[phase].forEach(([ms, b]) => at(ms, () => setBeat(b)));
    at(PHASE_MS, () => setPhase((p) => (p + 1) % 4));
    return () => timers.forEach(clearTimeout);
  }, [phase, cycle, running]);

  // Each recorded moment sends a paper chit to the shopkeeper's phone
  useEffect(() => {
    if (!running) return;
    const send = (from: readonly [number, number], tone: Chit["tone"]) => {
      const id = Date.now() + Math.random();
      setChits((cs) => [...cs, { id, from, tone }]);
      window.setTimeout(() => setChits((cs) => cs.filter((x) => x.id !== id)), 1000);
    };
    if (phase === 0 && beat === 3) send([SACK_SLOTS[0], FLOOR - 30], "purchase");
    if (phase === 1 && beat === 2) send([272, COUNTER_TOP - 8], "sale");
    if (phase === 1 && beat === 3) send([296, COUNTER_TOP - 6], "sale");
    if (phase === 2 && beat === 1) send([268, COUNTER_TOP - 8], "due");
  }, [phase, beat, running]);

  const pick = (i: number) => {
    setPhase(i);
    setCycle((k) => k + 1);
    if (!playing) setBeat(STILL[i]);
  };
  const toggle = () => {
    if (playing) setBeat(STILL[phase]);
    setPlaying((p) => !p);
  };

  // What the scene shows at this phase and beat
  const b = beat;
  const shutter = phase === 0 ? (b < 1 ? 1 : 0) : phase === 3 ? (b >= 4 ? 1 : b >= 1 ? 0.27 : 0) : 0;
  const delivered = phase !== 0 || b >= 3;
  const bottles = phase === 0 || (phase === 1 && b < 1) ? 6 : phase === 1 || (phase === 2 && b < 2) ? 5 : 2;
  const courier = phase === 0 ? (b < 2 ? "off" : b < 5 ? "here" : "gone") : "off";
  const woman = phase === 1 ? (b < 4 ? "here" : "gone") : "off";
  const uncle = phase === 2 ? (b < 3 ? "here" : "gone") : "off";
  const sales = (() => {
    const base = BASE[phase];
    if (phase === 1) return { total: base.total + (b >= 2 ? AMOUNT.oil : 0) + (b >= 3 ? AMOUNT.eggs : 0), n: base.n + (b >= 2 ? 1 : 0) + (b >= 3 ? 1 : 0) };
    if (phase === 2) return { total: base.total + (b >= 1 ? AMOUNT.due : 0), n: base.n + (b >= 1 ? 1 : 0) };
    return base;
  })();
  const night = phase === 3;
  const amounts = [AMOUNT.rice, AMOUNT.oil + AMOUNT.eggs, AMOUNT.due, 0];
  const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const slow = { duration: reduce ? 0 : 1.6, ease };

  return (
    <div ref={ref}>
      <div className="relative">
        <span className="absolute top-1 left-1 z-10 rounded-full bg-marigold-soft px-2 py-0.5 text-[0.65rem] font-semibold text-[#6b4a07]">{t.common.sampleData}</span>
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-ink" role="img" aria-label={m.alt}>
          <defs>
            <radialGradient id="hk-day-bulb">
              <stop offset="0" stopColor="#FFE7A3" stopOpacity="0.95" />
              <stop offset="0.45" stopColor="#FFD877" stopOpacity="0.35" />
              <stop offset="1" stopColor="#FFD877" stopOpacity="0" />
            </radialGradient>
            <clipPath id="hk-day-opening">
              <rect x="42" y={OPEN_TOP} width="556" height={OPEN_H} />
            </clipPath>
          </defs>

          {/* Sky, sun and moon follow the hour */}
          <motion.path d={box(0, 0, W, 126)} filter="url(#hk-wash)" initial={false} animate={{ fill: SKY[phase], opacity: SKY_O[phase] }} transition={slow} />
          <motion.g initial={false} animate={{ x: SUN[phase].x, y: SUN[phase].y, opacity: night ? 0 : 1 }} transition={slow}>
            <circle r="20" fill={c.marigold} fillOpacity="0.25" />
            <circle r="12.5" fill={phase === 1 ? "#FBE3A1" : c.marigold} fillOpacity="0.85" stroke={c.ink} strokeWidth="0.9" />
          </motion.g>
          <motion.g initial={false} animate={{ opacity: night ? 1 : 0 }} transition={slow}>
            <path d="M124 30 a14 14 0 1 0 14 20 a11 11 0 1 1 -14 -20 z" fill="#F6EFD9" stroke={c.ink} strokeWidth="0.8" />
            {[
              [40, 22],
              [128, 40],
              [58, 70],
              [540, 28],
              [600, 82],
              [112, 96],
            ].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 3} v6 M${x - 3} ${y} h6`} stroke="#F6EFD9" strokeWidth="1" strokeLinecap="round" className="hk-flicker-soft" style={{ animationDelay: `${-i * 0.8}s` }} />
            ))}
          </motion.g>

          <motion.g initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <Shop sign={m.sign} sacks={m.sacks} eggs={m.eggs} />
          </motion.g>

          {/* Wall clock: the hour hand shows the time of day, the minute hand never stops */}
          <g>
            <circle cx="96" cy="172" r="15" fill={c.cream} stroke={c.ink} strokeWidth="1.1" />
            {[0, 90, 180, 270].map((a) => (
              <path key={a} d="M96 159 v2.5" stroke={c.ink} strokeWidth="1" transform={`rotate(${a} 96 172)`} />
            ))}
            <motion.path stroke={c.ink} strokeWidth="1.6" strokeLinecap="round" initial={false} animate={{ d: hourHand(HOUR[phase]) }} transition={slow} />
            <path d="M96 172 V160" stroke={c.vermilion} strokeWidth="0.9" strokeLinecap="round" className="hk-clock" style={{ transformOrigin: "96px 172px" }} />
            <circle cx="96" cy="172" r="1.4" fill={c.ink} />
          </g>

          {/* Oil bottles: six at dawn, fewer as the day goes on */}
          {BOTTLES.map((x, i) => (
            <motion.g key={x} initial={false} animate={{ opacity: i < bottles ? 1 : 0, y: i < bottles ? 0 : -6 }} transition={{ duration: reduce ? 0 : 0.5 }}>
              <path d={`M${x} 258 v-24 q0 -5 4 -6 v-5 h6 v5 q4 1 4 6 v24 z`} fill="var(--color-paper)" />
              <path d={`M${x} 258 v-24 q0 -5 4 -6 v-5 h6 v5 q4 1 4 6 v24 z`} fill={c.marigold} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
              <path d={box(x + 4, 219, 6, 4)} fill={c.leaf} fillOpacity="0.8" />
              <path d={box(x + 1.5, 240, 11, 9)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
            </motion.g>
          ))}

          {/* The shopkeeper on the raised seat behind the counter, phone in both hands */}
          <g transform="translate(300 455) scale(1.45)">
            <Person seed={61} shirt={c.cream} pants={c.ink} hair="short" look={0} arms={false}>
              {/* Middle-aged: greying temples, a trimmed salt-and-pepper beard, a full moustache and reading glasses */}
              <path d="M-8.7 -76 L-8.9 -70.5 M8.7 -76 L8.9 -70.5" stroke="#a9aba6" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M-7.8 -70.5 C-7.2 -63 -3.6 -59.8 0 -59.3 C3.6 -59.8 7.2 -63 7.8 -70.5 C5.5 -66.4 -5.5 -66.4 -7.8 -70.5 Z" fill="#4a4d49" fillOpacity="0.55" stroke={c.ink} strokeWidth="0.5" strokeOpacity="0.6" />
              <path d="M-4.4 -68.4 Q-2.2 -70.4 0 -69.2 Q2.2 -70.4 4.4 -68.4 Q2.2 -67.6 0 -68.2 Q-2.2 -67.6 -4.4 -68.4 Z" fill={c.ink} fillOpacity="0.8" />
              <g fill="none" stroke={c.ink} strokeWidth="0.6">
                <circle cx="-3.3" cy="-74" r="2.6" />
                <circle cx="3.3" cy="-74" r="2.6" />
                <path d="M-0.7 -74.3 Q0 -75 0.7 -74.3 M-5.9 -74.4 L-8.4 -75.2 M5.9 -74.4 L8.4 -75.2" />
              </g>
              <path d="M-10 -56 C-14 -48 -10 -46 10 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
              <path d="M10 -56 C15 -50 16 -48 16 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            </Person>
          </g>
          <g>
            <rect x={PHONE[0] - 6} y={PHONE[1] - 10} width="12" height="19" rx="2" fill={c.ink} fillOpacity="0.88" />
            <rect x={PHONE[0] - 4.6} y={PHONE[1] - 8} width="9.2" height="14.6" rx="1" fill="var(--color-forest-2)" />
            <motion.rect key={`glow-${sales.n}-${phase}`} x={PHONE[0] - 4.6} y={PHONE[1] - 8} width="9.2" height="14.6" rx="1" fill="var(--color-leaf-glow)" initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} transition={{ duration: 1 }} />
            <rect x={PHONE[0] - 3.4} y={PHONE[1] - 6} width="5" height="1.5" rx="0.7" fill="var(--color-leaf-glow)" />
            <rect x={PHONE[0] - 3.4} y={PHONE[1] - 3} width="7" height="1.1" rx="0.5" fill={c.cream} fillOpacity="0.5" />
            <rect x={PHONE[0] - 3.4} y={PHONE[1] - 0.6} width="6" height="1.1" rx="0.5" fill={c.cream} fillOpacity="0.5" />
            <ellipse cx={PHONE[0] - 6.5} cy={PHONE[1] + 3} rx="3" ry="2.7" fill={skin} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
            <ellipse cx={PHONE[0] + 6.5} cy={PHONE[1] + 3} rx="3" ry="2.7" fill={skin} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
          </g>

          <Counter />

          {/* Things set on the counter: the oil and eggs at midday, a paper bag of dal and sugar in the afternoon */}
          <AnimatePresence>
            {phase === 1 && b >= 1 && b < 4 && (
              <motion.g key="oil" initial={reduce ? false : { x: BOTTLES[5] + 7 - 272, y: 240 - COUNTER_TOP, opacity: 1 }} animate={{ x: 0, y: 0, opacity: 1 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.8, ease }}>
                <path d={`M265 ${COUNTER_TOP} v-20 q0 -4 3.5 -5 v-4 h5 v4 q3.5 1 3.5 5 v20 z`} fill="var(--color-paper)" />
                <path d={`M265 ${COUNTER_TOP} v-20 q0 -4 3.5 -5 v-4 h5 v4 q3.5 1 3.5 5 v20 z`} fill={c.marigold} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.8" />
              </motion.g>
            )}
            {phase === 1 && b >= 3 && b < 4 && (
              <motion.g key="eggs" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
                <path d={box(282, COUNTER_TOP - 7, 28, 7)} fill={c.rice} stroke={c.ink} strokeWidth="0.7" />
                {[0, 1, 2, 3].map((k) => (
                  <circle key={k} cx={286 + k * 6.6} cy={COUNTER_TOP - 8.5} r="2.9" fill={c.cream} stroke={c.ink} strokeWidth="0.5" />
                ))}
              </motion.g>
            )}
            {phase === 2 && b >= 1 && b < 3 && (
              <motion.g key="bag" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }}>
                <path d={`M258 ${COUNTER_TOP} l2 -20 h16 l2 20 z`} fill="var(--color-paper)" />
                <path d={`M258 ${COUNTER_TOP} l2 -20 h16 l2 20 z`} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
                <path d={`M260 ${COUNTER_TOP - 17} h16`} stroke={c.ink} strokeWidth="0.5" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* The morning's rice sack, set down on the floor (it arrives on the courier's shoulder, below) */}
          {delivered && (
            <motion.g initial={phase === 0 && !reduce ? { x: 32, y: -68, rotate: -12 } : false} animate={{ x: SACK_SLOTS[0], y: 0, rotate: 0 }} transition={{ duration: 0.6, ease }}>
              <Sack x={0} label={m.sacks[0]} fill={c.cream} />
            </motion.g>
          )}

          <ellipse cx="300" cy={BULB} rx="6" ry="7" fill={night ? "#FFE58A" : c.cream} stroke={c.ink} strokeWidth="0.8" style={{ transition: "fill 1.2s" }} />
          {/* Shutter: rolls up at dawn, half down at night, shut at the end of the day */}
          <g clipPath="url(#hk-day-opening)">
            <motion.g initial={false} animate={{ y: -(1 - shutter) * OPEN_H }} transition={{ duration: reduce ? 0 : 1.5, ease }}>
              <rect x="42" y={OPEN_TOP} width="556" height={OPEN_H} fill="var(--color-paper)" />
              <rect x="42" y={OPEN_TOP} width="556" height={OPEN_H} fill="#8f9aa3" fillOpacity="0.4" />
              {Array.from({ length: Math.floor(OPEN_H / 7) }, (_, i) => (
                <path key={i} d={`M42 ${OPEN_TOP + 7 + i * 7} H598`} stroke={c.ink} strokeOpacity="0.28" strokeWidth="0.7" />
              ))}
              <path d={box(42, FLOOR - 8, 556, 8)} fill="#7d8790" fillOpacity="0.7" stroke={c.ink} strokeWidth="0.9" />
              <path d={`M310 ${FLOOR - 8} v-6 h20 v6`} fill="none" stroke={c.ink} strokeWidth="1" />
            </motion.g>
          </g>

          {/* Night: the street dims and the bulb lights the shop */}
          <motion.rect x="0" y="0" width={W} height={H} initial={false} animate={{ fill: TINT[phase], opacity: TINT_O[phase] }} transition={slow} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
          <motion.g initial={false} animate={{ opacity: night && b < 4 ? 1 : 0 }} transition={slow} pointerEvents="none">
            <circle cx="300" cy={BULB} r="230" fill="url(#hk-day-bulb)" style={{ mixBlendMode: "screen" }} />
          </motion.g>

          {/* Customers on the street in front of the shop */}
          <motion.g
            initial={false}
            animate={{ x: courier === "here" ? 24 : courier === "gone" ? -70 : -90, opacity: courier === "here" ? 1 : 0 }}
            transition={courier === "off" ? { duration: 0 } : courier === "here" ? { x: { duration: reduce ? 0 : 2, ease: "linear" }, opacity: { duration: 0 } } : { duration: reduce ? 0 : 1.2, ease: "linear" }}
          >
            <g transform={`translate(0 ${STREET}) scale(1.75)`}>
              <Person seed={62} shirt={c.sky} pants="#6b5a48" hair="short" look={courier === "gone" ? -1 : 1} arms={delivered} walking={courier === "gone" || (phase === 0 && b === 2)} pace={delivered ? 1 : 0.98} stride={delivered ? 20 : 14}>
                {!delivered && <path d="M10 -56 C14 -64 10 -70 6 -72 M-10 -56 C-12 -62 -8 -68 -4 -72" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />}
              </Person>
            </g>
            {!delivered && (
              <g transform="translate(8 -68) rotate(-12)">
                <Sack x={0} label={m.sacks[0]} fill={c.cream} />
              </g>
            )}
          </motion.g>
          <motion.g
            initial={false}
            animate={{ x: woman === "here" ? 204 : woman === "gone" ? 360 : 660, opacity: woman === "here" ? 1 : 0 }}
            transition={woman === "off" ? { duration: 0 } : woman === "here" ? { x: { duration: reduce ? 0 : 3.2, ease: "linear" }, opacity: { duration: 0 } } : { duration: reduce ? 0 : 1.1, ease: "linear" }}
          >
            <g transform={`translate(0 ${STREET}) scale(1.75)`}>
              <Person seed={63} shirt={c.plum} pants="#8b6b7d" hair="hijab" look={phase === 1 && b < 1 ? -1 : 1} walking={phase === 1 && (b < 1 || b >= 4)} pace={0.61}>
                {phase === 1 && b >= 4 && <path d="M-16 -36 v8 h6 v-8 z" fill={c.marigold} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.6" />}
              </Person>
            </g>
          </motion.g>
          <motion.g
            initial={false}
            animate={{ x: uncle === "here" ? 202 : uncle === "gone" ? 90 : -60, opacity: uncle === "here" ? 1 : 0 }}
            transition={uncle === "off" ? { duration: 0 } : uncle === "here" ? { x: { duration: reduce ? 0 : 2.75, ease: "linear" }, opacity: { duration: 0 } } : { duration: reduce ? 0 : 1.4, ease: "linear" }}
          >
            <g transform={`translate(0 ${STREET}) scale(1.75)`}>
              <Person seed={64} shirt={c.cream} pants="#c9c2b4" hair="tupi" beard look={uncle === "gone" ? -1 : 1} walking={phase === 2 && (b < 1 || b >= 3)} pace={uncle === "gone" ? 0.9 : 0.75} stride={18} />
            </g>
          </motion.g>

          {/* Paper chits flying to the phone */}
          <AnimatePresence>
            {chits.map((ch) => (
              <motion.g key={ch.id} initial={{ x: ch.from[0], y: ch.from[1], opacity: 0, scale: 1.4, rotate: -10 }} animate={{ x: PHONE[0], y: PHONE[1], opacity: [0, 1, 1, 0], scale: 0.4, rotate: 8 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }}>
                <rect x="-8" y="-6" width="16" height="12" fill={c.cream} stroke={c.ink} strokeWidth="0.7" />
                <path d="M-5 -2 h10 M-5 1.5 h7" stroke={ch.tone === "due" ? c.vermilion : ch.tone === "purchase" ? c.marigold : c.leaf} strokeWidth="1.2" strokeLinecap="round" />
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>

        {/* Today's running sales, as the phone has them */}
        <motion.div
          key={`pill-${phase}-${sales.n}`}
          className="absolute top-1 right-1 z-10 rounded-xl bg-white/95 px-3 py-1.5 text-right shadow-[var(--shadow-float)] ring-1 ring-ink/10 sm:top-2 sm:right-2"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          aria-live="polite"
        >
          <p className="text-[0.62rem] text-muted sm:text-[0.7rem]">{m.today}</p>
          <p className="font-latin text-sm font-bold text-ink sm:text-base">{fmtTaka(sales.total, locale)}</p>
          <p className="text-[0.6rem] text-leaf-deep sm:text-[0.66rem]">{interpolate(m.bills, { n: fmtNumber(sales.n, locale) })}</p>
        </motion.div>

        {/* Little tags for what just happened */}
        <AnimatePresence>
          {phase === 0 && b >= 3 && (
            <Tag key="purchase" at={pct(SACK_SLOTS[0], FLOOR - 74)} tone="bg-marigold text-ink">
              {interpolate(m.purchaseChip, { amount: fmtTaka(AMOUNT.rice, locale) })}
            </Tag>
          )}
          {phase === 1 && b === 2 && (
            <Tag key="oil" at={pct(272, COUNTER_TOP - 40)} tone="bg-leaf text-white" rise>
              +{fmtTaka(AMOUNT.oil, locale)}
            </Tag>
          )}
          {phase === 1 && b === 3 && (
            <Tag key="eggs" at={pct(296, COUNTER_TOP - 40)} tone="bg-leaf text-white" rise>
              +{fmtTaka(AMOUNT.eggs, locale)}
            </Tag>
          )}
          {phase === 2 && b >= 1 && (
            <Tag key="due" at={pct(268, COUNTER_TOP - 40)} tone="bg-vermilion text-white">
              {interpolate(m.duesChip, { amount: fmtTaka(AMOUNT.due, locale) })}
            </Tag>
          )}
          {phase === 2 && b >= 2 && (
            <Tag key="low" at={pct(BOTTLES[2], 206)} tone="bg-vermilion text-white">
              ! {interpolate(m.low, { n: fmtNumber(2, locale) })}
            </Tag>
          )}
          {night && b >= 2 && b < 4 && (
            <motion.p
              key="ask"
              className="absolute z-10 max-w-[11rem] -translate-x-full -translate-y-full rounded-2xl rounded-br-sm bg-white px-2.5 py-1.5 text-[0.62rem] leading-snug text-ink shadow-[var(--shadow-float)] ring-1 ring-ink/10 sm:text-xs"
              style={pct(286, 330)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {m.ask}
            </motion.p>
          )}
          {night && b === 3 && (
            <motion.p
              key="answer"
              className="absolute z-10 max-w-[12rem] -translate-y-full rounded-2xl rounded-bl-sm bg-leaf px-2.5 py-1.5 text-[0.62rem] leading-snug text-white shadow-[var(--shadow-float)] sm:text-xs"
              style={pct(338, 366)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {interpolate(m.answer, { total: fmtTaka(BASE[3].total, locale), n: fmtNumber(BASE[3].n, locale) })}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* The day, as four moments: they play on their own; pick one, or pause */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-hand text-xl text-leaf-deep">{m.title}</p>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          aria-label={playing ? m.pause : m.play}
          className="flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-ink/10 transition-colors hover:bg-leaf-soft"
        >
          {playing ? (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M5 3.2v9.6L12.6 8z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {m.phases.map((p, i) => {
          const active = i === phase;
          return (
            <li key={p.label}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-current={active ? "step" : undefined}
                className={`relative h-full w-full overflow-hidden rounded-2xl px-3 pt-2.5 pb-3 text-left transition-colors ${active ? "bg-white shadow-[var(--shadow-card)] ring-1 ring-leaf/40" : "bg-white/40 ring-1 ring-ink/5 hover:bg-white/70"}`}
              >
                <span className="block text-[0.68rem] text-muted">{p.time}</span>
                <span className={`block font-semibold ${active ? "text-leaf-deep" : "text-ink"}`}>{p.label}</span>
                <span className="mt-1 block text-xs leading-snug text-ink-soft">{interpolate(p.entry, { amount: fmtTaka(amounts[i], locale) })}</span>
                {active && running && (
                  <motion.span key={`bar-${phase}-${cycle}`} className="absolute bottom-0 left-0 h-[3px] bg-leaf" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: PHASE_MS / 1000, ease: "linear" }} />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Tag({ at, tone, rise, children }: { at: { left: string; top: string }; tone: string; rise?: boolean; children: React.ReactNode }) {
  return (
    <motion.span
      className={`pointer-events-none absolute z-10 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold whitespace-nowrap shadow sm:text-[0.7rem] ${tone}`}
      style={at}
      initial={{ opacity: 0, y: 6, scale: 0.85 }}
      animate={rise ? { opacity: [0, 1, 1, 0], y: -10, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={rise ? { duration: 1.6, times: [0, 0.15, 0.75, 1] } : { type: "spring", stiffness: 320, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}
