'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowUpRight, ShieldAlert, Sparkles, Zap } from 'lucide-react';

interface FixFirstCardProps {
  rank: number;
  title: string;
  action: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  isCompleted?: boolean;
  onToggleComplete?: (completed: boolean) => void;
}

export const FixFirstCard: React.FC<FixFirstCardProps> = ({
  rank,
  title,
  action,
  category,
  impact,
  effort,
  isCompleted = false,
  onToggleComplete,
}) => {
  const [completed, setCompleted] = useState(isCompleted);

  const handleToggle = () => {
    const next = !completed;
    setCompleted(next);
    if (onToggleComplete) onToggleComplete(next);
  };

  return (
    <div
      className={`relative p-5 rounded-2xl border transition-all duration-300 ${
        completed
          ? 'bg-slate-900/60 border-slate-800/60 opacity-75'
          : rank === 1
          ? 'bg-gradient-to-r from-paknavy-700 to-slate-900 border-pakcyan-500/40 shadow-glow-cyan'
          : 'bg-paknavy-700/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {/* Rank Badge */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
              rank === 1
                ? 'bg-pakcyan-500 text-slate-950 shadow-md'
                : rank === 2
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            #{rank}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {category}
              </span>
              {/* Impact Badge */}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  impact === 'High'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                }`}
              >
                IMPACT: {impact.toUpperCase()}
              </span>
              {/* Effort Badge */}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  effort === 'Low'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                EFFORT: {effort.toUpperCase()}
              </span>
            </div>

            <h4 className={`text-base font-bold mb-1 ${completed ? 'line-through text-slate-400' : 'text-white'}`}>
              {title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{action}</p>
          </div>
        </div>

        {/* Completion Checkbox */}
        <button
          onClick={handleToggle}
          className="p-2 text-slate-400 hover:text-pakcyan-400 transition-colors shrink-0"
          title={completed ? 'Mark as active' : 'Mark as completed'}
        >
          {completed ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
          ) : (
            <Circle className="w-6 h-6 hover:stroke-pakcyan-400" />
          )}
        </button>
      </div>
    </div>
  );
};
