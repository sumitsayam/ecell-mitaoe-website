'use client';

import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { milestonesTimeline, annualReports } from '@/data/achievements';

export default function AchievementsPage() {
  const [filterYear, setFilterYear] = useState<string>('ALL');

  const filteredMilestones = milestonesTimeline.filter((m) => {
    if (filterYear === 'ALL') return true;
    return m.year === filterYear;
  });

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                HISTORICAL RECORD
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Milestones, Incubated Startups &amp; Archives.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              Explore the documented history of entrepreneurship at MITAOE—from student patent breakthroughs to audited annual reports.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-[var(--bg)] flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Timeline */}
            <div className="lg:col-span-8">
              {/* Year Filter Buttons — Signature Club Capsule Toggles */}
              <div className="flex items-center gap-1 mb-8 p-1.5 bg-[#121620] border border-white/10 rounded-full w-fit shadow-xs">
                {['ALL', '2026', '2025', '2024'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setFilterYear(yr)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                      filterYear === yr
                        ? 'bg-[#FFB52E] text-[#0A0D14] font-extrabold shadow-sm'
                        : 'text-[#C6CAD0] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[var(--color-border)]">
                {filteredMilestones.map((m, idx) => (
                  <div key={idx} className="relative flex items-start gap-5 pl-1 group">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-surface)] border-2 border-[var(--accent)] flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    </div>

                    <div className="flex-1 bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-soft-card hover:shadow-elevated transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-[var(--accent)]">
                          {m.year} {m.quarter && `• ${m.quarter}`}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--bg)] text-[var(--accent)] uppercase border border-[var(--color-border)]">
                          {m.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[var(--ink)] font-display mb-2">
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--ink)]/80 leading-relaxed mb-4 font-sans">
                        {m.summary}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{m.impactMetrics}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Annual Reports & Document Archive */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[var(--color-surface)] p-6 sm:p-7 rounded-2xl border border-[var(--color-border)] shadow-soft-card">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-lg font-bold text-[var(--ink)] font-display">
                    Audited Annual Reports
                  </h3>
                </div>
                <p className="text-xs text-[var(--color-muted)] mb-5 leading-relaxed font-sans">
                  Download certified PDF summaries detailing grant allocations, sponsorship accounting, and event attendance.
                </p>

                <div className="space-y-3">
                  {annualReports.map((report, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] hover:border-[var(--accent)] transition-colors"
                    >
                      <div className="text-xs font-bold text-[var(--ink)] font-display mb-1">
                        {report.title}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--color-muted)] mb-3">
                        {report.year} • {report.fileSize}
                      </div>
                      <button
                        onClick={() => alert(`Downloading ${report.title}`)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[var(--color-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--color-border)] text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Download Verified Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CIIE Accreditation Note */}
              <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs space-y-2 shadow-soft-card">
                <div className="font-bold text-[var(--ink)] font-display">CIIE Governance Protocol</div>
                <p className="text-[var(--color-muted)] leading-relaxed font-sans">
                  All official reports and startup grant awards are reviewed and approved by the MITAOE Centre for Innovation, Incubation and Entrepreneurship advisory council.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
