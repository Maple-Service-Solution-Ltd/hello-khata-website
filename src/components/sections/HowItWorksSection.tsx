'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mic, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/hellokhata/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/hellokhata/StaggerGroup';

/* ─────────────────────────────────────────────
   Step data
   ───────────────────────────────────────────── */

const steps = [
  {
    ghostNumber: '০১',
    pill: 'ধাপ ০১',
    icon: Download,
    accentColor: '#00C26F',
    titleBn: 'অ্যাপ ডাউনলোড করুন',
    titleEn: 'Download the app',
    description:
      'Google Play বা App Store থেকে HelloKhata নামিয়ে নিন। ৩০ সেকেন্ডে রেজিস্ট্রেশন সম্পন্ন।',
  },
  {
    ghostNumber: '০২',
    pill: 'ধাপ ০২',
    icon: Mic,
    accentColor: '#D97706',
    titleBn: 'ভয়েসে বলুন',
    titleEn: 'Speak in your voice',
    description:
      'বাংলায় বলুন — \'আজকের বিক্রি দেখাও\', \'কাস্টমার খাতা দেখাও\'। AI বুঝবে।',
  },
  {
    ghostNumber: '০৩',
    pill: 'ধাপ ০৩',
    icon: BarChart3,
    accentColor: '#00C26F',
    titleBn: 'সব স্বয়ংক্রিয়',
    titleEn: 'Everything automated',
    description:
      'এন্ট্রি, রিপোর্ট, রিমাইন্ডার — সব HelloKhata করবে। আপনি শুধু ব্যবসা চালান।',
  },
];

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--cream)',
      }}
    >
      {/* Nakshi subtle texture at 20% opacity */}
      <div
        className="texture-nakshi-subtle absolute inset-0 pointer-events-none"
        style={{ opacity: 0.2 }}
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
        <Reveal className="text-center mb-14 md:mb-20">
          {/* Eyebrow pill */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] mb-6"
            style={{
              backgroundColor: 'rgba(0, 194, 111, 0.1)',
              color: 'var(--green)',
              border: '1px solid rgba(0, 194, 111, 0.15)',
            }}
          >
            <Zap size={14} strokeWidth={2.5} />
            <span className="font-bengali">৩টি ধাপে শুরু</span>
          </span>

          {/* Bengali heading */}
          <h2
            className="font-bengali leading-tight mb-4"
            style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-ink)' }}
          >
            কীভাবে কাজ করে
          </h2>

          {/* English subtitle */}
          <p
            className="font-display italic"
            style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}
          >
            Get started in three simple steps
          </p>
        </Reveal>

        {/* ── Step Cards ── */}
        <StaggerGroup stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <StaggerItem key={step.ghostNumber}>
                <motion.div
                  className="relative bg-white rounded-[var(--card-r)] p-6 md:p-8 overflow-hidden"
                  style={{
                    border: '1px solid var(--canvas-border, rgba(0,0,0,0.06))',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Ghost number — top right */}
                  <span
                    className="absolute top-2 right-4 font-bengali select-none pointer-events-none leading-none"
                    style={{
                      fontSize: '120px',
                      opacity: 0.06,
                      color: 'var(--text-ink)',
                      lineHeight: 1,
                    }}
                  >
                    {step.ghostNumber}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${step.accentColor}10`,
                    }}
                  >
                    <IconComponent
                      size={24}
                      color={step.accentColor}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bengali text-xl font-semibold mb-1"
                    style={{ color: 'var(--text-ink)' }}
                  >
                    {step.titleBn}
                  </h3>
                  <p
                    className="font-display text-xs mb-4"
                    style={{ color: 'var(--text-muted)', opacity: 0.7 }}
                  >
                    {step.titleEn}
                  </p>

                  {/* Description */}
                  <p
                    className="font-body text-sm mb-6"
                    style={{
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      maxWidth: '300px',
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Step indicator pill */}
                  <span
                    className="inline-block font-bengali text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {step.pill}
                  </span>

                  {/* Connector arrow — desktop only, not after last card */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center"
                      style={{ opacity: 0.3 }}
                    >
                      <svg
                        width="40"
                        height="24"
                        viewBox="0 0 40 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0"
                          y1="12"
                          x2="30"
                          y2="12"
                          stroke="var(--green)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <path
                          d="M26 6l8 6-8 6"
                          stroke="var(--green)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* ── Bottom CTA ── */}
        <Reveal variant="fade-in" delay={0.5} className="text-center mt-12 md:mt-16">
          <motion.a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 font-bengali text-sm font-medium relative"
            style={{ color: 'var(--green)' }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="relative">
              এখনই শুরু করুন
              {/* Animated underline — grows on group hover */}
              <span
                className="absolute bottom-[-2px] left-0 h-[2px] rounded-full group-hover:w-full"
                style={{
                  backgroundColor: 'var(--green)',
                  width: '0%',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </span>
            <ArrowRight size={16} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
