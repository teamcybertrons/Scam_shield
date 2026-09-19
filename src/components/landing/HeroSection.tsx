import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Activity, 
  Search,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenScanner }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-20 overflow-hidden">
      
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/5 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>AI-Powered Cybersecurity Defense for Students & Applicants</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Before You Apply. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Know What You&apos;re Trusting.
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            ScamShield analyzes jobs, internships, links and digital offers using AI, threat intelligence and evidence-based risk analysis.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Analyze an Opportunity</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('whatsapp-bot')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 hover:text-white font-semibold text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>💬 WhatsApp AI Bot</span>
            </button>

            <button
              onClick={() => setActiveTab('threat-intel')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Explore SOC Radar</span>
            </button>
          </div>

          {/* 3 Value Proposition Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Deterministic AI Risk Engine</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>&lt; 14ms Real-Time Inspection</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Cross-Campus Threat Radar</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
