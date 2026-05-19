import type { Metadata } from "next";
import { Tiro_Bangla, Playfair_Display, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/hellokhata/ToastProvider";
import { ScrollProgress, SmoothScrollProvider } from "@/components/hellokhata";
import { CustomCursor } from "@/components/hellokhata/CustomCursor";
import { HashRouter } from "@/components/hellokhata/HashRouter";
import Navigation from "@/components/hellokhata/Navigation";
import SearchModal from "@/components/hellokhata/SearchModal";
import FloatingActions from "@/components/hellokhata/FloatingActions";
import BackToTop from "@/components/hellokhata/BackToTop";
import { ToastContainer } from "@/components/hellokhata/Toast";
import Footer from "@/components/hellokhata/Footer";

export const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-bengali',
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HelloKhata — খাতা এখন কথা বলে। | AI-Powered Business OS for Bangladesh",
  description: "বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা ম্যানেজমেন্ট সিস্টেম। শুধু বলুন। HelloKhata বাকিটা করবে।",
  keywords: ["HelloKhata", "ব্যবসা ম্যানেজমেন্ট", "Bangladesh", "AI", "voice-first", "khata", "দোকান"],
  authors: [{ name: "HelloKhata Team" }],
  openGraph: {
    title: "HelloKhata — খাতা এখন কথা বলে।",
    description: "বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা ম্যানেজমেন্ট সিস্টেম।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${tiroBangla.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${firaCode.variable} antialiased`}
        style={{ background: 'var(--cream)' }}
      >

        <Toaster />

        <ToastProvider>
          <HashRouter>
            <SmoothScrollProvider>
              <CustomCursor />
              <ScrollProgress />
              <Navigation />
              <SearchModal />
              {children}
              <Footer />
              <FloatingActions />
              <BackToTop />
              {/* <WhatsAppWidget /> */}
              <ToastContainer />
            </SmoothScrollProvider>
          </HashRouter>
        </ToastProvider>
      </body>
    </html>
  );
}
