'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Search, ArrowRight } from 'lucide-react';
import {
  Home,
  LayoutGrid,
  Mic,
  Layers,
  BookOpen,
  Tag,
  Info,
  Eye,
  FileText,
  MessageCircle,
  Download,
  House,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHashRouter } from './HashRouter';
import { PAGES } from '@/lib/pages';
import { useCommandPalette } from './useCommandPalette';

/* ─────────────── Page icon mapping ─────────────── */

const PAGE_ICONS: Record<string, LucideIcon> = {
  home: Home,
  features: LayoutGrid,
  voice: Mic,
  batch: Layers,
  stories: BookOpen,
  pricing: Tag,
  about: Info,
  vision: Eye,
  blog: FileText,
  contact: MessageCircle,
};

/* ─────────────── Quick actions ─────────────── */

const QUICK_ACTIONS = [
  {
    id: 'go-home',
    labelBn: 'হোমে যান',
    labelEn: 'Go to Home',
    icon: House,
    action: 'home' as const,
  },
  {
    id: 'download-app',
    labelBn: 'অ্যাপ নামান',
    labelEn: 'Download App',
    icon: Download,
    action: 'pricing' as const,
  },
  {
    id: 'contact-us',
    labelBn: 'যোগাযোগ করুন',
    labelEn: 'Contact Us',
    icon: MessageCircle,
    action: 'contact' as const,
  },
];

/* ─────────────── Animation variants ─────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.15 },
  },
};

/* ─────────────── Component ─────────────── */

