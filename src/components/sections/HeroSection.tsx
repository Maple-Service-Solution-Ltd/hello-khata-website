'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Download, ChevronDown, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

/* ── Lightweight Canvas Particle System ── */
function useCanvasParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; phase: number; speed: number;
    }

    const particles: Particle[] = []
    const COUNT = 60
    const LINK_DIST = 120

    function resize() {
      w = canvas!.width = canvas!.offsetWidth
      h = canvas!.height = canvas!.offsetHeight
    }

    function init() {
      resize()
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.3 + 0.1),
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.12 + 0.03,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.002,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const gold = '201,169,110'

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.06
            ctx!.strokeStyle = `rgba(${gold},${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      // Draw & update particles
      for (const p of particles) {
        p.phase += p.speed
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase))
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${gold},${alpha})`
        ctx!.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])
}

/* ── Canvas Particles Component ── */
function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvasParticles(canvasRef)
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
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
        stroke="#C9A96E"
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
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)' }}
      />

      {/* Phone frame */}
      <div
        className="relative mx-auto"
        style={{
          width: '280px',
          height: '560px',
          background: 'linear-gradient(145deg, #0A4A3B 0%, #00382C 100%)',
          borderRadius: '36px',
          border: '2px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.1)',
          padding: '12px',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100px',
            height: '28px',
            background: '#00382C',
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
            <span className="text-[11px] font-body" style={{ color: 'var(--gold)' }}>HelloKhata</span>
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
                <span className="inline-block w-[2px] h-4 ml-0.5 align-middle" style={{ background: 'var(--gold)', animation: 'blink 1s step-end infinite' }} />
              )}
            </p>
          </div>

          {/* Sales overview */}
          <div className="mx-3 mt-3 rounded-2xl p-3" style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-body" style={{ color: 'var(--text-cream-muted)' }}>এই সপ্তাহের বিক্রি</span>
              <span className="text-[14px] font-body font-semibold" style={{ color: 'var(--gold)' }}>৳ ২৪,৫০০</span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-[6px]" style={{ height: '80px' }}>
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-sm"
                    style={{
                      background: i === bars.length - 1
                        ? 'var(--gold)'
                        : 'rgba(201,169,110,0.3)',
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

/* ── Shimmer CTA Button ── */
function ShimmerButton({ children, className, ...props }: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      {...props}
      className={`relative overflow-hidden ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {/* Shimmer overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onAnimationComplete={() => setIsHovered(false)}
        />
      )}
    </motion.a>
  )
}

/* ── Main Hero Section ── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const { t, tArray } = useTranslation()
  const headline = tArray('hero.headline') ?? ['খাতা এখন', 'কথা বলে']

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // GSAP ScrollTrigger parallax effects
  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    async function initGSAP() {
      const gsap = (await import('gsap')).gsap
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Particles parallax (moves slower - factor 0.3)
        if (particlesRef.current) {
          gsap.to(particlesRef.current, {
            y: -200,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Phone mockup parallax (moves slightly - factor 0.7)
        if (phoneRef.current) {
          gsap.to(phoneRef.current, {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Text content fade on scroll (opacity 1 → 0.3)
        if (textRef.current) {
          gsap.to(textRef.current, {
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=800px',
              scrub: true,
            },
          })
        }
      })

    }

    initGSAP()

    return () => {
      ctx?.revert()
    }
  }, [])

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

      {/* ── Layer 3: Noise/Grain texture overlay (z-5) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Layer 4: Vignette overlay (z-10) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* ── Layer 5: Canvas Particles ── */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <CanvasParticles />
      </div>

      {/* ── Layer 6: Horizon Line SVG ── */}
      <HorizonLine />

      {/* ── Content ── */}
      <div className="relative z-20 w-full mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--site-max)' }}>
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-8 pt-20 lg:pt-0">
          {/* Left: Text content */}
          <motion.div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className="flex-1 w-full lg:w-[55%]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow pill */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
              style={{ borderColor: 'rgba(201,169,110,0.3)' }}
            >
              <span
                className="font-body tracking-[0.12em] uppercase"
                style={{ fontSize: '11px', color: 'var(--gold)' }}
              >
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* Bengali headline */}
            <div className="mb-6">
              <motion.h1
                className="font-bengali text-white leading-[1.1]"
                style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
                variants={fadeUp}
              >
                {headline[0]}
              </motion.h1>
              <motion.h1
                className="font-bengali text-white leading-[1.1]"
                style={{
                  fontSize: 'clamp(52px, 8vw, 110px)',
                  textShadow: '0 0 80px rgba(201,169,110,0.15)',
                }}
                variants={fadeUp}
              >
                {headline[1]}<span style={{ color: 'var(--gold)' }}>।</span>
              </motion.h1>
            </div>

            {/* English translation */}
            <motion.p
              className="font-display italic mb-6"
              style={{ fontSize: '24px', color: 'var(--text-cream)', borderLeft: '2px solid var(--gold)', paddingLeft: '12px' }}
              variants={fadeUp}
            >
              {t('hero.body')}
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
              <ShimmerButton
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-body font-semibold text-[15px]"
                style={{ background: 'var(--gold)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,169,110,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" />
                {t('hero.cta')}
              </ShimmerButton>
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
                {t('hero.how')} →
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body font-medium text-[15px]"
                style={{
                  border: '1px solid rgba(201,169,110,0.4)',
                  color: 'var(--gold)',
                }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(201,169,110,0.7)', background: 'rgba(201,169,110,0.08)' }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-4 h-4" />
                {t('hero.whatsapp')}
              </motion.a>
            </motion.div>

            {/* Sub-text */}
            <motion.p
              className="font-body"
              style={{ fontSize: '12px', color: 'var(--text-ghost)' }}
              variants={fadeUp}
            >
              {t('hero.sub')}
            </motion.p>
          </motion.div>

          {/* ── Vertical Divider Line (appears after text fades in) ── */}
          <motion.div
            className="hidden lg:block w-px self-stretch my-4"
            style={{ background: 'var(--ink-border-strong)' }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Right: Phone Mockup */}
          <div ref={phoneRef} className="w-full lg:w-[45%] flex flex-col items-center">
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
                { value: '৫০,০০০+', label: t('hero.stats.shops') },
                { value: '৬৪', label: t('hero.stats.districts') },
                { value: '১ কোটি+', label: t('hero.stats.entries') },
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
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: 'var(--gold)' }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ opacity: scrollIndicatorOpacity }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-body" style={{ fontSize: '12px', color: 'var(--text-cream-muted)' }}>
          {t('hero.scroll')}
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
