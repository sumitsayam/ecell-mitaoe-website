import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  overline: string;
  title: string;
  italicWord?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function SectionHeader({
  overline,
  title,
  italicWord,
  description,
  actionText,
  actionHref,
  onActionClick,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4 ${className}`}
    >
      <div className="max-w-2xl">
        {/* Overline with Horizontal Accent Rule */}
        <div className="flex items-center gap-3 mb-2.5">
          <span className="text-[11px] font-bold tracking-[0.24em] text-navy-850 uppercase">
            {overline}
          </span>
          <span className="w-16 sm:w-20 h-[2px] bg-navy-850" />
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 font-display tracking-tight leading-tight">
          {title}{' '}
          {italicWord && (
            <span className="font-serif italic font-normal text-navy-850">
              {italicWord}
            </span>
          )}
        </h2>

        {/* Optional Description */}
        {description && (
          <p className="text-sm sm:text-base text-ink/80 mt-3 font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Action link or button */}
      {actionText && (
        <div className="shrink-0 self-start sm:self-auto">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-navy-850 hover:text-navy-700 tracking-wide group py-1 border-b border-navy-850/30 hover:border-navy-850 transition-colors"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              type="button"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy-850 hover:text-navy-700 tracking-wide group py-1 border-b border-navy-850/30 hover:border-navy-850 transition-colors"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
