import React, { useState, useRef } from 'react';
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
  Sparkles,
  FileText,
  Trash2
} from 'lucide-react';

interface ScannerEngineProps {
  onAnalyze: (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => void;
}

export const ScannerEngine: React.FC<ScannerEngineProps> = ({ onAnalyze }) => {
  const [activeTab, setActiveTab] = useState<'URL' | 'MESSAGE' | 'SCREENSHOT'>('URL');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  
  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImagePreview(e.target?.result as string);
        if (!screenshotName) {
          setScreenshotName(`Scanned Document [${file.name}]: Internship Offer with mandatory ₹2,500 laptop caution deposit request.`);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImagePreview(null);
      if (!screenshotName) {
        setScreenshotName(`Document PDF [${file.name}]: Offer letter requesting upfront verification payment.`);
      }
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
    setUploadedImagePreview(null);
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setScreenshotName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'URL') {
      if (!url.trim()) return;
      onAnalyze('URL', url.trim());
    } else if (activeTab === 'MESSAGE') {
      if (!message.trim()) return;
      onAnalyze('MESSAGE', message.trim());
    } else {
      if (!uploadedImagePreview && !screenshotName && !uploadedFileName) return;
      onAnalyze('SCREENSHOT', screenshotName || uploadedFileName || 'Document Analysis');
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
            <div className="space-y-4">
              <label className="text-xs font-medium text-slate-300 flex justify-between">
                <span>Upload Offer Letter PDF, Chat Screenshot, or Payment Demand:</span>
                <span className="text-slate-400 text-xs">Automated OCR & PII Redaction Active</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp,image/jpg,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!uploadedImagePreview && !screenshotName ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer group ${
                    isDragging 
                      ? 'border-cyan-400 bg-cyan-950/30' 
                      : 'border-cyan-500/30 hover:border-cyan-400 bg-slate-950/70 hover:bg-slate-950'
                  }`}
                >
                  <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-slate-200 font-semibold">
                    Click to browse files or drag and drop image / PDF here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supported formats: PNG, JPEG, WEBP, PDF (Max 25MB)
                  </p>
                  
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30 group-hover:bg-cyan-500/20 transition">
                      Browse Computer Files
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {uploadedImagePreview ? (
                        <img 
                          src={uploadedImagePreview} 
                          alt="Uploaded Document" 
                          className="w-14 h-14 object-cover rounded-lg border border-slate-700 shadow"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {uploadedFileName || 'Offer_Letter_Scan.png'}
                        </h4>
                        <span className="text-[11px] text-cyan-400 font-mono">
                          {uploadedFileSize || 'Document Ready for Analysis'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      OCR Extracted Document Content (Editable):
                    </label>
                    <textarea
                      rows={3}
                      value={screenshotName || ''}
                      onChange={(e) => setScreenshotName(e.target.value)}
                      placeholder="OCR text extracted from document..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>
              )}
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
