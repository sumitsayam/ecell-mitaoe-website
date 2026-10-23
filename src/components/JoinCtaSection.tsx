'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Users, Award } from 'lucide-react';

interface JoinCtaSectionProps {
  onOpenJoin: () => void;
}

export default function JoinCtaSection({ onOpenJoin }: JoinCtaSectionProps) {
  const perks = [
    'Direct access to angel investors & startup founders',
    'Hands-on experience organizing mega-scale hackathons',
    'Exclusive incubation credits and cloud toolkits',
    'Official MITAOE leadership certificate & recommendations',
  ];

  return (
    <section id="join" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-navy-850 text-white overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl border border-navy-700/60">
          {/* Background Decorative Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-cream-100 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>RECRUITMENT COHORT 2026-27</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-tight mb-5 text-cream-50">
                Ready to Turn Ideas into Real-World Impact?
              </h2>

              <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed font-normal mb-8 max-w-xl">
                Join a dynamic community of creators, strategists, and coders at MIT Academy of Engineering.
                We learn by building, executing, and challenging the status quo.
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-cream-100/90 font-medium">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenJoin}
                  type="button"
                  className="inline-flex items-center gap-2.5 bg-white text-navy-950 hover:bg-cream-100 active:scale-[0.98] px-8 py-4 rounded-xl text-sm md:text-base font-bold tracking-wide transition-all duration-200 shadow-lg group"
                >
                  <span>Apply for Core Team</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#events"
                  className="inline-flex items-center gap-2 text-cream-200 hover:text-white px-5 py-4 text-sm font-semibold tracking-wide border border-white/20 hover:border-white/40 rounded-xl transition-colors"
                >
                  <span>Explore Open Events</span>
                </a>
              </div>
            </div>

            {/* Right Card: Department Openings */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                  <span>Open Tracks</span>
                  <span className="text-xs font-mono text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </h3>
                <p className="text-xs text-cream-200/80 mb-5 leading-relaxed">
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
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer"
                      onClick={onOpenJoin}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {track.name}
                        </div>
                        <div className="text-[11px] text-cream-300/70">
                          {track.slots}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
                    </div>
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
