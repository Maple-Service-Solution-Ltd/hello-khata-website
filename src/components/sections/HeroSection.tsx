'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Download, ChevronDown } from 'lucide-react'

/* ── Dynamic import Particles to avoid SSR issues ── */
const Particles = dynamic(
  () => import('@tsparticles/react').then(mod => mod.default || mod.Particles),
  { ssr: false }
)

/* ── Particles init (slim engine) ── */
async function loadParticlesEngine(engine: any) {
  const { loadSlim } = await import('@tsparticles/slim')
  await loadSlim(engine)
}

const particlesConfig = {
  particles: {
    number: { value: 50 },
    color: { value: '#00C26F' },
    opacity: {
      value: { min: 0.05, max: 0.15 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: {
      value: { min: 1, max: 2.5 },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'top' as const,
      straight: false,
      outModes: { default: 'out' as const },
    },
    links: {
      enable: true,
      distance: 120,
      color: '#00C26F',
      opacity: 0.06,
      width: 0.5,
    },
  },
  fullScreen: { enable: false },
  detectRetina: true,
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 55, startDelay = 800) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(t)
    }
  }, [displayed, started, text, speed])

  return displayed
}

/* ── Horizon Line SVG ── */
function HorizonLine() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.2,
      transition: {
        pathLength: { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
        opacity: { duration: 0.6, delay: 0.5 },
      },
    },
  }

  return (
    <svg
      className="absolute left-0 w-full pointer-events-none"
      style={{ top: '62%', height: '60px' }}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M0,35 Q180,10 360,30 T720,28 T1080,32 T1440,25"
        stroke="#00C26F"
        strokeWidth="1.5"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  )
}

