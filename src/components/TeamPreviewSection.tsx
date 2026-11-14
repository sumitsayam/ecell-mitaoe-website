'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Linkedin, Mail, Github, Users, Sparkles } from 'lucide-react';
import { teamData } from '@/data/team';
import SectionLabel from '@/components/ui/SectionLabel';

export default function TeamPreviewSection() {
  const [activeDept, setActiveDept] = useState<string>('ALL');

  const departments = ['ALL', 'Leadership', 'Faculty Advisory', 'Technical', 'Corporate Relations', 'Design & Media'];

  const filteredMembers = teamData.filter((m) => {
    if (activeDept === 'ALL') {
      return (
        m.department === 'Leadership' ||
        m.department === 'Faculty Advisory' ||
        m.department === 'Technical' ||
        m.department === 'Corporate Relations'
      );
    }
    return m.department === activeDept;
  }).slice(0, 8);

  return (
    <section id="team" className="py-20 sm:py-28 bg-white border-b border-borderToken scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <SectionLabel label="LEADERSHIP & TEAM" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight">
              Driven by student founders. <br />
              <span className="font-serif italic font-normal text-primary/80">
                Backed by institutional faculty & venture mentors.
              </span>
            </h2>
          </div>

          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-canvas hover:bg-primary hover:text-white border border-borderToken text-primary font-mono text-xs uppercase font-semibold tracking-wider transition-all shadow-2xs group shrink-0"
          >
            <span>Full Department Roster</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-borderToken mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                activeDept === dept
                  ? 'bg-primary text-white font-semibold shadow-xs'
                  : 'bg-canvas text-body hover:bg-slate-100'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-canvas rounded-2xl border border-borderToken p-6 shadow-soft-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Monogram Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-borderToken flex items-center justify-center text-primary font-mono font-bold text-base shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-[10px] font-mono uppercase tracking-wider text-body-muted border border-borderToken font-semibold">
                    {member.department}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-primary leading-tight">
                  {member.name}
                </h3>

                <p className="text-xs font-mono text-accent-blue font-semibold mt-1">
                  {member.role}
                </p>

                {member.branchAndYear && (
                  <p className="text-[11px] text-body-muted mt-1 font-mono">
                    {member.branchAndYear}
                  </p>
                )}

                <p className="text-xs text-body leading-relaxed mt-3 line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-5 pt-3 border-t border-borderToken/70 flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-body-muted hover:text-primary hover:bg-white transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-body-muted hover:text-primary hover:bg-white transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 rounded-lg text-body-muted hover:text-primary hover:bg-white transition-colors"
                    aria-label={`${member.name} Email`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
