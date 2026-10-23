'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenJoin?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenJoin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-sm border-b border-cream-200/80 py-3'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Square Logo Mark */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg border-2 border-navy-850 p-1.5 flex flex-col justify-between items-center transition-transform group-hover:scale-105 bg-white shadow-xs">
              <span className="w-full h-1 bg-navy-850 rounded-xs"></span>
              <span className="w-3/4 h-1 bg-navy-850 rounded-xs self-start"></span>
              <span className="w-full h-1 bg-navy-850 rounded-xs"></span>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-extrabold tracking-tight text-navy-850 leading-none group-hover:text-navy-700 transition-colors">
                E-CELL MITAOE
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.22em] text-navy-850/80 uppercase mt-1 leading-none">
                ENTREPRENEURSHIP & INNOVATION
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              href="#about"
              className="text-sm font-semibold text-ink/80 hover:text-navy-850 transition-colors tracking-wide"
            >
              About
            </Link>
            <Link
              href="#initiatives"
              className="text-sm font-semibold text-ink/80 hover:text-navy-850 transition-colors tracking-wide"
            >
              Initiatives
            </Link>
            <Link
              href="#events"
              className="text-sm font-semibold text-ink/80 hover:text-navy-850 transition-colors tracking-wide"
            >
              Events
            </Link>
            <Link
              href="#team"
              className="text-sm font-semibold text-ink/80 hover:text-navy-850 transition-colors tracking-wide"
            >
              Our Team
            </Link>
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              type="button"
              aria-label="Search events and initiatives"
              className="w-9 h-9 flex items-center justify-center rounded-full text-navy-850/80 hover:text-navy-850 hover:bg-cream-200/60 transition-colors"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Join E-Cell Button */}
            <button
              onClick={onOpenJoin}
              type="button"
              className="inline-flex items-center gap-2 bg-navy-850 hover:bg-navy-900 active:scale-[0.98] text-white px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm group"
            >
              <span>Join E-Cell</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Hamburger & Search */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              type="button"
              aria-label="Search"
              className="p-2 text-navy-850 hover:bg-cream-200/60 rounded-md"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="p-2 text-navy-850 hover:bg-cream-200/60 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 pb-4 border-t border-cream-200 bg-cream-50/95 backdrop-blur-lg rounded-2xl px-4 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-ink/90 py-2 border-b border-cream-200/50"
              >
                About
              </Link>
              <Link
                href="#initiatives"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-ink/90 py-2 border-b border-cream-200/50"
              >
                Initiatives
              </Link>
              <Link
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-ink/90 py-2 border-b border-cream-200/50"
              >
                Events
              </Link>
              <Link
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-ink/90 py-2 border-b border-cream-200/50"
              >
                Our Team
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin?.();
                }}
                type="button"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-navy-850 text-white py-3 rounded-xl text-sm font-semibold shadow-sm"
              >
                <span>Join E-Cell</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
