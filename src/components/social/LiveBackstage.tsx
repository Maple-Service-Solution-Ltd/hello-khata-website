"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtNumber } from "@/lib/format";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { Person, Section } from "@/components/illustrations/InkPeople";

/**
 * F-commerce hero: "লাইভের পেছনে", behind an evening Facebook live, in a home studio cut open like a dollhouse.
 * The shared inbox is a clothesline strung across the room: every comment flies off the live phone and is
 * pegged to the line, and HelloKhata pegs its reply beside it. A tricky question slides down to the teammate
 * backstage, an "I'll order" chat drops into the basket as an order draft, a parcel is packed, and a happy
 * customer comes back. The board keeps the evening's tally. Hover or tap the chats, the board, the phone, the
 * teammate and the basket. All figures are sample data.
 */

const W = 640;
const H = 520;
const FLOOR = 470;

/** The clothesline: a quadratic sag from (50,150) through the middle to (590,150). */
const lineT = (x: number) => (x - 50) / 540;
const lineY = (x: number) => {
  const t = lineT(x);
  return 150 + 100 * t * (1 - t);
};
const lineAngle = (x: number) => (Math.atan((100 * (1 - 2 * lineT(x))) / 540) * 180) / Math.PI;
const SLOTS = [96, 146, 206, 256, 316, 366, 426, 476, 536];
const CLOTHESLINE = "M50 150 Q320 200 590 150";

const PHONE = [236, 372] as const;
const LAPTOP = [454, 398] as const;
const BASKET = [350, 450] as const;
const inkLine = "M236 356 C 232 300, 214 230, 206 172";
const ease = [0.45, 0, 0.55, 1] as const;
const LOOP = 18000;

type Kind = "cust" | "ai" | "team" | "hand" | "order";
type Peg = { kind: Kind; text: string; away?: "team" | "basket" };
type Zone = "board" | "phone" | "team" | "basket" | `c${number}`;

function ChatCard({ kind, text }: { kind: Kind; text: string }) {
  const fill = { cust: c.cream, ai: "#dcfce7", team: "#e0ecfb", hand: "#f8e7bf", order: "#dcfce7" }[kind];
  const stroke = { cust: c.ink, ai: c.leaf, team: c.sky, hand: c.marigold, order: c.leaf }[kind];
  return (
    <g>
      <rect x="-25" y="5" width="50" height="22" rx="4" fill={fill} stroke={stroke} strokeWidth="0.9" />
      {kind === "cust" || kind === "hand" ? (
        <circle cx="-18" cy="16" r="3.4" fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.5" />
      ) : kind === "team" ? (
        <circle cx="-18" cy="16" r="3.4" fill={c.sky} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.5" />
      ) : (
        <path d="M-18 12 l1.2 2.8 l2.8 1.2 l-2.8 1.2 l-1.2 2.8 l-1.2 -2.8 l-2.8 -1.2 l2.8 -1.2 z" fill={c.leaf} />
      )}
      <text x="4" y="18.2" textAnchor="middle" fontSize="6.2" fill={c.ink} style={{ fontFamily: "var(--font-sans)" }}>
        {text}
      </text>
      {/* Wooden peg */}
      <rect x="-2" y="-3" width="4" height="10" rx="1" fill={c.clay} fillOpacity="0.8" stroke={c.ink} strokeWidth="0.6" />
    </g>
  );
}

