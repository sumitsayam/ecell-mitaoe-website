'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useModals } from '@/components/modals/ModalContext';

interface JoinCtaSectionProps {
  onOpenJoin?: () => void;
}

export default function JoinCtaSection({ onOpenJoin }: JoinCtaSectionProps) {
  const modals = useModals();
  const handleOpenJoin = onOpenJoin || modals.openJoin;
  const perks = [
    'Direct exposure to angel investors & prominent founders',
    'Hands-on experience organizing mega-scale hackathons',
    'Exclusive incubation toolkits & cloud platform credits',
    'Official MITAOE leadership certificate & recommendations',
  ];

  return (
    <section id="join" className="py-16 md:py-24 bg-[var(--bg)] text-[var(--ink)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[var(--color-surface)] text-[var(--ink)] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-elevated border border-[var(--line)]">
          {/* Subtle Ambient Radial Wash */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-xs font-mono font-semibold tracking-wider uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RECRUITMENT COHORT 2026–27</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight leading-tight mb-5 text-[var(--ink)]">
                Ready to Turn Ideas into Real-World Impact?
              </h2>

              <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-sans mb-8 max-w-xl">
                Join a dynamic community of creators, strategists, and coders at MIT Academy of Engineering.
                We learn by building, executing, and challenging the status quo.
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--ink)]/90 font-sans font-medium">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleOpenJoin}
                  type="button"
                  className="inline-flex items-center gap-2.5 bg-[var(--accent)] hover:opacity-90 active:scale-[0.98] text-white px-8 py-4 rounded-xl text-sm md:text-base font-sans font-bold tracking-wide transition-all shadow-md group cursor-pointer"
                >
                  <span>Apply for Core Team</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 bg-[var(--bg)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] px-6 py-4 text-sm font-sans font-semibold tracking-wide border border-[var(--line)] rounded-xl transition-colors"
                >
                  <span>Explore Open Events</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Department Openings */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--bg)] rounded-2xl p-6 sm:p-7 border border-[var(--line)]">
                <h3 className="text-lg font-bold font-display text-[var(--ink)] mb-2 flex items-center justify-between">
                  <span>Open Tracks</span>
                  <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
                    Active
                  </span>
                </h3>
                <p className="text-xs font-sans text-[var(--ink)]/70 mb-5 leading-relaxed">
                  First-year to final-year students from all engineering branches are welcome.
                </p>

                <div className="space-y-3">
                  {[
                    { name: 'Technical & Platform Dev', slots: 'Fullstack, AI, Mobile' },
                    { name: 'Corporate Relations & Sponsorship', slots: 'Partnerships & Outreach' },
                    { name: 'Design & Visual Branding', slots: 'UI/UX, 3D, Video' },
                    { name: 'Events & Logistics Management', slots: 'Hackathons, Conclaves' },
                    { name: 'Startup Incubation & Research', slots: 'Founder Support' },
                  ].map((track, i) => (
                    <Link
                      key={i}
                      href="/join"
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface)] hover:border-[var(--accent)] border border-[var(--line)] transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold font-display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                          {track.name}
                        </div>
                        <div className="text-[11px] font-sans text-[var(--ink)]/60">
                          {track.slots}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
