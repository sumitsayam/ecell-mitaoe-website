'use client';

import React from 'react';
import { Lightbulb, Rocket, Users, Target, ShieldCheck, Compass } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Ideation & Discovery',
      description:
        'Structured problem sprints, design thinking workshops, and market gap validation frameworks.',
    },
    {
      icon: Rocket,
      title: 'Incubation & Prototyping',
      description:
        'Access to campus makerspace, cloud infrastructure credits, and technical prototyping mentorship.',
    },
    {
      icon: Users,
      title: 'Alumni & Industry Mentors',
      description:
        'Direct 1-on-1 guidance from MITAOE alumni founders, venture capitalists, and corporate innovators.',
    },
    {
      icon: Target,
      title: 'Investor & Demo Days',
      description:
        'Pitch arenas, angel syndicate connections, and grant assistance for venture-backed student startups.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-y border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                WHO WE ARE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] font-display tracking-tight leading-tight mb-6">
              Empowering Student Founders from the Ground Up.
            </h2>

            <p className="text-base text-[var(--ink)]/85 leading-relaxed mb-6 font-sans font-medium">
              E-Cell MITAOE is the student-led entrepreneurship catalyst at MIT Academy of Engineering, Pune.
              We operate at the intersection of technology, creative design, and venture building.
            </p>

            <p className="text-sm text-[var(--ink)]/75 leading-relaxed mb-8 font-sans">
              Recognized under the MITAOE Centre for Innovation, Incubation & Entrepreneurship (CIIE), our mission
              is to nurture raw student ambition into viable, market-tested startups that solve genuine real-world challenges.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[var(--color-surface)] px-3.5 py-2 rounded-lg border border-[var(--line)] shadow-2xs text-xs font-semibold text-[var(--ink)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>CIIE MITAOE Recognized</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[var(--color-surface)] px-3.5 py-2 rounded-lg border border-[var(--line)] shadow-2xs text-xs font-semibold text-[var(--ink)]">
                <Compass className="w-4 h-4 text-[var(--accent)]" />
                <span>National E-Cell Network</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--line)] shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] transition-colors">
                      <Icon className="w-6 h-6 text-[var(--accent)] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--ink)] font-display mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[var(--ink)]/75 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
