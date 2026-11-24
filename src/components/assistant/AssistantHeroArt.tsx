"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber, fmtPercent, fmtTaka, interpolate } from "@/lib/format";
import { today, weekSales } from "@/content/demo-data";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { MicIcon } from "@/components/home/HeroStage";
import { AssistantPhone, FitBox, type ChatMsg } from "./AssistantPhone";

/**
 * Assistant hero: the khata coming alive. An open paper khata lies on the shop counter, its handwritten entries
 * writing themselves in; ink lifts off the page into the HelloKhata assistant on a phone; the shopkeeper asks out
 * loud how much he sold today, a waveform answers his voice, the assistant replies with today's total, and the total
 * lands back on the khata's page and on a paper tag. Then the mic is the visitor's: tapping it asks again.
 *
 * Two arrangements of the same drawing: wide (beside the headline) and tall (phones, where the paper tag and the
 * handwritten label under the mic are left out for room). Sample data only; the mic is a demonstration and never records.
 */

type Phase = "draw" | "ready" | "listening" | "thinking" | "answered";
const pct = Math.round(((today.sales - weekSales[5]) / weekSales[5]) * 100);

/** Where things sit in each arrangement (design units; FitBox scales the whole thing to its column). */
const LAYOUT = {
  wide: {
    w: 620,
    h: 640,
    phone: { x: 352, y: 34 },
    mic: { x: 396, y: 592, label: "right" },
    ledger: { dx: 0, dy: 0 },
    counter: 440,
    tag: { x: 40, y: 236 },
    shelf: true,
    ink: ["M150 420 C 200 340, 270 300, 372 300", "M262 414 C 300 380, 330 360, 372 350", "M110 446 C 150 330, 240 250, 372 250"],
  },
  tall: {
    w: 360,
    h: 730,
    phone: { x: 70, y: 0 },
    mic: { x: 70, y: 432, label: "none" },
    ledger: { dx: -8, dy: 176 },
    counter: 600,
    tag: null,
    shelf: false,
    ink: ["M150 596 C 170 540, 190 500, 200 470", "M250 590 C 250 540, 240 500, 236 470", "M100 622 C 120 540, 150 500, 166 470"],
  },
} as const;
type Layout = keyof typeof LAYOUT;

