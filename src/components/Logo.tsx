import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  lightText = true,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 36, text: 'text-2xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 48, text: 'text-3xl', badge: 'text-xs px-2.5 py-1' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* PakGrowth Stylized Logo Icon: P + Upward Check Arrow + Digital Node Shield */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(0,180,216,0.4)]"
        >
          {/* Shield Outline */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="10"
            fill="url(#logo_bg_grad)"
            stroke="url(#logo_border_grad)"
            strokeWidth="1.5"
          />
          {/* Stylized P with upward growth check vector */}
          <path
            d="M14 31V13C14 13 19 13 23.5 13C27 13 29.5 15 29.5 18.5C29.5 22 27 24 23.5 24H14"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upward Growth Checkmark Accent */}
          <path
            d="M20 25L26 31L33 19"
            stroke="url(#check_grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Node Glow Dot */}
          <circle cx="33" cy="19" r="2" fill="#00E5FF" />

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="logo_bg_grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#0A1128" />
            </linearGradient>
            <linearGradient id="logo_border_grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0078D4" />
              <stop offset="1" stopColor="#00E5FF" />
            </linearGradient>
            <linearGradient id="check_grad" x1="20" y1="19" x2="33" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00B4D8" />
              <stop offset="1" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`${currentSize.text} ${lightText ? 'text-white' : 'text-slate-900'}`}>
            Pak<span className="bg-gradient-to-r from-pakcyan-400 to-electric-600 bg-clip-text text-transparent">Growth</span>
          </span>
          <span className={`rounded-full bg-electric-600/20 text-pakcyan-400 border border-pakcyan-500/30 font-semibold ${currentSize.badge}`}>
            PK
          </span>
        </div>
      )}
    </div>
  );
};
