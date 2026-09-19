import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, AlertOctagon, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const configs = {
    LOW: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10',
      icon: ShieldCheck,
      label: 'LOW RISK'
    },
    MEDIUM: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-amber-500/10',
      icon: AlertTriangle,
      label: 'MEDIUM RISK'
    },
    HIGH: {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-rose-500/10',
      icon: ShieldAlert,
      label: 'HIGH RISK'
    },
    CRITICAL: {
      bg: 'bg-red-500/15 text-red-400 border-red-500/40 shadow-red-500/20 animate-pulse',
      icon: AlertOctagon,
      label: 'CRITICAL THREAT'
    }
  };

  const config = configs[level] || configs.HIGH;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-semibold',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold',
    lg: 'text-xs px-3.5 py-1.5 gap-2 font-bold tracking-wide'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <span className={`inline-flex items-center rounded-full border shadow-sm ${config.bg} ${sizeClasses[size]} transition-all`}>
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </span>
  );
};
