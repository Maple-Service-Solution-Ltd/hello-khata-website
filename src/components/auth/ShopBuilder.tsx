"use client";

import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { categoryAccent, type CategorySlug } from "@/content/site";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { Person, Section } from "@/components/illustrations/InkPeople";
import { useAuthScene, initialSignUp } from "./AuthSceneContext";

/**
 * Get started: "দোকান সাজানো". The visitor's shop is built from what they type. An empty plot waits with chalk lines;
 * picking a kind of business raises that shop; the business name is painted onto the signboard as it is typed, the
 * owner's name goes on the chalkboard on the footpath and the district on the street sign; a valid phone number lights
 * the shopkeeper's phone, a stronger password lights more bulbs, and agreeing to the terms ties a ribbon across the
 * door. Only when the account is really created is the ribbon cut and marigold petals fall.
 */

const W = 560;
const H = 600;
const TOP = 178;
const FLOOR = 470;

/** What fills each kind of shop. */
const Interior = memo(function Interior({ type }: { type: CategorySlug }) {
  const s = new Sketch(7400 + type.length * 7);
  const shelves = (rows: number[], tones: string[]) =>
    rows.map((y, r) => (
      <g key={y}>
        <P d={s.line(80, y, 480, y, 0.4)} w={1.6} />
        {Array.from({ length: 11 }, (_, i) => {
          const x = 88 + i * 35;
          const h = 24 + ((i + r) % 3) * 6;
          return (
            <g key={i}>
              <Occlude d={box(x, y - h, 24, h)} />
              <Wash d={box(x, y - h, 24, h)} fill={tones[(i + r * 2) % tones.length]} o={0.6} />
              <P d={s.rect(x, y - h, 24, h, 0.3, 1)} w={0.8} />
            </g>
          );
        })}
      </g>
    ));
  if (type === "pharmacy")
    return (
      <g>
        {Array.from({ length: 18 }, (_, i) => {
          const x = 96 + (i % 6) * 62;
          const y = 200 + Math.floor(i / 6) * 50;
          return (
            <g key={i}>
              <Occlude d={box(x, y, 54, 42)} />
              <Wash d={box(x, y, 54, 42)} fill={c.clay} o={0.25} />
              <P d={s.rect(x, y, 54, 42, 0.25, 1)} w={0.8} />
              <path d={box(x + 12, y + 8, 30, 9)} fill={c.cream} stroke={c.ink} strokeWidth="0.5" />
              <circle cx={x + 27} cy={y + 30} r="2" fill={c.cream} stroke={c.ink} strokeWidth="0.6" />
            </g>
          );
        })}
      </g>
    );
  if (type === "supershop")
    return (
      <g>
        {shelves([228, 284, 340], [c.vermilion, c.marigold, c.sky, c.leafWash, c.plum, c.rice])}
        <g transform="translate(440 384)">
          <P d={s.poly([[-24, -22], [20, -22], [14, 0], [-18, 0]], true, 0.3)} w={1.1} />
          <P d={s.line(-30, -30, -24, -22, 0.2, 1)} w={1.1} />
          <circle cx="-12" cy="5" r="3.5" fill="none" stroke={c.ink} strokeWidth="1" />
          <circle cx="10" cy="5" r="3.5" fill="none" stroke={c.ink} strokeWidth="1" />
        </g>
      </g>
    );
  if (type === "online-store")
    return (
      <g>
        {/* A room at home: window with curtains, parcels ready to go */}
        <Wash d={box(96, 200, 120, 100)} fill={c.sky} o={0.35} />
        <P d={s.rect(96, 200, 120, 100, 0.4)} w={1.2} />
        <P d={s.line(156, 200, 156, 300, 0.2, 1)} w={0.8} />
        <Wash d="M90 196 C100 240 96 280 104 306 L84 306 L84 196 Z" fill={c.plum} o={0.55} />
        <Wash d="M222 196 C212 240 216 280 208 306 L228 306 L228 196 Z" fill={c.plum} o={0.55} />
        {[
          [370, 330, 54, 40],
          [420, 318, 46, 52],
          [394, 290, 40, 28],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <Occlude d={box(x, y, w, h)} />
            <Wash d={box(x, y, w, h)} fill={c.clay} o={0.6} />
            <P d={s.rect(x, y, w, h, 0.3)} w={1} />
            <P d={s.line(x + w / 2, y, x + w / 2, y + h, 0.2, 1)} w={0.6} o={0.6} />
          </g>
        ))}
        {/* A small table with the laptop the shop runs on */}
        <P d={s.line(250, 300, 340, 300, 0.3)} w={1.4} />
        <rect x="266" y="270" width="52" height="30" rx="3" fill={c.ink} fillOpacity="0.85" />
        <rect x="270" y="274" width="44" height="22" rx="1.5" fill={c.cream} />
        <rect x="274" y="278" width="16" height="14" fill={c.marigold} fillOpacity="0.7" />
        <rect x="294" y="278" width="16" height="14" fill={c.sky} fillOpacity="0.7" />
      </g>
    );
  if (type === "f-commerce")
    return (
      <g>
        {/* A ring light on a stand, a rack of clothes, the phone on its tripod */}
        <circle cx="140" cy="250" r="34" fill="none" stroke={c.ink} strokeWidth="5" strokeOpacity="0.8" />
        <circle cx="140" cy="250" r="34" fill="none" stroke="#FFF6D6" strokeWidth="2.5" />
        <P d={s.line(140, 284, 140, 400, 0.2)} w={1.4} />
        <P d={s.line(250, 210, 430, 210, 0.3)} w={1.6} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 264 + i * 30;
          const tone = [c.vermilion, c.plum, c.sky, c.marigold, c.teal, c.leafWash][i];
          return (
            <g key={i}>
              <P d={s.curve([[x + 8, 210], [x + 8, 216], [x, 222]], 0.2)} w={0.7} />
              <Wash d={`M${x - 6} 222 h28 l4 70 h-36 z`} fill={tone} o={0.6} />
              <P d={s.poly([[x - 6, 222], [x + 22, 222], [x + 26, 292], [x - 10, 292]], true, 0.3)} w={0.9} />
            </g>
          );
        })}
      </g>
    );
  if (type === "other")
    return (
      <g>
        {shelves([240, 300], [c.clay, c.rice, c.sky, c.cream])}
      </g>
    );
  return <g>{shelves([232, 292], [c.marigold, c.rice, c.leafWash, c.clay, c.vermilion, c.cream])}</g>;
});

