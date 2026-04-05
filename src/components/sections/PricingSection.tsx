'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/hellokhata/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/hellokhata/StaggerGroup';

/* ─── Types ─── */
interface Feature {
  name: string;
  shuru: boolean | string;
  bikash: boolean | string;
  utthan: boolean | string;
}

/* ─── Data ─── */
const tiers = [
  {
    id: 'shuru',
    nameBn: 'শুরু',
    nameEn: 'Shuru — Beginning',
    tierIcon: '🌱',
    priceMonthly: 'বিনামূল্যে',
    priceYearly: 'বিনামূল্যে',
    forText: 'যারা এইমাত্র শুরু করছেন',
    highlighted: false,
    badge: null,
    features: [
      '১টি ব্যবসা',
      'প্রতিদিন ৫০টি এন্ট্রি',
      'ভয়েস কমান্ড (দৈনিক ২০টি)',
      'বেসিক রিপোর্ট',
      'কাস্টমার খাতা',
      '১ জন স্টাফ',
    ],
    cta: 'বিনামূল্যে শুরু করুন',
    ctaStyle: 'outline' as const,
  },
  {
    id: 'bikash',
    nameBn: 'বিকাশ',
    nameEn: 'Bikash — Growth',
    tierIcon: '🚀',
    priceMonthly: '৳৪৯৯/মাস',
    priceYearly: '৳৩৯৯/মাস',
    forText: 'বেশিরভাগ দোকানের জন্য সেরা',
    highlighted: true,
    badge: 'সবচেয়ে জনপ্রিয়',
    features: [
      'সব শুরু ফিচার',
      'আনলিমিটেড এন্ট্রি',
      'আনলিমিটেড ভয়েস কমান্ড',
      'ব্যাচ ম্যানেজমেন্ট',
      'এক্সপায়ারি ট্র্যাকিং',
      'সাপ্লায়ার ম্যানেজমেন্ট',
      'অ্যাডভান্সড রিপোর্ট',
      '৫ জন পর্যন্ত স্টাফ',
      'SMS রিমাইন্ডার',
      'প্রায়োরিটি সাপোর্ট',
    ],
    cta: 'বিকাশ শুরু করুন',
    ctaStyle: 'filled' as const,
  },
  {
    id: 'utthan',
    nameBn: 'উত্থান',
    nameEn: 'Utthan — Rise',
    tierIcon: '👑',
    priceMonthly: '৳৯৯৯/মাস',
    priceYearly: '৳৭৯৯/মাস',
    forText: 'একাধিক শাখা, বড় টিম',
    highlighted: false,
    badge: null,
    features: [
      'সব বিকাশ ফিচার',
      'মাল্টি-ব্রাঞ্চ',
      'আনলিমিটেড স্টাফ',
      'AI ইনসাইট',
      'কাস্টম রিপোর্ট',
      'API অ্যাক্সেস',
      'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার',
      'যেকোনো সংখ্যক ব্যবসা',
      'হোয়াইটলেবেল অপশন',
      'কাস্টম ইন্টিগ্রেশন',
      'SLA গ্যারান্টি',
      'ট্রেনিং ও অনবোর্ডিং',
      'প্রায়োরিটি সাপোর্ট',
      'আপটাইম গ্যারান্টি ৯৯.৯%',
    ],
    cta: 'উত্থান শুরু করুন',
    ctaStyle: 'outline' as const,
  },
];

const comparisonFeatures: Feature[] = [
  { name: 'ব্যবসা', shuru: '১টি', bikash: '৩টি', utthan: 'আনলিমিটেড' },
  { name: 'দৈনিক এন্ট্রি', shuru: '৫০টি', bikash: true, utthan: true },
  { name: 'ভয়েস কমান্ড', shuru: 'দৈনিক ২০টি', bikash: true, utthan: true },
  { name: 'রিপোর্ট', shuru: 'বেসিক', bikash: 'অ্যাডভান্সড', utthan: 'কাস্টম' },
  { name: 'স্টাফ', shuru: '১ জন', bikash: '৫ জন', utthan: true },
  { name: 'ব্যাচ ম্যানেজমেন্ট', shuru: false, bikash: true, utthan: true },
  { name: 'এক্সপায়ারি ট্র্যাকিং', shuru: false, bikash: true, utthan: true },
  { name: 'সাপ্লায়ার ম্যানেজমেন্ট', shuru: false, bikash: true, utthan: true },
  { name: 'মাল্টি-ব্রাঞ্চ', shuru: false, bikash: false, utthan: true },
  { name: 'API অ্যাক্সেস', shuru: false, bikash: false, utthan: true },
];

