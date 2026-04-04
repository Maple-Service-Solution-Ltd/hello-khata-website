'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHashRouter } from './HashRouter';
import { NAV_LINKS, DARK_SECTION_IDS, getPageConfig } from '@/lib/pages';
import WaveformMark from './WaveformMark';

export default function Navigation() {
  const { currentPage, navigate } = useHashRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  /* ─── Scroll position: determine dark vs light background ─── */
  useEffect(() => {
    const pageConfig = getPageConfig(currentPage);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      /* Check which section the navbar is positioned over */
      const navBottom = window.scrollY + 80;
      let overDark = false;

      // First check the current page config
      if (pageConfig?.dark && window.scrollY < 100) {
        overDark = true;
      } else {
        for (const id of DARK_SECTION_IDS) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            const bottom = top + el.offsetHeight;
            if (navBottom >= top && navBottom <= bottom) {
              overDark = true;
              break;
            }
          }
        }
      }
      setIsOverDark(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Immediately check on mount / page change via the handler
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  /* ─── Lock body scroll when mobile menu open ─── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ─── Navigate helper ─── */
  const handleNavigate = useCallback(
    (page: string) => {
      navigate(page);
      setMobileOpen(false);
    },
    [navigate]
  );

  const isLight = !isOverDark || isScrolled;

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out',
          'h-[76px] flex items-center',
          !isLight
            ? 'bg-transparent border-b-0'
            : 'bg-[rgba(250,247,240,0.88)] backdrop-blur-[20px] border-b border-[var(--canvas-border)]'
        )}
      >
        <div className="w-full max-w-[1380px] mx-auto px-6 flex items-center justify-between">
          {/* ─── Logo ─── */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-[6px] group shrink-0 cursor-pointer"
          >
            <WaveformMark size="xs" active={mobileOpen} />
            <span
              className={cn(
                'font-body font-bold text-[22px] transition-colors duration-300',
                isLight ? 'text-[var(--text-ink)]' : 'text-[var(--text-cream)]'
              )}
            >
              Hello
            </span>
            <span className="font-body font-bold text-[22px] text-[var(--gold)]">
              Khata
            </span>
          </button>

          {/* ─── Desktop Nav Links ─── */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.page;

              return (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={cn(
                    'relative font-bengali text-[15px] tracking-wide leading-none transition-colors duration-200 py-2 px-3 -mx-3 rounded-lg cursor-pointer',
                    isActive
                      ? 'text-[var(--gold)]'
                      : !isLight
                        ? 'text-[var(--text-cream)] hover:text-[var(--gold)] hover:bg-[rgba(255,255,255,0.06)]'
                        : 'text-[var(--text-ink)] hover:text-[var(--gold)] hover:bg-[rgba(13,15,14,0.04)]'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[var(--gold)] transition-all duration-300',
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* ─── Glass Search Button ─── */}
          <button
            className={cn(
              'hidden lg:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 shrink-0 backdrop-blur-sm cursor-pointer',
              !isLight
                ? 'text-[var(--text-cream-muted)] hover:text-[var(--text-cream)] hover:bg-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] border border-[var(--ink-border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[rgba(13,15,14,0.06)] bg-[rgba(250,247,240,0.5)] border border-[var(--canvas-border)]'
            )}
            aria-label="Search"
          >
            <Search size={16} strokeWidth={2} />
          </button>

          {/* ─── Right Actions ─── */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Language toggle pill */}
            <div
              className={cn(
                'flex items-center rounded-full px-1 py-1 text-[12px] font-body border transition-colors duration-300',
                !isLight
                  ? 'border-[var(--ink-border-strong)] text-[var(--text-cream-muted)]'
                  : 'border-[var(--canvas-border-strong)] text-[var(--text-muted)]'
              )}
            >
              <button
                onClick={() => setLang('en')}
                className={cn(
                  'px-2.5 py-0.5 rounded-full transition-all duration-200 text-[12px] font-body cursor-pointer',
                  lang === 'en'
                    ? 'bg-[var(--gold)] text-white'
                    : 'hover:text-[var(--text-ink)]'
                )}
              >
                EN
              </button>
              <span className="text-[10px] opacity-40">·</span>
              <button
                onClick={() => setLang('bn')}
                className={cn(
                  'px-2.5 py-0.5 rounded-full transition-all duration-200 text-[12px] font-bengali cursor-pointer',
                  lang === 'bn'
                    ? 'bg-[var(--gold)] text-white'
                    : 'hover:text-[var(--text-ink)]'
                )}
              >
                বাং
              </button>
            </div>

            {/* Download CTA button */}
            <button
              onClick={() => handleNavigate('pricing')}
              className="flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-deep)] text-white px-5 py-2.5 rounded-full font-bengali text-[14px] font-medium transition-all duration-300 shadow-[0_0_20px_var(--gold-glow)] hover:shadow-[0_0_30px_var(--gold-glow-strong)] animate-[pulse-glow_3s_ease-in-out_infinite] cursor-pointer"
            >
              <Download size={16} strokeWidth={2} />
              অ্যাপ নামান
            </button>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'lg:hidden p-2 transition-colors duration-200 cursor-pointer',
              !isLight ? 'text-[var(--text-cream)]' : 'text-[var(--text-ink)]'
            )}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--ink)]/95 backdrop-blur-xl flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-[76px]">
              <div className="flex items-center gap-[6px]">
                <WaveformMark size="xs" active />
                <span className="font-body font-bold text-2xl text-[var(--text-cream)]">
                  Hello
                </span>
                <span className="font-body font-bold text-2xl text-[var(--gold)]">
                  Khata
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-cream)] p-2 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              {/* Home link */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 0.3 }}
                onClick={() => handleNavigate('home')}
                className={cn(
                  'font-bengali text-[24px] h-12 flex items-center justify-center gap-2 transition-all duration-200 relative border-l-2 pl-6 cursor-pointer',
                  currentPage === 'home'
                    ? 'text-[var(--gold)] border-[var(--gold)]'
                    : 'text-[var(--text-cream)] hover:text-[var(--gold)] border-transparent'
                )}
              >
                হোম
              </motion.button>

              {NAV_LINKS.map((link, i) => {
                const isActive = currentPage === link.page;

                return (
                  <motion.button
                    key={link.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.04, duration: 0.3 }}
                    onClick={() => handleNavigate(link.page)}
                    className={cn(
                      'font-bengali text-[24px] h-12 flex items-center justify-center gap-2 transition-all duration-200 relative border-l-2 pl-6 cursor-pointer',
                      isActive
                        ? 'text-[var(--gold)] border-[var(--gold)]'
                        : 'text-[var(--text-cream)] hover:text-[var(--gold)] border-transparent'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[var(--gold)]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile bottom actions */}
            <div className="px-6 pb-8 flex flex-col items-center gap-4">
              {/* Language toggle */}
              <div className="flex items-center rounded-full px-1 py-1 text-[12px] border border-[var(--ink-border-strong)] text-[var(--text-cream-muted)]">
                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    'px-2.5 py-0.5 rounded-full transition-all duration-200 text-[12px] font-body cursor-pointer',
                    lang === 'en'
                      ? 'bg-[var(--gold)] text-white'
                      : 'hover:text-[var(--text-cream)]'
                  )}
                >
                  EN
                </button>
                <span className="text-[10px] opacity-40">·</span>
                <button
                  onClick={() => setLang('bn')}
                  className={cn(
                    'px-2.5 py-0.5 rounded-full transition-all duration-200 text-[12px] font-bengali cursor-pointer',
                    lang === 'bn'
                      ? 'bg-[var(--gold)] text-white'
                      : 'hover:text-[var(--text-cream)]'
                  )}
                >
                  বাং
                </button>
              </div>

              {/* Download button */}
              <button
                onClick={() => handleNavigate('pricing')}
                className="flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-deep)] text-white px-6 py-3 rounded-full font-bengali text-[16px] font-medium transition-all duration-300 cursor-pointer"
              >
                <Download size={18} strokeWidth={2} />
                অ্যাপ নামান
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
