"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { Sketch } from "@/lib/sketch";
import { fmtTaka, interpolate } from "@/lib/format";
import { today } from "@/content/demo-data";
import { P, Wash, Occlude, box, palette as c } from "@/components/illustrations/ink";
import { Person } from "@/components/illustrations/InkPeople";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MicIcon } from "@/components/home/HeroStage";
import { FitBox } from "./AssistantPhone";

/* ------------------------------------------------------------------ */
/* Your business, understood: four vignettes feeding one assistant      */
/* ------------------------------------------------------------------ */

function Vignette({ i }: { i: number }) {
  const s = new Sketch(9100 + i * 13);
  return (
    <svg viewBox="0 0 120 84" className="h-20 w-auto text-ink" aria-hidden="true">
      <g filter="url(#hk-wobble)">
        {i === 0 && (
          <>
            {/* A receipt and a rice sack */}
            <path d="M14 76 V14 h40 v62 l-5 -3 l-5 3 l-5 -3 l-5 3 l-5 -3 l-5 3 l-5 -3 z" fill={c.cream} stroke={c.ink} strokeWidth="1.1" strokeLinejoin="round" />
            {[24, 32, 40, 48].map((y) => (
              <P key={y} d={s.line(20, y, 48, y, 0.2, 1)} w={0.6} o={0.6} />
            ))}
            <P d={s.line(20, 60, 48, 60, 0.2)} w={1.2} c={c.leafDeep} />
            <Wash d="M66 78 C62 62 64 48 70 42 H98 C104 48 106 62 102 78 Z" fill={c.rice} o={0.85} />
            <P d={s.curve([[66, 78], [62, 62], [64, 48], [70, 42], [98, 42], [104, 48], [106, 62], [102, 78], [66, 78]], 0.3)} w={1.1} />
            <Wash d="M70 42 C76 32 92 32 98 42 Z" fill={c.cream} o={0.9} />
            <P d={s.curve([[70, 42], [78, 33], [90, 33], [98, 42]], 0.2)} w={0.9} />
          </>
        )}
        {i === 1 && (
          <>
            {/* A shelf of jars; one nearly empty */}
            <P d={s.line(8, 70, 112, 70, 0.4)} w={1.5} />
            {[0, 1, 2, 3].map((k) => {
              const x = 14 + k * 25;
              const fill = k === 2 ? 0.25 : 0.85;
              return (
                <g key={k}>
                  <Occlude d={box(x, 34, 20, 36)} />
                  <Wash d={box(x + 2, 34 + 34 * (1 - fill), 16, 34 * fill)} fill={[c.marigold, c.rice, c.vermilion, c.leafWash][k]} o={0.7} />
                  <P d={s.rect(x, 34, 20, 36, 0.3, 1)} w={0.9} />
                  <path d={box(x + 3, 29, 14, 5)} fill={c.ink} fillOpacity="0.5" />
                </g>
              );
            })}
            <path d="M64 22 l4 6 h-8 z" fill={c.vermilion} />
          </>
        )}
        {i === 2 && (
          <>
            {/* A khata page of names and amounts owed */}
            <Occlude d={box(18, 10, 84, 66)} />
            <Wash d={box(18, 10, 84, 66)} fill={c.rice} o={0.45} />
            <P d={s.rect(18, 10, 84, 66, 0.3)} w={1.1} />
            <P d={s.line(32, 12, 32, 74, 0.2, 1)} w={0.6} c={c.vermilion} o={0.7} />
            {[24, 38, 52, 66].map((y, k) => (
              <g key={y}>
                <P d={s.line(36, y, 36 + 26 + (k % 2) * 8, y, 0.3, 1)} w={0.8} />
                <P d={s.line(78, y, 96, y, 0.3, 1)} w={1.2} c={c.vermilion} />
              </g>
            ))}
          </>
        )}
        {i === 3 && (
          <>
            {/* A report page: bars and a little pie */}
            <Occlude d={box(14, 8, 92, 70)} />
            <path d={box(14, 8, 92, 70)} fill={c.cream} />
            <P d={s.rect(14, 8, 92, 70, 0.3)} w={1.1} />
            {[18, 26, 22, 34, 30, 40].map((h, k) => (
              <g key={k}>
                <Wash d={box(22 + k * 9, 66 - h, 6, h)} fill={k === 5 ? c.leaf : c.leafWash} o={k === 5 ? 0.9 : 0.6} />
                <P d={s.rect(22 + k * 9, 66 - h, 6, h, 0.2, 1)} w={0.6} />
              </g>
            ))}
            <circle cx="90" cy="26" r="10" fill={c.marigold} fillOpacity="0.6" stroke={c.ink} strokeWidth="0.9" />
            <path d="M90 26 V16 A10 10 0 0 1 99 30 Z" fill={c.vermilion} fillOpacity="0.7" stroke={c.ink} strokeWidth="0.7" />
          </>
        )}
      </g>
    </svg>
  );
}

