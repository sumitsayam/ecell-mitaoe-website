'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Linkedin, Mail, Github, ArrowRight } from 'lucide-react';
import { teamData, departments } from '@/data/team';

export default function TeamDirectoryPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');

  const filteredMembers = useMemo(() => {
    if (selectedDept === 'All Departments') return teamData;
    return teamData.filter((m) => m.department === selectedDept);
  }, [selectedDept]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                COMMUNITY ARCHITECTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Meet the Student Builders &amp; Mentors.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              E-Cell MIT AOE is organized across specialized functional portfolios—from technical engineering and corporate sponsorships to incubation research.
            </p>
          </div>
        </div>
      </section>

      {/* Department Tabs — Signature Club Capsule Toggles */}
      <section className="py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 p-1.5 bg-[#121620] border border-white/10 rounded-full overflow-x-auto shadow-xs">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                type="button"
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-[#FFB52E] text-[#0A0D14] font-extrabold shadow-sm'
                    : 'text-[#C6CAD0] hover:text-white hover:bg-white/10'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="py-12 md:py-20 bg-[var(--bg)] flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Monogram Box */}
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--accent)] font-bold text-lg mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors font-mono">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-[var(--bg)] text-[var(--accent)] border border-[var(--color-border)] inline-block mb-2">
                    {member.department}
                  </span>

                  <h3 className="text-base font-bold text-[var(--ink)] font-display leading-snug">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-[var(--accent)] mt-1 leading-snug font-sans">
                    {member.role}
                  </p>

                  {member.branchAndYear && (
                    <p className="text-[11px] text-[var(--color-muted)] mt-1 leading-snug font-mono">
                      {member.branchAndYear}
                    </p>
                  )}

                  <p className="text-xs text-[var(--ink)]/75 mt-3 leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-5 pt-3.5 border-t border-[var(--color-border)] flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
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
                      className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-colors"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Join Recruitment Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-card">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-display mb-1">
                Want to lead an E-Cell department?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans">
                Recruitment applications for our next cohort of organizers and associates are open.
              </p>
            </div>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white px-6 py-3.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-sm shrink-0"
            >
              <span>Apply for Core Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
