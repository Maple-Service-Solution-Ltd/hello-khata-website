'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

/* ─────────────── Types ─────────────── */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: ToastAction;
  duration: number;
  createdAt: number;
}

interface ToastContextType {
  toasts: ToastData[];
  toast: (options: {
    type: ToastType;
    title: string;
    description?: string;
    action?: ToastAction;
    duration?: number;
  }) => string;
  dismiss: (id: string) => void;
}

/* ─────────────── Context ─────────────── */

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  toast: () => '',
  dismiss: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

/* ─────────────── Helpers ─────────────── */

let toastCounter = 0;

function generateId(): string {
  toastCounter += 1;
  return `toast-${Date.now()}-${toastCounter}`;
}

/* ─────────────── Provider ─────────────── */

const MAX_VISIBLE_TOASTS = 3;
const DEFAULT_DURATION = 4000;

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));

    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: {
      type: ToastType;
      title: string;
      description?: string;
      action?: ToastAction;
      duration?: number;
    }): string => {
      const id = generateId();
      const duration = options.duration ?? DEFAULT_DURATION;
      const now = Date.now();

      const newToast: ToastData = {
        id,
        type: options.type,
        title: options.title,
        description: options.description,
        action: options.action,
        duration,
        createdAt: now,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only the most recent MAX_VISIBLE_TOASTS
        if (updated.length > MAX_VISIBLE_TOASTS) {
          const removed = updated.slice(0, updated.length - MAX_VISIBLE_TOASTS);
          removed.forEach((t) => {
            const timer = timersRef.current.get(t.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(t.id);
            }
          });
          return updated.slice(updated.length - MAX_VISIBLE_TOASTS);
        }
        return updated;
      });

      // Auto-dismiss timer
      const timer = setTimeout(() => {
        dismiss(id);
      }, duration);
      timersRef.current.set(id, timer);

      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}
