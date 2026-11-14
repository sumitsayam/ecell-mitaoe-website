'use client';

import React from 'react';
import Link from 'next/link';
import { RollingTitle } from './RollingTitle';
import { GridTrail } from '@/components/ui/GridTrail';

interface TitleScreenProps {
  onScrollCueClick?: () => void;
  className?: string;
}

export default function TitleScreen({ onScrollCueClick, className = '' }: TitleScreenProps) {
  return (
    <section
      id="title-screen"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center select-none px-6 sm:px-10 lg:px-12 bg-transparent ${className}`}
    >
      {/* ── Fixed CSS Grid & Active Cursor Decay Trail ── */}
      <GridTrail />

      {/* ── Main Cover Content (Clean Editorial) ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-16 sm:py-24">
        {/* Rolling Title Component (WAAPI-driven Odometer Roll) */}
        <RollingTitle />

        {/* Factual, sentence-case student founder description */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl font-sans text-[var(--ink)]/80 max-w-2xl text-center leading-relaxed font-normal">
          We support student founders with ₹25L pre-seed grants, rapid prototyping makerspaces, 100% reimbursed patent filings, and a community of high-conviction builders.
        </p>

        {/* Action Controls: Verb-based primary button & secondary text link */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/ventures"
            className="inline-flex items-center justify-center bg-[var(--accent)] hover:opacity-90 active:scale-98 text-white px-7 py-3 rounded-lg text-sm font-medium transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            Explore ventures
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center text-[var(--ink)]/80 hover:text-[var(--ink)] hover:underline text-sm font-medium px-4 py-3 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            About the initiative
          </Link>
        </div>
      </div>
    </section>
  );
}
