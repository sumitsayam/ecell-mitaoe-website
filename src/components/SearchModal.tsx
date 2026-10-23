'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { allEvents, EventItem } from '@/data/events';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: EventItem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectEvent,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEvents = allEvents.filter(
    (ev) =>
      ev.title.toLowerCase().includes(query.toLowerCase()) ||
      ev.description.toLowerCase().includes(query.toLowerCase()) ||
      ev.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Palette Box */}
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-cream-300 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cream-200">
          <Search className="w-5 h-5 text-navy-850/60 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, workshops, initiatives, or tracks..."
            className="w-full bg-transparent text-sm md:text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-ink/50 hover:text-navy-850 hover:bg-cream-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <div className="text-[10px] font-bold text-navy-850/60 uppercase px-3 py-1.5 tracking-wider">
            Events & Workshops
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-6 text-center text-xs text-ink/60">
              No results found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  onSelectEvent(ev);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-cream-100/90 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center text-navy-850 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-navy-950 group-hover:text-navy-700">
                      {ev.title}
                    </div>
                    <div className="text-[11px] text-ink/60 line-clamp-1">
                      {ev.tagline}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-navy-850 uppercase">
                    {ev.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-navy-850/40 group-hover:text-navy-850 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2.5 bg-cream-50 border-t border-cream-200 flex items-center justify-between text-[11px] text-ink/50">
          <span>Press ESC or click anywhere outside to close</span>
          <span className="font-mono">E-CELL MITAOE</span>
        </div>
      </div>
    </div>
  );
}
