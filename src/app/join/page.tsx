'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Rocket, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JoinPage() {
  const [fullName, setFullName] = useState('');
  const [prn, setPrn] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('Second Year (SE)');
  const [branch, setBranch] = useState('Computer Engineering');
  const [departmentTrack, setDepartmentTrack] = useState('Technical & Development');
  const [links, setLinks] = useState('');
  const [statement, setStatement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#092957', '#155EEF', '#10B981', '#F59E0B']
      });
    } catch (err) {}
  };

  const tracks = [
    {
      name: 'Technical & Platform Development',
      role: 'Fullstack, AI, Mobile, Devops',
      desc: 'Build web applications, internal event management portals, automated ticketing systems, and registration pipelines.'
    },
    {
      name: 'Corporate Relations & Sponsorship',
      role: 'Partnerships, Outreach, Pitching',
      desc: 'Pitch corporate partners, secure title sponsorships for E-Summit, manage sponsor deliverables, and host VIP guests.'
    },
    {
      name: 'Design & Visual Branding',
      role: 'UI/UX, 3D Art, Motion Graphics',
      desc: 'Guard the MITAOE E-Cell visual identity, design campaign assets, stage backdrops, print collateral, and video teasers.'
    },
    {
      name: 'Events & Operations Management',
      role: 'Logistics, Stage, Hospitality',
      desc: 'Coordinate campus auditoriums, manage 500+ participant registrations, sound equipment, timing schedules, and security.'
    },
    {
      name: 'Startup Incubation & Research',
      role: 'Founder Advisory, Patents, Data',
      desc: 'Track student startup progress, assist with CIIE grant applications, organize mentor office hours, and write case studies.'
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                COHORT RECRUITMENT 2026–27
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Join the Team Building MITAOE’s Future.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              We look for curiosity, grit, and the ambition to execute. Open to students from First Year to Final Year across all branches.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Application Form & Track Info */}
      <section className="py-12 md:py-20 bg-[var(--bg)] flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--color-surface)] p-6 sm:p-10 rounded-2xl border border-[var(--color-border)] shadow-soft-card">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-xs border border-emerald-500/20">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-display">
                      Application Submitted!
                    </h2>
                    <p className="text-sm text-[var(--ink)]/80 leading-relaxed max-w-md mx-auto font-sans">
                      Thank you, <span className="font-bold text-[var(--accent)]">{fullName}</span>. Your application for the <span className="font-bold text-[var(--ink)]">{departmentTrack}</span> department has been recorded under PRN <span className="font-mono text-[var(--accent)]">{prn}</span>.
                    </p>
                    <p className="text-xs text-[var(--color-muted)] max-w-sm mx-auto font-sans">
                      Our department leads will review your portfolio and send Round 1 screening details to <span className="underline">{email}</span>.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFullName('');
                          setPrn('');
                          setEmail('');
                          setStatement('');
                          setLinks('');
                        }}
                        className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono uppercase font-bold hover:opacity-90 transition-all cursor-pointer"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--ink)] font-display">
                        Core Team Application Form
                      </h2>
                      <p className="text-xs text-[var(--color-muted)] mt-1 font-sans">
                        Please provide accurate college credentials. Applications close once department quotas are met.
                      </p>
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                        Full Name *
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
                          MITAOE PRN / Roll No *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MIT2025CS042"
                          value={prn}
                          onChange={(e) => setPrn(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] uppercase font-mono placeholder:text-[var(--color-muted)]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                          College Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="student@mitaoe.ac.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] font-mono placeholder:text-[var(--color-muted)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                      <div>
                        <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                          Engineering Branch
                        </label>
                        <select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] font-sans"
                        >
                          <option>Computer Engineering</option>
                          <option>IT &amp; Software</option>
                          <option>AI &amp; Data Science</option>
                          <option>Electronics &amp; Telecommunication</option>
                          <option>Mechanical Engineering</option>
                          <option>Civil Engineering</option>
                          <option>Chemical Engineering</option>
                          <option>Design (B.Des)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                        Preferred Department Track *
                      </label>
                      <select
                        value={departmentTrack}
                        onChange={(e) => setDepartmentTrack(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] font-sans font-semibold"
                      >
                        <option>Technical &amp; Platform Development</option>
                        <option>Corporate Relations &amp; Sponsorship</option>
                        <option>Design &amp; Visual Branding</option>
                        <option>Events &amp; Operations Management</option>
                        <option>Startup Incubation &amp; Research</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                        Portfolio / GitHub / LinkedIn URLs (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://github.com/... or https://linkedin.com/in/..."
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1 font-mono text-xs">
                        Why do you want to join E-Cell MITAOE? *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us what excites you about startup building, your past projects or skills, and what you hope to accomplish..."
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--ink)] placeholder:text-[var(--color-muted)] resize-none font-sans"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:opacity-90 active:scale-[0.98] text-white py-3.5 rounded-full font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Core Team Application</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Track Overview & Recruitment FAQs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--color-surface)] p-6 sm:p-7 rounded-2xl border border-[var(--color-border)] shadow-soft-card">
                <h3 className="text-base font-bold text-[var(--ink)] font-display mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span>Available Department Tracks</span>
                </h3>
                <div className="space-y-3.5">
                  {tracks.map((t, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--color-border)]">
                      <div className="text-xs font-bold text-[var(--ink)] font-display">
                        {t.name}
                      </div>
                      <div className="text-[11px] font-semibold text-[var(--accent)] mb-1 font-sans">
                        {t.role}
                      </div>
                      <p className="text-[11px] text-[var(--ink)]/75 leading-relaxed font-sans">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] space-y-3 shadow-soft-card">
                <h3 className="text-sm font-bold text-[var(--ink)] font-display flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="text-xs space-y-2.5 text-[var(--ink)]/80 font-sans">
                  <div>
                    <span className="font-bold text-[var(--ink)]">Can First-Year students apply? </span>
                    <span className="text-[var(--color-muted)]">Yes, FE students are encouraged to join as junior associates.</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--ink)]">What is the weekly time commitment? </span>
                    <span className="text-[var(--color-muted)]">Approximately 4–6 hours per week, ramping up around flagship events.</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--ink)]">Do I need prior startup experience? </span>
                    <span className="text-[var(--color-muted)]">No. Enthusiasm, reliability, and readiness to learn are prioritized.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
