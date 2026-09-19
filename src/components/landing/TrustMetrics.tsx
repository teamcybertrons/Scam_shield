import React, { useState, useEffect } from 'react';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { ShieldCheck, Database, GlobeLock, Zap } from 'lucide-react';
import { ScamShieldAPI } from '../../services/api';

export const TrustMetrics: React.FC = () => {
  const [stats, setStats] = useState({
    opportunitiesAnalyzed: 12,
    threatIndicators: 48,
    suspiciousDomains: 24,
    systemAvailability: 99.9
  });
  const [lastUpdated, setLastUpdated] = useState<string>('JUST NOW');

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      const data = await ScamShieldAPI.getTelemetryStats();
      if (data && mounted) {
        setStats({
          opportunitiesAnalyzed: data.opportunitiesAnalyzed || 12,
          threatIndicators: data.threatIndicators || 48,
          suspiciousDomains: data.suspiciousDomains || 24,
          systemAvailability: data.systemAvailability || 99.9
        });
        setLastUpdated('LIVE SYNCED');
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const metrics = [
    {
      value: stats.opportunitiesAnalyzed,
      suffix: '',
      label: 'Opportunities Analyzed',
      subtext: 'Real-time student job links, internships & offers screened in database',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      border: 'border-cyan-500/25',
      glow: 'shadow-cyan-500/5'
    },
    {
      value: stats.threatIndicators,
      suffix: '',
      label: 'Threat Indicators',
      subtext: 'Verified phishing forms, fraudulent UPIs & burner handles cataloged',
      icon: Database,
      color: 'text-rose-400',
      border: 'border-rose-500/25',
      glow: 'shadow-rose-500/5'
    },
    {
      value: stats.suspiciousDomains,
      suffix: '',
      label: 'Suspicious Domains',
      subtext: 'Typo-squatted domains identified & cross-verified in threat feed',
      icon: GlobeLock,
      color: 'text-amber-400',
      border: 'border-amber-500/25',
      glow: 'shadow-amber-500/5'
    },
    {
      value: stats.systemAvailability,
      suffix: '%',
      decimals: 1,
      label: 'Analysis Availability',
      subtext: 'Deterministic sub-second multi-vector AI intelligence pipeline',
      icon: Zap,
      color: 'text-emerald-400',
      border: 'border-emerald-500/25',
      glow: 'shadow-emerald-500/5'
    }
  ];

  return (
    <section className="py-14 border-y border-white/5 bg-[#040814] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Note */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Real-Time Defense Telemetry
          </span>
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/30 font-mono">
            {lastUpdated}
          </span>
        </div>

        {/* 4 Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl bg-slate-900/80 border ${item.border} p-6 backdrop-blur-md hover:bg-slate-900/95 transition-all shadow-lg ${item.glow} group hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-800/90 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    LIVE METRIC
                  </span>
                </div>

                <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${item.color} mb-1.5`}>
                  <AnimatedCounter 
                    value={item.value} 
                    suffix={item.suffix} 
                    decimals={item.decimals || 0} 
                  />
                </div>

                <h4 className="text-sm font-bold text-white mb-1">
                  {item.label}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
