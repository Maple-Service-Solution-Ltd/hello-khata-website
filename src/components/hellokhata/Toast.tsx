'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useToast } from './ToastProvider';
import type { ToastData, ToastType } from './ToastProvider';
import { cn } from '@/lib/utils';

/* ─────────────── Config ─────────────── */

const TOAST_CONFIG: Record<
  ToastType,
  {
    icon: React.ElementType;
    accentColor: string;
    accentBg: string;
    progressColor: string;
    glowColor: string;
  }
> = {
  success: {
    icon: CheckCircle,
    accentColor: 'var(--gold)',
    accentBg: 'rgba(201, 169, 110, 0.12)',
    progressColor: 'var(--gold)',
    glowColor: 'rgba(201, 169, 110, 0.08)',
  },
  error: {
    icon: AlertCircle,
    accentColor: 'var(--crimson)',
    accentBg: 'rgba(220, 38, 38, 0.1)',
    progressColor: 'var(--crimson)',
    glowColor: 'rgba(220, 38, 38, 0.06)',
  },
  info: {
    icon: Info,
    accentColor: '#3B82F6',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    progressColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.06)',
  },
  warning: {
    icon: AlertTriangle,
    accentColor: 'var(--amber)',
    accentBg: 'rgba(217, 119, 6, 0.1)',
    progressColor: 'var(--amber)',
    glowColor: 'rgba(217, 119, 6, 0.06)',
  },
};

/* ─────────────── Toast Item ─────────────── */

function ToastItem({ toast: t, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const config = TOAST_CONFIG[t.type];
  const Icon = config.icon;
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef(t.createdAt);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const duration = t.duration;

    function tick() {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [t.duration, t.createdAt]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 24,
      }}
      className={cn(
        'relative flex items-start gap-3 w-[340px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden',
        'bg-[var(--cream)]/90 backdrop-blur-xl',
        'border border-[var(--canvas-border-strong)]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]',
        'p-4 cursor-default select-none'
      )}
      style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 0 0 1px ${config.glowColor}` }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
        style={{ backgroundColor: config.accentBg }}
      >
        <Icon
          size={18}
          strokeWidth={2}
          style={{ color: config.accentColor }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <p
          className="font-bengali text-sm font-semibold leading-snug text-[var(--text-ink)] truncate"
        >
          {t.title}
        </p>

        {/* Description */}
        {t.description && (
          <p
            className="font-body text-[13px] leading-relaxed text-[var(--text-muted)] mt-1"
          >
            {t.description}
          </p>
        )}

        {/* Action button */}
        {t.action && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              t.action?.onClick();
              onDismiss();
            }}
            className={cn(
              'font-bengali text-[13px] font-semibold mt-2 px-3 py-1 rounded-lg',
              'transition-colors duration-200 cursor-pointer'
            )}
            style={{
              color: config.accentColor,
              backgroundColor: config.accentBg,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = config.accentColor;
              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = config.accentBg;
              (e.currentTarget as HTMLElement).style.color = config.accentColor;
            }}
          >
            {t.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onDismiss}
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center',
          'text-[var(--text-ghost)] hover:text-[var(--text-ink)]',
          'hover:bg-[var(--cream-2)] transition-colors duration-150 cursor-pointer'
        )}
        aria-label="Close toast"
      >
        <X size={14} strokeWidth={2.5} />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--cream-2)]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: config.progressColor }}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────── Toast Container ─────────────── */

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed bottom-24 right-6 z-50 flex flex-col-reverse gap-3 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
