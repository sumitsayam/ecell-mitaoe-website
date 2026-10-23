'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ArrowRight, Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenJoin?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenJoin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Initiatives', href: '/initiatives' },
    { name: 'Events', href: '/events' },
    { name: 'Our Team', href: '/team' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Resources', href: '/resources' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/92 backdrop-blur-md shadow-sm border-b border-borderToken/80 py-3'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Tagline */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            {/* Geometric Square Logo Mark from Reference */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg border-2 border-primary-deep p-1.5 flex flex-col justify-between items-center transition-transform group-hover:scale-105 bg-white shadow-2xs">
              <span className="w-full h-1 bg-primary-deep rounded-xs"></span>
              <span className="w-3/4 h-1 bg-primary-deep rounded-xs self-start"></span>
              <span className="w-full h-1 bg-primary-deep rounded-xs"></span>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-extrabold tracking-tight text-primary-deep leading-none group-hover:text-primary-secondary transition-colors font-display">
                E-CELL MITAOE
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.24em] text-body/80 uppercase mt-1 leading-none">
                ENTREPRENEURSHIP & INNOVATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-body/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              type="button"
              aria-label="Search website"
              className="w-9 h-9 flex items-center justify-center rounded-full text-body/80 hover:text-primary hover:bg-surface-pale transition-colors"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Management Portal Shortcut */}
            <Link
              href="/admin"
              className="text-xs font-semibold text-muted hover:text-primary px-2.5 py-1.5 rounded-lg hover:bg-surface-pale flex items-center gap-1.5 transition-colors"
              title="Management Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Portal</span>
            </Link>

            {/* Join E-Cell Primary Button */}
            {onOpenJoin ? (
              <button
                onClick={onOpenJoin}
                type="button"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-sm group"
              >
                <span>Join E-Cell</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <Link
                href="/join"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep active:scale-[0.98] text-white px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-sm group"
              >
                <span>Join E-Cell</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger & Search */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              type="button"
              aria-label="Search"
              className="p-2 text-primary hover:bg-surface-pale rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="p-2 text-primary hover:bg-surface-pale rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-5 border-t border-borderToken bg-white/95 backdrop-blur-lg rounded-2xl px-5 shadow-elevated animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2.5 border-b border-borderToken/50 flex items-center justify-between ${
                    isActive(link.href) ? 'text-primary' : 'text-body/85'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-muted py-2 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-primary" />
                <span>Management Portal (/admin)</span>
              </Link>

              <div className="pt-2">
                {onOpenJoin ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenJoin();
                    }}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm font-semibold shadow-sm"
                  >
                    <span>Join E-Cell</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href="/join"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm font-semibold shadow-sm"
                  >
                    <span>Join E-Cell</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
