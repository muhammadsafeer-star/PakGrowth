import React from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period = '/month',
  description,
  features,
  isPopular = false,
  ctaText,
  ctaHref,
}) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        isPopular
          ? 'bg-gradient-to-b from-paknavy-700 to-slate-900 border-2 border-pakcyan-500 shadow-glow-cyan scale-[1.02]'
          : 'bg-paknavy-700/80 border border-slate-800 hover:border-slate-700'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Most Popular for SMEs
        </div>
      )}

      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        </div>

        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          {price !== 'Free' && <span className="text-sm font-medium text-slate-400">{period}</span>}
        </div>

        <div className="space-y-3 mb-8">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            What's included:
          </span>
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <div className="p-0.5 rounded-full bg-electric-600/20 text-pakcyan-400 mt-0.5 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={ctaHref}
        className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
          isPopular
            ? 'bg-gradient-to-r from-electric-600 to-pakcyan-500 text-white shadow-glow-blue hover:scale-[1.02]'
            : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
};
