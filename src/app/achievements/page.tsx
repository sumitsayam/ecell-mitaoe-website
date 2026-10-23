'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Calendar, FileText, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { milestonesTimeline, annualReports } from '@/data/achievements';
import SectionHeader from '@/components/common/SectionHeader';

export default function AchievementsPage() {
  const [filterYear, setFilterYear] = useState<string>('ALL');

  const filteredMilestones = milestonesTimeline.filter((m) => {
    if (filterYear === 'ALL') return true;
    return m.year === filterYear;
  });

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
                HISTORICAL RECORD
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Milestones, Incubated Startups & Archives.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              Explore the documented history of entrepreneurship at MITAOE—from student patent breakthroughs to audited annual reports.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Timeline */}
            <div className="lg:col-span-8">
              {/* Year Filter Buttons */}
              <div className="flex items-center gap-2 mb-8 p-1.5 bg-white rounded-xl border border-borderToken w-fit shadow-2xs">
                {['ALL', '2026', '2025', '2024'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setFilterYear(yr)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      filterYear === yr
                        ? 'bg-primary text-white shadow-2xs'
                        : 'text-muted hover:text-primary'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-borderToken">
                {filteredMilestones.map((m, idx) => (
                  <div key={idx} className="relative flex items-start gap-5 pl-1 group">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    <div className="flex-1 bg-white p-6 rounded-card border border-borderToken shadow-soft-card hover:shadow-elevated transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-primary">
                          {m.year} {m.quarter && `• ${m.quarter}`}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-pale text-primary uppercase border border-borderToken">
                          {m.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-primary-deep mb-2">
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-body/80 leading-relaxed mb-4">
                        {m.summary}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{m.impactMetrics}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Annual Reports & Document Archive */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-card border border-borderToken shadow-soft-card">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-primary-deep">
                    Audited Annual Reports
                  </h3>
                </div>
                <p className="text-xs text-muted mb-5 leading-relaxed">
                  Download certified PDF summaries detailing grant allocations, sponsorship accounting, and event attendance.
                </p>

                <div className="space-y-3">
                  {annualReports.map((report, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-canvas border border-borderToken hover:border-primary/50 transition-colors"
                    >
                      <div className="text-xs font-bold text-primary-deep mb-1">
                        {report.title}
                      </div>
                      <div className="text-[11px] text-muted mb-3">
                        {report.year} • {report.fileSize}
                      </div>
                      <button
                        onClick={() => alert(`Downloading ${report.title}`)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-pale hover:bg-primary hover:text-white text-primary text-xs font-bold transition-colors"
                      >
                        <span>Download Verified Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CIIE Accreditation Note */}
              <div className="p-5 rounded-card bg-surface-pale border border-borderToken text-xs space-y-2">
                <div className="font-bold text-primary-deep">CIIE Governance Protocol</div>
                <p className="text-muted leading-relaxed">
                  All official reports and startup grant awards are reviewed and approved by the MITAOE Centre for Innovation, Incubation and Entrepreneurship advisory council.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
