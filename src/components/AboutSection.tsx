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
    <section id="about" className="py-16 md:py-24 bg-cream-50/60 border-y border-cream-200/70 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-navy-850" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-navy-850 uppercase">
                WHO WE ARE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display tracking-tight leading-tight mb-6">
              Empowering Student Founders from the Ground Up.
            </h2>

            <p className="text-base text-ink/85 leading-relaxed mb-6 font-medium">
              E-Cell MITAOE is the student-led entrepreneurship catalyst at MIT Academy of Engineering, Pune.
              We operate at the intersection of technology, creative design, and venture building.
            </p>

            <p className="text-sm text-ink/75 leading-relaxed mb-8">
              Recognized under the MITAOE Centre for Innovation, Incubation & Entrepreneurship (CIIE), our mission
              is to nurture raw student ambition into viable, market-tested startups that solve genuine real-world challenges.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-cream-200 shadow-2xs text-xs font-bold text-navy-850">
                <ShieldCheck className="w-4 h-4 text-navy-850" />
                <span>CIIE MITAOE Recognized</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-cream-200 shadow-2xs text-xs font-bold text-navy-850">
                <Compass className="w-4 h-4 text-navy-850" />
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
                    className="bg-white p-6 rounded-2xl border border-cream-200 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cream-150 border border-cream-200 flex items-center justify-center mb-4 group-hover:bg-navy-850 transition-colors">
                      <Icon className="w-6 h-6 text-navy-850 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-950 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-ink/75 leading-relaxed font-normal">
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
