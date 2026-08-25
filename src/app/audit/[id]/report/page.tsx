'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Printer, Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AuditReportPage() {
  const params = useParams();
  const auditId = params.id as string;

  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/audit/${auditId}`)
      .then((res) => res.json())
      .then((data) => {
        setAuditData(data.audit);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [auditId]);

  if (loading || !auditData) {
    return (
      <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">
        <p className="text-sm font-semibold">Generating Printable Report PDF...</p>
      </div>
    );
  }

  const { business, overallScore, status, scores, issues, recommendations, growthPlanData } = auditData;

  return (
    <div className="bg-slate-900 min-h-screen text-slate-900 print:bg-white print:text-black py-8 px-4 sm:px-6">
      {/* Top Action Control Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between no-print text-white">
        <Link
          href={`/audit/${auditId}`}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* REPORT PAPER CANVAS */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 text-slate-900 print:shadow-none print:border-none">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-200">
          <div>
            <Logo size="md" lightText={false} />
            <p className="text-xs font-medium text-slate-500 mt-1">
              Official Digital Presence & SME Audit Report
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Report ID: {auditId.slice(0, 8)}</span>
            <span className="text-xs text-slate-500 font-semibold">{new Date(auditData.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Business Summary */}
        <div className="py-6 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Business Name</span>
            <strong className="text-sm font-bold text-slate-900">{business.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Category</span>
            <strong className="text-sm font-bold text-slate-900">{business.category}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Location</span>
            <strong className="text-sm font-bold text-slate-900">{business.city}, Pakistan</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Primary Goal</span>
            <strong className="text-sm font-bold text-slate-900">{business.mainGoal}</strong>
          </div>
        </div>

        {/* Score Banner */}
        <div className="my-8 p-6 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">DIGITAL PRESENCE SCORE</span>
            <div className="text-5xl font-black mt-1 text-sky-400">
              {overallScore} <span className="text-xl font-normal text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-sm border border-sky-400/30">
              {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Category Scores Table */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider">
            1. Category Score Breakdown
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-slate-700">
                <th className="p-2.5 font-bold">Category</th>
                <th className="p-2.5 font-bold">Score</th>
                <th className="p-2.5 font-bold">Status</th>
                <th className="p-2.5 font-bold">Findings Summary</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((sc: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="p-2.5 font-bold text-slate-900">{sc.category}</td>
                  <td className="p-2.5 font-bold text-sky-700">{sc.score} / {sc.maxScore}</td>
                  <td className="p-2.5 font-semibold text-slate-700">{sc.status}</td>
                  <td className="p-2.5 text-slate-600">{sc.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Critical Issues Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider">
            2. Identified High-Priority Gaps
          </h3>
          <div className="space-y-2 text-xs">
            {issues.map((iss: any, idx: number) => (
              <div key={idx} className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <span className="font-bold text-rose-800">[{iss.severity.toUpperCase()}] {iss.title}</span>
                <p className="text-slate-700 mt-1">{iss.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action Items */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider">
            3. Prioritized Action Plan ("Fix First")
          </h3>
          <div className="space-y-2 text-xs">
            {recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                  #{rec.rank}
                </span>
                <div>
                  <strong className="text-slate-900 font-bold">{rec.title}</strong> (Impact: {rec.impact} • Effort: {rec.effort})
                  <p className="text-slate-600 mt-0.5">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Branding */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Generated by PakGrowth Audit Platform</span>
          <span>https://pakgrowth.pk</span>
        </div>
      </div>
    </div>
  );
}
