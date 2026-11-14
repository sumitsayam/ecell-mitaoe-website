import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

export const metadata = {
  title: 'About E-Cell MIT AOE | Mission, Vision & Incubation Framework',
  description: 'Learn about MIT Academy of Engineering’s official Entrepreneurship Cell, CIIE incubation center, and student venture ecosystem.',
};

export default function AboutPage() {
  const learningTracks = [
    {
      title: 'Design Thinking & Customer Discovery',
      description: 'Master ethnographic user interviews, journey mapping, and converting ambiguous pain points into validated product requirements.'
    },
    {
      title: 'Fullstack & Hardware Prototyping',
      description: 'Hands-on access to the MITAOE Makerspace, 3D printing, embedded sensor benches, and no-code software prototype stacks.'
    },
    {
      title: 'Unit Economics & Financial Modeling',
      description: 'Understanding CAC, LTV, gross margin contribution, working capital management, and pitch-ready capitalization tables.'
    },
    {
      title: 'Venture Storytelling & Investor Pitching',
      description: 'Structuring compelling 10-slide venture narratives that resonate with angel syndicates, institutional venture funds, and grant committees.'
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Page Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-[var(--accent)] uppercase">
                ABOUT E-CELL MIT AOE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
              Catalyzing Student Ambition into Scalable Reality.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed font-normal">
              Operating under the MITAOE Centre for Innovation, Incubation and Entrepreneurship (CIIE),
              we are a student-led organization dedicated to empowering engineers to think like founders.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-14 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft-card">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center mb-5 text-[var(--accent)]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--ink)] font-display mb-3">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed">
                To build an enduring, accessible entrepreneurial ecosystem at MIT Academy of Engineering that equips every student with the technical confidence, commercial acumen, and institutional support required to build viable technology ventures.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft-card">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center mb-5 text-[var(--accent)]">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--ink)] font-display mb-3">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed">
                To position MITAOE among India’s premier collegiate breeding grounds for deep-tech, hardware, and digital innovators—fostering founders whose companies create employment, intellectual property, and real societal value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Context & CIIE */}
      <section className="py-14 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] text-[var(--accent)] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[var(--color-border)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>INSTITUTIONAL FOUNDATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-display tracking-tight leading-tight mb-5">
                Rooted in Engineering Rigor at Alandi, Pune.
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed mb-4">
                Established under the umbrella of the Maharashtra Academy of Engineering Education & Research (MAEER), MITAOE has long fostered technical ingenuity.
              </p>
              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed mb-6">
                E-Cell bridges academic research with entrepreneurial execution. Through collaboration with the MITAOE Centre for Innovation, Incubation and Entrepreneurship (CIIE), student ventures gain access to official pre-incubation grants, intellectual property counsel, and direct pathways to national incubators.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="text-2xl font-black text-[var(--accent)] font-display">3,500+</div>
                  <div className="text-xs text-[var(--color-muted)] mt-1 font-mono">Sq Ft Dedicated Prototyping Space</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="text-2xl font-black text-[var(--accent)] font-display">₹45L+</div>
                  <div className="text-xs text-[var(--color-muted)] mt-1 font-mono">Student Grants & Seed Support</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-elevated">
                <Image
                  src="/images/hero-collage-perfect.png"
                  alt="Students Collaborating in MITAOE Innovation Labs"
                  width={955}
                  height={560}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Students Learn & Build */}
      <section className="py-14 md:py-20 bg-[var(--bg)]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="CURRICULUM & EXPERIENCES"
            title="What Students Learn"
            italicWord="and Build"
            description="Our cohorts don't just study business theories. Members run live marketing budgets, write production code, and pitch turnaround models."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningTracks.map((track, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-soft-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--color-border)] flex items-center justify-center font-bold text-[var(--accent)] font-mono mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)] font-display mb-2">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink)]/75 leading-relaxed">
                    {track.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-card">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-display mb-1">
                Want to be part of the next cohort?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans">
                Applications for student organizers and founder teams are currently open.
              </p>
            </div>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 text-white px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm shrink-0"
            >
              <span>Apply to Join E-Cell</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
