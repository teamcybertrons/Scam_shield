import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Globe, 
  Building2, 
  CreditCard, 
  MessageSquare, 
  Fingerprint, 
  Activity, 
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenScanner }) => {
  const [activeVector, setActiveVector] = useState<string>('payment');

  const vectors = [
    { 
      id: 'url', 
      label: 'URL & Redirects', 
      icon: Globe, 
      score: '99.8%', 
      status: 'Clean Routing', 
      risk: 'LOW',
      desc: 'Inspects full redirect chains, burner TLDs, and typo-squatted paths across 40+ registrar registries.' 
    },
    { 
      id: 'domain', 
      label: 'Domain WHOIS', 
      icon: Globe, 
      score: '6 Days Old', 
      status: 'High Risk Anomaly', 
      risk: 'HIGH',
      desc: 'Flags newly created domains posing as established multinational enterprises.' 
    },
    { 
      id: 'company', 
      label: 'Company Match', 
      icon: Building2, 
      score: 'Unverified', 
      status: 'Brand Impersonation', 
      risk: 'HIGH',
      desc: 'Compares claimed corporate branding against verified enterprise recruitment directories.' 
    },
    { 
      id: 'payment', 
      label: 'Payment Traps', 
      icon: CreditCard, 
      score: '₹1,999 Demand', 
      status: 'UPI Fee Extortion', 
      risk: 'CRITICAL',
      desc: 'Detects illegal upfront registration fees, training deposits, and mule UPI handles.' 
    },
    { 
      id: 'message', 
      label: 'Urgency NLP', 
      icon: MessageSquare, 
      score: 'Manipulative', 
      status: 'Panic Triggers', 
      risk: 'MEDIUM',
      desc: 'Identifies artificial 30-minute countdown timers and guaranteed selection promises.' 
    },
    { 
      id: 'identity', 
      label: 'Recruiter ID', 
      icon: Fingerprint, 
      score: 'Telegram @hr', 
      status: 'Free Channel Bypass', 
      risk: 'HIGH',
      desc: 'Exposes scammers redirecting candidates away from corporate emails to Telegram.' 
    },
    { 
      id: 'reputation', 
      label: 'Honeypot SOC', 
      icon: Activity, 
      score: '37 Matches', 
      status: 'Active Syndicate', 
      risk: 'CRITICAL',
      desc: 'Cross-checks submitted links against real-time decoy logs and community fraud reports.' 
    },
  ];

  const currentVector = vectors.find(v => v.id === activeVector) || vectors[3];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      
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
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-10">
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
              onClick={() => setActiveTab('threat-intel')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Explore ScamShield SOC</span>
            </button>
          </div>
        </div>

        {/* HERO VISUAL: Cyber Intelligence Console */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 via-[#0a0f1d]/95 to-[#050813] border border-cyan-500/25 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6">
            
            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Neural Defense Grid v2.4
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  • 7 Parallel Inspection Vectors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                  LATENCY: 14ms
                </span>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  SOC ACTIVE
                </span>
              </div>
            </div>

            {/* Interactive Vector Selector Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {vectors.map((vec) => {
                const Icon = vec.icon;
                const isSelected = activeVector === vec.id;
                return (
                  <button
                    key={vec.id}
                    onClick={() => setActiveVector(vec.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                        : 'bg-slate-950/70 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                    <span>{vec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Stage Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-950/80 p-6 rounded-xl border border-slate-800/90">
              
              {/* Left: Glowing Security Core Visual */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-4 relative">
                
                {/* Orbit Rings */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-blue-500/20" />
                  
                  {/* Central Core Shield */}
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/40 flex flex-col items-center justify-center p-3 animate-pulse-slow">
                    <Shield className="w-8 h-8 text-cyan-400 mb-1" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      ScamShield
                    </span>
                    <span className="text-[9px] font-semibold text-cyan-300">
                      Core Active
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400 font-medium">
                  Evaluating vector: <strong className="text-cyan-300">{currentVector.label}</strong>
                </div>
              </div>

              {/* Right: Vector Details & Forensics Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-cyan-400 tracking-wider">
                      Vector Telemetry
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {currentVector.label} Intelligence
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                    currentVector.risk === 'CRITICAL' || currentVector.risk === 'HIGH'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {currentVector.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  {currentVector.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Observed Metric</span>
                    <span className="text-sm font-bold text-white">{currentVector.score}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Detection Mode</span>
                    <span className="text-sm font-bold text-cyan-300">Parallel AI Engine</span>
                  </div>
                </div>

                <button
                  onClick={onOpenScanner}
                  className="w-full py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Test {currentVector.label} in Live Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
