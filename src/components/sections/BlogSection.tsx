'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Package, Award, BookOpen, Clock } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Article Card ── */
function ArticleCard({
  article,
  index,
}: {
  article: {
    id: number;
    category: string;
    headline: string;
    excerpt: string;
    readTime: string;
    date: string;
    gradientFrom: string;
    gradientTo: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  };
  index: number;
}) {
  const { lang } = useTranslation();
  const Icon = article.icon;
  return (
    <motion.article
      className="group cursor-pointer rounded-[var(--card-r)] overflow-hidden khata-lines"
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--canvas-border)',
      }}
      variants={cardVariants}
      whileHover={{
        y: -4,
        boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
        borderColor: 'rgba(201,169,110,0.2)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Illustration header */}
      <div
        className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${article.gradientFrom}15, ${article.gradientTo}08)`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute w-24 h-24 rounded-full opacity-20"
          style={{
            background: article.gradientFrom,
            top: '-12px',
            right: '-12px',
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full opacity-10"
          style={{
            background: article.gradientTo,
            bottom: '-8px',
            left: '-8px',
          }}
        />

        {/* Icon */}
        <Icon
          className="w-10 h-10 relative z-10 transition-transform duration-300 group-hover:scale-110"
          style={{ color: article.gradientFrom }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-[11px] font-body font-semibold mb-3"
          style={{
            background: 'rgba(201,169,110,0.1)',
            color: 'var(--gold)',
          }}
        >
          {article.category}
        </span>

        {/* Headline */}
        <h4
          className="font-bengali mb-2 leading-snug"
          style={{ fontSize: '18px', color: 'var(--text-ink)' }}
        >
          {article.headline}
        </h4>

        {/* Excerpt */}
        <p
          className="font-body mb-4"
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-3 font-body"
          style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-ghost)' }}
        >
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span>·</span>
          <span>{article.date}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main Blog Section ── */
export default function BlogSection() {
  const { t, tArray, lang } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const tabs = tArray('blog.tabs') || ['সব'];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const articlesData =
    lang === 'bn'
      ? [
          {
            id: 1,
            category: 'পণ্য আপডেট',
            headline: 'HelloKhata তে Batch ম্যানেজমেন্ট কীভাবে কাজ করে',
            excerpt: 'Batch ম্যানেজমেন্ট ফিচার দিয়ে আপনি সহজেই পণ্যের expiry ট্র্যাক করতে পারবেন।',
            readTime: t('blog.readTime'),
            date: '১২ জানুয়ারি ২০২৫',
            gradientFrom: '#C9A96E',
            gradientTo: '#00A85A',
            icon: Package,
          },
          {
            id: 2,
            category: 'ব্যবসার টিপস',
            headline: 'ফার্মেসির জন্য ৫টি অপরিহার্য টিপস',
            excerpt: 'ফার্মেসি ম্যানেজমেন্ট করার সহজ উপায় জানুন। লাভ বাড়ান এবং ক্ষতি কমান।',
            readTime: t('blog.readTime'),
            date: '১০ জানুয়ারি ২০২৫',
            gradientFrom: '#4F46E5',
            gradientTo: '#3730A3',
            icon: TrendingUp,
          },
          {
            id: 3,
            category: 'ব্যবসার টিপস',
            headline: 'মুদি দোকানের লাভ বাড়ানোর ৭টি উপায়',
            excerpt: 'সহজ কিন্তু কার্যকর টিপস যা আপনার মুদি দোকানের লাভ বাড়াবে।',
            readTime: t('blog.readTime'),
            date: '৮ জানুয়ারি ২০২৫',
            gradientFrom: '#D97706',
            gradientTo: '#B45309',
            icon: TrendingUp,
          },
          {
            id: 4,
            category: 'সাফল্যের গল্প',
            headline: 'রফিক ভাইয়ের গল্প: কাগজ থেকে HelloKhata',
            excerpt: 'ঢাকার মিরপুরের মুদি দোকানি রফিক ভাই কীভাবে তাঁর ব্যবসা ডিজিটাল করলেন।',
            readTime: t('blog.readTime'),
            date: '৫ জানুয়ারি ২০২৫',
            gradientFrom: '#DC2626',
            gradientTo: '#B91C1C',
            icon: Award,
          },
          {
            id: 5,
            category: 'কীভাবে করবেন',
            headline: 'ভয়েস কমান্ড সম্পূর্ণ গাইড',
            excerpt: 'HelloKhata তে ভয়েস কমান্ড ব্যবহার করার সম্পূর্ণ গাইড এখানে।',
            readTime: t('blog.readTime'),
            date: '৩ জানুয়ারি ২০২৫',
            gradientFrom: '#C9A96E',
            gradientTo: '#007A45',
            icon: BookOpen,
          },
          {
            id: 6,
            category: 'ব্যবসার টিপস',
            headline: 'Expired পণ্যের ক্ষতি কীভাবে শূন্য করবেন',
            excerpt: 'প্রতিবছর লাখ লাখ টাকার expired পণ্যের ক্ষতি হয়। এটা শূন্য করুন।',
            readTime: t('blog.readTime'),
            date: '১ জানুয়ারি ২০২৫',
            gradientFrom: '#D97706',
            gradientTo: '#92400E',
            icon: TrendingUp,
          },
        ]
      : [
          {
            id: 1,
            category: 'Product Updates',
            headline: 'How Batch Management Works in HelloKhata',
            excerpt: 'Track product expiry easily with the batch management feature. Never lose money to expired goods again.',
            readTime: t('blog.readTime'),
            date: '12 January 2025',
            gradientFrom: '#C9A96E',
            gradientTo: '#00A85A',
            icon: Package,
          },
          {
            id: 2,
            category: 'Business Tips',
            headline: '5 Essential Tips for Pharmacy Owners',
            excerpt: 'Learn the easy way to manage your pharmacy. Increase profits and reduce losses.',
            readTime: t('blog.readTime'),
            date: '10 January 2025',
            gradientFrom: '#4F46E5',
            gradientTo: '#3730A3',
            icon: TrendingUp,
          },
          {
            id: 3,
            category: 'Business Tips',
            headline: '7 Ways to Increase Your Grocery Store Profits',
            excerpt: 'Simple but effective tips that will increase your grocery store profits.',
            readTime: t('blog.readTime'),
            date: '8 January 2025',
            gradientFrom: '#D97706',
            gradientTo: '#B45309',
            icon: TrendingUp,
          },
          {
            id: 4,
            category: 'Success Stories',
            headline: 'Rafiq\'s Story: From Paper to HelloKhata',
            excerpt: 'How grocery shop owner Rafiq from Mirpur digitized his business.',
            readTime: t('blog.readTime'),
            date: '5 January 2025',
            gradientFrom: '#DC2626',
            gradientTo: '#B91C1C',
            icon: Award,
          },
          {
            id: 5,
            category: 'How-To',
            headline: 'Complete Voice Command Guide',
            excerpt: 'The complete guide to using voice commands in HelloKhata.',
            readTime: t('blog.readTime'),
            date: '3 January 2025',
            gradientFrom: '#C9A96E',
            gradientTo: '#007A45',
            icon: BookOpen,
          },
          {
            id: 6,
            category: 'Business Tips',
            headline: 'How to Zero Out Expired Product Losses',
            excerpt: 'Millions are lost every year to expired products. Make it zero.',
            readTime: t('blog.readTime'),
            date: '1 January 2025',
            gradientFrom: '#D97706',
            gradientTo: '#92400E',
            icon: TrendingUp,
          },
        ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-[clamp(80px,10vw,160px)] md:py-32 overflow-hidden"
      style={{ background: 'var(--cream-2)' }}
    >
      {/* Texture */}
      <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[var(--site-max)] mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="font-bengali mb-3"
            style={{ fontSize: 'var(--fs-h1)', color: 'var(--text-ink)', lineHeight: 1.15 }}
            variants={fadeUp}
          >
            {t('blog.heading')}
          </motion.h2>
          <motion.p
            className="font-bengali"
            style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)' }}
            variants={fadeUp}
          >
            {t('blog.sub')}
          </motion.p>
        </motion.div>

        {/* ── Tab Filter ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={
                activeTab === tab
                  ? {
                      background: 'var(--gold)',
                      color: 'white',
                    }
                  : {
                      background: 'var(--white)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--canvas-border)',
                    }
              }
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* ── Featured Article ── */}
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.article
            className="group cursor-pointer rounded-[var(--card-r)] overflow-hidden"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--canvas-border)',
            }}
            whileHover={{
              y: -3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Gradient illustration */}
              <div
                className="relative w-full md:w-2/5 min-h-[220px] md:min-h-[300px] flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 60%, rgba(201,169,110,0.08) 100%)',
                }}
              >
                {/* Decorative shapes */}
                <div className="absolute w-32 h-32 rounded-full opacity-15 -top-8 -left-8"
                  style={{ background: 'var(--gold)' }}
                />
                <div className="absolute w-20 h-20 rounded-full opacity-10 bottom-6 right-8"
                  style={{ background: 'var(--gold-deep)' }}
                />
                <div className="absolute w-40 h-40 rounded-full opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ border: '2px solid var(--gold)' }}
                />

                {/* Center illustration - percentage reduction visual */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(201,169,110,0.15)',
                      boxShadow: '0 0 30px rgba(201,169,110,0.1)',
                    }}
                  >
                    <TrendingUp className="w-10 h-10" style={{ color: 'var(--gold)' }} />
                  </div>
                  {/* Mini chart bars */}
                  <div className="flex items-end gap-1.5">
                    {[60, 40, 75, 50, 85, 30].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-t-sm transition-all duration-500 group-hover:opacity-100"
                        style={{
                          height: `${h * 0.4}px`,
                          background:
                            i === 5
                              ? 'var(--gold)'
                              : 'rgba(201,169,110,0.25)',
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                {/* Category badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-body font-semibold mb-4 self-start"
                  style={{
                    background: 'rgba(201,169,110,0.1)',
                    color: 'var(--gold)',
                  }}
                >
                  {t('blog.featured.category')}
                </span>

                {/* Headline */}
                <h3
                  className="font-bengali mb-3 leading-snug"
                  style={{ fontSize: '24px', color: 'var(--text-ink)' }}
                >
                  {t('blog.featured.headline')}
                </h3>

                {/* Excerpt */}
                <p
                  className="font-body mb-5"
                  style={{
                    fontSize: 'var(--fs-body)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.75,
                  }}
                >
                  {t('blog.featured.excerpt')}
                </p>

                {/* Author meta */}
                <div
                  className="flex flex-wrap items-center gap-3 mb-5 font-body"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--text-body)' }}>
                    {t('blog.featured.author')}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {t('blog.featured.readTime')}
                  </span>
                  <span>·</span>
                  <span>{t('blog.featured.date')}</span>
                </div>

                {/* CTA */}
                <motion.span
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm"
                  style={{ color: 'var(--gold)' }}
                >
                  {t('blog.featured.readMore')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              </div>
            </div>
          </motion.article>
        </motion.div>

        {/* ── Article Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {articlesData.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