/** Shrinks a long name to fit the signboard. */
const fit = (text: string, max: number, size: number) => (text.length * size * 0.55 > max ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const } : {});

export function ShopBuilder() {
  const { t } = useI18n();
  const m = t.auth.scene.signUp;
  const scene = useAuthScene();
  const st = scene?.signUp ?? initialSignUp;
  const reduce = !!useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);
  const s = new Sketch(7451);
  const type = st.type;
  const accent = type ? categoryAccent[type] : null;
  const open = st.status === "open";
  const hasOwner = !!st.owner;
  const message = open ? `${m.opened} ${m.welcome}` : st.agree ? m.ribbon : type ? m.building : "";
  const petals = Array.from({ length: 18 }, (_, i) => ({ x: 70 + ((i * 97) % 420), d: 1.6 + (i % 5) * 0.25, delay: (i % 6) * 0.18, r: (i * 47) % 360 }));

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="block h-[330px] w-full text-ink sm:h-[380px] lg:h-auto lg:[aspect-ratio:560/600]" role="img" aria-label={m.alt}>
        {/* Day sky, two clouds */}
        <path d={box(0, 0, W, 172)} fill="#BFDDF2" opacity="0.7" filter="url(#hk-wash)" />
        <g filter="url(#hk-wobble)" opacity="0.7">
          <path d="M60 120 q10 -16 26 -8 q8 -14 24 -6 q16 -2 14 12 z" fill={c.cream} stroke={c.ink} strokeWidth="0.8" />
          <path d="M420 70 q8 -12 22 -6 q8 -12 22 -4 q14 0 12 10 z" fill={c.cream} stroke={c.ink} strokeWidth="0.8" />
        </g>
        <AnimatePresence mode="wait" initial={false}>
          <motion.text key={open ? "open" : st.step} x="32" y="72" fontSize={open ? 30 : 22} fill={open ? c.vermilion : c.ink} className="font-hand" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {open ? m.opened : m.captions[st.step]}
          </motion.text>
        </AnimatePresence>

        {/* Ground, footpath */}
        <g filter="url(#hk-wobble)">
          <Wash d={box(0, FLOOR, W, H - FLOOR)} fill={c.clay} o={0.16} />
          <P d={s.line(0, 512, W, 512, 0.6)} w={1.3} />
          {[40, 160, 300, 430].map((x) => (
            <P key={x} d={s.line(x, 528, x + 30, 528, 0.3, 1)} w={0.6} o={0.5} />
          ))}
        </g>

        {/* The empty plot, until a kind of shop is picked */}
        <AnimatePresence>
          {!type && (
            <motion.g key="plot" initial={false} exit={{ opacity: 0 }} transition={{ duration: dur(0.4) }}>
              <rect x="70" y="140" width="420" height="340" fill="none" stroke={c.ink} strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="8 7" />
              {[
                [70, 140],
                [490, 140],
                [70, 480],
                [490, 480],
              ].map(([x, y], i) => (
                <path key={i} d={`M${x} ${y - 10} v20 M${x - 10} ${y} h20`} stroke={c.vermilion} strokeWidth="2" strokeLinecap="round" />
              ))}
              <text x="280" y="318" textAnchor="middle" fontSize="22" fill={c.ink} fillOpacity="0.55" className="font-hand">
                {m.plot}
              </text>
              <g filter="url(#hk-wobble)">
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <Wash d={box(100 + (i % 3) * 22 + (i > 2 ? 11 : 0), 470 - (i > 2 ? 22 : 11), 20, 10)} fill={c.vermilion} o={0.55} />
                    <P d={s.rect(100 + (i % 3) * 22 + (i > 2 ? 11 : 0), 470 - (i > 2 ? 22 : 11), 20, 10, 0.2, 1)} w={0.7} />
                  </g>
                ))}
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* The shop rises */}
        <AnimatePresence mode="wait">
          {type && accent && (
            <motion.g key={type} initial={reduce ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} transition={{ duration: dur(0.55), ease: [0.22, 1, 0.36, 1] }}>
              <g filter="url(#hk-wobble)">
                <Occlude d={box(62, TOP, 436, FLOOR - TOP)} />
                <Wash d={box(62, TOP, 436, FLOOR - TOP)} fill={accent.soft} o={0.6} />
              </g>
              <Interior type={type} />
              <g filter="url(#hk-wobble)">
                <Section x={40} y={136} w={480} h={12} />
                <Section x={40} y={148} w={22} h={FLOOR - 148} />
                <Section x={498} y={148} w={22} h={FLOOR - 148} />
                {/* Striped awning in the shop's colour */}
                {Array.from({ length: 12 }, (_, i) => {
                  const x = 62 + i * (436 / 12);
                  const wv = 436 / 12;
                  return <path key={i} d={`M${x} 148 h${wv} v22 q${-wv / 2} 10 ${-wv} 0 z`} fill={i % 2 ? c.cream : accent.tint} fillOpacity={i % 2 ? 0.9 : 0.7} stroke={c.ink} strokeWidth="0.7" />;
                })}
                <Section x={34} y={FLOOR} w={492} h={10} />
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* The signboard, painted with the business name as it is typed */}
        {type && accent && (
          <g filter="url(#hk-wobble)">
            <P d={s.line(160, 132, 160, 136, 0.2, 1)} w={1.1} />
            <P d={s.line(400, 132, 400, 136, 0.2, 1)} w={1.1} />
            <Occlude d={box(100, 80, 360, 52)} />
            <path d={box(100, 80, 360, 52)} fill={accent.ink} fillOpacity="0.92" />
            <P d={s.rect(100, 80, 360, 52, 0.5)} w={1.3} />
            <P d={s.rect(107, 86, 346, 40, 0.3, 1)} w={0.6} c={c.cream} o={0.7} />
          </g>
        )}
        {type && (
          <text x="280" y="114" textAnchor="middle" fontSize="23" fill={c.cream} fillOpacity={st.name ? 1 : 0.55} style={{ fontFamily: "var(--font-tiro)" }} {...fit(st.name || m.sign, 320, 23)}>
            {st.name || m.sign}
          </text>
        )}

        {/* Bulbs under the awning: one per point of password strength */}
        {type &&
          [180, 280, 380].map((x, i) => {
            const lit = i < st.strength;
            return (
              <g key={x}>
                <path d={`M${x} 172 V184`} stroke={c.ink} strokeWidth="0.7" />
                {lit && <circle cx={x} cy="191" r="16" fill="#FFE58A" fillOpacity="0.35" />}
                <ellipse cx={x} cy="191" rx="5.5" ry="6.5" fill={lit ? "#FFE58A" : c.cream} stroke={c.ink} strokeWidth="0.8" style={{ transition: "fill 0.3s" }} />
              </g>
            );
          })}

        {/* The shopkeeper steps behind the counter once the owner's name is in */}
        <AnimatePresence>
          {type && hasOwner && (
            <motion.g key="keeper" initial={reduce ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: dur(0.7), ease: "easeOut" }}>
              <g transform="translate(280 452) scale(1.35)">
                <Person seed={7461} shirt={c.cream} pants={c.ink} hair="short" arms={false}>
                  <path d="M-10 -56 C-14 -48 -10 -46 10 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M10 -56 C15 -50 16 -48 16 -51" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                </Person>
              </g>
              <g transform="translate(301 378)">
                <rect x="-6" y="-10" width="12" height="19" rx="2" fill={c.ink} fillOpacity="0.88" />
                <rect x="-4.6" y="-8" width="9.2" height="14.6" rx="1" fill={st.phoneOk ? "var(--color-leaf-glow)" : "var(--color-forest)"} style={{ transition: "fill 0.4s" }} />
                {st.phoneOk && !reduce && <circle r="12" fill="none" stroke="var(--color-leaf-glow)" strokeWidth="1.5" className="hk-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Counter */}
        {type && (
          <g filter="url(#hk-wobble)">
            <Occlude d={box(150, 392, 260, FLOOR - 392)} />
            <Wash d={box(150, 400, 260, FLOOR - 400)} fill={c.clay} o={0.5} />
            <P d={s.rect(150, 400, 260, FLOOR - 400, 0.4)} w={1.2} />
            <Occlude d={box(144, 392, 272, 8)} />
            <Wash d={box(144, 392, 272, 8)} fill={c.clay} o={0.7} />
            <P d={s.rect(144, 392, 272, 8, 0.3)} w={1.2} />
          </g>
        )}

        {/* Chalkboard on the footpath with the owner's name */}
        <AnimatePresence>
          {type && hasOwner && (
            <motion.g key="board" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: dur(0.4) }}>
              <g filter="url(#hk-wobble)">
                <P d={s.line(14, 516, 30, 470, 0.2)} w={1.2} />
                <P d={s.line(118, 516, 102, 470, 0.2)} w={1.2} />
                <path d={box(22, 462, 88, 44)} fill="#2f3a33" />
                <P d={s.rect(22, 462, 88, 44, 0.3)} w={1.2} />
              </g>
              <text x="66" y="479" textAnchor="middle" fontSize="9" fill={c.cream} fillOpacity="0.7" className="font-hand">
                {m.owner}
              </text>
              <text x="66" y="497" textAnchor="middle" fontSize="13" fill={c.cream} className="font-hand" {...fit(st.owner, 78, 13)}>
                {st.owner}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Lamp post with the district on a street sign */}
        <AnimatePresence>
          {type && st.district && (
            <motion.g key="lamp" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: dur(0.4) }}>
              <g filter="url(#hk-wobble)">
                <P d={s.line(540, 516, 540, 320, 0.3)} w={2} />
                <P d={s.curve([[540, 320], [540, 304], [526, 300]], 0.2)} w={1.6} />
                <path d="M516 300 h20 l-4 8 h-12 z" fill={c.ink} fillOpacity="0.7" />
                <path d={box(486, 346, 70, 22)} fill="#1f6fb2" />
                <P d={s.rect(486, 346, 70, 22, 0.2)} w={1} />
              </g>
              <text x="521" y="361.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }} {...fit(st.district, 62, 11)}>
                {st.district}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* A marigold garland and a red ribbon across the door, once the terms are agreed */}
        <AnimatePresence>
          {type && st.agree && (
            <motion.g key="ribbon" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: dur(0.4) }}>
              {Array.from({ length: 21 }, (_, i) => {
                const x = 66 + i * 21.4;
                const y = 182 + Math.sin((i / 20) * Math.PI) * 18;
                return <circle key={i} cx={x} cy={y} r="4.4" fill={i % 2 ? c.marigold : c.vermilion} fillOpacity="0.85" stroke={c.ink} strokeWidth="0.5" />;
              })}
              <motion.path d="M62 306 C 140 314, 210 312, 280 306" fill="none" stroke="#d32f2f" strokeWidth="5" strokeLinecap="round" initial={false} animate={open ? { rotate: 76, opacity: 0.9 } : { rotate: 0, opacity: 1 }} transition={{ duration: dur(0.8), ease: "easeIn" }} style={{ transformBox: "view-box", transformOrigin: "62px 306px" }} />
              <motion.path d="M280 306 C 350 300, 420 298, 498 306" fill="none" stroke="#d32f2f" strokeWidth="5" strokeLinecap="round" initial={false} animate={open ? { rotate: -76, opacity: 0.9 } : { rotate: 0, opacity: 1 }} transition={{ duration: dur(0.8), ease: "easeIn" }} style={{ transformBox: "view-box", transformOrigin: "498px 306px" }} />
              <motion.g initial={false} animate={open ? { y: 160, opacity: 0, rotate: 30 } : { y: 0, opacity: 1, rotate: 0 }} transition={{ duration: dur(0.9), ease: "easeIn" }} style={{ transformBox: "view-box", transformOrigin: "280px 306px" }}>
                <path d="M280 306 l-18 -12 l2 24 z M280 306 l18 -12 l-2 24 z" fill="#d32f2f" stroke={c.ink} strokeWidth="0.8" />
                <circle cx="280" cy="306" r="4" fill="#b71c1c" stroke={c.ink} strokeWidth="0.8" />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Grand opening: petals fall, a welcome on the phone */}
        {open && !reduce &&
          petals.map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={140} r="4" fill={i % 3 ? c.marigold : c.vermilion} initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 380], opacity: [0, 1, 1, 0], x: [0, i % 2 ? 14 : -14, 0] }} transition={{ duration: p.d, delay: 0.5 + p.delay, repeat: 2, ease: "easeIn" }} />
          ))}
        <AnimatePresence>
          {open && (
            <motion.g key="welcome" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: dur(1), duration: 0.5 }}>
              <rect x="314" y="318" width="190" height="34" rx="12" fill="var(--color-leaf)" />
              <path d="M318 344 l-10 8 l14 -4 z" fill="var(--color-leaf)" />
              <text x="409" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }} {...fit(m.welcome, 176, 14)}>
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
