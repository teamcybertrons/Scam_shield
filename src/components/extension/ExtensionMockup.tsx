import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  AlertTriangle,
  Sparkles,
  Download,
  Copy
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface ExtensionMockupProps {
  onOpenReport: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ExtensionMockup: React.FC<ExtensionMockupProps> = ({ onOpenReport, setActiveTab }) => {
  const [activeCallout, setActiveCallout] = useState<'url' | 'payment' | 'company' | 'extension'>('payment');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROACTIVE IN-BROWSER INTERCEPTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          ScamShield Browser Extension
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Zero-click background protection that flags deceptive job applications, typo-squatted domains, and payment demands before you submit your resume.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button 
            onClick={() => alert('ScamShield Chrome Extension (Manifest V3) Package generated for testing!')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Add ScamShield to Chrome / Edge</span>
          </button>
          <span className="text-xs font-mono text-slate-400 self-center">
            Manifest V3 • Privacy Sandboxed
          </span>
        </div>
      </div>

      {/* Realistic Browser Window Simulation */}
      <div className="rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden max-w-5xl mx-auto relative">
        
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Browser Address Bar with Callout Target */}
          <div className={`flex-1 max-w-2xl bg-slate-950 rounded-lg px-4 py-1.5 flex items-center justify-between text-xs font-mono border transition-all ${
            activeCallout === 'url' ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-800'
          }`}>
            <div className="flex items-center gap-2 truncate">
              <span className="text-rose-400">⚠️ Not Secure</span>
              <span className="text-slate-500">https://</span>
              <span className="text-rose-300 font-bold">infosys-careers-apply.xyz</span>
              <span className="text-slate-400">/internship-registration</span>
            </div>
            <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30">
              TYPO-SQUAT
            </span>
          </div>

          {/* Browser Extension Action Button */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setActiveCallout('extension')}
                className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center gap-1 text-xs font-mono font-bold animate-pulse"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>91</span>
              </button>
            </div>
          </div>
        </div>

        {/* Browser Inner Webpage Content + Overlaid Extension Popup */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-[#090e1c] to-[#040711] min-h-[480px] relative">
          
          {/* Spoofed Web Page Simulated Body */}
          <div className="max-w-xl space-y-6">
            
            {/* Spoofed Brand Header with Company Callout Target */}
            <div className={`p-4 rounded-xl border bg-slate-900/80 transition-all ${
              activeCallout === 'company' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">
                  Infosys Technology Recruitment Drive 2026
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  UNOFFICIAL ASSET
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Selected candidates will receive ₹35,000/month stipend and work on cloud engineering.
              </p>
            </div>

            {/* Suspicious Form with Payment Request Callout */}
            <div className={`p-5 rounded-xl border bg-slate-900/90 space-y-4 transition-all ${
              activeCallout === 'payment' ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase font-mono">
                  Final Registration Step
                </h4>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                  FLAGGED DEMAND
                </span>
              </div>

              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs font-mono text-rose-300">
                &ldquo;Pay ₹1,999 to confirm your internship seat & training kit dispatch.&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  disabled
                  placeholder="Full Name"
                  className="bg-slate-950 border border-slate-800 rounded p-2 text-slate-500"
                />
                <input
                  disabled
                  placeholder="College Name"
                  className="bg-slate-950 border border-slate-800 rounded p-2 text-slate-500"
                />
              </div>

              <button
                disabled
                className="w-full py-2.5 rounded bg-rose-600/60 text-white font-bold text-xs"
              >
                Pay ₹1,999 Via UPI Now
              </button>
            </div>

          </div>

          {/* Floating In-Page ScamShield Extension Overlay Panel */}
          <div className="absolute top-8 right-6 sm:right-10 w-80 rounded-2xl bg-gradient-to-b from-[#0c1326] to-[#060a15] border-2 border-rose-500/60 p-5 shadow-2xl backdrop-blur-xl z-20 space-y-4 animate-float">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  SCAMSHIELD
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                CRITICAL ALERT
              </span>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-300 block">Threat Level</span>
                <span className="text-sm font-bold text-white font-mono">HIGH RISK</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-rose-400">
                91 <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
            </div>

            {/* 4 Warning Signs */}
            <div className="space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                4 Critical Warning Signs:
              </span>
              
              <div className="flex items-center gap-2 text-rose-300">
                <Check className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>Suspicious domain mismatch</span>
              </div>

              <div className="flex items-center gap-2 text-rose-300">
                <Check className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>Illegal upfront payment request</span>
              </div>

              <div className="flex items-center gap-2 text-rose-300">
                <Check className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>Identity mismatch (Unverified HR)</span>
              </div>

              <div className="flex items-center gap-2 text-rose-300">
                <Check className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>Manipulative urgency countdown</span>
              </div>
            </div>

            <button
              onClick={onOpenReport}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/30"
            >
              <span>View Full Security Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Interactive Callout Selector Bar */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-mono text-slate-400">
            Interactive Callout Focus:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCallout('url')}
              className={`px-3 py-1 rounded font-mono transition ${
                activeCallout === 'url' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              1. Suspicious URL
            </button>
            <button
              onClick={() => setActiveCallout('payment')}
              className={`px-3 py-1 rounded font-mono transition ${
                activeCallout === 'payment' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              2. Payment Request
            </button>
            <button
              onClick={() => setActiveCallout('company')}
              className={`px-3 py-1 rounded font-mono transition ${
                activeCallout === 'company' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              3. Claimed Company
            </button>
            <button
              onClick={() => setActiveCallout('extension')}
              className={`px-3 py-1 rounded font-mono transition ${
                activeCallout === 'extension' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              4. Extension Popup
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
