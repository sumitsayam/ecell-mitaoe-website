'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, FileText, CheckCircle2, Download } from 'lucide-react';
import { milestonesTimeline, annualReports } from '@/data/achievements';
import SectionLabel from '@/components/ui/SectionLabel';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 sm:py-28 bg-canvas border-b border-borderToken scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <SectionLabel number="008" label="WALL OF FAME & TRACK RECORD" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight">
              Documented track record. <br />
              <span className="font-serif italic font-normal text-primary/80">
                Audited milestones, funding grants, and student IP.
              </span>
            </h2>
          </div>

          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-borderToken text-primary font-mono text-xs uppercase font-semibold tracking-wider hover:bg-primary hover:text-white transition-all shadow-2xs group shrink-0"
          >
            <span>Full Historical Archive</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Timeline */}
          <div className="lg:col-span-8">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-borderToken">
              {milestonesTimeline.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-5 pl-1 group">
                  {/* Pin */}
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Milestone Card */}
                  <div className="flex-1 bg-white p-6 rounded-2xl border border-borderToken transition-all hover:border-primary/40 shadow-soft-card">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-primary">
                        {m.year} {m.quarter && `// ${m.quarter}`}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                        {m.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-primary mb-1.5">
                      {m.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-body leading-relaxed mb-4">
                      {m.summary}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-forest bg-forest/10 px-3 py-1.5 rounded-lg border border-forest/20 w-fit">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                      <span>{m.impactMetrics}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Audited Annual Reports Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-borderToken shadow-soft-card">
              <div className="flex items-center gap-2.5 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold font-display text-primary">
                  Audited Annual Reports
                </h3>
              </div>
              <p className="text-xs text-body-muted mb-6 leading-relaxed">
                Download verified annual publications detailing collegiate competition outcomes, venture capital allocations, and CIIE patent reimbursement audits.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {annualReports.map((report, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-canvas border border-borderToken hover:border-primary/50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-primary text-xs">
                        {report.title}
                      </div>
                      <div className="text-[11px] text-body-muted mt-0.5">
                        {report.year} • {report.fileSize}
                      </div>
                    </div>
                    <a
                      href={report.downloadUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening official verified report: ${report.title}`);
                      }}
                      className="p-2 rounded-lg text-primary hover:bg-slate-200 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
