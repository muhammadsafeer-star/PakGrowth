'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full prose prose-invert">
        <h1 className="text-3xl font-extrabold text-white mb-6">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed mt-6">
          <p>
            Welcome to PakGrowth. By accessing or using our website, audit engine, and digital business tools, you agree to be bound by these Terms of Service.
          </p>

          <h3 className="text-lg font-bold text-white">1. Audit Results & Accuracy</h3>
          <p>
            PakGrowth scores and recommendations are generated based on available public online footprints and automated inspection algorithms. Where external APIs or endpoints cannot verify data, items are tagged as "Unable to verify". Scores are provided for informational and growth strategy purposes.
          </p>

          <h3 className="text-lg font-bold text-white">2. Acceptable Use</h3>
          <p>
            Users agree not to submit fraudulent URLs or use the service for illegal or malicious activities within Pakistan or internationally.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
