'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { allEvents, EventItem } from '@/data/events';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent?: (event: EventItem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectEvent,
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Search Palette Box */}
      <div className="relative z-10 w-full max-w-xl bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
          <Search className="w-5 h-5 text-[var(--color-muted)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, workshops, initiatives, or tracks..."
            className="w-full bg-transparent text-sm md:text-base font-medium text-[var(--ink)] placeholder:text-[var(--color-muted)] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <div className="text-[10px] font-mono font-bold text-[var(--color-muted)] uppercase px-3 py-1.5 tracking-wider">
            Events &amp; Workshops
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--color-muted)] font-mono">
              No results found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  if (onSelectEvent) {
                    onSelectEvent(ev);
                  } else {
                    router.push(`/events/${ev.slug}`);
                  }
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-surface-hover)] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors font-display">
                      {ev.title}
                    </div>
                    <div className="text-[11px] text-[var(--color-muted)] line-clamp-1 font-sans">
                      {ev.tagline}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--bg)] text-[var(--accent)] border border-[var(--color-border)] uppercase">
                    {ev.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2.5 bg-[var(--bg)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-muted)] font-mono">
          <span>Press ESC or click outside to close</span>
          <span>E-CELL MIT AOE</span>
        </div>
      </div>
    </div>
  );
}
