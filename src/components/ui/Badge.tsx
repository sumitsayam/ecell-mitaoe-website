'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'forest' | 'orange' | 'yellow' | 'neutral' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    forest: 'bg-forest/10 text-forest border-forest/20',
    orange: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
    yellow: 'bg-accent-yellow/20 text-yellow-900 border-accent-yellow/30',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    dark: 'bg-white/10 text-white border-white/20',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded border font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}

