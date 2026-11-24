"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sketch } from "@/lib/sketch";
import { P, Wash, Occlude, palette as c } from "@/components/illustrations/ink";


/**
 * The general-store shopkeeper, on his own layer so he can move without re-filtering the street.
 * He keeps his accounts on his phone: idle, he blinks, his thumb taps the HelloKhata screen and a small
 * "…" hints he has something to say. While `talking`, his mouth and moustache move, sound waves ripple
 * out and voice bars dance on the phone as it records. He looks up and smiles whenever `attention` changes.
 */
export function HeroShopkeeper({ talking = false, attention = 0 }: { talking?: boolean; attention?: number }) {
  const reduce = useReducedMotion();
  const s = new Sketch(7301);
  const body = "M808 432 C810 405 826 388 848 382 L872 382 C896 388 910 405 912 432 Z";
  const smiling = attention > 0 && !talking;

  return (
    <motion.g aria-hidden="true">
      {/* Body */}
      <g filter="url(#hk-wobble)">
        <Occlude d={body} />
        <Wash d={body} fill={c.sky} o={0.5} />
        <P d={s.curve([[808, 432], [810, 405], [826, 388], [848, 382]], 0.4)} w={1.5} />
        <P d={s.curve([[872, 382], [896, 388], [910, 405], [912, 432]], 0.4)} w={1.5} />
        <P d={s.poly([[849, 383], [860, 399], [871, 383]], false, 0.3, 1)} w={1.1} />
        <P d={s.line(860, 399, 860, 430, 0.3, 1)} w={0.8} />
        <P d={s.ellipse(860, 408, 1.3, 1.3, 0.1)} w={1} />
        <P d={s.ellipse(860, 420, 1.3, 1.3, 0.1)} w={1} />
        <P d={s.line(853, 379, 853, 386, 0.2, 1)} w={1.1} />
        <P d={s.line(867, 379, 867, 386, 0.2, 1)} w={1.1} />
        <P d={s.curve([[822, 398], [814, 414], [818, 430]], 0.3)} w={1.3} />
      </g>

      {/* Head */}
      <motion.g
        key={smiling ? `look-${attention}` : "base"}
        style={{ originX: 0.5, originY: 1 }}
        animate={talking && !reduce ? { y: [0, -1.2, 0, -0.8, 0], rotate: [0, 2, -1, 1.5, 0] } : smiling ? { y: [0, -3, -3, 0], rotate: [0, 5, 5, 0] } : { y: 0, rotate: 0 }}
        transition={talking ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" } : smiling ? { duration: 2.2, times: [0, 0.15, 0.85, 1] } : { duration: 0.3 }}
      >
        <g filter="url(#hk-wobble)">
          <Occlude d={s.ellipse(860, 350, 26, 27, 0)} />
          <Wash d={s.ellipse(860, 352, 23, 25, 0.2)} fill={c.clay} o={0.45} />
          <P d={s.curve([[837, 342], [836, 362], [846, 376], [860, 379], [874, 376], [884, 362], [883, 342]], 0.4)} w={1.4} />
          {/* Prayer cap (tupi) */}
          <path d="M835 344 C836 326 847 318 860 318 C873 318 884 326 885 344 Z" fill={c.cream} />
          <P d={s.curve([[835, 344], [836, 326], [847, 318], [860, 318], [873, 318], [884, 326], [885, 344]], 0.3)} w={1.4} />
          <P d={s.line(836, 343, 884, 343, 0.3)} w={1.1} />
          <P d={s.curve([[842, 334], [860, 330], [878, 334]], 0.3)} w={0.6} o={0.6} />
          <P d={s.curve([[858, 354], [856, 362], [860, 364]], 0.2)} w={1} />
          <P d={s.curve([[884, 350], [889, 352], [886, 360], [882, 361]], 0.2)} w={1.1} />
        </g>
        {/* Eyes: blink when idle, bright arcs while talking or smiling */}
        {talking || smiling ? (
          <g fill="none" stroke={c.ink} strokeWidth="1.4" strokeLinecap="round">
            <path d="M848.5 353 q2.8 -3 5.6 0" />
            <path d="M865.5 353 q2.8 -3 5.6 0" />
          </g>
        ) : (
          <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={reduce ? undefined : { scaleY: [1, 1, 0.15, 1, 1] }} transition={{ duration: 4.2, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }}>
            <path d="M849 352.5 h5 M866 352.5 h5" stroke={c.ink} strokeWidth="1.6" strokeLinecap="round" />
          </motion.g>
        )}
        {/* Mouth opens and closes under the moustache */}
        <motion.ellipse cx="860" cy="370.5" rx="3.2" fill="#7a2e22" stroke={c.ink} strokeWidth="0.8" initial={false} animate={{ ry: talking && !reduce ? [0.5, 2.6, 1, 3, 0.7, 2.2, 0.5] : 0.4 }} transition={talking ? { duration: 0.9, repeat: Infinity } : { duration: 0.2 }} />
        <motion.path
          fill="none"
          stroke={c.ink}
          strokeWidth="1.7"
          strokeLinecap="round"
          initial={false}
          animate={{
            d: smiling || talking ? "M848 364 C853 367 856 365 860 366 C864 365 867 367 872 364" : "M849 367 C853 364 856 365 860 366 C864 365 867 364 871 367",
            y: talking && !reduce ? [0, -1.2, 0, -1.4, 0, -1, 0] : 0,
          }}
          transition={talking ? { y: { duration: 0.9, repeat: Infinity }, d: { duration: 0.25 } } : { duration: 0.3 }}
        />
      </motion.g>

      {/* Sound waves while he talks */}
      {talking && !reduce &&
        [0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${893 + i * 7} ${356 - i * 4} q${5 + i * 2} ${12 + i * 4} 0 ${24 + i * 8}`}
            fill="none"
            stroke={c.leaf}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0], x: [0, 4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}

      {/* Idle cue: a little "…" — hover the shop and he speaks */}
      {!talking && !reduce && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -2] }} transition={{ duration: 2.6, times: [0, 0.15, 0.8, 1], repeat: Infinity, repeatDelay: 3.5, delay: 3 }}>
          <path d="M890 318 h24 a7 7 0 0 1 7 7 v0 a7 7 0 0 1 -7 7 h-16 l-6 5 l0 -5 h-2 a7 7 0 0 1 -7 -7 v0 a7 7 0 0 1 7 -7 z" fill={c.cream} stroke={c.ink} strokeWidth="1.1" />
          {[898, 904, 910].map((x, i) => (
            <motion.circle key={x} cx={x} cy="325" r="1.4" fill={c.ink} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </motion.g>
      )}

      {/* His phone, held in both hands over the counter: HelloKhata is open on it */}
      <g filter="url(#hk-wobble)">
        <P d={s.curve([[821, 404], [826, 417], [837, 421], [845, 418]], 0.3)} w={1.3} />
        <P d={s.curve([[898, 398], [893, 413], [883, 420], [875, 419]], 0.3)} w={1.3} />
        <Occlude d="M851 390 h18 a4 4 0 0 1 4 4 v32 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4 v-32 a4 4 0 0 1 4 -4 z" />
        <path d="M851 390 h18 a4 4 0 0 1 4 4 v32 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4 v-32 a4 4 0 0 1 4 -4 z" fill={c.ink} fillOpacity="0.85" />
        <P d={s.rect(847, 390, 26, 40, 0.3)} w={1.2} />
      </g>
      <rect x="849.5" y="394" width="21" height="32" rx="1.5" fill="var(--color-forest-2)" />
      <motion.rect x="849.5" y="394" width="21" height="32" rx="1.5" fill="var(--color-leaf-glow)" animate={{ opacity: talking ? 0.22 : 0.1 }} transition={{ duration: 0.3 }} />
      {/* Screen: today's total and a couple of entries; voice bars while he speaks */}
      <rect x="852" y="397" width="10" height="2.4" rx="1" fill="var(--color-leaf-glow)" />
      <rect x="852" y="401.5" width="15" height="1.6" rx="0.8" fill={c.cream} fillOpacity="0.5" />
      {talking && !reduce ? (
        <g>
          {[853.5, 857.5, 861.5, 865.5].map((x, i) => (
            <motion.rect key={x} x={x} width="2" rx="1" fill="var(--color-leaf-glow)" animate={{ y: [413, 408, 411, 406, 413], height: [2, 12, 6, 14, 2] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }} />
          ))}
        </g>
      ) : (
        <g fill={c.cream} fillOpacity="0.4">
          <rect x="852" y="407" width="15" height="2.4" rx="1" />
          <rect x="852" y="411.5" width="12" height="2.4" rx="1" />
          <rect x="852" y="416" width="14" height="2.4" rx="1" />
        </g>
      )}
      <circle cx="860" cy="422.5" r="2" fill={talking ? c.vermilion : "var(--color-leaf-glow)"} />
      {!talking && !reduce && (
        <motion.circle cx="858" cy="412" r="2" fill="none" stroke={c.cream} strokeWidth="0.8" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.6, 2] }} transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 3.1, delay: 2 }} style={{ originX: 0.5, originY: 0.5 }} />
      )}
      {/* Hands around the phone; the right thumb taps */}
      <ellipse cx="847" cy="417" rx="5" ry="5.5" fill={c.clay} fillOpacity="0.42" stroke={c.ink} strokeWidth="1.2" />
      <ellipse cx="873" cy="418" rx="5" ry="5.5" fill={c.clay} fillOpacity="0.42" stroke={c.ink} strokeWidth="1.2" />
      <path d="M849 414 q4 -1 6 -3" fill="none" stroke={c.ink} strokeWidth="1.1" strokeLinecap="round" />
      <motion.path
        d="M871 415 q-5 -2 -9 -4"
        fill="none"
        stroke={c.ink}
        strokeWidth="1.1"
        strokeLinecap="round"
        animate={reduce || talking ? undefined : { rotate: [0, 0, -14, 0, 0] }}
        transition={{ duration: 3.8, times: [0, 0.5, 0.55, 0.6, 1], repeat: Infinity, delay: 1.5 }}
        style={{ originX: 1, originY: 0.5 }}
      />
    </motion.g>
  );
}
