'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('sumit.sayam@mitaoe.ac.in');
  const [password, setPassword] = useState('ecell2026demo');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/admin');
    }, 600);
  };

  const useDemoCredentials = () => {
    setEmail('sumit.sayam@mitaoe.ac.in');
    setPassword('ecell2026demo');
  };

  return (
    <main className="min-h-screen bg-canvas flex flex-col justify-center items-center p-4 antialiased text-body">
      {/* Return to public site button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors bg-white px-3 py-2 rounded-xl border border-borderToken shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Monogram & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary-deep text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
            EC
          </div>
          <h1 className="text-2xl font-black text-primary-deep font-display tracking-tight">
            E-Cell MITAOE Management Portal
          </h1>
          <p className="text-xs text-muted max-w-xs mx-auto">
            Internal operations system for coordinators, faculty conveners, and department leads.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white p-7 sm:p-8 rounded-card-lg border border-borderToken shadow-elevated space-y-5">
          {/* Demo Notice */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Demo Mode: </span>
              <span>Use the pre-filled demo administrator credentials below to enter the portal.</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-primary-deep mb-1">
                Coordinator Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body"
              />
            </div>

            <div>
              <label className="block font-bold text-primary-deep mb-1">
                Portal Security Key / Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderToken bg-canvas focus:outline-none focus:ring-1 focus:ring-primary text-body font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <button
                type="button"
                onClick={useDemoCredentials}
                className="text-primary hover:underline font-semibold"
              >
                Auto-fill Demo Account
              </button>
              <span className="text-muted">Role: President (Admin)</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-3 rounded-xl font-bold transition-all shadow-sm text-xs mt-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Command Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center text-[11px] text-muted space-y-1">
          <p>© {new Date().getFullYear()} E-Cell MITAOE • Centre for Innovation & Incubation</p>
          <p>Production security requires verified MITAOE LDAP / Supabase Auth.</p>
        </div>
      </div>
    </main>
  );
}
