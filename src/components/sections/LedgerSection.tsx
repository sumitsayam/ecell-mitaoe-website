'use client';

import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowUpRight } from 'lucide-react';

export default function LedgerSection() {
  const ledgerRows = [
    {
      phase: 'PHASE 01',
      title: 'PROBLEM DISCOVERY & TAM DIAGNOSIS',
      duration: '~2 WEEKS',
      breakdown: [
        { task: 'Customer Problem Validation & 30+ Field Interviews', time: '~1 Wk' },
        { task: 'TAM/SAM/SOM Sizing with CIIE Entrepreneur Mentors', time: '~1 Wk' },
      ],
    },
    {
      phase: 'PHASE 02',
      title: 'MAKERSPACE PROTOTYPING & MVP SPRINT',
      duration: '~4 WEEKS',
      breakdown: [
        { task: 'Hardware Rapid Prototyping / Full-Stack Web MVP', time: '~2 Wks' },
        { task: 'First 50 Student Beta Testers & Pilot Feedback Loop', time: '~2 Wks' },
      ],
    },
    {
      phase: 'PHASE 03',
      title: 'CIIE PRE-INCUBATION & IP FILING',
      duration: '~8 WEEKS',
      breakdown: [
        { task: '₹25 Lakhs Pre-Seed Institutional Grant Application', time: '~2 Wks' },
        { task: 'Patent & Trademark Filing with 100% Fee Reimbursement', time: '~4 Wks' },
        { task: 'DPIIT Startup Recognition & Tax Exemption Setup', time: '~2 Wks' },
      ],
    },
    {
      phase: 'PHASE 04',
      title: 'E-SUMMIT DEMO DAY & ANGEL SYNDICATE',
      duration: '~12 WEEKS',
      breakdown: [
        { task: 'Closed-Door Pitch to Western Region Angel Investors', time: '~2 Wks' },
        { task: 'Commercial Pilot Signoffs & Seed Round Term Sheets', time: 'ACTIVE' },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-canvas border-y border-borderToken relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement & Big Metric */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <SectionLabel number="001" label="THE ENTREPRENEURSHIP LEDGER" className="mb-4" />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight font-display mb-6">
                Taking an idea from classroom to market takes months. <br />
                <span className="font-serif italic font-normal text-primary/80">
                  Unless you compress the cycle.
                </span>
              </h2>

              <p className="text-body text-sm sm:text-base leading-relaxed mb-8">
                Most student projects remain academic exercises because builders lack capital, IP guidance, and corporate feedback. E-Cell MITAOE provides the structured venture pipeline that converts student curiosity into audited ventures.
              </p>
            </div>

            <div className="pt-6 border-t border-borderToken">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-display text-primary leading-none tracking-tighter mb-2">
                ~32+
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-body-muted flex items-center gap-2">
                <span>STUDENT VENTURES ACCELERATED</span>
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                  100% VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Ledger-Style Breakdown Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-borderToken p-6 sm:p-8 shadow-soft-card font-mono text-xs">
            {/* Ledger Header */}
            <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-300 text-body-muted text-[11px] uppercase tracking-wider mb-6">
              <span>VENTURE PHASE // MILESTONE</span>
              <span>ESTIMATED TIME</span>
            </div>

            {/* Ledger Rows */}
            <div className="space-y-6">
              {ledgerRows.map((row, idx) => (
                <div
                  key={row.phase}
                  className={`pb-5 ${
                    idx !== ledgerRows.length - 1 ? 'border-b border-borderToken/70' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700">
                        {row.phase}
                      </span>
                      <span className="text-sm font-semibold tracking-tight">{row.title}</span>
                    </div>
                    <span className="text-accent-blue font-semibold">{row.duration}</span>
                  </div>

                  <div className="space-y-1.5 pl-3 border-l-2 border-slate-200 ml-2 mt-2.5">
                    {row.breakdown.map((item) => (
                      <div
                        key={item.task}
                        className="flex items-center justify-between text-body/80 text-[11px] leading-relaxed"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="text-slate-400">└</span>
                          <span>{item.task}</span>
                        </span>
                        <span className="text-slate-500 font-mono shrink-0 pl-3">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Footer Callout */}
            <div className="mt-6 pt-4 border-t border-dashed border-slate-300 flex flex-wrap items-center justify-between gap-3 text-[11px] text-body-muted">
              <span>DATA AUDITED BY CIIE ACADEMIC COMMITTEE 2026</span>
              <a
                href="/initiatives"
                className="text-primary hover:text-accent-blue font-bold flex items-center gap-1 transition-colors"
              >
                <span>EXPLORE COHORT CRITERIA</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

