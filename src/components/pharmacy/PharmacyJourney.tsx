"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { P, Wash, Occlude, box, quad, palette as c } from "@/components/illustrations/ink";
import { AirCon, Person, Section, skin } from "@/components/illustrations/InkPeople";

/**
 * Pharmacy hero: "একটি প্রেসক্রিপশনের যাত্রা", one prescription's journey through a neighbourhood pharmacy,
 * cut open like a dollhouse. A grandson hands over his grandfather's handwritten slip; the pharmacist
 * photographs it, the doctor's scribbles lift off the paper and untangle into medicine names, each name
 * flies to its drawer, the strips come out, a strip that would expire too soon is swapped for a fresh
 * batch, and everything is packed with the dose written on the bag. Hover or tap any drawer, the fridge,
 * the counter, the slip or the store. All figures are sample data.
 */

const W = 640;
const H = 560;
const FLOOR = 500;

/** Medicine drawer wall: 6 columns × 5 rows. */
const COLS = 6;
const ROWS = 5;
const DX = 152;
const DY = 160;
const CW = 46;
const CH = 42;
const cellXY = (i: number) => [DX + (i % COLS) * CW, DY + Math.floor(i / COLS) * CH] as const;
const cellCenter = (i: number) => {
  const [x, y] = cellXY(i);
  return [x + CW / 2, y + CH / 2] as const;
};

/** The labelled drawers (cell index) and their sample stock; the first three are on the prescription. */
const meds = [
  { cell: 7, stock: 240, batch: "PC-2611" },
  { cell: 10, stock: 180, batch: "OM-2604" },
  { cell: 14, stock: 96, batch: "AM-2702" },
  { cell: 0, stock: 320, batch: "MF-2609" },
  { cell: 3, stock: 150, batch: "CT-2705" },
  { cell: 5, stock: 18, batch: "ML-2612", low: true },
  { cell: 17, stock: 60, batch: "AZ-2701" },
  { cell: 19, stock: 210, batch: "CD-2710" },
  { cell: 22, stock: 44, batch: "DP-2511", soon: true },
  { cell: 24, stock: 130, batch: "LR-2608" },
  { cell: 26, stock: 170, batch: "ES-2703" },
  { cell: 29, stock: 90, batch: "FX-2706" },
];
const RX = [0, 1, 2];

/** Where the read medicine names float, on the bare wall left of the drawers. */
const chipAt = (i: number) => [98, 212 + i * 32] as const;
const TRAY = [
  [370, 397],
  [380, 393],
  [390, 389],
] as const;
const BAG = [236, 386] as const;
const SLIP = [200, 395] as const;
const scribble = "M0 0 C3 -5 5 5 8 0 S13 -5 16 0 S21 5 24 0";
const straight = "M0 0 C3 0 5 0 8 0 S13 0 16 0 S21 0 24 0";
/** The phone camera's view of the slip on the counter: a light cone and a viewfinder box. */
const CONE = "M291 386 L291 396 L220 411 L180 381 Z";
const VIEW = { x: 180, y: 380, w: 40, h: 30 };
const ease = [0.45, 0, 0.55, 1] as const;
const LOOP = 19000;

type Zone = "fridge" | "counter" | "rx" | "store" | "monitor" | `med${number}`;
type Strip = { id: number; med: number; slot: number; at: "tray" | "back" | "bag"; bad?: boolean };

