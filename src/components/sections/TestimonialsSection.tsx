'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/use-translation'

/* ── Testimonial Data ── */
interface Testimonial {
  id: number
  quote: string
  name: string
  business: string
  district: string
  businessType: string
  businessBadgeColor: string
  metric: string
  initial: string
  avatarColor: string
  height: 'tall' | 'medium' | 'short'
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'আগে রাত ১২টায়ও ঘুমাতে পারতাম না — কার বাকি কত মনে করার চেষ্টায়। HelloKhata আসার পর রাতে শান্তিতে ঘুমাই।',
    name: 'মোঃ আলামিন হোসেন',
    business: 'আলামিন স্টোর',
    district: 'Mirpur, Dhaka',
    businessType: 'Grocery',
    businessBadgeColor: '#059669',
    metric: 'বাকি পরিশোধ ৮৫% বেড়েছে',
    initial: 'আ',
    avatarColor: '#059669',
    height: 'tall',
  },
  {
    id: 2,
    quote:
      'ফার্মেসিতে expired medicine দেখানো ছিল সবচেয়ে বড় ক্ষতি। HelloKhata শুরু করার পর এই সমস্যা নেই।',
    name: 'সুমাইয়া বেগম',
    business: 'সুমাইয়া মেডিকেল',
    district: 'Chittagong',
    businessType: 'Pharmacy',
    businessBadgeColor: '#2563EB',
    metric: 'Expiry loss শূন্য হয়েছে',
    initial: 'স',
    avatarColor: '#2563EB',
    height: 'medium',
  },
  {
    id: 3,
    quote:
      'বললাম \'stock কম আছে কোনটায়?\' — তুরন্ত list চলে এলো। এই জিনিস আমি কল্পনাও করিনি।',
    name: 'রফিক ভাই',
    business: 'রফিক হার্ডওয়্যার',
    district: 'Sylhet',
    businessType: 'Hardware',
    businessBadgeColor: '#D97706',
    metric: 'Stock out ৯০% কমেছে',
    initial: 'র',
    avatarColor: '#D97706',
    height: 'short',
  },
  {
    id: 4,
    quote:
      'পাইকারি ব্যবসায় ৫ জন supplier এর পাওনা মাথায় রাখা অসম্ভব ছিল। HelloKhata এখন সব পরিষ্কার দেখাচ্ছে।',
    name: 'হাসান সাহেব',
    business: 'হাসান ট্রেডার্স',
    district: 'Rajshahi',
    businessType: 'Wholesale',
    businessBadgeColor: '#7C3AED',
    metric: 'Supplier বিরোধ ৬০% কমেছে',
    initial: 'হ',
    avatarColor: '#7C3AED',
    height: 'medium',
  },
  {
    id: 5,
    quote:
      'সুপার শপে ৩ জন staff কাজ করে। কে কত বিক্রি করেছে, কে কোন পণ্য handle করছে — এসব এখন এক ক্লিকেই দেখা যায়।',
    name: 'কামরুল ইসলাম',
    business: 'কামরুল সুপার মার্কেট',
    district: 'Comilla',
    businessType: 'Super Shop',
    businessBadgeColor: '#059669',
    metric: 'Staff এফিশিয়েন্সি ৪০% বেড়েছে',
    initial: 'ক',
    avatarColor: '#059669',
    height: 'tall',
  },
  {
    id: 6,
    quote:
      'মোবাইল শপে লাভ বোঝা যেত না। এখন HelloKhata বলে দেয় — আজ কত লাভ, কোন ফোন বেশি বিক্রি হচ্ছে।',
    name: 'ইমরান হোসেন',
    business: 'ইমরান মোবাইল',
    district: 'Bogra',
    businessType: 'Mobile Shop',
    businessBadgeColor: '#4F46E5',
    metric: 'প্রফিট ভিজিবিলিটি ১০০%',
    initial: 'ই',
    avatarColor: '#4F46E5',
    height: 'short',
  },
]

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Green quotation mark SVG ── */
function GreenQuote() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 22c0-3.3 2.7-6 6-6 .6 0 1 .1 1.5.2C16.2 14.4 14.3 13 12 13c-.6 0-1-.4-1-1s.4-1 1-1c4.4 0 8 3.6 8 8v4c0 2.2-1.8 4-4 4h-2c-2.2 0-4-1.8-4-4v-1zm14 0c0-3.3 2.7-6 6-6 .6 0 1 .1 1.5.2C30.2 14.4 28.3 13 26 13c-.6 0-1-.4-1-1s.4-1 1-1c4.4 0 8 3.6 8 8v4c0 2.2-1.8 4-4 4h-2c-2.2 0-4-1.8-4-4v-1z"
        fill="var(--gold)"
        opacity="0.25"
      />
    </svg>
  )
}

/* ── Large decorative quotation mark watermark ── */
function QuoteWatermark() {
  return (
    <svg
      className="absolute top-3 left-4 pointer-events-none"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.04 }}
    >
      <path
        d="M30 80c0-12 10-22 22-22 2.2 0 4 0.4 6 0.8C50.4 46.8 44 42 36 42c-2.2 0-4-1.8-4-4s1.8-4 4-4c16.6 0 30 13.4 30 30v14c0 8.3-6.7 15-15 15h-6c-8.3 0-15-6.7-15-15V80zm52 0c0-12 10-22 22-22 2.2 0 4 0.4 6 0.8C102.4 46.8 96 42 88 42c-2.2 0-4-1.8-4-4s1.8-4 4-4c16.6 0 30 13.4 30 30v14c0 8.3-6.7 15-15 15h-6c-8.3 0-15-6.7-15-15V80z"
        fill="var(--gold)"
      />
    </svg>
  )
}

