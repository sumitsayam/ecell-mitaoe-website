'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin, Mail, Github, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { teamData, departments } from '@/data/team';
import SectionHeader from '@/components/common/SectionHeader';

export default function TeamDirectoryPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');

  const filteredMembers = useMemo(() => {
    if (selectedDept === 'All Departments') return teamData;
    return teamData.filter((m) => m.department === selectedDept);
  }, [selectedDept]);

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-borderToken bg-surface-pale/40">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                COMMUNITY ARCHITECTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Meet the Student Builders & Mentors.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              E-Cell MITAOE is organized across specialized functional portfolios—from technical engineering and corporate sponsorships to incubation research.
            </p>
          </div>
        </div>
      </section>

      {/* Department Tabs */}
      <section className="py-4 border-b border-borderToken bg-white sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-body/75 hover:text-primary hover:bg-surface-pale'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="py-12 md:py-20 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-card border border-borderToken p-6 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Monogram Box */}
                  <div className="w-14 h-14 rounded-2xl bg-surface-pale border border-borderToken flex items-center justify-center text-primary font-bold text-lg mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-surface-pale text-primary border border-borderToken inline-block mb-2">
                    {member.department}
                  </span>

                  <h3 className="text-base font-bold text-primary-deep leading-snug">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-primary/80 mt-1 leading-snug">
                    {member.role}
                  </p>

                  {member.branchAndYear && (
                    <p className="text-[11px] text-muted mt-1 leading-snug font-mono">
                      {member.branchAndYear}
                    </p>
                  )}

                  <p className="text-xs text-body/80 mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-5 pt-3.5 border-t border-borderToken/70 flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-pale transition-colors"
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
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-pale transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-pale transition-colors"
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
          <div className="mt-16 p-8 sm:p-10 rounded-card-lg bg-surface-pale border border-borderToken flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-deep font-display mb-1">
                Want to lead an E-Cell department?
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                Recruitment applications for our next cohort of organizers and associates are open.
              </p>
            </div>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm shrink-0"
            >
              <span>Apply for Core Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
