'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Loader2, CheckCircle2 } from 'lucide-react';

function AuditProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auditId = searchParams.get('id');

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = [
    'Connecting to PakGrowth Analysis Engine...',
    'Parsing Website HTTPS & Contact CTAs...',
    'Evaluating Social Channels (Instagram, Facebook)...',
    'Checking WhatsApp Business Gateway & Format...',
    'Verifying Google Maps & Local Search Signals...',
    'Generating Fix-First System & 30-Day Growth Plan...',
  ];

  useEffect(() => {
    if (!auditId) {
      router.push('/audit/start');
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            router.push(`/audit/${auditId}`);
          }, 800);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [auditId, router]);

  const progressPercent = Math.round(((currentStepIdx + 1) / steps.length) * 100);

  return (
    <div className="max-w-md w-full bg-paknavy-800/90 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl glow-effect-blue">
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white">Analyzing Digital Presence</h2>
        <p className="text-xs text-slate-400">
          Please wait while PakGrowth calculates your 100-point Digital Score.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span>Progress</span>
          <span className="text-pakcyan-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-electric-600 via-sky-400 to-pakcyan-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamic Status Log */}
      <div className="pt-4 border-t border-slate-800 text-left space-y-3">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
              idx === currentStepIdx
                ? 'text-pakcyan-400 font-semibold opacity-100'
                : idx < currentStepIdx
                ? 'text-emerald-400 opacity-80'
                : 'text-slate-600 opacity-40'
            }`}
          >
            {idx < currentStepIdx ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : idx === currentStepIdx ? (
              <Loader2 className="w-4 h-4 text-pakcyan-400 animate-spin shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span>{st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuditProcessingPage() {
  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-pakcyan-400 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-300">Loading audit engine...</p>
        </div>
      }>
        <AuditProcessingContent />
      </Suspense>
    </div>
  );
}
