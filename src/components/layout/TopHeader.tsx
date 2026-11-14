'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function TopHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[var(--bg)] border-b border-[var(--line)] select-none">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display font-bold text-sm sm:text-base tracking-tight text-[var(--ink)] hover:text-[var(--accent)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
        >
          E-Cell MIT AOE
        </Link>

        {/* Navigation Links and Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-6 font-sans text-xs sm:text-sm font-medium text-[var(--ink)]">
          <nav className="hidden sm:flex items-center gap-5">
            <Link
              href="/about"
              className="text-[var(--ink)]/80 hover:text-[var(--ink)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1 py-0.5"
            >
              About
            </Link>
            <Link
              href="/initiatives"
              className="text-[var(--ink)]/80 hover:text-[var(--ink)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1 py-0.5"
            >
              Initiatives
            </Link>
            <Link
              href="/events"
              className="text-[var(--ink)]/80 hover:text-[var(--ink)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1 py-0.5"
            >
              Events
            </Link>
            <Link
              href="/team"
              className="text-[var(--ink)]/80 hover:text-[var(--ink)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1 py-0.5"
            >
              Team
            </Link>
            <Link
              href="/contact"
              className="text-[var(--ink)]/80 hover:text-[var(--ink)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1 py-0.5"
            >
              Contact
            </Link>
          </nav>

          {/* Light/Dark Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
