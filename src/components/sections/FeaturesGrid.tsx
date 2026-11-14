'use client';

import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturesGrid() {
  const principles = [
    {
      num: '001',
      title: 'THINK BIG',
      subtitle: 'Ambitious Baselines',
      description: 'Reject incremental college projects. We challenge student teams to target scalable venture hypotheses addressing systemic national and global bottlenecks.',
      link: '/about',
    },
    {
      num: '002',
      title: 'START SMALL',
      subtitle: 'Zero-Capital MVPs',
      description: 'Convert theoretical assumptions into low-fidelity, testable artifacts within 48 hours before committing engineering cycles.',
      link: '/resources',
    },
    {
      num: '003',
      title: 'EXPERIMENT',
      subtitle: 'Empirical Discovery',
      description: 'Every feature is treated as an empirical hypothesis subject to brutal customer feedback, telemetry data, and user cohort retention.',
      link: '/initiatives',
    },
    {
      num: '004',
      title: 'BUILD TOGETHER',
      subtitle: 'Cross-Disciplinary Pods',
      description: 'Unite computer science architects, hardware engineers, mechanical designers, and operators under one high-velocity cohort.',
      link: '/team',
    },
    {
      num: '005',
      title: 'LEARN FROM FAILURE',
      subtitle: 'Post-Mortem Velocity',
      description: 'Deconstruct discarded prototypes into foundational insights. Failed experiments are celebrated as the price of admission to real innovation.',
      link: '/insights',
    },
    {
      num: '006',
      title: 'CONNECT WITH FOUNDERS',
      subtitle: 'Practitioner Office Hours',
      description: 'Access candid, closed-door advisory sessions with alumni founders and angel syndicates who have scaled ventures from campus.',
      link: '/events',
    },
    {
      num: '007',
      title: 'EXPLORE OPPORTUNITIES',
      subtitle: 'Institutional Pipelines',
      description: 'Tap directly into government seed grant pools (NIDHI-EIR, Startup India), corporate hackathon bounties, and seed syndicates.',
      link: '/initiatives',
    },
    {
      num: '008',
      title: 'DEVELOP SKILLS',
      subtitle: 'Venture Competencies',
      description: 'Gain practical mastery of cap table structuring, term-sheet negotiations, customer acquisition costs, and investor storytelling.',
      link: '/resources',
    },
    {
      num: '009',
      title: 'CREATE IMPACT',
      subtitle: 'Tangible Regional Value',
      description: 'Engineer lasting economic and technological value that uplifts the collegiate community, Alandi industries, and national markets.',
      link: '/achievements',
    },
    {
      num: '010',
      title: 'KEEP BUILDING',
      subtitle: 'The Infinite Cycle',
      description: 'The venture journey never finishes. Validate, scale, exit, and return to mentor the incoming generation of MITAOE builders.',
      link: '/join',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#DCE5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <SectionLabel number="003" label="WHAT WE BELIEVE" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#101B32] tracking-tight">
              EVERY DECISION <br />
              <span className="text-[#155EEF]">ALREADY MADE.</span>
            </h2>
          </div>
          <p className="text-[#6B7890] text-sm sm:text-base max-w-md font-normal leading-relaxed font-sans">
            Ten operational principles that separate collegiate project hobbyists from venture-backed technical founders.
          </p>
        </div>

        {/* 10 Numbered Editorial Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#DCE5F2] border border-[#DCE5F2] rounded-2xl overflow-hidden shadow-soft-card">
          {principles.map((item) => (
            <div
              key={item.num}
              className="p-6 sm:p-8 bg-[#FFFFFF] hover:bg-[#F8FAFF] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-[#155EEF]">
                    {item.num} {'//'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#E7F0FF] font-mono text-[10px] text-[#0B347C] uppercase tracking-wider font-semibold">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-[#101B32] mb-2.5 group-hover:text-[#155EEF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[#6B7890] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>
              </div>

              <div>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#101B32] hover:text-[#155EEF] tracking-wider transition-colors"
                >
                  <span>Explore Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#155EEF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
