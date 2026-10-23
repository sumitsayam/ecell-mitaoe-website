'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  AlertTriangle,
  Mail,
  Phone
} from 'lucide-react';
import { initialAdminMembers, AdminMember } from '@/data/adminDemo';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<AdminMember[]>(initialAdminMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<AdminMember | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    prn: string;
    email: string;
    department: string;
    position: string;
    year: string;
    status: AdminMember['status'];
    phone: string;
  }>({
    name: '',
    prn: '',
    email: '',
    department: 'Technical & Development',
    position: 'Junior Associate',
    year: 'Second Year (SE)',
    status: 'active',
    phone: '',
  });

  const departments = [
    'ALL',
    'Leadership',
    'Technical & Development',
    'Corporate Relations',
    'Design & Media',
    'Events & Operations',
    'Startup Incubation'
  ];

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchDept = deptFilter === 'ALL' || m.department === deptFilter;
      const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.position.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDept && matchStatus && matchSearch;
    });
  }, [members, deptFilter, statusFilter, searchQuery]);

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id
            ? { ...m, ...formData }
            : m
        )
      );
      setEditingMember(null);
    } else {
      const newMember: AdminMember = {
        id: `m-${Date.now()}`,
        ...formData,
        joinedDate: 'October 2026',
      };
      setMembers([newMember, ...members]);
    }
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      prn: '',
      email: '',
      department: 'Technical & Development',
      position: 'Junior Associate',
      year: 'Second Year (SE)',
      status: 'active',
      phone: '',
    });
  };

  const startEdit = (m: AdminMember) => {
    setEditingMember(m);
    setFormData({
      name: m.name,
      prn: m.prn,
      email: m.email,
      department: m.department,
      position: m.position,
      year: m.year,
      status: m.status,
      phone: m.phone,
    });
    setIsAddModalOpen(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(members.filter((m) => m.id !== memberToDelete.id));
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Member Management
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Official E-Cell member directory, department allocations, and active status
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingMember(null);
            setIsAddModalOpen(true);
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-borderToken shadow-soft-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, PRN, position, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
            />
          </div>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            <option value="ALL">All Status</option>
            <option value="active">Active</option>
            <option value="alumni">Alumni</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="text-xs text-muted font-medium self-end md:self-auto">
          Showing {filteredMembers.length} of {members.length} members
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-card border border-borderToken overflow-hidden shadow-soft-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-pale border-b border-borderToken text-muted uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">PRN / College ID</th>
                <th className="py-3 px-4">Department & Position</th>
                <th className="py-3 px-4">Year & Branch</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderToken/70">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep">{m.name}</div>
                      <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{m.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {m.prn}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-body">{m.position}</div>
                      <div className="text-[11px] text-muted">{m.department}</div>
                    </td>
                    <td className="py-3.5 px-4 text-muted">
                      {m.year}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          m.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : m.status === 'alumni'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-surface-pale text-muted border border-borderToken'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                      {m.joinedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(m)}
                          className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-pale transition-colors"
                          title="Edit Member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setMemberToDelete(m)}
                          className="p-1.5 rounded-lg text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Member"
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

      {/* Add / Edit Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-card-lg border border-borderToken shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-borderToken mb-4">
              <h2 className="text-base font-bold text-primary-deep">
                {editingMember ? 'Edit Member Details' : 'Add New E-Cell Member'}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-muted hover:text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary-deep mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">MITAOE PRN</label>
                  <input
                    type="text"
                    required
                    value={formData.prn}
                    onChange={(e) => setFormData({ ...formData, prn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">College Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option>Leadership</option>
                    <option>Technical & Development</option>
                    <option>Corporate Relations</option>
                    <option>Design & Media</option>
                    <option>Events & Operations</option>
                    <option>Startup Incubation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Year of Study</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option>First Year (FE)</option>
                    <option>Second Year (SE)</option>
                    <option>Third Year (TE)</option>
                    <option>Final Year (BE)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Active Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option value="active">Active</option>
                    <option value="alumni">Alumni</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-borderToken text-muted hover:text-body"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold"
                >
                  {editingMember ? 'Save Changes' : 'Create Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setMemberToDelete(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-card-lg border border-borderToken shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary-deep">
                Remove Member?
              </h3>
              <p className="text-xs text-muted mt-1">
                Are you sure you want to remove <span className="font-bold text-body">{memberToDelete.name}</span> ({memberToDelete.prn}) from the active roster?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl border border-borderToken text-xs font-semibold text-muted hover:text-body"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
