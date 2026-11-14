'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, MapPin, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { EventItem } from '@/data/events';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterInterest?: (event: EventItem) => void;
}

export default function EventModal({
  event,
  onClose,
  onRegisterInterest,
}: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] max-h-[90vh] flex flex-col">
        {/* Header Image with Scrim */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-[var(--bg)]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tag & Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[var(--color-surface)] text-[var(--accent)] border border-[var(--color-border)] shadow-xs mb-2">
              {event.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] font-display">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[var(--ink)]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="text-[10px] font-mono font-bold text-[var(--color-muted)] uppercase">Date</div>
                <div className="font-semibold text-[var(--ink)]">{event.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="text-[10px] font-mono font-bold text-[var(--color-muted)] uppercase">Venue</div>
                <div className="font-semibold text-[var(--ink)] line-clamp-1">{event.venue}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="text-[10px] font-mono font-bold text-[var(--color-muted)] uppercase">Scale</div>
                <div className="font-semibold text-[var(--ink)]">{event.attendees}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--accent)]">
              Event Overview
            </h3>
            <p className="text-sm text-[var(--ink)]/80 leading-relaxed font-normal font-sans">
              {event.fullDescription}
            </p>
          </div>

          {/* Prize pool / Grant */}
          {event.prizePool && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs sm:text-sm font-mono">
                <span className="font-bold">Prize Pool &amp; Grants: </span>
                <span className="font-semibold">{event.prizePool}</span>
              </div>
            </div>
          )}

          {/* Highlights */}
          {event.keyHighlights && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 text-[var(--accent)]">
                Key Highlights
              </h3>
              <div className="space-y-2">
                {event.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink)]/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-sans">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[var(--color-muted)] font-mono">
            {event.registrationOpen ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Registrations currently open for MITAOE students
              </span>
            ) : (
              <span>Applications opening soon for upcoming cohort</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-full border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--ink)]/80 hover:bg-[var(--bg)] transition-colors w-full sm:w-auto cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRegisterInterest?.(event);
                alert(`Thank you for your interest in ${event.title}! Registration portal opening for MITAOE students.`);
                onClose();
              }}
              type="button"
              className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-sm inline-flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
            >
              <span>{event.registrationOpen ? 'Register Now' : 'Join Waitlist'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
