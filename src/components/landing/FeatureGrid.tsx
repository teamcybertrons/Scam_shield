import React from 'react';
import { 
  ShieldCheck, 
  Network, 
  Bot, 
  Globe, 
  Radio, 
  Lock, 
  ArrowRight,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface FeatureGridProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ setActiveTab }) => {
  const features = [
    {
      tab: 'threat-intel' as ActiveTab,
      icon: Network,
      title: 'SOC Threat Intelligence',
      desc: 'Real-time telemetry tracking active recruitment scam syndicates, honeypot traps, and dark map vectors across 40+ universities.',
      tag: 'SOC DASHBOARD',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    {
      tab: 'campaign-graph' as ActiveTab,
      icon: Layers,
      title: 'Scam Campaign Cluster Graph',
      desc: 'Interactive multi-tier graph linking fake company brands, typo-squatted domains, burner WhatsApp recruiters, and UPI mule accounts.',
      tag: 'GRAPH INTELLIGENCE',
      color: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    {
      tab: 'honeypot' as ActiveTab,
      icon: Radio,
      title: 'Defensive Honeypot Decoys',
      desc: 'Automated decoys safely intercept fraudulent messages and extract indicators before they reach real students.',
      tag: 'DECOY TELEMETRY',
      color: 'text-rose-400',
      border: 'border-rose-500/20'
    },
    {
      tab: 'extension' as ActiveTab,
      icon: Globe,
      title: 'Browser Extension Shield',
      desc: 'Instant in-browser inspection on LinkedIn, Internshala, and job portals with proactive risk badges and threat callouts.',
      tag: 'CHROME / EDGE EXTENSION',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20'
    },
    {
      tab: 'whatsapp-bot' as ActiveTab,
      icon: Bot,
      title: 'WhatsApp ScamShield Bot',
      desc: 'Forward suspicious job texts or screenshots directly on WhatsApp to receive an instant security risk report in seconds.',
      tag: 'WHATSAPP BOT',
      color: 'text-amber-400',
      border: 'border-amber-500/20'
    },
    {
      tab: 'security-center' as ActiveTab,
      icon: Lock,
      title: 'Privacy-First Architecture',
      desc: 'Zero retention of passwords, OTPs, or government IDs. Client-side OCR redaction ensures student safety at every step.',
      tag: 'PRIVACY BY DESIGN',
      color: 'text-blue-400',
      border: 'border-blue-500/20'
    }
  ];

  return (
    <section className="py-20 bg-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Full Cybersecurity Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise Defense Engineered for Students
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            ScamShield combines honeypot telemetry, graph neural patterns, and explainable evidence verification into one unified defense grid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                onClick={() => setActiveTab(f.tab)}
                className={`rounded-2xl bg-slate-900/40 border ${f.border} p-6 backdrop-blur-md hover:bg-slate-900/90 transition-all cursor-pointer group hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-800/80 ${f.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                  {f.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {f.desc}
                </p>

                <div className="flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
