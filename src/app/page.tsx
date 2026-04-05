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
import FloatingActions from '@/components/hellokhata/FloatingActions';
import Footer from '@/components/hellokhata/Footer';
import { ToastProvider } from '@/components/hellokhata/ToastProvider';
import { ToastContainer } from '@/components/hellokhata/Toast';

export default function Home() {
  return (
    <ToastProvider>
      <HashRouter>
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <PageIndicator />
          <SearchModal />
          <main>
            <PageContent />
          </main>
          <Footer />
          <FloatingActions />
          <BackToTop />
          <WhatsAppWidget />
          <ToastContainer />
        </SmoothScrollProvider>
      </HashRouter>
    </ToastProvider>
  );
}
