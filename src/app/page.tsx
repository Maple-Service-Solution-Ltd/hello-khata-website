'use client'

import { SmoothScrollProvider } from '@/components/hellokhata/SmoothScrollProvider'
import { ScrollProgress } from '@/components/hellokhata/ScrollProgress'
import { CustomCursor } from '@/components/hellokhata/CustomCursor'
import BackToTop from '@/components/hellokhata/BackToTop'
import WhatsAppWidget from '@/components/hellokhata/WhatsAppWidget'
import Navigation from '@/components/hellokhata/Navigation'
import Footer from '@/components/hellokhata/Footer'
import HeroSection from '@/components/sections/HeroSection'
import TransformationSection from '@/components/sections/TransformationSection'
import KhataStorySection from '@/components/sections/KhataStorySection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import VoiceDemoSection from '@/components/sections/VoiceDemoSection'
import VoiceSection from '@/components/sections/VoiceSection'
import MarketSection from '@/components/sections/MarketSection'
import TrustedBySection from '@/components/sections/TrustedBySection'
import BusinessTypesSection from '@/components/sections/BusinessTypesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import BatchSection from '@/components/sections/BatchSection'
import PricingSection from '@/components/sections/PricingSection'
import AboutSection from '@/components/sections/AboutSection'
import VisionSection from '@/components/sections/VisionSection'
import BlogSection from '@/components/sections/BlogSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import ContactSection from '@/components/sections/ContactSection'
import CTASection from '@/components/sections/CTASection'
import StatsTickerSection from '@/components/sections/StatsTickerSection'
import { SectionTransition } from '@/components/hellokhata/SectionTransition'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppWidget />
      <Navigation />
      <main>
        {/* The Arrival */}
        <HeroSection />

        {/* The Transformation */}
        <TransformationSection />

        {/* The Story — Why HelloKhata */}
        <KhataStorySection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Interactive Voice Demo */}
        <SectionTransition direction="light-to-dark" />
        <VoiceDemoSection />

        {/* The Voice */}
        <VoiceSection />

        {/* The Market - For Investors */}
        <SectionTransition direction="dark-to-light" />
        <MarketSection />

        {/* The Trust - Social Proof */}
        <TrustedBySection />

        {/* The Businesses */}
        <BusinessTypesSection />

        {/* The Testimonials */}
        <TestimonialsSection />

        {/* The Power - Features */}
        <SectionTransition direction="light-to-dark" />
        <FeaturesSection />

        {/* The Comparison */}
        <ComparisonSection />

        {/* The Edge - Batch */}
        <BatchSection />

        {/* The Promise - Pricing */}
        <SectionTransition direction="dark-to-light" />
        <PricingSection />

        {/* The People - About */}
        <SectionTransition direction="light-to-dark" />
        <AboutSection />

        {/* The Horizon - Vision */}
        <SectionTransition direction="light-to-dark" />
        <VisionSection />

        {/* The Knowledge - Blog */}
        <SectionTransition direction="dark-to-light" />
        <BlogSection />

        {/* The Updates - Newsletter */}
        <NewsletterSection />

        {/* The Connection - Contact */}
        <ContactSection />

        {/* The Final Call */}
        <SectionTransition direction="light-to-dark" />
        <CTASection />

        {/* The Stats Ticker */}
        <StatsTickerSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
