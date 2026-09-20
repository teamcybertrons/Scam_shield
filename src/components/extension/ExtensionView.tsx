import React, { useState } from 'react';
import { 
  Globe, 
  Download, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Layers, 
  Cpu, 
  Terminal, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  FileCode2,
  Copy,
  Check
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { Card3DTilt } from '../common/Card3DTilt';

interface ExtensionViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenReport?: () => void;
}

export const ExtensionView: React.FC<ExtensionViewProps> = ({ setActiveTab }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2500);
  };

  const extensionFeatures = [
    {
      icon: Zap,
      title: 'Zero-Lag Active DOM Analysis',
      desc: 'Hooks directly into active tab DOM nodes to detect high-risk keywords, fake recruiters, and upfront deposit demands in sub-50ms.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30'
    },
    {
      icon: ShieldCheck,
      title: 'Brand Impersonation Intercept',
      desc: 'Cross-checks page domain names against verified authoritative registries (e.g. Google, Microsoft, Infosys, Amazon, TCS) to catch typosquatting.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30'
    },
    {
      icon: Lock,
      title: 'Payment & UPI Trap Shield',
      desc: 'Instantly identifies upfront fee requests, QR codes, deposit demands, and personal banking redirection prompts.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30'
    },
    {
      icon: Eye,
      title: 'Privacy-First Architecture',
      desc: 'Zero password, cookie, or personal identifier scraping. All telemetry is anonymized and audited with strict local-first heuristics.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30'
    }
  ];

  const supportedPortals = [
    { name: 'LinkedIn Jobs', category: 'Professional Network', status: 'Fully Supported', badgeColor: 'text-cyan-300 bg-cyan-500/10' },
    { name: 'Internshala', category: 'Internship Portal', status: 'Fully Supported', badgeColor: 'text-emerald-300 bg-emerald-500/10' },
    { name: 'Indeed & Glassdoor', category: 'Job Aggregators', status: 'Fully Supported', badgeColor: 'text-sky-300 bg-sky-500/10' },
    { name: 'Naukri.com & Foundit', category: 'Regional Portals', status: 'Fully Supported', badgeColor: 'text-indigo-300 bg-indigo-500/10' },
    { name: 'Unstop & HackerRank', category: 'Hackathons & Drives', status: 'Fully Supported', badgeColor: 'text-purple-300 bg-purple-500/10' },
    { name: 'Gmail & Webmail', category: 'Recruiter Emails', status: 'Direct Scan Active', badgeColor: 'text-amber-300 bg-amber-500/10' }
  ];

  const installSteps = [
    {
      step: '01',
      title: 'Download & Extract Extension Package',
      desc: 'Download the prepared Manifest V3 build directory containing manifest.json, background.js, and popup UI assets.',
      code: 'git clone https://github.com/scamshield/extension.git'
    },
    {
      step: '02',
      title: 'Open Extension Management in Chrome / Edge',
      desc: 'Navigate to chrome://extensions (or edge://extensions) in your browser address bar and enable Developer Mode in the top-right corner.',
      code: 'chrome://extensions'
    },
    {
      step: '03',
      title: 'Click "Load unpacked" & Select Folder',
      desc: 'Select the /extension folder in your ScamShield repository. The shield icon will appear pinned in your browser toolbar ready for inspection.',
      code: 'Load Unpacked -> Select /scamshield/extension'
    }
  ];

  const faqs = [
    {
      q: 'How does the extension communicate with the ScamShield AI engine?',
      a: 'The extension uses lightweight Manifest V3 background service workers that communicate with the ScamShield FastAPI gateway (or local heuristics) over secure TLS web-socket & REST protocols.'
    },
    {
      q: 'Does ScamShield store any browsing history or passwords?',
      a: 'No. ScamShield operates under a strict Zero-Knowledge Privacy policy. No keystrokes, personal passwords, session cookies, or form inputs are ever recorded or transmitted.'
    },
    {
      q: 'Which browsers are officially supported?',
      a: 'All Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, Arc, and Opera running Manifest V3.'
    }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>MANIFEST V3 EXTENSION ARCHITECTURE</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Real-Time In-Browser Cyber Defense
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Protect yourself directly while browsing job portals. The ScamShield browser extension inspects active tabs, detects brand typosquatting, flags payment traps, and warns you before you apply.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="/extension/manifest.json"
            download="manifest.json"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Download Extension Package</span>
          </a>
          <button
            onClick={() => {
              setActiveTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold shadow transition"
          >
            <span>Launch Web Scanner Instead</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 2. Key Capabilities Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Core Extension Capabilities</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Built on modern Chromium Manifest V3 service worker pipelines
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
            v2.1 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {extensionFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <Card3DTilt key={i} maxTilt={10} scale={1.03} className="h-full">
                <div className={`h-full p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#091022]/90 to-[#060b17] border ${feat.border} backdrop-blur-xl shadow-xl flex flex-col justify-between`}>
                  <div>
                    <div className={`w-10 h-10 rounded-xl ${feat.bg} border ${feat.border} flex items-center justify-center ${feat.color} mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time Enabled</span>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>

      {/* 3. Supported Portals & Platforms */}
      <div className="rounded-2xl bg-[#060b17]/90 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Supported Career Platforms & Workflows</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Direct script injection and DOM heuristics tuned for major recruiting ecosystems
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>6 Target Platforms Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportedPortals.map((portal, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                  {portal.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {portal.category}
                </p>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-current/20 ${portal.badgeColor}`}>
                {portal.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Installation & Deployment Guide */}
      <div className="rounded-2xl bg-gradient-to-b from-[#091124] to-[#050a16] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold mb-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>DEVELOPER MODE INSTALLATION</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              How to Install ScamShield in Chrome or Edge (3 Steps)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Zero WebStore Dependencies Needed
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {installSteps.map((step, idx) => (
            <div 
              key={idx}
              className="relative p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between space-y-4 group hover:border-cyan-500/50 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                    STEP {step.step}
                  </span>
                  <FileCode2 className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                </div>
                <h4 className="text-xs font-bold text-white">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="truncate pr-2">{step.code}</span>
                <button
                  onClick={() => handleCopy(step.code, idx)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
                  title="Copy command"
                >
                  {copiedStep === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Frequently Asked Questions</span>
        </h3>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <h4 className="text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default ExtensionView;
