'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  PAKISTAN_CITIES,
  BUSINESS_CATEGORIES,
  BUSINESS_GOALS,
} from '@/lib/constants';
import {
  Building2,
  Globe,
  Share2,
  MessageSquare,
  MapPin,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function StartAuditPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    businessName: '',
    category: 'Restaurant',
    city: 'Lahore',
    customCity: '',
    country: 'Pakistan',
    description: '',
    targetAudience: '',
    // Step 2
    hasWebsite: true,
    websiteUrl: '',
    // Step 3
    instagramUrl: '',
    facebookUrl: '',
    tiktokUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    // Step 4
    hasWhatsApp: true,
    whatsappNumber: '',
    // Step 5
    googleBusinessUrl: '',
    // Step 6
    mainGoal: 'Get more customers',
    customGoal: '',
  });

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!formData.businessName.trim()) {
        setErrorMsg('Please enter your business name.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const selectedCity = formData.city === 'Other' && formData.customCity ? formData.customCity : formData.city;
      const selectedGoal = formData.mainGoal === 'Other' && formData.customGoal ? formData.customGoal : formData.mainGoal;

      const payload = {
        businessName: formData.businessName,
        category: formData.category,
        city: selectedCity,
        country: formData.country,
        description: formData.description,
        targetAudience: formData.targetAudience,
        hasWebsite: formData.hasWebsite,
        websiteUrl: formData.hasWebsite ? formData.websiteUrl : '',
        instagramUrl: formData.instagramUrl,
        facebookUrl: formData.facebookUrl,
        tiktokUrl: formData.tiktokUrl,
        linkedinUrl: formData.linkedinUrl,
        youtubeUrl: formData.youtubeUrl,
        hasWhatsApp: formData.hasWhatsApp,
        whatsappNumber: formData.hasWhatsApp ? formData.whatsappNumber : '',
        googleBusinessUrl: formData.googleBusinessUrl,
        mainGoal: selectedGoal,
      };

      const res = await fetch('/api/audit/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.auditId) {
        throw new Error(data.error || 'Failed to complete digital audit.');
      }

      // Redirect to Audit Processing screen with auditId query
      router.push(`/audit/processing?id=${data.auditId}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'We could not analyze this business right now. Please try again.');
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, title: 'Business Info', icon: <Building2 className="w-4 h-4" /> },
    { num: 2, title: 'Website', icon: <Globe className="w-4 h-4" /> },
    { num: 3, title: 'Social Media', icon: <Share2 className="w-4 h-4" /> },
    { num: 4, title: 'WhatsApp', icon: <MessageSquare className="w-4 h-4" /> },
    { num: 5, title: 'Google Presence', icon: <MapPin className="w-4 h-4" /> },
    { num: 6, title: 'Business Goals', icon: <Target className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Step Indicator Header */}
        <div className="mb-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pakcyan-400">
            Free Digital Business Audit
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Analyze Your Business Presence
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Step {currentStep} of 6 — {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-10 flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {steps.map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < currentStep && setCurrentStep(s.num)}
              className={`flex-1 min-w-[70px] flex flex-col items-center gap-1.5 cursor-pointer ${
                s.num === currentStep
                  ? 'text-pakcyan-400 font-bold'
                  : s.num < currentStep
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  s.num === currentStep
                    ? 'bg-pakcyan-500 text-slate-950 shadow-glow-cyan'
                    : s.num < currentStep
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {s.num < currentStep ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
              </div>
              <span className="text-[11px] hidden sm:inline whitespace-nowrap">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Form Container Card */}
        <div className="bg-paknavy-800/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-card-dark">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* STEP 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ZAF Electrical Solutions / Royal Apparel PK"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      Business Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-pakcyan-400 transition-colors"
                    >
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      City in Pakistan <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-pakcyan-400 transition-colors"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.city === 'Other' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      Specify City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city name"
                      value={formData.customCity}
                      onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Short Business Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what your business sells or provides..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Website */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-white mb-4">
                    Do you have an active business website?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasWebsite: true })}
                      className={`py-4 px-6 rounded-2xl border font-bold text-center transition-all ${
                        formData.hasWebsite
                          ? 'bg-electric-600/20 border-pakcyan-400 text-pakcyan-400 shadow-glow-cyan'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Yes, I have a website
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasWebsite: false })}
                      className={`py-4 px-6 rounded-2xl border font-bold text-center transition-all ${
                        !formData.hasWebsite
                          ? 'bg-electric-600/20 border-pakcyan-400 text-pakcyan-400 shadow-glow-cyan'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      No website yet
                    </button>
                  </div>
                </div>

                {formData.hasWebsite && (
                  <div className="pt-4">
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbusiness.pk"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Our analyzer will inspect page title, HTTPS security, meta description, and contact CTAs.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Social Media */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-300 mb-2">
                  Paste your social media profile URLs below (all fields are optional):
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourbrand"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook Page URL</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/yourbrand"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">TikTok Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://tiktok.com/@yourbrand"
                    value={formData.tiktokUrl}
                    onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Company URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/company/yourbrand"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400 text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: WhatsApp */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-white mb-4">
                    Do you use WhatsApp for business customer inquiries?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasWhatsApp: true })}
                      className={`py-4 px-6 rounded-2xl border font-bold text-center transition-all ${
                        formData.hasWhatsApp
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-glow-cyan'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Yes, we use WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasWhatsApp: false })}
                      className={`py-4 px-6 rounded-2xl border font-bold text-center transition-all ${
                        !formData.hasWhatsApp
                          ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      No WhatsApp set up
                    </button>
                  </div>
                </div>

                {formData.hasWhatsApp && (
                  <div className="pt-2">
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      WhatsApp Business Number
                    </label>
                    <input
                      type="text"
                      placeholder="03001234567 or +923001234567"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      We check click-to-chat formatting (wa.me) and direct lead gateway readiness.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: Google Presence */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-white mb-2">
                    Google Business / Maps Profile URL
                  </label>
                  <p className="text-xs text-slate-300 mb-4">
                    Paste your Google Maps location link or Google Business profile link if available.
                  </p>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?q=yourbusiness"
                    value={formData.googleBusinessUrl}
                    onChange={(e) => setFormData({ ...formData, googleBusinessUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    If you don't have a Google Maps link yet, leave empty and our engine will provide step-by-step setup recommendations.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 6: Business Goals */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-white mb-4">
                    What is your primary growth goal right now?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUSINESS_GOALS.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, mainGoal: goal })}
                        className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all ${
                          formData.mainGoal === goal
                            ? 'bg-electric-600/20 border-pakcyan-400 text-pakcyan-400 shadow-glow-cyan'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.mainGoal === 'Other' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Specify Goal</label>
                    <input
                      type="text"
                      placeholder="Describe your target goal..."
                      value={formData.customGoal}
                      onChange={(e) => setFormData({ ...formData, customGoal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-pakcyan-400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Form Navigation Controls */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-bold text-sm shadow-glow-blue hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-9 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-extrabold text-base shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Presence...</span>
                    </>
                  ) : (
                    <>
                      <span>Run My Free Audit</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
