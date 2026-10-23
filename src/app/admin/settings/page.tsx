'use client';

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Lock,
  Database,
  Bell,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { initialAuditLogs } from '@/data/adminDemo';

export default function AdminSettingsPage() {
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowPublicSubmissions, setAllowPublicSubmissions] = useState(true);
  const [academicYear, setAcademicYear] = useState('2026–2027');
  const [logs] = useState(initialAuditLogs);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
          Governance, Roles & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Configure academic year policies, content approval gates, and review security logs
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System configuration updated successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Settings Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-card border border-borderToken shadow-soft-card space-y-6">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <h2 className="text-base font-bold text-primary-deep border-b border-borderToken pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Security & Approval Policies</span>
            </h2>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-borderToken cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireApproval}
                  onChange={(e) => setRequireApproval(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-bold text-primary-deep">
                    Enforce CIIE Convener Approval Gate
                  </div>
                  <div className="text-[11px] text-muted leading-relaxed mt-0.5">
                    Only events and reports signed off by Faculty Convener or President are displayed publicly.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-borderToken cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPublicSubmissions}
                  onChange={(e) => setAllowPublicSubmissions(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-bold text-primary-deep">
                    Public Recruitment Registration Open
                  </div>
                  <div className="text-[11px] text-muted leading-relaxed mt-0.5">
                    Enable the public /join recruitment form for prospective student members.
                  </div>
                </div>
              </label>
            </div>

            <div className="pt-2">
              <label className="block font-bold text-primary-deep mb-1">
                Active Governance Academic Year
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body font-semibold"
              >
                <option>2026–2027 (Current)</option>
                <option>2025–2026 (Archived)</option>
                <option>2024–2025 (Archived)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-borderToken flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary-deep text-white font-bold rounded-xl transition-all shadow-sm text-xs"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* Right Role-Based Access Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-card border border-borderToken shadow-soft-card space-y-4">
            <h2 className="text-base font-bold text-primary-deep flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>Role-Based Access Control</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-canvas border border-borderToken">
                <div className="font-bold text-primary-deep">President & Convener</div>
                <div className="text-muted mt-0.5">Full administrative privilege, member deletions, financial report signing.</div>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-borderToken">
                <div className="font-bold text-primary-deep">Department Leads</div>
                <div className="text-muted mt-0.5">Publish event drafts, check-in attendees, evaluate track recruitment.</div>
              </div>
              <div className="p-3 rounded-xl bg-canvas border border-borderToken">
                <div className="font-bold text-primary-deep">Student Associates</div>
                <div className="text-muted mt-0.5">Attendance scanner check-in, logistical checklist management.</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-card bg-surface-pale border border-borderToken text-xs space-y-2">
            <div className="font-bold text-primary-deep">Production Database Setup</div>
            <p className="text-muted leading-relaxed">
              When ready to migrate from Demo Mode to production PostgreSQL / Supabase, configure <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in <code>.env.local</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
