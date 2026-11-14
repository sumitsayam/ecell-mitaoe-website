'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveBlurProps {
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  layers?: number;
  maxBlur?: number;
}

export function ProgressiveBlur({
  className,
  direction = 'bottom',
  layers = 8,
  maxBlur = 24,
}: ProgressiveBlurProps) {
  const getGradient = (index: number, total: number) => {
    const start = (index / total) * 100;
    const end = ((index + 1) / total) * 100;

    switch (direction) {
      case 'top':
        return `linear-gradient(to top, rgba(0,0,0,1) ${start}%, rgba(0,0,0,0) ${end}%)`;
      case 'left':
        return `linear-gradient(to left, rgba(0,0,0,1) ${start}%, rgba(0,0,0,0) ${end}%)`;
      case 'right':
        return `linear-gradient(to right, rgba(0,0,0,1) ${start}%, rgba(0,0,0,0) ${end}%)`;
      case 'bottom':
      default:
        return `linear-gradient(to bottom, rgba(0,0,0,1) ${start}%, rgba(0,0,0,0) ${end}%)`;
    }
  };

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {Array.from({ length: layers }).map((_, i) => {
        const blurAmount = Math.pow(2, i * (Math.log2(maxBlur) / layers));
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurAmount.toFixed(1)}px)`,
              WebkitBackdropFilter: `blur(${blurAmount.toFixed(1)}px)`,
              maskImage: getGradient(i, layers),
              WebkitMaskImage: getGradient(i, layers),
            }}
          />
        );
      })}
    </div>
  );
}

