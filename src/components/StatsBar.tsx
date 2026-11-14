'use client';

import React from 'react';

/* ────────────────────────────────────────────────────────────────────────
 *  StatsBar — Clean Institutional Impact Metrics Strip
 *
 *  Specifications:
 *  • Factual, verified numbers only (₹25L, 40+, 15+, 5,400+)
 *  • Quiet, high-contrast typography in semantic --ink
 *  • Hairline border dividers in --line
 *  • Zero AI-slop: No fake toggles, no soft blue icon boxes, no cheesy slogans
 * ────────────────────────────────────────────────────────────────────── */

const METRICS = [
  {
    value: '₹25L',
    label: 'Pre-seed grants',
    detail: 'Non-dilutive prototype capital per student cohort',
  },
  {
    value: '40+',
    label: 'Startups incubated',
    detail: 'Student-led ventures mentored through CIIE',
  },
  {
    value: '15+',
    label: 'Patents filed',
    detail: '100% reimbursed filing fees for student inventions',
  },
  {
    value: '5,400+',
    label: 'Students engaged',
    detail: 'Participants across conclaves, hackathons & workshops',
  },
];

export default function StatsBar() {
  return (
    <section className="w-full border-y border-[var(--line)] bg-[var(--bg)] py-12 sm:py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col ${
                idx !== METRICS.length - 1 ? 'lg:border-r lg:border-[var(--line)] lg:pr-8' : ''
              } ${idx !== 0 ? 'lg:pl-8' : ''}`}
            >
              {/* Value */}
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--ink)] leading-none">
                {metric.value}
              </span>

              {/* Label */}
              <span className="font-sans font-semibold text-sm sm:text-base text-[var(--ink)] mt-2 sm:mt-3 leading-snug">
                {metric.label}
              </span>

              {/* Detail */}
              <span className="font-sans text-xs text-[var(--ink)]/65 mt-1 leading-relaxed">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
