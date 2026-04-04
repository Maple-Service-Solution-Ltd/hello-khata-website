'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

/* ─── Bangladesh Map Dots (approximate district positions) ─── */
const DISTRICT_DOTS = [
  { name: 'Dhaka', x: 55, y: 52 },
  { name: 'Chittagong', x: 76, y: 60 },
  { name: 'Khulna', x: 25, y: 62 },
  { name: 'Rajshahi', x: 28, y: 40 },
  { name: 'Sylhet', x: 80, y: 35 },
  { name: 'Rangpur', x: 42, y: 20 },
  { name: 'Barisal', x: 55, y: 74 },
  { name: 'Comilla', x: 68, y: 55 },
  { name: 'Gazipur', x: 58, y: 48 },
  { name: 'Narayanganj', x: 60, y: 56 },
  { name: 'Mymensingh', x: 60, y: 35 },
  { name: 'Dinajpur', x: 38, y: 14 },
  { name: 'Bogra', x: 42, y: 32 },
  { name: 'Cox\'s Bazar', x: 85, y: 72 },
  { name: 'Jessore', x: 30, y: 58 },
  { name: 'Tangail', x: 50, y: 45 },
  { name: 'Natore', x: 32, y: 44 },
  { name: 'Pabna', x: 38, y: 50 },
  { name: 'Kushtia', x: 32, y: 54 },
  { name: 'Faridpur', x: 48, y: 64 },
  { name: 'Noakhali', x: 74, y: 65 },
  { name: 'Habiganj', x: 74, y: 42 },
  { name: 'Brahmanbaria', x: 70, y: 48 },
  { name: 'Chandpur', x: 64, y: 60 },
  { name: 'Gopalganj', x: 48, y: 72 },
  { name: 'Satkhira', x: 20, y: 66 },
  { name: 'Bagerhat', x: 24, y: 68 },
  { name: 'Pirojpur', x: 45, y: 72 },
  { name: 'Jhalokati', x: 50, y: 76 },
  { name: 'Patuakhali', x: 52, y: 80 },
];

