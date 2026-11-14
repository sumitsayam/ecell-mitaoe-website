'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { insightsData } from '@/data/insights';
import { ArrowRight, BookOpen, Clock, Tag, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-white text-[#102A56] flex flex-col selection:bg-[#155EEF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="mb-12 border-b border-[#D9E5F5] pb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#155EEF] mb-3">
            <BookOpen className="w-4 h-4" />
            <span>008 // THE FOUNDER&apos;S JOURNAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#102A56]">
            Insights &amp; Playbooks.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#64748B] max-w-2xl font-sans">
            Tactical playbooks, case studies from campus founders, and architectural breakdowns from the MITAOE entrepreneurship ecosystem.
          </p>
        </div>

        {/* Featured Story */}
        {featured && (
          <div className="mb-16">
            <div className="relative rounded-2xl bg-[#F4F8FF] border border-[#D9E5F5] p-6 sm:p-10 shadow-elevated overflow-hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#155EEF] font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED ESSAY // {featured.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#102A56] leading-tight mb-4">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-3xl mb-6">
                {featured.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D9E5F5]/60 font-mono text-xs text-[#64748B]">
                <div className="flex items-center gap-4">
                  <span>BY {featured.author.name}</span>
                  <span>•</span>
                  <span>{featured.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#155EEF]">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <Link
                  href={`/insights/${featured.slug}`}
                  className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#103B83] text-white px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#D9E5F5]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#102A56] text-white font-semibold shadow-xs'
                  : 'bg-[#F4F8FF] hover:bg-[#EAF2FF] text-[#64748B] border border-[#D9E5F5]'
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
              className="group flex flex-col justify-between rounded-xl bg-white border border-[#D9E5F5] hover:border-[#155EEF] p-6 shadow-soft-card hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#64748B] mb-3">
                  <span className="text-[#155EEF] font-semibold">{item.category}</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-[#102A56] group-hover:text-[#155EEF] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] line-clamp-3 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9E5F5]/60 flex items-center justify-between font-mono text-xs text-[#64748B]">
                <span className="truncate">{item.author.name}</span>
                <span className="text-[#155EEF] font-semibold group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

