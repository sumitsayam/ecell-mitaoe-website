'use client';

import React from 'react';
import { ArrowUpRight, Cpu, Layers, Handshake, Sparkles, Building2 } from 'lucide-react';

export default function InitiativesSection({ onOpenJoin }: { onOpenJoin?: () => void }) {
  const initiatives = [
    {
      title: 'Venture Incubation Studio',
      subtitle: 'From Dorm-Room Idea to First 1,000 Customers',
      description:
        'A 12-week intensive cohort providing MITAOE student founders with co-working access, legal registration support, AWS credits, and patent filing guidance.',
      tag: 'INCUBATION',
      icon: Cpu,
    },
    {
      title: 'E-Summit MITAOE',
      subtitle: 'Maharashtra’s Premier Student Entrepreneurship Summit',
      description:
        '3 days of investor panels, hackathons, b-plan battles, and speaker sessions featuring unicorn founders, angels, and technology disruptors.',
      tag: 'ANNUAL FLAGSHIP',
      icon: Layers,
    },
    {
      title: 'Campus Founder Angel Network',
      subtitle: 'Early-stage Micro Grants & Angel Backing',
      description:
        'Connecting validated student ventures with angel syndicates, alumni seed funds, and government grant schemes like NIDHI-EIR & Startup India.',
      tag: 'CAPITAL',
      icon: Building2,
    },
    {
      title: 'Corporate Innovation Challenges',
      subtitle: 'Solving Real Industry Problem Statements',
      description:
        'Industry partnerships that bring sponsored hackathons, live data challenges, and direct pre-placement interview opportunities.',
      tag: 'COLLABORATION',
      icon: Handshake,
    },
  ];

  return (
    <section id="initiatives" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-bold tracking-[0.22em] text-navy-850/90 uppercase">
              CORE INITIATIVES
            </span>
            <span className="w-16 h-[2px] bg-navy-850" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 font-display tracking-tight">
            Building the Entrepreneurial{' '}
            <span className="font-serif italic font-normal text-navy-850">
              Ecosystem.
            </span>
          </h2>
          <p className="text-base text-ink/80 mt-4 leading-relaxed font-medium">
            We don’t just host events — we establish long-term pathways for MITAOE students to ideate, build, and launch sustainable companies.
          </p>
        </div>

        {/* Initiatives 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-200 p-7 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-cream-150 text-navy-850 border border-cream-200">
                      {item.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-navy-850 group-hover:bg-navy-850 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-navy-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-navy-850/70 tracking-wide mt-1 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-ink/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-cream-150 flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy-850 group-hover:underline">
                    Learn about this program
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cream-150 group-hover:bg-navy-850 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-navy-850 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
