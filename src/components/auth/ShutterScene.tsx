"use client";

import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { Person, Section } from "@/components/illustrations/InkPeople";
import { useAuthScene, initialSignIn } from "./AuthSceneContext";

/**
 * Sign-in: "দোকান খোলার মুহূর্ত". The visitor's shop at their own time of day, shutter down, a brass padlock on it.
 * Typing a valid phone number or email slides the key into the lock; each password character sets a tumbler;
 * signing in turns the key. Only a real successful sign-in springs the lock and rolls the shutter up on the lit shop
 * with the shopkeeper waiting; otherwise the key turns back and the form's own message explains why.
 */

type Daypart = "morning" | "day" | "evening" | "night";
const SKY: Record<Daypart, { fill: string; o: number; sun: [number, number] | null }> = {
  morning: { fill: "#F4C08A", o: 0.75, sun: [470, 120] },
  day: { fill: "#BFDDF2", o: 0.75, sun: [450, 52] },
  evening: { fill: "#F0A867", o: 0.8, sun: [470, 128] },
  night: { fill: "#2E3D5E", o: 0.92, sun: null },
};
const daypart = (h: number): Daypart => (h >= 5 && h < 11 ? "morning" : h >= 11 && h < 16 ? "day" : h >= 16 && h < 19 ? "evening" : "night");

const W = 560;
const H = 600;
const TOP = 176;
const FLOOR = 470;
const OPEN = FLOOR - TOP;
const LOCK = { x: 280, y: 440 };

const Shop = memo(function Shop({ sign }: { sign: string }) {
  const s = new Sketch(7301);
  return (
    <g filter="url(#hk-wobble)">
      {/* Signboard on the parapet */}
      <P d={s.line(170, 144, 170, 150, 0.2, 1)} w={1.1} />
      <P d={s.line(390, 144, 390, 150, 0.2, 1)} w={1.1} />
      <Occlude d={box(120, 96, 320, 48)} />
      <Wash d={box(120, 96, 320, 48)} fill={c.leafDeep} o={0.9} />
      <P d={s.rect(120, 96, 320, 48, 0.5)} w={1.3} />
      <P d={s.rect(127, 102, 306, 36, 0.3, 1)} w={0.6} c={c.cream} o={0.7} />
      <text x="280" y="127" textAnchor="middle" fontSize="21" fill={c.cream} style={{ fontFamily: "var(--font-tiro)" }}>
        {sign}
      </text>
      <Section x={30} y={150} w={500} h={12} />
      {/* The shop inside, waiting behind the shutter */}
      <Occlude d={box(52, TOP, 456, OPEN)} />
      <Wash d={box(52, TOP, 456, OPEN)} fill={c.rice} o={0.35} />
      {[236, 296].map((y, r) => (
        <g key={y}>
          <P d={s.line(80, y, 480, y, 0.4)} w={1.6} />
          {Array.from({ length: 11 }, (_, i) => {
            const x = 88 + i * 35;
            const h = 26 + ((i + r) % 3) * 5;
            const fill = [c.marigold, c.rice, c.leafWash, c.clay, c.vermilion, c.sky][(i + r * 2) % 6];
            return (
              <g key={i}>
                <Occlude d={box(x, y - h, 24, h)} />
                <Wash d={box(x, y - h, 24, h)} fill={fill} o={0.6} />
                <P d={s.rect(x, y - h, 24, h, 0.3, 1)} w={0.8} />
              </g>
            );
          })}
        </g>
      ))}
      <P d={s.line(280, TOP, 280, 192, 0.1, 1)} w={0.7} />
      <Section x={30} y={162} w={22} h={FLOOR - 162} />
      <Section x={508} y={162} w={22} h={FLOOR - 162} />
      <Occlude d={box(52, 162, 456, 14)} />
      <Wash d={box(52, 162, 456, 14)} fill="#8f9aa3" o={0.45} />
      <P d={s.rect(52, 162, 456, 14, 0.3)} w={1} />
      {/* Plinth, footpath, a rolled newspaper on the step, a plant by the door */}
      <Section x={24} y={FLOOR} w={512} h={10} />
      <Occlude d={box(30, FLOOR + 10, 500, 22)} />
      <Wash d={box(30, FLOOR + 10, 500, 22)} fill={c.clay} o={0.18} />
      <P d={s.rect(30, FLOOR + 10, 500, 22, 0.4)} w={1} />
      <P d={s.line(0, 512, W, 512, 0.6)} w={1.3} />
      <g transform="rotate(-8 140 505)">
        <Wash d={box(118, 499, 46, 10)} fill={c.cream} o={0.9} />
        <P d={s.rect(118, 499, 46, 10, 0.2)} w={0.9} />
        <P d={s.line(124, 504, 158, 504, 0.2, 1)} w={0.5} o={0.6} />
      </g>
      <Wash d="M532 512 l4 -26 h20 l4 26 z" fill={c.clay} o={0.7} />
      <P d={s.poly([[532, 512], [536, 486], [556, 486], [560, 512]], true, 0.3)} w={1} />
      {[
        [[546, 486], [536, 462], [530, 450]],
        [[546, 486], [548, 458], [544, 444]],
        [[546, 486], [556, 466], [560, 458]],
      ].map((pts, i) => (
        <P key={i} d={s.curve(pts as [number, number][], 0.3)} w={1} c={c.leafDeep} />
      ))}
    </g>
  );
});

