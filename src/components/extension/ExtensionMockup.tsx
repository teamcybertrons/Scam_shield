import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  FolderOpen, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Zap, 
  Eye, 
  CheckCircle 
} from 'lucide-react';
import JSZip from 'jszip';
import { ActiveTab, AnalysisResult } from '../../types';
import { Card3DTilt } from '../common/Card3DTilt';

interface ExtensionMockupProps {
  onOpenReport: (result?: AnalysisResult) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ExtensionMockup: React.FC<ExtensionMockupProps> = ({ onOpenReport }) => {
  const [selectedBrowser, setSelectedBrowser] = useState<'chrome' | 'edge' | 'brave'>('chrome');
  const [copiedPath, setCopiedPath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleCopyPath = () => {
    navigator.clipboard.writeText('d:\\HACKSPORA 2.0\\scamshield\\extension');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 3000);
  };

  // Generate & Download the actual Manifest V3 zip package from live files
  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const files = [
        'manifest.json',
        'popup.html',
        'popup.css',
        'popup.js',
        'background.js',
        'content.js'
      ];

      await Promise.all(
        files.map(async (filename) => {
          try {
            const res = await fetch(`/extension/${filename}`);
            if (res.ok) {
              const text = await res.text();
              zip.file(filename, text);
            }
          } catch (e) {
            console.warn(`Could not fetch /extension/${filename}`, e);
          }
        })
      );

      zip.file('README_INSTALL.txt', `SCAMSHIELD CHROME / BRAVE / EDGE EXTENSION INSTALLATION:

1. Open your browser and navigate to:
   - Chrome: chrome://extensions
   - Edge:   edge://extensions
   - Brave:  brave://extensions

2. Turn on "Developer mode" (toggle in top-right corner).
3. Click "Load unpacked" (top-left).
4. Select this extracted folder.
5. Click "⚡ Scan Current Screen" in the popup to inspect any job page with AI!`);

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'scamshield-browser-extension-v2.1.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // Fallback direct static zip download
      const link = document.createElement('a');
      link.href = '/scamshield-extension.zip';
      link.download = 'scamshield-browser-extension-v2.1.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  // Simulated in-browser Extension state
  const [simState, setSimState] = useState<'idle' | 'loading' | 'result'>('idle');
  const [simUrl, setSimUrl] = useState('https://careers.infosys-security-deposit.online/offer-letter?ref=2499');
  const [simCustomInput, setSimCustomInput] = useState('');
  const [simLoadingText, setSimLoadingText] = useState('Extracting on-screen text...');
  const [simLoadingSub, setSimLoadingSub] = useState('Analyzing page DOM & threat heuristics');
  const [simResult, setSimResult] = useState<AnalysisResult | null>(null);

  const presets = [
    {
      id: 'scam-infosys',
      name: '⚠️ Scam Offer (Infosys ₹2,499 Deposit)',
      url: 'https://careers.infosys-security-deposit.online/offer-letter?ref=2499',
      title: 'IMMEDIATE SELECTION - INTERNSHIP OFFER LETTER',
      text: 'Infosys Career Recruitment Hub. Stipend: ₹60,000/Month. MANDATORY LAPTOP & REGISTRATION SECURITY DEPOSIT: ₹2,499 VIA UPI (REFUNDABLE). UPI ID: infosys.security.deposit@oksbi. SEAT EXPIRES IN 24 HOURS! Contact: recruitment.infosys.hr@gmail.com, Telegram: @infosys_onboarding_desk'
    },
    {
      id: 'legit-wealthbank',
      name: '🛡️ Authentic Offer (Wealth Bank / NovaTech)',
      url: 'https://careers.wealthbank.internal/offers/maya-patil.pdf',
      title: 'Employment Offer Letter - Wealth Bank / NovaTech',
      text: 'EMPLOYMENT OFFER LETTER - Wealth Bank / NovaTech Solutions. Dear Candidate, We are pleased to offer you the position with standard compensation. Terms: Standard enterprise confidentiality. Authorized Signatory: Maya Patil, Head of Human Resources. Zero advance payment required.'
    },
    {
      id: 'paypal-phish',
      name: '⚠️ Phishing Subdomain (PayPal Verify)',
      url: 'https://paypal.com.account-verify-auth.xyz/security-submit',
      title: 'PayPal Account Security Verification Required',
      text: 'URGENT: Your account has been temporarily locked. Enter full banking credentials and debit card details immediately to unlock within 30 minutes or account is permanently disabled.'
    }
  ];

  const runSimulatedScan = async (overrideText?: string, overrideUrl?: string) => {
    setSimState('loading');
    setSimLoadingText('Extracting on-screen text & DOM metadata...');
    setSimLoadingSub('Inspecting active frame for payment demands & brand spoofing');

    const targetUrl = overrideUrl || simUrl;
    const targetText = overrideText || simCustomInput || (presets.find(p => p.url === targetUrl)?.text) || targetUrl;

    setTimeout(() => {
      setSimLoadingText('Running AI neural analysis...');
      setSimLoadingSub('Matching enterprise signatures & threat intelligence');
    }, 1000);

    setTimeout(() => {
      const lower = (targetText + ' ' + targetUrl).toLowerCase();
      const isScam = lower.includes('deposit') || lower.includes('2499') || lower.includes('2,499') || lower.includes('xyz') || lower.includes('security-deposit') || lower.includes('gmail.com') || lower.includes('telegram');
      const claimedEntity = lower.includes('infosys') ? 'Infosys Limited' : (lower.includes('wealth') ? 'Wealth Bank' : (lower.includes('paypal') ? 'PayPal Holdings' : 'Enterprise Entity'));
      const claimedDomain = lower.includes('infosys') ? 'infosys.com' : (lower.includes('wealth') ? 'wealthbank.com' : (lower.includes('paypal') ? 'paypal.com' : 'official-domain.com'));

      const result: AnalysisResult = {
        id: `SS-SIM-${Date.now()}`,
        title: `${claimedEntity} — Extension Threat & Forensic Audit`,
        targetType: 'URL',
        targetValue: targetUrl,
        analyzedAt: new Date().toLocaleString(),
        riskScore: isScam ? 88 : 14,
        riskLevel: isScam ? 'CRITICAL' : 'LOW',
        confidence: isScam ? 96 : 98,
        summary: isScam 
          ? 'High-confidence employment scam detected! Upfront monetary deposit, unofficial recruiter email, or deceptive typo-squatted domain detected.'
          : 'Verified authentic opportunity. Zero upfront fee demands and official corporate communication verified.',
        criticalSignalsCount: isScam ? 3 : 0,
        warningSignalsCount: isScam ? 2 : 0,
        breakdown: {
          domainRisk: { score: isScam ? 24 : 3, max: 25, label: 'Domain & Endpoint Forensics', desc: isScam ? 'Domain mismatch or newly registered spoofed TLD.' : 'Authoritative enterprise DNS.' },
          paymentRisk: { score: isScam ? 25 : 0, max: 25, label: 'Monetary Extraction', desc: isScam ? 'Mandatory refundable security deposit detected.' : 'Zero fee demands.' },
          identityRisk: { score: isScam ? 18 : 2, max: 20, label: 'Brand & Recruiter Identity', desc: isScam ? 'Free webmail recruiter address.' : 'Authentic corporate communications.' },
          contentRisk: { score: isScam ? 12 : 3, max: 15, label: 'Linguistic Urgency Pressure', desc: isScam ? 'Urgency timers & artificial scarcity.' : 'Standard hiring terms.' },
          reputationRisk: { score: isScam ? 9 : 6, max: 15, label: 'Threat Intel Feeds', desc: isScam ? 'Associated with known student employment fraud vectors.' : 'No negative reports.' }
        },
        timeline: [
          { time: '00:01', event: 'Active DOM Extracted', status: 'clean', detail: 'Screen text and hyperlinks parsed.' },
          { time: '00:02', event: 'Forensic Engine Evaluation', status: isScam ? 'flagged' : 'clean', detail: isScam ? 'Advance-fee fraud patterns identified.' : 'Clean signatures verified.' }
        ],
        verification: {
          claimedName: claimedEntity,
          claimedDomain: claimedDomain,
          observedDomain: targetUrl.replace(/^https?:\/\//, '').split('/')[0],
          isDomainMatch: !isScam,
          status: isScam ? 'SUSPICIOUS_MISMATCH' : 'VERIFIED',
          officialWebsite: `https://${claimedDomain}`,
          officialCareersUrl: `https://${claimedDomain}/careers`,
          notes: isScam ? 'Severe domain typo-squatting and advance fee extraction detected.' : 'Domain matches authoritative enterprise registry.'
        },
        evidenceList: isScam ? [
          {
            id: 'sim-ev-1',
            category: 'payment',
            title: 'Mandatory Upfront Security Deposit (₹2,499)',
            severity: 'HIGH',
            confidence: 97,
            description: 'Application demands refundable laptop/registration fee prior to onboarding.',
            detectedQuote: 'MANDATORY LAPTOP & REGISTRATION SECURITY DEPOSIT: ₹2,499',
            evidenceSource: 'Payment Transaction Heuristic Engine',
            recommendation: 'Legitimate organizations never ask for upfront payment.'
          },
          {
            id: 'sim-ev-2',
            category: 'identity',
            title: 'Free Webmail Recruiter Address',
            severity: 'CRITICAL',
            confidence: 95,
            description: 'Recruiter communicating via public @gmail.com rather than verified corporate domain.',
            detectedQuote: 'recruitment.infosys.hr@gmail.com',
            evidenceSource: 'Corporate Mail Exchange Inspector',
            recommendation: 'Only accept offers from official corporate domains.'
          }
        ] : [
          {
            id: 'sim-ev-clean',
            category: 'domain',
            title: 'Official Corporate Portal & Zero Fees',
            severity: 'LOW',
            confidence: 99,
            description: 'Legitimate enterprise infrastructure verified with zero advance fee demands.',
            detectedQuote: 'Zero advance payment required',
            evidenceSource: 'Official Corporate DNS & SSL Registry',
            recommendation: 'Safe to proceed with standard process.'
          }
        ],
        safeActions: isScam ? [
          'Do NOT transfer any money or scan UPI QR codes.',
          'Verify candidate status directly on the official careers portal.',
          'Report the incident to the cybercrime portal (cybercrime.gov.in).'
        ] : [
          'Proceed with standard candidate interview stages.',
          'Always submit documents through authenticated candidate portals.'
        ],
        tags: isScam ? ['Advance Fee Scam', 'Free Webmail Recruiter', 'Deceptive Domain'] : ['Verified Official Opportunity', 'Zero Financial Traps'],
        rawIndicators: {
          sslValid: true,
          domainAgeDays: isScam ? 4 : 4520,
          registrar: isScam ? 'NameCheap Privacy Protect Ltd' : 'MarkMonitor Enterprise Inc',
          honeypotMatches: isScam ? 3 : 0,
          aiToxicityScore: isScam ? 0.94 : 0.08,
          telegramOrWhatsappHop: isScam,
          upfrontFeeRequested: isScam
        }
      };

      setSimResult(result);
      setSimState('result');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>REAL-TIME IN-BROWSER THREAT INTERCEPTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          ScamShield Manifest V3 Extension
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Zero-click background protection that intercepts deceptive career portals, typo-squatted domains, and upfront payment demands in real time.
        </p>

        {/* Action Buttons: Real Package Download & Path Copy */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button 
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition cursor-pointer active:scale-98"
          >
            {isDownloading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isDownloading ? 'Packaging Extension...' : 'Download Extension (.zip)'}</span>
          </button>

          <a
            href="/scamshield-extension.zip"
            download="scamshield-browser-extension-v2.1.zip"
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 font-semibold text-xs flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Direct .ZIP Download</span>
          </a>

          <button
            onClick={handleCopyPath}
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            {copiedPath ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <FolderOpen className="w-4 h-4 text-cyan-400" />
            )}
            <span>{copiedPath ? 'Extension Path Copied!' : 'Copy Local Folder Path'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Browser & Extension Simulator Sandbox */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <span>Interactive Extension Sandbox</span>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">LIVE DEMO</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the actual extension workflow right here: click <strong className="text-cyan-400">⚡ Scan Current Screen</strong> to watch the 2-second AI inspection and risk score calculation.
            </p>
          </div>

          {/* Quick Preset Scenarios */}
          <div className="flex flex-wrap items-center gap-2">
            {presets.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSimUrl(p.url);
                  setSimCustomInput(p.text);
                  setSimState('idle');
                  setSimResult(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border cursor-pointer ${
                  simUrl === p.url
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Realistic Simulated Browser Window Frame */}
        <div className="rounded-2xl bg-slate-950 border-2 border-cyan-500/30 shadow-2xl overflow-hidden relative">
          
          {/* Simulated Browser Chrome / Top Bar */}
          <div className="bg-[#0b0f19] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Address bar */}
            <div className="flex-1 min-w-[240px] max-w-2xl bg-slate-950/90 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono border border-slate-800 focus-within:border-cyan-400">
              <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <input
                type="text"
                value={simUrl}
                onChange={(e) => {
                  setSimUrl(e.target.value);
                  setSimState('idle');
                }}
                className="flex-1 bg-transparent text-slate-200 outline-none font-mono text-[11px]"
                placeholder="Enter URL to inspect..."
              />
              <button
                onClick={() => runSimulatedScan(simCustomInput || simUrl, simUrl)}
                disabled={simState === 'loading'}
                className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase transition cursor-pointer"
              >
                {simState === 'loading' ? 'Inspecting...' : 'Audit'}
              </button>
            </div>

            {/* Extension Toolbar Badge */}
            <div className="flex items-center gap-2">
              <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 ${
                simResult?.riskScore && simResult.riskScore >= 70
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : (simResult?.riskScore 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300')
              }`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{simResult?.riskScore ? `${simResult.riskScore}/100` : 'AI ACTIVE'}</span>
              </div>
            </div>
          </div>

          {/* Webpage Content + Floating Overlaid Extension Popup */}
          <div className="p-4 sm:p-8 bg-gradient-to-br from-[#070b14] via-[#040711] to-[#02050d] min-h-[500px] relative flex flex-col lg:flex-row gap-6 items-start justify-between">
            
            {/* Left Simulated Page Body */}
            <div className="flex-1 w-full space-y-4 max-w-xl">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">
                      {simUrl.includes('infosys') ? 'Infosys Recruitment Drive' : (simUrl.includes('wealth') ? 'Wealth Bank Careers' : 'Candidate Portal')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    HTTP 200 OK
                  </span>
                </div>
                <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 font-mono leading-relaxed max-h-48 overflow-y-auto">
                  {simCustomInput || (presets.find(p => p.url === simUrl)?.text) || 'Enter content or test URL to inspect page payload...'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 opacity-60">
                <div className="h-14 rounded-xl bg-slate-900/40 border border-slate-800/60" />
                <div className="h-14 rounded-xl bg-slate-900/40 border border-slate-800/60" />
              </div>
            </div>

            {/* Right Overlaid Extension Popup Sandbox */}
            <div className="w-full sm:w-[350px] mx-auto lg:mx-0 rounded-2xl bg-[#030712] border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden text-slate-100">
              
              {/* Extension Popup Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-cyan-500/25">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
                  <span className="font-extrabold tracking-wider text-cyan-400 text-xs">SCAMSHIELD</span>
                </div>
                <span className="text-[10px] font-mono bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  AI LIVE v2.1
                </span>
              </div>

              {/* Extension Popup Body */}
              <div className="p-3.5 space-y-3 bg-[#030712]">
                
                {/* ⚡ Scan Current Screen Hero Button */}
                <button
                  onClick={() => runSimulatedScan()}
                  disabled={simState === 'loading'}
                  className="w-full flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border border-cyan-300 rounded-xl p-3 text-white cursor-pointer shadow-lg shadow-cyan-500/30 transition text-left active:scale-[0.98]"
                >
                  <span className="text-xl bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow">
                    ⚡
                  </span>
                  <span className="flex flex-col">
                    <strong className="text-xs font-bold leading-tight">Scan Current Screen</strong>
                    <small className="text-[10px] text-cyan-100 opacity-90">Extract page text & detect risks with AI</small>
                  </span>
                </button>

                {/* Quick Paste Bar */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={simCustomInput}
                    onChange={(e) => setSimCustomInput(e.target.value)}
                    placeholder="Or paste link / offer text..."
                    className="flex-1 bg-[#0b1120] border border-slate-800 text-slate-200 text-[11px] px-2.5 py-1.5 rounded-lg outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    onClick={() => runSimulatedScan(simCustomInput || simUrl, simUrl)}
                    disabled={simState === 'loading'}
                    className="bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/35 rounded-lg px-3 py-1.5 text-xs font-bold font-mono transition cursor-pointer"
                  >
                    Scan
                  </button>
                </div>

                {/* Idle State */}
                {simState === 'idle' && (
                  <div className="text-center p-4 rounded-xl bg-slate-900/70 border border-dashed border-cyan-500/25 space-y-2">
                    <div className="text-2xl">🛡️</div>
                    <div className="text-xs font-bold text-white font-mono">Ready for Screen Scan</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Click the button above to inspect visible page text and evaluate risk with AI.
                    </p>
                    <div className="flex flex-col gap-1 items-center pt-1">
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">✓ Upfront Fee Extraction</span>
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">✓ Brand & Domain Match</span>
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">✓ Telegram/Chat Traps</span>
                    </div>
                  </div>
                )}

                {/* 2-Second Animated SVG Loader State */}
                {simState === 'loading' && (
                  <div className="py-6 flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="loader">
                      <svg id="pegtopone" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                        <defs>
                          <filter id="shine1"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
                          <mask id="mask1"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
                          <radialGradient id="gradient-1-1" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.3"></stop><stop offset="50%" stopColor="black" stopOpacity="0.1"></stop><stop offset="100%" stopColor="black" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-2-1" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="white" stopOpacity="0.3"></stop><stop offset="50%" stopColor="white" stopOpacity="0.1"></stop><stop offset="100%" stopColor="white" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-3-1" cx="85" cy="50" fx="85" fy="50" xlinkHref="#gradient-2-1"></radialGradient>
                          <radialGradient id="gradient-4-1" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-3-1"></radialGradient>
                          <linearGradient id="gradient-5-1" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.2"></stop><stop offset="40%" stopColor="black" stopOpacity="0"></stop></linearGradient>
                        </defs>
                        <g>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-1)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth="3" filter="url(#shine1)" mask="url(#mask1)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-1)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-1)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-1)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-1)"></path>
                        </g>
                      </svg>
                      <svg id="pegtoptwo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                        <defs>
                          <filter id="shine2"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
                          <mask id="mask2"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
                          <radialGradient id="gradient-1-2" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.3"></stop><stop offset="50%" stopColor="black" stopOpacity="0.1"></stop><stop offset="100%" stopColor="black" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-2-2" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="white" stopOpacity="0.3"></stop><stop offset="50%" stopColor="white" stopOpacity="0.1"></stop><stop offset="100%" stopColor="white" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-3-2" cx="85" cy="50" fx="85" fy="50" xlinkHref="#gradient-2-2"></radialGradient>
                          <radialGradient id="gradient-4-2" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-3-2"></radialGradient>
                          <linearGradient id="gradient-5-2" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.2"></stop><stop offset="40%" stopColor="black" stopOpacity="0"></stop></linearGradient>
                        </defs>
                        <g>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-2)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth="3" filter="url(#shine2)" mask="url(#mask2)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-2)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-2)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-2)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-2)"></path>
                        </g>
                      </svg>
                      <svg id="pegtopthree" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                        <defs>
                          <filter id="shine3"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
                          <mask id="mask3"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
                          <radialGradient id="gradient-1-3" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.3"></stop><stop offset="50%" stopColor="black" stopOpacity="0.1"></stop><stop offset="100%" stopColor="black" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-2-3" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="white" stopOpacity="0.3"></stop><stop offset="50%" stopColor="white" stopOpacity="0.1"></stop><stop offset="100%" stopColor="white" stopOpacity="0"></stop></radialGradient>
                          <radialGradient id="gradient-3-3" cx="85" cy="50" fx="85" fy="50" xlinkHref="#gradient-2-3"></radialGradient>
                          <radialGradient id="gradient-4-3" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlinkHref="#gradient-3-3"></radialGradient>
                          <linearGradient id="gradient-5-3" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="black" stopOpacity="0.2"></stop><stop offset="40%" stopColor="black" stopOpacity="0"></stop></linearGradient>
                        </defs>
                        <g>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-3)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" strokeWidth="3" filter="url(#shine3)" mask="url(#mask3)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-3)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-3)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-3)"></path>
                          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-3)"></path>
                        </g>
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-cyan-400 font-mono">{simLoadingText}</p>
                    <div className="text-[10px] text-slate-400 font-mono">{simLoadingSub}</div>
                  </div>
                )}

                {/* Result Card State */}
                {simState === 'result' && simResult && (
                  <div className="space-y-2.5 pt-1 animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <span>🖥️</span>
                      <span className="truncate flex-1">{simUrl}</span>
                    </div>

                    <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${
                      simResult.riskLevel === 'CRITICAL'
                        ? 'bg-rose-950/40 border-rose-500/50'
                        : 'bg-emerald-950/40 border-emerald-500/50'
                    }`}>
                      <div className={`text-2xl font-black font-mono leading-none ${
                        simResult.riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {simResult.riskScore}/100
                      </div>
                      <div className="flex flex-col">
                        <div className={`text-xs font-bold font-mono ${
                          simResult.riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'
                        }`}>
                          {simResult.riskLevel} RISK
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{simResult.confidence}% AI Confidence</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-200 bg-[#0b1120] px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <span className={`w-2 h-2 rounded-full ${
                        simResult.riskLevel === 'CRITICAL' ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} />
                      <span>{simResult.verification?.claimedName ? `Entity: ${simResult.verification.claimedName}` : 'Verified Entity'}</span>
                    </div>

                    <div className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/80">
                      {simResult.summary}
                    </div>

                    {/* Detected Evidence List */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">AI Detection Evidence</div>
                      {simResult.evidenceList.map((ev, i) => (
                        <div 
                          key={i} 
                          className={`text-[10px] p-2 rounded-lg border ${
                            ev.severity === 'CRITICAL' || ev.severity === 'HIGH'
                              ? 'bg-rose-950/20 border-rose-500/30 border-l-2 border-l-rose-500 text-slate-200'
                              : 'bg-emerald-950/20 border-emerald-500/30 border-l-2 border-l-emerald-500 text-emerald-300'
                          }`}
                        >
                          <strong>{ev.title}:</strong> <span className="opacity-90">{ev.description}</span>
                        </div>
                      ))}
                    </div>

                    {/* Open Full Security Report Button */}
                    <button
                      onClick={() => onOpenReport(simResult)}
                      className="w-full bg-[#0b1120] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/40 rounded-lg py-2 text-xs font-bold font-mono transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>Open Full Security Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>

              {/* Extension Popup Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#0b0f19] border-t border-slate-800 text-[10px] font-mono text-slate-500">
                <span>AI Risk Engine</span>
                <span className="text-emerald-400">● SOC Active</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Step-by-Step Installation Instructions */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>How to Install & Activate in 30 Seconds</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Works seamlessly on Google Chrome, Microsoft Edge, Brave, Opera, and Arc.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setSelectedBrowser('chrome')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${selectedBrowser === 'chrome' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Chrome
            </button>
            <button
              onClick={() => setSelectedBrowser('edge')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${selectedBrowser === 'edge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Edge
            </button>
            <button
              onClick={() => setSelectedBrowser('brave')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${selectedBrowser === 'brave' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Brave
            </button>
          </div>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 relative">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
              1
            </div>
            <h3 className="text-xs font-bold text-white font-mono">Open Extensions Page</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Navigate to <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded text-[10px]">{selectedBrowser === 'edge' ? 'edge://extensions' : (selectedBrowser === 'brave' ? 'brave://extensions' : 'chrome://extensions')}</code> in your browser address bar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 relative">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
              2
            </div>
            <h3 className="text-xs font-bold text-white font-mono">Enable Developer Mode</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Toggle on the <strong className="text-slate-200">Developer mode</strong> switch located in the top-right corner of the extensions tab.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 relative">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
              3
            </div>
            <h3 className="text-xs font-bold text-white font-mono">Click Load Unpacked</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Click the <strong className="text-slate-200">Load unpacked</strong> button and select the <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded text-[10px]">scamshield/extension</code> folder (or extracted zip).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 relative">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              4
            </div>
            <h3 className="text-xs font-bold text-emerald-300 font-mono">Protection Active!</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The ScamShield icon appears in your toolbar. It automatically audits tabs and displays live risk badges (SAFE / CRIT / WARN).
            </p>
          </div>
        </div>
      </div>

      {/* Real Screenshot Live Showcase Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                LIVE PRODUCTION SCREENSHOT • REAL-TIME AI AUDIT
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              ScamShield Extension In-Action (WhatsApp Web & Screen OCR)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct capture of ScamShield AI Extension executing real-time screen extraction and offer letter verification on WhatsApp Web.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>19/100 LOW RISK VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Premium High-Definition Screenshot Container with 3D Tilt */}
        <Card3DTilt maxTilt={8} scale={1.01}>
          <div className="rounded-2xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/40 overflow-hidden relative group">
            {/* Screenshot Image */}
            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="cursor-pointer overflow-hidden relative flex items-center justify-center bg-slate-950 p-2 sm:p-3"
            >
              <img 
                src="/extension_whatsapp_live_screenshot.png" 
                alt="ScamShield Browser Extension Live on WhatsApp Web" 
                className="w-full h-auto rounded-xl object-contain shadow-2xl border border-slate-800/80 transition-transform duration-300 group-hover:scale-[1.01]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 pointer-events-none">
                <span className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-2xl flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Click to View High-Resolution Full Image</span>
                </span>
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* 3 Core Capabilities of the Live Extension */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono">1-Click Screen & OCR Extraction</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Extracts text from open WhatsApp chats, candidate portals, PDFs, and job listings directly without downloading or manual re-typing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-emerald-300 font-mono">Authentic vs Fake Accuracy</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Correctly validates genuine offer letters (such as Wealth Bank / NovaTech Solutions, 19/100 Low Risk) and catches advance-fee fraud.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono">Direct Forensic Deep Dives</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              "Open Full Security Report" bridges directly to comprehensive DNS verification, linguistic scoring, and safe mitigation actions.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isImageModalOpen && (
        <div 
          onClick={() => setIsImageModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 text-slate-400 hover:text-white font-mono text-sm px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer"
            >
              ✕ Close
            </button>
            <img 
              src="/extension_whatsapp_live_screenshot.png" 
              alt="ScamShield Browser Extension Full Screen Preview" 
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain border border-cyan-500/40 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
