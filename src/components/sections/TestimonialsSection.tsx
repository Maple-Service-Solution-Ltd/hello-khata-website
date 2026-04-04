'use client'

import { motion } from 'framer-motion'

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
        fill="var(--green)"
        opacity="0.25"
      />
    </svg>
  )
}

/* ── Single Testimonial Card ── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
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
            '0 12px 36px rgba(0,194,111,0.1), 0 0 0 1px rgba(0,194,111,0.08)',
          transition: { duration: 0.25 },
        }}
      >
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
          {testimonial.quote}
        </p>

        {/* Owner info */}
        <div className="relative flex items-center gap-3 mb-4">
          {/* Avatar */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: testimonial.avatarColor,
            }}
          >
            <span
              className="font-bengali text-white font-bold"
              style={{ fontSize: '18px' }}
            >
              {testimonial.initial}
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className="font-bengali font-bold text-[15px]"
              style={{ color: 'var(--text-ink)' }}
            >
              {testimonial.name}
            </span>
            <span
              className="font-body text-[13px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {testimonial.business} · {testimonial.district}
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
            {testimonial.businessType}
          </span>
        </div>

        {/* Metric badge - bottom right */}
        <div className="relative mt-4 flex justify-end">
          <span
            className="inline-block px-3 py-1 rounded-full font-bengali text-[13px] font-semibold"
            style={{
              background: 'rgba(0,194,111,0.1)',
              color: 'var(--green-deep)',
              border: '1px solid rgba(0,194,111,0.2)',
            }}
          >
            {testimonial.metric}
          </span>
        </div>

        {/* Paper fold shadow corner */}
        <div
          className="absolute top-0 right-0 w-6 h-6 rounded-tr-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, rgba(0,0,0,0.04) 50%, transparent 50%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Main Testimonials Section ── */
export default function TestimonialsSection() {
  return (
    <section
      id="stories"
      className="relative overflow-hidden texture-nakshi-subtle"
      style={{
        background: 'var(--cream)',
        padding: 'var(--section-v) 0',
      }}
    >
      {/* Soft green glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,194,111,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--site-max)' }}>
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
            style={{ fontSize: 'var(--fs-label)', color: 'var(--green)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            বাস্তব মানুষ · বাস্তব ফলাফল
          </motion.span>

          {/* Headline */}
          <h2
            className="font-bengali"
            style={{ fontSize: 'var(--fs-h1)', color: 'var(--text-ink)', lineHeight: 1.15 }}
          >
            তাদের কথা শুনুন।
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
            বাংলাদেশের ৫০,০০০+ দোকানদার আজ HelloKhata ব্যবহার করছেন।
            তাদের কয়েকজনের গল্প শুনুন।
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
            আপনিও চাইলে{' '}
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>
              আপনার গল্পটা শেয়ার
            </span>{' '}
            করতে পারেন
          </p>
        </motion.div>
      </div>
    </section>
  )
}
