import React, { useState } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Image as ImageIcon, 
  Search, 
  ShieldAlert, 
  ShieldCheck,
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  UploadCloud,
  FileText,
  ScanSearch,
  CheckCircle2
} from 'lucide-react';
import { RadialRiskMeter } from '../common/RadialRiskMeter';
import { AnalysisResult } from '../../types';

interface LiveScannerPreviewProps {
  onRunScan: (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => void;
  activeResult: AnalysisResult | null;
  onViewFullReport: () => void;
  setActiveTab: (tab: any) => void;
}

export const LiveScannerPreview: React.FC<LiveScannerPreviewProps> = ({
  onRunScan,
  activeResult,
  onViewFullReport
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'URL' | 'MESSAGE' | 'SCREENSHOT'>('URL');
  const [urlInput, setUrlInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);

  const hasResult = !!activeResult && !!activeResult.targetValue;

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeInputTab === 'URL') {
      if (!urlInput.trim()) return;
      onRunScan('URL', urlInput.trim());
    } else if (activeInputTab === 'MESSAGE') {
      if (!messageInput.trim()) return;
      onRunScan('MESSAGE', messageInput.trim());
    } else {
      onRunScan('SCREENSHOT', selectedFile || 'document_verification.png');
    }
  };

  const handleLoadSample = (type: 'URL' | 'MESSAGE', sampleVal: string) => {
    if (type === 'URL') {
      setActiveInputTab('URL');
      setUrlInput(sampleVal);
      onRunScan('URL', sampleVal);
    } else {
      setActiveInputTab('MESSAGE');
      setMessageInput(sampleVal);
      onRunScan('MESSAGE', sampleVal);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#050811] via-[#080d1a] to-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Threat Scanner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One Opportunity. Multiple Signals.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Enter any job link, recruiter message, or offer screenshot. ScamShield immediately runs 7 multi-vector security checks across DNS, WHOIS, payment patterns, and enterprise directories.
          </p>
        </div>

        {/* 2-Column Interactive Live Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Input Form Panel */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-cyan-500/25 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-bold text-white tracking-wide">
                Opportunity Ingestion
              </span>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                Multi-Input Parser
              </span>
            </div>

            {/* Input Mode Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveInputTab('URL')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeInputTab === 'URL'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>URL Link</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveInputTab('MESSAGE')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeInputTab === 'MESSAGE'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveInputTab('SCREENSHOT')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeInputTab === 'SCREENSHOT'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Screenshot</span>
              </button>
            </div>

            {/* Tab Inputs Form */}
            <form onSubmit={handleAnalyze} className="space-y-4">
              
              {/* URL Input */}
              {activeInputTab === 'URL' && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Target Opportunity Web Address:</span>
                    <span className="text-[11px] text-slate-400">Careers links, forms, shortlinks</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="e.g. https://careers.google.com or paste any application link..."
                      className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-xs text-white font-mono placeholder:text-slate-500 outline-none transition"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Message Input */}
              {activeInputTab === 'MESSAGE' && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Opportunity Message Text / Email / WhatsApp:</span>
                    <span className="text-[11px] text-slate-400">NLP Urgency & Fee extractor</span>
                  </label>
                  <textarea
                    rows={4}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Paste the full text of suspicious recruiter email, WhatsApp offer message, or joining requirements..."
                    className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none transition resize-none leading-relaxed"
                    required
                  />
                </div>
              )}

              {/* Screenshot Upload Dropzone */}
              {activeInputTab === 'SCREENSHOT' && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Upload Offer Letter / Chat Screenshot:
                  </label>
                  <div 
                    onClick={() => setSelectedFile('offer_letter_document.png')}
                    className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 text-center bg-slate-950/60 hover:bg-slate-950 transition cursor-pointer group"
                  >
                    <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-200 font-medium">
                      {selectedFile ? `Selected: ${selectedFile}` : 'Drag & drop offer letter screenshot here, or click to browse'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      PNG, JPG, PDF (Automatic OCR & Private Redaction enabled)
                    </p>
                  </div>
                </div>
              )}

              {/* Quick-Test Authentic Samples Chips */}
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  One-Click Authentic Test Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoadSample('URL', 'https://careers.google.com')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Official: Google Careers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('URL', 'https://www.infosys.com/careers')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Official: Infosys Careers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('MESSAGE', 'Congratulations! You are shortlisted for Google remote intern. Pay Rs 1,999 registration fee immediately to confirm seat: UPI hr.recruitment@paytm')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-rose-500/30 hover:border-rose-400 text-rose-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Test: Fee Scam Pattern</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98 mt-2"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Run ScamShield Deep Analysis</span>
              </button>
            </form>

            {/* Security Guarantee */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted Client Ingestion</span>
              <span className="text-cyan-400 font-medium">Zero Credential Retention</span>
            </div>

          </div>

          {/* Right Column: Live ScamShield Analysis Report Preview */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#0e162c] to-[#080d1c] border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            
            {hasResult && activeResult ? (
              <>
                {/* Report Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">
                      Live Security Audit Report
                    </span>
                    <h3 className="text-base font-bold text-white font-mono">
                      {activeResult.id}
                    </h3>
                  </div>
                  <button
                    onClick={onViewFullReport}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer"
                  >
                    <span>View Full Security Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Risk Gauge & Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                  <div className="sm:col-span-5 flex justify-center">
                    <RadialRiskMeter
                      score={activeResult.riskScore}
                      riskLevel={activeResult.riskLevel}
                      confidence={activeResult.confidence}
                      size={160}
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                        activeResult.criticalSignalsCount > 0 
                          ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' 
                          : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      }`}>
                        {activeResult.criticalSignalsCount} Critical Signals
                      </span>
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {activeResult.warningSignalsCount} Warnings
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {activeResult.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {activeResult.summary}
                    </p>
                  </div>
                </div>

                {/* Dynamic Signals List from Real Analysis */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Detected Threat Signals ({activeResult.evidenceList.length}):
                  </span>

                  <div className="space-y-2">
                    {activeResult.evidenceList.map((sig) => {
                      const isSelected = selectedSignalId === sig.id;
                      const isCrit = sig.severity === 'HIGH' || sig.severity === 'CRITICAL';
                      const isLow = sig.severity === 'LOW';
                      return (
                        <div
                          key={sig.id}
                          onClick={() => setSelectedSignalId(sig.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? isCrit
                                ? 'bg-rose-950/30 border-rose-500/70 shadow-lg shadow-rose-950/40'
                                : isLow
                                ? 'bg-emerald-950/30 border-emerald-500/70 shadow-lg shadow-emerald-950/40'
                                : 'bg-amber-950/30 border-amber-500/70 shadow-lg shadow-amber-950/40'
                              : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5">
                              {isCrit ? (
                                <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                              ) : isLow ? (
                                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              )}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">
                                  {sig.title}
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {sig.category.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                {sig.description}
                              </p>
                              {sig.detectedQuote && (
                                <p className="text-[11px] text-cyan-300/80 font-mono mt-1.5 bg-slate-900/90 px-2 py-1 rounded border border-slate-800 inline-block">
                                  Detected: {sig.detectedQuote}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA to Full Report */}
                <div className="pt-2">
                  <button
                    onClick={onViewFullReport}
                    className="w-full py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open Full Executive Security Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              /* Clean Ready-To-Scan State when no analysis has been executed yet */
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10">
                  <ScanSearch className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 block">
                    SCAN ENGINE READY
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Awaiting Target Opportunity
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Paste an internship URL, suspicious offer email, or WhatsApp message on the left and click <strong className="text-cyan-300">Run ScamShield Deep Analysis</strong>.
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="w-full max-w-sm bg-slate-950/70 rounded-xl border border-slate-800 p-4 text-left space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Domain DNS & SSL authority validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Upfront deposit & mule UPI pattern detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Recruiter Telegram/WhatsApp channel check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Urgency & psychological coercion NLP scan</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block">
                    Want to see it in action? Click one of the test presets on the left.
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
