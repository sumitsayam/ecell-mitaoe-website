'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ArrowRight, Menu, X, Shield, Command } from 'lucide-react';
import { useModals } from '@/components/modals/ModalContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenJoin?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenJoin }: NavbarProps) {
  const modals = useModals();
  const handleOpenSearch = onOpenSearch || modals.openSearch;
  const handleOpenJoin = onOpenJoin || modals.openJoin;
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
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
            EC
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-[var(--ink)] leading-none font-display">
              E-Cell MIT AOE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[var(--color-muted)] uppercase mt-0.5">
              IDEAS INTO IMPACT
            </span>
          </div>
        </Link>

        {/* Center Floating Editorial Pill (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-soft-card px-3 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : 'text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--color-surface-hover)] font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search with ⌘K Badge */}
          <button
            onClick={handleOpenSearch}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)]/80 hover:bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--accent)] shadow-2xs transition-all cursor-pointer"
            title="Search events, team, resources (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--bg)] border border-[var(--color-border)] text-[10px] text-[var(--color-muted)] font-mono">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Admin Portal */}
          <Link
            href="/admin"
            className="p-2 rounded-full hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--accent)] transition-all"
            title="Management Portal"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Primary Join CTA */}
          <button
            onClick={handleOpenJoin}
            type="button"
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer ml-1"
          >
            <span>Join E-Cell</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <ThemeToggle />

          <button
            onClick={handleOpenSearch}
            type="button"
            aria-label="Search"
            className="p-2 text-[var(--ink)] hover:bg-[var(--color-surface)] rounded-lg border border-transparent hover:border-[var(--color-border)] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="p-2 text-[var(--ink)] hover:bg-[var(--color-surface)] rounded-lg border border-transparent hover:border-[var(--color-border)] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto p-4 bg-[var(--color-surface)]/95 backdrop-blur-lg border border-[var(--color-border)] rounded-2xl shadow-elevated animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-[var(--accent)] text-white font-semibold'
                      : 'text-[var(--ink)] hover:bg-[var(--color-surface-hover)]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Portal Access (/admin)</span>
            </Link>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenJoin) onOpenJoin();
                }}
                className="w-full py-3 rounded-full bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                <span>Join E-Cell MIT AOE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
