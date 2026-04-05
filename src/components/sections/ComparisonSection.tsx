'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/hellokhata/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/hellokhata/StaggerGroup';
import { GitCompare, BookOpen, Sparkles, Globe, Check, X } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

/* ── Feature check definitions (language-independent) ── */
const featureChecks: { bn: string; en: string; oldLedger: boolean; hellokhata: boolean; foreignApp: boolean }[] = [
  { bn: 'ভয়েস এন্ট্রি', en: 'Voice entry', oldLedger: false, hellokhata: true, foreignApp: false },
  { bn: 'অটো হিসাব', en: 'Auto calculation', oldLedger: false, hellokhata: true, foreignApp: true },
  { bn: 'ডিজিটাল রিপোর্ট', en: 'Digital reports', oldLedger: false, hellokhata: true, foreignApp: true },
  { bn: 'ব্যাচ ম্যানেজমেন্ট', en: 'Batch management', oldLedger: false, hellokhata: true, foreignApp: false },
  { bn: 'AI প্রেডিকশন', en: 'AI prediction', oldLedger: false, hellokhata: true, foreignApp: false },
  { bn: 'হাতে লেখা', en: 'Handwritten', oldLedger: true, hellokhata: false, foreignApp: false },
  { bn: 'বাংলা সাপোর্ট', en: 'Bangla support', oldLedger: true, hellokhata: true, foreignApp: false },
  { bn: 'বাংলাদেশি পেমেন্ট', en: 'Bangladeshi payment', oldLedger: false, hellokhata: true, foreignApp: false },
];

interface FeatureRow {
  name: string;
  oldLedger: boolean;
  hellokhata: boolean;
  foreignApp: boolean;
}

interface CardData {
  id: string;
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
  cardBg: string;
  highlighted: boolean;
  ribbonBn: string;
  ribbonEn: string;
  key: 'oldLedger' | 'hellokhata' | 'foreignApp';
  glowShadow?: string;
}

const cards: CardData[] = [
  {
    id: 'old-ledger',
    title: 'পুরনো খাতা',
    titleEn: 'Old Ledger',
    icon: <BookOpen className="h-6 w-6" />,
    iconBg: 'rgba(220, 38, 38, 0.1)',
    borderColor: 'rgba(220, 38, 38, 0.25)',
    cardBg: 'rgba(220, 38, 38, 0.03)',
    highlighted: false,
    ribbonBn: '',
    ribbonEn: '',
    key: 'oldLedger',
  },
  {
    id: 'hellokhata',
    title: 'HelloKhata',
    titleEn: 'The Smart Choice',
    icon: <Sparkles className="h-6 w-6" />,
    iconBg: 'rgba(201, 169, 110, 0.15)',
    borderColor: 'rgba(201, 169, 110, 0.4)',
    cardBg: 'rgba(201, 169, 110, 0.04)',
    highlighted: true,
    ribbonBn: 'সুপারিশ',
    ribbonEn: 'Recommended',
    key: 'hellokhata',
    glowShadow:
      '0 0 40px rgba(201,169,110,0.12), 0 8px 32px rgba(0,0,0,0.08)',
  },
  {
    id: 'foreign-app',
    title: 'বিদেশি অ্যাপ',
    titleEn: 'Foreign Apps',
    icon: <Globe className="h-6 w-6" />,
    iconBg: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'var(--canvas-border)',
    cardBg: 'rgba(107, 114, 128, 0.02)',
    highlighted: false,
    ribbonBn: '',
    ribbonEn: '',
    key: 'foreignApp',
  },
];

function FeatureIcon({ enabled, variant }: { enabled: boolean; variant: 'gold' | 'crimson' | 'muted' }) {
  if (enabled) {
    return (
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{
          background: variant === 'gold' ? 'rgba(201,169,110,0.15)' : 'rgba(107,114,128,0.1)',
        }}
      >
        <Check
          className="h-3 w-3"
          style={{ color: variant === 'gold' ? 'var(--gold)' : 'var(--text-muted)' }}
        />
      </div>
    );
  }
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
      <X
        className="h-3.5 w-3.5"
        style={{ color: variant === 'crimson' ? 'var(--crimson)' : 'var(--text-ghost)' }}
      />
    </div>
  );
}

