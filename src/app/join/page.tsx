'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, Send, CheckCircle2, Rocket, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeader from '@/components/common/SectionHeader';

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
        colors: ['#092957', '#244B7A', '#10B981', '#F59E0B']
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
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-borderToken bg-surface-pale/40">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                COHORT RECRUITMENT 2026–27
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Join the Team Building MITAOE’s Future.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              We look for curiosity, grit, and the ambition to execute. Open to students from First Year to Final Year across all branches.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Application Form & Track Info */}
      <section className="py-12 md:py-20 bg-canvas flex-1">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-card-lg border border-borderToken shadow-soft-card">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary-deep font-display">
                      Application Submitted!
                    </h2>
                    <p className="text-sm text-body leading-relaxed max-w-md mx-auto">
                      Thank you, <span className="font-bold text-primary">{fullName}</span>. Your application for the <span className="font-bold">{departmentTrack}</span> department has been recorded under PRN <span className="font-mono">{prn}</span>.
                    </p>
                    <p className="text-xs text-muted max-w-sm mx-auto">
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
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-deep transition-colors"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <h2 className="text-2xl font-bold text-primary-deep font-display">
                        Core Team Application Form
                      </h2>
                      <p className="text-xs text-muted mt-1">
                        Please provide accurate college credentials. Applications close once department quotas are met.
                      </p>
                    </div>

                    <div>
                      <label className="block font-bold text-primary-deep mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sumit Sayam"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-primary-deep mb-1">
                          MITAOE PRN / Roll No *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MIT2025CS042"
                          value={prn}
                          onChange={(e) => setPrn(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body uppercase font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-primary-deep mb-1">
                          College Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="student@mitaoe.ac.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-primary-deep mb-1">
                          Year of Study
                        </label>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                        >
                          <option>First Year (FE)</option>
                          <option>Second Year (SE)</option>
                          <option>Third Year (TE)</option>
                          <option>Final Year (BE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-primary-deep mb-1">
                          Engineering Branch
                        </label>
                        <select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                        >
                          <option>Computer Engineering</option>
                          <option>IT & Software</option>
                          <option>AI & Data Science</option>
                          <option>Electronics & Telecommunication</option>
                          <option>Mechanical Engineering</option>
                          <option>Civil Engineering</option>
                          <option>Chemical Engineering</option>
                          <option>Design (B.Des)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-primary-deep mb-1">
                        Preferred Department Track *
                      </label>
                      <select
                        value={departmentTrack}
                        onChange={(e) => setDepartmentTrack(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body font-semibold"
                      >
                        <option>Technical & Platform Development</option>
                        <option>Corporate Relations & Sponsorship</option>
                        <option>Design & Visual Branding</option>
                        <option>Events & Operations Management</option>
                        <option>Startup Incubation & Research</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-primary-deep mb-1">
                        Portfolio / GitHub / LinkedIn URLs (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://github.com/... or https://linkedin.com/in/..."
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-primary-deep mb-1">
                        Why do you want to join E-Cell MITAOE? *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us what excites you about startup building, your past projects or skills, and what you hope to accomplish..."
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body resize-none"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white py-3.5 rounded-xl font-bold transition-all shadow-sm"
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
              <div className="bg-white p-6 sm:p-7 rounded-card border border-borderToken shadow-soft-card">
                <h3 className="text-base font-bold text-primary-deep mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Available Department Tracks</span>
                </h3>
                <div className="space-y-3.5">
                  {tracks.map((t, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-canvas border border-borderToken">
                      <div className="text-xs font-bold text-primary-deep">
                        {t.name}
                      </div>
                      <div className="text-[11px] font-semibold text-primary/80 mb-1">
                        {t.role}
                      </div>
                      <p className="text-[11px] text-body/75 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-surface-pale p-6 rounded-card border border-borderToken space-y-3">
                <h3 className="text-sm font-bold text-primary-deep flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="text-xs space-y-2.5 text-body">
                  <div>
                    <span className="font-bold">Can First-Year students apply? </span>
                    <span className="text-muted">Yes, FE students are encouraged to join as junior associates.</span>
                  </div>
                  <div>
                    <span className="font-bold">What is the weekly time commitment? </span>
                    <span className="text-muted">Approximately 4–6 hours per week, ramping up around flagship events.</span>
                  </div>
                  <div>
                    <span className="font-bold">Do I need prior startup experience? </span>
                    <span className="text-muted">No. Enthusiasm, reliability, and readiness to learn are prioritized.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
