'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { insightsData } from '@/data/insights';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Share2, BookOpen } from 'lucide-react';

interface InsightDetailPageProps {
  params: {
    slug: string;
  };
}

export default function InsightDetailPage({ params }: InsightDetailPageProps) {
  const article = insightsData.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  const related = insightsData.filter((item) => item.slug !== params.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-[#102A56] flex flex-col selection:bg-[#155EEF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#64748B] hover:text-[#155EEF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all insights</span>
        </Link>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-[#D9E5F5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FF] border border-[#D9E5F5] font-mono text-[11px] font-semibold text-[#155EEF] uppercase tracking-wider mb-4">
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#102A56] leading-[1.1] mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#155EEF] text-white flex items-center justify-center font-bold text-xs font-mono">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-[#102A56]">{article.author.name}</div>
                <div className="text-[10px] text-[#94A3B8]">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#155EEF]" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#155EEF]" />
                {article.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-[#F4F8FF] border border-[#D9E5F5] shadow-xs">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#155EEF] font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Core Framework &amp; Takeaways</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#102A56]">
                  <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Prose */}
        <article className="prose max-w-none text-[#102A56] font-sans leading-relaxed text-base sm:text-lg space-y-6">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-[#334155] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Share & Signoff */}
        <div className="mt-12 pt-8 border-t border-[#D9E5F5] flex items-center justify-between font-mono text-xs text-[#64748B]">
          <span>E-CELL MITAOE // EDITORIAL DESK</span>
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }
            }}
            type="button"
            className="flex items-center gap-1.5 text-[#155EEF] hover:underline cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </button>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#D9E5F5]">
            <h3 className="text-xl font-bold font-display text-[#102A56] mb-6">
              More from the Founder&apos;s Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  className="p-5 rounded-xl border border-[#D9E5F5] hover:border-[#155EEF] bg-[#F4F8FF] hover:bg-white transition-all group"
                >
                  <div className="text-[10px] font-mono uppercase text-[#155EEF] font-semibold mb-2">
                    {rel.category}
                  </div>
                  <h4 className="font-bold text-[#102A56] group-hover:text-[#155EEF] transition-colors text-sm sm:text-base leading-snug mb-2">
                    {rel.title}
                  </h4>
                  <div className="font-mono text-[11px] text-[#94A3B8]">
                    {rel.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

