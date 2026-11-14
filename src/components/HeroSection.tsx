'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { signatureEvents, EventItem } from '@/data/events';
import { useModals } from '@/components/modals/ModalContext';

interface HeroSectionProps {
  onExploreEvents?: () => void;
  onDiscoverECell?: () => void;
  onSelectEvent?: (event: EventItem) => void;
}

export default function HeroSection({
  onExploreEvents,
  onDiscoverECell,
  onSelectEvent,
}: HeroSectionProps) {
  const modals = useModals();
  const handleSelectEvent = onSelectEvent || modals.openEvent;
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const featured = signatureEvents.slice(0, 3);
  const currentEvent = featured[activeDeckIndex] || featured[0];

  const handleNext = () => {
    setActiveDeckIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePrev = () => {
    setActiveDeckIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24 select-none bg-white">
      {/* Background Architectural Blueprint */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none -z-10" />

      {/* Decorative Radial Wash */}
      <div
        className="absolute -top-24 right-0 w-[500px] h-[500px] opacity-10 blur-3xl rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #155EEF 0%, #102A56 60%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Editorial Typography & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Overline Institutional Tag */}
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-[#155EEF] uppercase">
                MIT ACADEMY OF ENGINEERING // CIIE PUNE
              </span>
            </div>

            {/* Giant Headline: BUILD WHAT'S NEXT. */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[80px] font-extrabold tracking-tight leading-[0.94] text-[#102A56] mb-6 font-display">
              <span className="block drop-shadow-xs">BUILD</span>
              <div className="relative inline-flex items-baseline my-1">
                <span className="stroke-text font-black tracking-tight">
                  WHAT&apos;S
                </span>
                <span className="ml-3 sm:ml-4 text-[#155EEF] inline-block align-middle transform -translate-y-2 sm:-translate-y-3">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 fill-[#155EEF]" />
                </span>
              </div>
              <span className="block drop-shadow-xs text-[#155EEF]">NEXT.</span>
            </h1>

            {/* Subtitle Statement */}
            <p className="text-base sm:text-lg text-[#102A56] font-medium leading-relaxed mb-2 font-sans">
              Ideas don&apos;t build themselves.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] max-w-lg font-normal leading-relaxed mb-8 font-sans">
              The campus venture engine converting student curiosity into audited startups. ₹25L pre-seed grants, rapid prototyping makerspaces, 100% reimbursed patent filings, and direct access to Western India&apos;s sharpest builder cohort.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {onDiscoverECell ? (
                <button
                  onClick={onDiscoverECell}
                  type="button"
                  className="inline-flex items-center gap-2.5 bg-[#155EEF] hover:bg-[#103B83] active:scale-95 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all shadow-md group"
                >
                  <span>Explore E-Cell</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 bg-[#155EEF] hover:bg-[#103B83] active:scale-95 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all shadow-md group"
                >
                  <span>Explore E-Cell</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {onExploreEvents ? (
                <button
                  onClick={onExploreEvents}
                  type="button"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F8FF] active:scale-95 text-[#102A56] border border-[#D9E5F5] px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all shadow-2xs"
                >
                  <span>Discover Events</span>
                </button>
              ) : (
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F8FF] active:scale-95 text-[#102A56] border border-[#D9E5F5] px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all shadow-2xs"
                >
                  <span>Discover Events</span>
                </Link>
              )}
            </div>

            {/* Quick Metrics Ticker */}
            <div className="pt-6 border-t border-[#D9E5F5] grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-[#102A56]">28+</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">Events Held</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-[#102A56]">5,400+</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">Engaged</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-[#155EEF]">₹25L+</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">Seed Pool</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Opportunity Deck */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-white rounded-2xl border border-[#D9E5F5] shadow-elevated p-5 sm:p-7 overflow-hidden">
              {/* Header Label & Slide Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D9E5F5] mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#155EEF] animate-ping" />
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#102A56]">
                    FEATURED OPPORTUNITY // 0{activeDeckIndex + 1} OF 0{featured.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous opportunity"
                    className="w-7 h-7 rounded-full border border-[#D9E5F5] hover:border-[#155EEF] flex items-center justify-center text-[#102A56] hover:text-[#155EEF] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next opportunity"
                    className="w-7 h-7 rounded-full border border-[#D9E5F5] hover:border-[#155EEF] flex items-center justify-center text-[#102A56] hover:text-[#155EEF] transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Event Card Content */}
              <div className="space-y-4">
                <div className="relative h-52 sm:h-64 w-full rounded-xl overflow-hidden bg-[#F4F8FF] border border-[#D9E5F5]">
                  <Image
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-[#102A56] font-mono text-[10px] uppercase font-bold tracking-wider shadow-sm">
                      {currentEvent.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-[#155EEF] text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-sm">
                      REGISTRATION OPEN
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#102A56] leading-tight mb-2">
                    {currentEvent.title}
                  </h3>
                  <p className="text-[#64748B] text-xs sm:text-sm line-clamp-2 leading-relaxed font-sans">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                    <span className="truncate">{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                    <span className="truncate">{currentEvent.venue}</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectEvent(currentEvent)}
                    type="button"
                    className="w-full py-3 rounded-xl bg-[#F4F8FF] hover:bg-[#EAF2FF] border border-[#D9E5F5] text-[#155EEF] font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Schedule & Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
