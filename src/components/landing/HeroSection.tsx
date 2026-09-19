import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Activity, 
  Search,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { Hero3DHologram } from './Hero3DHologram';
import { Card3DTilt } from '../common/Card3DTilt';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenScanner }) => {
  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
      
      {/* Dynamic 3D Ambient Glowing Auroras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid Background Matrix */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Responsive 3D Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & 3D Interactive CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Tagline Pill with 3D Border Glow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10 backdrop-blur-xl hover:border-cyan-400 transition-all cursor-default">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono tracking-tight">AI-POWERED CYBER DEFENSE FOR STUDENTS & APPLICANTS</span>
            </div>

            {/* Main Punchy Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              Before You Apply. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 drop-shadow-sm">
                Know What You&apos;re Trusting.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              ScamShield analyzes job offers, internship application URLs, recruiter messages, and attachments using multi-vector deterministic forensics & threat intelligence.
            </p>

            {/* 3D Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenScanner}
                className="relative group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-200" />
                <Search className="w-4 h-4 stroke-[2.5] relative z-10" />
                <span className="relative z-10">Analyze an Opportunity</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform relative z-10" />
              </button>

              <button
                onClick={() => setActiveTab('whatsapp-bot')}
                className="px-6 py-4 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 hover:text-white font-bold text-sm border border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/50 backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp AI Bot</span>
              </button>

              <button
                onClick={() => setActiveTab('threat-intel')}
                className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 shadow-lg backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>SOC Radar</span>
              </button>
            </div>

            {/* 3 Core Technical Capabilities Chips */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md hover:border-cyan-500/40 transition">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Deterministic AI</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md hover:border-cyan-500/40 transition">
                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>&lt; 14ms Inspection</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md hover:border-cyan-500/40 transition">
                <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Live Threat Radar</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Hologram Orb with Interactive Tilt Depth */}
          <div className="lg:col-span-5 flex justify-center">
            <Card3DTilt maxTilt={14} scale={1.03} className="w-full max-w-lg">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/80 via-[#070d1c]/90 to-[#030611] border border-cyan-500/30 p-2 sm:p-4 shadow-2xl backdrop-blur-2xl overflow-hidden group">
                
                {/* Cyber Corner HUD Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Top Terminal Status Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-slate-950/60 rounded-t-2xl font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-semibold">NEURAL DEFENSE GRID</span>
                  </div>
                  <span className="text-cyan-400 font-bold">LIVE TELEMETRY</span>
                </div>

                {/* Interactive 3D Holographic Sphere */}
                <Hero3DHologram />

                {/* Bottom Interactive Quick Scan Prompt */}
                <div className="mt-2 p-3 bg-slate-950/80 rounded-2xl border border-cyan-500/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                    <span>Cross-Campus Threat Radar: Active</span>
                  </div>
                  <button
                    onClick={onOpenScanner}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Scan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </div>
    </section>
  );
};
