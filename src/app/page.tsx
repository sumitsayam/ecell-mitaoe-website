import React from 'react';
import SpiralIntroStage from '@/components/intro/SpiralIntroStage';
import { TopHeader } from '@/components/layout/TopHeader';
import StatsBar from '@/components/StatsBar';
import AboutSection from '@/components/AboutSection';
import InitiativesSection from '@/components/InitiativesSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import TeamPreviewSection from '@/components/TeamPreviewSection';
import StartupToolkit from '@/components/sections/StartupToolkit';
import JoinCtaSection from '@/components/JoinCtaSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col relative selection:bg-[var(--accent)] selection:text-white">
      {/* ── Fixed Header at Very Top: Wordmark "E-Cell MIT AOE" & Light/Dark Toggle ── */}
      <TopHeader />

      {/* ── STAGES 01, 02, 03: The Concentric Spiral → Aperture Zoom → Title Screen ── */}
      <SpiralIntroStage />

      {/* ── STAGE 04: Main Website (Continuous scroll transition) ── */}
      <div id="homepage-main" className="relative w-full bg-[var(--bg)] text-[var(--ink)]">
        {/* Verified Impact Metrics Strip */}
        <StatsBar />

        {/* Institutional Mission & Strategic Pillars */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Core Student Founder Programs */}
        <div id="initiatives">
          <InitiativesSection />
        </div>

        {/* Featured Signature Events */}
        <div id="events">
          <FeaturedEvents />
        </div>

        {/* Leadership & Advisory Board */}
        <div id="team">
          <TeamPreviewSection />
        </div>

        {/* Free Founder Resources & Downloadable Templates */}
        <StartupToolkit />

        {/* Founder Recruitment / Cohort Application */}
        <JoinCtaSection />

        {/* Institutional Footer */}
        <Footer />
      </div>
    </main>
  );
}