function ComparisonCard({ card, features, featureScoreLabel }: { card: CardData; features: FeatureRow[]; featureScoreLabel: string }) {
  const { lang } = useTranslation();
  const isCrimson = card.key === 'oldLedger';
  const isGold = card.key === 'hellokhata';

  const displayTitle = lang === 'en' ? card.titleEn : card.title;
  const displayRibbon = lang === 'en' ? card.ribbonEn : card.ribbonBn;

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-[var(--card-r)]"
      style={{
        background: isGold
          ? 'rgba(255,255,255,0.7)'
          : 'var(--cream)',
        border: `1px solid ${card.borderColor}`,
        boxShadow: card.glowShadow || '0 1px 3px rgba(0,0,0,0.04)',
        ...(isGold
          ? {
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }
          : {}),
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Recommended ribbon */}
      {displayRibbon && (
        <div className="absolute right-6 top-0 z-10">
          <div
            className="rounded-b-lg px-3 py-1.5 font-body text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-deep))',
              color: 'white',
              boxShadow: '0 4px 12px rgba(201,169,110,0.3)',
            }}
          >
            {displayRibbon}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: card.iconBg }}
        >
          <span
            style={{
              color: isCrimson
                ? 'var(--crimson)'
                : isGold
                  ? 'var(--gold-deep)'
                  : 'var(--text-muted)',
            }}
          >
            {card.icon}
          </span>
        </div>
        <div>
          <h3
            className="font-bengali text-lg font-bold leading-tight"
            style={{ color: 'var(--text-ink)' }}
          >
            {displayTitle}
          </h3>
          {lang === 'en' && (
            <p
              className="font-body text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {card.title}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-5 h-px"
        style={{
          background: isCrimson
            ? 'rgba(220,38,38,0.1)'
            : isGold
              ? 'rgba(201,169,110,0.15)'
              : 'var(--canvas-border)',
        }}
      />

      {/* Features list */}
      <div className="flex flex-col gap-3 p-5 pt-4">
        {features.map((feature) => {
          const enabled = feature[card.key];
          return (
            <div key={feature.name} className="flex items-center gap-2.5">
              <FeatureIcon
                enabled={enabled}
                variant={isGold ? 'gold' : isCrimson ? 'crimson' : 'muted'}
              />
              <span
                className="font-body text-[14px]"
                style={{
                  color: enabled ? 'var(--text-ink)' : 'var(--text-ghost)',
                  textDecoration: enabled ? 'none' : 'line-through',
                  textDecorationColor: 'var(--text-ghost)',
                }}
              >
                {feature.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom score */}
      <div className="mt-auto border-t p-5 pt-4" style={{ borderColor: card.borderColor }}>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
            {featureScoreLabel}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-full" style={{ background: 'var(--canvas-border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isCrimson
                    ? 'var(--crimson)'
                    : isGold
                      ? 'linear-gradient(90deg, var(--gold), var(--gold-deep))'
                      : 'var(--text-ghost)',
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(features.filter((f) => f[card.key]).length / features.length) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </div>
            <span
              className="font-body text-xs font-bold"
              style={{
                color: isCrimson
                  ? 'var(--crimson)'
                  : isGold
                    ? 'var(--gold-deep)'
                    : 'var(--text-muted)',
              }}
            >
              {features.filter((f) => f[card.key]).length}/{features.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ComparisonSection() {
  const { t, tArray, lang } = useTranslation();

  const features: FeatureRow[] = useMemo(() => {
    const featureNames = tArray('comparison.features');
    return featureChecks.map((fc, i) => ({
      name: (featureNames && featureNames[i]) || fc.bn,
      oldLedger: fc.oldLedger,
      hellokhata: fc.hellokhata,
      foreignApp: fc.foreignApp,
    }));
  }, [lang, tArray]);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="comparison"
      className="texture-nakshi-subtle relative w-full overflow-hidden"
      style={{
        background: 'var(--cream)',
      }}
    >
      {/* Texture overlay at 15% opacity */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.15 }} />

      <div className="relative z-10 mx-auto w-full max-w-[var(--site-max)] px-4">
        <div
          className="mx-auto w-full"
          style={{
            paddingTop: 'clamp(80px, 10vw, 160px)',
            paddingBottom: 'clamp(80px, 10vw, 160px)',
          }}
        >
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <Reveal delay={0}>
              <span
                className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: 'rgba(201,169,110,0.12)',
                  color: 'var(--gold-deep)',
                  border: '1px solid rgba(201,169,110,0.2)',
                }}
              >
                <GitCompare className="h-3.5 w-3.5" />
                {t('comparison.eyebrow')}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-bengali text-[var(--fs-h2)] font-bold leading-tight"
                style={{ color: 'var(--text-ink)' }}
              >
                {t('comparison.headline')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                className="mt-3 font-display text-lg italic"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('comparison.sub')}
              </p>
            </Reveal>
          </div>

          {/* Comparison Cards */}
          <StaggerGroup stagger={0.12} className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-5">
            {cards.map((card) => (
              <StaggerItem key={card.id}>
                <div
                  style={{
                    transform: card.highlighted ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: 'center top',
                  }}
                >
                  <ComparisonCard
                    card={card}
                    features={features}
                    featureScoreLabel={t('comparison.featureScore')}
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Bottom CTA */}
          <Reveal delay={0.4} className="mt-12 text-center md:mt-16">
            <button
              onClick={scrollToPricing}
              className="group inline-flex items-center gap-2 font-body text-[15px] font-semibold transition-colors duration-300"
              style={{ color: 'var(--gold-deep)' }}
            >
              <span>{t('comparison.cta')}</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
