'use client';

import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Filter
} from 'lucide-react';
import { initialAdminParticipants, AdminParticipant } from '@/data/adminDemo';

export default function AdminParticipantsPage() {
  const [participants, setParticipants] = useState<AdminParticipant[]>(initialAdminParticipants);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const eventsList = [
    'ALL',
    'Brand Battle',
    'Entrepreneurship Bootcamp & MVP Sprint',
    'Startup Showcase & Demo Day'
  ];

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const matchEvent = eventFilter === 'ALL' || p.eventTitle === eventFilter;
      const matchStatus = statusFilter === 'ALL' || p.checkInStatus === statusFilter;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.college.toLowerCase().includes(searchQuery.toLowerCase());

      return matchEvent && matchStatus && matchSearch;
    });
  }, [participants, eventFilter, statusFilter, searchQuery]);

  const toggleCheckIn = (id: string) => {
    setParticipants(
      participants.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.checkInStatus === 'Checked In'
              ? 'Registered'
              : 'Checked In';
          return { ...p, checkInStatus: nextStatus };
        }
        return p;
      })
    );
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'PRN', 'Email', 'College', 'Event', 'Status', 'Registered At'];
    const rows = filteredParticipants.map((p) => [
      p.id,
      p.name,
      p.prn,
      p.email,
      p.college,
      p.eventTitle,
      p.checkInStatus,
      p.registeredAt
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecell_participants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Participants & Attendance Check-In
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Real-time venue check-ins, attendee verification, and certification logs
          </p>
        </div>

        <button
          onClick={exportCSV}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-surface-pale border border-borderToken text-primary text-xs font-bold rounded-xl shadow-2xs transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Export Attendee CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-borderToken shadow-soft-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by attendee name, PRN, college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
            />
          </div>

          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            {eventsList.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            <option value="ALL">All Attendance States</option>
            <option value="Checked In">Checked In</option>
            <option value="Registered">Registered</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="text-xs text-muted font-medium self-end md:self-auto">
          {filteredParticipants.filter((p) => p.checkInStatus === 'Checked In').length} / {filteredParticipants.length} Checked In
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-borderToken overflow-hidden shadow-soft-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-pale border-b border-borderToken text-muted uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 px-4">Attendee Name & Email</th>
                <th className="py-3 px-4">PRN / ID</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Registered Event</th>
                <th className="py-3 px-4">Check-In Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderToken/70">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No participants found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep">{p.name}</div>
                      <div className="text-[11px] text-muted">{p.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {p.prn}
                    </td>
                    <td className="py-3.5 px-4 text-body">
                      {p.college}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary-deep">
                      {p.eventTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.checkInStatus === 'Checked In'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {p.checkInStatus === 'Checked In' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{p.checkInStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                      {p.registeredAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleCheckIn(p.id)}
                        type="button"
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          p.checkInStatus === 'Checked In'
                            ? 'bg-surface-pale text-muted hover:text-body border border-borderToken'
                            : 'bg-primary text-white hover:bg-primary-deep'
                        }`}
                      >
                        {p.checkInStatus === 'Checked In' ? 'Undo Check-In' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
