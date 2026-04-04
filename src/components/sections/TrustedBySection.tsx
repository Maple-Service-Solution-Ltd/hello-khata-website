'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/hellokhata/AnimatedCounter';
import { Reveal } from '@/components/hellokhata/Reveal';

/* ─────────────────────────────────────────────
   Placeholder brand SVGs — simple geometric icons
   Each ~120x40px, stroke-based, #374151 at 20% opacity
   ───────────────────────────────────────────── */

function LogoShoppingCart() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h10l3.2 19.2a2 2 0 002 1.6h41.6a2 2 0 002-1.6L70 14H18" />
        <circle cx="24" cy="32" r="3" />
        <circle cx="56" cy="32" r="3" />
        <text x="78" y="26" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">ShopCart</text>
      </g>
    </svg>
  );
}

function LogoStorefront() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16l7-10h26l7 10" />
        <rect x="2" y="16" width="40" height="20" rx="1" />
        <path d="M10 36V24" />
        <path d="M22 36V24" />
        <path d="M34 36V24" />
        <text x="48" y="30" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">StoreBD</text>
      </g>
    </svg>
  );
}

function LogoWarehouse() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18l19-14 19 14" />
        <rect x="4" y="18" width="34" height="18" rx="1" />
        <rect x="16" y="24" width="10" height="12" />
        <text x="42" y="32" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">GoBordor</text>
      </g>
    </svg>
  );
}

function LogoPharmacy() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="32" height="32" rx="4" />
        <path d="M18 12v16" />
        <path d="M10 20h16" />
        <text x="40" y="26" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">PharmaCare</text>
      </g>
    </svg>
  );
}

function LogoTruck() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="10" width="28" height="18" rx="2" />
        <path d="M30 18l8-6v16h-8" />
        <circle cx="14" cy="30" r="3" />
        <circle cx="34" cy="30" r="3" />
        <text x="44" y="28" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">TruckBD</text>
      </g>
    </svg>
  );
}

function LogoSmartphone() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="16" height="32" rx="3" />
        <line x1="13" y1="28" x2="19" y2="28" />
        <text x="30" y="26" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">MobiTech</text>
      </g>
    </svg>
  );
}

function LogoCashRegister() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="18" width="32" height="14" rx="2" />
        <path d="M8 18l4-12h16l4 12" />
        <rect x="10" y="22" width="20" height="6" rx="1" />
        <text x="42" y="32" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">CashFlow</text>
      </g>
    </svg>
  );
}

function LogoFactory() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="16" width="12" height="18" />
        <rect x="16" y="10" width="12" height="24" />
        <rect x="30" y="20" width="12" height="14" />
        <path d="M6 22v4M22 16v4M36 26v4" />
        <text x="46" y="30" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">FabriX</text>
      </g>
    </svg>
  );
}

function LogoFoodDelivery() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="20" r="14" />
        <circle cx="16" cy="20" r="6" />
        <circle cx="16" cy="20" r="2" fill="#374151" fillOpacity="0.15" stroke="none" />
        <path d="M38 14a6 6 0 0112 0v8a6 6 0 01-12 0z" />
        <text x="56" y="26" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">FoodRun</text>
      </g>
    </svg>
  );
}

function LogoBank() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l18-12 18 12" />
        <rect x="4" y="22" width="6" height="12" />
        <rect x="16" y="22" width="6" height="12" />
        <path d="M2 34h36" />
        <text x="42" y="30" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">BankNext</text>
      </g>
    </svg>
  );
}

function LogoAnalytics() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 34V18l8-6 8 10 8-14 8 6 8-8 8 4v24" />
        <path d="M2 4h4v4H2z" fill="#374151" fillOpacity="0.12" stroke="none" />
        <text x="46" y="24" fill="#374151" fillOpacity="0.2" fontSize="11" fontFamily="sans-serif" fontWeight="600" stroke="none">DataVis</text>
      </g>
    </svg>
  );
}

const logos = [
  <LogoShoppingCart key="cart" />,
  <LogoStorefront key="store" />,
  <LogoWarehouse key="warehouse" />,
  <LogoPharmacy key="pharmacy" />,
  <LogoTruck key="truck" />,
  <LogoSmartphone key="mobile" />,
  <LogoCashRegister key="cash" />,
  <LogoFactory key="factory" />,
  <LogoFoodDelivery key="food" />,
  <LogoBank key="bank" />,
  <LogoAnalytics key="analytics" />,
];

