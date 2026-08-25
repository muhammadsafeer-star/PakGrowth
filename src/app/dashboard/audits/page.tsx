'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Building2, Calendar, FileText, ChevronRight } from 'lucide-react';

export default function SavedAuditsPage() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => {
        setStatsData(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const businesses = statsData?.businesses || [];

  return (
    <div className="bg-paknavy-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white">Saved Audits & History</h1>
            <p className="text-xs text-slate-400 mt-1">
              Review previous digital health checks and track business progression over time.
            </p>
          </div>

          <Link
            href="/audit/start"
            className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-bold text-xs sm:text-sm"
          >
            + Run New Audit
          </Link>
        </div>

        <div className="space-y-4">
          {businesses.map((b: any) => (
            <div key={b.id} className="bg-paknavy-800/80 border border-slate-800 rounded-2xl p-6 shadow-card-dark">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">{b.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{b.category}</span>
                    <span>•</span>
                    <span>{b.city}, Pakistan</span>
                  </div>
                </div>

                {b.audits && b.audits.length > 0 && (
                  <Link
                    href={`/audit/${b.audits[0].id}`}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-pakcyan-400 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <span>View Full Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              {/* Audit Runs */}
              <div className="pt-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Audit Logs ({b.audits?.length || 0})
                </span>
                {b.audits?.map((a: any) => (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300 font-semibold">{new Date(a.createdAt).toLocaleDateString()}</span>
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold border border-sky-500/30">
                        Score: {a.overallScore}/100 ({a.status})
                      </span>
                    </div>

                    <Link
                      href={`/audit/${a.id}`}
                      className="text-pakcyan-400 font-bold hover:underline"
                    >
                      Report Link →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