function Studio({ m }: { m: { onAir: string; boardTitle: string } }) {
  const s = new Sketch(7202);
  return (
    <g filter="url(#hk-wobble)">
      {/* Back wall: warm stage, cooler backstage */}
      <Occlude d={box(40, 110, 560, 360)} />
      <Wash d={box(40, 110, 260, 360)} fill={c.marigold} o={0.12} />
      <Wash d={box(300, 110, 300, 360)} fill={c.sky} o={0.08} />
      <Section x={30} y={96} w={580} h={14} />
      <Section x={30} y={FLOOR} w={580} h={12} />
      <Section x={30} y={110} w={10} h={360} />
      <Section x={600} y={110} w={10} h={360} />

      {/* Night window: moon and city lights */}
      <path d={box(56, 214, 76, 66)} fill="#24344a" fillOpacity="0.85" />
      <P d={s.rect(56, 214, 76, 66, 0.4)} w={1.1} />
      <P d={s.line(94, 214, 94, 280, 0.2, 1)} w={0.7} />
      {[[60, 252, 10, 28], [74, 242, 12, 38], [100, 248, 12, 32], [116, 238, 12, 42]].map(([x, y, w, h], i) => (
        <g key={i}>
          <path d={box(x, y, w, h)} fill={c.ink} fillOpacity="0.55" />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={x + 3 + (k % 2) * 4} y={y + 5 + k * 8} width="2.4" height="2.4" fill={c.marigold} fillOpacity="0.85" />
          ))}
        </g>
      ))}

      {/* "On air" sign over the stage */}
      <Occlude d={box(150, 118, 64, 16)} />
      <P d={s.rect(150, 118, 64, 16, 0.3)} w={0.9} />
      <text x="182" y="129.5" textAnchor="middle" fontSize="8" fontWeight="700" fill={c.vermilion} style={{ fontFamily: "var(--font-sans)" }}>
        {m.onAir}
      </text>

      {/* Sari rack behind the seller */}
      <P d={s.line(54, 306, 136, 306, 0.3)} w={1.1} />
      <P d={s.line(56, 306, 54, 470, 0.3, 1)} w={0.9} />
      <P d={s.line(134, 306, 136, 470, 0.3, 1)} w={0.9} />
      {[
        [66, c.teal, 84],
        [80, c.vermilion, 96],
        [94, c.plum, 78],
        [108, c.leafWash, 90],
        [122, c.marigold, 82],
      ].map(([x, tint, h]) => {
        const X = x as number;
        const Hh = h as number;
        return (
          <g key={X}>
            <Wash d={`M${X - 6} 310 h12 l2 ${Hh} h-16 z`} fill={tint as string} o={0.45} />
            <P d={s.poly([[X - 6, 310], [X + 6, 310], [X + 8, 310 + Hh], [X - 8, 310 + Hh]], true, 0.3)} w={0.8} />
            <P d={s.line(X - 7.5, 302 + Hh, X + 7.5, 302 + Hh, 0.2, 1)} w={1.6} c={c.marigold} o={0.7} />
          </g>
        );
      })}

      {/* Tripod and ring light */}
      <P d={s.line(236, 392, 222, 470, 0.3)} w={1} />
      <P d={s.line(236, 392, 250, 470, 0.3)} w={1} />
      <P d={s.line(236, 392, 236, 470, 0.3)} w={0.8} />
      <P d={s.ellipse(PHONE[0], PHONE[1], 21, 21, 0.3)} w={1.4} />

      {/* Backstage curtain */}
      <P d={s.line(282, 194, 322, 194, 0.3)} w={1.2} />
      <Wash d="M286 196 q-4 80 4 274 h18 q-8 -150 -2 -274 z" fill={c.vermilion} o={0.35} />
      <P d={s.curve([[286, 196], [283, 300], [290, 470]], 0.3)} w={0.9} />
      <P d={s.curve([[306, 196], [300, 320], [308, 470]], 0.3)} w={0.9} />

      {/* Order board */}
      <Occlude d={box(496, 206, 96, 132)} />
      <path d={box(496, 206, 96, 132)} fill={c.leafDeep} fillOpacity="0.92" />
      <P d={s.rect(496, 206, 96, 132, 0.4)} w={1.3} />
      <text x="544" y="222" textAnchor="middle" fontSize="8.5" fill={c.cream} style={{ fontFamily: "var(--font-sans)" }}>
        {m.boardTitle}
      </text>
      <P d={s.line(504, 228, 584, 228, 0.3, 1)} w={0.6} c={c.cream} o={0.6} />

      {/* Teammate's desk is drawn in front of her; basket and parcel stack on the floor */}
      <Wash d={`M${BASKET[0] - 22} 470 l-4 -24 h52 l-4 24 z`} fill={c.clay} o={0.55} />
      <P d={s.poly([[BASKET[0] - 22, 470], [BASKET[0] - 26, 446], [BASKET[0] + 26, 446], [BASKET[0] + 22, 470]], true, 0.3)} w={1} />
      {[452, 458, 464].map((y) => (
        <P key={y} d={s.line(BASKET[0] - 24, y, BASKET[0] + 24, y, 0.2, 1)} w={0.5} o={0.6} />
      ))}
      {[[548, 448, 22, 22], [570, 452, 22, 18], [556, 430, 22, 18]].map(([x, y, w, h], i) => (
        <g key={i}>
          <Wash d={box(x, y, w, h)} fill={c.clay} o={0.5} />
          <P d={s.rect(x, y, w, h, 0.2, 1)} w={0.8} />
          <path d={box(x + 4, y + 4, 10, 5)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
        </g>
      ))}
    </g>
  );
}

