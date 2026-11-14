'use client';

import React from 'react';
import { BackgroundCubesGrid } from '@/components/ui/background-cubes-grid';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function BackgroundCubesSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-[#07090E] text-white border-y border-[#1E293B]">
      {/* Interactive 3D Cubes Wavefield */}
      <BackgroundCubesGrid
        variant="perspective"
        className="opacity-65"
        baseColor="#0F172A"
        waveColor="#155EEF"
        backgroundColor="#07090E"
        gridSize={38}
        gap={0.09}
        amplitude={0.65}
        glow={1.1}
        tilt={0.65}
      />

      {/* Floating Foreground Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[11px] uppercase tracking-widest text-[#E7F0FF] mb-6">
          <Terminal className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>INTERACTIVE VENTURE FIELD // MOVE CURSOR TO RIPLE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight text-white mb-6 max-w-3xl mx-auto">
          Built for student engineers <br />
          <span className="text-[#155EEF] italic font-serif">who prototype the future.</span>
        </h2>

        <p className="text-sm sm:text-base font-sans text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          The wave above responds to your pointer in real-time WebGL. MITAOE E-Cell pairs cutting-edge technical builders with industrial mentors, lab funding, and western region institutional grants.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#103B83] text-white px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Launch Your Idea</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all backdrop-blur-sm"
          >
            <span>Browse Founder Toolkit</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