const faqs = [
  {
    q: 'HelloKhata কি অফলাইনে কাজ করে?',
    a: 'হ্যাঁ, ইন্টারনেট ছাড়াও ব্যবহার করতে পারবেন। আপনার ডেটা স্থানীয়ভাবে সংরক্ষিত থাকবে এবং ইন্টারনেট পেলে অটো-সিঙ্ক হয়ে যাবে।',
  },
  {
    q: 'আমার ডেটা কি নিরাপদ?',
    a: 'আপনার সব ডেটা encrypted আকারে সংরক্ষিত। আমরা industry-standard security ব্যবহার করি এবং আপনার ডেটা কখনো তৃতীয় পক্ষের সাথে শেয়ার করি না।',
  },
  {
    q: 'কোনো কার্ড লাগবে?',
    a: 'না, কোনো কার্ড লাগবে না। শুরু প্ল্যান সম্পূর্ণ বিনামূল্যে। প্রিমিয়াম প্ল্যানে bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট করতে পারবেন।',
  },
  {
    q: 'বাংলায় কি সব পাবো?',
    a: 'হ্যাঁ, পুরো অ্যাপ বাংলায় পাবেন। ভয়েস কমান্ডও বাংলায় কাজ করে। আমরা বাংলাদেশের দোকানদারদের জন্যই তৈরি করেছি।',
  },
  {
    q: 'যেকোনো সময় বন্ধ করা যাবে?',
    a: 'হ্যাঁ, যেকোনো সময় বন্ধ করতে পারবেন। কোনো locked-in contract নেই। আপনার সব ডেটা এক্সপোর্ট করে নিতে পারবেন।',
  },
];

/* ─── Helpers ─── */
function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-[var(--gold)] mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-[var(--text-ghost)] mx-auto" />;
  return <span className="text-[var(--text-cream-muted)] text-sm">{value}</span>;
}

/* ─── Animated Number Badge ─── */
function AnimatedSavingsBadge() {
  const [displayNum, setDisplayNum] = useState(0);
  const animRef = useRef<number | null>(null);

  // Count-up animation on mount (AnimatePresence handles unmount)
  useEffect(() => {
    const duration = 600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayNum(Math.round(eased * 20));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    }

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.6, x: -10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="px-3 py-1 rounded-full text-xs font-bold font-body text-white"
      style={{ backgroundColor: 'var(--gold)' }}
    >
      {displayNum}% সাশ্রয়
    </motion.span>
  );
}

