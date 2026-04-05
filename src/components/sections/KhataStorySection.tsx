'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HorizonLine } from '@/components/hellokhata/HorizonLine';
import { useTranslation } from '@/hooks/use-translation';

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Old Paper Khata SVG ── */
function KhataIllustration() {
  return (
    <motion.div
      className="w-full max-w-md mx-auto my-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Paper shadow */}
        <rect x="20" y="18" width="440" height="300" rx="4" fill="rgba(13,15,14,0.06)" />
        {/* Left page */}
        <rect x="10" y="8" width="215" height="300" rx="3" fill="#F5F0E6" stroke="#D4C9A8" strokeWidth="1" />
        {/* Right page */}
        <rect x="225" y="8" width="215" height="300" rx="3" fill="#FAF6ED" stroke="#D4C9A8" strokeWidth="1" />
        {/* Spine */}
        <line x1="220" y1="8" x2="220" y2="308" stroke="#C4B896" strokeWidth="1.5" />
        {/* Worn edge marks */}
        <path d="M10 50 Q8 55 10 60" stroke="#C4B896" strokeWidth="0.5" fill="none" />
        <path d="M10 180 Q7 185 10 190" stroke="#C4B896" strokeWidth="0.5" fill="none" />
        <path d="M440 90 Q443 95 440 100" stroke="#C4B896" strokeWidth="0.5" fill="none" />
        <path d="M440 250 Q442 255 440 260" stroke="#C4B896" strokeWidth="0.5" fill="none" />

        {/* Ruled lines - left page */}
        {[50, 75, 100, 125, 150, 175, 200, 225, 250].map((y) => (
          <line key={`ll-${y}`} x1="25" y1={y} x2="210" y2={y} stroke="#D4C9A8" strokeWidth="0.5" />
        ))}
        {/* Ruled lines - right page */}
        {[50, 75, 100, 125, 150, 175, 200, 225, 250].map((y) => (
          <line key={`rl-${y}`} x1="240" y1={y} x2="425" y2={y} stroke="#D4C9A8" strokeWidth="0.5" />
        ))}

        {/* Left page - Handwritten Bengali text (simulated) */}
        <text x="30" y="48" fontFamily="serif" fontSize="11" fill="#5C4A2A" fontWeight="bold">খাতা নং ০৩</text>
        {/* Entries */}
        <text x="30" y="74" fontFamily="serif" fontSize="10" fill="#6B5A3E">রহিম মিয়া — চাল ৫ কেজি</text>
        <text x="170" y="74" fontFamily="serif" fontSize="10" fill="#B8860B" textAnchor="end">৳ ৪৫০</text>
        <text x="30" y="99" fontFamily="serif" fontSize="10" fill="#6B5A3E">সালমা বেগম — তেল ২ লিটার</text>
        <text x="170" y="99" fontFamily="serif" fontSize="10" fill="#B8860B" textAnchor="end">৳ ৩২০</text>
        <text x="30" y="124" fontFamily="serif" fontSize="10" fill="#6B5A3E">কামাল ভাই — চিনি ৩ কেজি</text>
        <text x="170" y="124" fontFamily="serif" fontSize="10" fill="#B8860B" textAnchor="end">৳ ৩৬০</text>
        <text x="30" y="149" fontFamily="serif" fontSize="10" fill="#6B5A3E">নুরু মিয়া — ডাল ২ কেজি</text>
        <text x="170" y="149" fontFamily="serif" fontSize="10" fill="#B8860B" textAnchor="end">৳ ২৪০</text>
        <text x="30" y="174" fontFamily="serif" fontSize="10" fill="#6B5A3E">হাসিনা আপা — আটা ৫ কেজি</text>
        <text x="170" y="174" fontFamily="serif" fontSize="10" fill="#B8860B" textAnchor="end">৳ ৫৫০</text>
        <text x="30" y="199" fontFamily="serif" fontSize="10" fill="#6B5A3E">... (বাকি আছে)</text>

        {/* Right page - More entries */}
        <text x="240" y="48" fontFamily="serif" fontSize="11" fill="#5C4A2A" fontWeight="bold">বাকি হিসাব</text>
        <text x="240" y="74" fontFamily="serif" fontSize="10" fill="#6B5A3E">রহিম মিয়া</text>
        <text x="415" y="74" fontFamily="serif" fontSize="10" fill="#DC2626" textAnchor="end">৳ ১,২০০</text>
        <text x="240" y="99" fontFamily="serif" fontSize="10" fill="#6B5A3E">সালমা বেগম</text>
        <text x="415" y="99" fontFamily="serif" fontSize="10" fill="#DC2626" textAnchor="end">৳ ৮৫০</text>
        <text x="240" y="124" fontFamily="serif" fontSize="10" fill="#6B5A3E">কামাল ভাই</text>
        <text x="415" y="124" fontFamily="serif" fontSize="10" fill="#DC2626" textAnchor="end">৳ ২,১০০</text>
        <text x="240" y="149" fontFamily="serif" fontSize="10" fill="#6B5A3E">নুরু মিয়া</text>
        <text x="415" y="149" fontFamily="serif" fontSize="10" fill="#DC2626" textAnchor="end">৳ ৪৫০</text>

        {/* Total line */}
        <line x1="240" y1="165" x2="425" y2="165" stroke="#5C4A2A" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="240" y="184" fontFamily="serif" fontSize="11" fill="#5C4A2A" fontWeight="bold">মোট বাকি</text>
        <text x="415" y="184" fontFamily="serif" fontSize="12" fill="#DC2626" fontWeight="bold" textAnchor="end">৳ ???</text>

        {/* Question marks scattered */}
        <text x="390" y="184" fontFamily="serif" fontSize="18" fill="rgba(220,38,38,0.3)" fontWeight="bold">?</text>
        <text x="350" y="220" fontFamily="serif" fontSize="14" fill="rgba(220,38,38,0.2)">?</text>
        <text x="300" y="240" fontFamily="serif" fontSize="10" fill="rgba(220,38,38,0.15)">সঠিক কত?</text>

        {/* Coffee stain ring */}
        <circle cx="380" cy="270" r="22" stroke="#C4A882" strokeWidth="0.8" fill="rgba(196,168,130,0.08)" />
        <circle cx="380" cy="270" r="18" stroke="#C4A882" strokeWidth="0.4" fill="none" />

        {/* Pen mark */}
        <line x1="60" y1="220" x2="130" y2="222" stroke="#5C4A2A" strokeWidth="0.8" />
        <line x1="60" y1="228" x2="110" y2="230" stroke="#5C4A2A" strokeWidth="0.8" />

        {/* Crossed out entry */}
        <text x="60" y="250" fontFamily="serif" fontSize="9" fill="rgba(107,90,62,0.5)" textDecoration="line-through">জামাল — ৳ ৩০০</text>

        {/* Red ink correction */}
        <text x="60" y="275" fontFamily="serif" fontSize="9" fill="rgba(220,38,38,0.6)">✗ ভুল এন্ট্রি</text>
      </svg>
    </motion.div>
  );
}

