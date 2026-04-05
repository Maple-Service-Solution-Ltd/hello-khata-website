'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  BarChart3,
  LayoutDashboard,
  ChevronRight,
  BatteryFull,
  Wifi,
  Signal,
  ShoppingBag,
  Users,
  AlertTriangle,
  Package,
  CheckCircle2,
  Loader2,
  IndianRupee,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from '@/components/hellokhata/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/hellokhata/StaggerGroup';
import { useTranslation } from '@/hooks/use-translation';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type TabKey = 'voice' | 'dashboard' | 'report';

interface VoiceCommand {
  id: string;
  text: string;
  result: string;
  icon: React.ElementType;
}

/* ─────────────────────────────────────────────
   Processing dots spinner
   ───────────────────────────────────────────── */

function ProcessingDots() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--gold)' }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Waveform bars (4 bars, animated)
   ───────────────────────────────────────────── */

function WaveformBars({ active }: { active: boolean }) {
  const barHeights = [16, 24, 20, 28];
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {barHeights.map((maxH, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: 'var(--gold)' }}
          animate={
            active
              ? { height: [4, maxH, 8, maxH - 4, 4] }
              : { height: 4 }
          }
          transition={
            active
              ? {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Voice Tab Content
   ───────────────────────────────────────────── */

function VoiceTab() {
  const { t } = useTranslation();

  const voiceCommands: VoiceCommand[] = [
    { id: 'sales', text: t('interactiveDemo.cmdShowSales'), result: t('interactiveDemo.resultShowSales'), icon: ShoppingBag },
    { id: 'customers', text: t('interactiveDemo.cmdShowCustomers'), result: t('interactiveDemo.resultShowCustomers'), icon: Users },
    { id: 'dues', text: t('interactiveDemo.cmdCheckDues'), result: t('interactiveDemo.resultCheckDues'), icon: AlertTriangle },
    { id: 'stock', text: t('interactiveDemo.cmdUpdateStock'), result: t('interactiveDemo.resultUpdateStock'), icon: Package },
  ];

  const [isListening, setIsListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [activeResult, setActiveResult] = useState<VoiceCommand | null>(null);
  const [inputText, setInputText] = useState('');

  const handleCommandClick = useCallback((cmd: VoiceCommand) => {
    setInputText(cmd.text);
    setIsListening(true);
    setProcessing(false);
    setActiveResult(null);

    // Simulate listening phase
    setTimeout(() => {
      setIsListening(false);
      setProcessing(true);

      // Simulate processing phase
      setTimeout(() => {
        setProcessing(false);
        setActiveResult(cmd);
      }, 1200);
    }, 1000);
  }, []);

  const handleMicClick = useCallback(() => {
    if (isListening || processing) return;
    setIsListening(true);
    setActiveResult(null);
    setInputText('');

    // Auto-stop listening after 2.5s
    setTimeout(() => {
      setIsListening(false);
    }, 2500);
  }, [isListening, processing]);

  // Clean up timers on unmount
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pt-3 pb-4 gap-4 h-full">
      {/* Mic button with pulse ring */}
      <div className="relative flex flex-col items-center mt-2">
        {/* Pulsing ring when listening */}
        {isListening && (
          <>
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ border: '2px solid var(--gold)' }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ border: '2px solid var(--gold)' }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            />
          </>
        )}

        {/* Mic button */}
        <motion.button
          onClick={handleMicClick}
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: isListening
              ? 'var(--gold)'
              : 'var(--ink-2)',
            border: isListening
              ? '2px solid var(--gold)'
              : '1px solid var(--ink-border)',
            boxShadow: isListening
              ? '0 0 30px var(--gold-glow-strong)'
              : 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          animate={isListening ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic
            size={24}
            style={{
              color: isListening ? '#0D0F0E' : 'var(--gold)',
            }}
          />
        </motion.button>

        <p
          className="text-[10px] font-body mt-2"
          style={{ color: isListening ? 'var(--gold)' : 'var(--text-cream-muted)' }}
        >
          {isListening ? t('interactiveDemo.voiceListening') : t('interactiveDemo.voiceTapToStart')}
        </p>
      </div>

      {/* Waveform */}
      <WaveformBars active={isListening} />

      {/* Input text field */}
      <div
        className="w-full rounded-xl px-3 py-2 text-xs font-bengali"
        style={{
          background: 'var(--ink-2)',
          border: '1px solid var(--ink-border)',
          color: inputText ? 'var(--text-cream)' : 'var(--text-cream-muted)',
          minHeight: '36px',
        }}
      >
        {inputText || t('interactiveDemo.voicePlaceholder')}
      </div>

      {/* Processing animation */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <ProcessingDots />
            <p className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>
              {t('interactiveDemo.voiceProcessing')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result card */}
      <AnimatePresence>
        {activeResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
            }}
            className="w-full rounded-xl p-3"
            style={{
              background: 'rgba(201, 169, 110, 0.08)',
              border: '1px solid rgba(201, 169, 110, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>
                {t('interactiveDemo.voiceSuccess')}
              </span>
            </div>
            <p className="font-bengali text-sm font-semibold" style={{ color: 'var(--text-cream)' }}>
              {activeResult.result}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice commands list */}
      <div className="w-full space-y-2 mt-auto">
        <p className="text-[10px] font-body mb-2" style={{ color: 'var(--text-cream-muted)' }}>
          {t('interactiveDemo.voiceTryCommands')}
        </p>
        {voiceCommands.map((cmd) => {
          const Icon = cmd.icon;
          const isActive = activeResult?.id === cmd.id;
          return (
            <motion.button
              key={cmd.id}
              onClick={() => handleCommandClick(cmd)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left"
              style={{
                background: isActive
                  ? 'rgba(201, 169, 110, 0.1)'
                  : 'var(--ink-2)',
                border: isActive
                  ? '1px solid rgba(201, 169, 110, 0.25)'
                  : '1px solid var(--ink-border)',
              }}
              whileHover={{
                background: 'rgba(201, 169, 110, 0.06)',
                x: 4,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span
                className="font-bengali text-xs flex-1"
                style={{ color: 'var(--text-cream)' }}
              >
                {cmd.text}
              </span>
              <ChevronRight
                size={12}
                style={{ color: 'var(--text-cream-muted)', flexShrink: 0 }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dashboard Tab Content
   ───────────────────────────────────────────── */

function DashboardTab() {
  const { t, lang } = useTranslation();

  const dashboardStats = [
    { label: t('interactiveDemo.dashLabelTodaySales'), value: '৳ ১২,৫০০', change: t('interactiveDemo.dashChangeUp'), icon: ShoppingBag },
    { label: t('interactiveDemo.dashLabelTotalDues'), value: '৳ ৪৫,২০০', change: t('interactiveDemo.dashChangeDues'), icon: AlertTriangle },
    { label: t('interactiveDemo.dashLabelStockAlerts'), value: '৫ টি', change: t('interactiveDemo.dashChangeLess'), icon: Package },
    { label: t('interactiveDemo.dashLabelCustomers'), value: '৩২ জন', change: t('interactiveDemo.dashChangeNew'), icon: Users },
  ];

  const recentItems = lang === 'bn'
    ? [
        { name: 'প্রাণ চা ২৪ পিস', amount: '৳ ১২০', time: '৫ মিনিট আগে' },
        { name: 'আটা ৫ কেজি', amount: '৳ ৪৫০', time: '১ ঘণ্টা আগে' },
        { name: 'চিনি ১ কেজি', amount: '৳ ১২০', time: '২ ঘণ্টা আগে' },
      ]
    : [
        { name: 'Pran Tea 24 pcs', amount: '৳ ১২০', time: '5 min ago' },
        { name: 'Flour 5 kg', amount: '৳ ৪৫০', time: '1 hr ago' },
        { name: 'Sugar 1 kg', amount: '৳ ১২০', time: '2 hr ago' },
      ];

  return (
    <div className="flex flex-col px-4 pt-3 pb-4 gap-3 h-full">
      {/* Summary header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
            {t('interactiveDemo.dashSummary')}
          </p>
          <p className="font-bengali text-base font-semibold" style={{ color: 'var(--text-cream)' }}>
            {t('interactiveDemo.dashToday')}
          </p>
        </div>
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(201, 169, 110, 0.1)',
            border: '1px solid rgba(201, 169, 110, 0.2)',
          }}
        >
          <TrendingUp size={12} style={{ color: 'var(--gold)' }} />
          <span className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>
            {t('interactiveDemo.dashTrendGood')}
          </span>
        </div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {dashboardStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="rounded-xl p-3"
              style={{
                background: 'var(--ink-2)',
                border: '1px solid var(--ink-border)',
                borderLeft: '2px solid rgba(201, 169, 110, 0.5)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(201, 169, 110, 0.1)' }}
                >
                  <Icon size={12} style={{ color: 'var(--gold)' }} />
                </div>
              </div>
              <p className="font-bengali text-sm font-bold" style={{ color: 'var(--text-cream)' }}>
                {stat.value}
              </p>
              <p className="text-[10px] font-body mt-0.5" style={{ color: 'var(--text-cream-muted)' }}>
                {stat.label}
              </p>
              <p className="text-[9px] font-body mt-1" style={{ color: 'var(--gold)' }}>
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent activity preview */}
      <div className="mt-auto">
        <p className="text-[10px] font-body mb-2" style={{ color: 'var(--text-cream-muted)' }}>
          {t('interactiveDemo.dashRecentEntries')}
        </p>
        {recentItems.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-center justify-between py-1.5"
            style={{ borderBottom: i < 2 ? '1px solid var(--ink-border)' : 'none' }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          >
            <div>
              <p className="font-bengali text-[11px]" style={{ color: 'var(--text-cream)' }}>
                {item.name}
              </p>
              <p className="text-[9px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
                {item.time}
              </p>
            </div>
            <span className="font-bengali text-[11px] font-semibold" style={{ color: 'var(--gold)' }}>
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Report Tab Content
   ───────────────────────────────────────────── */

function ReportTab() {
  const { t, lang } = useTranslation();

  const weeklyBars = lang === 'bn'
    ? [
        { day: 'শনি', height: 45 },
        { day: 'রবি', height: 30 },
        { day: 'সোম', height: 70 },
        { day: 'মঙ্গল', height: 55 },
        { day: 'বুধ', height: 85 },
        { day: 'বৃহঃ', height: 60 },
        { day: 'শুক্র', height: 95 },
      ]
    : [
        { day: 'Sat', height: 45 },
        { day: 'Sun', height: 30 },
        { day: 'Mon', height: 70 },
        { day: 'Tue', height: 55 },
        { day: 'Wed', height: 85 },
        { day: 'Thu', height: 60 },
        { day: 'Fri', height: 95 },
      ];

  const comparisonBefore = t('interactiveDemo.reportComparisonBefore');
  const comparisonHighlight = t('interactiveDemo.reportComparisonHighlight');
  const comparisonAfter = t('interactiveDemo.reportComparisonAfter');

  return (
    <div className="flex flex-col px-4 pt-3 pb-4 gap-3 h-full">
      {/* Header */}
      <div>
        <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
          {t('interactiveDemo.reportWeeklyReport')}
        </p>
        <p className="font-bengali text-base font-semibold" style={{ color: 'var(--text-cream)' }}>
          {t('interactiveDemo.reportWeeklySales')}
        </p>
      </div>

      {/* Bar chart */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'var(--ink-2)',
          border: '1px solid var(--ink-border)',
        }}
      >
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyBars.map((bar, i) => (
            <div key={bar.day} className="flex flex-col items-center gap-1.5 flex-1">
              <motion.div
                className="w-full rounded-t-sm"
                style={{
                  background:
                    i === weeklyBars.length - 1
                      ? 'linear-gradient(to top, var(--gold-deep), var(--gold))'
                      : 'linear-gradient(to top, rgba(201,169,110,0.3), rgba(201,169,110,0.6))',
                  minHeight: '4px',
                }}
                initial={{ height: 0 }}
                animate={{ height: `${bar.height}%` }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <span className="text-[9px] font-bengali" style={{ color: 'var(--text-cream-muted)' }}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-2.5">
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: 'var(--ink-2)',
            border: '1px solid var(--ink-border)',
            borderTop: '2px solid var(--gold)',
          }}
        >
          <p className="font-bengali text-lg font-bold" style={{ color: 'var(--gold)' }}>
            ৳ ৮৫,৩০০
          </p>
          <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
            {t('interactiveDemo.reportTotalSales')}
          </p>
        </div>
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: 'var(--ink-2)',
            border: '1px solid var(--ink-border)',
            borderTop: '2px solid var(--gold)',
          }}
        >
          <div className="flex items-center justify-center gap-1">
            <TrendingUp size={14} style={{ color: 'var(--gold)' }} />
            <p className="font-bengali text-lg font-bold" style={{ color: 'var(--gold)' }}>
              {lang === 'bn' ? '১২.৫%' : '12.5%'}
            </p>
          </div>
          <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
            {t('interactiveDemo.reportProfit')}
          </p>
        </div>
      </div>

      {/* Bottom summary line */}
      <div
        className="mt-auto rounded-lg p-2.5 flex items-center gap-2"
        style={{
          background: 'rgba(201, 169, 110, 0.06)',
          border: '1px solid rgba(201, 169, 110, 0.12)',
        }}
      >
        <CheckCircle2 size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        <p className="text-[10px] font-body" style={{ color: 'var(--text-cream)' }}>
          {comparisonBefore}<span style={{ color: 'var(--gold)' }}>{comparisonHighlight}</span>{comparisonAfter}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tab content map
   ───────────────────────────────────────────── */

const tabContent: Record<TabKey, React.ComponentType> = {
  voice: VoiceTab,
  dashboard: DashboardTab,
  report: ReportTab,
};

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function InteractiveDemoSection() {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('voice');

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'voice', label: t('interactiveDemo.tabsVoice'), icon: Mic },
    { key: 'dashboard', label: t('interactiveDemo.tabsDashboard'), icon: LayoutDashboard },
    { key: 'report', label: t('interactiveDemo.tabsReport'), icon: BarChart3 },
  ];

  return (
    <section
      id="interactive-demo"
      className="relative overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Nakshi texture overlay at 20% opacity */}
      <div
        className="texture-nakshi-subtle absolute inset-0 pointer-events-none"
        style={{ opacity: 0.2 }}
      />

      <div
        className="relative z-10 mx-auto px-4"
        style={{
          maxWidth: 'var(--site-max)',
          paddingTop: 'var(--section-v)',
          paddingBottom: 'var(--section-v)',
        }}
      >
        {/* ── Header ── */}
        <StaggerGroup stagger={0.1} className="text-center mb-10 md:mb-14">
          {/* Eyebrow pill */}
          <StaggerItem>
            <span
              className="inline-block font-bengali text-xs uppercase tracking-[0.2em] font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{
                color: 'var(--gold)',
                backgroundColor: 'rgba(201, 169, 110, 0.08)',
                border: '1px solid rgba(201, 169, 110, 0.15)',
              }}
            >
              {t('interactiveDemo.eyebrow')}
            </span>
          </StaggerItem>

          {/* Bengali heading */}
          <StaggerItem>
            <h2
              className="font-bengali leading-tight mb-3"
              style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-ink)' }}
            >
              {t('interactiveDemo.headline')}
            </h2>
          </StaggerItem>

          {/* English subtitle */}
          <StaggerItem>
            <p
              className="font-display italic"
              style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}
            >
              {t('interactiveDemo.subtitle')}
            </p>
          </StaggerItem>
        </StaggerGroup>

        {/* ── Phone Simulator ── */}
        <Reveal variant="scale-in" delay={0.3}>
          <div className="flex justify-center">
            <div
              className="relative flex-shrink-0"
              style={{
                width: '320px',
                height: '640px',
                borderRadius: '36px',
                background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 25px 60px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(255,255,255,0.05),
                  0 0 40px rgba(201,169,110,0.08)
                `,
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                style={{
                  width: '110px',
                  height: '28px',
                  background: 'linear-gradient(145deg, #2a2a2e, #1a1a1e)',
                  borderRadius: '0 0 22px 22px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Camera dot */}
                <div
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'radial-gradient(circle, #1a3a2a, #0a1a0a)',
                    boxShadow: 'inset 0 0 2px rgba(201,169,110,0.3)',
                  }}
                />
              </div>

              {/* Screen area */}
              <div
                className="absolute overflow-hidden flex flex-col"
                style={{
                  top: '7px',
                  left: '7px',
                  right: '7px',
                  bottom: '7px',
                  borderRadius: '28px',
                  background: 'var(--ink)',
                }}
              >
                {/* ── Fake status bar ── */}
                <div
                  className="flex items-center justify-between px-5 pt-8 pb-2 flex-shrink-0"
                  style={{ borderBottom: '1px solid var(--ink-border)' }}
                >
                  <div className="flex items-center gap-1">
                    <Signal size={11} style={{ color: 'var(--text-cream-muted)' }} />
                    <Wifi size={11} style={{ color: 'var(--text-cream-muted)' }} />
                  </div>
                  <span
                    className="font-bengali text-xs font-semibold"
                    style={{ color: 'var(--gold)' }}
                  >
                    HelloKhata
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="font-bengali text-[11px]"
                      style={{ color: 'var(--text-cream-muted)' }}
                    >
                      {lang === 'bn' ? '৯:৪১' : '9:41'}
                    </span>
                    <BatteryFull size={13} style={{ color: 'var(--text-cream-muted)' }} />
                  </div>
                </div>

                {/* ── Tab buttons ── */}
                <div
                  className="flex items-stretch flex-shrink-0"
                  style={{ borderBottom: '1px solid var(--ink-border)' }}
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <motion.button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative"
                        style={{
                          color: isActive ? 'var(--gold)' : 'var(--text-cream-muted)',
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Icon size={16} />
                        <span className="text-[10px] font-bengali">{tab.label}</span>
                        {/* Active indicator */}
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                          style={{ background: 'var(--gold)' }}
                          animate={{
                            width: isActive ? '24px' : '0px',
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* ── Content area ── */}
                <div className="flex-1 overflow-y-auto relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {(() => {
                        const TabContent = tabContent[activeTab];
                        return <TabContent />;
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Bottom home bar ── */}
                <div className="flex-shrink-0 flex justify-center pb-2 pt-1">
                  <div
                    className="w-28 h-1 rounded-full"
                    style={{ background: 'var(--ink-border-strong)' }}
                  />
                </div>
              </div>

              {/* Side buttons - right */}
              <div
                className="absolute right-[-2px] top-[130px] w-[3px] rounded-r-sm"
                style={{
                  height: '40px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
              <div
                className="absolute right-[-2px] top-[180px] w-[3px] rounded-r-sm"
                style={{
                  height: '56px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
              {/* Side button - left */}
              <div
                className="absolute left-[-2px] top-[150px] w-[3px] rounded-l-sm"
                style={{
                  height: '68px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* ── Bottom hint ── */}
        <Reveal variant="fade-in" delay={0.5} className="text-center mt-10 md:mt-14">
          <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('interactiveDemo.bottomHint')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
