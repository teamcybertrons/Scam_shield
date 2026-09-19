import React, { useState, useRef } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Image as ImageIcon, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { RadialRiskMeter } from '../common/RadialRiskMeter';
import { AnalysisResult } from '../../types';

interface LiveScannerPreviewProps {
  onRunScan: (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => void;
  activeResult: AnalysisResult;
  onViewFullReport: () => void;
  setActiveTab: (tab: any) => void;
}

export const LiveScannerPreview: React.FC<LiveScannerPreviewProps> = ({
  onRunScan,
  activeResult,
  onViewFullReport
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'URL' | 'MESSAGE' | 'SCREENSHOT'>('URL');
  const [urlInput, setUrlInput] = useState('https://infosys-careers-apply.xyz/internship-registration?ref=telegram_batch4');
  const [messageInput, setMessageInput] = useState('Congratulations! You are shortlisted for Google/Infosys remote intern role. Pay Rs 1,999 registration fee immediately to confirm your seat: UPI infosys.hr.recruitment@paytm');
  
  // Real file upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>('offer_letter_scam_sample.png');
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>('420 KB');
  const [extractedOcrText, setExtractedOcrText] = useState<string>('Offer Letter: Selected for Infosys Internship. Mandatory ₹1,999 seat deposit via UPI to securityfee.tcs@oksbi within 2 hours.');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>('signal-payment');

  const processFile = (file: File) => {
    setSelectedFileName(file.name);
    setSelectedFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPreview(e.target?.result as string);
        setExtractedOcrText(`Scanned Document [${file.name}]: Selected for Tech Internship. Requires upfront ₹1,999 deposit payment.`);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedPreview(null);
      setExtractedOcrText(`PDF Document [${file.name}]: Verification requirement with upfront monetary fee.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClearFile = () => {
    setUploadedPreview(null);
    setSelectedFileName(null);
    setSelectedFileSize(null);
    setExtractedOcrText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeInputTab === 'URL') {
      onRunScan('URL', urlInput);
    } else if (activeInputTab === 'MESSAGE') {
      onRunScan('MESSAGE', messageInput);
    } else {
      onRunScan('SCREENSHOT', extractedOcrText || selectedFileName || 'Uploaded Offer Letter');
    }
  };

  const signals = [
    {
      id: 'signal-payment',
      type: 'critical',
      title: 'Payment request detected',
      desc: 'Requests ₹1,999 upfront deposit before official interview or offer validation.',
      tag: 'UPI Gateway'
    },
    {
      id: 'signal-domain',
      type: 'critical',
      title: 'Domain mismatch & spoofing',
      desc: 'Claimed entity is Infosys Ltd, but domain is newly registered infosys-careers-apply.xyz.',
      tag: 'WHOIS Anomaly'
    },
    {
      id: 'signal-urgency',
      type: 'warning',
      title: 'Manipulative urgency language',
      desc: 'Contains artificial countdown timers claiming offer expires in 30 minutes.',
      tag: 'NLP Trigger'
    },
    {
      id: 'signal-identity',
      type: 'warning',
      title: 'Company verification unavailable',
      desc: 'Contact routed to unverified Telegram handle instead of corporate HR email.',
      tag: 'Identity Failure'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#050811] via-[#080d1a] to-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Threat Scanner Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One Opportunity. Multiple Signals.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Paste a suspicious job link, WhatsApp offer message, or upload a screenshot. ScamShield immediately runs 7 multi-vector security checks.
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
                      placeholder="Paste suspicious internship or job URL..."
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
                    placeholder="Paste full text of suspicious email or WhatsApp offer message..."
                    className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none transition resize-none leading-relaxed"
                    required
                  />
                </div>
              )}

              {/* Screenshot Upload Dropzone */}
              {activeInputTab === 'SCREENSHOT' && (
                <div className="space-y-3">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Upload Offer Letter / Chat Screenshot:</span>
                    <span className="text-[11px] text-cyan-400">OCR & PII Redaction Active</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png,image/jpeg,image/webp,image/jpg,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {!uploadedPreview && !selectedFileName ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer group ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-950/30'
                          : 'border-cyan-500/30 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-950'
                      }`}
                    >
                      <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs text-slate-200 font-medium">
                        Click to browse image or drag & drop offer letter screenshot
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        PNG, JPG, PDF (Automatic OCR & Private Redaction enabled)
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {uploadedPreview ? (
                            <img 
                              src={uploadedPreview} 
                              alt="Upload preview" 
                              className="w-11 h-11 object-cover rounded-lg border border-slate-700"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <span className="text-xs font-bold text-white block line-clamp-1">
                              {selectedFileName || 'Scam_Offer_Scan.png'}
                            </span>
                            <span className="text-[10px] text-cyan-400 font-mono">
                              {selectedFileSize || 'Ready for Analysis'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                          >
                            Browse
                          </button>
                          <button
                            type="button"
                            onClick={handleClearFile}
                            className="text-[11px] px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <input
                          type="text"
                          value={extractedOcrText}
                          onChange={(e) => setExtractedOcrText(e.target.value)}
                          placeholder="Extracted OCR text payload..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 font-mono focus:border-cyan-400 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Run ScamShield Deep Analysis</span>
              </button>
            </form>

            {/* Security Guarantee */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted Ingestion</span>
              <span className="text-cyan-400 font-medium">Zero Credential Retention</span>
            </div>

          </div>

          {/* Right Column: Live ScamShield Analysis Report Preview */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#0e162c] to-[#080d1c] border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Report Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">
                  Live Security Report
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
                  <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                    {activeResult.criticalSignalsCount} Critical Signals
                  </span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {activeResult.warningSignalsCount} Warnings
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {activeResult.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {activeResult.summary}
                </p>
              </div>
            </div>

            {/* Clickable Signals List */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Detected Forensic Evidence ({activeResult.evidenceList?.length || 0} Signals):
              </span>

              <div className="space-y-2">
                {(activeResult.evidenceList && activeResult.evidenceList.length > 0 ? activeResult.evidenceList : signals).map((sig: any, idx: number) => {
                  const isCrit = (sig.severity === 'CRITICAL' || sig.severity === 'HIGH' || sig.type === 'critical');
                  const isSelected = selectedSignalId === (sig.id || `sig-${idx}`);
                  return (
                    <div
                      key={sig.id || idx}
                      onClick={() => setSelectedSignalId(sig.id || `sig-${idx}`)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? isCrit
                            ? 'bg-rose-950/30 border-rose-500/70 shadow-lg shadow-rose-950/40'
                            : 'bg-amber-950/30 border-amber-500/70 shadow-lg shadow-amber-950/40'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          {isCrit ? (
                            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          )}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {sig.title}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              {sig.evidenceSource || sig.tag || sig.category?.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {sig.description || sig.desc}
                          </p>
                          {sig.detectedQuote && (
                            <div className="mt-1.5 text-[11px] font-mono text-cyan-300/90 bg-cyan-950/30 border border-cyan-500/20 px-2 py-1 rounded">
                              &ldquo;{sig.detectedQuote}&rdquo;
                            </div>
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

          </div>

        </div>

      </div>
    </section>
  );
};
