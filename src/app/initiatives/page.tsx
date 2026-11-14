import React from 'react';
import Link from 'next/link';
import { Cpu, Layers, Building2, Handshake, Lightbulb, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { initiativesData } from '@/data/initiatives';

export const metadata = {
  title: 'Initiatives & Incubation Programs | E-Cell MIT AOE',
  description: 'Explore E-Cell MIT AOE initiatives including the Venture Incubation Studio, E-Summit, Angel Network, and Corporate Challenges.',
};

export default function InitiativesPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className="w-6 h-6 text-[var(--accent)]" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-[var(--accent)]" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-[var(--accent)]" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 text-[var(--accent)]" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-[var(--accent)]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--accent)]" />;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Hero Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                PROGRAMS & PATHWAYS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Long-Term Ecosystems, Not Just One-Off Events.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              We design continuous founder pathways that take students from curious first-year engineers to venture-backed startup leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Detailed Cards */}
      <section className="py-14 md:py-20 bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {initiativesData.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 lg:p-10 shadow-soft-card hover:shadow-elevated transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column Overview */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center">
                        {getIcon(item.iconType)}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[var(--bg)] text-[var(--accent)] border border-[var(--color-border)]">
                          {item.category}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] font-display mt-1">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-[var(--accent)] mb-3">
                      {item.headline}
                    </p>

                    <p className="text-sm text-[var(--ink)]/80 leading-relaxed mb-6 font-sans">
                      {item.fullOverview}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] text-xs font-semibold text-[var(--ink)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono">Impact: {item.metrics}</span>
                    </div>
                  </div>

                  {/* Right Column Deliverables */}
                  <div className="lg:col-span-5 bg-[var(--bg)] p-6 rounded-2xl border border-[var(--color-border)] space-y-4">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] border-b border-[var(--color-border)] pb-2">
                      Program Deliverables & Support
                    </h3>

                    <div className="space-y-2.5">
                      {item.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--ink)]/80">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)]">
                      <span className="font-bold text-[var(--ink)]">Target Profile: </span>
                      <span>{item.whoIsItFor}</span>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/initiatives/${item.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--accent)] border border-[var(--color-border)] py-2.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all"
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/join"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white py-2.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-xs"
                      >
                        <span>Apply / Register</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
