'use client';

import { Facebook, Linkedin, Youtube, ArrowUp, Mail, Phone } from 'lucide-react';
import WaveformMark from '@/components/hellokhata/WaveformMark';

/* ─── Inline HorizonLine placeholder (will be replaced by shared component) ─── */
function HorizonLine({ variant = 'subtle' }: { variant?: 'subtle' | 'default' }) {
  return (
    <div
      className="w-full"
      style={{
        height: 1,
        background:
          variant === 'subtle'
            ? 'linear-gradient(90deg, transparent, var(--ink-border-strong) 50%, transparent)'
            : 'linear-gradient(90deg, transparent, var(--green-glow-strong) 50%, transparent)',
      }}
    />
  );
}

interface FooterLink {
  label: string;
  href: string;
}

/* ─── Scroll-to-section helper ─── */
function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const offset = 76;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

const productLinks: FooterLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Voice', href: '#voice' },
  { label: 'Batch', href: '#batch' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Download', href: '#pricing' },
];

const companyLinks: FooterLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Team', href: '#about' },
  { label: 'Blog', href: '#blog' },
];

const supportLinks: FooterLink[] = [
  { label: 'Contact', href: '#contact' },
  { label: 'WhatsApp', href: '#contact' },
  { label: 'Privacy', href: '#contact' },
  { label: 'Terms', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#contact', label: 'Facebook' },
  { icon: Linkedin, href: '#contact', label: 'LinkedIn' },
  { icon: Youtube, href: '#contact', label: 'YouTube' },
];

const languages = ['বাংলা', 'English', 'हिन्दी'];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer id="footer" className="bg-[var(--ink)] text-[var(--text-cream)]">
      {/* ─── Top: Tagline ─── */}
      <div className="max-w-[1380px] mx-auto px-6 pt-16 pb-10 text-center">
        <h2
          className="font-bengali text-[clamp(28px,4vw,36px)] text-[var(--green)] leading-tight"
          style={{ textShadow: '0 0 30px var(--green-glow), 0 0 60px rgba(0,194,111,0.15)' }}
        >
          বাংলাদেশের ব্যবসার জন্য তৈরি।
        </h2>
        <p className="font-display italic text-[18px] text-[var(--text-cream-muted)] mt-3">
          Built in Bangladesh. For Bangladesh.
        </p>
      </div>

      <div className="max-w-[1380px] mx-auto px-6">
        <HorizonLine variant="subtle" />
      </div>

      {/* ─── 6-Column Grid ─── */}
      <div className="max-w-[1380px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* ─ Column 1: Logo + Description + Social ─ */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-[6px] mb-4">
              <WaveformMark size="xs" active />
              <span className="font-body font-bold text-2xl text-[var(--text-cream)]">
                Hello
              </span>
              <span className="font-body font-bold text-2xl text-[var(--green)]">
                Khata
              </span>
            </div>

            {/* Company description */}
            <p className="font-body text-[13px] text-[var(--text-cream-muted)] mb-5 leading-relaxed max-w-[280px]">
              বাংলাদেশের ক্ষুদ্র ও মাঝারি ব্যবসার জন্য সবচেয়ে সহজ ব্যবসা পরিচালনা অ্যাপ। ভয়েস কমান্ড, ব্যাচ ম্যানেজমেন্ট এবং AI দিয়ে আপনার দোকানকে ডিজিটাল করুন।
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => handleClick(e, social.href)}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--ink-border)] text-[var(--text-cream-muted)] transition-all duration-300 hover:text-[var(--green)] hover:border-[var(--green)] hover:scale-110 hover:rotate-6"
                  aria-label={social.label}
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Made in */}
            <p className="font-body text-[13px] text-[var(--text-cream-muted)]">
              Made in Bangladesh 🇧🇩
            </p>
          </div>

          {/* ─ Column 2: Product ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--green)' }}
            >
              পণ্য
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label + link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 inline-block hover:translate-x-[4px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 3: Company ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--green)' }}
            >
              কোম্পানি
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label + link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 inline-block hover:translate-x-[4px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 4: Support ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--green)' }}
            >
              সহায়তা
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label + link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 inline-block hover:translate-x-[4px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 5: Download ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--green)' }}
            >
              নামান
            </h3>
            <div className="flex flex-col gap-3">
              {/* Play Store Badge */}
              <a
                href="#pricing"
                onClick={(e) => handleClick(e, '#pricing')}
                className="inline-flex items-center gap-2 border border-[var(--ink-border)] rounded-xl px-4 py-2.5 transition-all duration-300 group hover:border-[var(--green)] hover:shadow-[0_0_20px_var(--green-glow)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[var(--text-cream-muted)] group-hover:text-[var(--green)] transition-colors"
                >
                  <path
                    d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.895 10.635l2.56-2.56 3.668 2.11a1 1 0 010 1.734l-3.668 2.11-2.56-2.394zm-1.414 1.414L5.51 21.886l8.581-8.023zm0-2.828L5.51 2.114l8.581 7.921z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-body text-[10px] text-[var(--text-cream-muted)]">
                    GET IT ON
                  </span>
                  <span className="font-body text-[13px] font-semibold text-[var(--text-cream)]">
                    Google Play
                  </span>
                </div>
              </a>

              {/* App Store Badge */}
              <a
                href="#pricing"
                onClick={(e) => handleClick(e, '#pricing')}
                className="inline-flex items-center gap-2 border border-[var(--ink-border)] rounded-xl px-4 py-2.5 transition-all duration-300 group hover:border-[var(--green)] hover:shadow-[0_0_20px_var(--green-glow)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[var(--text-cream-muted)] group-hover:text-[var(--green)] transition-colors"
                >
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-body text-[10px] text-[var(--text-cream-muted)]">
                    Download on the
                  </span>
                  <span className="font-body text-[13px] font-semibold text-[var(--text-cream)]">
                    App Store
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Contact Us Strip ─── */}
      <div className="max-w-[1380px] mx-auto px-6">
        <HorizonLine variant="subtle" />
      </div>
      <div className="max-w-[1380px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <a
            href="mailto:hello@hellokhata.com"
            className="flex items-center gap-2 text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 hover:translate-x-[4px]"
          >
            <Mail size={14} className="shrink-0" />
            <span>hello@hellokhata.com</span>
          </a>
          <a
            href="tel:+8801XXXXXXXXX"
            className="flex items-center gap-2 text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 hover:translate-x-[4px]"
          >
            <Phone size={14} className="shrink-0" />
            <span>+৮৮০ ১XXX-XXXXXX</span>
          </a>
        </div>
      </div>

      {/* ─── Bottom Strip ─── */}
      <div className="border-t border-[var(--ink-border)]">
        <div className="max-w-[1380px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Copyright + Links */}
          <p className="font-body text-[12px] text-[var(--text-cream-muted)]">
            © 2025 HelloKhata ·{' '}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="hover:text-[var(--green)] transition-colors"
            >
              Privacy
            </a>{' '}
            ·{' '}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="hover:text-[var(--green)] transition-colors"
            >
              Terms
            </a>
          </p>

          {/* Center: Language Selector Pills */}
          <div className="flex items-center gap-1.5">
            {languages.map((lang, i) => (
              <button
                key={lang}
                className="px-3 py-1 rounded-full text-[11px] font-body transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: i === 0 ? 'rgba(0,194,111,0.15)' : 'transparent',
                  color: i === 0 ? 'var(--green)' : 'var(--text-cream-muted)',
                  border: '1px solid',
                  borderColor: i === 0 ? 'rgba(0,194,111,0.3)' : 'var(--ink-border)',
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Right: Back to top + Built in */}
          <div className="flex items-center gap-4">
            <p className="font-body text-[12px] text-[var(--text-cream-muted)]">
              Designed and built in 🇧🇩 Bangladesh
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-[12px] font-body text-[var(--text-cream-muted)] hover:text-[var(--green)] transition-all duration-200 cursor-pointer hover:translate-x-[4px]"
            >
              <ArrowUp size={12} />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
