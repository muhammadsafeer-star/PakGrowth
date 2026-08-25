'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full prose prose-invert">
        <h1 className="text-3xl font-extrabold text-white mb-6">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed mt-6">
          <p>
            PakGrowth Technologies Pakistan ("PakGrowth", "we", "us") values your privacy and is committed to protecting the business and personal data of our users.
          </p>

          <h3 className="text-lg font-bold text-white">1. Information We Collect</h3>
          <p>
            When you run a digital presence audit on PakGrowth, we collect public business information supplied by you (Business Name, City, Category, Website URL, Social Media links, WhatsApp number, and Google Maps URL).
          </p>

          <h3 className="text-lg font-bold text-white">2. How We Use Audit Data</h3>
          <p>
            The collected public business data is used exclusively to compute your 0–100 Digital Presence Score, generate customized growth recommendations, and prepare actionable 30-day business plans. We do not sell or rent your business information to third-party advertisers.
          </p>

          <h3 className="text-lg font-bold text-white">3. Data Security</h3>
          <p>
            We implement strict data isolation and standard encryption protocols to protect saved user audits and account credentials.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
