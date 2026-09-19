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
      tab: 'scanner' as ActiveTab,
      icon: ShieldCheck,
      title: 'AI Multi-Vector Threat Scanner',
      desc: 'Real-time deep forensic analysis of job offer URLs, recruiter message copy, and scanned offer letter attachments.',
      tag: 'CORE SCANNER',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      tab: 'threat-intel' as ActiveTab,
      icon: Network,
      title: 'SOC Threat Intelligence Hub',
      desc: 'Real-time telemetry tracking active recruitment scam syndicates, impersonation vectors, and dark risk scores.',
      tag: 'SOC DASHBOARD',
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    {
      tab: 'extension' as ActiveTab,
      icon: Globe,
      title: 'Manifest V3 Browser Extension',
      desc: 'Instant in-browser inspection on LinkedIn, Internshala, and job portals with proactive risk badges and threat callouts.',
      tag: 'CHROME / EDGE EXTENSION',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      tab: 'whatsapp-bot' as ActiveTab,
      icon: Bot,
      title: 'Native WhatsApp Cyber Bot',
      desc: 'Forward suspicious offer letters, links, or recruiter messages directly on WhatsApp to get instant AI risk audits.',
      tag: 'WHATSAPP BOT',
      color: 'text-amber-400',
      border: 'border-amber-500/30'
    }
  ];

  return (
    <section className="py-20 bg-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Integrated Defense Grid
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise Defense Engineered for Students
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            ScamShield combines real-time URL forensics, OCR letter inspection, SOC intelligence, and browser protection into one unified ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
