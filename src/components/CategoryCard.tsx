import React, { useState } from 'react';
import {
  Globe,
  Share2,
  MessageSquare,
  MapPin,
  Sparkles,
  Video,
  Target,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

interface Finding {
  checkName?: string;
  platform?: string;
  passed: boolean | null;
  details: string;
}

interface CategoryCardProps {
  category: string;
  score: number;
  maxScore: number;
  status: string;
  findings: Finding[];
  summary: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Website: <Globe className="w-5 h-5 text-pakcyan-400" />,
  'Social Media': <Share2 className="w-5 h-5 text-sky-400" />,
  WhatsApp: <MessageSquare className="w-5 h-5 text-emerald-400" />,
  'Google Presence': <MapPin className="w-5 h-5 text-amber-400" />,
  Branding: <Sparkles className="w-5 h-5 text-purple-400" />,
  Content: <Video className="w-5 h-5 text-indigo-400" />,
  'Conversion Readiness': <Target className="w-5 h-5 text-rose-400" />,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  score,
  maxScore,
  status,
  findings,
  summary,
}) => {
  const [expanded, setExpanded] = useState(false);
  const percentage = Math.round((score / maxScore) * 100);

  const getStatusBadge = (st: string) => {
    if (st === 'Verified' || st === 'Strong') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (st === 'Unable to verify') {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    return 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  return (
    <div className="bg-paknavy-700/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-card-dark">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            {CATEGORY_ICONS[category] || <Sparkles className="w-5 h-5 text-pakcyan-400" />}
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">{category}</h3>
            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${getStatusBadge(status)}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">
            {score} <span className="text-xs text-slate-400 font-normal">/ {maxScore}</span>
          </div>
          <span className="text-xs text-pakcyan-400 font-medium">{percentage}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            percentage >= 75
              ? 'bg-gradient-to-r from-emerald-500 to-pakcyan-400'
              : percentage >= 50
              ? 'bg-gradient-to-r from-amber-500 to-sky-400'
              : 'bg-gradient-to-r from-rose-500 to-amber-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-xs text-slate-300 mb-3">{summary}</p>

      {/* Expand/Collapse findings toggle */}
      {findings && findings.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <span>{expanded ? 'Hide Analysis Details' : `View ${findings.length} Verification Checks`}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}

      {/* Detailed findings breakdown */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
          {findings.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
              {f.passed === true && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {f.passed === false && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
              {f.passed === null && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
              <div>
                <span className="font-semibold text-slate-200">{f.checkName || f.platform || 'Check'}: </span>
                <span className="text-slate-400">{f.details}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
