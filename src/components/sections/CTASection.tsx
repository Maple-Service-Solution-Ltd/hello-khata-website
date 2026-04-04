'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Smartphone, MessageCircle } from 'lucide-react';

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Horizon Line (subtle variant) ── */
function HorizonLine() {
  return (
    <div className="w-full flex items-center gap-4 px-6">
      <div className="flex-1 h-px" style={{ background: 'rgba(250,247,240,0.08)' }} />
      <div
        className="w-2 h-2 rounded-full"
        style={{ background: 'rgba(0,194,111,0.3)' }}
      />
      <div className="flex-1 h-px" style={{ background: 'rgba(250,247,240,0.08)' }} />
    </div>
  );
}

/* ── Main CTA Section ── */
export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* ── MASSIVE Green Glow (the sunrise horizon) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,194,111,0.15) 0%, rgba(0,194,111,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Secondary softer glow slightly offset for depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(0,194,111,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Nakshi texture at 5% opacity ── */}
      <div
        className="texture-nakshi-subtle absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05 }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 py-28 md:py-40"
        style={{ minHeight: '85vh' }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ maxWidth: '640px', width: '100%' }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Headline */}
          <motion.h2 className="mb-6" variants={fadeUp}>
            <span
              className="font-bengali text-white block leading-[1.1]"
              style={{ fontSize: 'var(--fs-display)' }}
            >
              আজই শুরু করুন।
            </span>
            <span
              className="font-bengali block leading-[1.1] mt-2"
              style={{ fontSize: 'var(--fs-display)', color: 'var(--green)' }}
            >
              বিনামূল্যে।
            </span>
          </motion.h2>

          {/* English sub-headline */}
          <motion.p
            className="font-display italic mb-12"
            style={{
              fontSize: '22px',
              color: 'var(--text-cream-muted)',
              lineHeight: 1.5,
            }}
            variants={fadeUp}
          >
            Your business deserves better than a paper notebook.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full mb-8"
            variants={scaleIn}
          >
            {/* Google Play */}
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-full font-body text-[16px] font-semibold text-white"
              style={{ background: 'var(--green)' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 36px rgba(0,194,111,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-5 h-5" />
              Google Play থেকে নামান
            </motion.a>

            {/* App Store */}
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-full font-body text-[16px] font-medium"
              style={{
                border: '1.5px solid rgba(250,247,240,0.2)',
                color: 'var(--text-cream)',
              }}
              whileHover={{
                scale: 1.04,
                borderColor: 'rgba(250,247,240,0.4)',
                boxShadow: '0 0 24px rgba(250,247,240,0.04)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Smartphone className="w-5 h-5" />
              App Store থেকে নামান
            </motion.a>
          </motion.div>

          {/* WhatsApp link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 mb-10 font-body text-sm"
            style={{ color: 'var(--green)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeUp}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp এ কথা বলুন
          </motion.a>

          {/* ── Horizon Line ── */}
          <motion.div className="w-full mb-8" variants={fadeUp}>
            <HorizonLine />
          </motion.div>

          {/* ── Trust text ── */}
          <motion.p
            className="font-body"
            style={{
              fontSize: '14px',
              color: 'var(--text-cream-muted)',
            }}
            variants={fadeUp}
          >
            কোনো কার্ড লাগবে না &nbsp;·&nbsp; ৩০ দিন ফ্রি &nbsp;·&nbsp;
            যেকোনো সময় বন্ধ করা যায়
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
