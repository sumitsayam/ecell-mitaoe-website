'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { signatureEvents, EventItem } from '@/data/events';

interface FeaturedEventsProps {
  onSelectEvent: (event: EventItem) => void;
  onViewAllEvents?: () => void;
}

export default function FeaturedEvents({
  onSelectEvent,
  onViewAllEvents,
}: FeaturedEventsProps) {
  return (
    <section id="events" className="py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 md:mb-9 gap-4">
          <div>
            {/* Overline with Horizontal Rule */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] font-bold tracking-[0.22em] text-navy-850/90 uppercase">
                FEATURED EVENTS
              </span>
              <span className="w-16 sm:w-20 h-[2px] bg-navy-850" />
            </div>

            {/* Section Title: Our Signature Events */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 font-display tracking-tight">
              Our Signature{' '}
              <span className="font-serif italic font-normal text-navy-850">
                Events
              </span>
            </h2>
          </div>

          {/* View All Events Link */}
          <button
            onClick={onViewAllEvents}
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-850 hover:text-navy-700 tracking-wide group self-start sm:self-auto py-1 border-b border-navy-850/30 hover:border-navy-850 transition-colors"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {signatureEvents.map((event) => (
            <div
              key={event.id}
              role="button"
              tabIndex={0}
              aria-label={`${event.title}: ${event.description}`}
              onClick={() => onSelectEvent(event)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectEvent(event);
                }
              }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-soft-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1.5 bg-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-850 focus:ring-offset-2"
            >
              {/* High-Resolution Canva Card Asset */}
              <div className="relative w-full aspect-[470/155]">
                <Image
                  src={event.image}
                  alt={`${event.title} - ${event.description}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Subtle Interactive Hover Glow & Border Accent */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-navy-850/30 rounded-2xl transition-colors pointer-events-none" />

              {/* Interactive subtle click indicator on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                View Details
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
