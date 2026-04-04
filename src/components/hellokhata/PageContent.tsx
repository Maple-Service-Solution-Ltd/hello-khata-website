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
      TrustedBySection,
      StatsTickerSection,
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

/* ─── Transition Variants ─── */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // --t-river easing
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/* ─── Page Content Renderer ─── */
export function PageContent() {
  const { currentPage } = useHashRouter();
  const pageDef = PAGE_MAP[currentPage] || PAGE_MAP.home;

  return (
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
          <React.Fragment key={`${currentPage}-${index}`}>
            <SectionComponent />
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageContent;
