import React from 'react';
import { getScoreTier } from '@/lib/constants';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'lg',
  showLabel = true,
}) => {
  const tier = getScoreTier(score);

  const dimensions = {
    sm: { size: 100, strokeWidth: 8, fontSize: 'text-2xl', labelSize: 'text-xs' },
    md: { size: 160, strokeWidth: 12, fontSize: 'text-4xl', labelSize: 'text-sm' },
    lg: { size: 220, strokeWidth: 16, fontSize: 'text-6xl', labelSize: 'text-base' },
  }[size];

  const center = dimensions.size / 2;
  const radius = center - dimensions.strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative flex items-center justify-center">
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="transform -rotate-90 transition-all duration-1000 ease-out"
        >
          {/* Background circle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#1E293B"
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
          />
          {/* Animated score progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={tier.colorHex}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(0,180,216,0.3)]"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tighter ${dimensions.fontSize} text-white`}>
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            out of 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <span
            className={`px-4 py-1 rounded-full text-xs sm:text-sm font-bold border ${tier.badgeClass}`}
          >
            STATUS: {tier.label.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};
