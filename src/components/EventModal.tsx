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
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 max-h-[90vh] flex flex-col">
        {/* Header Image with Scrim */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-navy-950">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-900/80 text-white flex items-center justify-center hover:bg-navy-950 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tag & Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white text-navy-950 shadow-xs mb-2">
              {event.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-ink">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-cream-150 border border-cream-200 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-navy-850 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-navy-850/70 uppercase">Date</div>
                <div className="font-semibold text-ink">{event.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-navy-850 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-navy-850/70 uppercase">Venue</div>
                <div className="font-semibold text-ink line-clamp-1">{event.venue}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-navy-850 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-navy-850/70 uppercase">Scale</div>
                <div className="font-semibold text-ink">{event.attendees}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-2">
              Event Overview
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed font-normal">
              {event.fullDescription}
            </p>
          </div>

          {/* Prize pool / Grant */}
          {event.prizePool && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-navy-900">
              <Award className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold">Prize Pool & Grants: </span>
                <span className="font-semibold">{event.prizePool}</span>
              </div>
            </div>
          )}

          {/* Highlights */}
          {event.keyHighlights && (
            <div>
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-3">
                Key Highlights
              </h3>
              <div className="space-y-2">
                {event.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-cream-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-ink/70">
            {event.registrationOpen ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Registrations currently open for MITAOE students
              </span>
            ) : (
              <span className="text-navy-850/60 font-medium">
                Applications opening soon for upcoming cohort
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold text-ink/80 hover:bg-cream-100 transition-colors w-full sm:w-auto"
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
              className="px-6 py-2.5 rounded-xl bg-navy-850 hover:bg-navy-900 text-white text-xs font-bold transition-all shadow-sm inline-flex items-center justify-center gap-1.5 w-full sm:w-auto"
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
