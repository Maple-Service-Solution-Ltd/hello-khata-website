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
import BatchSection from '@/components/sections/BatchSection'
import PricingSection from '@/components/sections/PricingSection'
import AboutSection from '@/components/sections/AboutSection'
import VisionSection from '@/components/sections/VisionSection'
import BlogSection from '@/components/sections/BlogSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import ContactSection from '@/components/sections/ContactSection'
import CTASection from '@/components/sections/CTASection'

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
        <VoiceDemoSection />

        {/* The Voice */}
        <VoiceSection />

        {/* The Market - For Investors */}
        <MarketSection />

        {/* The Trust - Social Proof */}
        <TrustedBySection />

        {/* The Businesses */}
        <BusinessTypesSection />

        {/* The Testimonials */}
        <TestimonialsSection />

        {/* The Power - Features */}
        <FeaturesSection />

        {/* The Edge - Batch */}
        <BatchSection />

        {/* The Promise - Pricing */}
        <PricingSection />

        {/* The People - About */}
        <AboutSection />

        {/* The Horizon - Vision */}
        <VisionSection />

        {/* The Knowledge - Blog */}
        <BlogSection />

        {/* The Updates - Newsletter */}
        <NewsletterSection />

        {/* The Connection - Contact */}
        <ContactSection />

        {/* The Final Call */}
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
