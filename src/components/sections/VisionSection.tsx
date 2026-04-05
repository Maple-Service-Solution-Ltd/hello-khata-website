'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/hellokhata/Reveal';
import { HorizonLine } from '@/components/hellokhata/HorizonLine';
import { Download, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

/* ─── Chaos dots (randomly placed for visual effect) ─── */
function ChaosDots() {
  const dots = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 37 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 55}%`,
      size: 3 + ((i * 11) % 5),
      delay: (i * 0.2) % 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: 'rgba(220, 38, 38, 0.4)',
          }}
          animate={{
            y: [0, -8, 4, -6, 0],
            x: [0, 5, -3, 6, 0],
            opacity: [0.3, 0.7, 0.4, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay * 0.5,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Order grid ─── */
function OrderGrid() {
  const cells = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      col: i % 8,
      row: Math.floor(i / 8),
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cells.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-sm"
          style={{
            left: `${10 + c.col * 10.5}%`,
            top: `${55 + c.row * 8}%`,
            width: 6,
            height: 6,
            backgroundColor: 'rgba(201, 169, 110, 0.3)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 * c.id, duration: 0.4 }}
        />
      ))}
    </div>
  );
}

/* ─── Status Badge Helper ─── */
function StatusBadge({
  status,
  text,
  color,
}: {
  status: string;
  text: string;
  color: string;
}) {
  let bg: string;
  let border: string;
  let textColor: string;

  switch (status) {
    case 'active':
      bg = 'rgba(201, 169, 110, 0.12)';
      border = 'rgba(201, 169, 110, 0.3)';
      textColor = color;
      break;
    case 'upcoming':
      bg = 'transparent';
      border = 'rgba(201, 169, 110, 0.3)';
      textColor = color;
      break;
    case 'planned':
      bg = 'rgba(217, 119, 6, 0.1)';
      border = 'rgba(217, 119, 6, 0.25)';
      textColor = color;
      break;
    default:
      bg = 'rgba(255, 255, 255, 0.03)';
      border = 'var(--ink-border)';
      textColor = color;
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-body"
      style={{ backgroundColor: bg, border: `1px solid ${border}`, color: textColor }}
    >
      {status === 'active' && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {text}
    </span>
  );
}

/* ─── Cell Value for comparison ─── */
function CompCell({ value }: { value: string | boolean }) {
  if (value === true) return <span style={{ color: 'var(--gold)' }}>✓</span>;
  if (value === false) return <span style={{ color: 'var(--text-ghost)' }}>✗</span>;
  return <span className="text-sm text-[var(--text-cream-muted)]">{value}</span>;
}

/* ─── Component ─── */
export default function VisionSection() {
  const { t, tArray, lang } = useTranslation();

  const dimensions = tArray('vision.dimensions') || [];
  const competitorKeys = tArray('vision.competitorKeys') || [];

  /* ─── Competitor data (translated cell values) ─── */
  const competitorData: Record<string, (string | boolean)[]> = (() => {
    const data: Record<string, (string | boolean)[]> = {};
    competitorKeys.forEach((key) => {
      const cells = tArray(`vision.competitorCells.${key}`) || [];
      data[key] = cells.map((v) =>
        v === 'true' ? true : v === 'false' ? false : v,
      );
    });
    return data;
  })();

  /* ─── Market stats (translated values & descriptions) ─── */
  const marketStats = [0, 1, 2].map((i) => ({
    value: t(`vision.marketStat${i}Value`),
    desc: t(`vision.marketStat${i}Desc`),
    context: t(`vision.marketStat${i}Context`),
  }));

  /* ─── Roadmap (structural data stays, translated text from keys) ─── */
  const phaseMeta = [
    { phase: 1, label: 'NOW', status: 'active' as const, color: 'var(--gold)' },
    { phase: 2, label: 'Q3 2025', status: 'upcoming' as const, color: 'var(--gold)' },
    { phase: 3, label: 'Q1 2026', status: 'planned' as const, color: 'var(--amber)' },
    { phase: 4, label: '2026', status: 'future' as const, color: 'var(--text-ghost)' },
    { phase: 5, label: '2027', status: 'vision' as const, color: 'var(--text-ghost)' },
  ];

  const roadmap = phaseMeta.map((meta) => ({
    ...meta,
    name: t(`vision.roadmapPhase${meta.phase}Name`),
    statusText: t(`vision.roadmapPhase${meta.phase}Status`),
    features: tArray(`vision.roadmapPhase${meta.phase}Features`) || [],
  }));


  return (
    <section id="vision" className="relative">
      {/* ─── Opening (Full Viewport) ─── */}
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--ink)' }}
      >
        <ChaosDots />
        <OrderGrid />

        {/* Horizon Line at 60% */}
        <div className="absolute left-0 right-0" style={{ top: '60%' }}>
          <HorizonLine variant="glowing" />
        </div>

        {/* Text ON the line */}
        <div
          className="absolute left-0 right-0 z-10 text-center px-4"
          style={{ top: '60%', transform: 'translateY(-50%)' }}
        >
          <Reveal>
            <p className="font-bengali text-[clamp(24px, 4vw, 48px)] text-[var(--text-cream)] mb-2 leading-tight">
              {t('vision.opening.line1')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-bengali text-[clamp(24px, 4vw, 48px)] text-[var(--text-cream)] mb-2 leading-tight">
              {t('vision.opening.line2')}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-bengali text-[clamp(24px, 4vw, 48px)] mb-6 leading-tight" style={{ color: 'var(--crimson)' }}>
              {t('vision.opening.line3')}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="font-display italic text-[clamp(18px, 2.5vw, 28px)] text-[var(--text-cream-muted)]">
              {t('vision.opening.subtitle')}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ─── Market Reality ─── */}
      <div
        className="py-[var(--section-v)] px-4"
        style={{ background: 'var(--ink-1)' }}
      >
        <Reveal className="text-center mb-14">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-cream)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('vision.realityHeading')}
          </h3>
          <p className="font-body text-[var(--text-cream-muted)] text-[var(--fs-body)]">
            {t('vision.realitySub')}
          </p>
        </Reveal>

        <div className="max-w-[var(--site-max)] mx-auto space-y-6">
          {marketStats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="w-full rounded-[var(--card-r)] p-8 md:p-10 border"
                style={{
                  background: 'var(--ink-2)',
                  borderColor: 'var(--ink-border)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <motion.span
                      className="font-bengali block text-[clamp(40px, 6vw, 72px)] leading-none"
                      style={{ color: 'var(--gold)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                    <p className="font-body text-[var(--text-cream-muted)] text-sm mt-2">
                      {stat.desc}
                    </p>
                  </div>
                  <p className="font-body text-[var(--text-cream-muted)] text-sm md:text-right">
                    {stat.context}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Competitive Advantage ─── */}
      <div className="bg-[var(--cream)] py-[var(--section-v)] px-4">
        <Reveal className="text-center mb-14">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-ink)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('vision.advantageHeading')}
          </h3>
          <p className="font-body text-[var(--text-muted)] text-[var(--fs-body)]">
            {t('vision.advantageSub')}
          </p>
        </Reveal>

        <Reveal className="max-w-[900px] mx-auto">
          <div
            className="rounded-[var(--card-r)] overflow-hidden border"
            style={{
              background: 'var(--ink-1)',
              borderColor: 'var(--ink-border)',
            }}
          >
            {/* Header row */}
            <div className="grid grid-cols-5 gap-0 text-center py-4 px-4 md:px-6" style={{ borderBottom: '1px solid var(--ink-border)' }}>
              <div className="text-left">
                <span className="font-body text-xs text-[var(--text-cream-muted)] uppercase tracking-wider">
                  {t('vision.dimensionLabel')}
                </span>
              </div>
              {Object.keys(competitorData).map((name) => (
                <div
                  key={name}
                  className={`rounded-lg py-1 px-2 ${
                    name === 'HelloKhata'
                      ? 'mx-1'
                      : ''
                  }`}
                  style={
                    name === 'HelloKhata'
                      ? {
                          backgroundColor: 'rgba(201, 169, 110, 0.1)',
                          border: '1px solid rgba(201, 169, 110, 0.3)',
                          boxShadow: '0 0 20px var(--gold-glow)',
                        }
                      : {}
                  }
                >
                  <span
                    className={`font-body text-xs font-semibold ${
                      name === 'HelloKhata' ? '' : 'text-[var(--text-cream-muted)]'
                    }`}
                    style={name === 'HelloKhata' ? { color: 'var(--gold)' } : {}}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {dimensions.map((dim, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-0 text-center items-center py-3.5 px-4 md:px-6"
                style={{
                  borderBottom:
                    i < dimensions.length - 1
                      ? '1px solid var(--ink-border)'
                      : 'none',
                  backgroundColor:
                    i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="text-left">
                  <span className="font-body text-sm text-[var(--text-cream-muted)]">
                    {dim}
                  </span>
                </div>
                {Object.entries(competitorData).map(([name, vals]) => (
                  <div
                    key={name}
                    className={name === 'HelloKhata' ? 'mx-1' : ''}
                  >
                    <CompCell value={vals[i]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ─── Roadmap ─── */}
      <div
        className="py-[var(--section-v)] px-4"
        style={{ background: 'var(--ink)' }}
      >
        <Reveal className="text-center mb-14">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-cream)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('vision.roadmapHeading')}
          </h3>
          <p className="font-body text-[var(--text-cream-muted)] text-[var(--fs-body)]">
            {t('vision.roadmapSub')}
          </p>
        </Reveal>

        {/* Horizontal Timeline */}
        <div className="max-w-[var(--site-max)] mx-auto">
          {/* Desktop: horizontal scroll */}
          <div className="hidden md:grid md:grid-cols-5 gap-4">
            {roadmap.map((phase, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="relative rounded-[var(--card-r-sm)] p-5 border h-full flex flex-col"
                  style={{
                    background: 'var(--ink-2)',
                    borderColor:
                      phase.status === 'active'
                        ? 'rgba(201, 169, 110, 0.3)'
                        : 'var(--ink-border)',
                    boxShadow:
                      phase.status === 'active'
                        ? '0 0 20px var(--gold-glow)'
                        : 'none',
                  }}
                >
                  {/* Connector line */}
                  {i < roadmap.length - 1 && (
                    <div
                      className="absolute top-1/2 -right-2 w-4 h-px"
                      style={{
                        backgroundColor:
                          phase.status === 'active'
                            ? 'rgba(201, 169, 110, 0.3)'
                            : 'var(--ink-border)',
                      }}
                    />
                  )}

                  {/* Phase number */}
                  <span
                    className="font-bengali text-xs font-bold mb-2 block"
                    style={{
                      color:
                        phase.status === 'active' || phase.status === 'upcoming'
                          ? 'var(--gold)'
                          : phase.status === 'planned'
                          ? 'var(--amber)'
                          : 'var(--text-ghost)',
                    }}
                  >
                    {t('vision.phaseLabel')} {phase.phase}
                  </span>

                  {/* Status */}
                  <StatusBadge status={phase.status} text={phase.statusText} color={phase.color} />

                  {/* Label */}
                  <p className="font-body text-xs text-[var(--text-cream-muted)] mt-2">
                    {phase.label}
                  </p>

                  {/* Name */}
                  <h4
                    className="font-bengali text-lg text-[var(--text-cream)] mt-1 mb-3"
                    style={{ lineHeight: 1.3 }}
                  >
                    {phase.name}
                  </h4>

                  {/* Features */}
                  <ul className="space-y-1.5 mt-auto">
                    {phase.features.map((f, j) => (
                      <li
                        key={j}
                        className="font-body text-xs text-[var(--text-cream-muted)] flex items-start gap-2"
                      >
                        <span
                          className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{
                            backgroundColor:
                              phase.status === 'active' || phase.status === 'upcoming'
                                ? 'var(--gold)'
                                : phase.status === 'planned'
                                ? 'var(--amber)'
                                : 'var(--text-ghost)',
                          }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-6">
            {roadmap.map((phase, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="relative rounded-[var(--card-r-sm)] p-5 border"
                  style={{
                    background: 'var(--ink-2)',
                    borderColor:
                      phase.status === 'active'
                        ? 'rgba(201, 169, 110, 0.3)'
                        : 'var(--ink-border)',
                    boxShadow:
                      phase.status === 'active'
                        ? '0 0 20px var(--gold-glow)'
                        : 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-bengali text-xs font-bold"
                      style={{
                        color:
                          phase.status === 'active' || phase.status === 'upcoming'
                            ? 'var(--gold)'
                            : phase.status === 'planned'
                            ? 'var(--amber)'
                            : 'var(--text-ghost)',
                      }}
                    >
                      {t('vision.phaseLabel')} {phase.phase}
                    </span>
                    <StatusBadge status={phase.status} text={phase.statusText} color={phase.color} />
                  </div>
                  <p className="font-body text-xs text-[var(--text-cream-muted)] mb-1">
                    {phase.label}
                  </p>
                  <h4
                    className="font-bengali text-lg text-[var(--text-cream)] mb-3"
                    style={{ lineHeight: 1.3 }}
                  >
                    {phase.name}
                  </h4>
                  <ul className="space-y-1.5">
                    {phase.features.map((f, j) => (
                      <li
                        key={j}
                        className="font-body text-xs text-[var(--text-cream-muted)] flex items-start gap-2"
                      >
                        <span
                          className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{
                            backgroundColor:
                              phase.status === 'active' || phase.status === 'upcoming'
                                ? 'var(--gold)'
                                : phase.status === 'planned'
                                ? 'var(--amber)'
                                : 'var(--text-ghost)',
                          }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Ask (CTA) ─── */}
      <div
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--ink)' }}
      >
        {/* Horizon line */}
        <div className="absolute left-0 right-0" style={{ top: '55%' }}>
          <HorizonLine variant="glowing" />
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center bottom, var(--gold-glow) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-[700px] mx-auto">
          <Reveal>
            <h3
              className="font-bengali text-[clamp(28px, 4vw, 48px)] text-[var(--text-cream)] mb-4"
              style={{ lineHeight: 1.35 }}
            >
              {t('vision.cta.heading')}
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display italic text-[clamp(20px, 3vw, 32px)] text-[var(--text-cream-muted)] mb-10">
              {t('vision.cta.subtitle')}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-body text-sm font-semibold text-white cursor-pointer"
                style={{
                  backgroundColor: 'var(--gold)',
                  boxShadow: '0 4px 24px var(--gold-glow-strong)',
                }}
              >
                <Download className="w-4 h-4" />
                {t('vision.cta.pitchDeck')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-body text-sm font-semibold text-[var(--text-cream)] cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--ink-border-strong)',
                }}
              >
                {t('vision.cta.contact')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
