"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useI18n } from "@/i18n/client";
import { fmtNumber, fmtTaka, interpolate } from "@/lib/format";
import { products, today, type ProductKey, type UnitKey } from "@/content/demo-data";
import { SCENE_H, SCENE_W } from "@/components/illustrations/scene-geometry";
import { HeroAdhan } from "./HeroAdhan";
import { HeroSmoker } from "./HeroSmoker";
import { HeroKite } from "./HeroKite";
import { HeroCat } from "./HeroCat";
import { HeroLaundry } from "./HeroLaundry";
import { HeroShopkeeper } from "./HeroShopkeeper";

/** A sale in the sample data. */
type Sale = { product: ProductKey; qty: number; unit: UnitKey; amount: number };
const priceOf = (k: ProductKey) => products.find((p) => p.key === k)!;
const sale = (product: ProductKey, qty: number): Sale => ({ product, qty, unit: priceOf(product).unit, amount: priceOf(product).price * qty });
/** What the shopkeeper says, one sale at a time. */
const spokenSales = [sale("egg", 12), sale("rice", 2), sale("oil", 1), sale("lentil", 1), sale("tea", 2)];

/** From his mouth down into the phone in his hands (scene units). */
const mouthToPhone = "M862 374 C880 378 882 390 862 398";
const SPEAK_MS = 2000;
const TO_PHONE_MS = 600;
const SHOW_REPLY_MS = 2600;
/** He records a sale on his own every few seconds while the hero is on screen. */
const FIRST_SALE_MS = 1800;
const SALE_EVERY_MS = 8500;

