"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { P, Wash, Occlude, box, quad, palette as c } from "@/components/illustrations/ink";
import { AirCon, Person, Section, skin } from "@/components/illustrations/InkPeople";

/**
 * Super Shop hero: "অন্দরমহল", the shop cut open like a dollhouse.
 * Shop floor, stockroom and the manager's cabin, with green ink veins running through the walls: every
 * scan at a counter travels up to the manager's screen, a shelf running low calls the stockroom, and the
 * stock boy carries a carton across to refill it. Hover or tap any part of the shop to see what it does.
 * Drawn in the same pen-and-wash style as the rest of the site. All figures are sample data.
 */

const W = 600;
const H = 560;
const FLOOR = 520;
const SLAB = 296;

type Vein = "shelf" | "fridge" | "c1" | "c2" | "stock";
const veins: Record<Vein, string> = {
  shelf: "M112 372 V276",
  fridge: "M234 362 V276",
  c1: "M296 440 V312 H150 V276",
  c2: "M370 440 V318 H172 V276",
  stock: "M460 342 V324 H194 V276",
};
type DropId = "c1" | "c2" | "fridge" | "shelf" | "shelfWarn" | "stockWarn";
const drops: { id: DropId; vein: Vein; warn?: boolean; reverse?: boolean }[] = [
  { id: "c1", vein: "c1" },
  { id: "c2", vein: "c2" },
  { id: "fridge", vein: "fridge" },
  { id: "shelf", vein: "shelf" },
  { id: "shelfWarn", vein: "shelf", warn: true },
  { id: "stockWarn", vein: "stock", warn: true, reverse: true },
];

type Zone = "shelf" | "fridge" | "counters" | "stock" | "manager";
const zones: { key: Zone; rect: [number, number, number, number]; veins: Vein[]; tip: [number, number] }[] = [
  { key: "manager", rect: [68, 160, 470, 136], veins: ["shelf", "fridge", "c1", "c2", "stock"], tip: [300, 168] },
  { key: "shelf", rect: [68, 364, 140, 156], veins: ["shelf"], tip: [130, 362] },
  { key: "fridge", rect: [208, 354, 52, 166], veins: ["fridge"], tip: [234, 352] },
  { key: "counters", rect: [262, 410, 168, 110], veins: ["c1", "c2"], tip: [346, 408] },
  { key: "stock", rect: [438, 306, 100, 214], veins: ["stock"], tip: [480, 330] },
];

const BOY_X = 470;
const BOY_WALK = -270;

