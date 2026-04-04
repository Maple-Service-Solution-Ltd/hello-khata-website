'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Phone,
  ShoppingBag,
  Users,
  Plus,
  AlertTriangle,
  Package,
  FileText,
  CheckCircle2,
  PhoneCall,
  Download,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from '@/components/hellokhata/Reveal';

/* ─────────────────────────────────────────────
   Voice Commands
   ───────────────────────────────────────────── */

const commands = [
  { text: 'আজকের বিক্রি দেখাও', icon: ShoppingBag },
  { text: 'কাস্টমার খাতা দেখাও', icon: Users },
  { text: 'নতুন এন্ট্রি করো', icon: Plus },
  { text: 'বাকি কারা দিচ্ছে', icon: AlertTriangle },
  { text: 'স্টক আপডেট করো', icon: Package },
  { text: 'রিপোর্ট তৈরি করো', icon: FileText },
];

/* ─────────────────────────────────────────────
   Phone Screen Components
   ───────────────────────────────────────────── */

function ScreenSales() {
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        আজকের বিক্রি
      </h4>
      <div className="text-2xl font-bengali font-bold" style={{ color: 'var(--text-cream)' }}>
        ৳ ১২,৪৫০
      </div>
      <p className="text-[11px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
        ১৮টি ট্রানজ্যাকশন
      </p>
      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-16 mt-2">
        {[35, 55, 45, 80, 60].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{ background: 'linear-gradient(to top, var(--gold-deep), var(--gold))' }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      {/* Breakdown */}
      <div
        className="text-[10px] font-body pt-1"
        style={{ color: 'var(--text-cream-muted)' }}
      >
        ক্যাশ: ৳৮,২০০ <span className="mx-1">|</span> বিকাশ: ৳৪,২৫০
      </div>
    </div>
  );
}

function ScreenCustomers() {
  const customers = [
    { name: 'রহিম মিয়া', amount: '৳ ৫,২০০', status: 'due' },
    { name: 'করিম সাহেব', amount: '৳ ৩,৮০০', status: 'paid' },
    { name: 'আলম ভাই', amount: '৳ ৬,৩০০', status: 'due' },
  ];
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        কাস্টমার তালিকা
      </h4>
      {customers.map((c, i) => (
        <motion.div
          key={c.name}
          className="flex items-center justify-between py-2"
          style={{ borderBottom: '1px solid var(--ink-border)' }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <div>
            <p className="font-bengali text-xs" style={{ color: 'var(--text-cream)' }}>
              {c.name}
            </p>
            <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
              {c.amount}
            </p>
          </div>
          <span
            className="text-[9px] font-body px-2 py-0.5 rounded-full"
            style={{
              background: c.status === 'due' ? 'rgba(220,38,38,0.15)' : 'rgba(201,169,110,0.15)',
              color: c.status === 'due' ? 'var(--crimson)' : 'var(--gold)',
            }}
          >
            {c.status === 'due' ? 'বাকি' : 'পরিশোধিত'}
          </span>
        </motion.div>
      ))}
      <div
        className="font-bengali text-xs font-semibold pt-1"
        style={{ color: 'var(--text-cream)' }}
      >
        মোট বাকি: ৳ ১৫,৩০০
      </div>
    </div>
  );
}

