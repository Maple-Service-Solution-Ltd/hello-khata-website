'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type PhoneFrameSize = 'sm' | 'md' | 'lg';

interface PhoneFrameProps {
  rotate?: number;
  glow?: boolean;
  size?: PhoneFrameSize;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<PhoneFrameSize, { width: string; height: string; screenRadius: string; innerPad: string }> = {
  sm: { width: '220px', height: '440px', screenRadius: '16px', innerPad: '6px' },
  md: { width: '280px', height: '560px', screenRadius: '20px', innerPad: '7px' },
  lg: { width: '340px', height: '680px', screenRadius: '24px', innerPad: '8px' },
};

export function PhoneFrame({
  rotate = -5,
  glow = true,
  size = 'md',
  className,
  children,
}: PhoneFrameProps) {
  const config = sizeMap[size];

  return (
    <div
      className={cn('relative', className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        animation: 'float 6s ease-in-out infinite',
      }}
    >
      {/* Glow behind the phone */}
      {glow && (
        <div
          className="absolute inset-0 rounded-[36px] blur-3xl opacity-50"
          style={{
            background: 'var(--gold)',
            transform: 'scale(0.7)',
          }}
        />
      )}

      {/* Phone body */}
      <div
        className="relative mx-auto rounded-[36px] overflow-hidden"
        style={{
          width: config.width,
          height: config.height,
          background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 20px 60px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.05)
          `,
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: size === 'sm' ? '90px' : size === 'md' ? '110px' : '130px',
            height: size === 'sm' ? '22px' : size === 'md' ? '26px' : '30px',
            background: 'linear-gradient(145deg, #2a2a2e, #1a1a1e)',
            borderRadius: '0 0 16px 16px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Camera dot */}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '8px',
              height: '8px',
              background: 'radial-gradient(circle, #1a3a2a, #0a1a0a)',
              boxShadow: 'inset 0 0 2px rgba(201,169,110,0.3)',
            }}
          />
        </div>

        {/* Screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: config.innerPad,
            left: config.innerPad,
            right: config.innerPad,
            bottom: config.innerPad,
            borderRadius: config.screenRadius,
            background: '#000',
          }}
        >
          {children}
        </div>

        {/* Side buttons - right */}
        <div
          className="absolute right-[-2px] top-[120px] w-[3px] rounded-r-sm"
          style={{
            height: size === 'sm' ? '40px' : size === 'md' ? '48px' : '56px',
            background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
          }}
        />
        <div
          className="absolute right-[-2px] top-[180px] w-[3px] rounded-r-sm"
          style={{
            height: size === 'sm' ? '50px' : size === 'md' ? '60px' : '70px',
            background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
          }}
        />

        {/* Side button - left */}
        <div
          className="absolute left-[-2px] top-[140px] w-[3px] rounded-l-sm"
          style={{
            height: size === 'sm' ? '60px' : size === 'md' ? '72px' : '84px',
            background: 'linear-gradient(180deg, #2a2a2e, #3a3a3e, #2a2a2e)',
          }}
        />
      </div>
    </div>
  );
}

export default PhoneFrame;
