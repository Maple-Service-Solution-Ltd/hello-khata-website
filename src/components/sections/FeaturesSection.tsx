'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users,
  ShoppingCart,
  Package,
  Box,
  Layers,
  AlertTriangle,
  Truck,
  RotateCcw,
  BarChart3,
  GitBranch,
  UserCog,
  Sparkles,
  Check,
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

/* ═══════════════════════════════════════════════════
   Module Data
   ═══════════════════════════════════════════════════ */
interface ModuleData {
  id: number
  bn: string
  en: string
  icon: React.ReactNode
  isDouble?: boolean
  isPremiumIndigo?: boolean
}

const modules: ModuleData[] = [
  {
    id: 1,
    bn: 'গ্রাহক খাতা',
    en: 'Customer Ledger',
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 2,
    bn: 'বিক্রি ম্যানেজমেন্ট',
    en: 'Sales Management',
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: 3,
    bn: 'ক্রয় ম্যানেজমেন্ট',
    en: 'Purchase Management',
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: 4,
    bn: 'ইনভেন্টরি',
    en: 'Inventory / Stock',
    icon: <Box className="w-4 h-4" />,
  },
  {
    id: 5,
    bn: 'ব্যাচ ম্যানেজমেন্ট',
    en: 'Batch Management',
    icon: <Layers className="w-4 h-4" />,
    isDouble: true,
  },
  {
    id: 6,
    bn: 'মেয়াদোত্তীর্ণ ম্যানেজমেন্ট',
    en: 'Expiry Management',
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: 7,
    bn: 'সাপ্লায়ার ম্যানেজমেন্ট',
    en: 'Supplier Management',
    icon: <Truck className="w-4 h-4" />,
  },
  {
    id: 8,
    bn: 'রিটার্ন ও অ্যাডজাস্টমেন্ট',
    en: 'Returns & Adjustments',
    icon: <RotateCcw className="w-4 h-4" />,
  },
  {
    id: 9,
    bn: 'রিপোর্ট ও অ্যানালিটিক্স',
    en: 'Reports & Analytics',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: 10,
    bn: 'মাল্টি-ব্রাঞ্চ',
    en: 'Multi-Branch',
    icon: <GitBranch className="w-4 h-4" />,
  },
  {
    id: 11,
    bn: 'স্টাফ ম্যানেজমেন্ট',
    en: 'Staff Management',
    icon: <UserCog className="w-4 h-4" />,
  },
  {
    id: 12,
    bn: 'AI ইনসাইট',
    en: 'AI Insights',
    icon: <Sparkles className="w-4 h-4" />,
    isPremiumIndigo: true,
  },
]

/* ═══════════════════════════════════════════════════
   Phone Mockups for each module type
   ═══════════════════════════════════════════════════ */