export default function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const { navigate } = useHashRouter();
  const commandRef = useRef<HTMLDivElement>(null);

  /* Handle page navigation */
  const handleSelect = useCallback(
    (pageId: string) => {
      navigate(pageId);
      setIsOpen(false);
    },
    [navigate, setIsOpen]
  );

  /* Auto-focus input when opened */
  useEffect(() => {
    if (!isOpen) return;
    // cmdk auto-focuses the input, but add a small delay for safety
    const timer = setTimeout(() => {
      const input = commandRef.current?.querySelector(
        'input[data-slot="command-input"]'
      ) as HTMLInputElement | null;
      input?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* ─── Backdrop overlay ─── */}
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[12px]"
              />
            </DialogPrimitive.Overlay>

            {/* ─── Dialog content ─── */}
            <DialogPrimitive.Content
              forceMount
              asChild
              aria-describedby={undefined}
            >
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed left-1/2 top-[18%] z-50 w-full max-w-[560px] -translate-x-1/2"
              >
                {/* Screen reader only */}
                <DialogPrimitive.Title className="sr-only">
                  কমান্ড প্যালেট
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  পেজ খুঁজুন বা দ্রুত অ্যাকশন নিন
                </DialogPrimitive.Description>

                <div
                  ref={commandRef}
                  className="overflow-hidden rounded-[16px] border border-[var(--ink-border-strong)] bg-[var(--ink-1)] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                >
                  <Command
                    className="flex flex-col"
                    loop
                  >
                    {/* ─── Search input area ─── */}
                    <div className="flex items-center gap-3 border-b border-[var(--ink-border)] px-4 h-[52px]">
                      <Search
                        size={18}
                        strokeWidth={1.8}
                        className="shrink-0 text-[var(--text-cream-muted)]"
                      />
                      <Command.Input
                        placeholder="পেজ খুঁজুন…"
                        className="flex-1 bg-transparent text-[var(--text-cream)] placeholder:text-[var(--text-cream-muted)] font-bengali text-[15px] outline-none"
                      />
                      {/* Keyboard shortcut badge */}
                      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-[6px] border border-[var(--ink-border-strong)] bg-[var(--ink-2)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--text-cream-muted)] leading-none select-none">
                        <span className="text-[10px]">⌘</span>K
                      </kbd>
                    </div>

                    {/* ─── Results list ─── */}
                    <Command.List className="max-h-[340px] overflow-y-auto overflow-x-hidden p-2">
                      <Command.Empty className="py-8 text-center text-[var(--text-cream-muted)] font-bengali text-sm">
                        কিছু পাওয়া যায়নি
                      </Command.Empty>

                      {/* ─── Pages group ─── */}
                      <Command.Group
                        heading="পেজসমূহ"
                        className="[&_[cmdk-group-heading]]:text-[var(--text-cream-muted)] [&_[cmdk-group-heading]]:font-bengali [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                      >
                        {PAGES.map((page) => {
                          const Icon = PAGE_ICONS[page.id] || Home;
                          return (
                            <Command.Item
                              key={page.id}
                              value={`${page.label} ${page.labelEn} ${page.id}`}
                              onSelect={() => handleSelect(page.id)}
                              className={cn(
                                'flex items-center gap-3 rounded-[12px] px-3 py-2.5 cursor-pointer',
                                'text-[var(--text-cream)] transition-colors duration-150',
                                'data-[selected=true]:bg-[var(--gold)]/15 data-[selected=true]:text-[var(--gold)]',
                                'data-[selected=true]:[&_svg]:text-[var(--gold)]'
                              )}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[var(--ink-2)] shrink-0">
                                <Icon size={16} strokeWidth={1.8} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bengali text-[14px] leading-tight">
                                  {page.label}
                                </div>
                                <div className="font-body text-[12px] text-[var(--text-cream-muted)] leading-tight mt-0.5">
                                  {page.labelEn}
                                </div>
                              </div>
                              <ArrowRight
                                size={14}
                                strokeWidth={1.5}
                                className="shrink-0 opacity-0 translate-x-[-4px] transition-all duration-150 data-[selected=true]:opacity-60 data-[selected=true]:translate-x-0"
                              />
                            </Command.Item>
                          );
                        })}
                      </Command.Group>

                      {/* ─── Separator ─── */}
                      <Command.Separator className="my-1 h-px bg-[var(--ink-border)]" />

                      {/* ─── Quick actions group ─── */}
                      <Command.Group
                        heading="দ্রুত অ্যাকশন"
                        className="[&_[cmdk-group-heading]]:text-[var(--text-cream-muted)] [&_[cmdk-group-heading]]:font-bengali [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                      >
                        {QUICK_ACTIONS.map((action) => {
                          const Icon = action.icon;
                          return (
                            <Command.Item
                              key={action.id}
                              value={`${action.labelBn} ${action.labelEn} ${action.id}`}
                              onSelect={() => handleSelect(action.action)}
                              className={cn(
                                'flex items-center gap-3 rounded-[12px] px-3 py-2.5 cursor-pointer',
                                'text-[var(--text-cream)] transition-colors duration-150',
                                'data-[selected=true]:bg-[var(--gold)]/15 data-[selected=true]:text-[var(--gold)]',
                                'data-[selected=true]:[&_svg]:text-[var(--gold)]'
                              )}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[var(--gold)]/10 shrink-0">
                                <Icon size={16} strokeWidth={1.8} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bengali text-[14px] leading-tight">
                                  {action.labelBn}
                                </div>
                                <div className="font-body text-[12px] text-[var(--text-cream-muted)] leading-tight mt-0.5">
                                  {action.labelEn}
                                </div>
                              </div>
                              <ArrowRight
                                size={14}
                                strokeWidth={1.5}
                                className="shrink-0 opacity-0 translate-x-[-4px] transition-all duration-150 data-[selected=true]:opacity-60 data-[selected=true]:translate-x-0"
                              />
                            </Command.Item>
                          );
                        })}
                      </Command.Group>
                    </Command.List>

                    {/* ─── Footer hint ─── */}
                    <div className="flex items-center gap-4 border-t border-[var(--ink-border)] px-4 py-2.5">
                      <div className="flex items-center gap-1.5 text-[var(--text-cream-muted)]">
                        <kbd className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-[4px] border border-[var(--ink-border-strong)] bg-[var(--ink-2)] px-1 font-mono text-[10px]">
                          ↑↓
                        </kbd>
                        <span className="font-body text-[11px]">নেভিগেট</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-cream-muted)]">
                        <kbd className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-[4px] border border-[var(--ink-border-strong)] bg-[var(--ink-2)] px-1 font-mono text-[10px]">
                          ↵
                        </kbd>
                        <span className="font-body text-[11px]">নির্বাচন</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--text-cream-muted)]">
                        <kbd className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-[4px] border border-[var(--ink-border-strong)] bg-[var(--ink-2)] px-1 font-mono text-[10px]">
                          esc
                        </kbd>
                        <span className="font-body text-[11px]">বন্ধ</span>
                      </div>
                    </div>
                  </Command>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