function ScreenNewEntry() {
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        নতুন এন্ট্রি
      </h4>
      {/* Form fields visual */}
      {['পণ্য', 'পরিমাণ', 'দাম'].map((field) => (
        <div key={field}>
          <p className="text-[10px] font-body mb-1" style={{ color: 'var(--text-cream-muted)' }}>
            {field}
          </p>
          <div
            className="h-7 rounded-lg px-3 flex items-center text-[11px] font-bengali"
            style={{
              background: 'var(--ink-2)',
              border: '1px solid var(--ink-border)',
              color: 'var(--text-ghost)',
            }}
          >
            {field === 'পণ্য' ? 'প্রাণ চা' : field === 'পরিমাণ' ? '২৪ পিস' : '৳৫'}
          </div>
        </div>
      ))}
      {/* Pre-filled example */}
      <motion.div
        className="rounded-lg p-2.5"
        style={{
          background: 'rgba(201,169,110,0.08)',
          border: '1px solid rgba(201,169,110,0.15)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <p className="font-bengali text-[11px]" style={{ color: 'var(--text-cream)' }}>
          প্রাণ চা ২৪ পিস × ৳৫ = ৳১২০
        </p>
      </motion.div>
      {/* Saved */}
      <motion.div
        className="flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <CheckCircle2 size={14} style={{ color: 'var(--gold)' }} />
        <span className="font-bengali text-xs" style={{ color: 'var(--gold)' }}>
          সেভ হয়েছে ✓
        </span>
      </motion.div>
    </div>
  );
}

function ScreenDebtors() {
  const debtors = [
    { name: 'আলম ভাই', amount: '৳ ৬,৩০০' },
    { name: 'রহিম মিয়া', amount: '৳ ৫,২০০' },
    { name: 'সোহেল স্টোর', amount: '৳ ৩,৮০০' },
  ];
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        বাকিদার তালিকা
      </h4>
      {debtors.map((d, i) => (
        <motion.div
          key={d.name}
          className="flex items-center justify-between py-2"
          style={{ borderBottom: '1px solid var(--ink-border)' }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <div>
            <p className="font-bengali text-xs" style={{ color: 'var(--crimson)' }}>
              {d.name}
            </p>
            <p className="text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
              {d.amount}
            </p>
          </div>
          <button
            className="flex items-center gap-1 text-[9px] font-body px-2 py-1 rounded-full"
            style={{
              background: 'rgba(201,169,110,0.12)',
              color: 'var(--gold)',
              border: '1px solid rgba(201,169,110,0.2)',
            }}
          >
            <PhoneCall size={9} />
            কল করুন
          </button>
        </motion.div>
      ))}
    </div>
  );
}

function ScreenStock() {
  const items = [
    { name: 'প্রাণ চা', level: 'good', pct: 85 },
    { name: 'পার্লার সাবান', level: 'low', pct: 30 },
    { name: 'আটা ৫ কেজি', level: 'out', pct: 5 },
    { name: 'চিনি ১ কেজি', level: 'good', pct: 70 },
  ];
  const colorMap = {
    good: 'var(--gold)',
    low: 'var(--amber)',
    out: 'var(--crimson)',
  };
  const labelMap: Record<string, string> = {
    good: 'সবুজ',
    low: 'হলুদ',
    out: 'লাল',
  };
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        স্টক স্ট্যাটাস
      </h4>
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-bengali text-[11px]" style={{ color: 'var(--text-cream)' }}>
              {item.name}
            </p>
            <span className="text-[9px] font-body" style={{ color: colorMap[item.level] }}>
              {labelMap[item.level]}
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--ink-2)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: colorMap[item.level] }}
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {(item.level === 'low' || item.level === 'out') && (
            <p className="text-[9px] font-body mt-0.5" style={{ color: colorMap[item.level] }}>
              অর্ডার করুন
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ScreenReport() {
  const points = '30,55 65,40 90,60 115,35 140,50 165,25 190,40 215,20 240,30 260,15';
  return (
    <div className="px-4 pt-10 pb-4 space-y-3">
      <h4 className="font-bengali text-sm font-semibold" style={{ color: 'var(--gold)' }}>
        সাপ্তাহিক রিপোর্ট
      </h4>
      {/* Line chart */}
      <div
        className="rounded-lg p-3"
        style={{
          background: 'var(--ink-2)',
          border: '1px solid var(--ink-border)',
        }}
      >
        <svg viewBox="0 0 270 80" className="w-full h-16" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={`${points} 260,70 30,70`}
            fill="url(#greenGrad)"
            stroke="none"
          />
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[9px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
            মোট বিক্রি
          </p>
          <p className="font-bengali text-xs font-semibold" style={{ color: 'var(--text-cream)' }}>
            ৳ ৮৫,৩০০
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <TrendingUp size={12} style={{ color: 'var(--gold)' }} />
          <p className="font-body text-[11px]" style={{ color: 'var(--gold)' }}>
            মুনাফা: ১২.৫%
          </p>
        </div>
      </div>
      {/* Download button */}
      <button
        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bengali font-medium"
        style={{
          background: 'var(--gold)',
          color: 'white',
        }}
      >
        <Download size={12} />
        ডাউনলোড
      </button>
    </div>
  );
}

const screens = [ScreenSales, ScreenCustomers, ScreenNewEntry, ScreenDebtors, ScreenStock, ScreenReport];

/* ─────────────────────────────────────────────
   Connector SVG (desktop only)
   ───────────────────────────────────────────── */

function ConnectorDot() {
  return (
    <div className="hidden lg:block w-20 h-4 mx-4 flex-shrink-0 relative">
      <svg viewBox="0 0 80 16" className="w-full h-full" fill="none">
        <path
          d="M0 8 C20 2, 60 2, 80 8"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.4"
        />
        <motion.circle
          r="3"
          fill="var(--gold)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], offsetDistance: ['0%', '50%', '50%', '100%'] }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
          style={{ offsetPath: 'path("M0 8 C20 2, 60 2, 80 8")' }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function VoiceDemoSection() {
  const [activeCommand, setActiveCommand] = useState(0);

  return (
    <section
      id="voice-demo"
      className="relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Top subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--gold-glow-strong) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.3,
        }}
      />

      <div
        className="relative z-10 mx-auto px-4"
        style={{
          maxWidth: 'var(--site-max)',
          paddingTop: 'clamp(80px, 10vw, 160px)',
          paddingBottom: 'clamp(80px, 10vw, 160px)',
        }}
      >
        {/* ── Header ── */}
        <Reveal className="text-center mb-12 md:mb-16">
          {/* Green label */}
          <span
            className="inline-block font-body text-xs uppercase tracking-[0.15em] mb-4"
            style={{ color: 'var(--gold)' }}
          >
            লাইভ ডেমো
          </span>
          {/* Bengali heading */}
          <h2
            className="font-bengali text-center mb-3"
            style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-cream)' }}
          >
            নিজে চেষ্টা করুন
          </h2>
          {/* English subtitle */}
          <p
            className="font-display italic text-center"
            style={{ color: 'var(--text-cream-muted)', fontSize: 'var(--fs-body)' }}
          >
            Try it yourself — tap a command and watch the magic
          </p>
        </Reveal>

        {/* ── Interactive Demo Area ── */}
        <Reveal variant="fade-in" delay={0.2}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
            {/* Left: Command Buttons Panel */}
            <div
              className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible w-full lg:w-auto pb-2 lg:pb-0 px-1 lg:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {commands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isActive = activeCommand === idx;
                return (
                  <motion.button
                    key={cmd.text}
                    onClick={() => setActiveCommand(idx)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap
                      font-bengali text-sm transition-all duration-200 flex-shrink-0
                    `}
                    style={{
                      background: isActive ? 'var(--gold)' : 'var(--ink-2)',
                      color: isActive ? 'white' : 'var(--text-cream-muted)',
                      border: isActive ? 'none' : '1px solid var(--ink-border)',
                      boxShadow: isActive
                        ? '0 0 20px rgba(201,169,110,0.35), 0 0 40px rgba(201,169,110,0.15)'
                        : 'none',
                    }}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon size={14} />
                    <span>{cmd.text}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Connector (desktop only) */}
            <ConnectorDot />

            {/* Right: Phone Mockup */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: '280px',
                height: '520px',
                borderRadius: '36px',
                background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 20px 60px rgba(0,0,0,0.4),
                  0 0 0 1px rgba(255,255,255,0.05),
                  0 0 40px rgba(201,169,110,0.08)
                `,
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                style={{
                  width: '100px',
                  height: '28px',
                  background: 'linear-gradient(145deg, #2a2a2e, #1a1a1e)',
                  borderRadius: '0 0 24px 24px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Camera dot */}
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
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
                className="absolute overflow-hidden"
                style={{
                  top: '7px',
                  left: '7px',
                  right: '7px',
                  bottom: '7px',
                  borderRadius: '20px',
                  background: '#000',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCommand}
                    className="absolute inset-0 overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {(() => {
                      const ScreenComponent = screens[activeCommand];
                      return <ScreenComponent />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Side buttons - right */}
              <div
                className="absolute right-[-2px] top-[120px] w-[3px] rounded-r-sm"
                style={{
                  height: '48px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
              <div
                className="absolute right-[-2px] top-[180px] w-[3px] rounded-r-sm"
                style={{
                  height: '60px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
              {/* Side button - left */}
              <div
                className="absolute left-[-2px] top-[140px] w-[3px] rounded-l-sm"
                style={{
                  height: '72px',
                  background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* ── Bottom Disclaimer ── */}
        <Reveal variant="fade-in" delay={0.4} className="text-center mt-10 md:mt-14">
          <p className="font-body text-xs" style={{ color: 'var(--text-ghost)' }}>
            এটি একটি ডেমো। আসল অ্যাপে আপনার ভয়েসে কাজ করবে।
          </p>
        </Reveal>
      </div>
    </section>
  );
}