function ModulePhoneMockup({ moduleId }: { moduleId: number }) {
  const isDark = moduleId % 2 !== 0

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: '280px', height: '520px' }}
    >
      {/* Phone frame */}
      <div
        className="w-full h-full rounded-[32px] overflow-hidden relative"
        style={{
          background: 'linear-gradient(145deg, #0A4A3B 0%, #00382C 100%)',
          border: '2px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.08)',
          padding: '10px',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: '90px',
            height: '24px',
            background: '#00382C',
            borderRadius: '0 0 14px 14px',
          }}
        />

        {/* Screen content */}
        <div
          className="w-full h-full rounded-[24px] overflow-hidden flex flex-col"
          style={{ background: isDark ? 'var(--ink)' : 'var(--cream)' }}
        >
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 pt-8 pb-1.5"
            style={{
              background: isDark ? 'var(--ink-1)' : 'var(--cream-2)',
            }}
          >
            <span
              className="text-[10px] font-body"
              style={{ color: isDark ? '#fff' : 'var(--text-ink)' }}
            >
              ৯:৪১
            </span>
            <span
              className="text-[10px] font-body font-semibold"
              style={{ color: 'var(--gold)' }}
            >
              HelloKhata
            </span>
            <span
              className="text-[10px] font-body"
              style={{ color: isDark ? '#fff' : 'var(--text-ink)' }}
            >
              🔋
            </span>
          </div>

          {/* Module-specific content */}
          <div className="flex-1 px-3 py-2 overflow-hidden">
            <PhoneContent moduleId={moduleId} isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneContent({ moduleId, isDark }: { moduleId: number; isDark: boolean }) {
  const textPrimary = isDark ? 'var(--text-cream)' : 'var(--text-ink)'
  const textMuted = isDark ? 'var(--text-cream-muted)' : 'var(--text-muted)'
  const cardBg = isDark ? 'var(--ink-2)' : 'var(--white)'
  const borderColor = isDark ? 'var(--ink-border)' : 'var(--canvas-border)'

  switch (moduleId) {
    case 1:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.15)' }}>
              <Users className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} />
            </div>
            <span className="font-bengali text-[13px] font-semibold" style={{ color: textPrimary }}>গ্রাহক খাতা</span>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <span className="text-[10px] font-body" style={{ color: textMuted }}>মোট বাকি</span>
            <div className="text-[22px] font-body font-bold" style={{ color: 'var(--gold)' }}>৳ ১,২৪,৫০০</div>
          </div>
          {[{ name: 'রহিম স্টোর', due: '৳ ১২,৫০০', days: '১৫ দিন' }, { name: 'করিম ট্রেডার্স', due: '৳ ৮,২০০', days: '৭ দিন' }, { name: 'আলী ভাই', due: '৳ ৫,৩০০', days: '৩ দিন' }].map((c, i) => (
            <div key={i} className="rounded-xl p-2.5 flex items-center justify-between" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div>
                <div className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{c.name}</div>
                <div className="text-[9px] font-body" style={{ color: textMuted }}>{c.days} আগে</div>
              </div>
              <div className="text-[12px] font-body font-bold" style={{ color: 'var(--crimson)' }}>{c.due}</div>
            </div>
          ))}
        </div>
      )

    case 2:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>বিক্রি আজ</div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-body" style={{ color: textMuted }}>আজকের বিক্রি</span>
              <span className="text-[16px] font-body font-bold" style={{ color: 'var(--gold)' }}>৳ ১৫,৭৫০</span>
            </div>
            <div className="flex items-end gap-1" style={{ height: '50px' }}>
              {[45, 65, 55, 80, 70, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 5 ? 'var(--gold)' : isDark ? 'rgba(201,169,110,0.25)' : 'rgba(201,169,110,0.15)' }} />
              ))}
            </div>
          </div>
          {[{ item: 'সার্ফ এক্সেল ৫০০g', qty: '৫ টি', amt: '৳ ২২৫' }, { item: 'প্যান্টিন ১০০g', qty: '৮ টি', amt: '৳ ১৬০' }, { item: 'রিচ ক্রিম বিস্কুট', qty: '১২ টি', amt: '৳ ৩৬০' }].map((s, i) => (
            <div key={i} className="rounded-xl p-2 flex items-center justify-between" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div>
                <div className="text-[11px] font-body" style={{ color: textPrimary }}>{s.item}</div>
                <div className="text-[9px] font-body" style={{ color: textMuted }}>× {s.qty}</div>
              </div>
              <div className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{s.amt}</div>
            </div>
          ))}
        </div>
      )

    case 3:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>আজকের ক্রয়</div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-body" style={{ color: textMuted }}>মোট ক্রয়</span>
              <span className="text-[16px] font-body font-bold" style={{ color: textPrimary }}>৳ ৪২,০০০</span>
            </div>
          </div>
          {[{ sup: 'ABC Traders', items: '১২ আইটেম', amt: '৳ ২৫,০০০', status: 'পরিশোধ' }, { sup: 'XYZ Ltd', items: '৮ আইটেম', amt: '৳ ১৭,০০০', status: 'বাকি' }].map((p, i) => (
            <div key={i} className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{p.sup}</span>
                <span className="text-[9px] font-body px-1.5 py-0.5 rounded-full" style={{ background: i === 0 ? 'rgba(201,169,110,0.15)' : 'rgba(217,119,6,0.15)', color: i === 0 ? 'var(--gold)' : 'var(--amber)' }}>{p.status}</span>
              </div>
              <div className="text-[9px] font-body mt-1" style={{ color: textMuted }}>{p.items} · {p.amt}</div>
            </div>
          ))}
        </div>
      )

    case 4:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>স্টক সামারি</div>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: 'মোট পণ্য', val: '২৪৫' }, { label: 'লো স্টক', val: '১২', warn: true }].map((s, i) => (
              <div key={i} className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                <div className="text-[9px] font-body" style={{ color: textMuted }}>{s.label}</div>
                <div className="text-[16px] font-body font-bold" style={{ color: (s as any).warn ? 'var(--amber)' : textPrimary }}>{s.val}</div>
              </div>
            ))}
          </div>
          {[{ name: 'সার্ফ এক্সেল', stock: '৮ পিস', pct: 80 }, { name: 'প্যান্টিন', stock: '৩ পিস', pct: 25, warn: true }].map((item, i) => (
            <div key={i} className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-body" style={{ color: textPrimary }}>{item.name}</span>
                <span className="text-[10px] font-body" style={{ color: item.warn ? 'var(--amber)' : textMuted }}>{item.stock}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: isDark ? 'var(--ink-1)' : 'var(--cream-2)' }}>
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.warn ? 'var(--amber)' : 'var(--gold)' }} />
              </div>
            </div>
          ))}
        </div>
      )

    case 5:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>ব্যাচ ট্র্যাকিং</div>
          <div className="text-[10px] font-body mb-1" style={{ color: textMuted }}>সার্ফ এক্সেল ৫০০g</div>
          {[
            { batch: '#A01', cost: '৳৪৫', qty: '৫০', sell: true },
            { batch: '#B02', cost: '৳৪৮', qty: '৩০', sell: false },
            { batch: '#C03', cost: '৳৪৭', qty: '৪০', sell: false },
          ].map((b, i) => (
            <div key={i} className="rounded-xl p-2 relative overflow-hidden" style={{ background: b.sell ? 'rgba(201,169,110,0.1)' : cardBg, border: `1px solid ${b.sell ? 'rgba(201,169,110,0.3)' : borderColor}` }}>
              {b.sell && (
                <div className="absolute top-1.5 right-1.5 text-[8px] font-body font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--gold)', color: '#fff' }}>
                  SELL FIRST
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-body font-semibold" style={{ color: 'var(--gold)' }}>Batch {b.batch}</span>
                <span className="text-[10px] font-body" style={{ color: textMuted }}>Qty: {b.qty}</span>
              </div>
              <div className="text-[9px] font-body mt-0.5" style={{ color: textMuted }}>Cost: {b.cost}/unit</div>
            </div>
          ))}
          <div className="mt-auto rounded-lg p-2" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}>
            <div className="text-[9px] font-body" style={{ color: 'var(--gold)' }}>↕ FIFO অনুযায়ী Batch #A01 আগে বিক্রি হবে</div>
          </div>
        </div>
      )

    case 6:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>এক্সপায়ারি ট্র্যাকার</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ label: 'নিরাপদ', val: '১৮৯', color: 'var(--gold)' }, { label: 'শীঘ্রই', val: '২৪', color: 'var(--amber)' }, { label: 'এক্সপায়ার্ড', val: '৩', color: 'var(--crimson)' }].map((s, i) => (
              <div key={i} className="rounded-xl p-2 text-center" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                <div className="text-[9px] font-body" style={{ color: textMuted }}>{s.label}</div>
                <div className="text-[14px] font-body font-bold" style={{ color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
          {/* Calendar-like grid */}
          <div className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="text-[10px] font-body mb-2" style={{ color: textMuted }}>জুন ২০২৫</div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }).map((_, i) => {
                const color = i === 3 ? 'var(--amber)' : i === 8 ? 'var(--crimson)' : 'var(--gold)'
                return (
                  <div key={i} className="w-4 h-4 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )

    case 7:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>সাপ্লায়ার তালিকা</div>
          {[{ name: 'ABC Traders', items: '৪৫', due: '৳ ১৮,০০০', paid: '৳ ৫২,০০০' }, { name: 'XYZ Ltd', items: '৩২', due: '৳ ১২,৫০০', paid: '৳ ৩৮,০০০' }, { name: 'নাহার এন্টারপ্রাইজ', items: '২৮', due: '৳ ৬,০০০', paid: '৳ ২৪,০০০' }].map((s, i) => (
            <div key={i} className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{s.name}</span>
                <span className="text-[9px] font-body" style={{ color: textMuted }}>{s.items} আইটেম</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] font-body" style={{ color: 'var(--crimson)' }}>পাওনা: {s.due}</span>
                <span className="text-[9px] font-body" style={{ color: 'var(--gold)' }}>পরিশোধ: {s.paid}</span>
              </div>
            </div>
          ))}
        </div>
      )

    case 8:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>রিটার্ন আজ</div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-body" style={{ color: textMuted }}>আজকের রিটার্ন</span>
              <span className="text-[14px] font-body font-bold" style={{ color: 'var(--amber)' }}>৳ ২,৪৫০</span>
            </div>
          </div>
          {[{ item: 'প্যান্টিন ১০০g', qty: '২ টি', reason: 'ড্যামেজ', amt: '৳ ৪০' }, { item: 'রিচ ক্রিম', qty: '৫ টি', reason: 'এক্সপায়ার্ড', amt: '৳ ২০০' }].map((r, i) => (
            <div key={i} className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex justify-between">
                <span className="text-[11px] font-body" style={{ color: textPrimary }}>{r.item}</span>
                <span className="text-[11px] font-body font-semibold" style={{ color: 'var(--crimson)' }}>-{r.amt}</span>
              </div>
              <div className="text-[9px] font-body mt-0.5" style={{ color: textMuted }}>× {r.qty} · {r.reason}</div>
            </div>
          ))}
        </div>
      )

    case 9:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>ড্যাশবোর্ড</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[{ label: 'আজকের বিক্রি', val: '৳ ১৫,৭৫০' }, { label: 'এই মাসে', val: '৳ ২,৪৫,০০০' }, { label: 'মোট লাভ', val: '৳ ৬৮,৫০০' }, { label: 'গ্রাহক', val: '১২৫' }].map((s, i) => (
              <div key={i} className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                <div className="text-[8px] font-body" style={{ color: textMuted }}>{s.label}</div>
                <div className="text-[12px] font-body font-bold" style={{ color: 'var(--gold)' }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="text-[9px] font-body mb-1.5" style={{ color: textMuted }}>সাপ্তাহিক বিক্রি</div>
            <div className="flex items-end gap-1" style={{ height: '50px' }}>
              {[40, 55, 70, 50, 85, 65, 90].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 6 ? 'var(--gold)' : isDark ? 'rgba(201,169,110,0.25)' : 'rgba(201,169,110,0.15)' }} />
              ))}
            </div>
          </div>
        </div>
      )

    case 10:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>শাখা তালিকা</div>
          {[
            { name: 'মূল শাখা - মতিঝিল', sales: '৳ ১,২৫,০০০', status: 'সক্রিয়' },
            { name: 'শাখা ২ - উত্তরা', sales: '৳ ৮৭,৫০০', status: 'সক্রিয়' },
            { name: 'শাখা ৩ - মিরপুর', sales: '৳ ৬৫,২০০', status: 'সক্রিয়' },
          ].map((b, i) => (
            <div key={i} className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{b.name}</span>
                <span className="text-[8px] font-body px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(201,169,110,0.15)', color: 'var(--gold)' }}>{b.status}</span>
              </div>
              <div className="text-[9px] font-body mt-1" style={{ color: textMuted }}>বিক্রি: {b.sales}</div>
            </div>
          ))}
        </div>
      )

    case 11:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: textPrimary }}>স্টাফ পারফরম্যান্স</div>
          {[{ name: 'হাসান', role: 'সেলসম্যান', sales: '৳ ৪৫,২০০', today: true }, { name: 'কামাল', role: 'হেল্পার', sales: '৳ ২৮,৭০০', today: false }].map((s, i) => (
            <div key={i} className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-body font-bold" style={{ background: isDark ? 'var(--ink-1)' : 'var(--cream-2)', color: textPrimary }}>
                  {s.name[0]}
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-body font-semibold" style={{ color: textPrimary }}>{s.name} <span className="font-normal text-[9px]" style={{ color: textMuted }}>· {s.role}</span></div>
                  <div className="text-[9px] font-body" style={{ color: 'var(--gold)' }}>বিক্রি: {s.sales}</div>
                </div>
                {s.today && <div className="text-[8px] font-body px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(201,169,110,0.15)', color: 'var(--gold)' }}>আজ</div>}
              </div>
            </div>
          ))}
          <div className="rounded-xl p-2" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="text-[9px] font-body" style={{ color: textMuted }}>আজকের অ্যাটেন্ড্যান্স</div>
            <div className="flex items-center gap-2 mt-1">
              {['হাসান', 'কামাল', 'রহিম', 'জামাল'].map((n, i) => (
                <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-body" style={{ background: i < 3 ? 'rgba(201,169,110,0.2)' : 'rgba(220,38,38,0.2)', color: i < 3 ? 'var(--gold)' : 'var(--crimson)' }}>{n[0]}</div>
              ))}
              <span className="text-[9px] font-body" style={{ color: textMuted }}>৩/৪</span>
            </div>
          </div>
        </div>
      )

    case 12:
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[13px] font-bengali font-semibold mb-1" style={{ color: 'var(--indigo)' }}>AI ইনসাইট</div>
          <div className="rounded-xl p-2.5" style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)' }}>
            <div className="text-[10px] font-body" style={{ color: 'var(--indigo)' }}>💡 স্মার্ট সুপারশ</div>
            <div className="text-[11px] font-bengali mt-1" style={{ color: textPrimary }}>সার্ফ এক্সেল এর বিক্রি গত সপ্তাহে ২৫% বেড়েছে। স্টক বাড়ানোর সুপারশ দিচ্ছি।</div>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="text-[10px] font-body" style={{ color: textMuted }}>⚠️ প্রেডিকশন</div>
            <div className="text-[11px] font-bengali mt-1" style={{ color: textPrimary }}>আগামী সপ্তাহে বিক্রি ১৫% কমতে পারে। ক্রয় কমান।</div>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="text-[10px] font-body" style={{ color: textMuted }}>📈 প্রফিট অপটিমাইজেশন</div>
            <div className="text-[11px] font-bengali mt-1" style={{ color: textPrimary }}>মার্জিন বাড়াতে ৩টি পণ্যের দাম সামঞ্জস্য করুন।</div>
          </div>
        </div>
      )

    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════
   Batch Diagram (for module #05)
   ═══════════════════════════════════════════════════ */
function BatchDiagram() {
  const batches = [
    { id: 'A01', supplier: 'ABC Traders', date: '15 Jan 2025', cost: '৳45', expiry: 'Dec 2025', qty: '50', sellFirst: true },
    { id: 'B02', supplier: 'XYZ Ltd', date: '02 Mar 2025', cost: '৳48', expiry: 'Mar 2026', qty: '30', sellFirst: false },
    { id: 'C03', supplier: 'ABC Traders', date: '18 Apr 2025', cost: '৳47', expiry: 'Jun 2026', qty: '40', sellFirst: false },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="text-[12px] font-body mb-1" style={{ color: 'var(--text-cream-muted)' }}>
        পণ্য: সার্ফ এক্সেল ৫০০g
      </div>
      {batches.map((b, i) => (
        <div key={i}>
          <div
            className="rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-2 relative"
            style={{
              background: b.sellFirst ? 'rgba(201,169,110,0.08)' : 'var(--ink-2)',
              border: `1px solid ${b.sellFirst ? 'rgba(201,169,110,0.3)' : 'var(--ink-border-strong)'}`,
            }}
          >
            {b.sellFirst && (
              <div
                className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-body font-bold text-white"
                style={{ background: 'var(--gold)', animation: 'pulse-glow 2s ease-in-out infinite' }}
              >
                ↓ SELL FIRST
              </div>
            )}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: b.sellFirst ? 'rgba(201,169,110,0.2)' : 'var(--ink-1)', color: b.sellFirst ? 'var(--gold)' : 'var(--text-cream)' }}>
                #{b.id}
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-body truncate" style={{ color: 'var(--text-cream)' }}>{b.supplier}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-body" style={{ color: 'var(--text-cream-muted)' }}>
              <span>{b.date}</span>
              <span>Cost: {b.cost}</span>
              <span>Exp: {b.expiry}</span>
              <span>Qty: {b.qty}</span>
            </div>
          </div>
          {i < batches.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowRight className="w-4 h-4 rotate-90" style={{ color: 'var(--gold)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Animations
   ═══════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
export default function FeaturesSection() {
  const [activeModule, setActiveModule] = useState(1)
  const navRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const { t, lang } = useTranslation()

  /* IntersectionObserver for active module detection */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-module-id'))
            if (id) setActiveModule(id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  /* Scroll to module */
  const scrollToModule = useCallback((id: number) => {
    const ref = sectionRefs.current[id - 1]
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return (
    <section id="features" className="relative" style={{ background: 'var(--ink)' }}>
      {/* Nakshi diamond texture */}
      <div className="texture-nakshi-diamond absolute inset-0 pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="relative z-10 pt-24 pb-16 px-6 lg:px-12" style={{ maxWidth: 'var(--site-max)', margin: '0 auto' }}>
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
            style={{ borderColor: 'rgba(201,169,110,0.3)' }}
            variants={fadeUp}
          >
            <span className="font-body tracking-[0.12em] uppercase" style={{ fontSize: 'var(--fs-label)', color: 'var(--gold)' }}>
              {t('features.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            className="font-bengali text-white leading-[1.15] mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
            variants={fadeUp}
          >
            {t('features.headline')}
          </motion.h2>

          <motion.p
            className="font-body mx-auto"
            style={{ fontSize: 'var(--fs-body)', color: 'var(--text-cream-muted)', maxWidth: '580px' }}
            variants={fadeUp}
          >
            {t('features.sub')}
          </motion.p>
        </motion.div>
      </div>

      {/* ── Module Sections ── */}
      <div className="relative z-10">
        {modules.map((m, idx) => {
          const isOdd = m.id % 2 !== 0
          const isDouble = m.isDouble
          const isPremiumIndigo = m.isPremiumIndigo
          const isDark = isOdd

          return (
            <ModuleSection
              key={m.id}
              module={m}
              index={idx}
              isOdd={isOdd}
              isDouble={isDouble}
              isPremiumIndigo={isPremiumIndigo}
              isDark={isDark}
              registerRef={(i, el) => { sectionRefs.current[i] = el }}
            />
          )
        })}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   Module Section
   ═══════════════════════════════════════════════════ */
function ModuleSection({
  module,
  index,
  isOdd,
  isDouble,
  isPremiumIndigo,
  isDark,
  registerRef,
}: {
  module: ModuleData
  index: number
  isOdd: boolean
  isDouble?: boolean
  isPremiumIndigo?: boolean
  isDark: boolean
  registerRef: (index: number, el: HTMLElement | null) => void
}) {
  const { t, tArray, tRaw } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const moduleKey = `features.module${module.id}`
  const headline = t(`${moduleKey}.headline`)
  const body = t(`${moduleKey}.body`)
  const features = tArray(`${moduleKey}.features`) ?? []
  const callout = typeof tRaw(`${moduleKey}.callout`) === 'string' ? tRaw(`${moduleKey}.callout`)! : ''
  const pullQuote = typeof tRaw(`${moduleKey}.pullQuote`) === 'string' ? tRaw(`${moduleKey}.pullQuote`)! : ''

  useEffect(() => {
    registerRef(index, ref.current)
  }, [index, registerRef])

  const accentColor = isPremiumIndigo ? 'var(--indigo)' : 'var(--gold)'
  const accentBg = isPremiumIndigo ? 'rgba(79,70,229,0.1)' : 'rgba(201,169,110,0.08)'
  const accentBorder = isPremiumIndigo ? 'rgba(79,70,229,0.3)' : 'rgba(201,169,110,0.25)'

  /* Reverse layout for even modules */
  const isReversed = !isOdd && !isDouble

  return (
    <motion.section
      ref={ref}
      data-module-id={module.id}
      className="relative overflow-hidden"
      style={{
        background: isDark ? 'var(--ink)' : 'var(--cream-2)',
        padding: isDouble ? '80px 0' : '60px 0',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {/* Texture overlay for dark sections */}
      {isDark && (
        <div className={`absolute inset-0 pointer-events-none ${index % 3 === 0 ? 'texture-nakshi-diamond' : 'texture-nakshi-subtle'}`} />
      )}

      <div
        className={`relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center gap-10 lg:gap-16 ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
        style={{
          maxWidth: isDouble ? 'var(--site-max)' : '1200px',
        }}
      >
        {/* Left: Phone Mockup */}
        <motion.div
          className="w-full lg:w-[42%] flex justify-center"
          variants={isReversed ? fadeRight : fadeLeft}
        >
          <div className="w-full max-w-[280px]">
            <ModulePhoneMockup moduleId={module.id} />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div className="w-full lg:w-[58%]" variants={fadeUp}>
          {/* Module number ghost text */}
          <div
            className="font-body font-bold mb-2"
            style={{
              fontSize: '80px',
              lineHeight: 1,
              opacity: 0.08,
              color: accentColor,
              userSelect: 'none',
            }}
          >
            {String(module.id).padStart(2, '0')}
          </div>

          {/* Module name Bengali */}
          <h3
            className="font-bengali font-bold mb-1"
            style={{
              fontSize: '24px',
              color: isDark ? 'var(--text-cream)' : 'var(--text-ink)',
            }}
          >
            {module.bn}
          </h3>

          {/* Module name English */}
          <p
            className="font-body mb-4"
            style={{
              fontSize: '14px',
              color: isDark ? 'var(--text-cream-muted)' : 'var(--text-muted)',
            }}
          >
            {module.en}
          </p>

          {/* Emotional headline */}
          <h4
            className="font-bengali mb-4 leading-tight"
            style={{
              fontSize: 'clamp(22px, 3vw, 36px)',
              color: isDark ? 'var(--text-cream)' : 'var(--text-ink)',
            }}
          >
            {headline}
          </h4>

          {/* Body */}
          {body && (
            <p
              className="font-body mb-6"
              style={{
                fontSize: 'var(--fs-body)',
                color: isDark ? 'var(--text-cream-muted)' : 'var(--text-body)',
                lineHeight: 1.75,
                maxWidth: '480px',
              }}
            >
              {body}
            </p>
          )}

          {/* Feature list */}
          <div className="flex flex-col gap-2 mb-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5"
                variants={fadeUp}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: accentBg }}
                >
                  <Check className="w-3 h-3" style={{ color: accentColor }} />
                </div>
                <span
                  className="font-bengali text-[15px]"
                  style={{ color: isDark ? 'var(--text-cream)' : 'var(--text-body)' }}
                >
                  {feat}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Callout badge */}
          {callout && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: accentBg,
                border: `1px solid ${accentBorder}`,
              }}
              variants={fadeUp}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
              <span
                className="font-bengali text-[14px] font-semibold"
                style={{ color: accentColor }}
              >
                {callout}
              </span>
            </motion.div>
          )}

          {/* Pull quote */}
          {pullQuote && (
            <motion.div
              className="relative pl-4 mt-4"
              style={{ borderLeft: `2px solid ${accentColor}` }}
              variants={fadeUp}
            >
              <p
                className="font-display italic"
                style={{
                  fontSize: '15px',
                  color: isDark ? 'var(--text-cream-muted)' : 'var(--text-body)',
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{pullQuote}&rdquo;
              </p>
            </motion.div>
          )}

          {/* Batch Diagram for module #05 */}
          {module.isDouble && (
            <motion.div className="mt-8" variants={fadeUp}>
              <BatchDiagram />
            </motion.div>
          )}

          {/* AI Coming Soon badge for module #12 */}
          {module.isPremiumIndigo && (
            <motion.div
              className="mt-6 inline-block"
              style={{
                background: 'rgba(79,70,229,0.1)',
                border: '1px solid rgba(79,70,229,0.3)',
                borderRadius: 'var(--card-r-sm)',
                padding: '16px 24px',
                backdropFilter: 'blur(12px)',
              }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" style={{ color: 'var(--indigo)' }} />
                <div>
                  <span
                    className="font-body font-bold text-[14px] block"
                    style={{ color: 'var(--indigo)' }}
                  >
                    Coming Soon
                  </span>
                  <span
                    className="font-body text-[12px]"
                    style={{ color: 'var(--text-cream-muted)' }}
                  >
                    AI-পাওয়ার্ড ইনসাইট শীঘ্রই আসছে
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
