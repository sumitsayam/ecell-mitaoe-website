'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    // Front-end state demonstration with clear user notification
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#102A56] flex flex-col selection:bg-[#155EEF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="mb-14 border-b border-[#D9E5F5] pb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#155EEF] mb-3">
            <Mail className="w-4 h-4" />
            <span>010 // DISPATCH &amp; COLLABORATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#102A56]">
            Get in Touch.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#64748B] max-w-2xl font-sans">
            Connect with the E-Cell MITAOE leadership team for sponsorship inquiries, corporate challenges, speaker sessions, or student startup mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Institutional Contacts & Map Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#F4F8FF] border border-[#D9E5F5] shadow-soft-card space-y-6">
              <h2 className="text-xl font-bold font-display text-[#102A56]">
                Institutional Coordinates
              </h2>

              <div className="space-y-5 font-sans text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#102A56]">E-Cell Headquarters // CIIE</div>
                    <div className="text-[#64748B] mt-0.5 leading-relaxed">
                      MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune, Maharashtra 412105
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#102A56]">Official Email</div>
                    <a
                      href="mailto:ecell@mitaoe.ac.in"
                      className="text-[#155EEF] hover:underline font-mono text-xs mt-0.5 block"
                    >
                      ecell@mitaoe.ac.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[#D9E5F5]">
                <div className="font-mono text-xs uppercase tracking-wider text-[#64748B] mb-3">
                  Verified Social Handles:
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/ecell_mitaoe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9E5F5] hover:border-[#155EEF] text-xs font-mono text-[#102A56] hover:text-[#155EEF] transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>@ecell_mitaoe</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/ecell-mitaoe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9E5F5] hover:border-[#155EEF] text-xs font-mono text-[#102A56] hover:text-[#155EEF] transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Response Notice */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9E5F5] text-xs font-mono text-[#64748B] space-y-2">
              <div className="flex items-center gap-2 text-[#155EEF] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Response Window</span>
              </div>
              <p className="leading-relaxed">
                Inquiries are monitored by student core coordinators and faculty advisors. Typical turnaround time is 24 to 48 working hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D9E5F5] shadow-elevated">
              <h2 className="text-2xl font-bold font-display text-[#102A56] mb-2">
                Send a Dispatch
              </h2>
              <p className="text-sm text-[#64748B] mb-8 font-sans">
                Fill in the details below to reach our partnerships, events, or student founder desks.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-[#F4F8FF] border border-[#D9E5F5] text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[#155EEF] mx-auto" />
                  <h3 className="text-xl font-bold font-display text-[#102A56]">
                    Dispatch Recorded
                  </h3>
                  <p className="text-sm text-[#64748B] max-w-md mx-auto">
                    Thank you, {formData.name}. Your inquiry regarding &ldquo;{formData.subject}&rdquo; has been staged. Please note this is a front-end preview demonstration. For immediate requests, email us directly at{' '}
                    <a href="mailto:ecell@mitaoe.ac.in" className="text-[#155EEF] underline font-mono">
                      ecell@mitaoe.ac.in
                    </a>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    type="button"
                    className="px-6 py-2.5 rounded-full bg-[#155EEF] text-white font-mono text-xs uppercase tracking-wider font-semibold"
                  >
                    Submit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9E5F5] focus:border-[#155EEF] focus:outline-hidden text-sm font-sans bg-[#F4F8FF] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aditi@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#D9E5F5] focus:border-[#155EEF] focus:outline-hidden text-sm font-sans bg-[#F4F8FF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D9E5F5] focus:border-[#155EEF] focus:outline-hidden text-sm font-sans bg-[#F4F8FF] focus:bg-white transition-colors"
                    >
                      <option value="COLLABORATION">Corporate / Event Collaboration</option>
                      <option value="SPONSORSHIP">Event Sponsorship &amp; E-Summit</option>
                      <option value="SPEAKER">Guest Speaker / Mentorship Session</option>
                      <option value="INCUBATION">Student Venture Incubation Support</option>
                      <option value="GENERAL">General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                      Message / Proposal *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your proposal, event collaboration, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl border border-[#D9E5F5] focus:border-[#155EEF] focus:outline-hidden text-sm font-sans bg-[#F4F8FF] focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#155EEF] hover:bg-[#103B83] active:scale-[0.99] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

