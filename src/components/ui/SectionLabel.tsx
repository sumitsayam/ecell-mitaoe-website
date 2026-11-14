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
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${className}`}>
      {number && (
        <span className="px-1.5 py-0.5 rounded font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          {number}
        </span>
      )}
      <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-[11px]">
        {label}
      </span>
    </div>
  );
}
