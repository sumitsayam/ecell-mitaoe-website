'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Calendar, MapPin, ArrowRight, Award, AlertCircle } from 'lucide-react';
import { allEvents, EventItem } from '@/data/events';
import SectionHeader from '@/components/common/SectionHeader';

export default function EventsDirectoryPage() {
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
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-borderToken bg-surface-pale/40">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                CAMPUS EVENTS DIRECTORY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Explore Our Signature Stages & Conclaves.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              Find upcoming pitch battles, technical bootcamps, and historical conclave reports organized by E-Cell MITAOE.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Strip */}
      <section className="py-6 border-b border-borderToken bg-white sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-pale rounded-xl border border-borderToken self-start">
              {(['all', 'upcoming', 'ongoing', 'past'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  type="button"
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-2xs'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
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
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-20 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-card border border-borderToken p-8">
              <AlertCircle className="w-12 h-12 text-muted mx-auto mb-3" />
              <h2 className="text-xl font-bold text-primary-deep mb-2">No matching events found</h2>
              <p className="text-xs text-muted max-w-md mx-auto mb-6">
                We could not find any events matching your selected criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-deep transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-card border border-borderToken shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
                >
                  <Link href={`/events/${event.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-primary-deep">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-primary-deep shadow-2xs">
                        {event.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
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
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted mb-2">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{event.date}</span>
                      </div>

                      <h2 className="text-lg font-bold text-primary-deep group-hover:text-primary transition-colors leading-snug">
                        <Link href={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-body/80 mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      {event.prizePool && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                          <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{event.prizePool}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-borderToken flex items-center justify-between text-xs">
                      <span className="text-muted flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="line-clamp-1 max-w-[170px]">{event.venue}</span>
                      </span>

                      <Link
                        href={`/events/${event.slug}`}
                        className="font-bold text-primary hover:text-primary-deep flex items-center gap-1"
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

      <Footer />
    </main>
  );
}
