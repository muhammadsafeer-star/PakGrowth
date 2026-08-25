'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Target, ArrowRight } from 'lucide-react';
import { GrowthPlanWeek } from '@/lib/analyzers/ai-recommendations';

interface GrowthPlanViewProps {
  planWeeks: GrowthPlanWeek[];
}

export const GrowthPlanView: React.FC<GrowthPlanViewProps> = ({ planWeeks }) => {
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedTaskKeys, setCompletedTaskKeys] = useState<Record<string, boolean>>({});

  const toggleTask = (weekNum: number, day: number) => {
    const key = `w${weekNum}_d${day}`;
    setCompletedTaskKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentWeek = planWeeks.find((w) => w.weekNumber === activeWeek) || planWeeks[0];

  return (
    <div className="bg-paknavy-700/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-card-dark">
      {/* Week Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 border-b border-slate-800 mb-6">
        {planWeeks.map((w) => (
          <button
            key={w.weekNumber}
            onClick={() => setActiveWeek(w.weekNumber)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeWeek === w.weekNumber
                ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>WEEK {w.weekNumber}</span>
          </button>
        ))}
      </div>

      {/* Week Objective Callout */}
      {currentWeek && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-pakcyan-400 uppercase tracking-wider">
                Week {currentWeek.weekNumber} Focus Strategy
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">{currentWeek.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentWeek.objective}</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-electric-600/10 text-pakcyan-400 border border-electric-600/30 text-xs font-semibold shrink-0">
              5 Action Days
            </div>
          </div>

          {/* Daily Tasks List */}
          <div className="space-y-3">
            {currentWeek.tasks.map((task) => {
              const taskKey = `w${currentWeek.weekNumber}_d${task.day}`;
              const isDone = !!completedTaskKeys[taskKey];

              return (
                <div
                  key={task.day}
                  onClick={() => toggleTask(currentWeek.weekNumber, task.day)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                    isDone
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-pakcyan-400 border border-slate-700'
                    }`}
                  >
                    D{task.day}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {task.channel}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{task.description}</p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
                      }`}
                    >
                      {isDone && <CheckCircle className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
