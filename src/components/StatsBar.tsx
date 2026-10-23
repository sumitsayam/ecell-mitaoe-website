'use client';

import React, { useState } from 'react';
import { Calendar, Users, UserCheck, Rocket, ShieldCheck } from 'lucide-react';
import { statsData, statsQuote } from '@/data/stats';

export default function StatsBar() {
  const [useVerified, setUseVerified] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar className="w-5 h-5 text-primary stroke-[2.2]" />;
      case 'users':
        return <Users className="w-5 h-5 text-primary stroke-[2.2]" />;
      case 'userCheck':
        return <UserCheck className="w-5 h-5 text-primary stroke-[2.2]" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-primary stroke-[2.2]" />;
      default:
        return <Calendar className="w-5 h-5 text-primary stroke-[2.2]" />;
    }
  };

  return (
    <section className="relative z-20 -mt-2 mb-14 md:mb-20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats Card Container */}
        <div className="bg-white/90 backdrop-blur-md border border-borderToken rounded-card-lg shadow-soft-card p-5 sm:p-7 transition-all duration-300 hover:shadow-elevated">
          {/* Top verified indicator bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-borderToken/60 text-xs">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Verified Institutional Metrics • Centre for Innovation & Incubation (CIIE)</span>
            </div>
            <button
              onClick={() => setUseVerified(!useVerified)}
              type="button"
              className="text-[11px] text-muted hover:text-primary transition-colors cursor-pointer underline underline-offset-2"
            >
              {useVerified ? 'Switch to Reference Display (XX+)' : 'Switch to Verified Real Data'}
            </button>
          </div>

          {/* 4 Metric Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
            {statsData.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex items-center gap-4 ${
                  idx !== statsData.length - 1 ? 'lg:border-r lg:border-borderToken/70 lg:pr-5' : ''
                }`}
              >
                {/* Soft Rounded Icon Container */}
                <div className="w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-surface-pale border border-borderToken flex items-center justify-center shrink-0">
                  {getIcon(stat.iconName)}
                </div>

                {/* Metric and Label */}
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-black text-primary-deep font-display tracking-tight leading-none">
                    {useVerified ? stat.verifiedValue : stat.placeholderValue}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-body/90 mt-1.5 leading-snug">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-muted leading-tight mt-0.5 line-clamp-1">
                    {stat.description}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote row */}
          <div className="mt-5 pt-4 border-t border-borderToken/60 flex items-center gap-3 text-xs sm:text-sm text-body/80 italic">
            <span className="w-6 h-[2px] bg-primary shrink-0 hidden sm:block" />
            <p>“{statsQuote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
