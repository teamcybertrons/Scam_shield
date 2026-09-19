import React, { useState } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Image as ImageIcon, 
  Search, 
  UploadCloud, 
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles
} from 'lucide-react';

interface ScannerEngineProps {
  onAnalyze: (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => void;
}

export const ScannerEngine: React.FC<ScannerEngineProps> = ({ onAnalyze }) => {
  const [activeTab, setActiveTab] = useState<'URL' | 'MESSAGE' | 'SCREENSHOT'>('URL');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [screenshotName, setScreenshotName] = useState<string | null>(null);

  // Predefined realistic evaluation scenarios
  const testScenarios = [
    {
      title: 'Legitimate Infosys Careers',
      type: 'URL' as const,
      value: 'https://www.infosys.com/careers/',
      badge: 'Genuine',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Fake Internship + UPI Deposit (₹2,500)',
      type: 'MESSAGE' as const,
      value: 'Congratulations! You have been selected for the Infosys Remote Internship. Please deposit ₹2,500 refundable laptop caution fee via UPI to securityfee.tcs@oksbi within 2 hours to confirm your joining.',
      badge: 'Advance Fee Fraud',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Phishing Lookalike Domain',
      type: 'URL' as const,
      value: 'https://infosys-careers.top/internship-registration',
      badge: 'Lookalike Domain',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Telegram Recruiter Impersonation',
      type: 'MESSAGE' as const,
      value: 'Google Talent HR: Direct selection for Summer 2025. No technical interview required. Fill this Google Form with Aadhaar and bank details to secure ₹45,000 stipend slot.',
      badge: 'Data Harvest',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  const handleSelectScenario = (sc: typeof testScenarios[0]) => {
    setActiveTab(sc.type);
    if (sc.type === 'URL') {
      setUrl(sc.value);
    } else if (sc.type === 'MESSAGE') {
      setMessage(sc.value);
    }
    onAnalyze(sc.type, sc.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'URL') {
      onAnalyze('URL', url || 'https://infosys-careers.top/apply');
    } else if (activeTab === 'MESSAGE') {
      onAnalyze('MESSAGE', message || 'Selected for TCS Internship. Pay 2500 security deposit to confirm.');
    } else {
      onAnalyze('SCREENSHOT', screenshotName || 'Offer letter: Pay Rs 2500 refundable laptop deposit to HR');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      
      {/* Engine Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Multi-Engine Real-Time Threat Forensics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Analyze Opportunity Threats
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Submit any application link, recruiter email, or offer screenshot to execute deterministic scoring and AI linguistic analysis against live threat intelligence.
        </p>
      </div>

      {/* Quick Test Scenarios Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUICK PRESET TEST SCENARIOS (CLICK TO EVALUATE):</span>
          </span>
          <span>FastAPI Live Triangulation</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {testScenarios.map((sc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectScenario(sc)}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition cursor-pointer group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{sc.type}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${sc.badgeColor}`}>
                  {sc.badge}
                </span>
              </div>
              <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {sc.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyzer Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 via-[#0b1120]/95 to-[#060a14] border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        
        {/* Tab Headers */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('URL')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'URL'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>URL Forensics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('MESSAGE')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'MESSAGE'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message / Email NLP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SCREENSHOT')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'SCREENSHOT'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Screenshot OCR</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {activeTab === 'URL' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex justify-between">
                <span>Enter Opportunity or Application URL:</span>
                <span className="text-slate-400 text-xs">DNS, WHOIS, TLD & Brand cross-check</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://infosys-careers.top/internship-apply"
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-slate-500 outline-none transition font-mono"
                  required
                />
              </div>
            </div>
          )}

          {activeTab === 'MESSAGE' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex justify-between">
                <span>Paste Offer Email, Telegram message, or WhatsApp text:</span>
                <span className="text-slate-400 text-xs">AI urgency & payment detection</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste message text (e.g. Congratulations! You are shortlisted for internship. Pay ₹2,500 laptop fee...)"
                className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none transition resize-none leading-relaxed font-sans"
                required
              />
            </div>
          )}

          {activeTab === 'SCREENSHOT' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">
                Upload Offer Letter PDF, Chat Screenshot, or Payment Demand:
              </label>
              <div 
                onClick={() => setScreenshotName('Offer Letter: Selected for Tech Role. Deposit ₹2,500 laptop fee via UPI to securityfee.tcs@oksbi')}
                className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-xl p-8 text-center bg-slate-950/70 hover:bg-slate-950 transition cursor-pointer group"
              >
                <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-slate-200 font-semibold">
                  {screenshotName ? 'Loaded Sample Screenshot OCR Document' : 'Click to load sample offer letter OCR screenshot'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supported formats: PNG, JPEG, WEBP, PDF (Max 25MB)
                </p>
                <span className="inline-block mt-3 text-xs font-medium text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/30">
                  Automated OCR & PII Redaction Active
                </span>
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide uppercase shadow-xl shadow-cyan-500/30 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Execute ScamShield Threat Analysis</span>
          </button>
        </form>

        {/* Security & Verification Commitments */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-white block">Enterprise Registry</span>
              <span className="text-slate-400 text-[11px]">Validates authorized DNS</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-white block">Payment Traps</span>
              <span className="text-slate-400 text-[11px]">Identifies fee extortions</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-white block">Zero Data Retention</span>
              <span className="text-slate-400 text-[11px]">No credentials stored</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
