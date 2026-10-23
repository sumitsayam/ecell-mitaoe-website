import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'neutral';
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-navy-850 text-white',
    secondary: 'bg-pale-surface text-navy-850 border border-cream-200',
    outline: 'bg-transparent text-navy-850 border border-navy-850/40',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    neutral: 'bg-white text-navy-950 border border-cream-200 shadow-2xs',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
