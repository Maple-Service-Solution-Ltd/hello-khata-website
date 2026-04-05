'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

type WaveformSize = 'xs' | 'sm' | 'md' | 'lg';
type WaveformColor = 'green' | 'cream' | 'white';

interface WaveformMarkProps {
  active?: boolean;
  size?: WaveformSize;
  color?: WaveformColor;
  className?: string;
}

const sizeConfig: Record<WaveformSize, { count: number; barWidth: string; gap: string; minH: number; maxH: number; inactiveH: number }> = {
  xs: { count: 3, barWidth: '3px', gap: '3px', minH: 4, maxH: 16, inactiveH: 3 },
  sm: { count: 4, barWidth: '3.5px', gap: '4px', minH: 6, maxH: 22, inactiveH: 3 },
  md: { count: 5, barWidth: '4px', gap: '4px', minH: 8, maxH: 28, inactiveH: 3 },
  lg: { count: 8, barWidth: '4.5px', gap: '5px', minH: 10, maxH: 36, inactiveH: 2 },
};

const colorMap: Record<WaveformColor, string> = {
  green: 'var(--gold)',
  cream: 'var(--text-cream)',
  white: '#FFFFFF',
};

export function WaveformMark({
  active = false,
  size = 'md',
  color = 'green',
  className,
}: WaveformMarkProps) {
  const config = sizeConfig[size];
  const fillColor = colorMap[color];

  // Generate stable random offsets for each bar based on index
  const bars = useMemo(() => {
    return Array.from({ length: config.count }, (_, i) => {
      // Use a simple deterministic pseudo-random based on index
      const seed = (i + 1) * 7;
      const delay = ((seed * 3) % 10) / 10;
      const duration = 0.8 + ((seed * 2) % 6) / 10;
      const maxOffset = ((seed * 5) % 10) / 10;
      return { delay, duration, maxOffset };
    });
  }, [config.count]);

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'will-change-transform',
        className
      )}
      style={{ gap: config.gap }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => {
        const waveHeight = config.minH + bar.maxOffset * (config.maxH - config.minH);
        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: config.barWidth,
              height: active ? waveHeight : config.inactiveH,
              backgroundColor: fillColor,
              opacity: active ? 1 : 0.4,
              transition: 'height 0.4s ease, opacity 0.4s ease',
              animation: active
                ? `waveform ${bar.duration}s ease-in-out ${bar.delay}s infinite`
                : 'none',
              '--wave-height': `${waveHeight}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

export default WaveformMark;
