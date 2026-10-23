'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  UserCheck,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import {
  initialAdminMembers,
  initialAdminEvents,
  initialAdminApplications,
  initialAuditLogs
} from '@/data/adminDemo';

export default function AdminOverviewDashboard() {
  const [events] = useState(initialAdminEvents);
  const [members] = useState(initialAdminMembers);
  const [applications] = useState(initialAdminApplications);
  const [auditLogs] = useState(initialAuditLogs);

  const kpis = [
    {
      title: 'Active Members',
      value: '65',
      trend: '+12% this academic year',
      icon: Users,
      href: '/admin/members',
      subtitle: 'Across 6 functional portfolios'
    },
    {
      title: 'Published Events',
      value: `${events.filter((e) => e.status === 'published').length}`,
      trend: '4 Active • 1 Draft',
      icon: Calendar,
      href: '/admin/events',
      subtitle: 'Next: Brand Battle Nov 18'
    },
    {
      title: 'Total Registrations',
      value: '828',
      trend: '+45 this week',
      icon: UserCheck,
      href: '/admin/participants',
      subtitle: '88% MITAOE student share'
    },
    {
      title: 'Pending Applications',
      value: `${applications.filter((a) => a.status === 'Pending' || a.status === 'Reviewing').length}`,
      trend: 'Recruitment cohort live',
      icon: UserPlus,
      href: '/admin/recruitment',
      subtitle: '3 shortlisted for round 2'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Leadership & Management Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            MITAOE Entrepreneurship Cell • Operational Command Center
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Event</span>
          </Link>
          <Link
            href="/admin/members"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-surface-pale border border-borderToken text-body text-xs font-bold rounded-xl shadow-2xs transition-all"
          >
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>Manage Team</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="bg-white p-5 rounded-card border border-borderToken shadow-soft-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-surface-pale text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl font-black text-primary-deep font-display tracking-tight">
                {kpi.value}
              </div>

              <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{kpi.trend}</span>
              </div>

              <div className="mt-1 text-[11px] text-muted">
                {kpi.subtitle}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Grid: Active Events & Applications Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Events Overview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-card border border-borderToken p-6 shadow-soft-card">
          <div className="flex items-center justify-between pb-4 border-b border-borderToken mb-4">
            <div>
              <h2 className="text-base font-bold text-primary-deep">
                Live & Upcoming Events
              </h2>
              <p className="text-xs text-muted">Capacity utilization and registrations</p>
            </div>
            <Link
              href="/admin/events"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Manage Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {events.slice(0, 4).map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-canvas border border-borderToken flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-pale text-primary border border-borderToken">
                      {ev.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ev.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-primary-deep mt-1">
                    {ev.title}
                  </h3>
                  <div className="text-xs text-muted mt-0.5">
                    {ev.date} • {ev.venue}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs font-bold text-primary-deep">
                    {ev.registeredCount} / {ev.capacity} Slots
                  </div>
                  <div className="w-28 bg-surface-pale h-1.5 rounded-full mt-1 overflow-hidden border border-borderToken">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${Math.min(100, (ev.registeredCount / ev.capacity) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Applications Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-card border border-borderToken p-6 shadow-soft-card">
          <div className="flex items-center justify-between pb-4 border-b border-borderToken mb-4">
            <div>
              <h2 className="text-base font-bold text-primary-deep">
                Recruitment Pipeline
              </h2>
              <p className="text-xs text-muted">Latest applicant submissions</p>
            </div>
            <Link
              href="/admin/recruitment"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl bg-canvas border border-borderToken flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-primary-deep">
                    {app.fullName}
                  </div>
                  <div className="text-[11px] text-muted">
                    {app.branch} • {app.departmentTrack}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'Shortlisted'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : app.status === 'Reviewing'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-surface-pale text-body border border-borderToken'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Audit Trail Log */}
      <div className="bg-white rounded-card border border-borderToken p-6 shadow-soft-card">
        <div className="flex items-center justify-between pb-4 border-b border-borderToken mb-4">
          <div>
            <h2 className="text-base font-bold text-primary-deep">
              Administrative Audit Log
            </h2>
            <p className="text-xs text-muted">Recent coordinator actions and content modifications</p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs font-bold text-primary hover:underline"
          >
            Full Log
          </Link>
        </div>

        <div className="divide-y divide-borderToken/60 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="font-bold text-primary-deep">{log.action}:</span>
                <span className="text-body/90">{log.details}</span>
              </div>
              <div className="text-muted text-[11px] font-mono sm:text-right pl-5 sm:pl-0">
                {log.user} • {log.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
