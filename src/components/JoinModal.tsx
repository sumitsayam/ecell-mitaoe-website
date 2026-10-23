'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, CheckCircle2, Send, Rocket } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [department, setDepartment] = useState('Technical & Development');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('Second Year (SE)');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B1B3D', '#2563EB', '#F59E0B', '#10B981'],
      });
    } catch (err) {
      // Fallback
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-navy-850 text-white relative flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-cream-100 text-[10px] font-bold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3 text-blue-300" />
              <span>COHORT RECRUITMENT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Join E-Cell MITAOE Core Team
            </h2>
            <p className="text-xs text-cream-200/80 mt-1">
              Shape campus initiatives, build startups, and empower fellow engineers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Rocket className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">
                Application Received!
              </h3>
              <p className="text-sm text-ink/80 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-navy-850">{fullName}</span>.
                Your application for the <span className="font-bold">{department}</span> track has been submitted.
                Our team will reach out via <span className="underline">{email}</span> for round 1 screening.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-navy-850 text-white text-xs font-bold hover:bg-navy-900 transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sumit Sayam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-850 text-ink"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    College Email / ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@mitaoe.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-850 text-ink"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-850 text-ink"
                  >
                    <option>First Year (FE)</option>
                    <option>Second Year (SE)</option>
                    <option>Third Year (TE)</option>
                    <option>Final Year (BE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Preferred Department Track
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-850 text-ink font-medium"
                >
                  <option>Technical & Development (Web, App, AI)</option>
                  <option>Corporate Relations & Sponsorships</option>
                  <option>Design & Visual Branding (UI/UX, Media)</option>
                  <option>Events & Logistics Management</option>
                  <option>Startup Incubation & Research</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">
                  Why do you want to join E-Cell MITAOE?
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your interests, past projects, or why you want to drive entrepreneurship on campus..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-850 text-ink resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-cream-300 text-ink/75 hover:bg-cream-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-navy-850 hover:bg-navy-900 text-white font-bold transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
