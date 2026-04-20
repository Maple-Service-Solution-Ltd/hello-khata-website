'use client'

import { useEffect, useState, useRef, useCallback, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, ChevronDown, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

/* ── Optimized Canvas Particle System ── */
function useCanvasParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true }) // Optimize context
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; phase: number; speed: number;
    }

    const particles: Particle[] = []
    const COUNT = 50 // Slightly reduced for mobile performance
    const LINK_DIST = 110
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST // Use squared distance to avoid Math.sqrt

    function resize() {
      if (!canvas) return
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    function init() {
      resize()
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(Math.random() * 0.25 + 0.1),
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.12 + 0.03,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.004 + 0.002,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const gold = '201,169,110'

      // Optimized link drawing
      ctx!.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < LINK_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / LINK_DIST) * 0.06
            ctx!.strokeStyle = `rgba(${gold},${alpha})`
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.stroke()
          }
        }
      }

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

    // Use ResizeObserver for smoother handling than 'resize' event
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [canvasRef])
}

const CanvasParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvasParticles(canvasRef)
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', willChange: 'transform' }}
    />
  )
})

/* ── Memoized Phone Mockup to prevent typewriter re-renders ── */
const PhoneMockup = memo(() => {
  const typedText = useTypewriter("আজকের বিক্রি দেখাও...", 55, 1800)
  const bars = [65, 45, 80, 55, 90, 70, 85]
  const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র']

  return (
    <div className="relative">
      <div className="absolute -inset-12 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)' }} />
      <div className="relative mx-auto overflow-hidden" style={{ width: '280px', height: '560px', background: 'linear-gradient(145deg, #0A4A3B 0%, #00382C 100%)', borderRadius: '36px', border: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', padding: '12px' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-[#00382C] rounded-b-[18px] z-10" />
        <div className="w-full h-full overflow-hidden rounded-[26px] bg-[var(--ink)]">
          <div className="flex items-center justify-between px-5 pt-10 pb-2 bg-[var(--ink-1)]">
            <span className="text-white text-[11px]">৯:৪১</span>
            <span className="text-[11px] text-[var(--gold)]">HelloKhata</span>
            <span className="text-white text-[11px]">📶 🔋</span>
          </div>
          <div className="mx-3 mt-2 rounded-2xl p-3 border border-[var(--ink-border)] bg-[var(--ink-2)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🎙</span>
              <span className="text-[13px] text-[var(--text-cream-muted)]">ভয়েস ইনপুট</span>
            </div>
            <p className="text-[14px] text-white min-h-[22px]">
              {typedText}
              <span className="inline-block w-[2px] h-4 ml-0.5 bg-[var(--gold)] animate-pulse" />
            </p>
          </div>
          <div className="mx-3 mt-3 rounded-2xl p-3 border border-[var(--ink-border)] bg-[var(--ink-2)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[var(--text-cream-muted)]">এই সপ্তাহের বিক্রি</span>
              <span className="text-[14px] font-semibold text-[var(--gold)]">৳ ২৪,৫০০</span>
            </div>
            <div className="flex items-end gap-[6px] h-[80px]">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div className="w-full rounded-t-sm" style={{ background: i === bars.length - 1 ? 'var(--gold)' : 'rgba(201,169,110,0.3)', minHeight: '4px' }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: 2.0 + i * 0.1 }} />
                  <span className="text-[8px] text-[var(--text-ghost)]">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

/* ── Remaining Components ── */
function useTypewriter(text: string, speed = 55, startDelay = 800) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])
  useEffect(() => {
    if (!started || displayed.length >= text.length) return
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed])
  return displayed
}

function HorizonLine() {
  return (
    <svg className="absolute left-0 w-full pointer-events-none top-[62%] h-[60px]" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
      <motion.path d="M0,35 Q180,10 360,30 T720,28 T1080,32 T1440,25" stroke="#C9A96E" strokeWidth="1.5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 2.5, delay: 0.5 }} />
    </svg>
  )
}

function ShimmerButton({ children, className, ...props }: any) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.a {...props} className={`relative overflow-hidden ${className || ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)' }} initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ duration: 0.6 }} />}
    </motion.a>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, tArray } = useTranslation()
  const headline = tArray('hero.headline') ?? ['খাতা এখন', 'কথা বলে']

  // Use Framer Motion's useScroll for parallax (more performant than GSAP on main thread)
  const { scrollY } = useScroll()
  const phoneY = useTransform(scrollY, [0, 1000], [0, 150])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.3])
  const particlesY = useTransform(scrollY, [0, 1000], [0, -150])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center bg-[var(--ink)]">
      <div className="horizon-glow absolute inset-0 pointer-events-none" />
      <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

      {/* Optimization: Static Noise instead of SVG Filter */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://res.cloudinary.com/dzpgowba0/image/upload/v1700000000/noise.png")` }} />

      <motion.div style={{ y: particlesY }} className="absolute inset-0 pointer-events-none">
        <CanvasParticles />
      </motion.div>

      <HorizonLine />

      <div className="relative z-20 w-full mx-auto px-6 lg:px-12 max-w-[var(--site-max)]">
        <div className="flex flex-col lg:flex-row items-center gap-12 pt-20 lg:pt-0">

          <motion.div style={{ opacity: textOpacity }} className="flex-1 w-full lg:w-[55%] mt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(201,169,110,0.3)] mb-6">
              <span className="font-body tracking-[0.12em] uppercase text-[11px] text-[var(--gold)]">{t('hero.eyebrow')}</span>
            </motion.div>

            <div className="mb-6">
              <h1 className="font-bengali text-white leading-[1.1] text-[clamp(52px,8vw,110px)]">{headline[0]}</h1>
              <h1 className="font-bengali text-white leading-[1.1] text-[clamp(52px,8vw,110px)]" style={{ textShadow: '0 0 80px rgba(201,169,110,0.15)' }}>
                {headline[1]}<span className="text-[var(--gold)]">।</span>
              </h1>
            </div>

            <p className="font-display italic mb-6 text-[24px] text-[var(--text-cream)] border-l-2 border-[var(--gold)] pl-3">{t('hero.body')}</p>

            <p className="font-body mb-8 text-[17px] text-[var(--text-cream-muted)] max-w-[520px] lineHeight-[1.75]">
              বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা ম্যানেজমেন্ট সিস্টেম।
            </p>

            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="#" className="px-6 py-3 rounded-full text-white bg-[var(--gold)] text-[15px] font-semibold">
                <Download className="w-4 h-4 inline mr-2" /> {t('hero.cta')}
              </ShimmerButton>
              <a href="#" className="px-6 py-3 rounded-full border border-[rgba(250,247,240,0.25)] text-[var(--text-cream)] text-[15px]">{t('hero.how')} →</a>
            </div>
          </motion.div>

          <motion.div style={{ y: phoneY }} className="w-full lg:w-[45%] flex flex-col items-center">
            <div style={{ transform: 'rotate(-5deg)', willChange: 'transform' }}>
              <div className="animate-[float_6s_ease-in-out_infinite]">
                <PhoneMockup />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}