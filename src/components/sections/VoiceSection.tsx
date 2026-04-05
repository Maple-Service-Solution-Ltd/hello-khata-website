'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle, BarChart3, AlertTriangle, Package, TrendingUp, ShieldAlert } from 'lucide-react';

/* ─── Voice Commands Data ─── */
const VOICE_COMMANDS = [
  { roman: 'Rahim er 500 taka baki add koro', bengali: 'রহিমের ৫০০ টাকা বাকি যোগ করো' },
  { roman: 'Ajker bikri dekhao', bengali: 'আজকের বিক্রি দেখাও' },
  { roman: 'Chal er stock kom ase koto?', bengali: 'চালের stock কম আছে কত?' },
  { roman: 'Notun product add koro - Surf Excel 500g', bengali: 'নতুন পণ্য যোগ করো - সার্ফ এক্সেল ৫০০g' },
  { roman: 'Last 7 days er profit dekhao', bengali: 'গত ৭ দিনের লাভ দেখাও' },
  { roman: 'Expired medicine list dekhao', bengali: 'Expired medicine লিস্ট দেখাও' },
];

/* ─── Marquee Commands ─── */
const MARQUEE_ROW_1 = [
  { roman: 'Kal er hisheb ta bolao', bengali: 'কালের হিসেবটা বলাও' },
  { roman: 'Karim er dues clear koro', bengali: 'করিমের dues ক্লিয়ার করো' },
  { roman: 'Top 5 selling products dekhao', bengali: 'Top 5 selling products দেখাও' },
  { roman: 'Expense report ekkhun banao', bengali: 'Expense report এখন বানাও' },
  { roman: 'Staff salary hisheb koro', bengali: 'Staff salary হিসেব করো' },
  { roman: 'Customer list ta share koro', bengali: 'Customer list টা share করো' },
  { roman: 'Monthly profit chart dekhao', bengali: 'Monthly profit chart দেখাও' },
  { roman: 'New order entry koro', bengali: 'New order entry করো' },
];

const MARQUEE_ROW_2 = [
  { roman: 'Inventory sync korao', bengali: 'Inventory sync করাও' },
  { roman: 'Shop er location set koro', bengali: 'Shop এর location set করো' },
  { roman: 'Pending orders gula dekhao', bengali: 'Pending orders গুলা দেখাও' },
  { roman: 'Payment reminder pathao', bengali: 'Payment reminder পাঠাও' },
  { roman: 'Daily report email koro', bengali: 'Daily report email করো' },
  { roman: 'Supplier info dekhao', bengali: 'Supplier info দেখাও' },
  { roman: 'Sales trend analyze koro', bengali: 'Sales trend analyze করো' },
  { roman: 'Backup data save koro', bengali: 'Backup data save করো' },
];

/* ─── Phone Response Screens ─── */
interface ResponseScreen {
  icon: React.ReactNode;
  content: React.ReactNode;
}

