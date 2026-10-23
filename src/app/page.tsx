'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturedEvents from '@/components/FeaturedEvents';
import UpcomingEventsGrid from '@/components/UpcomingEventsGrid';
import InitiativesSection from '@/components/InitiativesSection';
import AboutSection from '@/components/AboutSection';
import TeamPreviewSection from '@/components/TeamPreviewSection';
import AchievementsSection from '@/components/AchievementsSection';
import JoinCtaSection from '@/components/JoinCtaSection';
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
    <main className="min-h-screen bg-canvas flex flex-col relative selection:bg-primary selection:text-white">
      {/* A. Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* B. Hero Section */}
      <HeroSection
        onExploreEvents={() => scrollToSection('events')}
        onDiscoverECell={() => scrollToSection('about')}
      />

      {/* C. Impact Statistics (4 verified metrics) */}
      <StatsBar />

      {/* D. Featured Events (Brand Battle, Workshop, Showcase) */}
      <FeaturedEvents
        onSelectEvent={(event) => setSelectedEvent(event)}
        onViewAllEvents={() => scrollToSection('all-events')}
      />

      {/* E. Upcoming Events Grid with filters, search, and states */}
      <div id="all-events">
        <UpcomingEventsGrid />
      </div>

      {/* F. Initiatives */}
      <InitiativesSection onOpenJoin={() => setIsJoinOpen(true)} />

      {/* G. About E-Cell */}
      <AboutSection />

      {/* H. Team Preview */}
      <TeamPreviewSection />

      {/* I. Achievements & Archive Preview */}
      <AchievementsSection />

      {/* J. Recruitment CTA */}
      <JoinCtaSection onOpenJoin={() => setIsJoinOpen(true)} />

      {/* K. Footer */}
      <Footer />

      {/* Interactive Modals */}
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
