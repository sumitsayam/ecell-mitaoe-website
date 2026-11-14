'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Linkedin, Mail, Github } from 'lucide-react';
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
    <section id="team" className="py-16 md:py-24 bg-[var(--bg)] text-[var(--ink)] border-b border-[var(--line)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <SectionLabel label="LEADERSHIP & ADVISORY" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[var(--ink)] tracking-tight leading-tight">
              Driven by student founders. <br />
              <span className="font-serif italic font-normal text-[var(--accent)]">
                Backed by institutional faculty & venture mentors.
              </span>
            </h2>
          </div>

          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-surface)] hover:bg-[var(--accent)] hover:text-white border border-[var(--line)] text-[var(--ink)] font-mono text-xs uppercase font-semibold tracking-wider transition-all shadow-2xs group shrink-0"
          >
            <span>Full Department Roster</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Department Filter Tabs — Signature Club Capsule Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 pb-8 border-b border-[var(--line)] mb-8">
          <div className="flex flex-wrap items-center gap-1 p-1.5 bg-[#121620] border border-white/10 rounded-full shadow-xs">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeDept === dept
                    ? 'bg-[#FFB52E] text-[#0A0D14] font-extrabold shadow-sm'
                    : 'text-[#C6CAD0] hover:text-white hover:bg-white/10'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[var(--color-surface)] rounded-2xl border border-[var(--line)] p-6 shadow-soft-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Monogram Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] font-mono font-bold text-base shadow-xs group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg)] text-[10px] font-mono uppercase tracking-wider text-[var(--ink)]/70 border border-[var(--line)] font-semibold">
                    {member.department}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                  {member.name}
                </h3>

                <p className="text-xs font-mono text-[var(--accent)] font-semibold mt-1">
                  {member.role}
                </p>

                {member.branchAndYear && (
                  <p className="text-[11px] text-[var(--ink)]/60 mt-1 font-mono">
                    {member.branchAndYear}
                  </p>
                )}

                <p className="text-xs font-sans text-[var(--ink)]/75 leading-relaxed mt-3 line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-[var(--ink)]/60 hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
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
                    className="p-1.5 rounded-lg text-[var(--ink)]/60 hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 rounded-lg text-[var(--ink)]/60 hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
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
