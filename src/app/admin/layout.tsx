'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  UserPlus,
  FolderArchive,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  AlertTriangle,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on /admin/login, don't wrap with dashboard sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Members', href: '/admin/members', icon: Users },
    { name: 'Events CMS', href: '/admin/events', icon: Calendar },
    { name: 'Participants & Attendance', href: '/admin/participants', icon: UserCheck },
    { name: 'Recruitment Applications', href: '/admin/recruitment', icon: UserPlus },
    { name: 'Records & Documents', href: '/admin/records', icon: FolderArchive },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings & Audit', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col antialiased text-body">
      {/* Demo Mode Notice Banner */}
      <div className="bg-amber-500 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between border-b border-amber-600">
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-100" />
          <span>
            <strong className="uppercase tracking-wider">Demo Mode Active:</strong> Operating against typed local mock data. Backend Supabase policies and authenticated sessions will enforce production access control.
          </span>
        </div>
        <Link
          href="/"
          className="text-xs underline hover:text-amber-100 shrink-0 hidden md:block"
        >
          Back to Public Site
        </Link>
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-borderToken flex-col justify-between shrink-0 shadow-2xs">
          <div>
            {/* Header Brand */}
            <div className="p-5 border-b border-borderToken flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-deep text-white flex items-center justify-center font-bold text-xs">
                  EC
                </div>
                <div>
                  <div className="text-xs font-bold text-primary-deep leading-none">
                    E-CELL MITAOE
                  </div>
                  <div className="text-[10px] text-muted tracking-wider uppercase mt-1 leading-none font-semibold">
                    Management Portal
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation links */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-primary text-white shadow-2xs'
                        : 'text-body/80 hover:text-primary hover:bg-surface-pale'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User profile & Public site link */}
          <div className="p-4 border-t border-borderToken space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-muted hover:text-primary hover:bg-surface-pale transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </span>
              <span className="text-[10px] font-mono bg-canvas px-1.5 py-0.5 rounded border border-borderToken">
                ↗
              </span>
            </Link>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-pale border border-borderToken">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                SS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-primary-deep truncate">
                  Sumit Sayam
                </div>
                <div className="text-[10px] text-muted truncate">
                  President • Admin
                </div>
              </div>
              <Link
                href="/admin/login"
                title="Sign Out"
                className="text-muted hover:text-rose-600 p-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Top Header */}
        <div className="lg:hidden w-full bg-white border-b border-borderToken p-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg border border-borderToken text-primary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-xs text-primary-deep uppercase tracking-wider">
              E-Cell Portal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs font-semibold text-primary px-2.5 py-1 rounded bg-surface-pale border border-borderToken"
            >
              Public Site
            </Link>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-primary-deep/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 w-64 bg-white h-full flex flex-col justify-between p-4 shadow-2xl animate-in slide-in-from-left">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-borderToken mb-4">
                  <div className="font-bold text-xs text-primary-deep uppercase tracking-wider">
                    Portal Navigation
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-muted"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          active
                            ? 'bg-primary text-white'
                            : 'text-body hover:bg-surface-pale'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-borderToken">
                <Link
                  href="/admin/login"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2 text-xs font-semibold text-rose-600 px-3 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
