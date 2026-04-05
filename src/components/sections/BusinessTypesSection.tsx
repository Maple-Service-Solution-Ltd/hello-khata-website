'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/use-translation'
import type { Language } from '@/lib/language-store'

/* ── Business Type Data ── */
interface BusinessType {
  id: number
  nameBn: string
  nameEn: string
  pain: string
  icon: React.ReactNode
  screenContent: ScreenModule[]
}

interface ScreenModule {
  label: string
  value: string
  color: string
}

const businessTypes: BusinessType[] = [
  {
    id: 1,
    nameBn: 'মুদি দোকান',
    nameEn: 'Grocery',
    pain: 'বাকি ভুলে যাই',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 14V10a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="23" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    screenContent: [
      { label: 'আজকের বাকি', value: '৳ ১২,৫০০', color: 'var(--crimson)' },
      { label: 'মোট কাস্টমার', value: '৮৫ জন', color: 'var(--gold)' },
      { label: 'বাকি পরিশোধ', value: '৮৫% ✓', color: 'var(--gold)' },
      { label: 'বকেয়া', value: '৳ ৩,২০০', color: '#FBBF24' },
    ],
  },
  {
    id: 2,
    nameBn: 'ফার্মেসি',
    nameEn: 'Pharmacy',
    pain: 'Expired medicine ক্ষতি',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M18 14v8M14 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    screenContent: [
      { label: 'Expiry Alert', value: '৩ আইটেম', color: 'var(--crimson)' },
      { label: 'আজকের বিক্রি', value: '৳ ১৮,২০০', color: 'var(--gold)' },
      { label: 'Batch Track', value: '১২ Batch', color: '#3B82F6' },
      { label: 'Expiry Loss', value: '৳ ০ ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 3,
    nameBn: 'FMCG Retail',
    nameEn: 'FMCG Retail',
    pain: 'Stock শেষ হয়ে যায়',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 28V8l4-2v4l6-2v4l6-2v18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <line x1="12" y1="14" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="10" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    screenContent: [
      { label: 'Low Stock', value: '৫ আইটেম', color: '#FBBF24' },
      { label: 'আজকের বিক্রি', value: '৳ ৩৫,৬০০', color: 'var(--gold)' },
      { label: 'Stock Alert', value: 'Auto ON ✓', color: 'var(--gold)' },
      { label: 'Stock Out', value: '0 আইটেম', color: 'var(--gold)' },
    ],
  },
  {
    id: 4,
    nameBn: 'হার্ডওয়্যার',
    nameEn: 'Hardware',
    pain: 'Purchase হিসাব নেই',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10l-4 8 4 8h12l4-8-4-8H12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    screenContent: [
      { label: 'Purchase Due', value: '৳ ৪৫,০০০', color: '#FBBF24' },
      { label: 'আজকের বিক্রি', value: '৳ ২২,৮০০', color: 'var(--gold)' },
      { label: 'Supplier', value: '৮ জন', color: '#3B82F6' },
      { label: 'Purchase ট্র্যাক', value: 'Active ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 5,
    nameBn: 'কসমেটিক্স',
    nameEn: 'Cosmetics',
    pain: 'Supplier বাকি জটিল',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M18 10v-2M18 28v-2M10 18H8M28 18h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    screenContent: [
      { label: 'Supplier বাকি', value: '৳ ৬৭,০০০', color: 'var(--crimson)' },
      { label: 'আজকের বিক্রি', value: '৳ ১৫,৪০০', color: 'var(--gold)' },
      { label: 'Supplier', value: '১২ জন', color: '#A855F7' },
      { label: 'বাকি ক্লিয়ার', value: '৬০% ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 6,
    nameBn: 'স্টেশনারি',
    nameEn: 'Stationery',
    pain: 'Stock অস্পষ্ট',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8l6 6-14 14H8v-6L22 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 10l6 6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    screenContent: [
      { label: 'Stock আইটেম', value: '৪৫০+', color: 'var(--gold)' },
      { label: 'আজকের বিক্রি', value: '৳ ৮,৭০০', color: 'var(--gold)' },
      { label: 'Low Stock', value: '৮ আইটেম', color: '#FBBF24' },
      { label: 'Stock ভিউ', value: 'Clear ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 7,
    nameBn: 'ইলেকট্রনিক্স',
    nameEn: 'Electronics',
    pain: 'বিক্রির ইতিহাস নেই',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 28h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 28v2h4v-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="12" y="14" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="18" y="14" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    screenContent: [
      { label: 'বিক্রি হিস্ট্রি', value: 'Full ✓', color: 'var(--gold)' },
      { label: 'আজকের বিক্রি', value: '৳ ৫২,৩০০', color: 'var(--gold)' },
      { label: 'Warranty', value: '২৩ আইটেম', color: '#3B82F6' },
      { label: 'Return Rate', value: '২% ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 8,
    nameBn: 'মোবাইল শপ',
    nameEn: 'Mobile Shop',
    pain: 'লাভ বোঝা যায় না',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="6" width="12" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <line x1="16" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 10h6M15 13h4" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    ),
    screenContent: [
      { label: 'আজকের লাভ', value: '৳ ৪,৮০০', color: 'var(--gold)' },
      { label: 'আজকের বিক্রি', value: '৳ ৭৮,৫০০', color: 'var(--gold)' },
      { label: 'Profit View', value: '১০০% ✓', color: 'var(--gold)' },
      { label: 'Top Model', value: 'Redmi Note', color: '#A855F7' },
    ],
  },
  {
    id: 9,
    nameBn: 'পাইকারি',
    nameEn: 'Wholesale',
    pain: 'Multi-supplier chaos',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16l10-6 10 6v12l-10 6-10-6V16z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M18 10v16M8 16l10 6 10-6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    screenContent: [
      { label: 'Supplier পাওনা', value: '৳ ২,৩৫,০০০', color: '#FBBF24' },
      { label: 'আজকের বিক্রি', value: '৳ ১,২৫,০০০', color: 'var(--gold)' },
      { label: 'Supplier', value: '৫ জন', color: '#3B82F6' },
      { label: 'বিরোধ', value: '৬০% ↓', color: 'var(--gold)' },
    ],
  },
  {
    id: 10,
    nameBn: 'কৃষি',
    nameEn: 'Agro',
    pain: 'Batch ট্র্যাকিং নেই',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 30c0-10 12-14 12-22a6 6 0 00-12 0 6 6 0 00-12 0c0 8 12 12 12 22z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M18 30V16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M18 22c-4-2-7-6-7-10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M18 22c4-2 7-6 7-10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    screenContent: [
      { label: 'Batch Active', value: '১৫ Batch', color: 'var(--gold)' },
      { label: 'আজকের বিক্রি', value: '৳ ৪১,২০০', color: 'var(--gold)' },
      { label: 'Expiry Alert', value: '২ Batch', color: 'var(--crimson)' },
      { label: 'Batch ট্র্যাক', value: 'Active ✓', color: 'var(--gold)' },
    ],
  },
  {
    id: 11,
    nameBn: 'সুপার শপ',
    nameEn: 'Super Shop',
    pain: 'Multi-staff গোলমাল',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12h16v2l-2 12H12l-2-12v-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    screenContent: [
      { label: 'Staff Active', value: '৩ জন', color: 'var(--gold)' },
      { label: 'আজকের বিক্রি', value: '৳ ৯৫,৮০০', color: 'var(--gold)' },
      { label: 'Staff Perf', value: '৪০% ↑', color: 'var(--gold)' },
      { label: 'Daily Report', value: 'Auto ✓', color: '#3B82F6' },
    ],
  },
  {
    id: 12,
    nameBn: 'পরিবেশক',
    nameEn: 'Distributor',
    pain: 'Multi-branch অন্ধকার',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="24" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="11" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="25" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 18v-4M25 18v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    screenContent: [
      { label: 'Branch', value: '৫ টি', color: '#3B82F6' },
      { label: 'আজকের বিক্রি', value: '৳ ৩,৪৫,০০০', color: 'var(--gold)' },
      { label: 'Branch View', value: 'Clear ✓', color: 'var(--gold)' },
      { label: 'Route Plan', value: 'Active ✓', color: '#A855F7' },
    ],
  },
]

/* ── Grid span configuration for organic feel ── */
const gridSpans = [
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
]

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Phone Mockup for active business display ── */
function BusinessPhoneMockup({ business, isVisible, lang }: { business: BusinessType; isVisible: boolean; lang: Language }) {
  const { t } = useTranslation()
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={business.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="relative mx-auto"
          style={{
            width: '240px',
            height: '480px',
            background: 'linear-gradient(145deg, #1a1d1b 0%, #0d0f0e 100%)',
            borderRadius: '32px',
            border: '2px solid rgba(201,169,110,0.15)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,169,110,0.08)',
            padding: '8px',
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: '80px',
              height: '24px',
              background: '#0d0f0e',
              borderRadius: '0 0 14px 14px',
              zIndex: 10,
            }}
          />

          {/* Screen */}
          <div className="w-full h-full overflow-hidden rounded-[26px]" style={{ background: 'var(--ink)' }}>
            {/* Status bar */}
            <div
              className="flex items-center justify-between px-4 pt-9 pb-2"
              style={{ background: 'var(--ink-1)' }}
            >
              <span className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
                ৯:৪১
              </span>
              <span className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>
                HelloKhata
              </span>
              <span className="text-[10px]">📶 🔋</span>
            </div>

            {/* Business title */}
            <div
              className="mx-3 mt-2 rounded-xl p-2.5 text-center"
              style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
            >
              <p className="font-bengali text-[13px] text-white">{lang === 'en' ? business.nameEn : business.nameBn}</p>
              <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
                {lang === 'en' ? business.nameBn : business.nameEn}
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-1.5 px-3 mt-2">
              {business.screenContent.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2"
                  style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
                >
                  <p className="text-[8px] font-body" style={{ color: 'var(--text-ghost)' }}>
                    {item.label}
                  </p>
                  <p className="text-[11px] font-body font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Pain resolved */}
            <div
              className="mx-3 mt-2 rounded-lg p-2 flex items-center gap-1.5"
              style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)' }}
            >
              <span className="text-[12px]">✓</span>
              <span className="text-[9px] font-body" style={{ color: 'var(--gold)' }}>
                &quot;{t('businessTypes.pain' + business.id)}&quot; — {t('businessTypes.resolved')}
              </span>
            </div>

            {/* Mini bar chart */}
            <div
              className="mx-3 mt-2 rounded-lg p-2"
              style={{ background: 'var(--ink-2)', border: '1px solid var(--ink-border)' }}
            >
              <p className="text-[8px] font-body mb-1.5" style={{ color: 'var(--text-cream-muted)' }}>
                {t('businessTypes.weeklySales')}
              </p>
              <div className="flex items-end gap-1" style={{ height: '50px' }}>
                {[40, 60, 50, 80, 65, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        background: i === 6 ? 'var(--gold)' : 'rgba(201,169,110,0.3)',
                        height: `${h}%`,
                        minHeight: '3px',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main Business Types Section ── */
export default function BusinessTypesSection() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const { t, lang } = useTranslation()

  const handleCardClick = useCallback((id: number) => {
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  const activeBusiness = businessTypes.find((b) => b.id === activeId) || null

  return (
    <section
      id="business"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--ink-1) 0%, var(--cream) 50%, var(--cream) 100%)',
        padding: 'var(--section-v) 0',
      }}
    >
      {/* Subtle nakshi overlay at top transition zone */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{ background: 'var(--nakshi-pattern)', backgroundSize: '60px 60px', opacity: 0.3 }}
      />

      {/* Khata lines in cream zone */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[50%] left-0 right-0 bottom-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(0,0,0,0.03) 27px, rgba(0,0,0,0.03) 28px)',
            backgroundSize: '100% 28px',
          }}
        />
      </div>

      <div className="relative z-10 w-full mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--site-max)' }}>
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="inline-block font-body tracking-[0.15em] uppercase mb-4"
            style={{ fontSize: 'var(--fs-label)', color: 'var(--gold)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('businessTypes.eyebrow')}
          </motion.span>

          {/* Headline */}
          <h2 className="font-bengali" style={{ fontSize: 'var(--fs-h1)', color: 'var(--text-ink)', lineHeight: 1.15 }}>
            {t('businessTypes.headline')}
          </h2>

          {/* Sub-text */}
          <motion.p
            className="font-body mx-auto mt-4"
            style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', maxWidth: '560px', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('businessTypes.sub')}
          </motion.p>
        </motion.div>

        {/* ── Business Cards Grid ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{
            gridAutoRows: 'auto',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {businessTypes.map((biz, index) => {
            const isActive = activeId === biz.id
            const isDimmed = activeId !== null && !isActive

            return (
              <motion.div
                key={biz.id}
                variants={cardVariants}
                className={gridSpans[index]}
              >
                <motion.div
                  className={`relative cursor-pointer rounded-2xl p-4 md:p-5 h-full ${
                    gridSpans[index].includes('row-span-2') ? 'flex flex-col' : ''
                  }`}
                  style={{
                    background: isActive
                      ? 'rgba(255,255,255,1)'
                      : 'rgba(255,255,255,0.85)',
                    border: isActive
                      ? '2px solid var(--gold)'
                      : '1px solid var(--canvas-border)',
                    boxShadow: isActive
                      ? '0 12px 40px rgba(201,169,110,0.15), 0 0 0 4px rgba(201,169,110,0.08)'
                      : '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isDimmed ? 0.4 : 1,
                    transform: isActive ? 'none' : undefined,
                  }}
                  onClick={() => handleCardClick(biz.id)}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--gold)' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <span className="text-white text-[10px]">✓</span>
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div
                    className={`mb-3 ${gridSpans[index].includes('row-span-2') ? '' : ''}`}
                    style={{ color: isActive ? 'var(--gold)' : 'var(--text-ink)', transition: 'color 0.25s' }}
                  >
                    {biz.icon}
                  </div>

                  {/* Business Name */}
                  <h3
                    className="font-bengali font-bold text-[16px] md:text-[18px] leading-tight mb-0.5"
                    style={{ color: 'var(--text-ink)' }}
                  >
                    {lang === 'en' ? biz.nameEn : biz.nameBn}
                  </h3>
                  <p
                    className="font-body text-[12px] md:text-[13px] mb-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'en' ? biz.nameBn : biz.nameEn}
                  </p>

                  {/* Pain point */}
                  <p
                    className="font-body"
                    style={{ fontSize: '13px', color: 'var(--crimson)', lineHeight: 1.4 }}
                  >
                    #{t('businessTypes.pain' + biz.id)}
                  </p>

                  {/* Extra content for row-span-2 cards */}
                  {gridSpans[index].includes('row-span-2') && (
                    <div className="mt-auto pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {biz.screenContent.slice(0, 2).map((mod, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-body"
                            style={{
                              background: 'rgba(201,169,110,0.08)',
                              color: 'var(--gold-deep)',
                              border: '1px solid rgba(201,169,110,0.15)',
                            }}
                          >
                            {mod.label}: {mod.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Active Business Phone Display ── */}
        <AnimatePresence>
          {activeBusiness && (
            <motion.div
              className="hidden lg:flex flex-col items-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-body text-[14px] mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                <span style={{ color: 'var(--gold)' }}>HelloKhata</span> {t('businessTypes.manageWith')}{' '}
                <span className="font-bengali font-semibold" style={{ color: 'var(--text-ink)' }}>
                  {lang === 'en' ? activeBusiness.nameEn : activeBusiness.nameBn}
                </span>
              </p>
              <BusinessPhoneMockup business={activeBusiness} isVisible={true} lang={lang} />
              <button
                className="mt-4 font-body text-[13px] px-4 py-1.5 rounded-full"
                style={{
                  color: 'var(--gold-deep)',
                  background: 'rgba(201,169,110,0.08)',
                  border: '1px solid rgba(201,169,110,0.15)',
                }}
                onClick={() => setActiveId(null)}
              >
                {t('businessTypes.close')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile tap hint */}
        <motion.p
          className="lg:hidden text-center mt-6 font-body"
          style={{ fontSize: '13px', color: 'var(--text-ghost)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('businessTypes.tapHint')}
        </motion.p>
      </div>
    </section>
  )
}
