'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Instagram, Linkedin, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'COLLABORATION',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="mb-14 border-b border-[var(--color-border)] pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[var(--accent)]" />
            <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>DISPATCH &amp; COLLABORATION</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[var(--ink)]">
            Get in Touch.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--ink)]/80 max-w-2xl font-sans">
            Connect with the E-Cell MIT AOE leadership team for sponsorship inquiries, corporate challenges, speaker sessions, or student startup mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Institutional Contacts & Map Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-soft-card space-y-6">
              <h2 className="text-xl font-bold font-display text-[var(--ink)]">
                Institutional Coordinates
              </h2>

              <div className="space-y-5 font-sans text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--ink)]">E-Cell Headquarters // CIIE</div>
                    <div className="text-[var(--color-muted)] mt-0.5 leading-relaxed font-sans">
                      MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune, Maharashtra 412105
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--ink)]">Official Email</div>
                    <a
                      href="mailto:ecell@mitaoe.ac.in"
                      className="text-[var(--accent)] hover:underline font-mono text-xs mt-0.5 block"
                    >
                      ecell@mitaoe.ac.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[var(--color-border)]">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
                  Verified Social Handles:
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/ecell_mitaoe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--color-border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--ink)] hover:text-[var(--accent)] transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>@ecell_mitaoe</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/ecell-mitaoe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--color-border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--ink)] hover:text-[var(--accent)] transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Response Notice */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] space-y-2 shadow-soft-card">
              <div className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Response Window</span>
              </div>
              <p className="leading-relaxed font-sans">
                Inquiries are monitored by student core coordinators and faculty advisors. Typical turnaround time is 24 to 48 working hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-elevated">
              <h2 className="text-2xl font-bold font-display text-[var(--ink)] mb-2">
                Send a Dispatch
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-8 font-sans">
                Fill in the details below to reach our partnerships, events, or student founder desks.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-[var(--bg)] border border-[var(--color-border)] text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[var(--accent)] mx-auto" />
                  <h3 className="text-xl font-bold font-display text-[var(--ink)]">
                    Dispatch Recorded
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto font-sans">
                    Thank you, {formData.name}. Your inquiry regarding &ldquo;{formData.subject}&rdquo; has been staged. Please note this is a front-end preview demonstration. For immediate requests, email us directly at{' '}
                    <a href="mailto:ecell@mitaoe.ac.in" className="text-[var(--accent)] underline font-mono">
                      ecell@mitaoe.ac.in
                    </a>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    type="button"
                    className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer hover:opacity-90 transition-all"
                  >
                    Submit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--accent)] focus:outline-hidden text-sm font-sans bg-[var(--bg)] text-[var(--ink)] transition-colors placeholder:text-[var(--color-muted)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aditi@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--accent)] focus:outline-hidden text-sm font-sans bg-[var(--bg)] text-[var(--ink)] transition-colors placeholder:text-[var(--color-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--accent)] focus:outline-hidden text-sm font-sans bg-[var(--bg)] text-[var(--ink)] transition-colors"
                    >
                      <option value="COLLABORATION">Corporate / Event Collaboration</option>
                      <option value="SPONSORSHIP">Event Sponsorship &amp; E-Summit</option>
                      <option value="SPEAKER">Guest Speaker / Mentorship Session</option>
                      <option value="INCUBATION">Student Venture Incubation Support</option>
                      <option value="GENERAL">General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2 font-medium">
                      Message / Proposal *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your proposal, event collaboration, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--accent)] focus:outline-hidden text-sm font-sans bg-[var(--bg)] text-[var(--ink)] transition-colors placeholder:text-[var(--color-muted)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-[0.99] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
