import React from 'react';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { ShieldCheck, Database, GlobeLock, Zap, CheckCircle2, Lock } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const metrics = [
    {
      value: 7,
      suffix: ' Vectors',
      decimals: 0,
      label: 'Multi-Vector Inspection',
      subtext: 'Parallel DNS, WHOIS, UPI detection, and NLP urgency engines',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      border: 'border-cyan-500/25',
      glow: 'shadow-cyan-500/5'
    },
    {
      value: 50,
      suffix: '+ Portals',
      decimals: 0,
      label: 'Enterprise Portals Indexed',
      subtext: 'Direct cross-referencing with verified global corporate careers registers',
      icon: Database,
      color: 'text-sky-400',
      border: 'border-sky-500/25',
      glow: 'shadow-sky-500/5'
    },
    {
      value: 100,
      suffix: '%',
      decimals: 0,
      label: 'Zero Data Retention',
      subtext: 'Client-side privacy pipeline with zero storage of IDs, OTPs, or resumes',
      icon: Lock,
      color: 'text-emerald-400',
      border: 'border-emerald-500/25',
      glow: 'shadow-emerald-500/5'
    },
    {
      value: 1,
      suffix: ' Sec',
      decimals: 0,
      label: 'Sub-Second Deep Scan',
      subtext: 'Instant heuristic risk computation and forensic evidence breakdown',
      icon: Zap,
      color: 'text-amber-400',
      border: 'border-amber-500/25',
      glow: 'shadow-amber-500/5'
    }
  ];

  return (
    <section className="py-14 border-y border-white/5 bg-[#040814] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            System Architecture & Defense Specifications
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              PIPELINE OPERATIONAL
            </span>
          </div>
        </div>

        {/* 4 Authentic Architecture Cards */}
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
                    SPECIFICATION
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