/* ─────────────────────────────────────────────
   Stats data
   ───────────────────────────────────────────── */

const stats = [
  { target: 50000, suffix: '+', label: 'সক্রিয় ব্যবসা' },
  { target: 64, suffix: '', label: 'জেলায়' },
  { target: 10000000, suffix: '+', label: 'ডেটা এন্ট্রি' },
  { target: 99.9, suffix: '%', label: 'আপটাইম', decimal: true },
];

/* ─────────────────────────────────────────────
   Trust badges
   ───────────────────────────────────────────── */

const trustBadges = [
  { icon: '🔒', label: 'SSL সুরক্ষিত' },
  { icon: '📱', label: 'মোবাইল ফ্রেন্ডলি' },
  { icon: '🇧🇩', label: 'বাংলাদেশি ডেটা' },
  { icon: '☁️', label: 'ক্লাউড সেভ' },
];

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function TrustedBySection() {
  return (
    <section
      id="trusted"
      className="trusted-section relative py-[var(--section-v)] overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      {/* Nakshi diamond texture at 30% opacity */}
      <div
        className="texture-nakshi-diamond absolute inset-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      <div className="relative z-10 max-w-[var(--site-max)] mx-auto px-6 md:px-8">
        {/* ── Header ── */}
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="inline-block font-bengali text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: 'var(--green)' }}
          >
            কে বিশ্বাস করছেন
          </span>
          <h2 className="font-bengali leading-tight"
            style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-ink)' }}
          >
            বাংলাদেশের বিশ্বাস আমাদের উপর ভরসা করে।
          </h2>
        </Reveal>

        {/* ── Logo Marquee — Row 1 (left) ── */}
        <Reveal variant="fade-in" delay={0.2}>
          <div className="relative mb-4 overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--cream), transparent)' }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--cream), transparent)' }}
            />

            <div
              className="flex gap-4"
              style={{
                animation: 'marquee-left 40s linear infinite',
                width: 'max-content',
              }}
            >
              {/* Original set */}
              {logos.map((logo) => (
                <div
                  key={`r1-o-${logo.key}`}
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm bg-white"
                >
                  {logo}
                </div>
              ))}
              {/* Duplicated set for seamless loop */}
              {logos.map((logo) => (
                <div
                  key={`r1-d-${logo.key}`}
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm bg-white"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Logo Marquee — Row 2 (right, optional second row) ── */}
        <Reveal variant="fade-in" delay={0.3}>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--cream), transparent)' }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--cream), transparent)' }}
            />

            <div
              className="flex gap-4"
              style={{
                animation: 'marquee-right 40s linear infinite',
                width: 'max-content',
              }}
            >
              {/* Original set — reversed order for visual variety */}
              {[...logos].reverse().map((logo) => (
                <div
                  key={`r2-o-${logo.key}`}
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm bg-white"
                >
                  {logo}
                </div>
              ))}
              {/* Duplicated set */}
              {[...logos].reverse().map((logo) => (
                <div
                  key={`r2-d-${logo.key}`}
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm bg-white"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Stats Bar ── */}
        <Reveal variant="scale-in" delay={0.4} className="mt-16 md:mt-20">
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--canvas-border)',
            }}
          >
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {/* Stat */}
                <div className="flex flex-col items-center text-center px-6 md:px-10">
                  <span
                    className="font-bold tabular-nums"
                    style={{
                      fontSize: '32px',
                      color: 'var(--green)',
                      lineHeight: 1.2,
                    }}
                  >
                    <AnimatedCounter
                      target={stat.target}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span
                    className="font-bengali mt-1"
                    style={{
                      fontSize: 'var(--fs-sm)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                {/* Divider — not after last */}
                {i < stats.length - 1 && (
                  <div
                    className="hidden sm:block w-px h-12 flex-shrink-0"
                    style={{ backgroundColor: 'var(--canvas-border-strong)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        {/* ── Trust Badges Row ── */}
        <Reveal variant="fade-in" delay={0.6} className="mt-10 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(0, 194, 111, 0.06)',
                  color: 'var(--text-body)',
                  border: '1px solid rgba(0, 194, 111, 0.12)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(0, 194, 111, 0.12)',
                  borderColor: 'rgba(0, 194, 111, 0.25)',
                  y: -2,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">{badge.icon}</span>
                <span className="font-bengali">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

    </section>
  );
}
