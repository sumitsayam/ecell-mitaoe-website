'use client';

import React from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  TitleScreen (Stage 03) — Minimal, Architectural "MITAOE E-CELL"
 *
 *  Design specifications:
 *  • Nearly empty full-screen composition
 *  • Large confident Sora display typography: "MITAOE" / "E-CELL"
 *  • Layered paper-cutout physical sheets with subtle offset & soft shadows
 *  • Technical blue blueprint grid + subtle corner tick-marks
 *  • Monospace coordinates: ALANDI, PUNE // 18.6756° N, 73.8906° E
 *  • No cards, no CTA buttons, no navigation
 * ────────────────────────────────────────────────────────────────────── */

interface TitleScreenProps {
  onScrollCueClick?: () => void;
  className?: string;
}

export default function TitleScreen({ onScrollCueClick, className = '' }: TitleScreenProps) {
  return (
    <section
      id="title-screen"
      className={`relative w-full min-h-screen flex flex-col justify-between items-center bg-[#FFFFFF] text-[#102A56] overflow-hidden select-none p-6 sm:p-12 ${className}`}
    >
      {/* ── Layer 1: Blueprint architectural grid ── */}
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

      {/* ── Layer 3: Paper Cutout Planes (Stacked architectural sheets) ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Deep paper sheet (offset -1.8deg) */}
        <div
          className="absolute w-[92vw] max-w-5xl h-[70vh] rounded-2xl bg-[#F4F8FF] border border-[#D9E5F5]/70"
          style={{
            transform: 'rotate(-1.6deg)',
            boxShadow: '0 30px 60px -15px rgba(21, 94, 239, 0.06)',
          }}
        />

        {/* Mid paper sheet (offset +1.2deg) */}
        <div
          className="absolute w-[90vw] max-w-5xl h-[68vh] rounded-2xl bg-[#FFFFFF] border border-[#D9E5F5]"
          style={{
            transform: 'rotate(1.2deg)',
            boxShadow: '0 20px 45px -10px rgba(16, 42, 86, 0.06)',
          }}
        />

        {/* Foreground paper sheet (center, pure crisp plane) */}
        <div
          className="relative w-[88vw] max-w-5xl h-[66vh] rounded-2xl bg-[#FFFFFF] border border-[#D9E5F5] flex flex-col justify-between p-8 sm:p-14"
          style={{
            boxShadow: '0 25px 50px -12px rgba(21, 94, 239, 0.08), 0 0 0 1px rgba(21, 94, 239, 0.04)',
          }}
        >
          {/* Paper sheet corner markings */}
          <span className="absolute top-3 left-3 font-mono text-[10px] text-[#155EEF]/50 select-none">+</span>
          <span className="absolute top-3 right-3 font-mono text-[10px] text-[#155EEF]/50 select-none">+</span>
          <span className="absolute bottom-3 left-3 font-mono text-[10px] text-[#155EEF]/50 select-none">+</span>
          <span className="absolute bottom-3 right-3 font-mono text-[10px] text-[#155EEF]/50 select-none">+</span>

          {/* Top metadata strip */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#155EEF] inline-block" />
              <span className="font-semibold text-[#102A56]">PLATE 001 // IDENTITY</span>
            </div>
            <div className="hidden sm:block">
              <span>EST. 2018 · CIIE MITAOE</span>
            </div>
            <div>
              <span className="text-[#155EEF]">PUNE, IN</span>
            </div>
          </div>

          {/* Massive central display typography */}
          <div className="my-auto text-center flex flex-col items-center justify-center py-6 sm:py-10">
            <h1 className="font-display font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tighter text-[#102A56] leading-[0.88] select-none">
              <span className="block transform transition-transform hover:scale-[1.01] duration-500">MITAOE</span>
              <span className="block text-[#155EEF] transform transition-transform hover:scale-[1.01] duration-500">
                E-CELL
              </span>
            </h1>

            {/* Subtle editorial rule and tagline */}
            <div className="mt-6 sm:mt-8 flex items-center gap-4 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#6B7890]">
              <span className="h-px w-8 sm:w-16 bg-[#DCE5F2]" />
              <span className="text-[#101B32] font-semibold">Ideas are only the beginning.</span>
              <span className="h-px w-8 sm:w-16 bg-[#DCE5F2]" />
            </div>
          </div>

          {/* Bottom coordinates and technical registration */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider">
            <span>LAT 18.6756° N</span>
            <span className="hidden md:inline text-[#64748B]">ENTREPRENEURSHIP CELL · ARCHITECTURAL EDITION</span>
            <span>LON 73.8906° E</span>
          </div>
        </div>
      </div>

      {/* ── Layer 4: Interactive scroll-cue at very bottom ── */}
      <div className="relative z-20 pb-2">
        <button
          onClick={onScrollCueClick}
          type="button"
          className="group flex flex-col items-center gap-2 cursor-pointer font-mono text-[11px] uppercase tracking-widest text-[#64748B] hover:text-[#155EEF] transition-colors"
        >
          <span>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-[#D9E5F5] group-hover:border-[#155EEF] flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-[#155EEF] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}

