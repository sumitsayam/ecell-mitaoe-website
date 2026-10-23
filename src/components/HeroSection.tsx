'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreEvents?: () => void;
  onDiscoverECell?: () => void;
}

export default function HeroSection({
  onExploreEvents,
  onDiscoverECell,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-2 pb-10 md:pt-6 md:pb-14 lg:pt-8 lg:pb-16 select-none">
      {/* Background Ambience: Subtle technical lines and edge accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-Right Navy Artistic Wash */}
        <div
          className="absolute -top-16 -right-16 w-96 h-96 lg:w-[540px] lg:h-[540px] opacity-20 blur-3xl rounded-full"
          style={{
            background: 'radial-gradient(circle, #092957 0%, #244B7A 45%, transparent 70%)',
          }}
        />

        {/* Diagonal Technical Lines (Subtle) */}
        <div className="absolute inset-0 bg-technical-lines opacity-25" />

        {/* Left Side Technical Vertical Marker */}
        <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[10px] tracking-widest text-muted/60 font-mono select-none">
          <span className="w-px h-12 bg-borderToken" />
          <span className="-rotate-90 origin-center whitespace-nowrap">01 / MITAOE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>

        {/* Right Side Vertical Running Text: INNOVATE / COLLABORATE / BUILD */}
        <div className="hidden xl:flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] text-muted/70 uppercase select-none rotate-90 origin-right">
          <span>INNOVATE</span>
          <span className="text-borderToken">/</span>
          <span>COLLABORATE</span>
          <span className="text-borderToken">/</span>
          <span>BUILD</span>
        </div>
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center animate-fadeIn">
            {/* Overline Architectural Frame */}
            <div className="inline-flex items-center gap-3 mb-4 sm:mb-5 relative">
              <div className="relative pl-3 pt-1">
                <div className="absolute left-0 top-0 w-full h-[1.5px] bg-primary/70" />
                <div className="absolute left-0 top-0 w-[1.5px] h-4 bg-primary/70" />
                <span className="text-[10.5px] sm:text-xs font-bold tracking-[0.22em] text-primary uppercase">
                  MIT ACADEMY OF ENGINEERING · PUNE
                </span>
              </div>
            </div>

            {/* Giant Headline: IDEAS / INTO / IMPACT. */}
            <div className="relative mb-5">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[84px] font-black tracking-tight leading-[0.92] text-primary-deep font-display">
                <span className="block drop-shadow-2xs">IDEAS</span>
                <div className="relative inline-flex items-baseline my-1">
                  <span className="stroke-text-navy font-black tracking-tight">
                    INTO
                  </span>
                  {/* Decorative 4-Point Star Sparkle */}
                  <span className="ml-3 sm:ml-4 text-primary inline-block align-middle transform -translate-y-2 sm:-translate-y-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-primary animate-pulse"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                  </span>

                  {/* Dynamic motion doodle lines */}
                  <span className="hidden sm:inline-block absolute -right-14 top-1 text-primary/40">
                    <svg width="42" height="24" viewBox="0 0 42 24" fill="none">
                      <path
                        d="M2 18L18 6M12 22L28 10M26 18L40 4"
                        stroke="#092957"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity="0.4"
                      />
                    </svg>
                  </span>
                </div>
                <span className="block drop-shadow-2xs">IMPACT.</span>
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-body max-w-lg font-normal leading-relaxed mb-8">
              A community of ambitious learners, creators, and builders.
              We drive entrepreneurship, innovation and real-world impact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {onExploreEvents ? (
                <button
                  onClick={onExploreEvents}
                  type="button"
                  className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white px-7 py-3.5 rounded-xl text-sm md:text-base font-semibold tracking-wide transition-all shadow-sm hover:shadow-md group"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white px-7 py-3.5 rounded-xl text-sm md:text-base font-semibold tracking-wide transition-all shadow-sm hover:shadow-md group"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {onDiscoverECell ? (
                <button
                  onClick={onDiscoverECell}
                  type="button"
                  className="inline-flex items-center gap-2 bg-white hover:bg-surface-pale active:scale-[0.98] text-primary border-2 border-primary/80 px-7 py-3.5 rounded-xl text-sm md:text-base font-semibold tracking-wide transition-all shadow-2xs"
                >
                  <span>Discover E-Cell</span>
                </button>
              ) : (
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-surface-pale active:scale-[0.98] text-primary border-2 border-primary/80 px-7 py-3.5 rounded-xl text-sm md:text-base font-semibold tracking-wide transition-all shadow-2xs"
                >
                  <span>Discover E-Cell</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: High-Fidelity Collage from Reference */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* The Seamless Collage */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-card-lg transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src="/images/hero-collage-perfect.png"
                  alt="E-Cell MITAOE Community, Student Founders, and Collaborative Builders - Built by Students, For the Future"
                  width={955}
                  height={560}
                  priority
                  className="w-full h-auto object-contain block"
                />
                <span className="sr-only">BUILT BY STUDENTS, FOR THE FUTURE.</span>
              </div>

              {/* Corner Coordinate Crosshairs */}
              <div className="absolute -top-3 -right-2 text-primary/30 font-mono text-xs hidden sm:block">
                +
              </div>
              <div className="absolute -bottom-3 -left-2 text-primary/30 font-mono text-xs hidden sm:block">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
