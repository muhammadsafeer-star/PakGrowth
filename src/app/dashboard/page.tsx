'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScoreGauge } from '@/components/ScoreGauge';
import { FixFirstCard } from '@/components/FixFirstCard';
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  PlusCircle,
  LogOut,
  FileText,
  Calendar,
  Sparkles,
  ChevronRight,
  Loader2,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((res) => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setStatsData(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="bg-paknavy-900 min-h-screen text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pakcyan-400 animate-spin" />
      </div>
    );
  }

  const { totalBusinesses = 0, totalAudits = 0, currentScore = 0, previousScore = 0, scoreImprovement = 0, latestAudit, businesses = [] } = statsData || {};

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-pakcyan-400 uppercase tracking-wider mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>SME Growth Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">User Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">
              Track your online presence metrics, score trends, and active recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/audit/start"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-bold text-xs sm:text-sm shadow-glow-blue hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Run New Business Audit</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Digital Score</span>
            <div className="text-3xl font-black text-white flex items-baseline gap-2">
              <span>{currentScore}</span>
              <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold block">Active Digital Health</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Previous Score</span>
            <div className="text-3xl font-black text-slate-300">{previousScore}</div>
            <span className="text-xs text-slate-400 block">Baseline benchmark</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Score Progression</span>
            <div className="text-3xl font-black text-sky-400 flex items-center gap-1">
              <TrendingUp className="w-6 h-6 text-pakcyan-400" />
              <span>+{Math.max(scoreImprovement, 0)} Pts</span>
            </div>
            <span className="text-xs text-pakcyan-400 block">Growth trajectory</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saved Audits</span>
            <div className="text-3xl font-black text-white">{totalAudits}</div>
            <span className="text-xs text-slate-400 block">Across {totalBusinesses} business(es)</span>
          </div>
        </div>

        {/* LATEST AUDIT BANNER */}
        {latestAudit ? (
          <div className="bg-gradient-to-r from-slate-900 via-paknavy-800 to-slate-900 border border-slate-700/80 p-8 rounded-3xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-electric-600/20 text-pakcyan-400 text-xs font-bold border border-electric-600/30">
                LATEST AUDIT REPORT
              </span>
              <h2 className="text-2xl font-black text-white">{latestAudit.business?.name || 'My Business'}</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Category: <strong>{latestAudit.business?.category}</strong> • City: <strong>{latestAudit.business?.city}</strong>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400">Digital Score</span>
                <div className="text-3xl font-black text-sky-400">{latestAudit.overallScore}/100</div>
              </div>

              <Link
                href={`/audit/${latestAudit.id}`}
                className="px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-bold text-sm shadow-glow-blue transition-all flex items-center gap-2"
              >
                <span>View Results & Plan</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 mb-10">
            <Building2 className="w-10 h-10 text-pakcyan-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Audits Run Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Run your first digital business audit to unlock your score out of 100 points and view your personalized 30-day growth plan.
            </p>
            <Link
              href="/audit/start"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-bold text-sm shadow-glow-blue"
            >
              Start Free Audit Now
            </Link>
          </div>
        )}

        {/* SAVED BUSINESSES & AUDIT HISTORY TABLE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Saved Businesses & Audit History</h3>
            <Link href="/dashboard/audits" className="text-xs font-semibold text-pakcyan-400 hover:underline">
              View All Audits
            </Link>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 rounded-2xl overflow-hidden shadow-card-dark">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Business Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Latest Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {businesses.map((b: any) => {
                    const bLatest = b.audits && b.audits.length > 0 ? b.audits[0] : null;
                    return (
                      <tr key={b.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 font-bold text-white">{b.name}</td>
                        <td className="p-4">{b.category}</td>
                        <td className="p-4">{b.city}</td>
                        <td className="p-4 font-bold text-sky-400">
                          {bLatest ? `${bLatest.overallScore}/100` : 'N/A'}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                            {bLatest?.status || 'Good'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {bLatest && (
                            <Link
                              href={`/audit/${bLatest.id}`}
                              className="text-pakcyan-400 font-bold hover:underline"
                            >
                              View Dashboard
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