function Shop({ m }: { m: { sign: string; open24: string; store: string; bp: string; meds: { short: string }[] } }) {
  const s = new Sketch(3207);
  const labels = new Map(meds.map((d, i) => [d.cell, m.meds[i].short]));
  return (
    <g filter="url(#hk-wobble)">
      {/* Back wall */}
      <Occlude d={box(50, 140, 540, 360)} />
      <Wash d={box(50, 140, 540, 360)} fill={c.leafWash} o={0.1} />
      <Wash d={box(50, 140, 98, 360)} fill={c.rice} o={0.22} />

      {/* Roof, signboard with a green cross, 24-hour board */}
      <Section x={40} y={126} w={560} h={14} />
      <Occlude d={box(58, 68, 48, 48)} />
      <P d={s.rect(58, 68, 48, 48, 0.4)} w={1.2} />
      <path d="M76 76 h12 v12 h12 v12 h-12 v12 h-12 v-12 h-12 v-12 h12 z" fill={c.leaf} fillOpacity="0.9" />
      <P d={s.poly([[76, 76], [88, 76], [88, 88], [100, 88], [100, 100], [88, 100], [88, 112], [76, 112], [76, 100], [64, 100], [64, 88], [76, 88]], true, 0.2)} w={0.9} />
      <P d={s.line(82, 116, 82, 126, 0.2, 1)} w={1} />
      <path d={box(119, 71, 338, 46)} fill={c.leafDeep} fillOpacity="0.92" />
      <P d={s.rect(118, 70, 340, 48, 0.5)} w={1.3} />
      <P d={s.rect(124, 76, 328, 36, 0.3, 1)} w={0.6} c={c.cream} o={0.7} />
      <text x="288" y="100" textAnchor="middle" fontSize="20" fill={c.cream} style={{ fontFamily: "var(--font-tiro)" }}>
        {m.sign}
      </text>
      <P d={s.line(196, 118, 196, 126, 0.2)} w={1.1} />
      <P d={s.line(380, 118, 380, 126, 0.2)} w={1.1} />
      <P d={s.line(494, 112, 494, 126, 0.2, 1)} w={1} />
      <P d={s.line(552, 112, 552, 126, 0.2, 1)} w={1} />
      <Occlude d={box(478, 84, 90, 28)} />
      <Wash d={box(478, 84, 90, 28)} fill={c.marigold} o={0.45} />
      <P d={s.rect(478, 84, 90, 28, 0.4)} w={1.1} />
      <text x="523" y="102.5" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {m.open24}
      </text>

      {/* Walls, ground */}
      <Section x={40} y={140} w={10} h={216} />
      <Section x={590} y={140} w={10} h={360} />
      <Section x={24} y={FLOOR} w={592} h={8} />

      {/* Door with a marigold garland */}
      <Wash d={quad([[50, 356], [76, 362], [76, 494], [50, 500]])} fill={c.sky} o={0.28} />
      <P d={s.poly([[50, 356], [76, 362], [76, 494], [50, 500]], true, 0.3)} w={1} />
      <P d={s.line(70, 420, 70, 432, 0.2, 1)} w={1.4} />
      <P d={s.curve([[52, 346], [72, 356], [96, 360], [118, 352]], 0.3)} w={0.6} c={c.leafDeep} />
      {[56, 64, 72, 80, 88, 96, 104, 112].map((x, i) => {
        const y = 349 + Math.sin((i / 7) * Math.PI) * 9;
        return <circle key={x} cx={x} cy={y} r="3.2" fill={i % 2 ? c.marigold : c.vermilion} fillOpacity="0.75" stroke={c.ink} strokeWidth="0.5" />;
      })}
      {/* "BP checked here" plate */}
      <Occlude d={box(56, 306, 86, 24)} />
      <path d={box(56, 306, 86, 24)} fill={c.cream} />
      <P d={s.rect(56, 306, 86, 24, 0.3)} w={1} />
      <text x="99" y="322" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#a83a22" style={{ fontFamily: "var(--font-sans)" }}>
        {m.bp}
      </text>

      {/* The medicine drawer wall */}
      <Wash d={box(146, 152, 288, 222)} fill={c.clay} o={0.35} />
      <P d={s.rect(146, 152, 288, 222, 0.5)} w={1.3} />
      <P d={s.line(142, 152, 438, 152, 0.4)} w={1.6} />
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const [x, y] = cellXY(i);
        const label = labels.get(i);
        return (
          <g key={i}>
            <Occlude d={box(x + 3, y + 3, CW - 6, CH - 6)} />
            <Wash d={box(x + 3, y + 3, CW - 6, CH - 6)} fill={c.clay} o={0.22} />
            <P d={s.rect(x + 3, y + 3, CW - 6, CH - 6, 0.25, 1)} w={0.8} />
            <path d={box(x + 7, y + 8, CW - 14, 11)} fill={c.cream} />
            <P d={s.rect(x + 7, y + 8, CW - 14, 11, 0.15, 1)} w={0.5} />
            {label ? (
              <text x={x + CW / 2} y={y + 16.3} textAnchor="middle" fontSize="6.6" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
                {label}
              </text>
            ) : (
              <P d={s.curve([[x + 11, y + 14], [x + 16, y + 12], [x + 21, y + 15], [x + 27, y + 12.5], [x + 34, y + 14]], 0.3)} w={0.5} o={0.55} />
            )}
            <circle cx={x + CW / 2} cy={y + 30} r="2.2" fill={c.cream} stroke={c.ink} strokeWidth="0.7" />
          </g>
        );
      })}
      {/* Ladder */}
      <P d={s.line(440, 160, 454, 372, 0.4)} w={1.1} />
      <P d={s.line(452, 158, 466, 372, 0.4)} w={1.1} />
      {[190, 222, 254, 286, 318, 350].map((y) => {
        const t = (y - 160) / 212;
        return <P key={y} d={s.line(440 + t * 14, y, 452 + t * 14, y - 1, 0.2, 1)} w={0.8} />;
      })}

      {/* Insulin fridge */}
      <Wash d={box(474, 300, 58, 200)} fill={c.sky} o={0.16} />
      <P d={s.rect(474, 300, 58, 200, 0.4)} w={1.1} />
      <path d={box(484, 304, 38, 12)} fill={c.ink} fillOpacity="0.8" />
      <P d={s.rect(478, 322, 50, 170, 0.3, 1)} w={0.8} />
      {[364, 406, 448].map((y) => (
        <P key={y} d={s.line(479, y, 527, y, 0.2, 1)} w={0.6} />
      ))}
      {[484, 494, 504, 514].map((x, i) => (
        <g key={x}>
          <P d={s.rect(x, 346, 6, 17, 0.1, 1)} w={0.6} />
          <Wash d={box(x, 346, 6, 6)} fill={[c.sky, c.leafWash, c.marigold, c.sky][i]} o={0.6} />
          <P d={s.line(x + 1, 388, x + 9, 403, 0.1, 1)} w={1.6} c={c.sky} />
        </g>
      ))}
      <P d={s.line(522, 380, 522, 400, 0.2, 1)} w={1.4} />
      {/* Clock */}
      <Occlude d={s.ellipse(503, 200, 11, 11, 0)} />
      <P d={s.ellipse(503, 200, 11, 11, 0.2)} w={1} />
      <path d="M503 200 v-6.5" stroke={c.ink} strokeWidth="1" strokeLinecap="round" />
      {/* Store door, ajar, cartons inside */}
      <Occlude d={box(540, 318, 46, 14)} />
      <P d={s.rect(540, 318, 46, 14, 0.3)} w={0.8} />
      <text x="563" y="328.5" textAnchor="middle" fontSize="8" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {m.store}
      </text>
      <Wash d={box(542, 338, 44, 162)} fill={c.ink} o={0.18} />
      <P d={s.rect(542, 338, 44, 162, 0.3)} w={1} />
      {[
        [552, 476],
        [566, 476],
        [558, 456],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <Wash d={box(x, y, 16, 20)} fill={c.clay} o={0.5} />
          <P d={s.rect(x, y, 16, 20, 0.2, 1)} w={0.7} />
        </g>
      ))}
      <Wash d={quad([[542, 338], [554, 344], [554, 494], [542, 500]])} fill={c.clay} o={0.4} />
      <P d={s.poly([[542, 338], [554, 344], [554, 494], [542, 500]], true, 0.2)} w={0.9} />
    </g>
  );
}

