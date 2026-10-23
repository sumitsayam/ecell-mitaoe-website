'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { milestonesTimeline, annualReports } from '@/data/achievements';
import SectionHeader from '@/components/common/SectionHeader';

export default function AchievementsSection() {
  return (
    <section className="py-14 md:py-20 border-t border-borderToken/70 bg-white">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="MILESTONES & HISTORY"
          title="Track Record of"
          italicWord="Venture Impact"
          description="From establishing student co-working pods to catalyzing venture rounds, our journey of campus entrepreneurship."
          actionText="Explore Historical Archive"
          actionHref="/achievements"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Timeline */}
          <div className="lg:col-span-8">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-borderToken">
              {milestonesTimeline.slice(0, 4).map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-5 pl-1 group">
                  {/* Circle Pin */}
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Milestone Card */}
                  <div className="flex-1 bg-canvas p-5 rounded-2xl border border-borderToken transition-all hover:border-primary/40">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-primary">
                        {m.year} {m.quarter && `• ${m.quarter}`}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-pale text-primary uppercase border border-borderToken">
                        {m.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-primary-deep mb-1">
                      {m.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-body/80 leading-relaxed mb-3">
                      {m.summary}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-200/60 w-fit">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{m.impactMetrics}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Downloadable Annual Reports Card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-surface-pale p-6 rounded-card border border-borderToken">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-primary-deep">
                  Audited Annual Reports
                </h3>
              </div>
              <p className="text-xs text-muted mb-5 leading-relaxed">
                Download verified annual reports summarizing organized events, participant metrics, and incubator financials.
              </p>

              <div className="space-y-3">
                {annualReports.map((report, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-borderToken hover:border-primary/50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-primary-deep">
                        {report.title}
                      </div>
                      <div className="text-[11px] text-muted mt-0.5">
                        {report.year} • {report.fileSize}
                      </div>
                    </div>
                    <a
                      href={report.downloadUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening official ${report.title}`);
                      }}
                      className="p-2 rounded-lg text-primary hover:bg-surface-pale"
                      title="Download PDF"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-borderToken/70 text-center">
                <Link
                  href="/achievements"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Milestones & Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
