'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/hellokhata/Reveal';
import { AnimatedCounter } from '@/components/hellokhata/AnimatedCounter';
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface StatItem {
  target: number;
  suffix?: string;
  label: string;
  colorClass: string;
  showStar?: boolean;
}

/* ─────────────────────────────────────────────
   Marquee rows (shop names — NOT translated)
   ───────────────────────────────────────────── */

const marqueeRow1 = [
  'করিম স্টোর',
  'রহিম ফার্মেসি',
  'ফাতেমা টেইলার্স',
  'জামান ইলেকট্রনিক্স',
  'আকবর মুদি ডালা',
  'নাসরিন বিউটি পার্লার',
  'হাসান হার্ডওয়্যার',
  'সালমা জুট হাউজ',
  'রফিক মোবাইল শপ',
  'মালেকা জুয়েলার্স',
];

const marqueeRow2 = [
  'তাসনিম ফ্যাশন',
  'ইসলাম ট্রেডিং',
  'পারভীন রেস্টুরেন্ট',
  'মোস্তফা সুপার শপ',
  'শারমিন কাপড়ের দোকান',
  'বাবুল ইলেকট্রিক্স',
  'নূরজাহান স্টেশনারি',
  'কামাল সিমেন্ট হাউজ',
  'রুবিনা মেডিকেল',
  'আলী হাউজিং',
];

function MarqueeRow({
  items,
  direction = 'left',
}: {
  items: string[];
  direction?: 'left' | 'right';
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap font-bengali text-[16px]"
            style={{ color: 'var(--gold)', opacity: 0.4 }}
          >
            {name}
            <span className="ml-8" style={{ color: 'var(--gold)', opacity: 0.3 }}>
              •
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <div className="relative flex flex-col items-center px-3 text-center md:px-4">
      <div className="flex items-baseline">
        <span
          className={`font-bengali text-[28px] font-bold md:text-[36px] ${stat.colorClass}`}
        >
          <AnimatedCounter
            target={stat.target}
            duration={2.2}
            suffix={stat.suffix}
            className="font-bengali text-[28px] font-bold md:text-[36px]"
          />
        </span>
        {stat.showStar && (
          <Star
            className="ml-1 inline-block h-5 w-5 md:h-6 md:w-6"
            style={{ color: 'var(--amber)' }}
            fill="var(--amber)"
          />
        )}
      </div>
      <p
        className="mt-1.5 font-body text-[13px] md:text-[15px]"
        style={{ color: 'var(--text-cream-muted)' }}
      >
        {stat.label}
      </p>

      {/* Vertical divider between stats (desktop only) */}
      {index < 5 && (
        <div
          className="absolute -right-px top-1/2 hidden h-12 -translate-y-1/2 md:block"
          style={{
            width: '1px',
            background:
              'linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)',
          }}
        />
      )}
    </div>
  );
}

export default function StatsTickerSection() {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      target: 52347,
      suffix: '+',
      label: t('statsTicker.activeShops'),
      colorClass: 'text-[var(--gold)]',
    },
    {
      target: 64,
      suffix: '/৬৪',
      label: t('statsTicker.districtCoverage'),
      colorClass: 'text-[var(--gold)]',
    },
    {
      target: 1.2,
      suffix: ' কোটি',
      label: t('statsTicker.totalEntries'),
      colorClass: 'text-[var(--gold)]',
    },
    {
      target: 98.7,
      suffix: '%',
      label: t('statsTicker.uptime'),
      colorClass: 'text-[var(--gold-deep)]',
    },
    {
      target: 4.8,
      label: t('statsTicker.avgRating'),
      colorClass: 'text-[var(--gold)]',
      showStar: true,
    },
    {
      target: 24,
      suffix: '/৭',
      label: t('statsTicker.support'),
      colorClass: 'text-[var(--text-cream)]',
    },
  ];

  return (
    <section
      id="stats-ticker"
      className="relative w-full overflow-hidden pt-10"
      style={{ background: 'var(--ink)' }}
    >
      {/* Gold radial glow at top center */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--site-max)] px-4">
        {/* Header */}
        <div className="pb-10 text-center md:pb-16">
          <Reveal delay={0}>
            <span
              className="mb-5 inline-block rounded-full px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(201,169,110,0.12)',
                color: 'var(--gold)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}
            >
              {t('statsTicker.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-bengali text-[var(--fs-h2)] font-bold leading-tight"
              style={{ color: 'var(--text-cream)' }}
            >
              {t('statsTicker.headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="mt-3 font-display text-lg italic md:text-xl"
              style={{ color: 'var(--text-cream-muted)' }}
            >
              {t('statsTicker.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <Reveal delay={0.3}>
          <div className="mb-10 grid grid-cols-2 gap-y-10 md:mb-16 md:grid-cols-6 md:gap-y-0">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Marquee Section */}
      <div className="relative flex flex-col gap-3 overflow-hidden py-8 md:py-12">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24"
          style={{
            background:
              'linear-gradient(to right, var(--ink), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24"
          style={{
            background:
              'linear-gradient(to left, var(--ink), transparent)',
          }}
        />

        <MarqueeRow items={marqueeRow1} direction="left" />
        <MarqueeRow items={marqueeRow2} direction="right" />
      </div>
    </section>
  );
}
