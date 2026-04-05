'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail } from 'lucide-react'

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Newsletter Section ── */
export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic client-side validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('দয়া করে সঠিক ইমেইল ঠিকানা দিন')
      setStatus('error')
      return
    }

    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setErrorMsg(data.message || 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।')
        setStatus('error')
      }
    } catch {
      setErrorMsg('নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।')
      setStatus('error')
    }
  }, [email])

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden"
      style={{
        background: 'var(--cream)',
        padding: 'var(--section-v) 0',
      }}
    >
      {/* ── Nakshi texture overlay ── */}
      <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

      {/* ── Soft green accent glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
          style={{ borderColor: 'rgba(201,169,110,0.25)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          <Mail className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} />
          <span
            className="font-body tracking-[0.08em] uppercase"
            style={{ fontSize: '11px', color: 'var(--gold)' }}
          >
            থাকে থাকে আপডেট পান
          </span>
        </motion.div>

        {/* Bengali Headline */}
        <motion.h2
          className="font-bengali text-center mb-4"
          style={{
            fontSize: 'var(--fs-h2)',
            color: 'var(--text-ink)',
            maxWidth: '640px',
            lineHeight: 1.3,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          নতুন ফিচার, সেরা টিপস, সাফল্যের গল্প
        </motion.h2>

        {/* English subtitle */}
        <motion.p
          className="font-body text-center mb-2"
          style={{
            fontSize: 'var(--fs-body)',
            color: 'var(--text-muted)',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          New features, tips, and success stories — delivered to your inbox.
        </motion.p>

        {/* Bengali language note */}
        <motion.p
          className="font-bengali text-center mb-8"
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-ghost)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          বাংলায় ইমেইলে পাঠান হবে
        </motion.p>

        {/* ── Form / Success State ── */}
        <motion.div
          className="w-full"
          style={{ maxWidth: '480px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={scaleIn}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                className="flex flex-col items-center gap-4 py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ background: 'rgba(201,169,110,0.12)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-7 h-7" style={{ color: 'var(--gold)' }} />
                </motion.div>

                <motion.span
                  className="font-bengali text-[20px] font-semibold"
                  style={{ color: 'var(--text-ink)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  সাবস্ক্রাইব সফল!
                </motion.span>

                <motion.span
                  className="font-bengali"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  আমরা শীঘ্রই যোগাযোগ করব।
                </motion.span>
              </motion.div>
            ) : (
              /* ── Form State ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Input + Button row */}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') {
                        setStatus('idle')
                        setErrorMsg('')
                      }
                    }}
                    placeholder="আপনার ইমেইল ঠিকানা"
                    className="flex-1 px-4 py-3 rounded-xl font-body text-[15px] outline-none transition-all duration-200"
                    style={{
                      background: 'var(--cream)',
                      border: status === 'error'
                        ? '1.5px solid var(--crimson)'
                        : '1.5px solid var(--canvas-border)',
                      color: 'var(--text-ink)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-body font-semibold text-[15px] transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: 'var(--gold)',
                      minWidth: '100px',
                    }}
                  >
                    {status === 'loading' ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">পাঠান</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && errorMsg && (
                    <motion.p
                      className="font-body"
                      style={{ fontSize: 'var(--fs-sm)', color: 'var(--crimson)' }}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Trust text */}
                <p
                  className="font-body text-center"
                  style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-ghost)' }}
                >
                  আমরা কখনো স্প্যাম করি না। আনসাবস্ক্রাইব করতে পারবেন।
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
