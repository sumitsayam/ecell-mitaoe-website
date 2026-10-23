'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Share2,
  Sparkles,
  UserCheck,
  Send
} from 'lucide-react';
import { getEventBySlug, allEvents } from '@/data/events';
import confetti from 'canvas-confetti';

interface EventPageProps {
  params: { slug: string };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [collegePRN, setCollegePRN] = useState('');

  if (!event) {
    return notFound();
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#092957', '#244B7A', '#10B981', '#F59E0B']
      });
    } catch (err) {}
  };

  const relatedEvents = allEvents
    .filter((e) => e.slug !== event.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-borderToken bg-surface-pale/50 py-3">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/events" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span>/</span>
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-none">
              {event.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Event Cover */}
      <section className="bg-primary-deep text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover blur-sm"
          />
        </div>

        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white text-primary-deep shadow-2xs">
                {event.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                  event.status === 'upcoming'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                {event.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-tight mb-4 text-canvas">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal mb-8">
              {event.tagline}
            </p>

            {/* Quick Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-blue-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase">Date</div>
                  <div className="font-semibold">{event.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase">Venue</div>
                  <div className="font-semibold line-clamp-1">{event.venue}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase">Scale</div>
                  <div className="font-semibold">{event.attendees}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-blue-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase">Prizes</div>
                  <div className="font-semibold line-clamp-1">{event.prizePool || 'Certificate'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Sidebar */}
      <section className="py-12 md:py-16 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Details, Highlights, Schedule, Speakers */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-card border border-borderToken shadow-soft-card">
                <h2 className="text-xl font-bold text-primary-deep font-display mb-4">
                  Event Overview
                </h2>
                <p className="text-sm sm:text-base text-body leading-relaxed whitespace-pre-line">
                  {event.fullDescription}
                </p>

                {event.eligibility && (
                  <div className="mt-6 p-4 rounded-xl bg-surface-pale border border-borderToken text-xs sm:text-sm text-body">
                    <span className="font-bold text-primary-deep">Eligibility: </span>
                    <span>{event.eligibility}</span>
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              {event.keyHighlights && event.keyHighlights.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-card border border-borderToken shadow-soft-card">
                  <h2 className="text-xl font-bold text-primary-deep font-display mb-4">
                    Key Highlights & Opportunities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {event.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-canvas border border-borderToken/70 text-xs sm:text-sm text-body">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule / Timeline */}
              {event.schedule && event.schedule.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-card border border-borderToken shadow-soft-card">
                  <h2 className="text-xl font-bold text-primary-deep font-display mb-4">
                    Event Day Schedule
                  </h2>
                  <div className="divide-y divide-borderToken">
                    {event.schedule.map((item, i) => (
                      <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-primary bg-surface-pale px-2.5 py-1 rounded-md border border-borderToken">
                            {item.time}
                          </span>
                          <span className="font-semibold text-primary-deep">
                            {item.activity}
                          </span>
                        </div>
                        {item.speakerOrVenue && (
                          <span className="text-xs text-muted font-medium sm:text-right pl-12 sm:pl-0">
                            {item.speakerOrVenue}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers & Jury */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-card border border-borderToken shadow-soft-card">
                  <h2 className="text-xl font-bold text-primary-deep font-display mb-4">
                    Featured Speakers & Mentors
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map((sp, i) => (
                      <div key={i} className="p-4 rounded-xl bg-canvas border border-borderToken flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-full bg-surface-pale text-primary font-bold flex items-center justify-center shrink-0 border border-borderToken">
                          {sp.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary-deep">{sp.name}</div>
                          <div className="text-xs text-muted">{sp.role} • {sp.company}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Registration Card & Logistics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-card border-2 border-primary/20 shadow-elevated sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-borderToken mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Registration Portal
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {event.registrationOpen ? 'Active' : 'Closed'}
                  </span>
                </div>

                <div className="space-y-3 text-xs mb-6 text-body">
                  <div className="flex justify-between">
                    <span className="text-muted">Participation Fee:</span>
                    <span className="font-bold text-primary-deep">{event.registrationFee || 'Free'}</span>
                  </div>
                  {event.registrationDeadline && (
                    <div className="flex justify-between">
                      <span className="text-muted">Registration Deadline:</span>
                      <span className="font-bold text-primary-deep">{event.registrationDeadline}</span>
                    </div>
                  )}
                  {event.registeredCount !== undefined && event.maxCapacity && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted">Slots Filled:</span>
                        <span className="font-bold text-primary">
                          {event.registeredCount} / {event.maxCapacity} ({Math.round((event.registeredCount / event.maxCapacity) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-surface-pale h-2 rounded-full overflow-hidden border border-borderToken">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${(event.registeredCount / event.maxCapacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {event.registrationOpen ? (
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                  >
                    <span>Register for Event</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="w-full bg-surface-pale text-muted py-3.5 rounded-xl text-sm font-semibold cursor-not-allowed border border-borderToken"
                  >
                    Registrations Closed
                  </button>
                )}

                <div className="mt-4 text-[11px] text-center text-muted">
                  Official MITAOE CIIE Event • Certificate Included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal Dialog */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="fixed inset-0 bg-primary-deep/70 backdrop-blur-xs" onClick={() => setIsRegisterOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-canvas rounded-card-lg border border-borderToken shadow-2xl p-6 sm:p-8">
            {registered ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary-deep font-display">
                  Registration Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-body leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-bold text-primary">{leadName}</span>. Your registration for <span className="font-bold">{event.title}</span> has been logged. An email with venue entry pass will be sent to <span className="underline">{leadEmail}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setRegistered(false);
                  }}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h3 className="text-xl font-bold text-primary-deep font-display">
                    Register for {event.title}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Fill in participant details. Free for verified MITAOE students.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-primary-deep mb-1">
                    Team Name / Solo Participant
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phoenix Innovators"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-white focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-primary-deep mb-1">
                      Lead Participant Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Joshi"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-white focus:outline-none focus:ring-1 focus:ring-primary text-body"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-primary-deep mb-1">
                      PRN / College ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MIT2024CS042"
                      value={collegePRN}
                      onChange={(e) => setCollegePRN(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-white focus:outline-none focus:ring-1 focus:ring-primary text-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-primary-deep mb-1">
                    College / Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@mitaoe.ac.in"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-white focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="px-4 py-2 rounded-xl border border-borderToken text-muted hover:text-body"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold transition-all shadow-sm"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