function Desk() {
  const s = new Sketch(7311);
  return (
    <g filter="url(#hk-wobble)">
      <Occlude d={box(408, 408, 110, 8)} />
      <Wash d={box(408, 408, 110, 8)} fill={c.clay} o={0.75} />
      <P d={s.rect(408, 408, 110, 8, 0.3)} w={1.1} />
      <P d={s.line(414, 416, 414, 470, 0.2)} w={1.1} />
      <P d={s.line(512, 416, 512, 470, 0.2)} w={1.1} />
      {/* Laptop, seen from behind */}
      <path d="M440 408 l4 -24 h22 l2 24 z" fill="var(--color-paper)" />
      <Wash d="M440 408 l4 -24 h22 l2 24 z" fill={c.ink} o={0.3} />
      <P d={s.poly([[440, 408], [444, 384], [466, 384], [468, 408]], true, 0.2)} w={1} />
      <circle cx="455" cy="395" r="2.4" fill={c.leaf} fillOpacity="0.8" />
    </g>
  );
}

export function LiveBackstage() {
  const { t, locale } = useI18n();
  const m = t.fcommerce.heroLive;
  const reduce = useReducedMotion();

  const still: Record<number, Peg> = {
    0: { kind: "cust", text: m.chats[0].short },
    1: { kind: "ai", text: m.chats[0].replyShort },
    2: { kind: "cust", text: m.chats[1].short },
    3: { kind: "ai", text: m.chats[1].replyShort },
    5: { kind: "team", text: m.chats[2].replyShort },
    7: { kind: "ai", text: m.chats[3].replyShort },
  };
  const [pegs, setPegs] = useState<Record<number, Peg>>(reduce ? still : {});
  const [viewers, setViewers] = useState(234);
  const [answered, setAnswered] = useState(reduce ? 42 : 40);
  const [handed, setHanded] = useState(reduce ? 3 : 2);
  const [drafts, setDrafts] = useState(reduce ? 11 : 10);
  const [typing, setTyping] = useState(false);
  const [parcel, setParcel] = useState<"none" | "desk" | "stack">("none");
  const [heart, setHeart] = useState(0);
  const [zone, setZone] = useState<Zone | null>(null);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const put = (slot: number, p: Peg) => setPegs((ps) => ({ ...ps, [slot]: p }));
    const views = window.setInterval(() => setViewers((v) => v + 1 + Math.round(Math.random() * 2)), 900);
    const run = () => {
      // Comments fly off the live phone and are pegged; HelloKhata pegs its replies beside them
      at(600, () => put(0, { kind: "cust", text: m.chats[0].short }));
      at(1800, () => {
        put(1, { kind: "ai", text: m.chats[0].replyShort });
        setAnswered((n) => n + 1);
      });
      at(2800, () => put(2, { kind: "cust", text: m.chats[1].short }));
      at(3800, () => {
        put(3, { kind: "ai", text: m.chats[1].replyShort });
        setAnswered((n) => n + 1);
      });
      // A tricky one: it turns marigold and slides down to the teammate, who answers
      at(5000, () => put(4, { kind: "cust", text: m.chats[2].short }));
      at(6000, () => put(4, { kind: "hand", text: m.chats[2].short }));
      at(6700, () => put(4, { kind: "hand", text: m.chats[2].short, away: "team" }));
      at(7300, () => setTyping(true));
      at(8600, () => {
        setTyping(false);
        put(5, { kind: "team", text: m.chats[2].replyShort });
        setHanded((n) => n + 1);
      });
      // "I'll order": the chat drops into the basket as an order draft and is pinned to the board
      at(9600, () => put(6, { kind: "cust", text: m.chats[3].short }));
      at(10600, () => put(7, { kind: "ai", text: m.chats[3].replyShort }));
      at(11400, () => put(6, { kind: "order", text: m.chats[3].short, away: "basket" }));
      at(12300, () => setDrafts((n) => n + 1));
      // Packed backstage; a happy customer comes back
      at(12800, () => setParcel("desk"));
      at(13900, () => setParcel("stack"));
      at(14600, () => setHeart((h) => h + 1));
      // Unpeg everything and start again
      at(16600, () => setPegs({}));
      at(17400, () => {
        setParcel("none");
        setAnswered(40);
        setHanded(2);
        setDrafts(10);
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
      clearInterval(views);
      timers.forEach(clearTimeout);
    };
  }, [reduce, m]);

  const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
  const tallies = [
    [m.tally.answered, answered],
    [m.tally.handed, handed],
    [m.tally.drafts, drafts],
  ] as const;

  const card = (() => {
    if (!zone) return null;
    if (/^c\d+$/.test(zone)) {
      const i = Number(zone.slice(1));
      const chat = m.chats[i];
      return {
        at: [SLOTS[i * 2 + 1] - 25, lineY(SLOTS[i * 2]) + 4] as const,
        title: m.convoTitle,
        body: (
          <div className="mt-1 space-y-1 text-[0.7rem] leading-snug">
            <p className="rounded-lg bg-paper px-2 py-1 text-ink">{chat.full}</p>
            <p className={`rounded-lg px-2 py-1 ${i === 2 ? "bg-[#e0ecfb] text-ink" : "bg-leaf-soft text-leaf-ink"}`}>
              <span className="font-semibold">{i === 2 ? m.teamName : "HelloKhata"}:</span> {chat.replyFull}
            </p>
          </div>
        ),
      };
    }
    const z = m.zones[zone as "board" | "phone" | "team" | "basket"];
    const at = { board: [544, 206], phone: [236, 336], team: [470, 362], basket: [350, 440] }[zone as "board"] as [number, number];
    return { at, title: z.title, body: <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{z.body}</p> };
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
          <Studio m={m} />
        </motion.g>

        {/* Ambient: moon glow, ring light hum, fan */}
        <circle cx="116" cy="228" r="7" fill="#fff4c2" className="hk-cross" />
        <circle cx="116" cy="228" r="5" fill="#fff4c2" stroke={c.ink} strokeWidth="0.6" />
        <circle cx={PHONE[0]} cy={PHONE[1]} r="19" fill="none" stroke="#fff4c2" strokeWidth="4" className="hk-cross" />
        <path d="M400 110 V128" stroke={c.ink} strokeWidth="1" />
        <ellipse cx="400" cy="130" rx="25" ry="2.2" fill={c.ink} fillOpacity="0.35" stroke={c.ink} strokeWidth="0.6" className="hk-fan" />
        <circle cx="400" cy="130" r="3.2" fill="var(--color-paper)" stroke={c.ink} strokeWidth="0.9" />

        {/* Board tallies and pinned order drafts */}
        <g style={{ fontFamily: "var(--font-sans)" }}>
          {tallies.map(([label, n], i) => (
            <g key={label}>
              <text x="503" y={242 + i * 20} fontSize="6.6" fill={c.cream} fillOpacity="0.8">
                {label}
              </text>
              <motion.text key={n} x="586" y={242 + i * 20} textAnchor="end" fontSize="9" fontWeight="700" fill="var(--color-leaf-glow)" initial={{ scale: 1.5, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} style={{ fontFamily: "var(--font-manrope)", originX: 1, originY: 0.5 }}>
                {fmtNumber(n, locale)}
              </motion.text>
            </g>
          ))}
          {Array.from({ length: Math.min(drafts - 8, 4) }, (_, i) => (
            <motion.g key={i} initial={i === drafts - 9 && !reduce ? { opacity: 0, y: -6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <rect x={504 + i * 21} y="300" width="17" height="22" rx="1" fill={c.cream} transform={`rotate(${(i % 2 ? 4 : -4)} ${512 + i * 21} 311)`} />
              <path d={`M${507 + i * 21} 306 h10 M${507 + i * 21} 310 h8 M${507 + i * 21} 314 h9`} stroke={c.ink} strokeWidth="0.6" transform={`rotate(${(i % 2 ? 4 : -4)} ${512 + i * 21} 311)`} />
              <circle cx={512 + i * 21} cy="300" r="1.8" fill={c.vermilion} />
            </motion.g>
          ))}
        </g>

        {/* The clothesline inbox and the ink line from the live phone up to it */}
        <path d={CLOTHESLINE} fill="none" stroke={c.ink} strokeWidth="1.1" filter="url(#hk-wobble)" />
        <circle cx="50" cy="150" r="2.4" fill={c.ink} />
        <circle cx="590" cy="150" r="2.4" fill={c.ink} />
        <motion.path d={inkLine} fill="none" stroke="var(--color-leaf-ink)" strokeWidth="2.2" strokeLinecap="round" filter="url(#hk-wobble)" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1, ease }} />
        <path d={inkLine} fill="none" stroke="var(--color-cream)" strokeWidth="1" strokeDasharray="2 12" className="hk-flow" />

        {/* Pegged chats */}
        <AnimatePresence>
          {Object.entries(pegs).map(([k, p]) => {
            const slot = Number(k);
            const x = SLOTS[slot];
            const y = lineY(x);
            const fromPhone = p.kind === "cust";
            const fromTeam = p.kind === "team";
            const start = fromPhone ? { x: PHONE[0], y: PHONE[1] - 10, scale: 0.3, opacity: 0 } : fromTeam ? { x: LAPTOP[0], y: LAPTOP[1], scale: 0.3, opacity: 0 } : { x: 206, y: 172, scale: 0.3, opacity: 0 };
            const target = p.away === "team" ? { x: LAPTOP[0], y: LAPTOP[1] - 6, scale: 0.3, opacity: 0, rotate: 0 } : p.away === "basket" ? { x: BASKET[0], y: BASKET[1] - 10, scale: 0.55, opacity: [1, 1, 0], rotate: 18 } : { x, y, scale: 1, opacity: 1, rotate: lineAngle(x) };
            return (
              <motion.g key={slot} initial={reduce ? false : start} animate={target} exit={{ opacity: 0, y: y + 30 }} transition={{ duration: p.away ? 0.9 : 0.85, ease }}>
                <g className="hk-peg" style={{ animationDelay: `${-slot * 0.7}s` }}>
                  <ChatCard kind={p.kind} text={p.text} />
                </g>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Seller, live, holding up a sari to the phone */}
        <g transform={`translate(160 ${FLOOR}) scale(1.45)`}>
          <Person seed={71} shirt={c.vermilion} pants={c.vermilion} hair="bun" look={1} arms={false}>
            <path d="M-10 -56 C-14 -60 -16 -64 -16 -66 M10 -56 C14 -60 16 -64 17 -66" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <g className="hk-sway" style={{ transformOrigin: "0px -66px" }}>
              <path d="M-17 -66 L18 -66 L22 -18 Q12 -14 2 -18 Q-8 -22 -20 -18 Z" fill={c.teal} fillOpacity="0.45" stroke={c.ink} strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M-19.5 -24 Q-8 -28 2 -24 Q12 -20 21.5 -24" fill="none" stroke={c.marigold} strokeWidth="2.4" />
              {[-10, 0, 10].map((dx) => (
                <circle key={dx} cx={dx} cy={-48} r="1.4" fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
              ))}
            </g>
            <ellipse cx="-17" cy="-66" rx="2.4" ry="2.2" fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
            <ellipse cx="18" cy="-66" rx="2.4" ry="2.2" fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.7" />
          </Person>
        </g>

        {/* Live phone on the tripod */}
        <rect x={PHONE[0] - 8} y={PHONE[1] - 14} width="16" height="28" rx="2.5" fill={c.ink} fillOpacity="0.85" />
        <rect x={PHONE[0] - 6.5} y={PHONE[1] - 11.5} width="13" height="23" rx="1.5" fill="var(--color-forest-2)" />
        <circle cx={PHONE[0] - 2} cy={PHONE[1] + 1} r="3" fill={c.vermilion} fillOpacity="0.6" />
        <path d={`M${PHONE[0] - 4} ${PHONE[1] + 8} h8`} stroke={c.cream} strokeOpacity="0.5" strokeWidth="1" />
        <rect x={PHONE[0] - 22} y={PHONE[1] - 34} width="44" height="12" rx="6" fill={c.vermilion} />
        <circle cx={PHONE[0] - 16} cy={PHONE[1] - 28} r="1.8" fill="#fff" className="animate-pulse" />
        <text x={PHONE[0] + 3} y={PHONE[1] - 25.6} textAnchor="middle" fontSize="6.4" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-manrope)" }}>
          LIVE · {fmtNumber(viewers, locale)}
        </text>

        {/* Teammate backstage, behind her desk */}
        <g transform={`translate(478 ${FLOOR}) scale(1.3)`}>
          <Person seed={72} shirt={c.sky} look={-1} arms={false}>
            <path d="M-10 -56 C-14 -50 -16 -46 -18 -46 M10 -56 C12 -50 10 -46 6 -46" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
          </Person>
        </g>
        <AnimatePresence>
          {typing && (
            <motion.g key="typing" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <path d="M488 342 h24 a6 6 0 0 1 6 6 a6 6 0 0 1 -6 6 h-16 l-5 4 v-4 h-3 a6 6 0 0 1 -6 -6 a6 6 0 0 1 6 -6 z" fill={c.cream} stroke={c.ink} strokeWidth="0.9" />
              {[494, 500, 506].map((x, i) => (
                <motion.circle key={x} cx={x} cy="348" r="1.4" fill={c.ink} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
        <Desk />
        <rect x="444" y="386" width="22" height="1" fill="var(--color-leaf-glow)" opacity={typing ? 0.9 : 0} style={{ transition: "opacity 0.3s" }} />

        {/* Packing: a parcel on the desk, then onto the stack */}
        <AnimatePresence>
          {parcel !== "none" && (
            <motion.g key="parcel" initial={{ opacity: 0, x: 486, y: 396 }} animate={parcel === "desk" ? { opacity: 1, x: 486, y: 396 } : { opacity: [1, 1, 0], x: 566, y: 418 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }}>
              <path d={box(-10, -8, 20, 16)} fill="var(--color-paper)" />
              <path d={box(-10, -8, 20, 16)} fill={c.clay} fillOpacity="0.5" stroke={c.ink} strokeWidth="0.8" />
              <path d={box(-6, -4, 9, 5)} fill={c.cream} stroke={c.ink} strokeWidth="0.4" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Hit areas */}
        {[0, 1, 2, 3].map((i) => hit(`c${i}`, SLOTS[i * 2] - 25, lineY(SLOTS[i * 2]) + 2, 100, 28, m.chats[i].full))}
        {hit("board", 496, 206, 96, 132, m.zones.board.title)}
        {hit("phone", 210, 334, 52, 60, m.zones.phone.title)}
        {hit("team", 440, 340, 80, 70, m.zones.team.title)}
        {hit("basket", 322, 440, 56, 30, m.zones.basket.title)}
      </svg>

      {/* A happy customer comes back */}
      <AnimatePresence>
        {heart > 0 && (
          <motion.span
            key={`heart-${heart}`}
            className="pointer-events-none absolute -translate-x-1/2 rounded-full bg-vermilion px-1.5 py-0.5 text-[0.6rem] font-bold whitespace-nowrap text-white shadow sm:text-xs"
            style={pct(SLOTS[8], lineY(SLOTS[8]) + 4)}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: -14, scale: 1 }}
            transition={{ duration: 2, times: [0, 0.15, 0.8, 1] }}
          >
            ♥ {m.cameBack}
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
