import React from 'react';
import { RiskLevel } from '../../types';

interface RadialRiskMeterProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  confidence: number;
  size?: number;
}

export const RadialRiskMeter: React.FC<RadialRiskMeterProps> = ({
  score,
  riskLevel,
  confidence,
  size = 180
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // 240 degree gauge
  const angle = 240;
  const arcLength = (angle / 360) * circumference;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  const getColor = (level: RiskLevel) => {
    switch (level) {
      case 'LOW':
        return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-400', label: 'LOW RISK' };
      case 'MEDIUM':
        return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', text: 'text-amber-400', label: 'MEDIUM RISK' };
      case 'HIGH':
        return { stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.5)', text: 'text-rose-400', label: 'HIGH RISK' };
      case 'CRITICAL':
        return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)', text: 'text-red-500', label: 'CRITICAL' };
    }
  };

  const theme = getColor(riskLevel);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      {/* Background glow */}
      <div 
        className="absolute inset-0 rounded-full filter blur-xl opacity-25 pointer-events-none transition-all duration-700"
        style={{ background: theme.glow }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.4s ease',
            filter: `drop-shadow(0 0 6px ${theme.glow})`
          }}
        />
      </svg>

      {/* Center Details */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Risk Score
        </span>
        <div className="flex items-baseline justify-center gap-1 my-0.5">
          <span className={`text-4xl font-extrabold tracking-tight ${theme.text}`}>
            {score}
          </span>
          <span className="text-slate-400 text-xs">/100</span>
        </div>
        <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${theme.text} bg-slate-900/90 border border-slate-700/60`}>
          {theme.label}
        </span>
        <div className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Conf: {confidence}%</span>
        </div>
      </div>
    </div>
  );
};
