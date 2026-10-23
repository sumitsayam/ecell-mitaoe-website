'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Twitter, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-borderToken pt-16 pb-12 text-body">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-borderToken">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg border-2 border-primary-deep p-1.5 flex flex-col justify-between items-center bg-white shadow-2xs">
                <span className="w-full h-1 bg-primary-deep rounded-xs"></span>
                <span className="w-3/4 h-1 bg-primary-deep rounded-xs self-start"></span>
                <span className="w-full h-1 bg-primary-deep rounded-xs"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-primary-deep leading-none font-display">
                  E-CELL MITAOE
                </span>
                <span className="text-[9px] font-semibold tracking-[0.22em] text-muted uppercase mt-1 leading-none">
                  ENTREPRENEURSHIP & INNOVATION
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-body/80 leading-relaxed max-w-sm mb-6">
              The flagship student entrepreneurship organization of MIT Academy of Engineering, Pune.
              Nurturing student innovation, fostering startup thinking, and empowering bold builders.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-borderToken flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-borderToken flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-borderToken flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-borderToken flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-deep mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-body/75 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-body/75 hover:text-primary transition-colors">
                  About E-Cell
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="text-body/75 hover:text-primary transition-colors">
                  Programs & Incubation
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-body/75 hover:text-primary transition-colors">
                  Events & Conclaves
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-body/75 hover:text-primary transition-colors">
                  Our Team & Faculty
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-body/75 hover:text-primary transition-colors">
                  Milestones & Archive
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-body/75 hover:text-primary transition-colors">
                  Founder Resources
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-body/75 hover:text-primary transition-colors font-semibold">
                  Join E-Cell Cohort
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-deep mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://mitaoe.ac.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-body/75 hover:text-primary transition-colors"
                >
                  MITAOE Official Portal
                </a>
              </li>
              <li>
                <span className="text-body/75">CIIE Incubation Centre</span>
              </li>
              <li>
                <span className="text-body/75">Startup India Cell</span>
              </li>
              <li>
                <span className="text-body/75">24/7 FabLab & Makerspace</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-pale border border-borderToken text-primary font-bold text-xs hover:bg-primary hover:text-white transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Management Portal (/admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-deep mb-4">
              Campus Address
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-body/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune, Maharashtra 412105
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:ecell@mitaoe.ac.in" className="hover:text-primary underline">
                  ecell@mitaoe.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 (020) 3025 3500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} E-Cell MITAOE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors">
              About CIIE
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors">
              Guidelines
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-pale text-[11px] font-semibold text-primary border border-borderToken">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified E-Cell Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
