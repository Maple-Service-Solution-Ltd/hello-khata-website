"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { P, Wash, palette as c } from "@/components/illustrations/ink";

/** Pivot for a part of the cat, as a fraction of that part's own bounding box. */
const pivot = (x: number, y: number) => ({ originX: x, originY: y });

/**
 * The bench cat from the hero street, drawn on its own layer so it can move without
 * re-filtering the whole street. It sleeps (breathing, drifting "z"s, a lazy tail);
 * a butterfly visits its tail every few seconds — ear twitch, tail flick, off it goes.
 * Hover or tap wakes it for a moment.
 */
export function HeroCat() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [awake, setAwake] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const s = new Sketch(4101);

  const wake = () => {
    if (reduce) return;
    setAwake(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAwake(false), 2400);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  // One shared cycle for the butterfly visit and the cat's reactions to it.
  const cycle = { duration: 11, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" as const, delay: 3.5 };
  const loop = !reduce && !awake;

  return (
    <motion.g
      className="pointer-events-auto cursor-pointer"
      onPointerEnter={wake}
      onClick={wake}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.6 }}
    >
      {/* Generous invisible hit area */}
      <rect x="250" y="486" width="76" height="46" fill="transparent" />

      {/* Tail: lazy sway, plus a flick when the butterfly overstays */}
      {/* Body: breathes from the bench up */}
      <motion.g style={pivot(0.5, 1)} animate={loop ? { scaleY: [1, 1.07, 1], scaleX: [1, 1.015, 1] } : { scaleY: 1, scaleX: 1 }} transition={{ duration: 3.4, repeat: loop ? Infinity : 0, ease: "easeInOut" }}>
        <g filter="url(#hk-wobble)">
          <Wash d={s.ellipse(292, 518, 22, 10, 0.2)} fill={c.marigold} o={0.7} />
          <P d={s.curve([[272, 524], [270, 512], [286, 507], [306, 508], [314, 520], [304, 528], [280, 528]], 0.4)} w={1.3} />
          <P d={s.curve([[292, 510], [296, 516], [294, 522]], 0.3)} w={0.8} o={0.5} />
          <P d={s.curve([[300, 510], [303, 515]], 0.3)} w={0.8} o={0.5} />
        </g>
      </motion.g>

      {/* Tail: tip curls up off the back, sways lazily, and flicks when the butterfly overstays */}
      <motion.g style={pivot(0, 1)} animate={loop ? { rotate: [0, -7, 0] } : { rotate: awake ? [0, -18, 6, -12, 0] : 0 }} transition={loop ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.9 }}>
        <motion.g style={pivot(0, 1)} animate={loop ? { rotate: [0, 0, -24, 10, 0, 0] } : { rotate: 0 }} transition={loop ? { ...cycle, times: [0, 0.58, 0.61, 0.64, 0.68, 1] } : { duration: 0.3 }}>
          <P d={s.curve([[311, 521], [321, 518], [326, 508], [320, 501]], 0.3)} w={1.5} />
          <Wash d={s.ellipse(321, 503, 2.4, 2.4, 0.1)} fill={c.ink} o={0.25} />
        </motion.g>
      </motion.g>

      {/* Head: lifts and tilts when awake */}
      <motion.g style={pivot(0.6, 1)} animate={awake ? { y: -4, rotate: -8 } : { y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
        <Wash d={s.ellipse(272, 516, 7.5, 6.5, 0.1)} fill={c.marigold} o={0.75} />
        <P d={s.ellipse(272, 516, 8, 7, 0.3)} w={1.2} />
        {/* Front ear (perks up when awake) */}
        <motion.g style={pivot(0.5, 1)} animate={{ rotate: awake ? -14 : 0 }}>
          <P d={s.poly([[266, 511], [267, 503], [271, 509]], false, 0.2, 1)} w={1} />
        </motion.g>
        {/* Back ear: twitches when the butterfly lands */}
        <motion.g style={pivot(0.5, 1)} animate={awake ? { rotate: 10 } : loop ? { rotate: [0, 0, -22, 0, -14, 0, 0] } : { rotate: 0 }} transition={loop ? { ...cycle, times: [0, 0.37, 0.39, 0.41, 0.43, 0.45, 1] } : { type: "spring", stiffness: 300, damping: 14 }}>
          <P d={s.poly([[274, 509], [278, 502], [279, 510]], false, 0.2, 1)} w={1} />
        </motion.g>
        {/* Eyes: sleepy arcs, or open green eyes */}
        {awake ? (
          <g>
            <ellipse cx="269" cy="515.5" rx="1.9" ry="2.2" fill={c.leafWash} stroke={c.ink} strokeWidth="0.6" />
            <ellipse cx="275" cy="515.5" rx="1.9" ry="2.2" fill={c.leafWash} stroke={c.ink} strokeWidth="0.6" />
            <rect x="268.6" y="514" width="0.8" height="3" rx="0.4" fill={c.ink} />
            <rect x="274.6" y="514" width="0.8" height="3" rx="0.4" fill={c.ink} />
          </g>
        ) : (
          <g>
            <path d="M267.2 516 q1.8 1.4 3.6 0" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
            <path d="M273.2 516 q1.8 1.4 3.6 0" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
          </g>
        )}
        <path d="M271.3 518.6 l0.7 0.6 l0.7 -0.6" fill="none" stroke={c.vermilion} strokeWidth="0.8" strokeLinecap="round" />
        {/* Whiskers */}
        <path d="M266 519 l-6 -1 M266 520.5 l-6 1 M278 519 l6 -1 M278 520.5 l6 1" stroke={c.ink} strokeWidth="0.5" opacity="0.6" />
      </motion.g>

      {/* Drifting z's while asleep */}
      {loop &&
        [0, 1, 2].map((i) => (
          <motion.text
            key={i}
            x={262}
            y={502}
            fontSize={8 + i * 2}
            fill={c.ink}
            fillOpacity="0.55"
            className="font-hand"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0], x: [0, -6 - i * 3, -12 - i * 4], y: [0, -10, -24 - i * 4] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
          >
            z
          </motion.text>
        ))}

      {/* Butterfly visit */}
      {loop && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ x: [168, 205, 238, 278, 321, 321, 358, 424], y: [452, 476, 456, 484, 497, 497, 462, 416], opacity: [0, 1, 1, 1, 1, 1, 1, 0] }}
          transition={{ ...cycle, times: [0, 0.1, 0.18, 0.28, 0.37, 0.6, 0.74, 0.9] }}
        >
          <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }} animate={{ scaleX: [1, 0.25, 1] }} transition={{ duration: 0.22, repeat: Infinity }}>
            <ellipse cx="-3.2" cy="-1.5" rx="3.6" ry="2.8" fill={c.sky} stroke={c.ink} strokeWidth="0.5" />
            <ellipse cx="3.2" cy="-1.5" rx="3.6" ry="2.8" fill={c.sky} stroke={c.ink} strokeWidth="0.5" />
            <ellipse cx="-2.4" cy="2" rx="2.2" ry="1.8" fill={c.vermilion} fillOpacity="0.8" stroke={c.ink} strokeWidth="0.5" />
            <ellipse cx="2.4" cy="2" rx="2.2" ry="1.8" fill={c.vermilion} fillOpacity="0.8" stroke={c.ink} strokeWidth="0.5" />
          </motion.g>
          <path d="M0 -3 v6.5 M0 -3 l-1.6 -2.4 M0 -3 l1.6 -2.4" stroke={c.ink} strokeWidth="0.7" strokeLinecap="round" />
        </motion.g>
      )}

      {/* Meow bubble */}
      <AnimatePresence>
        {awake && (
          <motion.g key="meow" style={pivot(0.55, 1)} initial={{ opacity: 0, scale: 0.4, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ type: "spring", stiffness: 380, damping: 18 }}>
            <path d="M226 470 h52 a8 8 0 0 1 8 8 v8 a8 8 0 0 1 -8 8 h-14 l-6 8 l-1 -8 h-31 a8 8 0 0 1 -8 -8 v-8 a8 8 0 0 1 8 -8 z" fill={c.cream} stroke={c.ink} strokeWidth="1.1" />
            <text x="252" y="487.5" textAnchor="middle" fontSize="11" fill={c.leafDeep} className="font-hand">
              {t.home.cat.meow}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
}