/* ─── Counter Component ─── */
function AnimatedStatNumber({
  value,
  suffix = '',
  duration = 2,
  isInView,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value >= 10) return Math.round(latest).toString();
    return latest.toFixed(1);
  });

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      const unsub = rounded.on('change', (v) => {
        setDisplayValue(v);
      });
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, count, rounded, value, duration]);

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  number,
  numberSuffix,
  bengali,
  english,
  color,
  isInView,
  delay = 0,
}: {
  number: number;
  numberSuffix: string;
  bengali: string;
  english: string;
  color: string;
  isInView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className="text-center p-6 md:p-8 rounded-2xl"
      style={{ background: 'var(--white)', border: '1px solid var(--canvas-border)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="font-bengali font-bold mb-3"
        style={{
          fontSize: 'clamp(40px, 5vw, 64px)',
          color,
          lineHeight: 1.1,
        }}
      >
        {number < 10 ? (
          <AnimatedStatNumber value={number} suffix={numberSuffix} isInView={isInView} />
        ) : (
          <AnimatedStatNumber value={number} suffix={numberSuffix} isInView={isInView} />
        )}
      </div>
      <p className="font-bengali text-sm md:text-base mb-1" style={{ color: 'var(--text-body)' }}>
        {bengali}
      </p>
      <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
        {english}
      </p>
    </motion.div>
  );
}

/* ─── Map Dot ─── */
function MapDot({
  x,
  y,
  delay,
  isInView,
}: {
  x: number;
  y: number;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isInView
          ? {
              scale: [0, 1.3, 1],
              opacity: [0, 1, 1],
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {/* Ring pulse */}
      {isInView && (
        <motion.circle
          cx={x}
          cy={y}
          r={6}
          fill="none"
          stroke="var(--green)"
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      )}
      {/* Main dot */}
      <circle cx={x} cy={y} r={3} fill="var(--green)" />
      {/* Bright center */}
      <circle cx={x} cy={y} r={1.5} fill="#5FFFB0" />
    </motion.g>
  );
}

/* ─── Bangladesh Map SVG Path ─── */
const BANGLADESH_PATH = 'M60 5 L68 8 L75 12 L80 10 L85 15 L88 20 L92 22 L95 28 L92 32 L88 30 L85 35 L82 38 L85 42 L88 40 L92 44 L90 48 L85 50 L82 55 L85 58 L82 62 L78 60 L75 63 L72 60 L68 62 L65 66 L60 70 L58 75 L55 78 L52 82 L48 80 L45 78 L42 80 L38 78 L35 80 L32 76 L28 74 L25 70 L22 68 L20 65 L18 62 L22 58 L20 55 L18 52 L20 48 L22 45 L25 42 L22 38 L25 35 L28 32 L25 28 L28 25 L32 22 L35 20 L38 18 L42 15 L45 12 L48 10 L52 8 L55 5 Z';

/* ─── Main Component ─── */
export default function MarketSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const mapRef = useRef<HTMLDivElement>(null);
  const isMapInView = useInView(mapRef, { once: true, margin: '-60px' });

  return (
    <section
      id="market"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Texture overlay */}
      <div className="texture-nakshi-diamond absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[var(--site-max)] mx-auto px-6">
        {/* ─── Eyebrow ─── */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="font-body uppercase tracking-widest inline-block"
            style={{ fontSize: 'var(--fs-label)', color: 'var(--text-muted)' }}
          >
            বাজারের আকার
          </span>
        </motion.div>

        {/* ─── Big Number Headline ─── */}
        <motion.h2
          className="font-bengali text-center mb-4"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: 'var(--text-ink)',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          ১ কোটি ৭০ লাখ
        </motion.h2>

        <motion.p
          className="font-bengali text-center text-lg md:text-xl mb-2"
          style={{ color: 'var(--text-body)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ক্ষুদ্র ব্যবসা চালু আছে বাংলাদেশে।
        </motion.p>

        <motion.p
          className="font-body text-center max-w-2xl mx-auto mb-20"
          style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          17 million small businesses in Bangladesh. Only 2% have any digital management
          tool. That is the opportunity HelloKhata is built for.
        </motion.p>

        {/* ─── Three-Column Stat Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <StatCard
            number={98}
            numberSuffix="%"
            bengali="এখনো কোনো ডিজিটাল টুল ব্যবহার করে না।"
            english="Still use zero digital management tools."
            color="var(--crimson)"
            isInView={isInView}
            delay={0.4}
          />
          <StatCard
            number={85}
            numberSuffix="%"
            bengali="স্মার্টফোন ব্যবহার করেন।"
            english="Own a smartphone already."
            color="var(--green)"
            isInView={isInView}
            delay={0.5}
          />
          <StatCard
            number={3.7}
            numberSuffix="×"
            bengali="ডিজিটাল ব্যবসা বেশি লাভজনক।"
            english="Digital businesses are 3.7× more profitable."
            color="var(--gold)"
            isInView={isInView}
            delay={0.6}
          />
        </div>

        {/* ─── Bangladesh District Map ─── */}
        <div ref={mapRef} className="mb-24">
          <div
            className="rounded-2xl p-8 md:p-12 mx-auto max-w-3xl"
            style={{ background: 'var(--ink)' }}
          >
            <motion.svg
              viewBox="0 0 110 90"
              className="w-full h-auto"
              fill="none"
              initial={{ opacity: 0 }}
              animate={isMapInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Country outline */}
              <path
                d={BANGLADESH_PATH}
                fill="rgba(0, 194, 111, 0.05)"
                stroke="var(--green)"
                strokeWidth={0.5}
                strokeOpacity={0.3}
              />
              {/* District dots */}
              {DISTRICT_DOTS.map((dot, i) => (
                <MapDot
                  key={dot.name}
                  x={dot.x}
                  y={dot.y}
                  delay={i * 0.08}
                  isInView={isMapInView}
                />
              ))}
            </motion.svg>

            <p
              className="font-body text-center mt-4 text-xs"
              style={{ color: 'var(--text-cream-muted)' }}
            >
              HelloKhata presence across Bangladesh
            </p>
          </div>
        </div>

        {/* ─── Pull Quote ─── */}
        <motion.blockquote
          className="mx-auto text-center mb-20"
          style={{ maxWidth: '700px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div
            className="font-display italic leading-relaxed"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: 'var(--text-body)',
              borderLeft: '3px solid var(--green)',
              paddingLeft: '20px',
              textAlign: 'left',
            }}
          >
            &ldquo;The last billion people to come online will not use software that was
            designed for Silicon Valley. They will use software that speaks their
            language, literally.&rdquo;
          </div>
        </motion.blockquote>

        {/* ─── Bottom Stats Bar ─── */}
        <motion.div
          className="text-center font-bengali"
          style={{ fontSize: '18px', color: 'var(--green)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          ৫০,০০০+ ব্যবসা &nbsp;·&nbsp; ৬৪ জেলা &nbsp;·&nbsp; ১ কোটি+ এন্ট্রি
        </motion.div>
      </div>
    </section>
  );
}
