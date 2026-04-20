'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, TrendingUp, Store, HandCoins } from 'lucide-react';
import { Reveal } from '@/components/hellokhata/Reveal';
import { AnimatedCounter } from '@/components/hellokhata/AnimatedCounter';
import { useTranslation } from '@/hooks/use-translation';

interface Activity {
  id: number;
  emoji: string;
  shopName: string;
  district: string;
  action: string;
  timeAgo: string;
}

const MAX_VISIBLE = 5;
const CYCLE_INTERVAL = 1800;
const INITIAL_STAGGER = 70;
 // ms between each initial card — was 80ms, too fast

// ─── Memoized sub-components ─────────────────────────────────────────────────

const ActivityCard = memo(function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <motion.div
    layout
      key={activity.id}
//         initial={{ opacity: 0, x: 40, scale: 0.96 }}
//   animate={{ opacity: 1, x: 0, scale: 1 }}
//   exit={{ opacity: 0, x: -40, scale: 0.96 , transition: { duration: 0.22, ease: 'easeIn' }}}
//  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
  initial={{ opacity: 0, y: 60, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -60, scale: 0.97, transition: { duration: 0.18, ease: 'easeIn' } }}
transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-dark mb-3 flex items-center gap-3 rounded-xl px-4 py-3.5"
      style={{ borderLeft: '3px solid var(--gold)', willChange: 'transform, opacity' }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
        style={{ background: 'rgba(201,169,110,0.1)' }}
      >
        {activity.emoji}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="font-bengali text-sm font-semibold truncate"
            style={{ color: 'var(--text-cream)' }}
          >
            {activity.shopName}
          </span>
          <span className="shrink-0 text-xs" style={{ color: 'var(--text-cream-muted)' }}>
            {activity.district}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-cream-muted)' }}>
          {activity.action}
        </p>
      </div>

      <span className="shrink-0 text-[11px] font-medium" style={{ color: 'var(--gold)' }}>
        {activity.timeAgo}
      </span>
    </motion.div>
  );
});

