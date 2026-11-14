'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initiativesData } from '@/data/initiatives';
import { ArrowLeft, CheckCircle2, Target, ArrowRight } from 'lucide-react';

interface InitiativeDetailPageProps {
  params: {
    slug: string;
  };
}

export default function InitiativeDetailPage({ params }: InitiativeDetailPageProps) {
  const initiative = initiativesData.find((item) => item.slug === params.slug);

  if (!initiative) {
    notFound();
  }

  const otherInitiatives = initiativesData.filter((item) => item.slug !== params.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Back Link */}
        <Link
          href="/initiatives"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--accent)] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all initiatives</span>
        </Link>

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[var(--color-border)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">
            <span>{initiative.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[var(--ink)] leading-[1.08] mb-4">
            {initiative.title}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[var(--accent)] mb-6">
            {initiative.headline}
          </p>

          <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed max-w-3xl font-normal">
            {initiative.description}
          </p>
        </header>

        {/* Metric Highlight Box */}
        <div className="mb-12 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft-card">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
            Verified Impact Metrics:
          </div>
          <div className="font-mono font-bold text-sm sm:text-base text-[var(--accent)]">
            {initiative.metrics}
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-display text-[var(--ink)]">
              Programme Architecture
            </h2>
            <p className="text-[var(--ink)]/80 text-base sm:text-lg leading-relaxed font-sans">
              {initiative.fullOverview}
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-bold font-display text-[var(--ink)] mb-4">
                What Participants Receive
              </h3>
              <div className="space-y-3">
                {initiative.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--ink)]/80">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft-card space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-bold">
                <Target className="w-4 h-4" />
                <span>Eligibility</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-sans">
                {initiative.whoIsItFor}
              </p>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <Link
                  href="/join"
                  className="w-full py-3 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Apply / Get Involved</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Initiatives */}
        {otherInitiatives.length > 0 && (
          <div className="pt-12 border-t border-[var(--color-border)]">
            <h3 className="text-2xl font-bold font-display text-[var(--ink)] mb-6">
              Other E-Cell Initiatives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherInitiatives.map((item) => (
                <Link
                  key={item.id}
                  href={`/initiatives/${item.slug}`}
                  className="p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--accent)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-all group shadow-soft-card"
                >
                  <div className="text-[10px] font-mono uppercase text-[var(--accent)] font-bold mb-2">
                    {item.category}
                  </div>
                  <h4 className="font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors text-lg mb-2 font-display">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
