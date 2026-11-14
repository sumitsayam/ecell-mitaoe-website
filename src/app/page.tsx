import React from 'react';
import SpiralIntroStage from '@/components/intro/SpiralIntroStage';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LedgerSection from '@/components/sections/LedgerSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import EcosystemExplorer from '@/components/explorer/EcosystemExplorer';
import BackgroundCubesSection from '@/components/sections/BackgroundCubesSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import UpcomingEventsGrid from '@/components/UpcomingEventsGrid';
import InitiativesSection from '@/components/InitiativesSection';
import AboutSection from '@/components/AboutSection';
import TeamPreviewSection from '@/components/TeamPreviewSection';
import AchievementsSection from '@/components/AchievementsSection';
import StartupToolkit from '@/components/sections/StartupToolkit';
import StatsBar from '@/components/StatsBar';
import JoinCtaSection from '@/components/JoinCtaSection';
import FinalSpiralSection from '@/components/sections/FinalSpiralSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#102A56] flex flex-col relative selection:bg-[#155EEF] selection:text-white">
      {/* ── STAGES 01, 02, 03: The Concentric Spiral → Aperture Zoom → Title Screen ── */}
      {/* 100% Reversible, scrubbed GSAP ScrollTrigger timeline */}
      <SpiralIntroStage />

      {/* ── ARCHITECTURAL BREAKPOINT: 001 IDENTITY COVER → 002 ECOSYSTEM ── */}
      <div id="ecosystem-breakpoint" className="w-full bg-[#F7F9FF] border-y border-[#D9E5F5] py-4 sm:py-5 px-4 sm:px-8 select-none z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#64748B]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF] animate-pulse" />
            <span className="font-bold text-[#102A56]">BREAKPOINT // 001 → 002</span>
            <span className="text-[#CBD5E1]">/</span>
            <span>IDENTITY VERIFIED</span>
          </div>

          <div className="flex items-center gap-2 text-[#155EEF] font-bold">
            <span>ENTERING E-CELL MITAOE ECOSYSTEM</span>
            <span className="animate-bounce inline-block">↓</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[#94A3B8]">
            <span>VENTURES</span>
            <span>·</span>
            <span>PRE-SEED GRANTS</span>
            <span>·</span>
            <span>INITIATIVES</span>
            <span>·</span>
            <span>EVENTS</span>
          </div>
        </div>
      </div>

      {/* ── STAGE 04: Main Website (Continuous scroll transition) ── */}
      <div id="homepage-main" className="relative w-full bg-white">
        {/* Architectural Sticky Navigation Pill */}
        <Navbar />

        {/* Editorial Hero Stage */}
        <HeroSection />

        {/* Verified Metrics Strip */}
        <StatsBar />

        {/* The Entrepreneurship Ledger (Venture Timeline Compressor) */}
        <LedgerSection />

        {/* Ten Numbered Capabilities (001–010 Editorial Index) */}
        <FeaturesGrid />

        {/* Interactive E-Cell Ecosystem Explorer (Simulated File Tree) */}
        <EcosystemExplorer />

        {/* Interactive 3D WebGL Venture Wavefield (Aceternity UI) */}
        <BackgroundCubesSection />

        {/* Featured Signature Events Deck */}
        <FeaturedEvents />

        {/* Comprehensive Event Directory with Search and Status Filter */}
        <div id="all-events">
          <UpcomingEventsGrid />
        </div>

        {/* What is E-Cell / 4 Strategic Pillars */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Key Student Initiatives */}
        <InitiativesSection />

        {/* Meet the Team (Leadership, Faculty & Department Filters) */}
        <TeamPreviewSection />

        {/* Wall of Fame & Milestones Timeline */}
        <AchievementsSection />

        {/* Startup Toolkit (Free Founder Resources & Downloadable Templates) */}
        <StartupToolkit />

        {/* Final Recruitment Statement CTA */}
        <JoinCtaSection />

        {/* 11. The Final Spiral (Returning Visual Signature) */}
        <FinalSpiralSection />

        {/* Architectural Footer */}
        <Footer />
      </div>
    </main>
  );
}