/** The building: everything that never moves, drawn once under the ink filter. */
function Building({ t }: { t: { sign: string; open: string; rice: string; dal: string; oil: string; milk: string } }) {
  const s = new Sketch(5512);
  const tank = "M470 108 C470 100 526 100 526 108 L526 144 C526 148 470 148 470 144 Z";
  return (
    <g filter="url(#hk-wobble)">
      {/* Back walls */}
      <Occlude d={box(68, 160, 470, 360)} />
      <Wash d={box(68, 160, 470, 136)} fill={c.rice} o={0.32} />
      <Wash d={box(68, 306, 470, 214)} fill={c.rice} o={0.2} />
      <Wash d={box(438, 306, 100, 214)} fill={c.clay} o={0.16} />
      <P d={s.line(68, 488, 432, 488, 0.4, 1)} w={0.5} o={0.35} />

      {/* Roof: parapet, signboard, water tank, a pigeon */}
      <Section x={58} y={146} w={490} h={14} />
      <P d={s.line(190, 138, 190, 146, 0.2)} w={1.1} />
      <P d={s.line(410, 138, 410, 146, 0.2)} w={1.1} />
      <Occlude d={box(170, 94, 260, 44)} />
      <path d={box(171, 95, 258, 42)} fill={c.leafDeep} fillOpacity="0.92" />
      <P d={s.rect(170, 94, 260, 44, 0.5)} w={1.3} />
      <P d={s.rect(176, 100, 248, 32, 0.3, 1)} w={0.6} c={c.cream} o={0.7} />
      <text x="300" y="123" textAnchor="middle" fontSize="19" fill={c.cream} style={{ fontFamily: "var(--font-tiro)" }}>
        {t.sign}
      </text>
      <Occlude d={tank} />
      <Wash d={tank} fill={c.ink} o={0.3} />
      <P d={s.curve([[470, 144], [470, 106], [498, 101], [526, 106], [526, 144]], 0.3)} w={1.2} />
      <P d={s.curve([[470, 144], [498, 148], [526, 144]], 0.3)} w={1.1} />
      <P d={s.curve([[470, 120], [498, 123], [526, 120]], 0.2)} w={0.6} />
      <P d={s.curve([[470, 132], [498, 135], [526, 132]], 0.2)} w={0.6} />
      <P d={s.rect(492, 95, 12, 6, 0.2, 1)} w={0.9} />
      <P d={s.curve([[112, 146], [114, 139], [121, 137], [127, 140], [130, 146]], 0.2)} w={0.9} />
      <P d={s.curve([[127, 140], [131, 136], [134, 138]], 0.2)} w={0.8} />

      {/* Outer walls (left one has the door), floor slab, partition, ground */}
      <Section x={58} y={160} w={10} h={264} />
      <Section x={538} y={160} w={10} h={360} />
      <Section x={58} y={SLAB} w={490} h={10} />
      <Section x={432} y={306} w={6} h={126} />
      <Section x={40} y={FLOOR} w={526} h={8} />

      {/* Door, awning and an "open" sign */}
      <Wash d={quad([[68, 424], [94, 430], [94, 514], [68, 520]])} fill={c.sky} o={0.3} />
      <P d={s.poly([[68, 424], [94, 430], [94, 514], [68, 520]], true, 0.3)} w={1} />
      <P d={s.line(72, 440, 88, 446, 0.2, 1)} w={0.5} o={0.6} />
      <P d={s.line(88, 470, 88, 482, 0.2, 1)} w={1.4} />
      <Wash d={quad([[58, 400], [58, 412], [16, 424], [20, 412]])} fill={c.leafWash} o={0.75} />
      {[30, 44].map((x) => (
        <P key={x} d={s.line(x, 416 - (x - 16) * 0.28, x - 1, 424 - (x - 16) * 0.28, 0.2, 1)} w={0.6} />
      ))}
      <P d={s.poly([[58, 400], [20, 412], [16, 424], [58, 412]], false, 0.3)} w={1.1} />
      <P d={s.line(36, 424, 34, 436, 0.2, 1)} w={0.6} />
      <Occlude d={box(20, 436, 30, 14)} />
      <P d={s.rect(20, 436, 30, 14, 0.3)} w={0.9} />
      <text x="35" y="446.5" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={c.leafDeep} style={{ fontFamily: "var(--font-sans)" }}>
        {t.open}
      </text>
      {/* Plant by the door */}
      <Wash d="M22 506 h18 l-3 14 h-12 z" fill={c.clay} o={0.6} />
      <P d={s.poly([[22, 506], [40, 506], [37, 520], [25, 520]], true, 0.3)} w={1} />
      {[
        [[31, 506], [24, 494], [17, 488]],
        [[31, 506], [32, 490], [30, 480]],
        [[31, 506], [38, 494], [45, 490]],
      ].map((pts, i) => (
        <P key={i} d={s.curve(pts as [number, number][], 0.3)} w={0.9} c={c.leafDeep} />
      ))}

      {/* Oil shelf */}
      <Wash d={box(76, 372, 70, 148)} fill={c.clay} o={0.18} />
      <P d={s.rect(76, 372, 70, 148, 0.4)} w={1.1} />
      {[400, 440, 480].map((y) => (
        <P key={y} d={s.line(76, y, 146, y, 0.3)} w={1} />
      ))}
      {[82, 100, 118].map((x, i) => (
        <g key={x}>
          <Wash d={box(x, 380, 14, 19)} fill={[c.rice, c.marigold, c.rice][i]} o={0.75} />
          <P d={s.rect(x, 380, 14, 19, 0.2, 1)} w={0.7} />
        </g>
      ))}
      {[80, 96, 112, 128].map((x, i) => (
        <g key={x}>
          <Wash d={box(x, 456, 13, 23)} fill={[c.vermilion, c.marigold, c.vermilion, c.leafWash][i]} o={0.55} />
          <P d={s.rect(x, 456, 13, 23, 0.2, 1)} w={0.7} />
        </g>
      ))}
      {[82, 104, 126].map((x) => (
        <g key={x}>
          <Wash d={box(x, 496, 16, 23)} fill={c.sky} o={0.4} />
          <P d={s.rect(x, 496, 16, 23, 0.2, 1)} w={0.7} />
        </g>
      ))}
      <Occlude d={box(98, 440, 26, 9)} />
      <P d={s.rect(98, 440, 26, 9, 0.2, 1)} w={0.7} />
      <text x="111" y="447.3" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {t.oil}
      </text>

      {/* Rice and dal sacks */}
      {[
        [156, c.rice, t.rice],
        [182, c.marigold, t.dal],
      ].map(([x, fill, label]) => {
        const X = x as number;
        const sack = `M${X} 520 C${X - 3} 500 ${X} 484 ${X + 4} 478 L${X + 20} 478 C${X + 24} 484 ${X + 27} 500 ${X + 24} 520 Z`;
        return (
          <g key={X}>
            <Occlude d={sack} />
            <Wash d={sack} fill="#cdb58a" o={0.55} />
            <P d={s.curve([[X, 520], [X - 3, 500], [X, 484], [X + 4, 478], [X + 20, 478], [X + 24, 484], [X + 27, 500], [X + 24, 520]], 0.4)} w={1} />
            <Wash d={`M${X + 4} 480 C${X + 8} 472 ${X + 16} 472 ${X + 20} 480 Z`} fill={fill as string} o={0.85} />
            <P d={s.curve([[X + 4, 480], [X + 12, 473], [X + 20, 480]], 0.2)} w={0.7} />
            <text x={X + 12} y="504" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={c.ink} fillOpacity="0.7" style={{ fontFamily: "var(--font-sans)" }}>
              {label as string}
            </text>
          </g>
        );
      })}

      {/* Fridge */}
      <Wash d={box(210, 362, 48, 158)} fill={c.sky} o={0.18} />
      <P d={s.rect(210, 362, 48, 158, 0.4)} w={1.1} />
      <P d={s.rect(214, 376, 40, 110, 0.3, 1)} w={0.8} />
      {[404, 432, 460].map((y) => (
        <P key={y} d={s.line(215, y, 253, y, 0.2, 1)} w={0.6} />
      ))}
      {[218, 230, 242].map((x) => (
        <g key={x}>
          <P d={s.rect(x, 386, 9, 17, 0.2, 1)} w={0.6} />
          <Wash d={box(x, 390, 9, 4)} fill={c.sky} o={0.6} />
        </g>
      ))}
      {[218, 226, 234, 242].map((x) => (
        <P key={x} d={s.ellipse(x + 3, 427, 3.2, 3.9, 0.1)} w={0.6} />
      ))}
      {[218, 236].map((x) => (
        <g key={x}>
          <Wash d={box(x, 440, 14, 19)} fill={c.leafWash} o={0.45} />
          <P d={s.rect(x, 440, 14, 19, 0.2, 1)} w={0.6} />
        </g>
      ))}
      <Wash d={box(210, 362, 48, 11)} fill={c.sky} o={0.45} />
      <text x="234" y="370.5" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {t.milk}
      </text>
      <P d={s.line(250, 400, 250, 420, 0.2, 1)} w={1.4} />

      {/* Stockroom: shelf, terminal, cartons */}
      <P d={s.line(444, 390, 476, 390, 0.3)} w={0.9} />
      <P d={s.line(444, 420, 476, 420, 0.3)} w={0.9} />
      {[446, 458].map((x) => (
        <g key={x}>
          <Wash d={box(x, 404, 10, 15)} fill={c.clay} o={0.45} />
          <P d={s.rect(x, 404, 10, 15, 0.2, 1)} w={0.6} />
        </g>
      ))}
      <Wash d={box(448, 342, 24, 18)} fill={c.leafDeep} o={0.85} />
      <P d={s.rect(448, 342, 24, 18, 0.2)} w={0.9} />
      {[
        [486, 496],
        [510, 496],
        [486, 472],
        [510, 472],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <Wash d={box(x, y, 24, 24)} fill={c.clay} o={0.5} />
          <P d={s.rect(x, y, 24, 24, 0.3, 1)} w={0.9} />
          <P d={s.line(x + 12, y, x + 12, y + 8, 0.1, 1)} w={0.6} />
        </g>
      ))}

      {/* Manager's cabin: wall screen frame, clock, chair, window, plant */}
      <P d={s.rect(82, 174, 184, 104, 0.4)} w={1.2} />
      <P d={s.line(160, 278, 158, 286, 0.2, 1)} w={0.9} />
      <P d={s.line(188, 278, 190, 286, 0.2, 1)} w={0.9} />
      <Occlude d={s.ellipse(292, 192, 10, 10, 0)} />
      <P d={s.ellipse(292, 192, 10, 10, 0.2)} w={1} />
      <path d="M292 192 v-6" stroke={c.ink} strokeWidth="1" strokeLinecap="round" />
      <Wash d={box(384, 232, 12, 32)} fill={c.clay} o={0.45} />
      <P d={s.rect(384, 232, 12, 32, 0.2)} w={0.9} />
      <Wash d={box(436, 186, 84, 58)} fill={c.sky} o={0.32} />
      <P d={s.rect(436, 186, 84, 58, 0.4)} w={1.1} />
      {[450, 464, 478, 492, 506].map((x) => (
        <P key={x} d={s.line(x, 187, x, 243, 0.2, 1)} w={0.5} o={0.6} />
      ))}
      <P d={s.curve([[442, 242], [456, 222], [472, 228], [486, 214], [512, 226], [518, 242]], 0.4)} w={0.7} c={c.leafDeep} o={0.6} />
      <Wash d="M516 278 h20 l-3 18 h-14 z" fill={c.clay} o={0.6} />
      <P d={s.poly([[516, 278], [536, 278], [533, 296], [519, 296]], true, 0.3)} w={0.9} />
      {[
        [[526, 278], [516, 262], [512, 252]],
        [[526, 278], [528, 258], [524, 246]],
        [[526, 278], [534, 264], [536, 256]],
      ].map((pts, i) => (
        <P key={i} d={s.curve(pts as [number, number][], 0.3)} w={0.9} c={c.leafDeep} />
      ))}

      {/* Street */}
      <P d={s.line(10, 546, 590, 546, 0.5, 1)} w={0.6} o={0.35} />
      {[60, 180, 300, 420, 540].map((x) => (
        <P key={x} d={s.line(x - 20, 538, x + 20, 538, 0.3, 1)} w={0.6} o={0.4} />
      ))}
    </g>
  );
}

