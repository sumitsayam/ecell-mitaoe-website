'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Linkedin, Mail, Github, Users } from 'lucide-react';
import { teamData } from '@/data/team';
import SectionHeader from '@/components/common/SectionHeader';

export default function TeamPreviewSection() {
  // Show key student leadership & faculty advisors on homepage preview
  const previewMembers = teamData.filter(
    (m) => m.department === 'Leadership' || m.department === 'Faculty Advisory'
  ).slice(0, 5);

  return (
    <section id="team" className="py-14 md:py-20 scroll-mt-20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="OUR TEAM"
          title="Driven by Students,"
          italicWord="Backed by Mentors"
          description="E-Cell MITAOE is organized and powered entirely by student engineers across six departments, under the stewardship of the Centre for Innovation & Incubation."
          actionText="Meet All Departments"
          actionHref="/team"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {previewMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-card border border-borderToken p-5 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Monogram or Avatar */}
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

                <p className="text-xs text-body/75 mt-3 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-4 pt-3 border-t border-borderToken/60 flex items-center gap-2">
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
      </div>
    </section>
  );
}
