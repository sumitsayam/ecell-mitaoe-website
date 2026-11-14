'use client';

import React from 'react';

interface PaperCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderStyle?: 'solid' | 'dashed';
  dark?: boolean;
  onClick?: () => void;
}

export default function PaperCard({
  children,
  className = '',
  hoverEffect = true,
  borderStyle = 'solid',
  dark = false,
  onClick,
}: PaperCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl transition-all duration-300 ${
        dark
          ? 'bg-canvas-dark text-white border-white/10 hover:border-white/20'
          : 'bg-white text-body border-borderToken hover:border-primary/30'
      } ${borderStyle === 'dashed' ? 'border border-dashed' : 'border border-solid'} ${
        hoverEffect ? 'hover:shadow-elevated hover:-translate-y-0.5' : 'shadow-soft-card'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