function getResponseForCommand(idx: number): ResponseScreen {
  switch (idx) {
    case 0:
      return {
        icon: <CheckCircle size={14} className="text-[var(--gold)]" />,
        content: (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">Customer Ledger</div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bengali text-[var(--text-cream)]">রহিম</span>
              <span className="text-[13px] font-mono text-[var(--gold)]">+৳৫০০</span>
            </div>
            <div className="h-px bg-[var(--ink-border-strong)]" />
            <div className="text-[11px] text-[var(--text-cream-muted)] font-body">Total Due: ৳৫০০</div>
          </div>
        ),
      };
    case 1:
      return {
        icon: <BarChart3 size={14} className="text-[var(--gold)]" />,
        content: (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">Today&apos;s Sales</div>
            <div className="text-[20px] font-mono font-bold text-[var(--gold)]">৳12,450</div>
            <div className="flex gap-0.5 items-end h-6">
              {[40, 60, 45, 80, 55, 70, 90, 65, 85, 75, 50, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, var(--gold-deep), var(--gold))`,
                    opacity: 0.5 + (h / 200),
                  }}
                />
              ))}
            </div>
          </div>
        ),
      };
    case 2:
      return {
        icon: <AlertTriangle size={14} className="text-[var(--amber)]" />,
        content: (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">Stock Alerts</div>
            {['চাল (মিনিকেট)', 'ডাল (মসুর)', 'তেল (সয়াবিন)'].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[12px] font-bengali text-[var(--text-cream)]">{item}</span>
                <span className="text-[9px] font-body px-1.5 py-0.5 rounded-full bg-[var(--amber)] text-white">Low</span>
              </div>
            ))}
          </div>
        ),
      };
    case 3:
      return {
        icon: <Package size={14} className="text-[var(--gold)]" />,
        content: (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">Product Added</div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[var(--gold)]" />
              <span className="text-[12px] font-bengali text-[var(--text-cream)]">সার্ফ এক্সেল ৫০০g</span>
            </div>
            <div className="text-[10px] text-[var(--text-cream-muted)] font-body">Price: ৳195 · Category: Detergent</div>
          </div>
        ),
      };
    case 4:
      return {
        icon: <TrendingUp size={14} className="text-[var(--gold)]" />,
        content: (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">7-Day Profit</div>
            <div className="text-[20px] font-mono font-bold text-[var(--gold)]">+৳48,200</div>
            <div className="text-[10px] text-[var(--text-cream-muted)] font-body">↑ 12% from last week</div>
            <div className="flex gap-0.5 items-end h-5">
              {[55, 40, 65, 70, 50, 80, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: 'linear-gradient(to top, var(--gold-deep), var(--gold))',
                  }}
                />
              ))}
            </div>
          </div>
        ),
      };
    case 5:
      return {
        icon: <ShieldAlert size={14} className="text-[var(--crimson)]" />,
        content: (
          <div className="space-y-1.5">
            <div className="text-[10px] text-[var(--text-ghost)] font-body">Expired Items</div>
            {['Napa Extra (3 items)', 'Ace (2 items)', 'Seclo (1 item)'].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[11px] font-body text-[var(--crimson)]">{item}</span>
                <span className="text-[9px] font-body px-1.5 py-0.5 rounded-full bg-[var(--crimson)] text-white">⚠</span>
              </div>
            ))}
          </div>
        ),
      };
    default:
      return { icon: null, content: null };
  }
}

/* ─── Main Component ─── */
export default function VoiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [currentCmdIdx, setCurrentCmdIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = useCallback((cmdIdx: number) => {
    const cmd = VOICE_COMMANDS[cmdIdx];
    let charIdx = 0;
    setIsTyping(true);
    setProgress(0);

    if (typingRef.current) clearInterval(typingRef.current);

    typingRef.current = setInterval(() => {
      if (charIdx <= cmd.roman.length) {
        setDisplayedText(cmd.roman.slice(0, charIdx));
        setProgress((charIdx / cmd.roman.length) * 100);
        charIdx++;
      } else {
        if (typingRef.current) clearInterval(typingRef.current);
        setIsTyping(false);
      }
    }, 50);
  }, []);

  const cycleCommands = useCallback(() => {
    if (cycleRef.current) clearTimeout(cycleRef.current);

    cycleRef.current = setTimeout(() => {
      setCurrentCmdIdx((prev) => {
        const next = (prev + 1) % VOICE_COMMANDS.length;
        startTyping(next);
        return next;
      });
    }, 3500);
  }, [startTyping]);

  useEffect(() => {
    if (isInView) {
      startTyping(0);
    }
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, [isInView, startTyping]);

  useEffect(() => {
    if (!isTyping && isInView) {
      cycleCommands();
    }
  }, [isTyping, isInView, cycleCommands]);

  const waveHeights = [90, 70, 100, 60, 85, 75, 95, 65];
  const waveDelays = [0, 0.15, 0.3, 0.1, 0.25, 0.05, 0.2, 0.35];

  return (
    <section
      id="voice"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Texture overlay */}
      <div className="texture-nakshi-wave absolute inset-0 pointer-events-none" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--gold-glow-strong) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 w-full max-w-[var(--site-max)] mx-auto px-6 py-20 flex flex-col items-center">
        {/* ─── Waveform Visual ─── */}
        <motion.div
          className="flex items-center gap-1.5 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: '4px',
                height: '8px',
                background: 'var(--gold)',
                '--wave-height': `${h}px`,
                animation: `waveform ${0.8 + (i % 3) * 0.2}s ease-in-out ${waveDelays[i]}s infinite`,
                opacity: 0.7 + (h / 100) * 0.3,
              } as React.CSSProperties}
            />
          ))}
        </motion.div>

        {/* ─── Headline ─── */}
        <motion.h2
          className="font-bengali text-[var(--text-cream)] mb-16 text-center"
          style={{ fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          শুধু বলুন।
        </motion.h2>

        {/* ─── Voice Command Theatre ─── */}
        <motion.div
          className="w-full max-w-[700px] rounded-[20px] p-8"
          style={{
            background: 'var(--ink-1)',
            border: '1px solid var(--ink-border)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Left Panel - Speaking */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-body uppercase tracking-widest text-[var(--text-ghost)]">
                <Mic size={12} className="text-[var(--gold)]" />
                Speaking
              </div>

              {/* Typing area */}
              <div className="min-h-[80px] flex items-center">
                <span className="font-mono text-base text-[var(--gold)] leading-relaxed">
                  &ldquo;{displayedText}&rdquo;
                  {isTyping && (
                    <span
                      className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                      style={{
                        background: 'var(--gold)',
                        animation: 'pulse-glow 1s ease-in-out infinite',
                      }}
                    />
                  )}
                </span>
              </div>

              {/* Bengali translation */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentCmdIdx}
                  className="text-sm text-[var(--text-cream-muted)] font-bengali"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {VOICE_COMMANDS[currentCmdIdx].bengali}
                </motion.p>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--ink-2)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gold)' }}
                  animate={{ width: isTyping ? `${progress}%` : '100%' }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Animated connector (visible on md+) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12">
              <svg viewBox="0 0 48 24" className="w-full" fill="none">
                <path
                  d="M2 12 C16 2, 32 2, 46 12"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  style={{
                    animation: 'draw-line 1.5s ease-in-out infinite alternate',
                  }}
                />
                {/* Traveling dot */}
                <circle r="3" fill="var(--gold)">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path="M2 12 C16 2, 32 2, 46 12"
                  />
                </circle>
              </svg>
            </div>

            {/* Right Panel - Response */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-body uppercase tracking-widest text-[var(--text-ghost)]">
                <CheckCircle size={12} className="text-[var(--gold)]" />
                Response
              </div>

              {/* Phone mockup */}
              <div
                className="relative rounded-xl p-3 mx-auto"
                style={{
                  background: 'var(--ink-2)',
                  border: '1px solid var(--ink-border-strong)',
                  maxWidth: '220px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                {/* Phone notch */}
                <div className="flex justify-center mb-2">
                  <div
                    className="w-12 h-1 rounded-full"
                    style={{ background: 'var(--ink-border-strong)' }}
                  />
                </div>

                {/* Screen content */}
                <div className="min-h-[120px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCmdIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getResponseForCommand(currentCmdIdx).content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Phone bottom bar */}
                <div className="flex justify-center mt-3">
                  <div
                    className="w-8 h-1 rounded-full"
                    style={{ background: 'var(--ink-border)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Command Gallery (Marquee) ─── */}
        <div className="mt-16 w-full max-w-[700px] space-y-3 overflow-hidden">
          {/* Row 1 - scrolls left */}
          <div className="overflow-hidden">
            <div className="flex gap-3 whitespace-nowrap" style={{ animation: 'marquee-left 40s linear infinite' }}>
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((cmd, i) => (
                <CommandPill key={i} roman={cmd.roman} bengali={cmd.bengali} />
              ))}
            </div>
          </div>
          {/* Row 2 - scrolls right */}
          <div className="overflow-hidden">
            <div className="flex gap-3 whitespace-nowrap" style={{ animation: 'marquee-right 45s linear infinite' }}>
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((cmd, i) => (
                <CommandPill key={i} roman={cmd.roman} bengali={cmd.bengali} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Command Pill ─── */
function CommandPill({ roman, bengali }: { roman: string; bengali: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0"
      style={{
        background: 'var(--ink-1)',
        border: '1px solid var(--ink-border)',
      }}
    >
      <span className="text-xs font-mono text-[var(--gold)]">{roman}</span>
      <span className="text-xs font-bengali text-[var(--text-cream-muted)]">{bengali}</span>
    </div>
  );
}
