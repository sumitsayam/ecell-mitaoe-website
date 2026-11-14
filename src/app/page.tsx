'use client';

import React, { useState } from 'react';
import SpiralIntroStage from '@/components/intro/SpiralIntroStage';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LedgerSection from '@/components/sections/LedgerSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import EcosystemExplorer from '@/components/explorer/EcosystemExplorer';
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
import EventModal from '@/components/EventModal';
import JoinModal from '@/components/JoinModal';
import SearchModal from '@/components/SearchModal';
import { EventItem } from '@/data/events';

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#102A56] flex flex-col relative selection:bg-[#155EEF] selection:text-white">
      {/* ── STAGES 01, 02, 03: The Concentric Spiral → Aperture Zoom → Title Screen ── */}
      <SpiralIntroStage onEnterHome={() => scrollToSection('homepage-main')} />

      {/* ── STAGE 04: Main Website (Continuous scroll transition) ── */}
      <div id="homepage-main" className="relative w-full bg-white">
        {/* Architectural Sticky Navigation Pill */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenJoin={() => setIsJoinOpen(true)}
        />

        {/* Editorial Hero Stage */}
        <HeroSection
          onExploreEvents={() => scrollToSection('all-events')}
          onDiscoverECell={() => scrollToSection('about')}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

        {/* Verified Metrics Strip */}
        <StatsBar />

        {/* The Entrepreneurship Ledger (Venture Timeline Compressor) */}
        <LedgerSection />

        {/* Ten Numbered Capabilities (001–010 Editorial Index) */}
        <FeaturesGrid />

        {/* Interactive E-Cell Ecosystem Explorer (Simulated File Tree) */}
        <EcosystemExplorer />

        {/* Featured Signature Events Deck */}
        <FeaturedEvents
          onSelectEvent={(event) => setSelectedEvent(event)}
          onViewAllEvents={() => scrollToSection('all-events')}
        />

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
        <JoinCtaSection onOpenJoin={() => setIsJoinOpen(true)} />

        {/* 11. The Final Spiral (Returning Visual Signature) */}
        <FinalSpiralSection onOpenJoin={() => setIsJoinOpen(true)} />

        {/* Architectural Footer */}
        <Footer />
      </div>

      {/* Global Modals & Dialogs */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
    </main>
  );
}
