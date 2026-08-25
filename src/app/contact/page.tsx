'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h1 className="text-4xl font-extrabold text-white">Get In Touch With PakGrowth</h1>
          <p className="text-slate-300 text-sm">
            Have questions about your business audit or need agency features? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-6 bg-paknavy-800/80 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white">Contact Details</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pakcyan-400" />
                <span>support@pakgrowth.pk</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+92 42 35781200 / +92 300 0000000</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Gulberg III, Lahore • Shahrah-e-Faisal, Karachi • F-7 Markaz, Islamabad</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-paknavy-800/90 border border-slate-800 p-8 rounded-3xl">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300">Thank you for reaching out. Our growth advisor will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pakcyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@business.pk"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pakcyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help your business?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pakcyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-bold text-sm shadow-glow-blue"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
