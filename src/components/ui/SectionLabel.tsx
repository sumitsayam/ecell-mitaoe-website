'use client';

import React from 'react';

interface SectionLabelProps {
  number?: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function SectionLabel({
  number,
  label,
  dark = false,
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider ${className}`}>
      {number && (
        <span
          className={`px-1.5 py-0.5 rounded font-medium ${
            dark
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-primary/5 text-primary border border-primary/15'
          }`}
        >
          {number}
        </span>
      )}
      <span className={dark ? 'text-slate-400 font-medium' : 'text-body-muted font-medium'}>
        {label}
      </span>
    </div>
  );
}

