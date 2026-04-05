'use client';

import { HashRouter } from '@/components/hellokhata/HashRouter';
import { SmoothScrollProvider } from '@/components/hellokhata/SmoothScrollProvider';
import { ScrollProgress } from '@/components/hellokhata/ScrollProgress';
import { CustomCursor } from '@/components/hellokhata/CustomCursor';
import { PageContent } from '@/components/hellokhata/PageContent';
import BackToTop from '@/components/hellokhata/BackToTop';
import WhatsAppWidget from '@/components/hellokhata/WhatsAppWidget';
import Navigation from '@/components/hellokhata/Navigation';
import PageIndicator from '@/components/hellokhata/PageIndicator';
import SearchModal from '@/components/hellokhata/SearchModal';
import Footer from '@/components/hellokhata/Footer';

export default function Home() {
  return (
    <HashRouter>
      <SmoothScrollProvider>
        <CustomCursor />
        <ScrollProgress />
        <BackToTop />
        <WhatsAppWidget />
        <Navigation />
        <PageIndicator />
        <SearchModal />
        <main>
          <PageContent />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </HashRouter>
  );
}
