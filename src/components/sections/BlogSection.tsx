'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Package, Award, BookOpen, Clock } from 'lucide-react';

/* ── Tab categories ── */
const TABS = [
  'সব',
  'ব্যবসার টিপস',
  'পণ্য আপডেট',
  'সাফল্যের গল্প',
  'কীভাবে করবেন',
] as const;

/* ── Articles ── */
const ARTICLES = [
  {
    id: 1,
    category: 'পণ্য আপডেট',
    headline: 'HelloKhata তে Batch ম্যানেজমেন্ট কীভাবে কাজ করে',
    excerpt:
      'Batch ম্যানেজমেন্ট ফিচার দিয়ে আপনি সহজেই পণ্যের expiry ট্র্যাক করতে পারবেন।',
    readTime: '৩ মিনিট পড়া',
    date: '১২ জানুয়ারি ২০২৫',
    gradientFrom: '#00C26F',
    gradientTo: '#00A85A',
    icon: Package,
  },
  {
    id: 2,
    category: 'ব্যবসার টিপস',
    headline: 'ফার্মেসির জন্য ৫টি অপরিহার্য টিপস',
    excerpt:
      'ফার্মেসি ম্যানেজমেন্ট করার সহজ উপায় জানুন। লাভ বাড়ান এবং ক্ষতি কমান।',
    readTime: '৩ মিনিট পড়া',
    date: '১০ জানুয়ারি ২০২৫',
    gradientFrom: '#4F46E5',
    gradientTo: '#3730A3',
    icon: TrendingUp,
  },
  {
    id: 3,
    category: 'ব্যবসার টিপস',
    headline: 'মুদি দোকানের লাভ বাড়ানোর ৭টি উপায়',
    excerpt:
      'সহজ কিন্তু কার্যকর টিপস যা আপনার মুদি দোকানের লাভ বাড়াবে।',
    readTime: '৩ মিনিট পড়া',
    date: '৮ জানুয়ারি ২০২৫',
    gradientFrom: '#D97706',
    gradientTo: '#B45309',
    icon: TrendingUp,
  },
  {
    id: 4,
    category: 'সাফল্যের গল্প',
    headline: 'রফিক ভাইয়ের গল্প: কাগজ থেকে HelloKhata',
    excerpt:
      'ঢাকার মিরপুরের মুদি দোকানি রফিক ভাই কীভাবে তাঁর ব্যবসা ডিজিটাল করলেন।',
    readTime: '৩ মিনিট পড়া',
    date: '৫ জানুয়ারি ২০২৫',
    gradientFrom: '#DC2626',
    gradientTo: '#B91C1C',
    icon: Award,
  },
  {
    id: 5,
    category: 'কীভাবে করবেন',
    headline: 'ভয়েস কমান্ড সম্পূর্ণ গাইড',
    excerpt:
      'HelloKhata তে ভয়েস কমান্ড ব্যবহার করার সম্পূর্ণ গাইড এখানে।',
    readTime: '৩ মিনিট পড়া',
    date: '৩ জানুয়ারি ২০২৫',
    gradientFrom: '#00C26F',
    gradientTo: '#007A45',
    icon: BookOpen,
  },
  {
    id: 6,
    category: 'ব্যবসার টিপস',
    headline: 'Expired পণ্যের ক্ষতি কীভাবে শূন্য করবেন',
    excerpt:
      'প্রতিবছর লাখ লাখ টাকার expired পণ্যের ক্ষতি হয়। এটা শূন্য করুন।',
    readTime: '৩ মিনিট পড়া',
    date: '১ জানুয়ারি ২০২৫',
    gradientFrom: '#D97706',
    gradientTo: '#92400E',
    icon: TrendingUp,
  },
];

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
  article: (typeof ARTICLES)[0];
  index: number;
}) {
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
        borderColor: 'rgba(0,194,111,0.2)',
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
            background: 'rgba(0,194,111,0.1)',
            color: 'var(--green)',
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState<string>('সব');

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
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
            জ্ঞান · টিপস · গল্প
          </motion.h2>
          <motion.p
            className="font-bengali"
            style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)' }}
            variants={fadeUp}
          >
            বাংলাদেশের ব্যবসায়ীদের জন্য।
          </motion.p>
        </motion.div>

        {/* ── Tab Filter ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={
                activeTab === tab
                  ? {
                      background: 'var(--green)',
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
                    'linear-gradient(135deg, rgba(0,194,111,0.12) 0%, rgba(0,194,111,0.04) 60%, rgba(0,194,111,0.08) 100%)',
                }}
              >
                {/* Decorative shapes */}
                <div className="absolute w-32 h-32 rounded-full opacity-15 -top-8 -left-8"
                  style={{ background: 'var(--green)' }}
                />
                <div className="absolute w-20 h-20 rounded-full opacity-10 bottom-6 right-8"
                  style={{ background: 'var(--green-deep)' }}
                />
                <div className="absolute w-40 h-40 rounded-full opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ border: '2px solid var(--green)' }}
                />

                {/* Center illustration - percentage reduction visual */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0,194,111,0.15)',
                      boxShadow: '0 0 30px rgba(0,194,111,0.1)',
                    }}
                  >
                    <TrendingUp className="w-10 h-10" style={{ color: 'var(--green)' }} />
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
                              ? 'var(--green)'
                              : 'rgba(0,194,111,0.25)',
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
                    background: 'rgba(0,194,111,0.1)',
                    color: 'var(--green)',
                  }}
                >
                  ব্যবসার টিপস
                </span>

                {/* Headline */}
                <h3
                  className="font-bengali mb-3 leading-snug"
                  style={{ fontSize: '24px', color: 'var(--text-ink)' }}
                >
                  কীভাবে আপনার দোকানের বাকি ৫০% কমাবেন
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
                  বাংলাদেশের ক্ষুদ্র ব্যবসায়ীদের সবচেয়ে বড় সমস্যা হলো বাকি টাকা আদায়।
                  ৫টি সহজ পদ্ধতিতে...
                </p>

                {/* Author meta */}
                <div
                  className="flex flex-wrap items-center gap-3 mb-5 font-body"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--text-body)' }}>
                    HelloKhata Team
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ৫ মিনিট পড়া
                  </span>
                  <span>·</span>
                  <span>১৫ জানুয়ারি ২০২৫</span>
                </div>

                {/* CTA */}
                <motion.span
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm"
                  style={{ color: 'var(--green)' }}
                >
                  পড়ুন
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
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
