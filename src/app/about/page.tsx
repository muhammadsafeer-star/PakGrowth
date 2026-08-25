'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { ShieldCheck, Target, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Logo size="lg" />
          <h1 className="text-4xl font-extrabold text-white">Empowering Pakistani SMEs & Digital Growth</h1>
          <p className="text-base text-slate-300 leading-relaxed">
            PakGrowth was founded to help small businesses, local shop owners, e-commerce brands, and freelancers in Pakistan navigate the digital economy with clarity and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-paknavy-800/80 border border-slate-800 p-8 rounded-3xl space-y-3">
            <Target className="w-8 h-8 text-pakcyan-400" />
            <h3 className="text-xl font-bold text-white">Our Product Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Most digital audit tools are designed for Western enterprises with high technical complexity. PakGrowth is purpose-built for Pakistani business reality—prioritizing WhatsApp conversion gateways, local Google Maps discovery, social media proof, and fast mobile experiences.
            </p>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-8 rounded-3xl space-y-3">
            <Award className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Non-Generic Intelligence</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We avoid superficial AI wrappers and fake data. When technical assets (such as private social bios or unverified links) cannot be reached, our engine clearly marks items as "Unable to verify" to maintain complete trust.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
