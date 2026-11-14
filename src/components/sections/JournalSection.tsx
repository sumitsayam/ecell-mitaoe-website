'use client';

import React, { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Lightbulb, MessageSquare, Check } from 'lucide-react';

export default function JournalSection() {
  const [votedAnswer, setVotedAnswer] = useState<number | null>(null);

  const articles = [
    {
      id: 'article-1',
      category: 'FOUNDER MINDSET',
      title: 'How to Identify Problems Worth Solving on a University Campus',
      readTime: '5 MIN READ',
      date: 'NOV 2026',
      summary: 'The best collegiate ventures emerge from solving acute, everyday frictions experienced by students, labs, and faculty rather than copying consumer trends.',
      author: 'Sumit Sayam (President)',
    },
    {
      id: 'article-2',
      category: 'STARTUP FUNDAMENTALS',
      title: 'Unit Economics 101: Modeling CAC and LTV for Pre-Revenue MVPs',
      readTime: '7 MIN READ',
      date: 'OCT 2026',
      summary: 'A simple spreadsheet framework for calculating customer acquisition payback periods and gross margins before speaking with angel investors.',
      author: 'Ananya Sharma (VP Strategy)',
    },
    {
      id: 'article-3',
      category: 'POLICY & GRANTS',
      title: 'Demystifying DPIIT Recognition & Section 80-IAC for Student Startups',
      readTime: '6 MIN READ',
      date: 'SEP 2026',
      summary: 'A step-by-step navigation guide through India’s Startup India portal, tax exemptions, and state incubation matching grants.',
      author: 'CIIE Advisory Desk',
    },
  ];

  const pollOptions = [
    'Automating lab equipment booking & component checkout',
    'Peer-to-peer textbook & hardware equipment exchange',
    'Micro-catering & meal subscriptions for hostel students',
    'Curated placement & internship interview prep database',
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-borderToken">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <SectionLabel number="005" label="THE FOUNDER'S NOTEBOOK" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight">
              Entrepreneurial thinking. <br />
              <span className="font-serif italic font-normal text-primary/80">
                Actionable frameworks, playbooks, and case studies.
              </span>
            </h2>
          </div>
          <p className="text-body text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Written by student founders, faculty mentors, and visiting venture partners. Free of generic buzzwords.
          </p>
        </div>

        {/* 3 Editorial Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((art) => (
            <div
              key={art.id}
              className="p-7 rounded-2xl bg-canvas border border-borderToken shadow-soft-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-body-muted mb-4">
                  <span className="px-2 py-0.5 rounded bg-white border border-borderToken text-primary font-bold">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-primary mb-3 leading-snug group-hover:text-accent-blue transition-colors">
                  {art.title}
                </h3>

                <p className="text-body text-xs sm:text-sm leading-relaxed mb-6">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-borderToken/70 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">{art.author}</span>
                <span className="font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Question of the Week Box */}
        <div className="rounded-2xl bg-primary text-white p-8 sm:p-10 relative overflow-hidden shadow-elevated">
          <div className="absolute right-0 top-0 w-80 h-80 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-yellow font-bold mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>QUESTION OF THE WEEK // POLL</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-4">
              &ldquo;Which daily campus bottleneck holds the strongest potential to become a viable student venture?&rdquo;
            </h3>

            <p className="text-slate-300 text-sm mb-6">
              Vote to see what fellow builders at MITAOE consider the highest-demand problem space this term:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {pollOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setVotedAnswer(idx)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between gap-3 ${
                    votedAnswer === idx
                      ? 'bg-white text-primary border-white font-bold shadow-md'
                      : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/15'
                  }`}
                >
                  <span>{opt}</span>
                  {votedAnswer === idx && <Check className="w-4 h-4 text-forest shrink-0" />}
                </button>
              ))}
            </div>

            {votedAnswer !== null && (
              <div className="text-xs font-mono text-accent-yellow flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Your vote was recorded. CIIE Maker Hours will review top problem spaces this Friday.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
