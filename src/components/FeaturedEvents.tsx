'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { signatureEvents, EventItem } from '@/data/events';
import SectionHeader from '@/components/common/SectionHeader';

interface FeaturedEventsProps {
  onSelectEvent?: (event: EventItem) => void;
  onViewAllEvents?: () => void;
}

export default function FeaturedEvents({
  onSelectEvent,
  onViewAllEvents,
}: FeaturedEventsProps) {
  return (
    <section id="events" className="py-10 md:py-16 scroll-mt-20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          overline="FEATURED EVENTS"
          title="Our Signature"
          italicWord="Events"
          description="High-impact competitions, masterclasses, and annual startup showcases organized by MITAOE E-Cell."
          actionText="View All Events"
          actionHref="/events"
          onActionClick={onViewAllEvents}
        />

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {signatureEvents.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-card overflow-hidden shadow-soft-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1.5 bg-primary-deep flex flex-col justify-between"
            >
              {/* Event Image */}
              <Link href={`/events/${event.slug}`} className="relative w-full aspect-[470/160] block overflow-hidden">
                <Image
                  src={event.image}
                  alt={`${event.title} - ${event.description}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              {/* Card Bottom Meta & Actions */}
              <div className="p-4 sm:p-5 bg-white border-t border-borderToken flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-surface-pale text-primary border border-borderToken">
                      {event.category}
                    </span>
                    <span className="text-[11px] font-semibold text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-deep group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/events/${event.slug}`}>
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-body/80 mt-1.5 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-borderToken/60 flex items-center justify-between">
                  {onSelectEvent ? (
                    <button
                      onClick={() => onSelectEvent(event)}
                      type="button"
                      className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1.5"
                    >
                      <span>Quick Preview</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1.5"
                    >
                      <span>Event Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}

                  <Link
                    href={`/events/${event.slug}`}
                    className="w-8 h-8 rounded-full bg-surface-pale group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-colors shadow-2xs"
                    title={`View ${event.title}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
