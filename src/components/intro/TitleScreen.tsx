'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  TitleScreen (Stage 03) — Full-Page Architectural Identity Cover Plate
 *
 *  Design specifications:
 *  • Spans 100% full-screen edge-to-edge across the entire page
 *  • Architectural blueprint grid (36px major, 9px minor) across full viewport
 *  • Precise corner tick-marks (+) at viewport boundaries
 *  • Full-width top metadata strip (PLATE 001 // IDENTITY)
 *  • Colossal Sora display typography: "MITAOE" / "E-CELL"
 *  • Full-width bottom technical coordinates: ALANDI, PUNE // 18.6756° N, 73.8906° E
 *  • Architectural breakpoint cue leading directly into E-Cell MITAOE ecosystem
 * ────────────────────────────────────────────────────────────────────── */

interface TitleScreenProps {
  onScrollCueClick?: () => void;
  className?: string;
}

export default function TitleScreen({ onScrollCueClick, className = '' }: TitleScreenProps) {
  return (
    <section
      id="title-screen"
      className={`relative w-full h-full min-h-screen flex flex-col justify-between bg-white text-[#102A56] overflow-hidden select-none p-6 sm:p-10 lg:p-14 ${className}`}
    >
      {/* ── Layer 1: Blueprint architectural grid running full-bleed ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(21, 94, 239, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(21, 94, 239, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Layer 2: Subtle secondary fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(21, 94, 239, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(21, 94, 239, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '9px 9px',
        }}
      />

      {/* ── Layer 3: Precise corner tick-marks in the actual viewport corners ── */}
      <span className="absolute top-4 sm:top-6 left-4 sm:left-6 font-mono text-sm sm:text-base text-[#155EEF]/60 select-none font-bold">
        +
      </span>
      <span className="absolute top-4 sm:top-6 right-4 sm:right-6 font-mono text-sm sm:text-base text-[#155EEF]/60 select-none font-bold">
        +
      </span>
      <span className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-mono text-sm sm:text-base text-[#155EEF]/60 select-none font-bold">
        +
      </span>
      <span className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 font-mono text-sm sm:text-base text-[#155EEF]/60 select-none font-bold">
        +
      </span>

      {/* ── Layer 4: Top Metadata Strip (Spanning full width) ── */}
      <header className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#64748B]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF] animate-pulse inline-block" />
          <span className="font-bold text-[#102A56] tracking-wider">PLATE 001 // IDENTITY</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span>EST. 2018</span>
          <span className="text-[#CBD5E1]">·</span>
          <span>CIIE MITAOE</span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-[#155EEF] font-semibold">PUNE, IN</span>
        </div>

        <div className="flex items-center gap-2 text-right">
          <span className="text-[#155EEF] font-semibold">ALANDI CAMPUS</span>
          <span className="hidden md:inline text-[#94A3B8]">· 18.6756° N</span>
        </div>
      </header>

      {/* ── Layer 5: Massive Central Display Typography (Edge-to-Edge Hero) ── */}
      <main className="relative z-10 my-auto w-full text-center flex flex-col items-center justify-center py-8 sm:py-14">
        <h1 className="font-display font-extrabold text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] tracking-tighter text-[#102A56] leading-[0.84] select-none">
          <span className="block transform transition-transform duration-500 hover:scale-[1.01]">
            MITAOE
          </span>
          <span className="block text-[#155EEF] transform transition-transform duration-500 hover:scale-[1.01]">
            E-CELL
          </span>
        </h1>

        {/* Editorial rule and tagline */}
        <div className="mt-6 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-base font-mono uppercase tracking-[0.25em] text-[#64748B]">
          <span className="h-px w-10 sm:w-24 bg-[#DCE5F2]" />
          <span className="text-[#102A56] font-semibold">Ideas are only the beginning.</span>
          <span className="h-px w-10 sm:w-24 bg-[#DCE5F2]" />
        </div>
      </main>

      {/* ── Layer 6: Bottom Technical Registration & Interactive Cue ── */}
      <footer className="relative z-10 w-full flex flex-col gap-4">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider pt-3 border-t border-[#D9E5F5]/80">
          <div className="flex items-center gap-2">
            <span className="text-[#102A56] font-semibold">SECTION // 001</span>
            <span>·</span>
            <span>COVER PLATE</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#64748B]">
            <span>ENTREPRENEURSHIP CELL</span>
            <span>·</span>
            <span>ARCHITECTURAL EDITION</span>
          </div>

          <div className="flex items-center gap-2">
            <span>LON 73.8906° E</span>
          </div>
        </div>

        {/* Interactive Cue to Dive into Ecosystem */}
        <div className="flex justify-center w-full pt-1">
          <button
            onClick={onScrollCueClick}
            type="button"
            className="group inline-flex items-center gap-2.5 cursor-pointer font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#64748B] hover:text-[#155EEF] transition-all py-1.5 px-4 rounded-full border border-[#D9E5F5] hover:border-[#155EEF] bg-white/80 backdrop-blur-xs active:scale-95 shadow-xs"
          >
            <span>Scroll to explore ecosystem</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#155EEF] animate-bounce" />
          </button>
        </div>
      </footer>
    </section>
  );
}
