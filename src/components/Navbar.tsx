'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ArrowRight, Menu, X, Shield, Command } from 'lucide-react';

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
    { name: 'Team', href: '/team' },
    { name: 'Wall of Fame', href: '/achievements' },
    { name: 'Toolkit', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#155EEF] text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
            EC
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#102A56] leading-none font-display">
              E-CELL MITAOE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase mt-0.5">
              IDEAS INTO IMPACT
            </span>
          </div>
        </Link>

        {/* Center Floating Editorial Pill (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/95 backdrop-blur-md border border-[#D9E5F5] shadow-soft-card px-3 py-1.5 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                isActive(link.href)
                  ? 'bg-[#155EEF] text-white font-semibold shadow-xs'
                  : 'text-[#102A56] hover:text-[#155EEF] hover:bg-[#F4F8FF] font-medium'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search with ⌘K Badge */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#D9E5F5] text-xs font-mono text-[#64748B] hover:text-[#155EEF] shadow-2xs transition-all cursor-pointer"
            title="Search events, team, resources (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#F4F8FF] border border-[#D9E5F5] text-[10px] text-[#64748B] font-mono">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Admin Portal */}
          <Link
            href="/admin"
            className="p-2 rounded-full hover:bg-white border border-transparent hover:border-[#D9E5F5] text-[#64748B] hover:text-[#155EEF] transition-all"
            title="Management Portal"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Primary Join CTA */}
          {onOpenJoin ? (
            <button
              onClick={onOpenJoin}
              type="button"
              className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#103B83] active:scale-95 text-white px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Join E-Cell</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </button>
          ) : (
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#103B83] active:scale-95 text-white px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <span>Join E-Cell</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </Link>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            type="button"
            aria-label="Search"
            className="p-2 text-[#102A56] hover:bg-white rounded-lg border border-transparent hover:border-[#D9E5F5] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="p-2 text-[#102A56] hover:bg-white rounded-lg border border-transparent hover:border-[#D9E5F5] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto p-4 bg-white/95 backdrop-blur-lg border border-[#D9E5F5] rounded-2xl shadow-elevated animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#155EEF] text-white font-semibold'
                    : 'text-[#102A56] hover:bg-[#F4F8FF]'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-mono text-xs uppercase tracking-wider text-[#64748B] hover:bg-[#F4F8FF] flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>Portal Access (/admin)</span>
            </Link>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenJoin) onOpenJoin();
                }}
                className="w-full py-3 rounded-full bg-[#155EEF] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                <span>Join E-Cell MITAOE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
