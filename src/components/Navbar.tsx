'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, LayoutDashboard, UserCheck, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check login state from API
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => null);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paknavy-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-pakcyan-400 transition-colors">
              Home
            </Link>
            <Link href="/#how-it-works" className="hover:text-pakcyan-400 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="hover:text-pakcyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-pakcyan-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-pakcyan-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-pakcyan-400" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                Login
              </Link>
            )}

            <Link
              href="/audit/start"
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white text-sm font-semibold shadow-glow-blue hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Start Free Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paknavy-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-medium text-slate-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              About PakGrowth
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-slate-800 text-white font-medium text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-slate-800/80 text-white font-medium text-sm border border-slate-700"
              >
                Sign In to Account
              </Link>
            )}
            <Link
              href="/audit/start"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-semibold text-sm shadow-md"
            >
              Start Free Business Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
