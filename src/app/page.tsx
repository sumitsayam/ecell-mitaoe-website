'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturedEvents from '@/components/FeaturedEvents';
import AboutSection from '@/components/AboutSection';
import InitiativesSection from '@/components/InitiativesSection';
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
    <main className="min-h-screen bg-cream-100 flex flex-col relative selection:bg-navy-850 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Hero Section matching Canva reference */}
      <HeroSection
        onExploreEvents={() => scrollToSection('events')}
        onDiscoverECell={() => scrollToSection('about')}
      />

      {/* Verified / Reference Stats Bar */}
      <StatsBar />

      {/* Signature Featured Events */}
      <FeaturedEvents
        onSelectEvent={(event) => setSelectedEvent(event)}
        onViewAllEvents={() => scrollToSection('events')}
      />

      {/* About & Mission Section */}
      <AboutSection />

      {/* Initiatives & Programs */}
      <InitiativesSection onOpenJoin={() => setIsJoinOpen(true)} />

      {/* High-impact Join CTA */}
      <JoinCtaSection onOpenJoin={() => setIsJoinOpen(true)} />

      {/* Comprehensive Footer */}
      <Footer />

      {/* Modals */}
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
