'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PricingCard } from '@/components/PricingCard';

export default function PricingPage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-pakcyan-400 bg-electric-600/10 px-3 py-1 rounded-full border border-electric-600/30">
            Transparent Pricing For Pakistani SMEs
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Choose The Plan Built For Your Growth
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Start with our 100% free audit or unlock detailed AI action plans, downloadable client reports, and multi-business tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          <PricingCard
            name="FREE"
            price="Free"
            description="Perfect for testing your online presence and discovering top quick wins."
            features={[
              '1 Basic Digital Presence Audit',
              '0-100 Digital Score Calculation',
              'Top 3 Critical Issues Detected',
              'Basic Category Breakdown',
              'Standard Recommendations',
            ]}
            ctaText="Start Free Audit"
            ctaHref="/audit/start"
          />

          <PricingCard
            name="PRO"
            price="PKR 4,999"
            period="/month"
            description="Comprehensive growth engine for active Pakistani businesses & e-commerce brands."
            isPopular={true}
            features={[
              'Full Digital Presence Audit',
              'Detailed Category Breakdown (7)',
              'AI Recommendation Engine',
              'Custom 30-Day Growth Plan',
              'Downloadable PDF Reports',
              'Audit History & Progression Tracking',
              'WhatsApp & Local SEO Optimization',
            ]}
            ctaText="Upgrade to Pro"
            ctaHref="/signup"
          />

          <PricingCard
            name="BUSINESS"
            price="PKR 14,999"
            period="/month"
            description="Tailored for marketing agencies, multi-branch SMEs, and scaling startups."
            features={[
              'Multiple Businesses (Up to 10)',
              'Competitor Analysis & Benchmarking',
              'White-Label Client PDF Reports',
              'Agency Client Management',
              'Priority Audit Processing Queue',
              'Dedicated Growth Advisor Support',
            ]}
            ctaText="Contact Agency Team"
            ctaHref="/contact"
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-paknavy-800/80 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h3>
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 divide-y divide-slate-800">
            <div className="pt-4">
              <strong className="text-white font-bold text-base block mb-1">Is the initial audit completely free?</strong>
              <p className="text-slate-400">Yes! You can run a free audit for your business anytime without entering credit card or payment information.</p>
            </div>
            <div className="pt-4">
              <strong className="text-white font-bold text-base block mb-1">How are local Pakistani channels evaluated?</strong>
              <p className="text-slate-400">We inspect WhatsApp Business availability, Google Maps pins, Instagram/Facebook links, and website security specifically tailored to Pakistani consumer behavior.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