/* ── Phone Mockup ── */
function PhoneMockup() {
  const typedText = useTypewriter("আজকের বিক্রি দেখাও...", 55, 1800)

  /* Simple bar chart data (mockup) */
  const bars = [65, 45, 80, 55, 90, 70, 85]
  const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র']

  return (
    <div className="relative">
      {/* Green glow behind phone */}
      <div
        className="absolute -inset-12 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,194,111,0.18) 0%, transparent 70%)' }}
      />

      {/* Phone frame */}
      <div
        className="relative mx-auto"
        style={{
          width: '280px',
          height: '560px',
          background: 'linear-gradient(145deg, #1a1d1b 0%, #0d0f0e 100%)',
          borderRadius: '36px',
          border: '2px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,194,111,0.1)',
          padding: '12px',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100px',
            height: '28px',
            background: '#0d0f0e',
            borderRadius: '0 0 18px 18px',
            zIndex: 10,
          }}
        />

        {/* Screen */}
        <div
          className="w-full h-full overflow-hidden rounded-[26px]"
          style={{ background: 'var(--ink)', padding: '0' }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-10 pb-2" style={{ background: 'var(--ink-1)' }}>
            <span className="text-white text-[11px] font-body">৯:৪১</span>
            <span className="text-[11px] font-body" style={{ color: 'var(--green)' }}>HelloKhata</span>
            <span className="text-white text-[11px] font-body">📶 🔋</span>
          </div>

          {/* Voice input area */}
          <div
            className="mx-3 mt-2 rounded-2xl p-3"
            style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🎙</span>
              <span className="text-[13px]" style={{ color: 'var(--text-cream-muted)' }}>
                ভয়েস ইনপুট
              </span>
            </div>
            <p className="text-[14px] text-white font-bengali" style={{ minHeight: '22px' }}>
              {typedText}
              {typedText.length > 0 && (
                <span className="inline-block w-[2px] h-4 ml-0.5 align-middle" style={{ background: 'var(--green)', animation: 'blink 1s step-end infinite' }} />
              )}
            </p>
          </div>

          {/* Sales overview */}
          <div className="mx-3 mt-3 rounded-2xl p-3" style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-body" style={{ color: 'var(--text-cream-muted)' }}>এই সপ্তাহের বিক্রি</span>
              <span className="text-[14px] font-body font-semibold" style={{ color: 'var(--green)' }}>৳ ২৪,৫০০</span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-[6px]" style={{ height: '80px' }}>
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-sm"
                    style={{
                      background: i === bars.length - 1
                        ? 'var(--green)'
                        : 'rgba(0,194,111,0.3)',
                      height: `${h}%`,
                      minHeight: '4px',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 2.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <span className="text-[8px]" style={{ color: 'var(--text-ghost)' }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: '📦', label: 'Stock' },
              { icon: '💰', label: 'দেনা' },
              { icon: '📊', label: 'রিপোর্ট' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1 rounded-xl py-2"
                style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + i * 0.15 }}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Hero Section ── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [particlesInit, setParticlesInit] = useState(false)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 200)

  /* Stagger children animation config */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'var(--ink)' }}
    >
      {/* ── Layer 1: Horizon glow ── */}
      <div className="horizon-glow absolute inset-0 pointer-events-none" />

      {/* ── Layer 2: Nakshi texture ── */}
      <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

      {/* ── Layer 3: Particles (ssr:false via dynamic import) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          id="hero-particles"
          init={async (engine) => {
            if (!particlesInit) {
              await loadParticlesEngine(engine)
              setParticlesInit(true)
            }
          }}
          options={particlesConfig}
        />
      </div>

      {/* ── Layer 4: Horizon Line SVG ── */}
      <HorizonLine />

      {/* ── Content ── */}
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--site-max)' }}>
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-8 pt-20 lg:pt-0">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 w-full lg:w-[55%]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow pill */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
              style={{ borderColor: 'rgba(0,194,111,0.3)' }}
            >
              <span
                className="font-body tracking-[0.12em] uppercase"
                style={{ fontSize: '11px', color: 'var(--green)' }}
              >
                Voice-Powered · AI-Driven · Made for Bangladesh
              </span>
            </motion.div>

            {/* Bengali headline */}
            <div className="mb-6">
              <motion.h1
                className="font-bengali text-white leading-[1.1]"
                style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
                variants={fadeUp}
              >
                খাতা এখন
              </motion.h1>
              <motion.h1
                className="font-bengali text-white leading-[1.1]"
                style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
                variants={fadeUp}
              >
                কথা বলে<span style={{ color: 'var(--green)' }}>।</span>
              </motion.h1>
            </div>

            {/* English translation */}
            <motion.p
              className="font-display italic mb-6"
              style={{ fontSize: '24px', color: 'var(--text-cream-muted)', borderLeft: '2px solid var(--green)', paddingLeft: '12px' }}
              variants={fadeUp}
            >
              Your khata now speaks.
            </motion.p>

            {/* Body text */}
            <motion.p
              className="font-body mb-8"
              style={{
                fontSize: '17px',
                color: 'var(--text-cream-muted)',
                maxWidth: '520px',
                lineHeight: '1.75',
              }}
              variants={fadeUp}
            >
              বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা
              ম্যানেজমেন্ট সিস্টেম। শুধু বলুন। HelloKhata বাকিটা করবে।
            </motion.p>

            {/* CTA row */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-body font-semibold text-[15px]"
                style={{ background: 'var(--green)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,194,111,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" />
                অ্যাপটি নামান
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium text-[15px]"
                style={{
                  border: '1px solid rgba(250,247,240,0.25)',
                  color: 'var(--text-cream)',
                }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(250,247,240,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                কীভাবে কাজ করে →
              </motion.a>
            </motion.div>

            {/* Sub-text */}
            <motion.p
              className="font-body"
              style={{ fontSize: '12px', color: 'var(--text-ghost)' }}
              variants={fadeUp}
            >
              কোনো কার্ড লাগবে না · ৩০ দিন ফ্রি · বাংলায় সব
            </motion.p>
          </motion.div>

          {/* Right: Phone Mockup */}
          <div className="w-full lg:w-[45%] flex flex-col items-center">
            <motion.div
              className="w-full"
              style={{ transform: 'rotate(-5deg)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Floating animation wrapper */}
              <div style={{ animation: 'float 6s ease-in-out infinite' }}>
                <PhoneMockup />
              </div>
            </motion.div>

            {/* Micro stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
            >
              {[
                { value: '৫০,০০০+', label: 'দোকান' },
                { value: '৬৪', label: 'জেলা' },
                { value: '১ কোটি+', label: 'এন্ট্রি' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--ink-2)',
                    border: '1px solid var(--ink-border)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--green)' }}
                  />
                  <span className="text-white text-[13px] font-body font-semibold">
                    {stat.value}
                  </span>
                  <span className="text-[13px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: scrollIndicatorOpacity }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-body" style={{ fontSize: '12px', color: 'var(--text-cream-muted)' }}>
          নিচে দেখুন
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: 'var(--text-cream-muted)' }} />
        </motion.div>
      </motion.div>

    </section>
  )
}
