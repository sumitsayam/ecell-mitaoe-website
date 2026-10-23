'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowUpRight, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cream-200/50 border-t border-cream-300/80 pt-16 pb-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream-300/80">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg border-2 border-navy-850 p-1.5 flex flex-col justify-between items-center bg-white shadow-xs">
                <span className="w-full h-1 bg-navy-850 rounded-xs"></span>
                <span className="w-3/4 h-1 bg-navy-850 rounded-xs self-start"></span>
                <span className="w-full h-1 bg-navy-850 rounded-xs"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-navy-850 leading-none">
                  E-CELL MITAOE
                </span>
                <span className="text-[9px] font-semibold tracking-[0.22em] text-navy-850/80 uppercase mt-1 leading-none">
                  ENTREPRENEURSHIP & INNOVATION
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed max-w-sm mb-6">
              The flagship student entrepreneurship cell of MIT Academy of Engineering, Pune.
              Nurturing student innovation, fostering startup thinking, and empowering bold builders.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-cream-300 flex items-center justify-center text-navy-850 hover:bg-navy-850 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-cream-300 flex items-center justify-center text-navy-850 hover:bg-navy-850 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-cream-300 flex items-center justify-center text-navy-850 hover:bg-navy-850 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-cream-300 flex items-center justify-center text-navy-850 hover:bg-navy-850 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-850 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#about" className="text-ink/75 hover:text-navy-850 transition-colors">
                  About E-Cell
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Signature Events
                </Link>
              </li>
              <li>
                <Link href="#initiatives" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Programs & Incubation
                </Link>
              </li>
              <li>
                <Link href="#team" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Core Team & Mentors
                </Link>
              </li>
              <li>
                <Link href="#join" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Recruitment 2026-27
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-850 mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#" className="text-ink/75 hover:text-navy-850 transition-colors">
                  MITAOE CIIE Centre
                </a>
              </li>
              <li>
                <a href="#" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Startup India Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Makerspace & Prototyping
                </a>
              </li>
              <li>
                <a href="#" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Annual Impact Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-ink/75 hover:text-navy-850 transition-colors">
                  Brand Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-850 mb-4">
              Campus Address
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-ink/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-navy-850 shrink-0 mt-0.5" />
                <span>
                  MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune, Maharashtra 412105
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-navy-850 shrink-0" />
                <a href="mailto:ecell@mitaoe.ac.in" className="hover:text-navy-850 underline">
                  ecell@mitaoe.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-navy-850 shrink-0" />
                <span>+91 (020) 3025 3500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/60">
          <p>© {new Date().getFullYear()} E-Cell MITAOE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-navy-850 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-navy-850 transition-colors">
              Terms of Participation
            </a>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-300/50 text-[11px] font-semibold text-navy-850">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified E-Cell Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
