'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScoreGauge } from '@/components/ScoreGauge';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Zap,
  Globe,
  MessageSquare,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle background glow gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-pakcyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-600/15 text-pakcyan-400 border border-pakcyan-500/30 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pakistan’s #1 Digital Presence Audit Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Know How Strong Your Business Is <span className="bg-gradient-to-r from-pakcyan-400 via-sky-400 to-electric-600 bg-clip-text text-transparent">Online.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Get a digital health check for your business and discover exactly what you should improve first. Built specifically for Pakistani SMEs, startups, local shops, and e-commerce brands.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/audit/start"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-bold text-base shadow-glow-blue hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  <span>Start Free Audit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-base transition-colors flex items-center justify-center gap-2"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Free Initial Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Takes Under 2 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Technical Knowledge Needed</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Visual Mockup Dashboard Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-paknavy-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glow-effect-blue">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Audit Simulation</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-electric-600/20 text-pakcyan-400 text-xs font-bold border border-electric-600/30">
                    ZAF Electrical Solutions
                  </span>
                </div>

                {/* Score Circular Gauge Readout */}
                <div className="py-6 flex flex-col items-center justify-center">
                  <ScoreGauge score={73} size="md" showLabel={true} />
                  <p className="text-xs text-slate-300 mt-2 max-w-xs text-center">
                    “Your business has a solid digital foundation, but several opportunities are being missed.”
                  </p>
                </div>

                {/* Categories Breakdown List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Digital Category Breakdown
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Website</span>
                      <span className="font-bold text-emerald-400">16 / 20</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Social Media</span>
                      <span className="font-bold text-sky-400">14 / 20</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">WhatsApp</span>
                      <span className="font-bold text-emerald-400">11 / 15</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Google Presence</span>
                      <span className="font-bold text-amber-400">10 / 15</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Branding</span>
                      <span className="font-bold text-purple-400">8 / 10</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Content & Conversion</span>
                      <span className="font-bold text-rose-400">14 / 20</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Critical Priority Action:</span>
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Fix WhatsApp CTA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Bar */}
      <section className="py-8 bg-paknavy-800/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Empowering Pakistani Business Owners Across All Major Sectors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-300">
            {['Pakistani SMEs', 'Local Retail', 'E-commerce Brands', 'Clothing & Fashion', 'Solar Companies', 'Restaurants', 'Real Estate', 'Education & Institutes', 'Digital Agencies', 'Freelancers'].map((tag, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section: 3-Step How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-paknavy-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-pakcyan-400 bg-electric-600/10 px-3 py-1 rounded-full border border-electric-600/30">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How PakGrowth Works</h2>
            <p className="text-slate-300 text-base">
              No technical setup or complex integrations needed. Get your comprehensive business audit report in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-paknavy-700/60 border border-slate-800 rounded-3xl p-8 hover:border-pakcyan-500/40 transition-all group">
              <div className="text-5xl font-black text-slate-700 group-hover:text-pakcyan-400 transition-colors mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tell Us About Your Business</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Enter your business name, category, city in Pakistan, and paste your website, Instagram, Facebook, or WhatsApp business number.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-paknavy-700/60 border border-slate-800 rounded-3xl p-8 hover:border-pakcyan-500/40 transition-all group">
              <div className="text-5xl font-black text-slate-700 group-hover:text-pakcyan-400 transition-colors mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Your Digital Score</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                PakGrowth evaluates your digital channels out of 100 points across 7 critical visibility, trust, and conversion categories.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-paknavy-700/60 border border-slate-800 rounded-3xl p-8 hover:border-pakcyan-500/40 transition-all group">
              <div className="text-5xl font-black text-slate-700 group-hover:text-pakcyan-400 transition-colors mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Improve & Grow</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Receive prioritized "Fix First" recommendations and a customized 30-day week-by-week action plan to double customer inquiries.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/audit/start"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-bold text-base shadow-glow-blue hover:scale-[1.02] transition-all"
            >
              <span>Run My Free Business Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 bg-paknavy-800/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built Specifically For The Pakistani Market</h2>
            <p className="text-slate-300 text-base">
              Generic global SEO tools ignore WhatsApp and Pakistani buyer habits. PakGrowth measures what actually converts local buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">WhatsApp Conversion Gateway</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Audits click-to-chat links, phone formatting (+92), and direct lead pathways across your digital properties.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Google Maps & Local Search</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Checks your Google Business profile verification, local city anchors in Karachi, Lahore, Islamabad, and customer review density.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Actionable "Fix First" System</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranks improvements based on business impact vs effort, ensuring you spend time only on high-return tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-gradient-to-r from-electric-700 via-electric-600 to-paknavy-800 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Ready To Discover Your Digital Score?</h2>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Join hundreds of Pakistani SMEs and business owners currently optimizing their online presence.
          </p>
          <div className="pt-2">
            <Link
              href="/audit/start"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-white text-slate-950 font-extrabold text-base shadow-2xl hover:bg-slate-100 hover:scale-[1.03] transition-all"
            >
              <span>Start Free Audit Now</span>
              <ArrowRight className="w-5 h-5 text-electric-600" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
