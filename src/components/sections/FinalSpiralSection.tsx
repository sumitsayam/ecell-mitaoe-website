'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
 *  FinalSpiralSection (Section 11) — The Returning Spiral
 *
 *  Specifications:
 *  • Dark navy surface: #0B1020
 *  • Circular typography visual returning: BUILD · CREATE · CONNECT · INNOVATE · MITAOE E-CELL
 *  • Rings rotating in controlled alternating directions
 *  • Centre statement: "READY TO BUILD?"
 *  • CTA: "JOIN THE COMMUNITY"
 *  • Seamlessly flows into the architectural footer
 * ────────────────────────────────────────────────────────────────────── */

interface FinalSpiralSectionProps {
  onOpenJoin?: () => void;
}

export default function FinalSpiralSection({ onOpenJoin }: FinalSpiralSectionProps) {
  const rings = [
    { text: 'BUILD · CREATE · CONNECT · INNOVATE · MITAOE E-CELL · ', radius: 240, speed: 'animate-spin-slow', size: 'text-[10px]' },
    { text: 'ENTREPRENEURSHIP CELL · ALANDI PUNE · CIIE MITAOE · ', radius: 180, speed: 'animate-spin-reverse-slow', size: 'text-[11px]' },
    { text: 'IDEAS ARE ONLY THE BEGINNING · VENTURE ECOSYSTEM · ', radius: 120, speed: 'animate-spin-slow', size: 'text-[12px]' },
  ];

  return (
    <section className="relative py-24 sm:py-36 bg-[#0B1020] text-[#F5F8FF] overflow-hidden select-none border-t border-[#121C32]">
      {/* Background blueprint dot grid */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-30 pointer-events-none" />

      {/* Radial soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #155EEF 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#155EEF] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>011 // THE CONTINUOUS CYCLE</span>
        </div>

        {/* Concentric Rotating Text Ring System */}
        <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] flex items-center justify-center my-6">
          {/* Ring 1 (Outermost) */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <path
                id="finalSpiralPath1"
                fill="none"
                d="M 250, 250 m -230, 0 a 230,230 0 1,1 460,0 a 230,230 0 1,1 -460,0"
              />
              <text className="fill-white/40 font-mono text-[10px] uppercase tracking-[0.24em]">
                <textPath href="#finalSpiralPath1">
                  BUILD · CREATE · CONNECT · INNOVATE · MITAOE E-CELL · BUILD · CREATE · CONNECT · INNOVATE · 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Ring 2 (Middle) */}
          <div className="absolute inset-8 sm:inset-12 flex items-center justify-center animate-spin-reverse-slow pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <path
                id="finalSpiralPath2"
                fill="none"
                d="M 200, 200 m -170, 0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
              />
              <text className="fill-[#155EEF]/70 font-mono text-[11px] uppercase tracking-[0.22em] font-medium">
                <textPath href="#finalSpiralPath2">
                  ENTREPRENEURSHIP CELL · ALANDI PUNE · CIIE MITAOE · ENTREPRENEURSHIP CELL · 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Ring 3 (Inner) */}
          <div className="absolute inset-16 sm:inset-24 flex items-center justify-center animate-spin-slow pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 300 300">
              <path
                id="finalSpiralPath3"
                fill="none"
                d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
              />
              <text className="fill-white/80 font-mono text-[11px] uppercase tracking-[0.18em] font-bold">
                <textPath href="#finalSpiralPath3">
                  IDEAS ARE ONLY THE BEGINNING · VENTURE PLATFORM · 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center Core Disc */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 bg-[#121C32]/90 border border-white/10 rounded-full w-44 h-44 sm:w-56 sm:h-56 shadow-2xl backdrop-blur-md">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#155EEF] font-semibold mb-1">
              THE NEXT STEP
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight leading-tight mb-3">
              READY TO <br />
              <span className="text-[#155EEF]">BUILD?</span>
            </h3>

            {onOpenJoin ? (
              <button
                onClick={onOpenJoin}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#155EEF] hover:bg-[#0B347C] text-white font-mono text-[10.5px] uppercase tracking-wider font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Join Community</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <Link
                href="/join"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#155EEF] hover:bg-[#0B347C] text-white font-mono text-[10.5px] uppercase tracking-wider font-semibold transition-all shadow-md"
              >
                <span>Join Community</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Coordinates Strip */}
        <div className="mt-8 font-mono text-xs uppercase tracking-widest text-white/40 flex items-center gap-4">
          <span>ALANDI // PUNE</span>
          <span>•</span>
          <span>EST. 2018</span>
          <span>•</span>
          <span>CIIE MITAOE</span>
        </div>
      </div>
    </section>
  );
}

