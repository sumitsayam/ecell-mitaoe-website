'use client';

import React, { useState } from 'react';
import { Calendar, Users, UserCheck } from 'lucide-react';
import { statsData, statsQuote } from '@/data/stats';

export default function StatsBar() {
  const [showVerified, setShowVerified] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar className="w-5 h-5 text-navy-850 stroke-[2.2]" />;
      case 'users':
        return <Users className="w-5 h-5 text-navy-850 stroke-[2.2]" />;
      case 'userCheck':
        return <UserCheck className="w-5 h-5 text-navy-850 stroke-[2.2]" />;
      default:
        return <Calendar className="w-5 h-5 text-navy-850 stroke-[2.2]" />;
    }
  };

  return (
    <section className="relative z-20 -mt-2 mb-14 md:mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats Card */}
        <div className="bg-white/85 backdrop-blur-md border border-cream-200/90 rounded-2xl md:rounded-3xl shadow-soft-card p-4 sm:p-6 lg:p-7 transition-all duration-300 hover:shadow-elevated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
            {statsData.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex items-center gap-4 ${
                  idx !== statsData.length - 1
                    ? 'lg:border-r lg:border-cream-200/80 lg:pr-6'
                    : 'lg:border-r lg:border-cream-200/80 lg:pr-6'
                }`}
              >
                {/* Soft Rounded Icon Container */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cream-150/80 border border-cream-200 flex items-center justify-center shrink-0 shadow-xs">
                  {getIcon(stat.iconName)}
                </div>

                {/* Metric and Label */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-navy-950 font-display tracking-tight">
                      {showVerified ? stat.verifiedValue : stat.placeholderValue}
                    </span>
                    <button
                      onClick={() => setShowVerified(!showVerified)}
                      title="Click to toggle verified figures vs canonical reference"
                      className="text-[10px] text-navy-850/60 hover:text-navy-850 hover:underline cursor-pointer"
                    >
                      {showVerified ? '• ref' : '• live'}
                    </button>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-ink/75 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}

            {/* 4th Column: Inspiring Quote with horizontal accent line */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-cream-200 lg:pl-6">
              <span className="w-8 h-[2px] bg-navy-850 shrink-0 hidden sm:block" />
              <p className="text-xs sm:text-sm font-medium text-ink/80 leading-relaxed italic">
                “{statsQuote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