/* ── Paper Fold Corner Effect ── */
function PaperFoldCorner() {
  return (
    <div
      className="absolute top-0 right-0 pointer-events-none"
      style={{
        width: '28px',
        height: '28px',
        overflow: 'hidden',
        borderTopRightRadius: '16px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '40px',
          height: '40px',
          background: 'var(--cream-2)',
          transform: 'rotate(0deg)',
          transformOrigin: 'top right',
          boxShadow: '-2px 2px 4px rgba(0,0,0,0.06)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
        }}
      />
    </div>
  )
}

/* ── Single Testimonial Card ── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { t } = useTranslation()
  const isTall = testimonial.height === 'tall'
  const isMedium = testimonial.height === 'medium'

  return (
    <motion.div
      variants={cardVariants}
      className="break-inside-avoid mb-4"
    >
      <motion.div
        className="relative rounded-2xl p-5 md:p-6"
        style={{
          background: isTall
            ? 'rgba(255,255,255,0.95)'
            : isMedium
            ? 'rgba(255,255,255,0.88)'
            : 'rgba(255,255,255,0.82)',
          border: '1px solid var(--canvas-border)',
          boxShadow: isTall
            ? '0 4px 20px rgba(0,0,0,0.06), 6px 6px 0 rgba(0,0,0,0.03)'
            : '0 2px 12px rgba(0,0,0,0.04), 4px 4px 0 rgba(0,0,0,0.02)',
        }}
        whileHover={{
          y: -4,
          boxShadow:
            '0 12px 36px rgba(201,169,110,0.1), 0 0 0 1px rgba(201,169,110,0.08)',
          transition: { duration: 0.25 },
        }}
      >
        {/* Paper fold corner effect */}
        <PaperFoldCorner />

        {/* Decorative quotation watermark */}
        <QuoteWatermark />

        {/* Khata ruled lines overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none khata-lines"
          style={{ opacity: 0.5 }}
        />

        {/* Green quote mark */}
        <div className="relative mb-3">
          <GreenQuote />
        </div>

        {/* Quote text */}
        <p
          className="relative font-bengali italic leading-relaxed mb-5"
          style={{
            fontSize: isTall ? '20px' : isMedium ? '18px' : '18px',
            color: 'var(--text-ink)',
            lineHeight: '1.8',
          }}
        >
          {t('testimonials.t' + testimonial.id + '.quote')}
        </p>

        {/* Owner info */}
        <div className="relative flex items-center gap-3 mb-4">
          {/* Avatar with green ring */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: testimonial.avatarColor,
              border: '2px solid var(--gold)',
              boxShadow: '0 2px 8px rgba(201,169,110,0.15)',
            }}
          >
            <span
              className="font-bengali text-white font-bold"
              style={{ fontSize: '18px' }}
            >
              {t('testimonials.t' + testimonial.id + '.initial')}
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className="font-bengali font-bold text-[15px]"
              style={{ color: 'var(--text-ink)' }}
            >
              {t('testimonials.t' + testimonial.id + '.name')}
            </span>
            <span
              className="font-body text-[13px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('testimonials.t' + testimonial.id + '.business')} · {t('testimonials.t' + testimonial.id + '.district')}
            </span>
          </div>
        </div>

        {/* Business type badge */}
        <div className="relative flex items-center gap-2 flex-wrap">
          <span
            className="inline-block px-2.5 py-0.5 rounded-full font-body text-[11px] font-medium"
            style={{
              background: `${testimonial.businessBadgeColor}15`,
              color: testimonial.businessBadgeColor,
              border: `1px solid ${testimonial.businessBadgeColor}30`,
            }}
          >
            {t('testimonials.t' + testimonial.id + '.businessType')}
          </span>
        </div>

        {/* Metric badge - bottom right */}
        <div className="relative mt-4 flex justify-end">
          <span
            className="inline-block px-3 py-1 rounded-full font-bengali text-[13px] font-semibold"
            style={{
              background: 'rgba(201,169,110,0.1)',
              color: 'var(--gold-deep)',
              border: '1px solid rgba(201,169,110,0.2)',
            }}
          >
            {t('testimonials.t' + testimonial.id + '.metric')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main Testimonials Section ── */
export default function TestimonialsSection() {
  const { t } = useTranslation()
  return (
    <section
      id="stories"
      className="relative overflow-hidden texture-nakshi-subtle"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px,10vw,160px) 0',
      }}
    >
      {/* Soft green glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full mx-auto px-6 lg:px-12" style={{ maxWidth: '1380px' }}>
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="inline-block font-body tracking-[0.12em] uppercase mb-4"
            style={{ fontSize: 'var(--fs-label)', color: 'var(--gold)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('testimonials.eyebrow')}
          </motion.span>

          {/* Headline */}
          <h2
            className="font-bengali"
            style={{ fontSize: 'var(--fs-h1)', color: 'var(--text-ink)', lineHeight: 1.15 }}
          >
            {t('testimonials.headline')}
          </h2>

          {/* Sub-text */}
          <motion.p
            className="font-body mx-auto mt-4"
            style={{
              fontSize: 'var(--fs-body-lg)',
              color: 'var(--text-muted)',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('testimonials.sub')}
          </motion.p>
        </motion.div>

        {/* ── Testimonial Cards - Masonry with CSS columns ── */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* ── Bottom CTA hint ── */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-body" style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
            {t('testimonials.bottomCta')}{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
              {t('testimonials.bottomCtaHighlight')}
            </span>{' '}
            {t('testimonials.bottomCtaEnd')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
