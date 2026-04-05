'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowDown,
  Layers,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Pill,
  ShoppingBag,
  Sprout,
  Check,
} from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

/* ═══════════════════════════════════════════════════
   Animations
   ═══════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ═══════════════════════════════════════════════════
   Batch Data (language-independent)
   ═══════════════════════════════════════════════════ */
const batchData = [
  {
    id: 'A01',
    supplier: 'ABC Traders',
    date: '15 Jan 2025',
    cost: '৳45',
    expiry: 'Dec 2025',
    qty: '50',
    status: 'sell-first' as const,
  },
  {
    id: 'B02',
    supplier: 'XYZ Ltd',
    date: '02 Mar 2025',
    cost: '৳48',
    expiry: 'Mar 2026',
    qty: '30',
    status: 'normal' as const,
  },
  {
    id: 'C03',
    supplier: 'ABC Traders',
    date: '18 Apr 2025',
    cost: '৳47',
    expiry: 'Jun 2026',
    qty: '40',
    status: 'normal' as const,
  },
]

/* ═══════════════════════════════════════════════════
   Step icon definitions (language-independent)
   ═══════════════════════════════════════════════════ */
const stepIcons = [
  <Layers key="s1" className="w-5 h-5" />,
  <Clock key="s2" className="w-5 h-5" />,
  <ShieldCheck key="s3" className="w-5 h-5" />,
  <AlertTriangle key="s4" className="w-5 h-5" />,
]

/* ═══════════════════════════════════════════════════
   Who-needs icon definitions (language-independent)
   ═══════════════════════════════════════════════════ */
const whoNeedsIcons = [
  <Pill key="w1" className="w-6 h-6" />,
  <ShoppingBag key="w2" className="w-6 h-6" />,
  <Sprout key="w3" className="w-6 h-6" />,
]

const whoNeedsColors = ['var(--crimson)', 'var(--gold)', 'var(--amber)']

/* ═══════════════════════════════════════════════════
   Batch Diagram Component
   ═══════════════════════════════════════════════════ */
