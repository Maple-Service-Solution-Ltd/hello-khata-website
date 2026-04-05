'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHashRouter } from './HashRouter';

/* ─── Import All Sections ─── */
import HeroSection from '@/components/sections/HeroSection';
import TransformationSection from '@/components/sections/TransformationSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TrustedBySection from '@/components/sections/TrustedBySection';
import StatsTickerSection from '@/components/sections/StatsTickerSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import VoiceDemoSection from '@/components/sections/VoiceDemoSection';
import VoiceSection from '@/components/sections/VoiceSection';
import BatchSection from '@/components/sections/BatchSection';
import BusinessTypesSection from '@/components/sections/BusinessTypesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import KhataStorySection from '@/components/sections/KhataStorySection';
import AboutSection from '@/components/sections/AboutSection';
import MarketSection from '@/components/sections/MarketSection';
import VisionSection from '@/components/sections/VisionSection';
import BlogSection from '@/components/sections/BlogSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import InteractiveDemoSection from '@/components/sections/InteractiveDemoSection';
import LiveActivitySection from '@/components/sections/LiveActivitySection';

/* ─── Page → Section Components Mapping ─── */
type SectionComponent = React.ComponentType;

interface PageDefinition {
  sections: SectionComponent[];
  dark?: boolean;
}

const PAGE_MAP: Record<string, PageDefinition> = {
  home: {
    sections: [
      HeroSection,
      TransformationSection,
      HowItWorksSection,
      InteractiveDemoSection,
      TrustedBySection,
      StatsTickerSection,
      LiveActivitySection,
    ],
    dark: true,
  },
  features: {
    sections: [FeaturesSection, ComparisonSection],
    dark: true,
  },
  voice: {
    sections: [VoiceDemoSection, VoiceSection],
    dark: true,
  },
  batch: {
    sections: [BatchSection],
    dark: false,
  },
  stories: {
    sections: [BusinessTypesSection, TestimonialsSection],
    dark: false,
  },
  pricing: {
    sections: [PricingSection],
    dark: false,
  },
  about: {
    sections: [KhataStorySection, AboutSection],
    dark: false,
  },
  vision: {
    sections: [MarketSection, VisionSection],
    dark: true,
  },
  blog: {
    sections: [BlogSection, NewsletterSection],
    dark: false,
  },
  contact: {
    sections: [ContactSection, CTASection],
    dark: false,
  },
};

/* ─── Page transition variants (directional) ─── */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: 'blur(6px)',
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: 'blur(4px)',
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/* ─── Loading bar that shows during transitions ─── */
function TransitionLoader() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: 0.7, originX: 0 }}
      exit={{ scaleX: 1, originX: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(90deg, var(--gold-glow) 0%, var(--gold) 50%, var(--gold-glow) 100%)',
      }}
    />
  );
}

/* ─── Page Content Renderer ─── */
export function PageContent() {
  const { currentPage } = useHashRouter();
  const pageDef = PAGE_MAP[currentPage] || PAGE_MAP.home;

  return (
    <>
      {/* Loading bar during transitions */}
      <AnimatePresence>
        <TransitionLoader key={`loader-${currentPage}`} />
      </AnimatePresence>

      {/* Page content with transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {pageDef.sections.map((SectionComponent, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SectionComponent />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default PageContent;
