'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  Users,
  BarChart3,
  MapPin,
  AlertTriangle,
  FileText,
  Loader2,
  TrendingUp,
  Building2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Admin access required. Please login with an admin account.');
        }
        return res.json();
      })
      .then((data) => {
        setAdminData(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-paknavy-900 min-h-screen text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (errorMsg || !adminData) {
    return (
      <div className="bg-paknavy-900 text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-32 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
          <h1 className="text-2xl font-bold">Admin Access Restricted</h1>
          <p className="text-xs text-slate-400">{errorMsg || 'You do not have permission to view admin statistics.'}</p>
          <div className="pt-2">
            <Link href="/login" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
              Sign In as Admin (admin@pakgrowth.pk)
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { totalUsers, totalAudits, avgScore, topCities, topCategories, topIssues, recentAudits, recentUsers } = adminData;

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Admin Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold w-fit mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>PROTECTED ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Platform System Analytics</h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time Pakistani business audits, user growth, top city hubs, and issue distribution.
            </p>
          </div>
        </div>

        {/* PLATFORM OVERVIEW STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registered Users</span>
            <div className="text-3xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-pakcyan-400" />
              <span>{totalUsers}</span>
            </div>
            <span className="text-xs text-slate-400">Pakistani SME accounts</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Digital Audits</span>
            <div className="text-3xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-sky-400" />
              <span>{totalAudits}</span>
            </div>
            <span className="text-xs text-slate-400">Processed score runs</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Average Score</span>
            <div className="text-3xl font-black text-amber-400 flex items-center gap-1">
              <span>{avgScore}</span>
              <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <span className="text-xs text-amber-400 font-semibold">Average Pakistani SME score</span>
          </div>

          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Active City Hub</span>
            <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{topCities[0]?.name || 'Lahore'}</span>
            </div>
            <span className="text-xs text-slate-400">Highest audit volume</span>
          </div>
        </div>

        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Top Pakistani Cities */}
          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Most Active Cities</span>
            </h3>
            <div className="space-y-3">
              {topCities.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-slate-200">{c.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                    {c.count} Audits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Business Categories */}
          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Top Business Categories</span>
            </h3>
            <div className="space-y-3">
              {topCategories.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-slate-200">{c.name}</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold border border-sky-500/30">
                    {c.count} Audits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Common Digital Issues */}
          <div className="bg-paknavy-800/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Most Common Gaps</span>
            </h3>
            <div className="space-y-3">
              {topIssues.map((iss: any, i: number) => (
                <div key={i} className="flex flex-col text-xs p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 truncate">{iss.title}</span>
                  <span className="text-[11px] text-slate-400">{iss.count} occurrences detected</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT AUDIT ACTIVITY STREAM */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Recent Digital Audits Activity Stream</h3>
          <div className="bg-paknavy-800/80 border border-slate-800 rounded-2xl overflow-hidden shadow-card-dark">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Business</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentAudits.map((a: any) => (
                    <tr key={a.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 font-bold text-white">{a.business?.name}</td>
                      <td className="p-4">{a.business?.category}</td>
                      <td className="p-4">{a.business?.city}</td>
                      <td className="p-4 font-bold text-sky-400">{a.overallScore}/100</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                          {a.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <Link href={`/audit/${a.id}`} className="text-pakcyan-400 font-bold hover:underline">
                          View Report →
                        </Link>
                      </td>
                    </tr>
                  ))}
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