/** Shop hover cursor: a little green microphone. */
const micCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%2316a34a' stroke='white' stroke-width='2'/%3E%3Crect x='12.5' y='7.5' width='7' height='11' rx='3.5' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M9.5 15.5a6.5 6.5 0 0 0 13 0M16 22v3' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 16 16, pointer`;

/**
 * Client stage for the hero illustration. Everything happens inside the street:
 * the shopkeeper says a sale out loud → his words drop as ink into the phone in his hands →
 * the phone answers with a small green note: recorded, and today's new total.
 * It plays on its own every few seconds, and again whenever the shop is hovered or tapped.
 */
export function HeroStage({ back, wires, mid }: { back: React.ReactNode; wires: React.ReactNode; mid: React.ReactNode }) {
  const { t, locale } = useI18n();
  const h = t.home.hero;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const [attention, setAttention] = useState(0);
  const [speech, setSpeech] = useState<{ id: number; text: string } | null>(null);
  const [reply, setReply] = useState<{ id: number; text: string } | null>(null);
  const busy = useRef(false);
  const spokenIdx = useRef(0);
  const total = useRef(today.sales);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const itemLabel = useCallback((s: Sale) => `${t.demo.products[s.product]} ${fmtNumber(s.qty, locale)} ${t.demo.units[s.unit]}`, [t, locale]);

  // His words drop as ink into the phone (SMIL, started on demand)
  const drop = useRef<(SVGAnimationElement | null)[]>([]);

  const speak = () => {
    if (busy.current) return;
    busy.current = true;
    const s = spokenSales[spokenIdx.current++ % spokenSales.length];
    setSpeech({ id: Date.now(), text: interpolate(h.sale.say, { item: itemLabel(s), amount: fmtTaka(s.amount, locale) }) });
    const speakMs = reduce ? 1200 : SPEAK_MS;
    later(() => {
      setSpeech(null);
      drop.current.forEach((a) => a?.beginElement());
    }, speakMs);
    later(
      () => {
        total.current += s.amount;
        setAttention((a) => a + 1);
        setReply({ id: Date.now(), text: interpolate(h.sale.saved, { total: fmtTaka(total.current, locale) }) });
      },
      speakMs + (reduce ? 0 : TO_PHONE_MS),
    );
    later(
      () => {
        setReply(null);
        busy.current = false;
      },
      speakMs + (reduce ? 0 : TO_PHONE_MS) + SHOW_REPLY_MS,
    );
  };
  const speakRef = useRef(speak);
  speakRef.current = speak;

  // Plays on its own while the hero is on screen (not with reduced motion: then it waits for a hover or tap)
  useEffect(() => {
    const stage = ref.current;
    if (reduce || !stage) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage);
    const first = setTimeout(() => visible && speakRef.current(), FIRST_SALE_MS);
    const every = setInterval(() => visible && document.visibilityState === "visible" && speakRef.current(), SALE_EVERY_MS);
    return () => {
      io.disconnect();
      clearTimeout(first);
      clearInterval(every);
    };
  }, [reduce]);

  // Pointer parallax (fine pointers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -6);
  const midX = useTransform(sx, (v) => v * -4);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // Scroll parallax as the hero leaves the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backScroll = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const midScroll = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const backYAll = useTransform(() => backY.get() + backScroll.get());

  const pct = (x: number, y: number) => ({ left: `${(x / SCENE_W) * 100}%`, top: `${(y / SCENE_H) * 100}%` });

  return (
    <div ref={ref} className="relative">
      {/* Scene box. Mobile crops around the shop; desktop shows the whole street. */}
      <div className="relative mx-auto aspect-[4/3.3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[1440/600] lg:overflow-visible">
        <div className="absolute inset-y-0 left-1/2 aspect-[1440/600] h-full -translate-x-[60%] lg:inset-0 lg:left-0 lg:h-auto lg:w-full lg:translate-x-0">
          {/* Three composited layers: parallax moves pre-rendered layers instead of re-running SVG filters each frame.
              The whole street is there from the first paint, so nothing appears on its own while the page loads. */}
          <motion.div className="absolute inset-0 will-change-transform" style={{ x: backX, y: backYAll }}>
            <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="absolute inset-0 h-full w-full overflow-visible text-ink" role="img" aria-label={t.meta.sceneAlt}>
              <g filter="url(#hk-wobble)" opacity="0.2">
                {back}
              </g>
            </svg>
            {/* The adhan: four waves ink the city as they pass, calligraphy written in light, pigeons taking flight */}
            <HeroAdhan city={back} />
            <HeroSmoker />
            <HeroKite />
          </motion.div>
          <motion.div className="absolute inset-0 will-change-transform" style={{ x: midX, y: midScroll }}>
            <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="absolute inset-0 h-full w-full overflow-visible text-ink" aria-hidden="true">
              <g filter="url(#hk-wobble)">
                <g opacity="0.38">{wires}</g>
                {mid}
              </g>
            </svg>
          </motion.div>
          <motion.div className="absolute inset-0 will-change-transform" style={{ x: midX, y: midScroll }}>
            <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="absolute inset-0 h-full w-full overflow-visible text-ink" aria-hidden="true">
              <defs>
                <filter id="hk-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              <HeroShopkeeper talking={!!speech} attention={attention} />
              {[
                { r: 7, fill: "var(--color-leaf-glow)", filter: "url(#hk-glow)" },
                { r: 3.2, fill: "var(--color-cream)" },
              ].map((dot, i) => (
                <circle key={i} r={dot.r} fill={dot.fill} filter={dot.filter} opacity="0">
                  <animateMotion
                    ref={(el) => {
                      drop.current[i * 2] = el as SVGAnimationElement | null;
                    }}
                    dur={`${TO_PHONE_MS}ms`}
                    begin="indefinite"
                    fill="remove"
                    calcMode="spline"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.45 0 0.3 1"
                    path={mouthToPhone}
                  />
                  <animate
                    ref={(el) => {
                      drop.current[i * 2 + 1] = el as SVGAnimationElement | null;
                    }}
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.9;1"
                    dur={`${TO_PHONE_MS}ms`}
                    begin="indefinite"
                    fill="remove"
                  />
                </circle>
              ))}
              <HeroCat />
              <HeroLaundry />
              {/* Hover the shop (or tap it) and the shopkeeper speaks */}
              <rect x="650" y="196" width="430" height="244" fill="transparent" style={{ cursor: micCursor }} onPointerEnter={(e) => e.pointerType === "mouse" && speak()} onClick={speak} />
            </svg>
          </motion.div>

          {/* What he says */}
          <AnimatePresence>
            {speech && (
              <motion.div
                key={speech.id}
                className="pointer-events-none absolute z-10 origin-bottom-left"
                style={pct(872, 304)}
                initial={{ opacity: 0, scale: 0.6, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4, y: 30 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <div className="relative -translate-x-[30%] -translate-y-full rotate-[-2deg] rounded-2xl rounded-bl-sm border-[1.5px] border-ink bg-cream px-3 py-1.5 shadow-[3px_3px_0_rgb(23_34_28/0.15)] lg:px-4 lg:py-2">
                  <p className="font-hand flex flex-wrap gap-x-1 text-[0.72rem] leading-tight whitespace-nowrap text-ink sm:text-sm lg:text-[1.05rem]">
                    {speech.text.split(" ").map((w, i) => (
                      <motion.span key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.16 }}>
                        {w}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* What his phone answers: recorded, with today's new total */}
          <AnimatePresence>
            {reply && (
              // Small screens crop the street around the shop, so the note sits under the phone there; beside it on desktop.
              <motion.div
                key={reply.id}
                className="pointer-events-none absolute top-[72%] left-[59.72%] z-10 origin-top lg:top-[67.33%] lg:left-[61.39%] lg:origin-left"
                initial={{ opacity: 0, scale: 0.5, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
              >
                <p className="-translate-x-1/2 translate-y-1 rounded-2xl bg-leaf lg:translate-x-0 lg:-translate-y-1/2 lg:rounded-tl-sm px-2.5 py-1 text-[0.68rem] leading-tight font-semibold whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgb(21_128_61/0.8)] ring-2 ring-cream sm:text-xs lg:px-3 lg:py-1.5 lg:text-sm">
                  {reply.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only" aria-live="polite">
            {reply?.text ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="8.5" y="3" width="7" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