function Counter({ x, w }: { x: number; w: number }) {
  const s = new Sketch(x);
  return (
    <g>
      <Occlude d={box(x - 4, 449, w + 8, 71)} />
      <Wash d={box(x, 456, w, 64)} fill={c.clay} o={0.4} />
      <P d={s.hatch(x + 2, 460, w - 4, 58, 7, 0.3)} w={0.4} o={0.4} />
      <P d={s.rect(x, 456, w, 64, 0.4)} w={1.1} />
      <Wash d={box(x - 4, 449, w + 8, 8)} fill={c.clay} o={0.75} />
      <P d={s.rect(x - 4, 449, w + 8, 8, 0.3)} w={1} />
    </g>
  );
}

export function SupershopCutaway() {
  const { t, locale } = useI18n();
  const m = t.supershop.heroCutaway;
  const reduce = useReducedMotion();

  const [total, setTotal] = useState(186400);
  const [bills, setBills] = useState(642);
  const [bars, setBars] = useState([30, 44, 38, 52, 60, 46]);
  const [stockCount, setStockCount] = useState(1280);
  const [items1, setItems1] = useState(false);
  const [items2, setItems2] = useState(false);
  const [scan1, setScan1] = useState(0);
  const [scan2, setScan2] = useState(0);
  const [receipt, setReceipt] = useState(0);
  const [bottles, setBottles] = useState(5);
  const [shelf, setShelf] = useState<"ok" | "low" | "restocked">("ok");
  const [alert, setAlert] = useState<"low" | "restocked" | null>(null);
  const [boy, setBoy] = useState<"idle" | "out" | "back">("idle");
  const [carry, setCarry] = useState(false);
  const [cartonGone, setCartonGone] = useState(false);
  const [sip, setSip] = useState(0);
  const [van, setVan] = useState(0);
  const [flash, setFlash] = useState(0);
  const [chips, setChips] = useState<{ id: number; x: number; amount: number }[]>([]);
  const [glow, setGlow] = useState<Partial<Record<Vein, "ok" | "warn">>>({});
  const [zone, setZone] = useState<Zone | null>(null);
  const anims = useRef<Partial<Record<DropId, SVGAnimationElement[]>>>({});

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const fire = (id: DropId) => {
      const d = drops.find((x) => x.id === id)!;
      anims.current[id]?.forEach((a) => a.beginElement());
      setGlow((g) => ({ ...g, [d.vein]: d.warn ? "warn" : "ok" }));
      at(1300, () => setGlow((g) => ({ ...g, [d.vein]: undefined })));
    };
    const sale = (amount: number, x: number) => {
      const id = Date.now();
      setChips((cs) => [...cs, { id, x, amount }]);
      at(1800, () => setChips((cs) => cs.filter((ch) => ch.id !== id)));
      at(1200, () => {
        setTotal((v) => v + amount);
        setBills((v) => v + 1);
        setBars((b) => [...b.slice(0, 5), Math.min(b[5] + 7, 70)]);
        setFlash((f) => f + 1);
      });
    };
    const run = () => {
      // A customer pays at counter 1; the sale runs up the wall to the manager's screen
      at(0, () => setItems1(true));
      at(500, () => setScan1((k) => k + 1));
      at(2000, () => {
        fire("c1");
        sale(840, 296);
        setReceipt((r) => r + 1);
      });
      at(3300, () => setItems1(false));
      // The oil shelf runs low: the shelf tells the screen, the screen calls the stockroom
      at(4200, () => setBottles(4));
      at(4700, () => setBottles(3));
      at(5200, () => setBottles(2));
      at(5300, () => {
        setShelf("low");
        fire("shelfWarn");
      });
      at(6500, () => {
        setAlert("low");
        fire("stockWarn");
      });
      // The stock boy carries a carton across and refills the shelf
      at(7800, () => {
        setCartonGone(true);
        setCarry(true);
        setBoy("out");
      });
      at(9000, () => fire("fridge"));
      at(10600, () => {
        setBottles(5);
        setCarry(false);
        setShelf("restocked");
        setStockCount((n) => n - 12);
        setBoy("back");
        fire("shelf");
      });
      at(11800, () => setAlert("restocked"));
      // Counter 2 rings up a sale; the manager sips his tea; a van leaves for another branch
      at(11400, () => setItems2(true));
      at(11700, () => setScan2((k) => k + 1));
      at(12900, () => {
        fire("c2");
        sale(385, 370);
        setVan((v) => v + 1);
      });
      at(13400, () => {
        setBoy("idle");
        setSip((v) => v + 1);
      });
      at(14200, () => setItems2(false));
      at(15000, () => {
        setShelf("ok");
        setAlert(null);
      });
      at(15600, () => setCartonGone(false));
    };
    let loop = 0;
    const start = window.setTimeout(() => {
      run();
      loop = window.setInterval(run, 17000);
    }, 1600);
    return () => {
      clearTimeout(start);
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const active = zone ? zones.find((z) => z.key === zone)! : null;
  const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const scanArm = (k: number, sx: number) =>
    k && !reduce ? { cx: [-18, sx, sx + 7, sx, sx + 7, sx, -18], cy: [-50, -61, -63, -61, -63, -61, -50] } : { cx: -18, cy: -50 };
  const bottleX = [82, 94, 106, 118, 130];
  const ink = new Sketch(7781);

  return (
    <div className="relative">
      <span className="absolute top-1 right-1 z-10 rounded-full bg-marigold-soft px-2 py-0.5 text-[0.65rem] font-semibold text-[#6b4a07]">{t.common.sampleData}</span>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full text-ink" role="img" aria-label={m.alt}>
        <defs>
          <clipPath id="hk-cut-cabin">
            <rect x="68" y="160" width="470" height="136" />
          </clipPath>
        </defs>

        <motion.g initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Building t={m} />
        </motion.g>

        {/* Veins in the walls */}
        {(Object.keys(veins) as Vein[]).map((v, i) => {
          const g = glow[v] ?? (active?.veins.includes(v) || reduce ? "ok" : undefined);
          const col = g === "warn" ? c.vermilion : "var(--color-leaf-glow)";
          return (
            <g key={v}>
              <path d={veins[v]} fill="none" stroke={col} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity={g ? 0.32 : 0} style={{ transition: "opacity 0.35s" }} />
              <motion.path
                d={veins[v]}
                fill="none"
                stroke="var(--color-leaf)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={g ? 0.95 : 0.55}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.9 + i * 0.1 }}
              />
              <path d={veins[v]} fill="none" stroke="var(--color-cream)" strokeWidth="1" strokeDasharray="2 12" className="hk-flow" opacity={g ? 1 : 0} />
            </g>
          );
        })}
        {drops.map((d) => (
          <circle key={d.id} r="4" fill={d.warn ? c.vermilion : "var(--color-leaf)"} stroke="var(--color-cream)" strokeWidth="1.6" opacity="0">
            <animateMotion
              ref={(el) => {
                if (el) (anims.current[d.id] ??= [])[0] = el as SVGAnimationElement;
              }}
              dur="1.2s"
              begin="indefinite"
              fill="remove"
              path={veins[d.vein]}
              calcMode="spline"
              keyPoints={d.reverse ? "1;0" : "0;1"}
              keyTimes="0;1"
              keySplines="0.45 0 0.35 1"
            />
            <animate
              ref={(el) => {
                if (el) (anims.current[d.id] ??= [])[1] = el as SVGAnimationElement;
              }}
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="1.2s"
              begin="indefinite"
              fill="remove"
            />
          </circle>
        ))}

        {/* Manager's wall screen: the HelloKhata dashboard */}
        <g style={{ fontFamily: "var(--font-sans)" }}>
          <rect x="87" y="179" width="174" height="94" rx="2" fill="var(--color-forest-2)" fillOpacity="0.92" />
          <motion.rect key={`flash-${flash}`} x="87" y="179" width="174" height="94" rx="2" fill="var(--color-leaf-glow)" initial={{ opacity: flash ? 0.25 : 0 }} animate={{ opacity: 0 }} transition={{ duration: 0.8 }} />
          <circle cx="98" cy="193" r="2.2" fill="var(--color-leaf-glow)" className={reduce ? undefined : "animate-pulse"} />
          <text x="105" y="196.5" fontSize="10" fill="var(--color-cream)" fillOpacity="0.75">
            {m.today}
          </text>
          <text x="97" y="222" fontSize="21" fontWeight="700" fill="var(--color-cream)" style={{ fontFamily: "var(--font-manrope)" }}>
            {fmtTaka(total, locale)}
          </text>
          <text x="97" y="238" fontSize="10" fill="var(--color-leaf-glow)">
            {interpolate(m.bills, { n: fmtNumber(bills, locale) })}
          </text>
          {bars.map((h, i) => (
            <motion.rect key={i} x={204 + i * 9} width="6" rx="1" fill={i === 5 ? "var(--color-leaf-glow)" : "var(--color-cream)"} fillOpacity={i === 5 ? 1 : 0.3} initial={false} animate={{ y: 240 - h * 0.7, height: h * 0.7 }} transition={{ type: "spring", stiffness: 160, damping: 18 }} />
          ))}
          <rect x="94" y="249" width="160" height="17" rx="8.5" fill={alert === "low" ? c.vermilion : alert === "restocked" ? c.leaf : "#ffffff"} fillOpacity={alert ? 0.9 : 0.08} style={{ transition: "fill 0.3s, fill-opacity 0.3s" }} />
          <text x="174" y="261" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--color-cream)">
            {alert === "low" ? `! ${m.lowStock}` : alert === "restocked" ? `✓ ${m.restocked}` : interpolate(m.shift, { on: fmtNumber(12, locale), all: fmtNumber(18, locale) })}
          </text>
        </g>

        {/* Oil bottles: they run out, and come back */}
        <AnimatePresence>
          {bottleX.slice(0, bottles).map((x) => (
            <motion.g key={x} initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4, scale: 0.8 }} transition={{ duration: 0.35 }}>
              <path d={`M${x} 439 v-18 q0 -4 3 -5 v-4 h3 v4 q3 1 3 5 v18 z`} fill={c.marigold} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.7" strokeLinejoin="round" />
              <path d={box(x + 3, 410, 3, 2.5)} fill={c.vermilion} fillOpacity="0.8" />
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Stock terminal screen and count */}
        <motion.rect x="451" y="345" width="18" height="12" rx="1" animate={alert === "low" && !reduce ? { opacity: [0.3, 1, 0.3], fill: c.vermilion } : { opacity: 0.6, fill: "#4ade80" }} transition={alert === "low" ? { duration: 0.7, repeat: Infinity } : { duration: 0.3 }} />
        <text x="460" y="374" textAnchor="middle" fontSize="8" fontWeight="600" fill={c.ink} fillOpacity="0.7" style={{ fontFamily: "var(--font-manrope)" }}>
          {fmtNumber(stockCount, locale)}
        </text>
        <AnimatePresence>
          {!cartonGone && (
            <motion.g initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <path d={box(498, 448, 24, 24)} fill="var(--color-paper)" />
              <path d={box(498, 448, 24, 24)} fill={c.clay} fillOpacity="0.5" />
              <path d={ink.rect(498, 448, 24, 24, 0.3, 1)} fill="none" stroke={c.ink} strokeWidth="0.9" />
              <path d={ink.line(510, 448, 510, 456, 0.1, 1)} fill="none" stroke={c.ink} strokeWidth="0.6" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Wall AC and fridge light */}
        <AirCon x={298} y={312} />
        <rect x="214" y="376" width="40" height="110" fill="#fff4c2" className="hk-flicker" />

        {/* Shopper at the oil shelf */}
        <g transform="translate(168 520) scale(1.28)">
          <Person seed={41} shirt={c.vermilion} pants={c.vermilion} hair="bun" look={-1}>
            <path d="M14 -38 l-6 12 h14 l-2 -12 z" fill={c.marigold} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
          </Person>
        </g>

        {/* Cashiers behind the counters */}
        <g transform="translate(316 520) scale(1.25)">
          <Person seed={42} shirt={c.leafWash} look={-1} arms={false}>
            <path d="M10 -56 C14 -48 14 -42 12 -36" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <motion.circle key={`s1-${scan1}`} r="2.6" fill={skin} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.8" initial={false} animate={scanArm(scan1, -17)} transition={{ duration: 1.4, ease: "easeInOut" }} />
          </Person>
        </g>
        <g transform="translate(390 520) scale(1.25)">
          <Person seed={43} shirt={c.leafWash} hair="hijab" look={-1} arms={false}>
            <path d="M10 -56 C14 -48 14 -42 12 -36" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <motion.circle key={`s2-${scan2}`} r="2.6" fill={skin} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.8" initial={false} animate={scanArm(scan2, -16)} transition={{ duration: 1.4, ease: "easeInOut" }} />
          </Person>
        </g>
        <g filter="url(#hk-wobble)">
          <Counter x={274} w={68} />
          <Counter x={356} w={68} />
          {/* Scanners, printer, POS screen */}
          <Wash d={box(290, 440, 12, 9)} fill={c.ink} o={0.6} />
          <P d={ink.rect(290, 440, 12, 9, 0.2, 1)} w={0.8} />
          <Wash d={box(364, 440, 12, 9)} fill={c.ink} o={0.6} />
          <P d={ink.rect(364, 440, 12, 9, 0.2, 1)} w={0.8} />
          <Occlude d={box(326, 440, 14, 9)} />
          <P d={ink.rect(326, 440, 14, 9, 0.2, 1)} w={0.8} />
          <P d={ink.line(418, 449, 418, 441, 0.1, 1)} w={1.1} />
          <Wash d={box(408, 425, 20, 16)} fill={c.leafDeep} o={0.85} />
          <P d={ink.rect(408, 425, 20, 16, 0.2)} w={0.9} />
        </g>
        <rect x="411" y="428" width="14" height="10" rx="1" fill="var(--color-leaf-glow)" fillOpacity="0.5" />
        {[scan1, scan2].map((k, i) =>
          k && !reduce ? (
            <g key={`beep-${i}-${k}`}>
              {[0, 1, 2].map((r) => (
                <motion.path
                  key={r}
                  d={`M${(i ? 370 : 296) - 8} 436 q8 -7 16 0`}
                  fill="none"
                  stroke={c.vermilion}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -8 }}
                  transition={{ duration: 0.5, delay: 0.35 + r * 0.4 }}
                />
              ))}
            </g>
          ) : null,
        )}
        <motion.path key={`receipt-${receipt}`} d="M329 440 h8 v-16 l-2 -2 l-2 2 l-2 -2 l-2 2 z" fill="var(--color-cream)" stroke={c.ink} strokeWidth="0.6" initial={{ scaleY: 0, opacity: 1 }} animate={receipt && !reduce ? { scaleY: [0, 1, 1], opacity: [1, 1, 0] } : { scaleY: 0 }} transition={{ duration: 1.6, times: [0, 0.4, 1] }} style={{ originX: 0.5, originY: 1 }} />
        <AnimatePresence>
          {items1 && (
            <motion.g key="i1" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.35 }}>
              <path d="M276 449 v-13 q0 -3 2 -3 v-3 h3 v3 q2 0 2 3 v13 z" fill={c.marigold} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.7" />
              <path d={box(284.5, 438, 5, 11)} fill={c.vermilion} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
            </motion.g>
          )}
          {items2 && (
            <motion.g key="i2" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.35 }}>
              <path d={box(354, 440, 8, 9)} fill={c.leafWash} fillOpacity="0.55" stroke={c.ink} strokeWidth="0.7" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Customer at counter 1 */}
        <g transform="translate(260 520) scale(1.3)">
          <Person seed={44} shirt={c.sky} look={1}>
            <path d="M-14 -38 l-6 12 h14 l-2 -12 z" fill={c.marigold} fillOpacity="0.4" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
          </Person>
        </g>

        {/* Stock boy: walks a carton across the shop */}
        <motion.g initial={false} animate={{ x: boy === "out" ? BOY_WALK : 0 }} transition={{ duration: 2.8, ease: "linear" }}>
          <g transform={`translate(${BOY_X} 520) scale(1.22)`}>
            <Person seed={45} shirt={c.marigold} hair="cap" look={boy === "back" ? 1 : -1} walking={boy !== "idle"} pace={0.62} arms={!carry}>
              {carry && (
                <g>
                  <path d={box(-14, -56, 22, 18)} fill="var(--color-paper)" />
                  <path d={box(-14, -56, 22, 18)} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.8" />
                  <path d="M-3 -56 v6" stroke={c.ink} strokeWidth="0.5" />
                  <path d="M-10 -56 L-12 -48 M10 -56 L8 -48" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                </g>
              )}
            </Person>
          </g>
        </motion.g>

        {/* Manager: watches the screen, sips tea, nods */}
        <g clipPath="url(#hk-cut-cabin)">
          <motion.g key={`sip-${sip}`} initial={false} animate={sip && !reduce ? { rotate: [0, 0, 4, -2, 0] } : { rotate: 0 }} transition={{ duration: 2.6, times: [0, 0.55, 0.7, 0.85, 1] }} style={{ originX: 0.5, originY: 1 }}>
            <g transform="translate(372 303)">
              <Person seed={46} shirt={c.cream} pants={c.ink} look={-1} arms={false}>
                <circle cx="-4.3" cy="-74" r="2.9" fill="none" stroke={c.ink} strokeWidth="0.7" />
                <circle cx="2.9" cy="-74" r="2.9" fill="none" stroke={c.ink} strokeWidth="0.7" />
                <path d="M-1.4 -74 h1.4" stroke={c.ink} strokeWidth="0.7" />
              </Person>
            </g>
          </motion.g>
          {/* Desk with laptop and tea */}
          <g filter="url(#hk-wobble)">
            <Occlude d={box(296, 254, 108, 42)} />
            <Wash d={box(302, 260, 96, 36)} fill={c.clay} o={0.4} />
            <P d={ink.rect(302, 260, 96, 36, 0.3)} w={1} />
            <Wash d={box(296, 254, 108, 6)} fill={c.clay} o={0.75} />
            <P d={ink.rect(296, 254, 108, 6, 0.2)} w={1} />
            <Wash d={quad([[308, 254], [304, 232], [308, 231], [313, 254]])} fill={c.sky} o={0.4} />
            <P d={ink.poly([[308, 254], [304, 232], [308, 231], [313, 254]], true, 0.2, 1)} w={0.8} />
            <P d={ink.line(306, 254, 334, 254, 0.2, 1)} w={1.4} />
          </g>
          <motion.g key={`cup-${sip}`} initial={false} animate={sip && !reduce ? { x: [0, 18, 18, 18, 0], y: [0, -14, -14, -14, 0] } : { x: 0, y: 0 }} transition={{ duration: 2.6, times: [0, 0.25, 0.4, 0.5, 0.75], ease: "easeInOut" }}>
            <path d="M344 244 h9 l-1 10 h-7 z" fill="var(--color-cream)" stroke={c.ink} strokeWidth="0.8" />
            <path d="M353 246 q4 1 0 5" fill="none" stroke={c.ink} strokeWidth="0.7" />
            {!reduce && <path d="M347 240 q-2 -4 1 -8 M350 240 q2 -4 -1 -9" fill="none" stroke={c.ink} strokeOpacity="0.4" strokeWidth="0.7" className="hk-steam" />}
          </motion.g>
        </g>
        <path d="M292 192 l4 3" stroke={c.vermilion} strokeWidth="0.9" strokeLinecap="round" className="hk-clock" />

        {/* Delivery van leaving for another branch */}
        <motion.g key={`van-${van}`} initial={{ x: -90 }} animate={van && !reduce ? { x: 700 } : { x: -90 }} transition={{ duration: 5, ease: "easeInOut" }}>
          <path d={box(0, 528, 38, 18)} fill="var(--color-cream)" stroke={c.ink} strokeWidth="0.9" />
          <path d="M38 532 h10 l5 7 v7 h-15 z" fill={c.leafWash} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.9" strokeLinejoin="round" />
          <path d={box(4, 534, 26, 6)} fill={c.leaf} fillOpacity="0.45" />
          <circle cx="10" cy="547" r="3.6" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.2" />
          <circle cx="44" cy="547" r="3.6" fill="var(--color-paper)" stroke={c.ink} strokeWidth="1.2" />
        </motion.g>

        {/* Hit areas */}
        {zones.map((z) => (
          <rect
            key={z.key}
            x={z.rect[0]}
            y={z.rect[1]}
            width={z.rect[2]}
            height={z.rect[3]}
            fill="transparent"
            tabIndex={0}
            role="button"
            aria-label={m.zones[z.key].title}
            className="cursor-pointer outline-none"
            onPointerEnter={(e) => e.pointerType === "mouse" && setZone(z.key)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setZone(null)}
            onClick={() => setZone(z.key)}
            onFocus={() => setZone(z.key)}
            onBlur={() => setZone(null)}
          />
        ))}
      </svg>

      {/* Sale chips over the counters */}
      <AnimatePresence>
        {chips.map((ch) => (
          <motion.span
            key={ch.id}
            className="font-latin pointer-events-none absolute -translate-x-1/2 rounded-full bg-leaf px-1.5 py-0.5 text-[0.62rem] font-bold whitespace-nowrap text-white shadow sm:text-xs"
            style={pct(ch.x, 404)}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            +{fmtTaka(ch.amount, locale)}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Shelf tag */}
      <AnimatePresence>
        {shelf !== "ok" && (
          <motion.span
            key={shelf}
            className={`pointer-events-none absolute -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold whitespace-nowrap text-white shadow sm:text-[0.68rem] ${shelf === "low" ? "bg-vermilion" : "bg-leaf"}`}
            style={pct(111, 346)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
          >
            {shelf === "low" ? `! ${m.lowStock}` : `✓ ${m.restocked}`}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Zone card */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.key}
            className="pointer-events-none absolute z-20 w-max max-w-[13rem] -translate-x-1/2 -translate-y-full rounded-xl bg-white/95 px-3 py-2 text-left shadow-[var(--shadow-float)] ring-1 ring-ink/10 backdrop-blur"
            style={{ left: `clamp(6.6rem, ${(active.tip[0] / W) * 100}%, calc(100% - 6.6rem))`, top: `${(active.tip[1] / H) * 100}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-bold text-ink">{m.zones[active.key].title}</p>
            <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">
              {interpolate(m.zones[active.key].body, { n: fmtNumber(active.key === "stock" ? stockCount : bills, locale) })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
