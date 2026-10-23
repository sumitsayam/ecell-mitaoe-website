'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Download, Tag, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { resourcesList, ResourceItem } from '@/data/resources';
import SectionHeader from '@/components/common/SectionHeader';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'PLAYBOOK', 'TEMPLATE', 'LEGAL', 'TOOLKIT', 'GRANT'];

  const filteredResources = resourcesList.filter((r) => {
    if (selectedCategory === 'ALL') return true;
    return r.category === selectedCategory;
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
                KNOWLEDGE BASE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Tools, Playbooks & Grant Checklists.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              Curated by student founders and alumni for MITAOE engineering teams. Download pitch decks, unit economic models, and compliance playbooks.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-borderToken bg-white sticky top-16 z-30 shadow-2xs">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-body/75 hover:text-primary hover:bg-surface-pale'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-12 md:py-20 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-card border border-borderToken p-6 shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-surface-pale text-primary border border-borderToken">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {res.readTimeOrSize}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-deep group-hover:text-primary transition-colors leading-snug mb-2">
                    {res.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-body/80 leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {res.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-canvas px-2 py-0.5 rounded text-muted border border-borderToken/60"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-borderToken flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted">
                    Format: {res.format}
                  </span>
                  <button
                    onClick={() => alert(`Downloading ${res.title}`)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-pale hover:bg-primary hover:text-white text-primary text-xs font-bold transition-colors"
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

      <Footer />
    </main>
  );
}
