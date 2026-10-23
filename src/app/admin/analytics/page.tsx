'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Download,
  Calendar,
  Layers,
  PieChart
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const branchBreakdown = [
    { branch: 'Computer Engineering', count: 340, percent: 41 },
    { branch: 'IT & Software', count: 185, percent: 22 },
    { branch: 'Electronics & Telecomm (ENTC)', count: 140, percent: 17 },
    { branch: 'Mechanical Engineering', count: 95, percent: 11 },
    { branch: 'Civil & Chemical', count: 68, percent: 9 },
  ];

  const categoryPerformance = [
    { name: 'Flagship Conclaves (E-Summit)', attendees: '2,500+', rating: '4.8/5' },
    { name: 'Business Turnaround Competitions', attendees: '420+', rating: '4.9/5' },
    { name: 'MVP Hands-on Workshops', attendees: '680+', rating: '4.7/5' },
    { name: 'Angel Investor Showcases', attendees: '320+', rating: '4.9/5' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Participation & Venture Analytics
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Demographic trends, attendance patterns, and venture output metrics
          </p>
        </div>

        <button
          onClick={() => alert('Generating Comprehensive Impact CSV & PDF report...')}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-surface-pale border border-borderToken text-primary text-xs font-bold rounded-xl shadow-2xs transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Download Analytics Brief</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-card border border-borderToken shadow-soft-card">
          <div className="text-xs font-bold text-muted uppercase">Annual Participant Growth</div>
          <div className="text-3xl font-black text-primary-deep font-display mt-2">+38.4%</div>
          <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5,420 total participants engaged in 2026</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-card border border-borderToken shadow-soft-card">
          <div className="text-xs font-bold text-muted uppercase">Student Startup Conversion</div>
          <div className="text-3xl font-black text-primary-deep font-display mt-2">14 Co-Hort Startups</div>
          <p className="text-xs text-muted mt-1">
            Accepted into CIIE Pre-Incubation Cohort
          </p>
        </div>

        <div className="bg-white p-6 rounded-card border border-borderToken shadow-soft-card">
          <div className="text-xs font-bold text-muted uppercase">Inter-College Delegations</div>
          <div className="text-3xl font-black text-primary-deep font-display mt-2">42 Colleges</div>
          <p className="text-xs text-muted mt-1">
            Delegates from Pune, Mumbai, Nashik & Nagpur
          </p>
        </div>
      </div>

      {/* Branch Breakdown Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-card border border-borderToken shadow-soft-card space-y-6">
          <div className="border-b border-borderToken pb-4">
            <h2 className="text-base font-bold text-primary-deep">
              Event Participation by Engineering Branch
            </h2>
            <p className="text-xs text-muted">Distribution of attendees across MITAOE departments</p>
          </div>

          <div className="space-y-4">
            {branchBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-body">{item.branch}</span>
                  <span className="font-mono text-primary font-bold">
                    {item.count} students ({item.percent}%)
                  </span>
                </div>
                <div className="w-full bg-surface-pale h-2.5 rounded-full overflow-hidden border border-borderToken">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-card border border-borderToken shadow-soft-card space-y-5">
          <div className="border-b border-borderToken pb-4">
            <h2 className="text-base font-bold text-primary-deep">
              Category Satisfaction Rating
            </h2>
            <p className="text-xs text-muted">Post-event feedback score out of 5.0</p>
          </div>

          <div className="space-y-3">
            {categoryPerformance.map((cat, i) => (
              <div key={i} className="p-3 rounded-xl bg-canvas border border-borderToken flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary-deep">{cat.name}</div>
                  <div className="text-[11px] text-muted">{cat.attendees} lifetime attendees</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
                    ★ {cat.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
