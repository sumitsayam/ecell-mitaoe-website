'use client';

import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Image from 'next/image';
import { Instagram, Play, ArrowUpRight } from 'lucide-react';

export default function InstagramWall() {
  const reels = [
    {
      id: 'reel-1',
      tag: 'EVENT RECAP',
      title: 'Brand Battle Turnaround: 45 Teams, 4 Hours, 1 Stage',
      date: 'Oct 2026',
      duration: '0:58',
      image: '/images/card-brand-battle-hires.png',
      caption: 'Watch student teams diagnose historic corporate distress cases live before agency CMOs and investors.',
      link: 'https://instagram.com',
    },
    {
      id: 'reel-2',
      tag: 'MAKERSPACE BTS',
      title: 'Inside the 24/7 Hardware & Prototyping Lab',
      date: 'Sep 2026',
      duration: '0:42',
      image: '/images/hero-collage-perfect.png',
      caption: 'Rapid PCB milling, 3D casing assembly, and sensor calibration in action for our upcoming deeptech cohort.',
      link: 'https://instagram.com',
    },
    {
      id: 'reel-3',
      tag: 'FOUNDER STORIES',
      title: 'AeroGrid Robotics: From Classroom to $750k Seed',
      date: 'Aug 2026',
      duration: '1:15',
      image: '/images/card-showcase-hires.png',
      caption: 'Alumni founders share what it really took to close their first institutional round while attending final-year engineering lectures.',
      link: 'https://instagram.com',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-canvas border-b border-borderToken">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel number="004" label="THE E-CELL IN MOTION" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight">
              Curated from our studio. <br />
              <span className="font-serif italic font-normal text-primary/80">
                Behind the scenes, speaker sessions, and founder moments.
              </span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-borderToken text-primary font-mono text-xs uppercase font-semibold tracking-wider hover:bg-primary hover:text-white transition-all shadow-2xs group shrink-0"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Follow @ecell_mitaoe</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 3 Vertical Reel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-canvas-dark border border-borderToken shadow-soft-card hover:shadow-elevated transition-all flex flex-col aspect-[4/5] sm:aspect-[9/14]"
            >
              {/* Media Poster */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={reel.image}
                  alt={reel.title}
                  fill
                  className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas-pitch via-canvas-pitch/40 to-transparent" />
              </div>

              {/* Reel Card Overlay Content */}
              <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase font-bold tracking-wider text-white">
                    {reel.tag}
                  </span>
                  <span className="font-mono text-[11px] text-slate-300">
                    {reel.duration}
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-accent-orange transition-all">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-white leading-snug mb-2 group-hover:text-accent-yellow transition-colors">
                    {reel.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed mb-3">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                    <span>{reel.date}</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <span>Watch Reel</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

