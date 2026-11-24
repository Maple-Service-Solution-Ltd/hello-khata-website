"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { MicIcon } from "@/components/home/HeroStage";

/**
 * The HelloKhata assistant as it looks in the app (the same chat the home page's phone uses): a forest screen,
 * the shopkeeper's words in cream bubbles, the assistant's in green, a waveform while it listens and a typing
 * indicator while it answers. Purely presentational; each section drives it with its own scripted conversation.
 * Nothing here touches the microphone or plays sound.
 */

export type ChatMsg = { id: number; from: "user" | "ai"; text: string; voice?: boolean; ok?: boolean; actions?: ReactNode };

export function Waveform({ bars = 16, className, tone = "bg-leaf-glow/80" }: { bars?: number; className?: string; tone?: string }) {
  return (
    <span className={cn("flex items-center gap-[3px]", className)} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className={cn("w-[3px] origin-center animate-wave rounded-full", tone)} style={{ height: `${8 + ((i * 7) % 14)}px`, animationDelay: `${(i % 6) * 0.12}s` }} />
      ))}
    </span>
  );
}

export function AssistantPhone({
  msgs,
  typing,
  listening,
  reduce,
  onMic,
  input,
  chips,
  className,
  tall = false,
}: {
  msgs: ChatMsg[];
  typing: boolean;
  listening: boolean;
  reduce: boolean;
  onMic: () => void;
  /** A text box for typed questions; without it the bar shows a placeholder and the mic. */
  input?: { value: string; onChange: (v: string) => void; onSubmit: () => void };
  chips?: ReactNode;
  className?: string;
  /** The larger phone of the demo section. */
  tall?: boolean;
}) {
  const { t } = useI18n();
  const p = t.features.assistantPage.phone;
  const chat = useRef<HTMLDivElement>(null);
  const [hasText, setHasText] = useState(false);
  useEffect(() => setHasText(!!input?.value.trim()), [input?.value]);
  useEffect(() => {
    chat.current?.scrollTo({ top: chat.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  return (
    <div className={cn("relative rounded-[2.4rem] bg-ink p-2.5 shadow-[var(--shadow-float)]", tall ? "w-[300px] max-w-full" : "w-[250px]", className)}>
      <div className={cn("relative flex flex-col overflow-hidden rounded-[1.9rem] bg-forest text-cream", tall ? "h-[560px]" : "h-[480px]")}>
        <div className="mx-auto mt-2 flex h-5 w-20 items-center justify-center gap-1 rounded-full bg-ink" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1 rounded-full bg-white/35" />
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <span className="relative flex size-7 items-center justify-center rounded-full bg-leaf/20">
            <span className={cn("size-2 rounded-full bg-leaf-glow", listening && !reduce && "animate-pulse")} />
          </span>
          <div>
            <p className="text-[0.82rem] leading-tight font-semibold">{p.title}</p>
            <p className="text-[0.64rem] leading-tight text-marigold-soft/90">{p.note}</p>
          </div>
        </div>

        <div ref={chat} className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-3 pb-2" aria-live="polite">
          <div className="mt-auto flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 leading-snug",
                    tall ? "text-[0.86rem]" : "text-[0.8rem]",
                    m.from === "user" ? "ml-auto rounded-br-md bg-cream text-ink" : m.ok ? "rounded-bl-md bg-leaf text-white" : "rounded-bl-md bg-leaf-deep",
                  )}
                  initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {m.voice && (
                    <span className="mb-0.5 flex items-center gap-1 text-[0.62rem] font-bold text-leaf-deep">
                      <MicIcon className="size-3" /> {p.voiceTag}
                    </span>
                  )}
                  {m.text}
                  {m.actions}
                </motion.div>
              ))}
              {typing && (
                <motion.div key="typing" className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-leaf-deep px-3 py-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="status" aria-label={p.typing}>
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="size-1.5 rounded-full bg-cream/80" animate={reduce ? undefined : { y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {chips && <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 pb-2">{chips}</div>}

        <form
          className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            input?.onSubmit();
          }}
        >
          <div className="relative flex h-10 min-w-0 flex-1 items-center rounded-full bg-white/10 px-3">
            {listening ? (
              <span className="flex w-full items-center justify-center" role="status" aria-label={p.listening}>
                <Waveform bars={tall ? 18 : 14} />
              </span>
            ) : input ? (
              <input value={input.value} onChange={(e) => input.onChange(e.target.value)} placeholder={p.placeholder} aria-label={p.placeholder} className="w-full bg-transparent text-[0.8rem] text-cream outline-none placeholder:text-cream/50" />
            ) : (
              <span className="text-[0.76rem] text-cream/50">{p.placeholder}</span>
            )}
          </div>
          {hasText ? (
            <button type="submit" aria-label={p.send} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-leaf text-white transition-transform active:scale-90">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                <path d="M3 10l14-6-6 14-2-6z" fill="currentColor" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={onMic} aria-label={p.mic} className={cn("relative flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-90", listening ? "bg-vermilion" : "bg-leaf")}>
              {listening && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-vermilion/50" />}
              <MicIcon className="relative size-4" />
            </button>
          )}
        </form>
        {listening && <p className="px-3 pb-2 text-center text-[0.62rem] text-cream/60">{p.listening}</p>}
      </div>
    </div>
  );
}

/** Scales a fixed-size composition down to fit its column, so one drawing (and its coordinates) works at any width. */
export function FitBox({ w, h, className, children }: { w: number; h: number; className?: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={outer} className={cn("relative w-full", className)} style={{ maxWidth: w, aspectRatio: `${w} / ${h}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}>
        {children}
      </div>
    </div>
  );
}
