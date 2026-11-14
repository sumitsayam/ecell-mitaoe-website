'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { resourcesList } from '@/data/resources';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'PLAYBOOK', 'TEMPLATE', 'LEGAL', 'TOOLKIT', 'GRANT'];

  const filteredResources = resourcesList.filter((r) => {
    if (selectedCategory === 'ALL') return true;
    return r.category === selectedCategory;
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
                KNOWLEDGE BASE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Tools, Playbooks &amp; Grant Checklists.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              Curated by student founders and alumni for MITAOE engineering teams. Download pitch decks, unit economic models, and compliance playbooks.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-2xs'
                    : 'text-[var(--ink)]/75 hover:text-[var(--accent)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-12 md:py-20 bg-[var(--bg)] flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[var(--bg)] text-[var(--accent)] border border-[var(--color-border)]">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--color-muted)]">
                      {res.readTimeOrSize}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--ink)] font-display group-hover:text-[var(--accent)] transition-colors leading-snug mb-2">
                    {res.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--ink)]/75 leading-relaxed mb-4 font-sans">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-6 font-mono">
                    {res.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[var(--bg)] px-2 py-0.5 rounded-full text-[var(--color-muted)] border border-[var(--color-border)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[var(--color-muted)]">
                    Format: {res.format}
                  </span>
                  <button
                    onClick={() => alert(`Downloading ${res.title}`)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--color-border)] text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Download</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
