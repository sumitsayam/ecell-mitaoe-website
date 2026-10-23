'use client';

import React, { useState, useMemo } from 'react';
import {
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import { initialAdminApplications, AdminApplication } from '@/data/adminDemo';

export default function AdminRecruitmentPage() {
  const [applications, setApplications] = useState<AdminApplication[]>(initialAdminApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal view for candidate details
  const [selectedApp, setSelectedApp] = useState<AdminApplication | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(8);

  const tracks = [
    'ALL',
    'Technical & Development',
    'Corporate Relations',
    'Design & Media',
    'Events & Operations',
    'Startup Incubation'
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchTrack = trackFilter === 'ALL' || app.departmentTrack === trackFilter;
      const matchStatus = statusFilter === 'ALL' || app.status === statusFilter;
      const matchSearch =
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.branch.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTrack && matchStatus && matchSearch;
    });
  }, [applications, trackFilter, statusFilter, searchQuery]);

  const updateStatus = (id: string, newStatus: AdminApplication['status']) => {
    setApplications(
      applications.map((a) => {
        if (a.id === id) {
          return { ...a, status: newStatus, interviewScore: scoreInput };
        }
        return a;
      })
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus, interviewScore: scoreInput });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Recruitment & Screening Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Review applicant submissions, record interview scores, and issue acceptance offers
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted bg-white p-2.5 rounded-xl border border-borderToken shadow-2xs">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Cohort 2026–27 Pipeline</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-borderToken shadow-soft-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name, PRN, branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
            />
          </div>

          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            {tracks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            <option value="ALL">All Application States</option>
            <option value="Pending">Pending</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="text-xs text-muted font-medium self-end md:self-auto">
          {filteredApplications.length} candidates in queue
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-borderToken overflow-hidden shadow-soft-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-pale border-b border-borderToken text-muted uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">PRN / ID</th>
                <th className="py-3 px-4">Branch & Year</th>
                <th className="py-3 px-4">Target Track</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderToken/70">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep">{app.fullName}</div>
                      <div className="text-[11px] text-muted">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {app.prn}
                    </td>
                    <td className="py-3.5 px-4 text-body">
                      {app.branch} ({app.year})
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary-deep">
                      {app.departmentTrack}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Accepted'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : app.status === 'Shortlisted'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : app.status === 'Reviewing'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : app.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-surface-pale text-muted border border-borderToken'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary">
                      {app.interviewScore ? `${app.interviewScore}/10` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setScoreInput(app.interviewScore || 8);
                        }}
                        type="button"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-surface-pale hover:bg-primary hover:text-white text-primary rounded-lg text-xs font-bold transition-colors border border-borderToken"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setSelectedApp(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-card-lg border border-borderToken shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-borderToken">
              <div>
                <h2 className="text-base font-bold text-primary-deep">
                  Candidate Evaluation: {selectedApp.fullName}
                </h2>
                <div className="text-xs text-muted font-mono mt-0.5">
                  PRN: {selectedApp.prn} • Applied: {selectedApp.appliedDate}
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 text-muted hover:text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-canvas border border-borderToken">
                <div>
                  <div className="text-muted text-[10px] uppercase font-bold">Branch & Year</div>
                  <div className="font-semibold text-body">{selectedApp.branch} ({selectedApp.year})</div>
                </div>
                <div>
                  <div className="text-muted text-[10px] uppercase font-bold">Target Track</div>
                  <div className="font-semibold text-primary">{selectedApp.departmentTrack}</div>
                </div>
              </div>

              <div>
                <div className="text-muted text-[10px] uppercase font-bold mb-1">
                  Applicant Statement & Why Join E-Cell
                </div>
                <div className="p-3.5 rounded-xl bg-surface-pale border border-borderToken text-body leading-relaxed whitespace-pre-line">
                  {selectedApp.statement}
                </div>
              </div>

              <div>
                <label className="block text-muted text-[10px] uppercase font-bold mb-1">
                  Interview Assessment Rating (0 to 10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(parseFloat(e.target.value) || 0)}
                  className="w-32 px-3 py-1.5 rounded-xl border border-borderToken bg-canvas text-body font-bold text-sm"
                />
              </div>
            </div>

            {/* Decision Action Buttons */}
            <div className="pt-3 border-t border-borderToken flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-muted">
                Current status: <strong className="text-primary-deep">{selectedApp.status}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(selectedApp.id, 'Shortlisted')}
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateStatus(selectedApp.id, 'Accepted')}
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Accept Offer
                </button>
                <button
                  onClick={() => updateStatus(selectedApp.id, 'Rejected')}
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold border border-rose-200 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