const Counter = memo(function Counter() {
  const s = new Sketch(7311);
  return (
    <g filter="url(#hk-wobble)">
      <Occlude d={box(150, 392, 260, FLOOR - 392)} />
      <Wash d={box(150, 400, 260, FLOOR - 400)} fill={c.clay} o={0.5} />
      <P d={s.rect(150, 400, 260, FLOOR - 400, 0.4)} w={1.2} />
      {[202, 254, 306, 358].map((x) => (
        <P key={x} d={s.line(x, 402, x, FLOOR - 2, 0.3, 1)} w={0.6} o={0.6} />
      ))}
      <Occlude d={box(144, 392, 272, 8)} />
      <Wash d={box(144, 392, 272, 8)} fill={c.clay} o={0.7} />
      <P d={s.rect(144, 392, 272, 8, 0.3)} w={1.2} />
    </g>
  );
});

export function ShutterScene() {
  const { t } = useI18n();
  const m = t.auth.scene.signIn;
  const scene = useAuthScene();
  const st = scene?.signIn ?? initialSignIn;
  const reduce = !!useReducedMotion();
  const [part, setPart] = useState<Daypart>("day");
  useEffect(() => setPart(daypart(new Date().getHours())), []);
  const sky = SKY[part];
  const night = part === "night";
  const open = st.status === "open";
  const turned = st.status === "turning" || open;
  const ready = st.idOk && st.chars > 0 && st.status === "idle";
  const s = new Sketch(7321);
  const dur = (d: number) => (reduce ? 0 : d);
  const message = open ? m.welcome : st.status === "turning" ? m.opening : st.status === "refused" ? m.refused : ready ? m.ready : "";

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="block h-[330px] w-full text-ink sm:h-[380px] lg:h-auto lg:[aspect-ratio:560/600]" role="img" aria-label={m.alt}>
        <defs>
          <clipPath id="hk-shutter-open">
            <rect x="52" y={TOP} width="456" height={OPEN} />
          </clipPath>
          <radialGradient id="hk-shop-bulb">
            <stop offset="0" stopColor="#FFE7A3" stopOpacity="0.9" />
            <stop offset="1" stopColor="#FFE7A3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The visitor's own time of day */}
        <path d={box(0, 0, W, 172)} fill={sky.fill} opacity={sky.o} filter="url(#hk-wash)" style={{ transition: "fill 0.8s" }} />
        {sky.sun ? (
          <g transform={`translate(${sky.sun[0]} ${sky.sun[1]})`}>
            <circle r="24" fill={c.marigold} fillOpacity="0.22" />
            <circle r="14" fill={part === "day" ? "#FBE3A1" : c.marigold} fillOpacity="0.85" stroke={c.ink} strokeWidth="0.9" />
          </g>
        ) : (
          <g>
            <path d="M470 40 a16 16 0 1 0 16 22 a12 12 0 1 1 -16 -22 z" fill="#F6EFD9" stroke={c.ink} strokeWidth="0.8" />
            {[
              [400, 30],
              [520, 70],
              [440, 80],
            ].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 3} v6 M${x - 3} ${y} h6`} stroke="#F6EFD9" strokeWidth="1" strokeLinecap="round" />
            ))}
          </g>
        )}
        <text x="32" y="70" fontSize="27" fill={night ? c.cream : c.ink} style={{ fontFamily: "var(--font-tiro)" }}>
          {m.greet[part]}
        </text>
        <text x="33" y="94" fontSize="13" fill={night ? c.cream : c.ink} fillOpacity="0.75" className="font-hand">
          {m.caption[part]}
        </text>

        <Shop sign={m.sign} />

        {/* The shopkeeper, waiting behind the counter */}
        <g transform="translate(280 452) scale(1.35)">
          <Person seed={7331} shirt={c.cream} pants={c.ink} hair="short" arms={false}>
            <path d="M-10 -56 C-14 -48 -10 -46 10 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <path d="M10 -56 C15 -50 16 -48 16 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <path d="M-4.4 -68.4 Q-2.2 -70.4 0 -69.2 Q2.2 -70.4 4.4 -68.4 Q2.2 -67.6 0 -68.2 Q-2.2 -67.6 -4.4 -68.4 Z" fill={c.ink} fillOpacity="0.8" />
          </Person>
        </g>
        <g transform="translate(301 378)">
          <rect x="-6" y="-10" width="12" height="19" rx="2" fill={c.ink} fillOpacity="0.88" />
          <rect x="-4.6" y="-8" width="9.2" height="14.6" rx="1" fill="var(--color-forest)" />
          <rect x="-3.4" y="-6" width="5" height="1.5" rx="0.7" fill="var(--color-leaf-glow)" />
        </g>
        <Counter />

        {/* The bulb comes on when the shop opens (and glows behind the shutter at night) */}
        <motion.circle cx="280" cy="198" r="150" fill="url(#hk-shop-bulb)" initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: dur(0.8), delay: dur(open ? 1.6 : 0) }} style={{ mixBlendMode: "screen" }} />
        <ellipse cx="280" cy="198" rx="6" ry="7" fill={open ? "#FFE58A" : c.cream} stroke={c.ink} strokeWidth="0.8" style={{ transition: "fill 0.6s 1.6s" }} />

        {/* The shutter */}
        <g clipPath="url(#hk-shutter-open)">
          <motion.g initial={false} animate={{ y: open ? -OPEN : 0 }} transition={{ duration: dur(1.3), delay: dur(open ? 1 : 0), ease: [0.45, 0, 0.55, 1] }}>
            <rect x="52" y={TOP} width="456" height={OPEN} fill="var(--color-paper)" />
            <rect x="52" y={TOP} width="456" height={OPEN} fill="#8f9aa3" fillOpacity={night ? 0.55 : 0.4} />
            {Array.from({ length: Math.floor(OPEN / 7) }, (_, i) => (
              <path key={i} d={`M52 ${TOP + 7 + i * 7} H508`} stroke={c.ink} strokeOpacity="0.26" strokeWidth="0.7" />
            ))}
            <path d={box(52, FLOOR - 9, 456, 9)} fill="#7d8790" fillOpacity="0.75" stroke={c.ink} strokeWidth="0.9" />
            <P d={s.line(120, 300, 170, 296, 0.6, 1)} w={0.9} o={0.25} />
          </motion.g>
        </g>

        {/* The padlock */}
        <motion.g
          initial={false}
          animate={open ? { y: 70, opacity: 0, rotate: 18 } : { y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: dur(0.55), delay: dur(open ? 0.7 : 0), ease: "easeIn" }}
          style={{ transformBox: "view-box", transformOrigin: `${LOCK.x}px ${LOCK.y}px` }}
        >
          <motion.g key={`shake-${st.refusals}`} initial={false} animate={st.refusals ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }} transition={{ duration: dur(0.5), delay: dur(0.35) }}>
            <g transform={`translate(${LOCK.x} ${LOCK.y})`}>
              {ready && !reduce && <circle r="34" fill="none" stroke="var(--color-leaf-glow)" strokeWidth="2" className="hk-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
              <motion.path d="M-12 -14 V-25 a12 12 0 0 1 24 0 V-14" fill="none" stroke="#9c7426" strokeWidth="5" strokeLinecap="round" initial={false} animate={{ y: open ? -9 : 0 }} transition={{ duration: dur(0.3), delay: dur(open ? 0.45 : 0) }} />
              <rect x="-20" y="-16" width="40" height="34" rx="6" fill="#d4a64a" stroke={c.ink} strokeWidth="1.2" />
              <rect x="-16" y="-12" width="32" height="5" rx="2.5" fill="#fff" fillOpacity="0.25" />
              <circle cx="0" cy="-1" r="3.8" fill={c.ink} />
              <path d="M-1.6 1 h3.2 l1 7 h-5.2 z" fill={c.ink} />
              {/* One tumbler per password character */}
              {Array.from({ length: 6 }, (_, i) => (
                <circle key={i} cx={-12.5 + i * 5} cy="13.5" r="1.6" fill={i < st.chars ? "var(--color-leaf)" : c.ink} fillOpacity={i < st.chars ? 1 : 0.22} style={{ transition: "fill 0.2s" }} />
              ))}
              {/* The key: slides in once the phone or email is valid, turns when signing in */}
              <motion.g
                initial={false}
                animate={{
                  x: st.idOk ? 0 : 30,
                  opacity: st.idOk ? 1 : 0,
                  rotate: turned ? 90 : st.status === "refused" && st.refusals ? [0, 70, 0] : 0,
                }}
                transition={{ duration: dur(st.status === "refused" ? 0.7 : 0.4), ease: "easeInOut" }}
                style={{ transformBox: "view-box", transformOrigin: `${LOCK.x}px ${LOCK.y - 1}px` }}
              >
                <path d="M2 -1 H30" stroke="#b8892f" strokeWidth="3" strokeLinecap="round" />
                <path d="M12 -1 v4 M17 -1 v3 M22 -1 v4" stroke="#b8892f" strokeWidth="2" strokeLinecap="round" />
                <circle cx="38" cy="-1" r="7.5" fill="#d4a64a" stroke={c.ink} strokeWidth="1" />
                <circle cx="38" cy="-1" r="2.6" fill="var(--color-paper)" stroke={c.ink} strokeWidth="0.7" />
              </motion.g>
            </g>
          </motion.g>
        </motion.g>

        {/* Welcome, on the shopkeeper's phone */}
        <AnimatePresence>
          {open && (
            <motion.g key="welcome" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: dur(2.4), duration: 0.5 }}>
              <rect x="314" y="318" width="150" height="34" rx="12" fill="var(--color-leaf)" />
              <path d="M318 344 l-10 8 l14 -4 z" fill="var(--color-leaf)" />
              <text x="389" y="340" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
                {m.welcome}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </>
  );
}