/** The open khata in wide coordinates (pages from x 30 to 340, y 384 to 532). */
function Khata({ lines, total, written, showTotal, reduce }: { lines: string[]; total: string; written: number; showTotal: boolean; reduce: boolean }) {
  const s = new Sketch(9021);
  const left = "M30 392 L185 384 L188 520 L34 532 Z";
  const right = "M185 384 L340 392 L336 532 L188 520 Z";
  const spots = [
    [64, 414],
    [64, 436],
    [64, 458],
    [214, 414],
    [214, 436],
  ];
  return (
    <g>
      <g filter="url(#hk-wobble)">
        {/* Cloth cover peeking out under the pages */}
        <Wash d="M22 396 L185 378 L348 396 L344 540 L188 528 L26 542 Z" fill={c.vermilion} o={0.7} />
        <P d={s.poly([[22, 396], [185, 378], [348, 396], [344, 540], [188, 528], [26, 542]], true, 0.4)} w={1.1} />
        <Occlude d={left} />
        <Occlude d={right} />
        <Wash d={left} fill={c.rice} o={0.45} />
        <Wash d={right} fill={c.rice} o={0.35} />
        <P d={s.poly([[30, 392], [185, 384], [188, 520], [34, 532]], true, 0.3)} w={1} />
        <P d={s.poly([[185, 384], [340, 392], [336, 532], [188, 520]], true, 0.3)} w={1} />
        <P d={s.line(185, 384, 188, 520, 0.2)} w={1.3} />
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <P d={s.line(36, 404 + i * 15, 182, 398 + i * 15, 0.15, 1)} w={0.4} o={0.45} c={c.sky} />
            <P d={s.line(191, 398 + i * 15, 336, 404 + i * 15, 0.15, 1)} w={0.4} o={0.45} c={c.sky} />
          </g>
        ))}
        <P d={s.line(58, 388, 60, 528, 0.2, 1)} w={0.6} c={c.vermilion} o={0.7} />
        <P d={s.line(208, 386, 208, 520, 0.2, 1)} w={0.6} c={c.vermilion} o={0.7} />
      </g>
      {/* Handwritten entries write themselves in, one by one */}
      {lines.map((line, i) => {
        const [x, y] = spots[i];
        return (
          <g key={i}>
            <clipPath id={`hk-khata-line-${i}`}>
              <motion.rect x={x - 2} y={y - 14} height="20" initial={reduce ? false : { width: 0 }} animate={{ width: i < written ? 130 : 0 }} transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }} />
            </clipPath>
            <text x={x} y={y} fontSize="12.5" fill={c.ink} fillOpacity="0.82" className="font-hand" clipPath={`url(#hk-khata-line-${i})`} transform={`rotate(${i < 3 ? -2.5 : 2.5} ${x} ${y})`}>
              {line}
            </text>
          </g>
        );
      })}
      {/* The answer comes back to paper: the day's total, underlined twice */}
      <clipPath id="hk-khata-total">
        <motion.rect x="212" y="474" height="26" initial={reduce ? false : { width: 0 }} animate={{ width: showTotal ? 130 : 0 }} transition={{ duration: reduce ? 0 : 0.8, ease: "easeOut" }} />
      </clipPath>
      <g clipPath="url(#hk-khata-total)" transform="rotate(2.5 214 492)">
        <text x="214" y="492" fontSize="14" fontWeight="700" fill={c.leafDeep} className="font-hand">
          {total}
        </text>
        <path d="M212 497 q50 -3 110 1 M214 501 q48 -2 104 1" fill="none" stroke={c.leafDeep} strokeWidth="1" strokeLinecap="round" />
      </g>
      {/* A pen left on the page */}
      <g filter="url(#hk-wobble)">
        <path d="M262 478 L330 452" stroke={c.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M262 478 L270 475" stroke={c.marigold} strokeWidth="5" strokeLinecap="round" />
        <path d="M322 455 L330 452" stroke={c.vermilion} strokeWidth="5" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Shelf() {
  const s = new Sketch(9033);
  return (
    <g filter="url(#hk-wobble)" opacity="0.5">
      {[110, 196].map((y, r) => (
        <g key={y}>
          <P d={s.line(20, y, 320, y, 0.4)} w={1.4} />
          {Array.from({ length: 8 }, (_, i) => {
            const x = 32 + i * 36;
            const h = 30 + ((i + r) % 3) * 6;
            const fill = [c.marigold, c.rice, c.leafWash, c.clay, c.vermilion][(i + r * 2) % 5];
            return (
              <g key={i}>
                <Wash d={box(x, y - h, 24, h)} fill={fill} o={0.5} />
                <P d={s.rect(x, y - h, 24, h, 0.3, 1)} w={0.7} />
                <path d={box(x + 3, y - h - 4, 18, 4)} fill={c.ink} fillOpacity="0.4" />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}

function Counter({ y, w }: { y: number; w: number }) {
  const s = new Sketch(9047);
  return (
    <g filter="url(#hk-wobble)">
      <Wash d={box(0, y, w, 600)} fill={c.clay} o={0.28} />
      <P d={s.line(0, y, w, y, 0.5)} w={1.4} />
      {[0.22, 0.5, 0.78].map((f) => (
        <P key={f} d={s.line(0, y + 40 + f * 90, w, y + 44 + f * 90, 0.6, 1)} w={0.5} o={0.35} />
      ))}
    </g>
  );
}

function Composition({ layout, phase, msgs, written, onMic, reduce }: { layout: Layout; phase: Phase; msgs: ChatMsg[]; written: number; onMic: () => void; reduce: boolean }) {
  const { t, locale } = useI18n();
  const m = t.features.assistantPage.hero;
  const L = LAYOUT[layout];
  const listening = phase === "listening";
  const answered = phase === "answered";
  const flowing = phase === "listening" || phase === "thinking";
  const max = Math.max(...weekSales);
  return (
    <FitBox w={L.w} h={L.h}>
      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="absolute inset-0 h-full w-full overflow-visible text-ink" role="img" aria-label={m.alt}>
        {L.shelf && <Shelf />}
        <Counter y={L.counter} w={L.w} />
        <g transform={`translate(${L.ledger.dx} ${L.ledger.dy})`}>
          <Khata lines={m.ledger} total={interpolate(m.ledgerTotal, { total: fmtNumber(today.sales, locale) })} written={written} showTotal={answered} reduce={reduce} />
        </g>
        {/* A glass of tea on the counter */}
        <g filter="url(#hk-wobble)" transform={layout === "wide" ? "translate(312 548)" : "translate(300 690)"}>
          <path d="M-11 -26 L-8 0 H8 L11 -26 Z" fill={c.cream} />
          <Wash d="M-10 -18 L-8 0 H8 L10 -18 Z" fill={c.clay} o={0.75} />
          <path d="M-11 -26 L-8 0 H8 L11 -26 Z" fill="none" stroke={c.ink} strokeWidth="1" strokeLinejoin="round" />
          {!reduce && <path d="M-3 -32 q-3 -6 0 -10 q3 -4 0 -9 M4 -31 q-3 -5 0 -9" fill="none" stroke={c.ink} strokeOpacity="0.35" strokeWidth="0.8" strokeLinecap="round" className="hk-steam" />}
        </g>
        {/* Ink lifts off the page into the assistant */}
        {L.ink.map((d, i) => (
          <g key={i}>
            <motion.path d={d} fill="none" stroke={c.leafDeep} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 5" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: phase === "draw" ? 0 : 1, opacity: phase === "draw" ? 0 : 0.55 }} transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : i * 0.15, ease: "easeInOut" }} />
            {flowing && !reduce && (
              <circle r="2.6" fill={c.leaf}>
                <animateMotion dur="1.4s" repeatCount="indefinite" path={d} begin={`${i * 0.3}s`} />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* The assistant, rising out of the drawing */}
      <motion.div className="absolute" style={{ left: L.phone.x, top: L.phone.y }} initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: phase === "draw" ? 0 : 1, y: phase === "draw" ? 40 : 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <AssistantPhone msgs={msgs} typing={phase === "thinking"} listening={listening} reduce={reduce} onMic={onMic} />
      </motion.div>

      {/* The big mic: rings answer the voice; tap it to ask again */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: L.mic.x, top: L.mic.y }}>
        {listening && !reduce && [0, 1, 2].map((i) => <span key={i} className="absolute inset-0 rounded-full border-2 border-leaf/60 hk-ring" style={{ animationDelay: `${i * 0.45}s` }} aria-hidden="true" />)}
        <button type="button" onClick={onMic} aria-label={m.replay} className={`relative flex size-[76px] items-center justify-center rounded-full text-white shadow-[var(--shadow-float)] ring-4 ring-paper transition-colors ${listening ? "bg-vermilion" : "bg-leaf hover:bg-leaf-deep"}`}>
          <MicIcon className="size-8" />
        </button>
        {L.mic.label === "right" && <p className="font-hand absolute top-1/2 left-full ml-4 -translate-y-1/2 text-lg whitespace-nowrap text-leaf-deep">{m.replay}</p>}
      </div>

      {/* Today's total, on a paper tag */}
      <AnimatePresence>
        {answered && L.tag && (
          <motion.div
            key="tag"
            className="absolute w-[150px] rotate-[-4deg] rounded-xl bg-cream px-3 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-ink/10"
            style={{ left: L.tag.x, top: L.tag.y }}
            initial={reduce ? false : { opacity: 0, y: -24, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <span className="absolute -top-2 left-1/2 size-3 -translate-x-1/2 rounded-full bg-vermilion ring-2 ring-cream" aria-hidden="true" />
            <p className="text-[0.7rem] text-muted">{m.result}</p>
            <p className="font-latin text-xl font-extrabold text-ink">{fmtTaka(today.sales, locale)}</p>
            <div className="mt-1 flex h-6 items-end gap-[3px]" aria-hidden="true">
              {weekSales.map((v, i) => (
                <span key={i} className={`flex-1 rounded-sm ${i === weekSales.length - 1 ? "bg-leaf" : "bg-leaf/25"}`} style={{ height: `${(v / max) * 100}%` }} />
              ))}
            </div>
            <p className="mt-1 text-[0.66rem] font-semibold text-leaf-deep">▲ {interpolate(m.delta, { pct: fmtPercent(pct, locale) })}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </FitBox>
  );
}

export function AssistantHeroArt() {
  const { t, locale } = useI18n();
  const m = t.features.assistantPage.hero;
  const reduce = !!useReducedMotion();
  const answerText = interpolate(m.answer, { total: fmtTaka(today.sales, locale), n: fmtNumber(today.salesCount, locale), pct: fmtPercent(pct, locale) });
  const settled: ChatMsg[] = [
    { id: 1, from: "user", text: m.ask, voice: true },
    { id: 2, from: "ai", text: answerText, ok: true },
  ];
  const [phase, setPhase] = useState<Phase>(reduce ? "answered" : "draw");
  const [written, setWritten] = useState(reduce ? m.ledger.length : 0);
  const [msgs, setMsgs] = useState<ChatMsg[]>(reduce ? settled : []);
  const timers = useRef<number[]>([]);
  const nextId = useRef(3);
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const converse = (startAt: number) => {
    const ask = nextId.current++;
    const reply = nextId.current++;
    later(startAt, () => setPhase("listening"));
    // The spoken question appears word by word, as it is heard
    const words = m.ask.split(" ");
    words.forEach((_, i) =>
      later(startAt + 300 + i * 260, () =>
        setMsgs((list) => {
          const others = list.filter((x) => x.id !== ask);
          return [...others, { id: ask, from: "user", text: words.slice(0, i + 1).join(" "), voice: true }];
        }),
      ),
    );
    const heard = startAt + 300 + words.length * 260 + 300;
    later(heard, () => setPhase("thinking"));
    later(heard + 900, () => {
      setMsgs((list) => [...list, { id: reply, from: "ai", text: answerText, ok: true }]);
      setPhase("answered");
    });
  };

  useEffect(() => {
    // Reduced motion is only known after the first render: jump straight to the settled scene
    if (reduce) {
      clear();
      setPhase("answered");
      setWritten(m.ledger.length);
      setMsgs(settled);
      return;
    }
    m.ledger.forEach((_, i) => later(250 + i * 380, () => setWritten(i + 1)));
    later(1100, () => setPhase("ready"));
    converse(2100);
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const onMic = () => {
    if (phase === "listening" || phase === "thinking") return;
    clear();
    setWritten(m.ledger.length);
    if (reduce) {
      const again: ChatMsg[] = [
        { id: nextId.current++, from: "user", text: m.ask, voice: true },
        { id: nextId.current++, from: "ai", text: answerText, ok: true },
      ];
      setMsgs((list) => [...list, ...again].slice(-4));
      return;
    }
    setPhase("ready");
    setMsgs((list) => list.slice(-2));
    converse(150);
  };

  return (
    <div className="relative mx-auto w-full">
      <div className="hidden md:block">
        <Composition layout="wide" phase={phase} msgs={msgs} written={written} onMic={onMic} reduce={reduce} />
      </div>
      <div className="mx-auto max-w-[360px] md:hidden">
        <Composition layout="tall" phase={phase} msgs={msgs} written={written} onMic={onMic} reduce={reduce} />
      </div>
    </div>
  );
}
