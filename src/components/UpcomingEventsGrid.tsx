'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, MapPin, ArrowRight, Filter, AlertCircle } from 'lucide-react';
import { allEvents, EventItem } from '@/data/events';
import SectionHeader from '@/components/common/SectionHeader';

export default function UpcomingEventsGrid() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'ongoing' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'COMPETITION', 'WORKSHOP', 'CONCLAVE', 'INITIATIVE'];

  const filteredEvents = useMemo(() => {
    return allEvents.filter((ev) => {
      const matchesStatus =
        selectedStatus === 'all' || ev.status === selectedStatus;
      const matchesCategory =
        selectedCategory === 'ALL' || ev.category === selectedCategory;
      const matchesSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [selectedStatus, selectedCategory, searchQuery]);

  return (
    <section className="py-12 md:py-20 border-t border-borderToken/70 bg-surface-pale/40">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          overline="EXPLORE DIRECTORY"
          title="All Campus"
          italicWord="Initiatives & Events"
          description="Filter through upcoming sprints, live competitions, and historical entrepreneurship gatherings."
          actionText="View Complete Archive"
          actionHref="/events"
        />

        {/* Filter and Search Bar Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-borderToken shadow-soft-card mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-pale rounded-xl border border-borderToken">
              {(['all', 'upcoming', 'ongoing', 'past'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-2xs'
                      : 'text-body/75 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Category Dropdown/Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary-deep text-white'
                        : 'bg-canvas text-body hover:bg-surface-pale border border-borderToken'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Grid or Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-borderToken p-8 shadow-2xs">
            <AlertCircle className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="text-lg font-bold text-primary-deep mb-1">
              No events found matching your criteria
            </h3>
            <p className="text-xs text-muted max-w-md mx-auto mb-5 leading-relaxed">
              Try adjusting your category filter, changing the status tab, or clearing your search query.
            </p>
            <button
              onClick={() => {
                setSelectedStatus('all');
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-deep transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-card border border-borderToken shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group"
              >
                {/* Event Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-deep">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-primary-deep shadow-2xs">
                      {event.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        event.status === 'upcoming'
                          ? 'bg-emerald-600 text-white'
                          : event.status === 'ongoing'
                          ? 'bg-amber-600 text-white'
                          : 'bg-navy-900/80 text-cream-100'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted mb-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-primary-deep group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-body/80 mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-borderToken/70 flex items-center justify-between text-xs">
                    <span className="text-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="line-clamp-1 max-w-[170px]">{event.venue}</span>
                    </span>

                    <Link
                      href={`/events/${event.slug}`}
                      className="font-bold text-primary hover:text-primary-deep flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
