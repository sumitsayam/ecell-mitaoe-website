'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Send, Rocket } from 'lucide-react';

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
        colors: ['#092957', '#155EEF', '#F59E0B', '#10B981'],
      });
    } catch (err) {}
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[var(--ink)] relative flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg)] text-[var(--accent)] border border-[var(--color-border)] text-[10px] font-mono font-bold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3 text-[var(--accent)]" />
              <span>COHORT RECRUITMENT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] font-display">
              Join E-Cell MIT AOE Core Team
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1 font-sans">
              Shape campus initiatives, build startups, and empower fellow engineers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--color-border)] hover:bg-[var(--accent)] hover:text-white text-[var(--ink)] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-xs border border-emerald-500/20">
                <Rocket className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--ink)] font-display">
                Application Received!
              </h3>
              <p className="text-sm text-[var(--ink)]/80 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <span className="font-bold text-[var(--accent)]">{fullName}</span>.
                Your application for the <span className="font-bold text-[var(--ink)]">{department}</span> track has been submitted.
                Our team will reach out via <span className="underline">{email}</span> for round 1 screening.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono uppercase font-bold hover:opacity-90 transition-colors shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sumit Sayam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                    College Email / ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@mitaoe.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                    Year of Study
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] font-sans"
                  >
                    <option>First Year (FE)</option>
                    <option>Second Year (SE)</option>
                    <option>Third Year (TE)</option>
                    <option>Final Year (BE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                  Interested Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] font-sans font-medium"
                >
                  <option>Technical &amp; Development</option>
                  <option>Corporate Relations &amp; Sponsorship</option>
                  <option>Design &amp; Media</option>
                  <option>Events &amp; Operations</option>
                  <option>Incubation &amp; Research</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                  Why do you want to join? (Brief)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a sentence or two on what drives you..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)] resize-none font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