/** The glass counter, drawn over the pharmacist (who stands on the raised floor behind it). */
function Counter() {
  const s = new Sketch(3301);
  return (
    <g filter="url(#hk-wobble)">
      <Occlude d={box(166, 404, 298, 96)} />
      <Wash d={box(170, 414, 290, 78)} fill={c.sky} o={0.16} />
      <P d={s.rect(170, 414, 290, 78, 0.4)} w={1.1} />
      {[442, 468].map((y) => (
        <P key={y} d={s.line(172, y, 458, y, 0.3, 1)} w={0.7} />
      ))}
      {/* Strips and syrup bottles in the glass */}
      {[182, 214, 246, 344, 376, 408].map((x, i) => (
        <g key={x}>
          <Wash d={box(x, 428, 22, 11)} fill={[c.leafWash, c.vermilion, c.marigold, c.sky, c.leafWash, c.plum][i]} o={0.4} />
          <P d={s.rect(x, 428, 22, 11, 0.15, 1)} w={0.6} />
          {[4, 9, 14, 19].map((dx) => (
            <circle key={dx} cx={x + dx} cy={433.5} r="1.4" fill="none" stroke={c.ink} strokeWidth="0.5" />
          ))}
        </g>
      ))}
      {[190, 206, 222, 300, 316, 400, 416].map((x, i) => (
        <g key={x}>
          <Wash d={`M${x} 467 v-12 q0 -3 3 -4 v-3 h4 v3 q3 1 3 4 v12 z`} fill={i % 3 ? c.clay : c.vermilion} o={0.5} />
          <P d={s.poly([[x, 467], [x, 455], [x + 3, 451], [x + 3, 448], [x + 7, 448], [x + 7, 451], [x + 10, 455], [x + 10, 467]], false, 0.15)} w={0.6} />
        </g>
      ))}
      <P d={s.line(176, 420, 196, 438, 0.2, 1)} w={0.5} o={0.5} />
      <P d={s.line(330, 420, 350, 438, 0.2, 1)} w={0.5} o={0.5} />
      {/* Wooden top and plinth */}
      <Wash d={box(166, 404, 298, 10)} fill={c.clay} o={0.75} />
      <P d={s.rect(166, 404, 298, 10, 0.3)} w={1.1} />
      <Wash d={box(170, 492, 290, 8)} fill={c.clay} o={0.6} />
      <P d={s.rect(170, 492, 290, 8, 0.2)} w={0.9} />
      {/* Pill-counting tray */}
      <Wash d={quad([[360, 404], [400, 404], [396, 398], [364, 398]])} fill={c.leafWash} o={0.6} />
      <P d={s.poly([[360, 404], [400, 404], [396, 398], [364, 398]], true, 0.2)} w={0.8} />
    </g>
  );
}

