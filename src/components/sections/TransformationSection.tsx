'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, FileText, Calculator, NotebookPen } from 'lucide-react'

/* ── Chaos card data (Before state) ── */
const chaosCards = [
  {
    icon: FileText,
    label: 'কার কত বাকি?',
    rotation: -6,
    x: 5,
    y: -10,
  },
  {
    icon: Calculator,
    label: 'Stock শেষ?',
    rotation: 4,
    x: 60,
    y: 20,
  },
  {
    icon: NotebookPen,
    label: 'লাভ না ক্ষতি?',
    rotation: -3,
    x: 30,
    y: 50,
  },
]

/* ── After features ── */
const afterFeatures = [
  'হিসাব পরিষ্কার ✓',
  'Stock নিয়ন্ত্রণে ✓',
  'লাভ দেখা যাচ্ছে ✓',
]

/* ── Mini phone mockup for "After" state ── */
function AfterPhoneMockup() {
  const bars = [50, 70, 55, 85, 65, 90, 75]

  return (
    <div
      className="relative mx-auto"
      style={{
        width: '200px',
        height: '400px',
        background: 'linear-gradient(145deg, #1a1d1b 0%, #0d0f0e 100%)',
        borderRadius: '28px',
        border: '2px solid rgba(201,169,110,0.15)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,169,110,0.08)',
        padding: '8px',
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '70px',
          height: '22px',
          background: '#0d0f0e',
          borderRadius: '0 0 14px 14px',
          zIndex: 10,
        }}
      />

      {/* Screen */}
      <div className="w-full h-full overflow-hidden rounded-[22px]" style={{ background: 'var(--ink)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2" style={{ background: 'var(--ink-1)' }}>
          <span className="text-[10px]" style={{ color: 'var(--text-cream-muted)' }}>Dashboard</span>
          <span className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>HelloKhata</span>
        </div>

        {/* Clean stat cards */}
        <div className="grid grid-cols-2 gap-1.5 px-2 mt-2">
          {[
            { label: 'বিক্রি', value: '৳ ২৪,৫০০', color: 'var(--gold)' },
            { label: 'লাভ', value: '৳ ৬,২০০', color: '#4ADE80' },
            { label: 'দেনা', value: '৳ ৩,১০০', color: '#FBBF24' },
            { label: 'Stock', value: '১২৫ আইটেম', color: 'var(--gold)' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-lg p-1.5"
              style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
            >
              <p className="text-[8px]" style={{ color: 'var(--text-ghost)' }}>{stat.label}</p>
              <p className="text-[11px] font-body font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Clean bar chart */}
        <div className="mx-2 mt-2 rounded-lg p-2" style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}>
          <p className="text-[8px] mb-1.5" style={{ color: 'var(--text-cream-muted)' }}>সাপ্তাহিক বিক্রি</p>
          <div className="flex items-end gap-1" style={{ height: '60px' }}>
            {bars.map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    background: i === bars.length - 1 ? 'var(--gold)' : 'rgba(201,169,110,0.35)',
                    height: `${h}%`,
                    minHeight: '3px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Clean status */}
        <div className="mx-2 mt-2 rounded-lg p-2 flex items-center gap-1.5" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)' }}>
          <CheckCircle className="w-3 h-3" style={{ color: 'var(--gold)' }} />
          <span className="text-[9px] font-body" style={{ color: 'var(--gold)' }}>সব হিসাব আপটুডেট</span>
        </div>
      </div>
    </div>
  )
}

/* ── Main Transformation Section ── */
export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const horizonLineRef = useRef<HTMLDivElement>(null)

  /* Scroll-based parallax and progress */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Parallax transforms for the horizon line and elements */
  const horizonY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 0.6, 0])
  const beforeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const beforeRotate = useTransform(scrollYProgress, [0, 0.5], [0, -3])

  const afterOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 0.6, 1])
  const afterScale = useTransform(scrollYProgress, [0.5, 1], [0.9, 1])
  const afterY = useTransform(scrollYProgress, [0.4, 0.8], [30, 0])

  // GSAP ScrollTrigger parallax effects
  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    async function initGSAP() {
      const gsap = (await import('gsap')).gsap
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Before section: subtle upward movement (parallax -0.1)
        if (beforeRef.current) {
          gsap.to(beforeRef.current, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: true,
            },
          })
        }

        // After section: subtle downward movement (parallax 0.15)
        if (afterRef.current) {
          gsap.to(afterRef.current, {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Horizon line: scale X animation on scroll
        if (horizonLineRef.current) {
          gsap.fromTo(
            horizonLineRef.current,
            { scaleX: 0.8 },
            {
              scaleX: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: true,
              },
            }
          )
        }
      })
    }

    initGSAP()

    return () => {
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Top Half: BEFORE ── */}
      <motion.div
        ref={beforeRef}
        className="relative"
        style={{
          minHeight: '50vh',
          background: 'var(--ink)',
          opacity: beforeOpacity,
          scale: beforeScale,
          rotate: beforeRotate,
        }}
      >
        {/* Red subtle overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(220, 38, 38, 0.04)' }}
        />

        {/* Nakshi texture */}
        <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

        {/* Before label */}
        <motion.div
          className="absolute top-6 left-6 z-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full font-body font-semibold text-[13px]"
            style={{ background: 'rgba(220, 38, 38, 0.12)', color: 'var(--crimson)', border: '1px solid rgba(220, 38, 38, 0.2)' }}
          >
            এর আগে
          </span>
        </motion.div>

        {/* Chaos cards container */}
        <div className="relative w-full h-full flex items-center justify-center px-6" style={{ minHeight: '50vh' }}>
          <div className="relative w-full max-w-2xl mx-auto" style={{ height: '300px' }}>
            {chaosCards.map((card, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${card.x}%`,
                  top: `${card.y}%`,
                  transform: `rotate(${card.rotation}deg)`,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              >
                {/* Paper receipt card */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--ink-1) 0%, var(--ink-2) 100%)',
                    border: '1px solid var(--ink-border)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    minWidth: '180px',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: 'rgba(220, 38, 38, 0.1)' }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: 'var(--crimson)' }} />
                  </div>
                  <span
                    className="font-bengali text-[15px]"
                    style={{ color: 'rgba(250,247,240,0.7)' }}
                  >
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Scattered paper receipt lines */}
            <motion.div
              className="absolute hidden lg:block"
              style={{ left: '15%', top: '30%', opacity: 0.15 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.15 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <rect x="2" y="2" width="116" height="76" rx="4" stroke="rgba(250,247,240,0.2)" strokeWidth="1" />
                <line x1="15" y1="18" x2="105" y2="18" stroke="rgba(250,247,240,0.1)" strokeWidth="2" />
                <line x1="15" y1="30" x2="90" y2="30" stroke="rgba(250,247,240,0.1)" strokeWidth="2" />
                <line x1="15" y1="42" x2="75" y2="42" stroke="rgba(250,247,240,0.1)" strokeWidth="2" />
                <line x1="15" y1="54" x2="95" y2="54" stroke="rgba(250,247,240,0.1)" strokeWidth="2" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute hidden lg:block"
              style={{ right: '10%', bottom: '15%', opacity: 0.12, transform: 'rotate(8deg)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.12 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
            >
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <rect x="2" y="2" width="96" height="56" rx="4" stroke="rgba(220,38,38,0.2)" strokeWidth="1" />
                <text x="15" y="25" fill="rgba(220,38,38,0.3)" fontSize="10" fontFamily="monospace">TOTAL</text>
                <text x="60" y="45" fill="rgba(220,38,38,0.3)" fontSize="14" fontFamily="monospace">???=??</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Center: Horizon Line / Transition ── */}
      <motion.div
        ref={horizonLineRef}
        className="relative z-20 flex items-center justify-center"
        style={{
          height: '80px',
          y: horizonY,
          background: 'linear-gradient(to bottom, var(--ink) 0%, var(--cream) 100%)',
        }}
      >
        {/* Green line */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
          style={{ height: '3px', background: 'var(--gold)' }}
        />

        {/* HelloKhata wordmark centered */}
        <motion.div
          className="relative z-10 px-6 py-2 rounded-full"
          style={{
            background: 'var(--cream)',
            boxShadow: '0 0 0 4px var(--gold), 0 0 30px rgba(201,169,110,0.3)',
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <span
            className="font-display font-bold"
            style={{ fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.02em' }}
          >
            HelloKhata
          </span>
        </motion.div>
      </motion.div>

      {/* ── Bottom Half: AFTER ── */}
      <motion.div
        ref={afterRef}
        className="relative"
        style={{
          minHeight: '50vh',
          background: 'var(--cream)',
          opacity: afterOpacity,
          scale: afterScale,
          y: afterY,
        }}
      >
        {/* Soft green glow from below */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(201,169,110,0.08) 0%, transparent 70%)' }}
        />

        {/* Khata lines texture */}
        <div className="khata-lines absolute inset-0 pointer-events-none" />

        {/* After label */}
        <motion.div
          className="absolute bottom-6 right-6 z-10"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full font-body font-semibold text-[13px]"
            style={{ background: 'rgba(201,169,110,0.1)', color: 'var(--gold-deep)', border: '1px solid rgba(201,169,110,0.2)' }}
          >
            HelloKhata দিয়ে
          </span>
        </motion.div>

        {/* After content */}
        <div className="relative w-full max-w-5xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Phone mockup */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ animation: 'float 6s ease-in-out infinite' }}>
              <AfterPhoneMockup />
            </div>
          </motion.div>

          {/* Feature labels */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2
                className="font-bengali mb-6"
                style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-ink)' }}
              >
                সব পরিবর্তন হয়ে গেছে
              </h2>
            </motion.div>

            {afterFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.12)' }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                </div>
                <span
                  className="font-bengali text-[18px]"
                  style={{ color: 'var(--text-ink)' }}
                >
                  {feature}
                </span>
              </motion.div>
            ))}

            <motion.p
              className="font-body mt-4"
              style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '360px', lineHeight: '1.7' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              HelloKhata দিয়ে আপনার পুরো ব্যবসা এখন আঙুলের ছোঁয়ায়।
              ভয়েসে বলুন, বাকিটা AI সামলাবে।
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
