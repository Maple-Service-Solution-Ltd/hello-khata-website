'use client';

import { Facebook, Linkedin, Youtube, ArrowUp, Mail, Phone } from 'lucide-react';
import WaveformMark from '@/components/hellokhata/WaveformMark';
import { useHashRouter } from '@/components/hellokhata/HashRouter';
import { useLanguageStore, type Language } from '@/lib/language-store';
import { useTranslation } from '@/hooks/use-translation';
import { useToast } from '@/components/hellokhata/ToastProvider';
import { cn } from '@/lib/utils';

/* ─── Inline HorizonLine placeholder ─── */
function HorizonLine({ variant = 'subtle' }: { variant?: 'subtle' | 'default' }) {
  return (
    <div
      className="w-full"
      style={{
        height: 1,
        background:
          variant === 'subtle'
            ? 'linear-gradient(90deg, transparent, var(--ink-border-strong) 50%, transparent)'
            : 'linear-gradient(90deg, transparent, var(--gold-glow-strong) 50%, transparent)',
      }}
    />
  );
}

interface FooterLink {
  label: string;
  page: string;
}

const productLinks: FooterLink[] = [
  { label: 'footer.links.features', page: 'features' },
  { label: 'footer.links.voice', page: 'voice' },
  { label: 'footer.links.batch', page: 'batch' },
  { label: 'footer.links.pricing', page: 'pricing' },
  { label: 'footer.links.download', page: 'pricing' },
];

const companyLinks: FooterLink[] = [
  { label: 'footer.links.about', page: 'about' },
  { label: 'footer.links.vision', page: 'vision' },
  { label: 'footer.links.team', page: 'about' },
  { label: 'footer.links.blog', page: 'blog' },
];

