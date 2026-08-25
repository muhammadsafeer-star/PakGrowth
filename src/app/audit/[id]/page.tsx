'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScoreGauge } from '@/components/ScoreGauge';
import { CategoryCard } from '@/components/CategoryCard';
import { FixFirstCard } from '@/components/FixFirstCard';
import { GrowthPlanView } from '@/components/GrowthPlanView';
import { getScoreTier } from '@/lib/constants';
import {
  Download,
  Share2,
  RefreshCw,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  MapPin,
  Target,
  FileText,
} from 'lucide-react';

export default function AuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'fixfirst' | 'growthplan'>('overview');

  useEffect(() => {
    fetch(`/api/audit/${auditId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Audit report not found.');
        return res.json();
      })
      .then((data) => {
        setAuditData(data.audit);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load audit report. Please check the audit URL or try again.');
        setLoading(false);
      });
  }, [auditId]);

  if (loading) {
    return (
      <div className="bg-paknavy-900 text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pakcyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-300">Loading Digital Score Report...</p>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="bg-paknavy-900 text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-32 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
          <h1 className="text-2xl font-bold">Audit Report Not Found</h1>
          <p className="text-sm text-slate-400">{error}</p>
          <Link
            href="/audit/start"
            className="inline-block px-6 py-3 rounded-xl bg-electric-600 text-white font-bold text-sm"
          >
            Start New Audit
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { business, overallScore, status, scores, issues, recommendations, growthPlanData } = auditData;
  const tier = getScoreTier(overallScore);

  const criticalIssues = issues.filter((i: any) => i.severity === 'Critical');
  const importantIssues = issues.filter((i: any) => i.severity === 'Important');
  const optimizationIssues = issues.filter((i: any) => i.severity === 'Optimization');

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-pakcyan-400 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Digital Presence Audit Report</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{business.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span>Category: <strong className="text-white">{business.category}</strong></span>
              <span>•</span>
              <span>City: <strong className="text-white">{business.city}, Pakistan</strong></span>
              <span>•</span>
              <span>Goal: <strong className="text-pakcyan-400">{business.mainGoal}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/audit/${auditId}/report`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-pakcyan-400" />
              <span>Download PDF Report</span>
            </Link>

            <Link
              href="/audit/start"
              className="px-4 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Re-run Audit</span>
            </Link>
          </div>
        </div>

        {/* HERO SCORE GAUGES CARD */}
        <div className="bg-gradient-to-r from-paknavy-800 via-slate-900 to-paknavy-800 border border-slate-700/80 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl relative overflow-hidden glow-effect-blue">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Gauge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                YOUR DIGITAL PRESENCE SCORE
              </span>
              <ScoreGauge score={overallScore} size="lg" showLabel={true} />
            </div>

            {/* Right: Summary & Status Overview */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-600/20 text-pakcyan-400 border border-electric-600/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Audit Assessment Complete
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Status: <span className={tier.textClass}>{status.toUpperCase()}</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                “{tier.summary}”
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-bold text-rose-400">{criticalIssues.length}</div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Critical Issues</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-bold text-amber-400">{importantIssues.length}</div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Important</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-bold text-pakcyan-400">{recommendations.length}</div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Action Steps</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Category Scores (7)
          </button>
          <button
            onClick={() => setActiveTab('fixfirst')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'fixfirst'
                ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Fix-First Priority ({recommendations.length})
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'issues'
                ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Problem Detection ({issues.length})
          </button>
          <button
            onClick={() => setActiveTab('growthplan')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'growthplan'
                ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            30-Day Growth Plan
          </button>
        </div>

        {/* TAB 1: CATEGORY SCORES OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Category Breakdown (100 Points Total)</h3>
              <span className="text-xs text-slate-400">Click any card to view detailed checks</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scores.map((sc: any) => (
                <CategoryCard
                  key={sc.id || sc.category}
                  category={sc.category}
                  score={sc.score}
                  maxScore={sc.maxScore}
                  status={sc.status}
                  findings={sc.findings || []}
                  summary={sc.summary || `${sc.category} evaluated.`}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FIX FIRST RECOMMENDATIONS */}
        {activeTab === 'fixfirst' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-2xl font-black text-white mb-1">WHAT SHOULD YOU FIX FIRST?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Recommendations ranked specifically by high sales impact, low effort, and your primary business goal ({business.mainGoal}).
              </p>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec: any) => (
                <FixFirstCard
                  key={rec.id || rec.rank}
                  rank={rec.rank}
                  title={rec.title}
                  action={rec.action}
                  category={rec.category}
                  impact={rec.impact}
                  effort={rec.effort}
                  isCompleted={rec.isCompleted}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROBLEM DETECTION */}
        {activeTab === 'issues' && (
          <div className="space-y-8">
            {/* Critical Issues Section */}
            {criticalIssues.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-extrabold text-lg">
                  <AlertOctagon className="w-5 h-5" />
                  <span>🔴 Critical Issues (Fix Immediately)</span>
                </div>
                <div className="space-y-3">
                  {criticalIssues.map((iss: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          {iss.category}
                        </span>
                        <span className="text-xs text-rose-300">Impact: High • Difficulty: {iss.difficulty}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{iss.title}</h4>
                      <p className="text-xs text-slate-300">{iss.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Issues Section */}
            {importantIssues.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
                  <AlertTriangle className="w-5 h-5" />
                  <span>🟠 Important Issues (High Performance Gain)</span>
                </div>
                <div className="space-y-3">
                  {importantIssues.map((iss: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {iss.category}
                        </span>
                        <span className="text-xs text-amber-300">Impact: Medium • Difficulty: {iss.difficulty}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{iss.title}</h4>
                      <p className="text-xs text-slate-300">{iss.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Issues Section */}
            {optimizationIssues.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-extrabold text-lg">
                  <Info className="w-5 h-5" />
                  <span>🔵 Optimization Improvements (Long-Term Growth)</span>
                </div>
                <div className="space-y-3">
                  {optimizationIssues.map((iss: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                          {iss.category}
                        </span>
                        <span className="text-xs text-sky-300">Impact: Medium • Difficulty: {iss.difficulty}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{iss.title}</h4>
                      <p className="text-xs text-slate-300">{iss.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: 30-DAY GROWTH PLAN */}
        {activeTab === 'growthplan' && (
          <div>
            <GrowthPlanView planWeeks={growthPlanData || []} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
