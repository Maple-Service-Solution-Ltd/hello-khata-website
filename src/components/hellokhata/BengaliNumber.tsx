'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface BengaliNumberProps {
  value: string | number;
  className?: string;
}

const BENGALI_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

function toBengali(numStr: string): string {
  return numStr.replace(/[0-9]/g, (match) => BENGALI_DIGITS[match] || match);
}

function formatWithCommas(numStr: string): string {
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;

  // Handle decimals
  const parts = numStr.split('.');
  const intPart = parts[0];
  const decPart = parts[1];

  const isNegative = intPart.startsWith('-');
  const absInt = isNegative ? intPart.slice(1) : intPart;

  // Format with Indian grouping (first 3, then groups of 2)
  if (absInt.length <= 3) {
    const result = (isNegative ? '-' : '') + absInt;
    return decPart !== undefined ? `${result}.${decPart}` : result;
  }

  // Indian number system: XXX,XX,XX,XXX
  const lastThree = absInt.slice(-3);
  const rest = absInt.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  const formatted = `${grouped},${lastThree}`;
  const result = (isNegative ? '-' : '') + formatted;

  return decPart !== undefined ? `${result}.${decPart}` : result;
}

export function BengaliNumber({ value, className }: BengaliNumberProps) {
  const bengaliText = useMemo(() => {
    const str = String(value);
    const formatted = formatWithCommas(str);
    return toBengali(formatted);
  }, [value]);

  return (
    <span className={cn('font-bengali tabular-nums', className)}>
      {bengaliText}
    </span>
  );
}

export default BengaliNumber;
