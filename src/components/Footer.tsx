import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-paknavy-900 border-t border-slate-800 text-slate-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              Know Your Digital Score. Grow Your Business. PakGrowth is Pakistan’s leading digital presence audit and automated SME growth intelligence platform.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-pakcyan-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Built for Pakistani Business Owners, SMEs & Startups
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/audit/start" className="hover:text-pakcyan-400 transition-colors">
                  Start Free Audit
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-pakcyan-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-pakcyan-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-pakcyan-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-pakcyan-400 transition-colors">
                  About PakGrowth
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pakcyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-pakcyan-400 transition-colors">
                  Client Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-pakcyan-400 transition-colors">
                  Register Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-pakcyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-pakcyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs">Security & Data Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PakGrowth Technologies Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Karachi • Lahore • Islamabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