/** A blister strip, centred on (0, 0). */
function StripShape({ tint }: { tint: string }) {
  return (
    <g>
      <rect x="-11" y="-5" width="22" height="10" rx="1.5" fill={c.cream} />
      <rect x="-11" y="-5" width="22" height="10" rx="1.5" fill={tint} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.7" />
      {[-7, -2.4, 2.2, 6.8].map((dx) => (
        <g key={dx}>
          <circle cx={dx} cy={-1.8} r="1.3" fill={c.cream} stroke={c.ink} strokeWidth="0.45" />
          <circle cx={dx} cy={2} r="1.3" fill={c.cream} stroke={c.ink} strokeWidth="0.45" />
        </g>
      ))}
    </g>
  );
}

export function PharmacyJourney() {
  const { t, locale } = useI18n();
  const m = t.pharmacy.heroJourney;
  const reduce = useReducedMotion();

  const [walk, setWalk] = useState<"in" | "here" | "out" | "gone">(reduce ? "here" : "gone");
  const [slip, setSlip] = useState<"hand" | "counter" | "none">(reduce ? "counter" : "none");
  const [flash, setFlash] = useState(0);
  const [reading, setReading] = useState(false);
  const [scan, setScan] = useState(false);
  const [lift, setLift] = useState<"off" | "up" | "read">(reduce ? "read" : "off");
  const [chipFly, setChipFly] = useState<boolean[]>([false, false, false]);
  const [open, setOpen] = useState<number[]>(reduce ? [meds[2].cell] : []);
  const [strips, setStrips] = useState<Strip[]>(reduce ? RX.map((r) => ({ id: r, med: r, slot: r, at: "tray" as const })) : []);
  const [tag, setTag] = useState<"soon" | "fresh" | null>(reduce ? "fresh" : null);
  const [bag, setBag] = useState<"none" | "counter" | "hand">(reduce ? "counter" : "none");
  const [dose, setDose] = useState(reduce);
  const [chip, setChip] = useState(0);
  const [bills, setBills] = useState(86);
  const [total, setTotal] = useState(12480);
  const [zone, setZone] = useState<Zone | null>(null);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    // A drawer can be asked to open again while it is still open (two medicines in one drawer, or the next
    // loop): keep it listed once, and only the latest open's timer closes it.
    const lastOpen = new Map<number, number>();
    let openSeq = 0;
    const openDrawer = (cell: number) => {
      const token = ++openSeq;
      lastOpen.set(cell, token);
      setOpen((o) => (o.includes(cell) ? o : [...o, cell]));
      at(1700, () => {
        if (lastOpen.get(cell) === token) setOpen((o) => o.filter((x) => x !== cell));
      });
    };
    const run = () => {
      // Grandfather and grandson walk in; the grandson hands over the slip
      at(0, () => setWalk("in"));
      at(1800, () => setWalk("here"));
      at(2100, () => setSlip("hand"));
      at(3000, () => setSlip("counter"));
      // The pharmacist scans it with her phone; the handwriting lifts off and untangles into names
      at(3300, () => {
        setScan(true);
        setReading(true);
      });
      at(4500, () => {
        setScan(false);
        setFlash((f) => f + 1);
      });
      at(4700, () => setLift("up"));
      at(5800, () => setLift("read"));
      // Each name flies to its drawer; the drawer opens and a strip comes out to the tray
      RX.forEach((r, i) => {
        const t0 = 6600 + i * 700;
        at(t0, () => setChipFly((f) => f.map((v, k) => (k === r ? true : v))));
        at(t0 + 900, () => {
          openDrawer(meds[r].cell);
          setStrips((s) => [...s, { id: Date.now() + r, med: r, slot: i, at: "tray", bad: r === 2 }]);
        });
      });
      // The amlodipine strip would expire mid-course: back it goes, a fresh batch comes out
      at(9300, () => setTag("soon"));
      at(10700, () => {
        setTag(null);
        setStrips((s) => s.map((x) => (x.bad ? { ...x, at: "back" } : x)));
        openDrawer(meds[2].cell);
      });
      at(11700, () => setStrips((s) => [...s.filter((x) => !x.bad), { id: Date.now() + 9, med: 2, slot: 2, at: "tray" }]));
      at(12500, () => setTag("fresh"));
      // Packed, dose written on the bag, sale recorded
      at(13400, () => {
        setBag("counter");
        setStrips((s) => s.map((x) => ({ ...x, at: "bag" })));
        setReading(false);
        setSlip("none");
      });
      at(14000, () => {
        setDose(true);
        setChip((k) => k + 1);
        setBills((b) => b + 1);
        setTotal((v) => v + 340);
      });
      at(14600, () => setTag(null));
      at(15400, () => setBag("hand"));
      at(15900, () => setWalk("out"));
      // Reset, out of sight
      at(18200, () => {
        setWalk("gone");
        setBag("none");
        setDose(false);
        setStrips([]);
        setLift("off");
        setChipFly([false, false, false]);
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

  const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const walkX = walk === "in" || walk === "here" ? 0 : walk === "out" ? -130 : -130;
  const medZone = zone?.startsWith("med") ? Number(zone.slice(3)) : null;

  const card = (() => {
    if (!zone) return null;
    if (medZone !== null) {
      const d = meds[medZone];
      const [cx, cy] = cellXY(d.cell);
      return {
        at: [cx + CW / 2, cy] as const,
        title: m.meds[medZone].name,
        body: (
          <dl className="mt-1 space-y-0.5 text-[0.7rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.stock}</dt>
              <dd className={`font-latin font-semibold ${d.low ? "text-vermilion" : ""}`}>{fmtNumber(d.stock, locale)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.batch}</dt>
              <dd className="font-latin font-semibold">{d.batch}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{m.expiry}</dt>
              <dd className={`font-semibold ${d.soon ? "text-vermilion" : ""}`}>{m.meds[medZone].expiry}</dd>
            </div>
            {(d.low || d.soon) && <dd className="mt-1 inline-block rounded-full bg-vermilion-soft px-1.5 text-[0.62rem] font-bold text-vermilion">{d.low ? m.low : m.expiring}</dd>}
          </dl>
        ),
      };
    }
    const z = m.zones[zone as "fridge" | "counter" | "rx" | "store" | "monitor"];
    const at = { fridge: [503, 300], counter: [380, 404], rx: [120, 360], store: [563, 318], monitor: [441, 360] }[zone as "fridge"] as [number, number];
    return {
      at,
      title: z.title,
      body: <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{interpolate(z.body, { n: fmtNumber(bills, locale), total: fmtTaka(total, locale), temp: fmtNumber(4, locale) })}</p>,
    };
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
          <Shop m={m} />
        </motion.g>

        {/* Ambient: the green cross breathes, the fridge holds 4°C, the AC hums, the clock ticks */}
        <AirCon x={486} y={148} w={66} />
        <path d="M76 76 h12 v12 h12 v12 h-12 v12 h-12 v-12 h-12 v-12 h12 z" fill="var(--color-leaf-glow)" className="hk-cross" />
        <text x="503" y="313.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-leaf-glow)" style={{ fontFamily: "var(--font-manrope)" }} className="hk-flicker-soft">
          {fmtNumber(4, locale)}°C
        </text>
        <rect x="479" y="323" width="48" height="168" fill="#e8f4ff" className="hk-flicker" />
        <path d="M503 200 l5 2" stroke={c.vermilion} strokeWidth="0.9" strokeLinecap="round" className="hk-clock" style={{ transformOrigin: "503px 200px" }} />

        {/* Open drawers */}
        {open.map((cell) => {
          const [x, y] = cellXY(cell);
          return (
            <motion.g key={`open-${cell}`} initial={{ y: 0, scale: 1 }} animate={{ y: 3, scale: 1.1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} style={{ originX: 0.5, originY: 0.5 }}>
              <rect x={x + 1} y={y + 1} width={CW - 2} height={CH - 2} rx="2" fill="var(--color-leaf-glow)" opacity="0.35" />
              <rect x={x + 3} y={y + CH - 6} width={CW - 6} height="8" fill={c.clay} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.7" />
              <rect x={x + 3} y={y + 3} width={CW - 6} height={CH - 6} fill="var(--color-paper)" />
              <rect x={x + 3} y={y + 3} width={CW - 6} height={CH - 6} fill={c.clay} fillOpacity="0.28" stroke="var(--color-leaf)" strokeWidth="1.4" />
              <rect x={x + 7} y={y + 8} width={CW - 14} height="11" fill={c.cream} stroke={c.ink} strokeWidth="0.5" />
              <text x={x + CW / 2} y={y + 16.3} textAnchor="middle" fontSize="6.6" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
                {m.meds[meds.findIndex((d) => d.cell === cell)].short}
              </text>
              <circle cx={x + CW / 2} cy={y + 30} r="2.2" fill={c.cream} stroke={c.ink} strokeWidth="0.7" />
            </motion.g>
          );
        })}


        {/* Pharmacist on the raised floor behind the counter, phone in hand */}
        <g transform="translate(330 470) scale(1.4)">
          <Person seed={51} shirt={c.cream} pants={c.ink} hair="hijab" look={-1} arms={false}>
            <path d="M-6 -60 L-4 -40 M6 -60 L4 -40" stroke={c.leaf} strokeWidth="0.9" strokeOpacity="0.7" />
            <path d="M10 -56 C14 -48 14 -42 12 -36" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <path d="M-10 -56 C-15 -58 -20 -59 -24 -58" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
          </Person>
        </g>
        <g>
          <rect x="290" y="376" width="12" height="20" rx="2" fill={c.ink} fillOpacity="0.85" />
          <rect x="291.5" y="378.5" width="9" height="15" rx="1" fill="var(--color-forest-2)" />
          <rect x="292.5" y="380" width="5" height="1.6" rx="0.8" fill="var(--color-leaf-glow)" />
          <rect x="292.5" y="383.5" width="7" height="1.2" rx="0.6" fill={c.cream} fillOpacity="0.45" />
          <rect x="292.5" y="386" width="6" height="1.2" rx="0.6" fill={c.cream} fillOpacity="0.45" />
          {scan && (
            <g fill="none" stroke="var(--color-leaf-glow)" strokeWidth="0.7">
              <path d="M293 381 v-1.5 h1.5 M299 379.5 h1.5 v1.5 M293 391 v1.5 h1.5 M299 392.5 h1.5 v-1.5" />
              <rect x="294" y="383" width="5" height="6" fill="var(--color-cream)" fillOpacity="0.5" stroke="none" />
            </g>
          )}
          <ellipse cx="297" cy="395" rx="3.4" ry="3" fill={skin} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.8" />
          <motion.circle key={`flash-${flash}`} cx={SLIP[0]} cy={SLIP[1]} r="10" fill="#fff" initial={{ opacity: 0, scale: 0.3 }} animate={flash ? { opacity: [0, 0.95, 0], scale: [0.3, 2.2, 3] } : { opacity: 0 }} transition={{ duration: 0.6 }} style={{ originX: 0.5, originY: 0.5 }} />
        </g>

        <Counter />

        {/* Computer monitor on the counter: HelloKhata follows the prescription, then shows today's sales */}
        <g filter="url(#hk-wobble)">
          <path d="M438 392 h6 l1 8 h-8 z" fill={c.ink} fillOpacity="0.55" />
          <path d={box(430, 400, 22, 4)} fill={c.ink} fillOpacity="0.55" />
          <rect x="419" y="360" width="44" height="32" rx="2.5" fill={c.ink} fillOpacity="0.85" />
        </g>
        <g style={{ fontFamily: "var(--font-sans)" }}>
          <rect x="421.5" y="362.5" width="39" height="27" rx="1" fill="var(--color-forest-2)" />
          <rect x="421.5" y="362.5" width="39" height="4" rx="1" fill="var(--color-leaf)" />
          <circle cx="424" cy="364.5" r="0.9" fill={c.cream} />
          {reading || strips.length ? (
            RX.map((r, i) => {
              const done = strips.some((x) => x.med === r && !x.bad && x.at !== "back");
              return (
                <g key={r}>
                  <rect x="423.5" y={369.5 + i * 6.2} width="26" height="4.2" rx="1" fill={c.cream} fillOpacity={lift === "read" || strips.length ? 0.22 : 0.08} style={{ transition: "fill-opacity 0.4s" }} />
                  <text x="425" y={372.8 + i * 6.2} fontSize="3.4" fill={c.cream} fillOpacity={lift === "read" || strips.length ? 0.9 : 0}>
                    {m.meds[r].short}
                  </text>
                  <circle cx="455" cy={371.6 + i * 6.2} r="1.9" fill={done ? "var(--color-leaf-glow)" : "none"} stroke="var(--color-leaf-glow)" strokeWidth="0.6" />
                  {done && <path d={`M454 ${371.7 + i * 6.2} l0.8 0.8 l1.6 -1.6`} fill="none" stroke="var(--color-forest-2)" strokeWidth="0.6" />}
                </g>
              );
            })
          ) : (
            <g>
              <text x="424" y="372" fontSize="3.6" fill={c.cream} fillOpacity="0.7">
                {m.today}
              </text>
              <text x="424" y="379" fontSize="6" fontWeight="700" fill={c.cream} style={{ fontFamily: "var(--font-manrope)" }}>
                {fmtTaka(total, locale)}
              </text>
              {[5, 8, 6, 10, 9, 12].map((h, i) => (
                <rect key={i} x={442 + i * 3} y={387 - h} width="2" height={h} rx="0.5" fill={i === 5 ? "var(--color-leaf-glow)" : c.cream} fillOpacity={i === 5 ? 1 : 0.35} />
              ))}
              <text x="424" y="386.5" fontSize="3.2" fill="var(--color-leaf-glow)">
                {interpolate(m.billsShort, { n: fmtNumber(bills, locale) })}
              </text>
            </g>
          )}
        </g>

        {/* The prescription slip */}
        <AnimatePresence>
          {slip !== "none" && (
            <motion.g key="slip" initial={{ opacity: 0, x: 172, y: 412, rotate: -14 }} animate={slip === "hand" ? { opacity: 1, x: 172, y: 410, rotate: -14 } : { opacity: 1, x: SLIP[0], y: SLIP[1], rotate: -6 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}>
              <rect x="-15" y="-10" width="30" height="20" fill={c.cream} stroke={c.ink} strokeWidth="0.8" />
              <path d="M-12 -7 h8" stroke={c.leaf} strokeWidth="1" />
              <text x="-12" y="-1" fontSize="5" fontWeight="700" fill={c.ink} style={{ fontFamily: "var(--font-manrope)" }}>
                Rx
              </text>
              {lift === "off" &&
                [0, 1, 2].map((i) => <path key={i} d={scribble} transform={`translate(-5 ${-1 + i * 4}) scale(0.62 0.5)`} fill="none" stroke={c.ink} strokeWidth="1.3" />)}
            </motion.g>
          )}
        </AnimatePresence>

        {/* The scan: a soft cone of light from her phone, viewfinder corners lock on, a beam sweeps the slip */}
        <defs>
          <linearGradient id="hk-scan-cone" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#4ade80" stopOpacity="0.45" />
            <stop offset="1" stopColor="#4ade80" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <AnimatePresence>
          {scan && (
            <motion.g key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <path d={CONE} fill="url(#hk-scan-cone)" />
              {[
                [VIEW.x, VIEW.y, 1, 1],
                [VIEW.x + VIEW.w, VIEW.y, -1, 1],
                [VIEW.x, VIEW.y + VIEW.h, 1, -1],
                [VIEW.x + VIEW.w, VIEW.y + VIEW.h, -1, -1],
              ].map(([x, y, sx, sy], i) => (
                <motion.path
                  key={i}
                  d={`M${x} ${y + sy * 7} V${y} H${x + sx * 7}`}
                  fill="none"
                  stroke="var(--color-leaf)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ x: -sx * 5, y: -sy * 5, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease }}
                />
              ))}
              <motion.g initial={{ y: 0 }} animate={{ y: [0, VIEW.h - 4, 0, VIEW.h - 4] }} transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}>
                <rect x={VIEW.x + 2} y={VIEW.y + 1} width={VIEW.w - 4} height="3" rx="1.5" fill="var(--color-leaf-glow)" opacity="0.35" />
                <rect x={VIEW.x + 2} y={VIEW.y + 2} width={VIEW.w - 4} height="1" fill="var(--color-leaf)" />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Handwriting lifts off, untangles, becomes names; each name flies to its drawer */}
        {lift !== "off" &&
          RX.map((r, i) => {
            const [cx, cy] = chipAt(i);
            const [tx, ty] = cellCenter(meds[r].cell);
            const flying = chipFly[i];
            return (
              <g key={`chip-${r}`}>
                <motion.path
                  d={scribble}
                  fill="none"
                  stroke={c.ink}
                  strokeWidth="0.55"
                  strokeLinecap="round"
                  initial={{ x: SLIP[0] - 5, y: SLIP[1] - 1 + i * 4, scale: 0.6, d: scribble }}
                  animate={lift === "up" ? { x: cx - 41, y: cy + 8, scale: 3.4, d: [scribble, scribble, straight] } : { x: cx - 41, y: cy + 8, scale: 3.4, opacity: 0, d: straight }}
                  transition={{ duration: 1.1, ease, delay: i * 0.12 }}
                  style={{ originX: 0, originY: 0.5 }}
                />
                <motion.g
                  initial={reduce ? false : { opacity: 0, x: 0, y: 0, scale: 1 }}
                  animate={flying ? { opacity: [1, 1, 0], x: tx - cx, y: ty - cy, scale: 0.35 } : { opacity: lift === "read" ? 1 : 0, x: 0, y: 0, scale: 1 }}
                  transition={flying ? { duration: 0.9, ease } : { duration: 0.5 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <rect x={cx - 44} y={cy - 10} width="88" height="20" rx="10" fill={c.cream} stroke="var(--color-leaf)" strokeWidth="1.2" />
                  <circle cx={cx - 34} cy={cy} r="2.6" fill="var(--color-leaf)" />
                  <text x={cx + 4} y={cy + 3.3} textAnchor="middle" fontSize="8.6" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
                    {m.meds[r].name}
                  </text>
                </motion.g>
              </g>
            );
          })}

        {/* Strips: out of the drawers, onto the tray, into the bag */}
        {strips.map((st) => {
          const [dx, dy] = cellCenter(meds[st.med].cell);
          const [tx, ty] = TRAY[st.slot];
          const target = st.at === "tray" ? { x: tx, y: ty, opacity: 1, scale: 1 } : st.at === "back" ? { x: dx, y: dy, opacity: 0, scale: 0.6 } : { x: BAG[0], y: BAG[1] + 4, opacity: 0, scale: 0.7 };
          return (
            <motion.g key={st.id} initial={reduce ? false : { x: dx, y: dy, opacity: 0, scale: 0.6 }} animate={target} transition={{ duration: 0.95, ease }}>
              <StripShape tint={[c.leafWash, c.marigold, c.sky][st.med]} />
              {st.bad && st.at === "tray" && tag === "soon" && <rect x="-12" y="-6" width="24" height="12" rx="2" fill="none" stroke={c.vermilion} strokeWidth="1.4" />}
            </motion.g>
          );
        })}

        {/* Paper bag with the dose written on it */}
        <AnimatePresence>
          {bag === "counter" && (
            <motion.g key="bag" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -60, y: 10 }} transition={{ duration: 0.5, ease }}>
              <path d={`M${BAG[0] - 13} 404 l2 -26 h22 l2 26 z`} fill={c.cream} />
              <path d={`M${BAG[0] - 13} 404 l2 -26 h22 l2 26 z`} fill={c.clay} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.9" strokeLinejoin="round" />
              <path d={`M${BAG[0] - 11} 382 h22`} stroke={c.ink} strokeWidth="0.6" />
              <path d={`M${BAG[0] - 6} 386 h12 v4 h-12 z`} fill={c.leaf} fillOpacity="0.5" />
              {dose && (
                <motion.text x={BAG[0]} y="399" textAnchor="middle" fontSize="8" fill={c.ink} className="font-hand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  {m.dose}
                </motion.text>
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Grandfather (with his cane) and grandson */}
        <motion.g initial={false} animate={{ x: walkX, opacity: walk === "gone" ? 0 : 1 }} transition={walk === "gone" ? { duration: 0 } : { x: { duration: walk === "out" ? 2.2 : 1.8, ease: "linear" }, opacity: { duration: walk === "out" ? 2.2 : 0.8, ease: "easeIn" } }}>
          <g transform="translate(104 500) scale(1.5)">
            <Person seed={52} shirt={c.cream} pants="#c9c2b4" hair="tupi" beard look={walk === "out" ? -1 : 1} walking={walk === "in" || walk === "out"} pace={walk === "out" ? 0.92 : 0.75} stride={16}>
              <path d="M14 -36 L15.5 0" stroke={c.clay} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M14 -36 q2 -3 4 0" fill="none" stroke={c.clay} strokeWidth="1.6" strokeLinecap="round" />
              {bag === "hand" && (
                <g>
                  <path d="M-19 -24 l1.5 -14 h11 l1.5 14 z" fill={c.cream} />
                  <path d="M-19 -24 l1.5 -14 h11 l1.5 14 z" fill={c.clay} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.7" />
                </g>
              )}
            </Person>
          </g>
          <g transform="translate(150 500) scale(1.02)">
            <Person seed={53} shirt={c.sky} pants="#5a6b7a" look={walk === "out" ? -1 : 1} arms={slip !== "hand"} walking={walk === "in" || walk === "out"} pace={walk === "out" ? 0.85 : 0.69}>
              {slip === "hand" && (
                <>
                  <path d="M-10 -56 C-14 -46 -14 -42 -14 -37" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M10 -56 C14 -62 18 -76 20 -86" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                </>
              )}
            </Person>
          </g>
        </motion.g>

        {/* Hit areas */}
        {meds.map((d, i) => {
          const [x, y] = cellXY(d.cell);
          return hit(`med${i}`, x, y, CW, CH, m.meds[i].name);
        })}
        {hit("fridge", 474, 300, 58, 200, m.zones.fridge.title)}
        {hit("counter", 166, 404, 298, 96, m.zones.counter.title)}
        {hit("rx", 54, 360, 112, 140, m.zones.rx.title)}
        {hit("store", 540, 318, 46, 182, m.zones.store.title)}
        {hit("monitor", 418, 360, 46, 44, m.zones.monitor.title)}
      </svg>

      {/* Expiry tags over the tray */}
      <AnimatePresence>
        {tag && (
          <motion.span
            key={tag}
            className={`pointer-events-none absolute -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold whitespace-nowrap text-white shadow sm:text-[0.68rem] ${tag === "soon" ? "bg-vermilion" : "bg-leaf"}`}
            style={pct(TRAY[2][0] + 22, 344)}
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
          >
            {tag === "soon" ? `! ${m.soon}` : `✓ ${m.fresh}`}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Sale chip */}
      <AnimatePresence>
        {chip > 0 && dose && (
          <motion.span
            key={`sale-${chip}`}
            className="font-latin pointer-events-none absolute -translate-x-1/2 rounded-full bg-leaf px-1.5 py-0.5 text-[0.62rem] font-bold whitespace-nowrap text-white shadow sm:text-xs"
            style={pct(BAG[0], 350)}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: -8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, times: [0, 0.15, 0.75, 1] }}
          >
            +{fmtTaka(340, locale)}
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
