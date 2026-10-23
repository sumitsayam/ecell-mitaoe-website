'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  AlertTriangle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { initialAdminEvents, AdminEventRecord } from '@/data/adminDemo';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEventRecord[]>(initialAdminEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEventRecord | null>(null);
  const [eventToDelete, setEventToDelete] = useState<AdminEventRecord | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    date: string;
    venue: string;
    status: AdminEventRecord['status'];
    capacity: number;
    budgetAllocated: string;
    coordinator: string;
  }>({
    title: '',
    category: 'COMPETITION',
    date: '',
    venue: '',
    status: 'published',
    capacity: 100,
    budgetAllocated: '₹25,000',
    coordinator: 'Sumit Sayam'
  });

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchStatus = statusFilter === 'ALL' || ev.status === statusFilter;
      const matchSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.coordinator.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [events, statusFilter, searchQuery]);

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, ...formData }
            : ev
        )
      );
      setEditingEvent(null);
    } else {
      const newEv: AdminEventRecord = {
        id: `ev-${Date.now()}`,
        ...formData,
        registeredCount: 0,
      };
      setEvents([newEv, ...events]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'COMPETITION',
      date: '',
      venue: '',
      status: 'published',
      capacity: 100,
      budgetAllocated: '₹25,000',
      coordinator: 'Sumit Sayam'
    });
  };

  const startEdit = (ev: AdminEventRecord) => {
    setEditingEvent(ev);
    setFormData({
      title: ev.title,
      category: ev.category,
      date: ev.date,
      venue: ev.venue,
      status: ev.status,
      capacity: ev.capacity,
      budgetAllocated: ev.budgetAllocated,
      coordinator: ev.coordinator
    });
    setIsModalOpen(true);
  };

  const togglePublishStatus = (id: string) => {
    setEvents(
      events.map((ev) => {
        if (ev.id === id) {
          return {
            ...ev,
            status: ev.status === 'published' ? 'draft' : 'published'
          };
        }
        return ev;
      })
    );
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter((ev) => ev.id !== eventToDelete.id));
      setEventToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Event Management (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Create, publish, edit, and track registrations across all campus initiatives
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-borderToken shadow-soft-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, venue, coordinator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            <option value="ALL">All Publication States</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="text-xs text-muted font-medium self-end md:self-auto">
          Showing {filteredEvents.length} events
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-card border border-borderToken overflow-hidden shadow-soft-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-pale border-b border-borderToken text-muted uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 px-4">Event Title & Category</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Registrations / Capacity</th>
                <th className="py-3 px-4">Allocated Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderToken/70">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No events found matching your search.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep">{ev.title}</div>
                      <div className="text-[10px] text-primary font-bold tracking-wider uppercase mt-0.5">
                        {ev.category} • Assigned: {ev.coordinator}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-body">
                      {ev.date}
                    </td>
                    <td className="py-3.5 px-4 text-muted">
                      {ev.venue}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep">
                        {ev.registeredCount} / {ev.capacity}
                      </div>
                      <div className="w-24 bg-surface-pale h-1.5 rounded-full mt-1 overflow-hidden border border-borderToken">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${Math.min(100, (ev.registeredCount / ev.capacity) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-body">
                      {ev.budgetAllocated}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublishStatus(ev.id)}
                        type="button"
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          ev.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {ev.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(ev)}
                          className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-pale transition-colors"
                          title="Edit Event"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEventToDelete(ev)}
                          className="p-1.5 rounded-lg text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-card-lg border border-borderToken shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-borderToken mb-4">
              <h2 className="text-base font-bold text-primary-deep">
                {editingEvent ? 'Edit Event Parameters' : 'Create New Event'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-muted hover:text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary-deep mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brand Battle 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option>COMPETITION</option>
                    <option>WORKSHOP</option>
                    <option>INITIATIVE</option>
                    <option>CONCLAVE</option>
                    <option>SPEAKER SESSION</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Date String</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. November 18, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Assigned Coordinator</label>
                  <input
                    type="text"
                    required
                    value={formData.coordinator}
                    onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-borderToken text-muted hover:text-body"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold"
                >
                  {editingEvent ? 'Save Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setEventToDelete(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-card-lg border border-borderToken shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary-deep">
                Delete Event?
              </h3>
              <p className="text-xs text-muted mt-1">
                Are you sure you want to permanently delete <span className="font-bold text-body">{eventToDelete.title}</span>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setEventToDelete(null)}
                className="px-4 py-2 rounded-xl border border-borderToken text-xs font-semibold text-muted hover:text-body"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
