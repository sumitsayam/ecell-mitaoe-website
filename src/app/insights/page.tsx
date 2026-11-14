'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { insightsData } from '@/data/insights';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'FOUNDER STORIES',
    'STARTUP FUNDAMENTALS',
    'PRODUCT THINKING',
  ];

  const filtered = selectedCategory === 'ALL'
    ? insightsData
    : insightsData.filter((item) => item.category === selectedCategory);

  const featured = insightsData[0];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="mb-12 border-b border-[var(--color-border)] pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[var(--accent)]" />
            <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE FOUNDER&apos;S JOURNAL</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[var(--ink)]">
            Insights &amp; Playbooks.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--ink)]/80 max-w-2xl font-sans">
            Tactical playbooks, case studies from campus founders, and architectural breakdowns from the MITAOE entrepreneurship ecosystem.
          </p>
        </div>

        {/* Featured Story */}
        {featured && (
          <div className="mb-16">
            <div className="relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 shadow-elevated overflow-hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED ESSAY // {featured.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[var(--ink)] leading-tight mb-4">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed max-w-3xl mb-6 font-sans">
                {featured.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)]">
                <div className="flex items-center gap-4">
                  <span>BY {featured.author.name}</span>
                  <span>•</span>
                  <span>{featured.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[var(--accent)]">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <Link
                  href={`/insights/${featured.slug}`}
                  className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[var(--color-border)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                  : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-muted)] border border-[var(--color-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/insights/${item.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--accent)] p-6 shadow-soft-card hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-3">
                  <span className="text-[var(--accent)] font-semibold">{item.category}</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink)]/75 line-clamp-3 leading-relaxed mb-6 font-sans">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between font-mono text-xs text-[var(--color-muted)]">
                <span className="truncate">{item.author.name}</span>
                <span className="text-[var(--accent)] font-semibold group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
