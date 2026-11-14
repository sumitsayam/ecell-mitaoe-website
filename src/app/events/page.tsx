'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, MapPin, ArrowRight, Award, AlertCircle } from 'lucide-react';
import { allEvents } from '@/data/events';

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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                CAMPUS EVENTS DIRECTORY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Explore Our Signature Stages &amp; Conclaves.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              Find upcoming pitch battles, technical bootcamps, and historical conclave reports organized by E-Cell MIT AOE.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Strip */}
      <section className="py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Status Tabs — Signature Club Capsule Toggles */}
            <div className="flex items-center gap-1 p-1.5 bg-[#121620] border border-white/10 rounded-full self-start shadow-xs">
              {(['all', 'upcoming', 'ongoing', 'past'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-[#FFB52E] text-[#0A0D14] font-extrabold shadow-sm'
                      : 'text-[#C6CAD0] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 p-1.5 bg-[#121620] border border-white/10 rounded-full overflow-x-auto pb-1.5 sm:pb-1.5 shadow-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#FFB52E] text-[#0A0D14] font-extrabold shadow-sm'
                        : 'text-[#C6CAD0] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs font-mono rounded-full border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-20 bg-[var(--bg)] flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8">
              <AlertCircle className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-3" />
              <h2 className="text-xl font-bold font-display text-[var(--ink)] mb-2">No matching events found</h2>
              <p className="text-xs text-[var(--color-muted)] max-w-md mx-auto mb-6">
                We could not find any events matching your selected criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[var(--accent)] text-white text-xs font-mono uppercase font-bold rounded-full hover:opacity-90 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
                >
                  <Link href={`/events/${event.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg)]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[var(--color-surface)]/95 text-[var(--ink)] shadow-2xs border border-[var(--color-border)]">
                        {event.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                          event.status === 'upcoming'
                            ? 'bg-emerald-600 text-white'
                            : event.status === 'ongoing'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--color-muted)] mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>{event.date}</span>
                      </div>

                      <h2 className="text-lg font-bold font-display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                        <Link href={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-[var(--ink)]/75 mt-2 line-clamp-2 leading-relaxed font-sans">
                        {event.description}
                      </p>

                      {event.prizePool && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{event.prizePool}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--color-muted)] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span className="line-clamp-1 max-w-[170px]">{event.venue}</span>
                      </span>

                      <Link
                        href={`/events/${event.slug}`}
                        className="font-bold text-[var(--accent)] hover:underline flex items-center gap-1 font-mono text-xs uppercase"
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
    </main>
  );
}
