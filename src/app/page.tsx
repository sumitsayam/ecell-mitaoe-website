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
