import React from 'react';
import { ShieldCheck, ShieldAlert, Heart, ExternalLink, Lock } from 'lucide-react';
import { ActiveTab } from '../../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04060d] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1: Brand & Philosophy */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Scam<span className="text-cyan-400">Shield</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-powered intelligence platform defending students and graduates against fraudulent jobs, spoofed internships, phishing schemes, and digital payment scams.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SOC Telemetry Online • 99.2% Uptime</span>
          </div>
        </div>

        {/* Col 2: Platform Modules */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
            Core Defense Modules
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition">
                Platform Overview & Insights
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('scanner')} className="hover:text-cyan-400 transition">
                AI Threat Scanner & Deep Forensics
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('threat-intel')} className="hover:text-cyan-400 transition">
                SOC Threat Intelligence Hub
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('extension')} className="hover:text-cyan-400 transition">
                Browser Extension Cyber Shield
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('whatsapp-bot')} className="hover:text-cyan-400 transition">
                Native WhatsApp Threat Bot
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Principles & Architecture */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
            Security Guarantees
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <Lock className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span>Zero Password or Credential Storage</span>
            </li>
            <li>
              <span>Deterministic Explainable Multi-Vector Scoring</span>
            </li>
            <li>
              <span>Automated OCR Redaction & Privacy Shield</span>
            </li>
            <li>
              <span>Real-Time WebSocket Protocol Gateway</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Official Helplines & Notice */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
            Emergency Hotlines
          </h4>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>National Cyber Crime Portal</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Helpline: <strong className="text-white font-mono">1930</strong> (India)
            </p>
            <a 
              href="https://cybercrime.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-[10px] text-slate-500 italic">
            ScamShield provides evidence-based threat risk analysis and safe verification paths. Always verify through authoritative enterprise domains.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © 2026 ScamShield Security Systems. Built for National Hackathon Excellence.
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Student Safety & Cyber Resilience</span>
        </div>
      </div>
    </footer>
  );
};