function Emblem({ label, reduce }: { label: string; reduce: boolean }) {
  return (
    <div className="relative mx-auto flex size-40 flex-col items-center justify-center">
      {!reduce && <span className="hk-ring absolute inset-6 rounded-full border-2 border-leaf/40" aria-hidden="true" />}
      <svg viewBox="0 0 160 160" className="absolute inset-0 text-ink" aria-hidden="true">
        <g filter="url(#hk-wobble)">
          <circle cx="80" cy="80" r="62" fill={c.cream} stroke={c.ink} strokeWidth="1.3" />
          <circle cx="80" cy="80" r="54" fill="none" stroke={c.leafDeep} strokeWidth="0.8" strokeDasharray="3 5" />
        </g>
      </svg>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-leaf text-white shadow-[var(--shadow-card)]">
        <MicIcon className="size-6" />
      </span>
      <span className="font-hand relative mt-1.5 text-xl text-leaf-deep">{label}</span>
    </div>
  );
}

export function AssistantUnderstood() {
  const { t } = useI18n();
  const u = t.features.assistantPage.understood;
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  // Curves from each vignette to the assistant (viewBox 1000 × 560, stretched over the grid)
  const flows = ["M330 120 C 420 120, 430 260, 500 280", "M330 440 C 420 440, 430 300, 500 280", "M670 120 C 580 120, 570 260, 500 280", "M670 440 C 580 440, 570 300, 500 280"];
  const cell = (i: number) => (
    <motion.div
      key={i}
      className={`flex gap-4 ${i >= 2 ? "lg:flex-row-reverse lg:text-right" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shrink-0">
        <Vignette i={i} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-ink">{u.items[i].title}</h3>
        <p className="mt-1 text-ink-soft">{u.items[i].body}</p>
        <p className="font-hand mt-2 text-lg text-leaf-deep">“{u.items[i].ask}”</p>
      </div>
    </motion.div>
  );
  return (
    <section aria-labelledby="as-understood" className="paper-cream py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{u.eyebrow}</Eyebrow>
          <h2 id="as-understood" className="font-display mt-4 text-[2rem] leading-snug text-balance sm:text-5xl">
            {u.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-ink-soft">{u.lead}</p>
        </div>
        <div ref={ref} className="relative mt-14 grid gap-10 lg:grid-cols-[1fr_12rem_1fr] lg:grid-rows-2 lg:gap-x-6 lg:gap-y-16">
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
            {flows.map((d, i) => (
              <g key={i}>
                <motion.path d={d} fill="none" stroke={c.leafDeep} strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" initial={reduce ? false : { pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined} transition={{ delay: 0.3 + i * 0.12, duration: 0.9 }} />
                {inView && !reduce && (
                  <circle r="4" fill={c.leaf}>
                    <animateMotion dur="2.4s" repeatCount="indefinite" path={d} begin={`${i * 0.6}s`} />
                  </circle>
                )}
              </g>
            ))}
          </svg>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <Emblem label={u.center} reduce={reduce} />
          </div>
          <div className="border-l-2 border-dashed border-leaf/30 pl-6 lg:col-start-1 lg:row-start-1 lg:border-0 lg:pl-0">{cell(0)}</div>
          <div className="border-l-2 border-dashed border-leaf/30 pl-6 lg:col-start-1 lg:row-start-2 lg:border-0 lg:pl-0">{cell(2)}</div>
          <div className="border-l-2 border-dashed border-leaf/30 pl-6 lg:col-start-3 lg:row-start-1 lg:border-0 lg:pl-0">{cell(1)}</div>
          <div className="border-l-2 border-dashed border-leaf/30 pl-6 lg:col-start-3 lg:row-start-2 lg:border-0 lg:pl-0">{cell(3)}</div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Built for your language: three ways of asking, one answer            */
/* ------------------------------------------------------------------ */

export function AssistantLanguage() {
  const { t, locale } = useI18n();
  const l = t.features.assistantPage.language;
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const show = reduce || inView;
  const s = new Sketch(9201);
  const bubbles = [30, 120, 210];
  return (
    <section aria-labelledby="as-language" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>{l.eyebrow}</Eyebrow>
          <h2 id="as-language" className="font-display mt-4 text-[2.1rem] leading-[1.25] sm:text-5xl sm:leading-[1.2]">
            <span className="block">{l.title1}</span>
            <span className="block text-ink-soft">{l.title2}</span>
            <span className="block text-leaf-deep">{l.title3}</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-lg text-pretty text-ink-soft">{l.lead}</p>
          <p className="mt-6 flex max-w-[30rem] items-start gap-2.5 text-sm text-muted">
            <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-leaf-deep" aria-hidden="true">
              <rect x="4" y="9" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {l.trust}
          </p>
        </div>
        {/* Phones: the same three asks at full size, flowing down into the one answer */}
        <div className="sm:hidden">
          <ol className="space-y-3 border-l-2 border-dashed border-leaf/40 pl-4">
            {l.asks.map((q, i) => (
              <motion.li
                key={q}
                className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-ink/10"
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ delay: i * 0.25, duration: 0.45 }}
              >
                <p className="text-xs font-semibold text-leaf-deep">{l.tags[i]}</p>
                <p className="text-base text-ink" lang={/[a-z]/i.test(q) ? "en" : "bn"}>
                  {q}
                </p>
              </motion.li>
            ))}
          </ol>
          <motion.p
            className="mt-3 rounded-2xl bg-leaf px-4 py-3 text-lg font-bold text-white shadow-[var(--shadow-float)]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.45 }}
          >
            {interpolate(l.answer, { total: fmtTaka(today.sales, locale) })}
          </motion.p>
        </div>
        <div ref={ref} className="mx-auto hidden w-full max-w-[540px] sm:block">
          <FitBox w={540} h={470}>
            <svg viewBox="0 0 540 470" className="absolute inset-0 h-full w-full text-ink" role="img" aria-label={l.alt}>
              {/* The shopkeeper behind his counter, phone in hand, a glass of tea beside him */}
              <g filter="url(#hk-wobble)" opacity="0.55">
                <P d={s.line(330, 250, 540, 250, 0.4)} w={1.2} />
                {[0, 1, 2, 3, 4].map((k) => (
                  <g key={k}>
                    <Wash d={box(344 + k * 38, 216, 24, 34)} fill={[c.marigold, c.rice, c.leafWash, c.clay, c.vermilion][k]} o={0.5} />
                    <P d={s.rect(344 + k * 38, 216, 24, 34, 0.3, 1)} w={0.7} />
                  </g>
                ))}
              </g>
              <g transform="translate(450 470) scale(2.05)">
                <Person seed={9211} shirt={c.leafWash} pants={c.ink} hair="short" look={-1} arms={false}>
                  <path d="M-10 -56 C-15 -50 -12 -45 -4 -45" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M10 -56 C14 -50 10 -46 2 -46" fill="none" stroke={c.ink} strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M-4.4 -68.4 Q-2.2 -70.2 0 -69.2 Q2.2 -70.2 4.4 -68.4 Q2.2 -67.7 0 -68.2 Q-2.2 -67.7 -4.4 -68.4 Z" fill={c.ink} fillOpacity="0.75" />
                  <rect x="-5" y="-55" width="8" height="13" rx="1.6" fill={c.ink} />
                  <rect x="-4" y="-53.8" width="6" height="10" rx="1" fill="var(--color-forest)" />
                  <circle cx="-1" cy="-48.8" r="1.6" fill="var(--color-leaf-glow)" />
                </Person>
              </g>
              <g filter="url(#hk-wobble)">
                <Occlude d={box(330, 410, 210, 60)} />
                <Wash d={box(330, 410, 210, 60)} fill={c.clay} o={0.45} />
                <P d={s.rect(330, 410, 210, 60, 0.4)} w={1.2} />
                {[380, 430, 480].map((x) => (
                  <P key={x} d={s.line(x, 414, x, 468, 0.3, 1)} w={0.6} o={0.55} />
                ))}
                <Occlude d={box(322, 402, 226, 9)} />
                <Wash d={box(322, 402, 226, 9)} fill={c.clay} o={0.7} />
                <P d={s.rect(322, 402, 226, 9, 0.3)} w={1.1} />
              </g>
              <g filter="url(#hk-wobble)" transform="translate(372 402)">
                <path d="M-9 -22 L-7 0 H7 L9 -22 Z" fill={c.cream} />
                <Wash d="M-8 -15 L-7 0 H7 L8 -15 Z" fill={c.clay} o={0.75} />
                <path d="M-9 -22 L-7 0 H7 L9 -22 Z" fill="none" stroke={c.ink} strokeWidth="1" strokeLinejoin="round" />
              </g>
              {/* His words, three ways, all flowing to one answer */}
              {bubbles.map((y, i) => (
                <motion.path
                  key={i}
                  d={`M300 ${y + 26} C 360 ${y + 26}, 330 ${y + 140 - i * 30}, 270 360`}
                  fill="none"
                  stroke={c.leafDeep}
                  strokeOpacity="0.45"
                  strokeWidth="1.3"
                  strokeDasharray="3 5"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={show ? { pathLength: 1 } : undefined}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.8 }}
                />
              ))}
            </svg>
            {l.asks.map((q, i) => (
              <motion.div
                key={q}
                className="absolute left-0 w-[300px] rounded-2xl rounded-br-md bg-white px-4 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-ink/10"
                style={{ top: bubbles[i] }}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={show ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.2 + i * 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[0.68rem] font-semibold text-leaf-deep">{l.tags[i]}</p>
                <p className="text-[1.02rem] text-ink" lang={/[a-z]/i.test(q) ? "en" : "bn"}>
                  {q}
                </p>
              </motion.div>
            ))}
            <motion.div
              className="absolute top-[340px] left-[60px] w-[260px] rounded-2xl rounded-bl-md bg-leaf px-4 py-3 text-white shadow-[var(--shadow-float)]"
              initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
              animate={show ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ delay: 1.7, type: "spring", stiffness: 200, damping: 18 }}
            >
              <p className="text-lg font-bold">{interpolate(l.answer, { total: fmtTaka(today.sales, locale) })}</p>
            </motion.div>
          </FitBox>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final call: the khata rests, the assistant listens                   */
/* ------------------------------------------------------------------ */

export function AssistantFinal() {
  const { t, locale } = useI18n();
  const f = t.features.assistantPage.final;
  const reduce = !!useReducedMotion();
  const s = new Sketch(9301);
  return (
    <section aria-labelledby="as-final" className="relative overflow-hidden bg-leaf-soft/40 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="as-final" className="font-display text-[2.2rem] leading-[1.25] text-balance sm:text-[3.4rem] sm:leading-[1.15]">
            <span className="block">{f.title1}</span>
            <span className="block text-leaf-deep">{f.title2}</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-lg text-pretty text-ink-soft">{f.body}</p>
          <div className="mt-8">
            <ButtonLink href={`/${locale}/get-started`} size="lg" arrow className="w-full sm:w-auto">
              {f.cta}
            </ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[520px]">
          <FitBox w={520} h={360}>
            <svg viewBox="0 0 520 360" className="absolute inset-0 h-full w-full text-ink" role="img" aria-label={f.alt}>
              <g filter="url(#hk-wobble)">
                {/* Counter */}
                <Wash d={box(0, 290, 520, 70)} fill={c.clay} o={0.3} />
                <P d={s.line(0, 290, 520, 290, 0.5)} w={1.4} />
                {/* The khata, closed and tied with string */}
                <Wash d="M60 290 L76 230 H300 L284 290 Z" fill={c.vermilion} o={0.75} />
                <P d={s.poly([[60, 290], [76, 230], [300, 230], [284, 290]], true, 0.4)} w={1.2} />
                <path d="M62 290 V298 H286 L284 290" fill={c.cream} stroke={c.ink} strokeWidth="1" />
                <P d={s.line(176, 230, 168, 298, 0.3)} w={1.1} c={c.cream} />
                <P d={s.line(70, 262, 292, 262, 0.3)} w={1.1} c={c.cream} />
                <text x="190" y="252" fontSize="15" fill={c.cream} className="font-hand" textAnchor="middle" transform="skewX(-14)">
                  খাতা
                </text>
                {/* Tea */}
                <path d="M376 290 L372 252 H406 L402 290 Z" fill={c.cream} />
                <Wash d="M375 290 L373 262 H405 L403 290 Z" fill={c.clay} o={0.75} />
                <path d="M376 290 L372 252 H406 L402 290 Z" fill="none" stroke={c.ink} strokeWidth="1.1" strokeLinejoin="round" />
              </g>
              {!reduce && <path d="M384 244 q-4 -8 0 -14 q4 -6 0 -12 M396 244 q-4 -7 0 -12" fill="none" stroke={c.ink} strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" className="hk-steam" />}
              {/* The phone, leaning on the khata, ready to listen */}
              <g transform="rotate(-8 250 150)">
                <rect x="196" y="40" width="108" height="200" rx="18" fill={c.ink} />
                <rect x="204" y="52" width="92" height="178" rx="12" fill="var(--color-forest)" />
                <rect x="214" y="70" width="56" height="10" rx="5" fill={c.cream} fillOpacity="0.85" />
                <rect x="226" y="88" width="60" height="22" rx="8" fill="var(--color-leaf)" />
                <rect x="214" y="118" width="48" height="10" rx="5" fill={c.cream} fillOpacity="0.85" />
                <circle cx="250" cy="196" r="17" fill="var(--color-leaf)" />
                <g transform="translate(240 186) scale(0.85)" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="8.5" y="3" width="7" height="12" rx="3.5" />
                  <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
                </g>
                {!reduce && <circle cx="250" cy="196" r="17" fill="none" stroke="var(--color-leaf-glow)" strokeWidth="2" className="hk-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
              </g>
              {/* A hand-drawn voice line running off toward the words */}
              <path d="M180 140 C 150 120, 130 160, 100 140 S 50 120, 20 140" fill="none" stroke={c.leafDeep} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 5" />
            </svg>
          </FitBox>
        </div>
      </Container>
    </section>
  );
}
