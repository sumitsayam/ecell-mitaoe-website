import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cpu, Layers, Building2, Handshake, Lightbulb, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { initiativesData } from '@/data/initiatives';
import SectionHeader from '@/components/common/SectionHeader';

export const metadata = {
  title: 'Initiatives & Incubation Programs | E-Cell MITAOE',
  description: 'Explore MITAOE E-Cell initiatives including the Venture Incubation Studio, E-Summit, Angel Network, and Corporate Challenges.',
};

export default function InitiativesPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className="w-6 h-6 text-primary" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-primary" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-primary" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 text-primary" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-primary" />;
      default:
        return <Sparkles className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-borderToken bg-surface-pale/40">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                PROGRAMS & PATHWAYS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-deep font-display tracking-tight leading-tight mb-5">
              Long-Term Ecosystems, Not Just One-Off Events.
            </h1>
            <p className="text-base sm:text-lg text-body leading-relaxed">
              We design continuous founder pathways that take students from curious first-year engineers to venture-backed startup leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Detailed Cards */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {initiativesData.map((item, idx) => (
              <div
                key={item.id}
                className="bg-canvas rounded-card-lg border border-borderToken p-6 sm:p-8 lg:p-10 shadow-soft-card hover:shadow-elevated transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column Overview */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-pale border border-borderToken flex items-center justify-center">
                        {getIcon(item.iconType)}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-surface-pale text-primary border border-borderToken">
                          {item.category}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep font-display mt-1">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-primary/80 mb-3">
                      {item.headline}
                    </p>

                    <p className="text-sm text-body leading-relaxed mb-6">
                      {item.fullOverview}
                    </p>

                    <div className="p-3.5 rounded-xl bg-surface-pale border border-borderToken text-xs font-semibold text-primary-deep flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Impact: {item.metrics}</span>
                    </div>
                  </div>

                  {/* Right Column Deliverables */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-borderToken space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary-deep border-b border-borderToken pb-2">
                      Program Deliverables & Support
                    </h3>

                    <div className="space-y-2.5">
                      {item.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-body">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-borderToken text-xs text-muted">
                      <span className="font-bold text-body">Target Profile: </span>
                      <span>{item.whoIsItFor}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/join"
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-2xs"
                      >
                        <span>Apply / Register Interest</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
