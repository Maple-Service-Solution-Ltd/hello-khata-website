'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/hellokhata/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/hellokhata/StaggerGroup';
import { WaveformMark } from '@/components/hellokhata/WaveformMark';
import { useTranslation } from '@/hooks/use-translation';

/* ─── Component ─── */
export default function AboutSection() {
  const { t, lang } = useTranslation();
  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: missionRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.0, 1.05, 1.0]);

  const milestones = lang === 'bn' ? [
    {
      year: '২০২২',
      icon: '🏪',
      title: 'শুরুটা কোথায়',
      body: 'ঢাকার একটা মুদি দোকানে। ৳২০,০০০ হারিয়েছিলেন কাগজের খাতায় ভুলে। সেই কষ্ট থেকেই HelloKhata-র জন্ম।',
    },
    {
      year: '২০২২',
      icon: '❓',
      title: 'প্রথম প্রশ্নটা',
      body: 'কেন এত বড় দেশের দোকানদারদের কাছে ভালো টুল নেই? ১৭ কোটি মানুষ, ১ কোটি ৭০ লাখ দোকান — আর সবাই কাগজে লিখছে।',
    },
    {
      year: '২০২৩',
      icon: '🚀',
      title: 'প্রথম version',
      body: '১২ জন দোকানদারের সাথে beta test। প্রথম সফল voice command এর দিন — দোকানদার অবাক।',
    },
    {
      year: '২০২৪',
      icon: '🏆',
      title: 'আজকের HelloKhata',
      body: '৫০,০০০+ ব্যবসা। ৬৪ জেলা। এবং এটা শুধু শুরু। বাংলাদেশের প্রতিটি দোকানকে ডিজিটাল করাই আমাদের লক্ষ্য।',
    },
  ] : [
    {
      year: '2022',
      icon: '🏪',
      title: 'Where It Started',
      body: 'At a grocery shop in Dhaka. They lost ৳20,000 to paper ledger errors. That pain gave birth to HelloKhata.',
    },
    {
      year: '2022',
      icon: '❓',
      title: 'The First Question',
      body: 'Why does a country of 170 million people with 17 million shops — still use paper for everything?',
    },
    {
      year: '2023',
      icon: '🚀',
      title: 'First Version',
      body: 'Beta tested with 12 shopkeepers. The day the first voice command worked — the shopkeeper was amazed.',
    },
    {
      year: '2024',
      icon: '🏆',
      title: 'Today\'s HelloKhata',
      body: '50,000+ businesses. 64 districts. And this is just the beginning. Digitizing every shop in Bangladesh is our mission.',
    },
  ];

  const team = [
    {
      nameBn: 'রাফি আহমেদ',
      nameEn: 'Rafi Ahmed',
      role: lang === 'bn' ? 'Founder & CEO' : 'Founder & CEO',
      bio: lang === 'bn'
        ? 'ঢাকা বিশ্ববিদ্যালয় থেকে CSE। দোকানদারের সমস্যা নিজের চোখে দেখেছেন।'
        : 'CSE from University of Dhaka. Has seen shopkeepers\' struggles firsthand.',
      color: '#C9A96E',
      initials: 'রা',
    },
    {
      nameBn: 'তানজিনা ইসলাম',
      nameEn: 'Tanjina Islam',
      role: 'CTO',
      bio: lang === 'bn'
        ? '৬ বছরের সফটওয়্যার ইঞ্জিনিয়ার। AI ও voice tech এক্সপার্ট।'
        : '6 years of software engineering experience. AI and voice tech expert.',
      color: '#D97706',
      initials: 'তা',
    },
    {
      nameBn: 'সাকিব হাসান',
      nameEn: 'Sakib Hasan',
      role: lang === 'bn' ? 'Head of Product' : 'Head of Product',
      bio: lang === 'bn'
        ? 'আগে বিক্রি করেছেন নিজের দোকানে। জানেন কোথায় কী দরকার।'
        : 'Previously ran his own shop. Knows exactly what businesses need.',
      color: '#4F46E5',
      initials: 'সা',
    },
    {
      nameBn: 'নুসরাত জাহান',
      nameEn: 'Nusrat Jahan',
      role: lang === 'bn' ? 'Head of Design' : 'Head of Design',
      bio: lang === 'bn'
        ? 'সব কিছু বাংলায়, সব কিছু সহজ। ইউজার এক্সপেরিয়েন্স তার প্যাশন।'
        : 'Everything in Bangla, everything simple. User experience is her passion.',
      color: '#DC2626',
      initials: 'নু',
    },
  ];

  const values = lang === 'bn' ? [
    {
      number: '০১',
      name: 'স্থানীয় সবার আগে',
      nameEn: 'Local First',
      desc: 'বাংলাদেশের জন্য বানানো। বাংলাদেশ থেকে বানানো।',
    },
    {
      number: '০২',
      name: 'সবসময় সহজ',
      nameEn: 'Simple Always',
      desc: 'জটিলতা আমাদের শত্রু। প্রতিটি বাটন, প্রতিটি স্ক্রিন সহজ হতে হবে।',
    },
    {
      number: '০৩',
      name: 'দরকারে স্মার্ট',
      nameEn: 'Smart When Needed',
      desc: 'AI আছে, কিন্তু সামনে নয়। পেছনে কাজ করছে, আপনার জন্য।',
    },
    {
      number: '০৪',
      name: 'বৃদ্ধির জন্য তৈরি',
      nameEn: 'Built for Growth',
      desc: 'আপনার দোকান ১টা থেকে ১০টা হবে। HelloKhata সেই যাত্রায় আছে।',
    },
  ] : [
    {
      number: '01',
      name: 'Local First',
      nameEn: 'Local First',
      desc: 'Built for Bangladesh. Built in Bangladesh.',
    },
    {
      number: '02',
      name: 'Simple Always',
      nameEn: 'Simple Always',
      desc: 'Complexity is our enemy. Every button, every screen must be simple.',
    },
    {
      number: '03',
      name: 'Smart When Needed',
      nameEn: 'Smart When Needed',
      desc: 'AI is there, but not in your face. Working behind the scenes, for you.',
    },
    {
      number: '04',
      name: 'Built for Growth',
      nameEn: 'Built for Growth',
      desc: 'Your shop will grow from 1 to 10. HelloKhata is on that journey with you.',
    },
  ];

  return (
    <section id="about" className="relative">
      {/* ─── Mission Statement (Full Viewport) ─── */}
      <div
        ref={missionRef}
        className="relative min-h-screen flex items-center justify-center py-[var(--section-v)] px-4 overflow-hidden"
        style={{ background: 'var(--ink)' }}
      >
        {/* Subtle nakshi texture */}
        <div className="absolute inset-0 texture-nakshi-subtle opacity-40" />
        {/* Background pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(201,169,110,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(201,169,110,0.04) 0%, transparent 40%)',
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--gold-glow) 0%, transparent 60%)',
          }}
        />

        <motion.div
          style={{ scale }}
          className="relative z-10 text-center max-w-[760px] mx-auto"
        >
          {/* Waveform */}
          <div className="flex justify-center mb-8">
            <WaveformMark active size="md" color="white" />
          </div>

          <Reveal>
            <h2
              className="font-bengali text-[52px] md:text-[60px] font-bold text-[var(--text-cream)] mb-8"
              style={{ lineHeight: 1.3 }}
            >
              {t('about.mission')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-display italic text-[24px] text-[var(--text-cream-muted)]">
              {t('about.missionEn')}
            </p>
          </Reveal>
        </motion.div>
      </div>

      {/* ─── Our Origin (Timeline) ─── */}
      <div className="bg-[var(--cream)] py-[var(--section-v)] px-4">
        <Reveal className="text-center mb-16">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-ink)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('about.timelineHeading')}
          </h3>
          <p className="font-body text-[var(--text-muted)] text-[var(--fs-body)]">
            {t('about.timelineSub')}
          </p>
        </Reveal>

        {/* Decorative green accent line between header and timeline */}
        <Reveal>
          <div className="flex justify-center mb-16">
            <div
              className="w-16 h-[3px] rounded-full"
              style={{ backgroundColor: 'var(--gold)' }}
            />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Center line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ backgroundColor: 'var(--canvas-border-strong)' }}
          />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal
                  key={i}
                  variant={isLeft ? 'slide-left' : 'slide-right'}
                  delay={i * 0.08}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 md:-translate-x-1.5 top-6 z-10"
                    style={{ backgroundColor: 'var(--gold)', boxShadow: '0 0 12px var(--gold-glow)' }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-32px)] ${
                      isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="rounded-[var(--card-r)] p-6 border"
                      style={{
                        background: 'white',
                        borderColor: 'var(--canvas-border)',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{m.icon}</span>
                        <span
                          className="font-body text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(201, 169, 110, 0.1)',
                            color: 'var(--gold)',
                          }}
                        >
                          {m.year}
                        </span>
                      </div>
                      <h4 className="font-bengali text-lg font-semibold text-[var(--text-ink)] mb-2">
                        {m.title}
                      </h4>
                      <p className="font-body text-sm text-[var(--text-muted)]" style={{ lineHeight: 1.7 }}>
                        {m.body}
                      </p>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Team ─── */}
      <div className="py-[var(--section-v)] px-4" style={{ background: 'var(--ink)' }}>
        <Reveal className="text-center mb-14">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-cream)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('about.teamHeading')}
          </h3>
          <p className="font-body text-[var(--text-cream-muted)] text-[var(--fs-body)]">
            {t('about.teamSub')}
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[var(--site-max)] mx-auto"
        >
          {team.map((member) => (
            <StaggerItem key={member.nameEn}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative rounded-[var(--card-r)] p-6 pb-8 text-center border border-transparent overflow-hidden"
                style={{
                  backgroundColor: 'var(--ink-2)',
                  backdropFilter: 'blur(16px)',
                  transition: 'box-shadow 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 0 1px var(--gold), 0 0 30px var(--gold-glow)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Colored top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: member.color }}
                />

                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bengali text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>

                <h4 className="font-bengali text-base text-[var(--text-cream)] mb-0.5">
                  {lang === 'bn' ? member.nameBn : member.nameEn}
                </h4>
                <p className="font-body text-xs text-[var(--text-cream-muted)] mb-1">
                  {lang === 'en' ? member.nameBn : member.nameEn}
                </p>
                <p
                  className="font-body text-xs font-semibold mb-4"
                  style={{ color: 'var(--gold)' }}
                >
                  {member.role}
                </p>
                <p className="font-body text-xs text-[var(--text-cream-muted)]" style={{ lineHeight: 1.7 }}>
                  {member.bio}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* ─── Values ─── */}
      <div className="bg-[var(--cream)] py-[var(--section-v)] px-4">
        <Reveal className="text-center mb-14">
          <h3
            className="font-bengali text-[var(--fs-h2)] text-[var(--text-ink)] mb-3"
            style={{ lineHeight: 1.3 }}
          >
            {t('about.valuesHeading')}
          </h3>
          <p className="font-body text-[var(--text-muted)] text-[var(--fs-body)]">
            {t('about.valuesSub')}
          </p>
        </Reveal>

        <div className="max-w-[var(--site-max)] mx-auto space-y-1">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="relative w-full py-10 md:py-14 px-6 md:px-12 rounded-[var(--card-r)] overflow-hidden border"
                style={{
                  background: 'white',
                  borderColor: 'var(--canvas-border)',
                }}
              >
                {/* Ghost number */}
                <span
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-bengali select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(100px, 15vw, 150px)',
                    color: 'var(--text-ink)',
                    opacity: 0.06,
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  {v.number}
                </span>

                <div className="relative z-10 max-w-xl">
                  <p
                    className="font-bengali text-[clamp(28px, 3.5vw, 36px)] text-[var(--text-ink)] mb-2"
                    style={{ lineHeight: 1.3 }}
                  >
                    {v.name}
                  </p>
                  <p className="font-body text-sm text-[var(--text-muted)] mb-2">
                    {v.nameEn}
                  </p>
                  <p
                    className="font-body text-[var(--fs-body-lg)] text-[var(--text-body)]"
                    style={{ lineHeight: 1.6 }}
                  >
                    {v.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