const supportLinks: FooterLink[] = [
  { label: 'footer.links.contact', page: 'contact' },
  { label: 'footer.links.whatsapp', page: 'contact' },
  { label: 'footer.links.privacy', page: 'contact' },
  { label: 'footer.links.terms', page: 'contact' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/hellokhata', label: 'Facebook' },
  { icon: Linkedin, href: 'https://linkedin.com/company/hellokhata', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@hellokhata', label: 'YouTube' },
];

const LANGUAGE_OPTIONS: { code: Language; label: string; nativeFont: string }[] = [
  { code: 'bn', label: 'বাংলা', nativeFont: 'font-bengali' },
  { code: 'en', label: 'English', nativeFont: 'font-body' },
];

export default function Footer() {
  const { navigate } = useHashRouter();
  const { setLang } = useLanguageStore();
  const { t, lang } = useTranslation();
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    navigate(page);
  };

  return (
    <footer id="footer" className="bg-[var(--ink)] text-[var(--text-cream)]">
      {/* ─── Top: Tagline ─── */}
      <div className="max-w-[1380px] mx-auto px-6 py-10 text-center">
        <h2
          className="font-bengali text-[clamp(28px,4vw,36px)] text-[var(--gold)] leading-tight"
          style={{ textShadow: '0 0 30px var(--gold-glow), 0 0 60px rgba(201,169,110,0.15)' }}
        >
          {t('footer.tagline')}
        </h2>
        <p className="font-display italic text-[18px] text-[var(--text-cream-muted)] mt-3">
          {t('footer.taglineEn')}
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
              <span className="font-body font-bold text-2xl text-[var(--gold)]">
                Khata
              </span>
            </div>

            {/* Company description */}
            <p className="font-body text-[13px] text-[var(--text-cream-muted)] mb-5 leading-relaxed max-w-[280px]">
              {t('footer.description')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--ink-border)] text-[var(--text-cream-muted)] transition-all duration-300 hover:text-[var(--gold)] hover:border-[var(--gold)] hover:scale-110 hover:rotate-6"
                  aria-label={social.label}
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Made in */}
            <p className="font-body text-[13px] text-[var(--text-cream-muted)]">
              {t('footer.madeIn')}
            </p>
          </div>

          {/* ─ Column 2: Product ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--gold)' }}
            >
              {t('footer.columns.product')}
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label + link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 inline-block hover:translate-x-[4px] cursor-pointer"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 3: Company ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--gold)' }}
            >
              {t('footer.columns.company')}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label + link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 inline-block hover:translate-x-[4px] cursor-pointer"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 4: Support ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--gold)' }}
            >
              {t('footer.columns.support')}
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label + link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="font-body text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 inline-block hover:translate-x-[4px] cursor-pointer"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Column 5: Download ─ */}
          <div>
            <h3
              className="font-bengali text-[14px] font-semibold text-[var(--text-cream)] mb-4 pb-2"
              style={{ borderBottom: '3px solid var(--gold)' }}
            >
              {t('footer.columns.download')}
            </h3>
            <div className="flex flex-col gap-3">
              {/* Play Store Badge */}
              <button
                onClick={() => navigate('pricing')}
                className="inline-flex items-center gap-2 border border-[var(--ink-border)] rounded-xl px-4 py-2.5 transition-all duration-300 group hover:border-[var(--gold)] hover:shadow-[0_0_20px_var(--gold-glow)] cursor-pointer w-fit"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[var(--text-cream-muted)] group-hover:text-[var(--gold)] transition-colors"
                >
                  <path
                    d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.895 10.635l2.56-2.56 3.668 2.11a1 1 0 010 1.734l-3.668 2.11-2.56-2.394zm-1.414 1.414L5.51 21.886l8.581-8.023zm0-2.828L5.51 2.114l8.581 7.921z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="font-body text-[10px] text-[var(--text-cream-muted)]">
                    {t('footer.getEmail')}
                  </span>
                  <span className="font-body text-[13px] font-semibold text-[var(--text-cream)]">
                    Google Play
                  </span>
                </div>
              </button>

              {/* App Store Badge */}
              <button
                onClick={() => navigate('pricing')}
                className="inline-flex items-center gap-2 border border-[var(--ink-border)] rounded-xl px-4 py-2.5 transition-all duration-300 group hover:border-[var(--gold)] hover:shadow-[0_0_20px_var(--gold-glow)] cursor-pointer w-fit"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[var(--text-cream-muted)] group-hover:text-[var(--gold)] transition-colors"
                >
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="font-body text-[10px] text-[var(--text-cream-muted)]">
                    {t('footer.downloadOn')}
                  </span>
                  <span className="font-body text-[13px] font-semibold text-[var(--text-cream)]">
                    App Store
                  </span>
                </div>
              </button>
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
            className="flex items-center gap-2 text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 hover:translate-x-[4px]"
          >
            <Mail size={14} className="shrink-0" />
            <span>hello@hellokhata.com</span>
          </a>
          <a
            href="tel:+8801XXXXXXXXX"
            className="flex items-center gap-2 text-[13px] text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 hover:translate-x-[4px]"
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
            {t('common.copyright')} ·{' '}
            <button
              onClick={() => navigate('contact')}
              className="hover:text-[var(--gold)] transition-colors cursor-pointer"
            >
              {t('common.privacy')}
            </button>{' '}
            ·{' '}
            <button
              onClick={() => navigate('contact')}
              className="hover:text-[var(--gold)] transition-colors cursor-pointer"
            >
              {t('common.terms')}
            </button>
          </p>

          {/* Center: Language Selector Pills */}
          <div className="flex items-center gap-1.5">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isActive = lang === opt.code;
              return (
                <button
                  key={opt.code}
                  onClick={() => {
                    if (lang !== opt.code) {
                      setLang(opt.code);
                      toast({
                        type: opt.code === 'bn' ? 'success' : 'info',
                        title: opt.code === 'bn' ? t('nav.languageSwitchBn') : t('nav.languageSwitchEn'),
                        description: opt.code === 'en' ? t('nav.languageSwitchEnDesc') : undefined,
                        duration: 3000,
                      });
                    }
                  }}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-body transition-all duration-200 cursor-pointer',
                    opt.nativeFont
                  )}
                  style={{
                    backgroundColor: isActive ? 'rgba(201,169,110,0.15)' : 'transparent',
                    color: isActive ? 'var(--gold)' : 'var(--text-cream-muted)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(201,169,110,0.3)' : 'var(--ink-border)',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Right: Back to home + Built in */}
          <div className="flex items-center gap-4">
            <p className="font-body text-[12px] text-[var(--text-cream-muted)]">
              {t('footer.builtIn')}
            </p>
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-1 text-[12px] font-body text-[var(--text-cream-muted)] hover:text-[var(--gold)] transition-all duration-200 cursor-pointer hover:translate-x-[4px]"
            >
              <ArrowUp size={12} />
              <span>{t('footer.backToHome')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
