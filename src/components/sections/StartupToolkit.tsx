'use client';

import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { resourcesList } from '@/data/resources';
import { Download, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StartupToolkit() {
  const tools = [
    {
      id: 'tool-1',
      title: 'Business Model Canvas for Tech Ventures',
      category: 'CANVAS & STRATEGY',
      format: 'PDF & FIGMA',
      description: 'Tested 9-box business framework adapted for software, hardware, and multi-sided platform models.',
      size: '2.4 MB',
      downloadUrl: '#',
    },
    {
      id: 'tool-2',
      title: 'Standard Seed Pitch Deck Architecture',
      category: 'INVESTOR DECK',
      format: 'PPTX & KEYNOTE',
      description: '12-slide structure calibrated for Indian angel syndicates, grant committees, and campus pitch fests.',
      size: '8.4 MB',
      downloadUrl: '#',
    },
    {
      id: 'tool-3',
      title: 'DPIIT Recognition & Startup India Checklist',
      category: 'LEGAL & POLICY',
      format: 'INTERACTIVE CHECKLIST',
      description: 'Step-by-step documentation guide to qualify for Section 80-IAC tax exemptions and patent subsidies.',
      size: '1.8 MB',
      downloadUrl: '#',
    },
    {
      id: 'tool-4',
      title: 'Pre-Seed Financial Model & Cap Table Sheet',
      category: 'FINANCIAL MODEL',
      format: 'EXCEL / SHEETS',
      description: 'Plug-and-play model calculating monthly cash burn rate, CAC/LTV, runway, and founder equity dilution.',
      size: '1.2 MB',
      downloadUrl: '#',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-canvas border-b border-borderToken">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <SectionLabel number="006" label="THE STARTUP TOOLKIT" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight">
              Open founder playbooks. <br />
              <span className="font-serif italic font-normal text-primary/80">
                Templates, financial models, and legal checklists.
              </span>
            </h2>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-borderToken text-primary font-mono text-xs uppercase font-semibold tracking-wider hover:bg-primary hover:text-white transition-all shadow-2xs group shrink-0"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl bg-white border border-borderToken shadow-soft-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-body-muted mb-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">
                    {tool.format}
                  </span>
                  <span>{tool.size}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-primary mb-2.5 group-hover:text-accent-blue transition-colors leading-snug">
                  {tool.title}
                </h3>

                <p className="text-body text-xs leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-borderToken/70">
                <a
                  href={tool.downloadUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading verified resource: ${tool.title}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-canvas hover:bg-primary hover:text-white border border-borderToken text-primary font-mono text-xs uppercase font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

