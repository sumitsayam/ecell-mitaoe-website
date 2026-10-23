'use client';

import React, { useState } from 'react';
import {
  FolderArchive,
  Search,
  Plus,
  Download,
  FileText,
  Trash2,
  X,
  ShieldAlert
} from 'lucide-react';
import { initialAdminDocuments, AdminDocument } from '@/data/adminDemo';

export default function AdminRecordsPage() {
  const [documents, setDocuments] = useState<AdminDocument[]>(initialAdminDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AdminDocument['category']>('MOU');
  const [newYear, setNewYear] = useState('2026');

  const filteredDocs = documents.filter((doc) => {
    const matchCat = categoryFilter === 'ALL' || doc.category === categoryFilter;
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: AdminDocument = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      year: newYear,
      uploadedBy: 'Sumit Sayam (President)',
      fileSize: '1.2 MB PDF',
      date: 'Oct 23, 2026'
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
    setNewTitle('');
  };

  const deleteDoc = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display">
            Records, MOUs & Financial Documents
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Historical legal agreements, audited financial logs, and CIIE approvals
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document Record</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-borderToken shadow-soft-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search document title, uploader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-borderToken bg-canvas text-body font-medium"
          >
            <option value="ALL">All Document Types</option>
            <option value="MOU">Sponsorship MOUs</option>
            <option value="REPORT">Audited Reports</option>
            <option value="BUDGET">Budgets & Ledger</option>
            <option value="APPROVAL">CIIE Approvals</option>
          </select>
        </div>

        <div className="text-xs text-muted font-medium self-end md:self-auto">
          {filteredDocs.length} records archived
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-borderToken overflow-hidden shadow-soft-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-pale border-b border-borderToken text-muted uppercase font-bold tracking-wider text-[10px]">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Academic Year</th>
                <th className="py-3 px-4">Archived By</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderToken/70">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No documents found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary-deep flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-pale text-primary border border-borderToken">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-body">
                      {doc.year}
                    </td>
                    <td className="py-3.5 px-4 text-muted">
                      {doc.uploadedBy}
                    </td>
                    <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                      {doc.fileSize}
                    </td>
                    <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                      {doc.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => alert(`Downloading verified record: ${doc.title}`)}
                          className="p-1.5 rounded-lg text-primary hover:bg-surface-pale transition-colors"
                          title="Download Document"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Record"
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

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
            onClick={() => setIsUploadOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-card-lg border border-borderToken shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-borderToken">
              <h2 className="text-base font-bold text-primary-deep">
                Upload Institutional Record
              </h2>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-muted hover:text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary-deep mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brand Battle 2026 Sponsorship Agreement"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  >
                    <option value="MOU">Sponsorship MOU</option>
                    <option value="REPORT">Audited Report</option>
                    <option value="BUDGET">Budget / Ledger</option>
                    <option value="APPROVAL">Institutional Approval</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-primary-deep mb-1">Academic Year</label>
                  <input
                    type="text"
                    required
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-borderToken bg-canvas text-body"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl border border-borderToken text-muted hover:text-body"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold"
                >
                  Upload & Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