function BatchDiagramSection() {
  const { t, lang } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-6 lg:p-8"
      style={{
        background: 'var(--ink-1)',
        border: '1px solid var(--ink-border-strong)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {/* Diagram title */}
      <motion.div className="flex items-center gap-2 mb-6" variants={fadeUp}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)' }}>
          <Layers className="w-4 h-4" style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <div className="font-bengali text-[15px] font-semibold" style={{ color: 'var(--text-cream)' }}>
            {t('batch.liveDemo')}
          </div>
          <div className="font-body text-[12px]" style={{ color: 'var(--text-cream-muted)' }}>
            {lang === 'en' ? 'Product: Excel 500g' : 'পণ্য: সার্ফ এক্সেল ৫০০g'}
          </div>
        </div>
      </motion.div>

      {/* Batch rows */}
      <div className="flex flex-col gap-3">
        {batchData.map((batch, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <div
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background: batch.status === 'sell-first' ? 'rgba(201,169,110,0.06)' : 'var(--ink-2)',
                border: `1px solid ${batch.status === 'sell-first' ? 'rgba(201,169,110,0.25)' : 'var(--ink-border)'}`,
              }}
            >
              {/* SELL FIRST badge for first batch */}
              {batch.status === 'sell-first' && (
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-bold text-white"
                    style={{ background: 'var(--gold)', animation: 'pulse-glow 2s ease-in-out infinite' }}
                  >
                    ↓ SELL FIRST
                  </span>
                  <span className="font-body text-[11px]" style={{ color: 'var(--text-cream-muted)' }}>
                    {t('batch.fifoNote')}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Batch ID */}
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="font-mono font-bold text-[13px] px-2 py-1 rounded-lg"
                    style={{
                      background: batch.status === 'sell-first' ? 'rgba(201,169,110,0.15)' : 'var(--ink-1)',
                      color: batch.status === 'sell-first' ? 'var(--gold)' : 'var(--text-cream)',
                    }}
                  >
                    Batch #{batch.id}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[11px]" style={{ color: 'var(--text-ghost)' }}>Supplier:</span>
                    <span className="font-body text-[12px]" style={{ color: 'var(--text-cream)' }}>{batch.supplier}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[11px]" style={{ color: 'var(--text-ghost)' }}>Date:</span>
                    <span className="font-body text-[12px]" style={{ color: 'var(--text-cream)' }}>{batch.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[11px]" style={{ color: 'var(--text-ghost)' }}>Cost:</span>
                    <span className="font-body text-[12px] font-semibold" style={{ color: 'var(--gold)' }}>{batch.cost}/unit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[11px]" style={{ color: 'var(--text-ghost)' }}>Expiry:</span>
                    <span
                      className="font-body text-[12px]"
                      style={{
                        color: batch.id === 'A01' ? 'var(--amber)' : 'var(--gold)',
                      }}
                    >
                      {batch.expiry}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[11px]" style={{ color: 'var(--text-ghost)' }}>Qty:</span>
                    <span className="font-body text-[12px]" style={{ color: 'var(--text-cream)' }}>{batch.qty}</span>
                  </div>
                </div>
              </div>

              {/* Visual bar showing stock */}
              <div className="mt-3 h-2 rounded-full" style={{ background: 'var(--ink-1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: batch.status === 'sell-first' ? 'var(--gold)' : 'rgba(201,169,110,0.4)',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(parseInt(batch.qty) / 50) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Arrow between batches */}
            {idx < batchData.length - 1 && (
              <motion.div
                className="flex justify-center py-1.5"
                variants={fadeUp}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <ArrowDown className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                  <span className="font-body text-[10px]" style={{ color: 'var(--text-cream-muted)' }}>
                    {t('batch.fifoNote')}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <motion.div
        className="grid grid-cols-3 gap-3 mt-6 pt-6"
        style={{ borderTop: '1px solid var(--ink-border)' }}
        variants={fadeUp}
      >
        {[
          { labelKey: 'batch.totalBatch' as const, val: '৩', icon: <Layers className="w-3.5 h-3.5" /> },
          { labelKey: 'batch.totalStock' as const, val: lang === 'en' ? '120 pcs' : '১২০ পিস', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          { labelKey: 'batch.avgCost' as const, val: '৳৪৬.৬৭', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span style={{ color: 'var(--gold)' }}>{s.icon}</span>
              <span className="font-body text-[10px]" style={{ color: 'var(--text-cream-muted)' }}>
                {t(s.labelKey)}
              </span>
            </div>
            <div className="font-body text-[16px] font-bold" style={{ color: 'var(--text-cream)' }}>
              {s.val}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
export default function BatchSection() {
  const { t, lang } = useTranslation()

  const steps = useMemo(() => [
    {
      number: lang === 'en' ? '01' : '০১',
      icon: stepIcons[0],
      title: t('batch.step1.title'),
      body: t('batch.step1.body'),
    },
    {
      number: lang === 'en' ? '02' : '০২',
      icon: stepIcons[1],
      title: t('batch.step2.title'),
      body: t('batch.step2.body'),
    },
    {
      number: lang === 'en' ? '03' : '০৩',
      icon: stepIcons[2],
      title: t('batch.step3.title'),
      body: t('batch.step3.body'),
    },
    {
      number: lang === 'en' ? '04' : '০৪',
      icon: stepIcons[3],
      title: t('batch.step4.title'),
      body: t('batch.step4.body'),
    },
  ], [lang, t])

  const whoNeeds = useMemo(() => [
    {
      icon: whoNeedsIcons[0],
      category: t('batch.whoNeeds1.category'),
      en: lang === 'en' ? 'Pharmacy' : 'ফার্মেসি',
      text: t('batch.whoNeeds1.text'),
      color: whoNeedsColors[0],
    },
    {
      icon: whoNeedsIcons[1],
      category: t('batch.whoNeeds2.category'),
      en: lang === 'en' ? 'FMCG' : 'এফএমসিজি দোকান',
      text: t('batch.whoNeeds2.text'),
      color: whoNeedsColors[1],
    },
    {
      icon: whoNeedsIcons[2],
      category: t('batch.whoNeeds3.category'),
      en: lang === 'en' ? 'Agro' : 'কৃষি পণ্য',
      text: t('batch.whoNeeds3.text'),
      color: whoNeedsColors[2],
    },
  ], [lang, t])

  return (
    <section
      id="batch"
      className="relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Nakshi diamond texture */}
      <div className="texture-nakshi-diamond absolute inset-0 pointer-events-none" />

      {/* ── Header ── */}
      <div
        className="relative z-10 mx-auto px-6 lg:px-12 pt-24 pb-16"
        style={{ maxWidth: 'var(--site-max)' }}
      >
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
            style={{ borderColor: 'rgba(201,169,110,0.3)' }}
            variants={fadeUp}
          >
            <span className="font-body tracking-[0.12em] uppercase" style={{ fontSize: 'var(--fs-label)', color: 'var(--gold)' }}>
              {t('batch.eyebrow')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-bengali text-white leading-[1.1] mb-4"
            style={{ fontSize: 'var(--fs-h1)' }}
            variants={fadeUp}
          >
            {t('batch.headline').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </motion.h2>

          {/* English sub */}
          <motion.p
            className="font-display italic"
            style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--text-cream-muted)' }}
            variants={fadeUp}
          >
            {t('batch.sub')}
          </motion.p>
        </motion.div>
      </div>

      {/* ── Batch Diagram ── */}
      <div
        className="relative z-10 mx-auto px-6 lg:px-12 pb-20"
        style={{ maxWidth: '960px' }}
      >
        <BatchDiagramSection />
      </div>

      {/* ── 4-Step Explainer ── */}
      <div
        className="relative z-10 mx-auto px-6 lg:px-12 pb-20"
        style={{ maxWidth: 'var(--site-max)' }}
      >
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h3
            className="font-bengali text-white mb-2"
            style={{ fontSize: 'var(--fs-h2)' }}
            variants={fadeUp}
          >
            {t('batch.howItWorks')}
          </motion.h3>
          <motion.p
            className="font-body"
            style={{ fontSize: 'var(--fs-body)', color: 'var(--text-cream-muted)', maxWidth: '500px', margin: '0 auto' }}
            variants={fadeUp}
          >
            {t('batch.howItWorksSub')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-2xl p-6"
              style={{
                background: 'var(--ink-1)',
                border: '1px solid var(--ink-border)',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Step number ghost */}
              <motion.div
                className="font-body font-bold absolute -top-2 -left-1"
                style={{
                  fontSize: '60px',
                  lineHeight: 1,
                  opacity: 0.06,
                  color: 'var(--gold)',
                  userSelect: 'none',
                }}
                variants={fadeUp}
              >
                {step.number}
              </motion.div>

              {/* Icon */}
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(201,169,110,0.1)', color: 'var(--gold)' }}
                variants={fadeUp}
              >
                {step.icon}
              </motion.div>

              {/* Title */}
              <motion.h4
                className="font-bengali font-bold text-[16px] mb-2"
                style={{ color: 'var(--text-cream)' }}
                variants={fadeUp}
              >
                {step.title}
              </motion.h4>

              {/* Body */}
              <motion.p
                className="font-body text-[14px] leading-relaxed"
                style={{ color: 'var(--text-cream-muted)' }}
                variants={fadeUp}
              >
                {step.body}
              </motion.p>

              {/* Connector line (except last) */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6"
                  style={{ borderTop: '2px dashed var(--ink-border-strong)' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Who Needs This ── */}
      <div
        className="relative z-10 mx-auto px-6 lg:px-12 pb-24"
        style={{ maxWidth: 'var(--site-max)' }}
      >
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h3
            className="font-bengali text-white mb-2"
            style={{ fontSize: 'var(--fs-h2)' }}
            variants={fadeUp}
          >
            {t('batch.whoNeedsTitle')}
          </motion.h3>
          <motion.p
            className="font-body"
            style={{ fontSize: 'var(--fs-body)', color: 'var(--text-cream-muted)', maxWidth: '500px', margin: '0 auto' }}
            variants={fadeUp}
          >
            {t('batch.whoNeedsSub')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whoNeeds.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'var(--ink-1)',
                border: '1px solid var(--ink-border)',
              }}
              initial={idx === 0 ? fadeLeft : idx === 2 ? fadeRight : fadeUp}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Accent top bar */}
              <div className="h-1 w-full" style={{ background: item.color }} />

              <div className="p-6">
                {/* Icon + Category */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bengali text-[16px] font-bold" style={{ color: 'var(--text-cream)' }}>
                      {item.category}
                    </div>
                    <div className="font-body text-[12px]" style={{ color: 'var(--text-cream-muted)' }}>
                      {item.en}
                    </div>
                  </div>
                </div>

                {/* Body text */}
                <p
                  className="font-body text-[14px] leading-relaxed"
                  style={{ color: 'var(--text-cream-muted)' }}
                >
                  {item.text}
                </p>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,169,110,0.1)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: 'var(--gold)' }} />
                  </div>
                  <span className="font-body text-[12px]" style={{ color: 'var(--gold)' }}>
                    {t('batch.whoNeedsCta')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-body font-semibold text-[15px]"
            style={{ background: 'var(--gold)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,169,110,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Layers className="w-4 h-4" />
            {t('batch.tryBatch')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
