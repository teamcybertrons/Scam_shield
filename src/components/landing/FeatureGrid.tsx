import React from 'react';
import { 
  ShieldCheck, 
  Network, 
  Bot, 
  Globe, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { Card3DTilt } from '../common/Card3DTilt';

interface FeatureGridProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ setActiveTab }) => {
  const features = [
    {
      tab: 'scanner' as ActiveTab,
      icon: ShieldCheck,
      title: 'AI Multi-Vector Threat Scanner',
      desc: 'Real-time deep forensic analysis of job offer URLs, recruiter message copy, and scanned offer letter attachments.',
      tag: 'CORE SCANNER',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'group-hover:shadow-cyan-500/20',
      gradient: 'from-cyan-500/10 to-transparent',
      stats: '14ms latency • OCR Active'
    },
    {
      tab: 'threat-intel' as ActiveTab,
      icon: Network,
      title: 'SOC Threat Intelligence Hub',
      desc: 'Real-time telemetry tracking active recruitment scam syndicates, impersonation vectors, and dark risk scores.',
      tag: 'SOC DASHBOARD',
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      glow: 'group-hover:shadow-purple-500/20',
      gradient: 'from-purple-500/10 to-transparent',
      stats: 'Live DB Scans • Time Series'
    },
    {
      tab: 'extension' as ActiveTab,
      icon: Globe,
      title: 'Manifest V3 Browser Extension',
      desc: 'Instant in-browser inspection on LinkedIn, Internshala, and job portals with proactive risk badges and threat callouts.',
      tag: 'CHROME / EDGE EXTENSION',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'group-hover:shadow-emerald-500/20',
      gradient: 'from-emerald-500/10 to-transparent',
      stats: 'Realtime DOM Hook • Zero Lag'
    },
    {
      tab: 'whatsapp-bot' as ActiveTab,
      icon: Bot,
      title: 'Native WhatsApp Cyber Bot',
      desc: 'Forward suspicious offer letters, links, or recruiter messages directly on WhatsApp to get instant AI risk audits.',
      tag: 'WHATSAPP BOT',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'group-hover:shadow-amber-500/20',
      gradient: 'from-amber-500/10 to-transparent',
      stats: '+91 80727 19603 • Baileys Engine'
    }
  ];

  return (
    <section className="py-20 bg-[#040713] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTEGRATED DEFENSE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Defense for Every Student
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md font-sans leading-relaxed">
            ScamShield unifies deterministic URL forensics, OCR letter inspection, live SOC telemetry, and browser extension guardrails into one cohesive platform.
          </p>
        </div>

        {/* 4 Interactive 3D Tilt Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card3DTilt
                key={i}
                maxTilt={12}
                scale={1.04}
                onClick={() => setActiveTab(f.tab)}
                className="h-full cursor-pointer"
              >
                <div
                  className={`h-full relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#091022]/95 to-[#050914] border ${f.border} p-6 backdrop-blur-xl transition-all duration-300 shadow-xl group overflow-hidden flex flex-col justify-between hover:border-cyan-400/60`}
                >
                  {/* Cyber Corner HUD Brackets */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-400/40 pointer-events-none group-hover:border-cyan-400 transition" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-400/40 pointer-events-none group-hover:border-cyan-400 transition" />

                  {/* Top Subtle Light Accent */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${f.gradient}`} />

                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 ${f.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/50">
                        {f.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {f.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      {f.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Stats + Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      {f.stats}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1.5 transition-transform">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              </Card3DTilt>
            );
          })}
        </div>

      </div>
    </section>
  );
};