/* ─── Pill Toggle Component ─── */
function PillToggle({ isYearly, onToggle }: { isYearly: boolean; onToggle: () => void }) {
  return (
    <div
      className="relative inline-flex items-center rounded-full p-1 cursor-pointer select-none"
      style={{
        background: 'var(--ink-2)',
        border: '1px solid var(--ink-border)',
      }}
      onClick={onToggle}
      role="switch"
      aria-checked={isYearly}
      aria-label="Toggle yearly pricing"
    >
      {/* Sliding circle indicator */}
      <motion.div
        className="absolute top-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-full"
        style={{
          background: 'var(--gold)',
          boxShadow: '0 2px 8px rgba(201,169,110,0.3)',
        }}
        animate={{ left: isYearly ? 'calc(50% + 2px)' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <span
        className="relative z-10 px-4 py-1.5 text-sm font-body font-medium transition-colors"
        style={{ color: !isYearly ? 'var(--gold)' : 'var(--text-cream-muted)' }}
      >
        Monthly
      </span>
      <span
        className="relative z-10 px-4 py-1.5 text-sm font-body font-medium transition-colors"
        style={{ color: isYearly ? 'white' : 'var(--text-cream-muted)' }}
      >
        Yearly
      </span>
    </div>
  );
}

/* ─── Component ─── */
export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="pricing" className="relative">
      {/* ─── Pricing Cards ─── */}
      <div className="relative bg-[var(--cream)] py-[clamp(80px,10vw,160px)] px-4">
        {/* Nakshi diamond micro-texture on container */}
        <div className="texture-nakshi-diamond absolute inset-0 pointer-events-none opacity-50" />

        <div className="max-w-[1380px] mx-auto relative z-10">
          {/* Header */}
          <Reveal className="text-center mb-12">
            <h2
              className="font-bengali text-[var(--fs-h1)] text-[var(--text-ink)] mb-4"
              style={{ lineHeight: 1.2 }}
            >
              সহজ মূল্য। কোনো লুকানো কথা নেই।
            </h2>
            <p className="font-body text-[var(--text-muted)] text-[var(--fs-body-lg)]">
              Transparent pricing. Cancel anytime. No contracts.
            </p>
          </Reveal>

          {/* Toggle */}
          <Reveal delay={0.15} className="flex items-center justify-center gap-4 mb-14">
            <PillToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
            <AnimatePresence>
              {isYearly && (
                <AnimatedSavingsBadge />
              )}
            </AnimatePresence>
          </Reveal>

          {/* Cards */}
          <StaggerGroup
            stagger={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
          >
            {tiers.map((tier) => (
              <StaggerItem key={tier.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`relative rounded-[var(--card-r)] p-6 lg:p-8 flex flex-col overflow-hidden ${
                    tier.highlighted ? 'md:scale-[1.03] pt-10' : ''
                  }`}
                  style={{
                    background: 'rgba(22,25,24,0.6)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: tier.highlighted
                      ? '1.5px solid var(--gold)'
                      : '1px solid var(--ink-border)',
                    ...(tier.highlighted
                      ? {
                          boxShadow:
                            '0 0 0 1px var(--gold), 0 0 40px var(--gold-glow), 0 20px 60px rgba(0,0,0,0.3)',
                        }
                      : {}),
                  }}
                >
                  {/* Gradient shine bar at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                      opacity: tier.highlighted ? 0.8 : 0.3,
                    }}
                  />

                  {/* Most Popular ribbon corner (Bikash tier) */}
                  {tier.highlighted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.3 }}
                      className="absolute top-0 right-0 z-20"
                    >
                      <div
                        className="px-5 py-1.5 text-[10px] font-bold font-body text-white rounded-bl-xl"
                        style={{
                          background: 'var(--gold)',
                          boxShadow: '0 4px 12px var(--gold-glow)',
                        }}
                      >
                        Most Popular
                      </div>
                    </motion.div>
                  )}

                  {/* Badge (non-ribbon) */}
                  {tier.badge && !tier.highlighted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold font-body text-white z-10"
                      style={{ backgroundColor: 'var(--gold)' }}
                    >
                      {tier.badge}
                    </motion.div>
                  )}

                  {/* Tier Icon */}
                  <div className="mb-3">
                    <span className="text-3xl">{tier.tierIcon}</span>
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <h3
                      className="font-bengali text-2xl text-[var(--text-cream)]"
                      style={{ lineHeight: 1.3 }}
                    >
                      {tier.nameBn}
                    </h3>
                    <p className="font-body text-[var(--text-cream-muted)] text-xs mt-1">
                      {tier.nameEn}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <motion.span
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-bengali text-3xl lg:text-4xl text-[var(--text-cream)]"
                    >
                      {isYearly ? tier.priceYearly : tier.priceMonthly}
                    </motion.span>
                  </div>

                  {/* For */}
                  <p className="font-body text-[var(--text-cream-muted)] text-sm mb-6">
                    {tier.forText}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px mb-6" style={{ backgroundColor: 'var(--ink-border)' }} />

                  {/* Features */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0 mt-0.5"
                          style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}
                        >
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: 'var(--gold)' }}
                          />
                        </span>
                        <span className="font-body text-sm text-[var(--text-cream-muted)]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="w-full py-3 rounded-xl font-body text-sm font-semibold transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                    style={
                      tier.ctaStyle === 'filled'
                        ? {
                            backgroundColor: 'var(--gold)',
                            color: 'white',
                            boxShadow: '0 4px 20px var(--gold-glow)',
                          }
                        : {
                            backgroundColor: 'transparent',
                            color: 'var(--text-cream)',
                            border: '1.5px solid var(--ink-border-strong)',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (tier.ctaStyle === 'filled') {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          '0 4px 30px var(--gold-glow-strong)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      } else {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tier.ctaStyle === 'filled') {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          '0 4px 20px var(--gold-glow)';
                      } else {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'var(--ink-border-strong)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-cream)';
                      }
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      {/* ─── Feature Comparison Table ─── */}
      <div className="bg-[var(--cream-2)] py-[clamp(80px,10vw,160px)] px-4">
        <Reveal className="max-w-[900px] mx-auto">
          {/* Mobile horizontal scroll wrapper */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div
              className="rounded-[var(--card-r)] overflow-hidden border min-w-[560px]"
              style={{
                background: 'var(--ink-1)',
                borderColor: 'var(--ink-border)',
              }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-4 gap-0 text-center py-4 px-6"
                style={{ borderBottom: '1px solid var(--ink-border)' }}
              >
                <div className="text-left">
                  <span className="font-body text-xs text-[var(--text-cream-muted)] uppercase tracking-wider">
                    ফিচার
                  </span>
                </div>
                <div>
                  <span className="font-bengali text-sm text-[var(--text-cream)]">শুরু</span>
                </div>
                <div>
                  <span
                    className="font-bengali text-sm"
                    style={{ color: 'var(--gold)' }}
                  >
                    বিকাশ
                  </span>
                </div>
                <div>
                  <span className="font-bengali text-sm text-[var(--text-cream)]">উত্থান</span>
                </div>
              </div>

              {/* Table rows */}
              {comparisonFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-0 text-center items-center py-3.5 px-6"
                  style={{
                    borderBottom:
                      i < comparisonFeatures.length - 1
                        ? '1px solid var(--ink-border)'
                        : 'none',
                    backgroundColor:
                      i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="text-left">
                    <span className="font-body text-sm text-[var(--text-cream-muted)]">
                      {feature.name}
                    </span>
                  </div>
                  <div>
                    <CellValue value={feature.shuru} />
                  </div>
                  <div>
                    <CellValue value={feature.bikash} />
                  </div>
                  <div>
                    <CellValue value={feature.utthan} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── Guarantee ─── */}
      <div
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: 'var(--ink)' }}
      >
        {/* Green glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--gold-glow) 0%, transparent 70%)',
          }}
        />
        <Reveal className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              border: '1px solid rgba(201, 169, 110, 0.3)',
              background: 'rgba(201, 169, 110, 0.08)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
            <span className="font-body text-xs" style={{ color: 'var(--gold)' }}>
              ১০০% গ্যারান্টি
            </span>
          </div>
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-cream)] mb-4"
            style={{ lineHeight: 1.3 }}
          >
            ৩০ দিনের মানি-ব্যাক গ্যারান্টি।
          </h3>
          <p className="font-body text-[var(--text-cream-muted)] text-[var(--fs-body)] max-w-xl mx-auto">
            পছন্দ না হলে সম্পূর্য টাকা ফেরত। কোনো প্রশ্ন ছাড়া।
          </p>
        </Reveal>
      </div>

      {/* ─── FAQ ─── */}
      <div className="bg-[var(--cream)] py-[clamp(80px,10vw,160px)] px-4">
        <div className="max-w-[720px] mx-auto">
          <Reveal className="text-center mb-12">
            <h3
              className="font-bengali text-[var(--fs-h3)] text-[var(--text-ink)] mb-3"
              style={{ lineHeight: 1.3 }}
            >
              সচরাচর জিজ্ঞাসা
            </h3>
            <p className="font-body text-[var(--text-muted)] text-[var(--fs-body)]">
              Frequently asked questions
            </p>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      background: 'white',
                      borderColor: isOpen ? 'var(--gold)' : 'var(--canvas-border)',
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1 pr-4">
                        {/* Green accent bar on left when open */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isOpen ? 28 : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="w-[3px] rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--gold)' }}
                        />
                        <span className="font-bengali text-base text-[var(--text-ink)]">
                          {faq.q}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-6 pb-5 font-body text-[var(--text-muted)] text-[var(--fs-body)]"
                            style={{ lineHeight: 1.7 }}
                          >
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