// Stats never change at runtime — memo prevents re-renders on activity push
const StatsGrid = memo(function StatsGrid({
  cards,
  weeklyGrowthLabel,
}: {
  cards: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; label: string; value: string; color: string }[];
  weeklyGrowthLabel: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((stat) => (
          <div key={stat.label} className="glass-card-dark flex flex-col gap-2 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: `color-mix(in srgb, ${stat.color} 15%, transparent)` }}
              >
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-cream-muted)' }}>
                {stat.label}
              </span>
            </div>
            <span className="font-bengali text-lg font-bold" style={{ color: 'var(--text-cream)' }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(0,194,111,0.06)',
          border: '1px solid rgba(0,194,111,0.15)',
        }}
      >
        <p className="text-center text-white text-sm">
          📈 {weeklyGrowthLabel}
        </p>
      </div>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function LiveActivitySection() {
  const { t, lang } = useTranslation();
  const idCounterRef = useRef(0);
  const activityIndexRef = useRef(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [onlineCount] = useState(52347);

  // Stable callback ref pattern — interval never restarts on lang change
  const addActivityRef = useRef<() => void>(() => {});

  const sampleActivities = useMemo(() => {
    if (lang === 'bn') {
      return [
        { emoji: '🏪', shopName: 'করিম স্টোর', district: 'ঢাকা', action: t('liveActivity.actionNewSale'), timeAgo: t('liveActivity.timeJustNow') },
        { emoji: '💊', shopName: 'রহিম ফার্মেসি', district: 'চট্টগ্রাম', action: t('liveActivity.actionStockUpdate'), timeAgo: t('liveActivity.time2MinAgo') },
        { emoji: '👗', shopName: 'ফাতেমা টেইলার্স', district: 'সিলেট', action: t('liveActivity.actionDuesCollected'), timeAgo: t('liveActivity.time5MinAgo') },
        { emoji: '📱', shopName: 'জামান ইলেকট্রনিক্স', district: 'রাজশাহী', action: t('liveActivity.actionVoiceEntry'), timeAgo: t('liveActivity.time7MinAgo') },
        { emoji: '🍚', shopName: 'আকবর মুদি ডালা', district: 'খুলনা', action: t('liveActivity.actionDailyReport'), timeAgo: t('liveActivity.time10MinAgo') },
        { emoji: '✂️', shopName: 'নাসরিন বিউটি পার্লার', district: 'বরিশাল', action: t('liveActivity.actionNewCustomer'), timeAgo: t('liveActivity.time12MinAgo') },
        { emoji: '🔧', shopName: 'হাসান হার্ডওয়্যার', district: 'ময়মনসিংহ', action: t('liveActivity.actionBatchExpiry'), timeAgo: t('liveActivity.time15MinAgo') },
        { emoji: '📚', shopName: 'সালমা জুট হাউজ', district: 'রংপুর', action: t('liveActivity.actionMonthlyReport'), timeAgo: t('liveActivity.time20MinAgo') },
      ];
    }
    return [
      { emoji: '🏪', shopName: 'Karim Store', district: 'Dhaka', action: t('liveActivity.actionNewSale'), timeAgo: t('liveActivity.timeJustNow') },
      { emoji: '💊', shopName: 'Rahim Pharmacy', district: 'Chattogram', action: t('liveActivity.actionStockUpdate'), timeAgo: t('liveActivity.time2MinAgo') },
      { emoji: '👗', shopName: 'Fatema Tailors', district: 'Sylhet', action: t('liveActivity.actionDuesCollected'), timeAgo: t('liveActivity.time5MinAgo') },
      { emoji: '📱', shopName: 'Zaman Electronics', district: 'Rajshahi', action: t('liveActivity.actionVoiceEntry'), timeAgo: t('liveActivity.time7MinAgo') },
      { emoji: '🍚', shopName: 'Akbar Grocery', district: 'Khulna', action: t('liveActivity.actionDailyReport'), timeAgo: t('liveActivity.time10MinAgo') },
      { emoji: '✂️', shopName: 'Nasrin Beauty Parlor', district: 'Barishal', action: t('liveActivity.actionNewCustomer'), timeAgo: t('liveActivity.time12MinAgo') },
      { emoji: '🔧', shopName: 'Hasan Hardware', district: 'Mymensingh', action: t('liveActivity.actionBatchExpiry'), timeAgo: t('liveActivity.time15MinAgo') },
      { emoji: '📚', shopName: 'Salma Jute House', district: 'Rangpur', action: t('liveActivity.actionMonthlyReport'), timeAgo: t('liveActivity.time20MinAgo') },
    ];
  }, [lang, t]);

  const STAT_CARDS = useMemo(() => [
    { icon: Mic, label: t('liveActivity.statVoiceEntry'), value: lang === 'bn' ? '১২,৪৫৬' : '12,456', color: 'var(--green)' },
    { icon: TrendingUp, label: t('liveActivity.statSales'), value: lang === 'bn' ? '৳ ৪.৫ কোটি' : '৳ 4.5 Crore', color: 'var(--gold)' },
    { icon: Store, label: t('liveActivity.statNewShops'), value: lang === 'bn' ? '৩৪' : '34', color: 'var(--green)' },
    { icon: HandCoins, label: t('liveActivity.statDuesCollected'), value: lang === 'bn' ? '৳ ২.১ কোটি' : '৳ 2.1 Crore', color: 'var(--gold)' },
  ], [lang, t]);

  // Keep addActivityRef always pointing at the latest sampleActivities
  useEffect(() => {
    addActivityRef.current = () => {
      const sample = sampleActivities[activityIndexRef.current % sampleActivities.length];
      activityIndexRef.current += 1;
      idCounterRef.current += 1;
      const newActivity: Activity = { ...sample, id: idCounterRef.current };

      setActivities((prev) => {
        const next = [newActivity, ...prev];
        return next.length > MAX_VISIBLE ? next.slice(0, MAX_VISIBLE) : next;
      });
    };
  }, [sampleActivities]);

  // Initial staggered fill — slower gaps = no animation collision
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < sampleActivities.length; i++) {
      timers.push(setTimeout(() => addActivityRef.current(), i * INITIAL_STAGGER));
    }
    return () => timers.forEach(clearTimeout);
  }, []); // runs once on mount only

  // Stable interval — never recreated, reads latest via ref
  useEffect(() => {
    const id = setInterval(() => addActivityRef.current(), CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, []); // no deps — intentional

  return (
    <section
      id="live-activity"
      className="relative w-full overflow-hidden py-16"
      style={{ background: 'var(--ink)' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(201,169,110,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--site-max)] px-4">
        <div className="mb-12 text-center md:mb-16">
          <Reveal delay={0}>
            <span
              className="mb-5 inline-block rounded-full px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(201,169,110,0.12)',
                color: 'var(--gold)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}
            >
              {t('liveActivity.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-bengali text-[var(--fs-h2)] font-bold leading-tight"
              style={{ color: 'var(--text-cream)' }}
            >
              {t('liveActivity.headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ background: 'var(--green)' }}
                />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full"
                  style={{ background: 'var(--green)' }}
                />
              </span>
              <span className="font-bengali text-base md:text-lg" style={{ color: 'var(--text-cream)' }}>
                <AnimatedCounter
                  target={onlineCount}
                  duration={2}
                  className="font-bengali text-base font-semibold md:text-lg"
                />
                {' '}{t('liveActivity.onlineNow')}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal delay={0.3} variant="slide-right">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-8"
                style={{ background: 'linear-gradient(to bottom, var(--ink), transparent)' }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8"
                style={{ background: 'linear-gradient(to top, var(--ink), transparent)' }}
              />
              <div
                className="max-h-[400px] overflow-y-auto pr-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,169,110,0.3) transparent' }}
              >
                <AnimatePresence initial={false}>
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4} variant="slide-left">
            <div className="mb-6">
              <h3 className="font-bengali text-xl font-bold" style={{ color: 'var(--text-cream)' }}>
                {t('liveActivity.todayActivity')}
              </h3>
            </div>
            <StatsGrid cards={STAT_CARDS} weeklyGrowthLabel={t('liveActivity.weeklyGrowth')} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}