/* ── Pain Card ── */
function PainCard({
  title,
  description,
  impact,
}: {
  title: string;
  description: string;
  impact: string;
}) {
  return (
    <motion.div
      className="relative p-5 md:p-6 rounded-[var(--card-r)]"
      style={{
        background: 'var(--ink-1)',
        borderLeft: '3px solid var(--crimson)',
      }}
      variants={fadeUp}
    >
      <h4
        className="font-bengali text-base md:text-lg mb-3"
        style={{ color: 'white', fontWeight: 700 }}
      >
        {title}
      </h4>
      <p
        className="font-bengali text-sm md:text-[15px] mb-4"
        style={{ color: 'var(--text-cream-muted)', lineHeight: 1.8 }}
      >
        {description}
      </p>
      <p
        className="font-bengali text-sm font-semibold"
        style={{ color: 'var(--crimson)' }}
      >
        {impact}
      </p>
    </motion.div>
  );
}

/* ── Main Khata Story Section ── */
export default function KhataStorySection() {
  const { t, lang } = useTranslation();
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: '-40px' });
  const chapter1Ref = useRef<HTMLDivElement>(null);
  const isChapter1InView = useInView(chapter1Ref, { once: true, margin: '-60px' });
  const chapter2Ref = useRef<HTMLDivElement>(null);
  const isChapter2InView = useInView(chapter2Ref, { once: true, margin: '-60px' });
  const chapter3Ref = useRef<HTMLDivElement>(null);
  const isChapter3InView = useInView(chapter3Ref, { once: true, margin: '-60px' });
  const painsRef = useRef<HTMLDivElement>(null);
  const isPainsInView = useInView(painsRef, { once: true, margin: '-60px' });

  const painPointsData = lang === 'bn' ? [
    {
      title: 'বাকি ভুলে যাওয়া',
      description: 'কাগজে লেখা বাকি হারিয়ে যায়। গ্রাহক বলে "আমি দিয়েছি", দোকানদার বলে "আপনি দেননি"। সম্পর্ক নষ্ট হয়।',
      impact: 'ক্ষতি: গড় ৳৮,৫০০/মাস',
    },
    {
      title: 'Stock এর অন্ধকার',
      description: 'কোন পণ্য কত আছে তার ঠিক নেই। চাহিদা থাকার পরেও বিক্রি হারানো যায়। পুরনো stock পড়ে থাকে।',
      impact: 'বিক্রি হারানো: ১২%',
    },
    {
      title: 'লাভ না ক্ষতি',
      description: 'মাস শেষে বুঝতে পারেন না লাভ হলো নাকি ক্ষতি। কোথায় টাকা খরচ হলো, কোথা থেকে আয় হলো — কিছুই পরিষ্কার না।',
      impact: '৬৭% ব্যবসা সঠিক লাভ জানে না',
    },
    {
      title: 'Expired Product',
      description: 'মেয়াদ পার হওয়া পণ্য বিক্রি হওয়ার আগেই নষ্ট হয়ে যায়। বিশেষ করে ফার্মেসি ও খাদ্য দোকানে এই সমস্যা ভয়াবহ।',
      impact: 'ফার্মেসিতে গড় ক্ষতি: ৳১৫,০০০/বছর',
    },
    {
      title: 'Supplier এর জটিলতা',
      description: 'কোন supplier থেকে কত বকেয়া, কে কখন দেবে — কিছুই মনে নেই। Supplier এর সাথে বিরোধে সম্পর্ক নষ্ট হয়।',
      impact: 'Supplier বিরোধ: ৪৫% ব্যবসায়',
    },
    {
      title: 'কর্মী ম্যানেজমেন্ট',
      description: 'কর্মী ঠিকমতো কাজ করছে কি না বুঝতে পারেন না। কে কত পণ্য বিক্রি করলো, ক্যাশ কত নিলো — কোনো tracking নেই।',
      impact: 'কার্যক্ষমতা কমে ৩০%',
    },
  ] : [
    {
      title: 'Forgotten Dues',
      description: 'Paper records get lost. Customers say "I already paid" while shopkeepers say "You did not." Relationships are ruined.',
      impact: 'Loss: Avg ৳8,500/month',
    },
    {
      title: 'Stock Blindness',
      description: 'No clear idea of how much inventory is in stock. Sales are lost even when demand exists. Old stock piles up.',
      impact: 'Lost sales: 12%',
    },
    {
      title: 'Profit or Loss?',
      description: 'At month-end, you cannot tell if it was profit or loss. Where the money went, where it came from — nothing is clear.',
      impact: '67% of businesses do not know their actual profit',
    },
    {
      title: 'Expired Products',
      description: 'Products expire before they can be sold. Especially devastating for pharmacies and food shops.',
      impact: 'Avg pharmacy loss: ৳15,000/year',
    },
    {
      title: 'Supplier Confusion',
      description: 'No idea how much is owed to which supplier, who will pay when. Disputes with suppliers damage relationships.',
      impact: 'Supplier disputes: 45% of businesses',
    },
    {
      title: 'Staff Management',
      description: 'No way to know if staff are working properly. Who sold how much, how much cash they took — no tracking at all.',
      impact: 'Efficiency drops by 30%',
    },
  ];

  return (
    <section id="khata-story" className="relative overflow-hidden">
      {/* ────────────────────────────────────
          PART 1: Editorial Story (cream background)
          ──────────────────────────────────── */}
      <div
        ref={storyRef}
        className="relative"
        style={{ background: 'var(--cream-2)' }}
      >
        <div className="khata-lines absolute inset-0 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-[720px] mx-auto px-6 py-20 md:py-28"
          variants={containerVariants}
          initial="hidden"
          animate={isStoryInView ? 'visible' : 'hidden'}
        >
          {/* Section opener */}
          <motion.div className="text-center mb-4" variants={fadeUp}>
            <p
              className="font-display italic text-sm tracking-widest uppercase mb-6"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}
            >
              {t('khataStory.eyebrow')}
            </p>
          </motion.div>

          {/* SVG Khata Illustration */}
          <motion.div variants={fadeUp}>
            <KhataIllustration />
          </motion.div>

          {/* Chapter 1 */}
          <div ref={chapter1Ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isChapter1InView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fadeIn} className="mb-4 mt-4">
                <span
                  className="font-body text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--gold)' }}
                >
                  {t('khataStory.chapter.one')}
                </span>
              </motion.div>
              <motion.h2
                className="font-bengali text-2xl md:text-3xl mb-8"
                style={{ color: 'var(--text-ink)', fontWeight: 800, lineHeight: 1.3 }}
                variants={fadeUp}
              >
                {t('khataStory.ch1Title')}
              </motion.h2>
              <motion.p
                className="font-bengali text-base md:text-lg mb-6"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch1Body1')}
              </motion.p>
              <motion.p
                className="font-bengali text-base md:text-lg mb-6"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch1Body2')}
              </motion.p>
              <motion.p
                className="font-display italic text-[15px]"
                style={{ color: 'var(--text-muted)' }}
                variants={fadeUp}
              >
                {t('khataStory.ch1Italics')}
              </motion.p>
            </motion.div>
          </div>

          {/* Separator */}
          <div className="my-14">
            <HorizonLine variant="subtle" />
          </div>

          {/* Chapter 2 */}
          <div ref={chapter2Ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isChapter2InView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fadeIn} className="mb-4">
                <span
                  className="font-body text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--gold)' }}
                >
                  {t('khataStory.chapter.two')}
                </span>
              </motion.div>
              <motion.h2
                className="font-bengali text-2xl md:text-3xl mb-8"
                style={{ color: 'var(--text-ink)', fontWeight: 800, lineHeight: 1.3 }}
                variants={fadeUp}
              >
                {t('khataStory.ch2Title')}
              </motion.h2>
              <motion.p
                className="font-bengali text-base md:text-lg mb-8"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch2Body1')}
              </motion.p>

              {/* Data pullquote */}
              <motion.blockquote
                className="relative pl-6 py-4 my-10"
                style={{ borderLeft: '4px solid var(--gold)' }}
                variants={fadeUp}
              >
                <p
                  className="font-display italic text-xl md:text-2xl"
                  style={{ color: 'var(--gold-deep)', lineHeight: 1.5 }}
                >
                  {t('khataStory.ch2Pullquote')}
                </p>
                <p
                  className="font-body text-sm mt-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('khataStory.ch2PullquoteSource')}
                </p>
              </motion.blockquote>

              <motion.p
                className="font-bengali text-base md:text-lg"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch2Body2')}
              </motion.p>
            </motion.div>
          </div>

          {/* Separator */}
          <div className="my-14">
            <HorizonLine variant="subtle" />
          </div>

          {/* Chapter 3 */}
          <div ref={chapter3Ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isChapter3InView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fadeIn} className="mb-4">
                <span
                  className="font-body text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--gold)' }}
                >
                  {t('khataStory.chapter.three')}
                </span>
              </motion.div>
              <motion.h2
                className="font-bengali text-2xl md:text-3xl mb-8"
                style={{ color: 'var(--text-ink)', fontWeight: 800, lineHeight: 1.3 }}
                variants={fadeUp}
              >
                {t('khataStory.ch3Title')}
              </motion.h2>
              <motion.p
                className="font-bengali text-base md:text-lg mb-6"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch3Body1')}
              </motion.p>
              <motion.p
                className="font-bengali text-base md:text-lg mb-6"
                style={{ color: 'var(--text-body)', lineHeight: 1.9 }}
                variants={fadeUp}
              >
                {t('khataStory.ch3Body2')}
              </motion.p>

              {/* Horizon separator */}
              <div className="my-10">
                <HorizonLine variant="glowing" />
              </div>

              <motion.p
                className="font-bengali text-xl md:text-2xl text-center font-bold"
                style={{ color: 'var(--text-ink)', lineHeight: 1.5 }}
                variants={fadeUp}
              >
                {t('khataStory.ch3Closing')}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ────────────────────────────────────
          PART 2: Pain Points (dark background)
          ──────────────────────────────────── */}
      <div
        ref={painsRef}
        className="relative"
        style={{ background: 'var(--ink)' }}
      >
        {/* Subtle texture */}
        <div
          className="texture-nakshi-subtle absolute inset-0 pointer-events-none"
          style={{ opacity: 0.04 }}
        />

        <motion.div
          className="relative z-10 max-w-[var(--site-max)] mx-auto px-6 py-20 md:py-28"
          variants={containerVariants}
          initial="hidden"
          animate={isPainsInView ? 'visible' : 'hidden'}
        >
          {/* Headline */}
          <motion.div className="text-center mb-14" variants={fadeUp}>
            <span
              className="font-body text-xs font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--crimson)' }}
            >
              {t('khataStory.painsEyebrow')}
            </span>
            <h2
              className="font-bengali text-2xl md:text-4xl"
              style={{ color: 'white', fontWeight: 800, lineHeight: 1.2 }}
            >
              {t('khataStory.painsHeadline')}
            </h2>
          </motion.div>

          {/* 6 Pain Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto mb-16">
            {painPointsData.map((pain) => (
              <PainCard
                key={pain.title}
                title={pain.title}
                description={pain.description}
                impact={pain.impact}
              />
            ))}
          </div>

          {/* Green separator line */}
          <div className="flex items-center justify-center mb-12">
            <div
              className="w-24 h-0.5"
              style={{ background: 'var(--gold)' }}
            />
          </div>

          {/* Closing statement */}
          <motion.div
            className="text-center max-w-lg mx-auto"
            variants={fadeUp}
          >
            <p
              className="font-bengali text-lg md:text-xl mb-8"
              style={{ color: 'var(--text-cream-muted)', lineHeight: 1.8 }}
            >
              {t('khataStory.closing')}
            </p>

            {/* CTA Button */}
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bengali text-base font-semibold text-white"
              style={{ background: 'var(--gold)' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 32px rgba(201,169,110,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const featuresEl = document.getElementById('features');
                if (featuresEl) {
                  featuresEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('khataStory.cta')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
