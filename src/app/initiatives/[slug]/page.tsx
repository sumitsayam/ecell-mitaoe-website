'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initiativesData } from '@/data/initiatives';
import { ArrowLeft, CheckCircle2, Users, Target, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-white text-[#102A56] flex flex-col selection:bg-[#155EEF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Back Link */}
        <Link
          href="/initiatives"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#64748B] hover:text-[#155EEF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all initiatives</span>
        </Link>

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[#D9E5F5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FF] border border-[#D9E5F5] font-mono text-[11px] font-semibold text-[#155EEF] uppercase tracking-wider mb-4">
            <span>{initiative.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#102A56] leading-[1.08] mb-4">
            {initiative.title}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#155EEF] mb-6">
            {initiative.headline}
          </p>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
            {initiative.description}
          </p>
        </header>

        {/* Metric Highlight Box */}
        <div className="mb-12 p-6 rounded-2xl bg-[#F4F8FF] border border-[#D9E5F5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
            Verified Impact Metrics:
          </div>
          <div className="font-mono font-bold text-sm sm:text-base text-[#102A56]">
            {initiative.metrics}
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-display text-[#102A56]">
              Programme Architecture
            </h2>
            <p className="text-[#334155] text-base sm:text-lg leading-relaxed">
              {initiative.fullOverview}
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-bold font-display text-[#102A56] mb-4">
                What Participants Receive
              </h3>
              <div className="space-y-3">
                {initiative.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#334155]">
                    <CheckCircle2 className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#D9E5F5] shadow-soft-card space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#155EEF] font-bold">
                <Target className="w-4 h-4" />
                <span>Eligibility</span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {initiative.whoIsItFor}
              </p>

              <div className="pt-4 border-t border-[#D9E5F5]">
                <Link
                  href="/join"
                  className="w-full py-3 rounded-full bg-[#155EEF] hover:bg-[#103B83] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
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
          <div className="pt-12 border-t border-[#D9E5F5]">
            <h3 className="text-2xl font-bold font-display text-[#102A56] mb-6">
              Other E-Cell Initiatives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherInitiatives.map((item) => (
                <Link
                  key={item.id}
                  href={`/initiatives/${item.slug}`}
                  className="p-6 rounded-2xl border border-[#D9E5F5] hover:border-[#155EEF] bg-[#F4F8FF] hover:bg-white transition-all group"
                >
                  <div className="text-[10px] font-mono uppercase text-[#155EEF] font-bold mb-2">
                    {item.category}
                  </div>
                  <h4 className="font-bold text-[#102A56] group-hover:text-[#155EEF] transition-colors text-lg mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
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

