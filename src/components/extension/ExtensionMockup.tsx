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
  Copy,
  FolderOpen,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Terminal,
  Layers,
  Code
} from 'lucide-react';
import JSZip from 'jszip';
import { ActiveTab, AnalysisResult } from '../../types';
import { ScamShieldAPI } from '../../services/api';

interface ExtensionMockupProps {
  onOpenReport: (result?: AnalysisResult) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ExtensionMockup: React.FC<ExtensionMockupProps> = ({ onOpenReport, setActiveTab }) => {
  const [selectedBrowser, setSelectedBrowser] = useState<'chrome' | 'edge' | 'brave'>('chrome');
  const [copiedPath, setCopiedPath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Interactive Live Extension Simulator State
  const [simUrl, setSimUrl] = useState('https://infosys-careers-apply.xyz/internship-registration');
  const [isSimAnalyzing, setIsSimAnalyzing] = useState(false);
  const [simResult, setSimResult] = useState<AnalysisResult | null>({
    id: 'SCS-EXT-9102',
    title: 'Phishing Threat: infosys-careers-apply.xyz',
    targetType: 'URL',
    targetValue: 'https://infosys-careers-apply.xyz/internship-registration',
    analyzedAt: 'Just now',
    riskScore: 91,
    riskLevel: 'CRITICAL',
    confidence: 96,
    summary: 'High-confidence typosquatting and impersonation portal imitating Infosys Ltd with upfront monetary deposit solicitations.',
    criticalSignalsCount: 2,
    warningSignalsCount: 1,
    tags: ['LOOKALIKE_DOMAIN', 'CRITICAL_RISK', 'ADVANCE_FEE_TRAP', 'DISPOSABLE_TLD'],
    breakdown: {
      domainRisk: { score: 28, max: 30, label: 'Domain Authenticity Risk', desc: 'Typo-squatted .xyz disposable TLD.' },
      paymentRisk: { score: 24, max: 25, label: 'Financial Solicitation Risk', desc: 'Demands ₹1,999 upfront deposit.' },
      identityRisk: { score: 18, max: 20, label: 'Identity & Credential Risk', desc: 'Unverified recruitment channel.' },
      contentRisk: { score: 13, max: 15, label: 'Social Engineering & Urgency', desc: 'Artificial urgency countdown.' },
      reputationRisk: { score: 8, max: 10, label: 'Enterprise Reputation Index', desc: 'Unauthorized brand use.' }
    },
    evidenceList: [
      { id: 'e1', category: 'domain', title: 'Suspicious Domain Mismatch', severity: 'CRITICAL', confidence: 98, description: 'Domain infosys-careers-apply.xyz does not match verified official domain infosys.com', detectedQuote: 'infosys-careers-apply.xyz', evidenceSource: 'DNS & Brand Registry', recommendation: 'Do not access this portal.' },
      { id: 'e2', category: 'payment', title: 'Illegal Upfront Payment Request', severity: 'CRITICAL', confidence: 95, description: 'Mandatory ₹1,999 registration fee requested before selection.', detectedQuote: 'Pay ₹1,999 to confirm your internship seat', evidenceSource: 'Linguistic Classifier', recommendation: 'Legitimate employers never charge application fees.' },
      { id: 'e3', category: 'identity', title: 'Identity Harvest Risk', severity: 'HIGH', confidence: 92, description: 'Collects sensitive student data on an unencrypted lookalike page.', detectedQuote: 'Full Name, College Name, Payment', evidenceSource: 'Form Analyzer', recommendation: 'Do not submit credentials.' }
    ],
    verification: {
      claimedName: 'Infosys Ltd',
      claimedDomain: 'infosys.com',
      observedDomain: 'infosys-careers-apply.xyz',
      isDomainMatch: false,
      status: 'SUSPICIOUS_MISMATCH',
      officialWebsite: 'https://www.infosys.com',
      officialCareersUrl: 'https://www.infosys.com/careers/',
      notes: 'Brand Mismatch: Claimed brand is Infosys Ltd but page is hosted on untrusted domain infosys-careers-apply.xyz.'
    },
    safeActions: [
      'Do NOT pay any requested fee or deposit.',
      'Only apply via official verified portals at https://www.infosys.com/careers/.',
      'Report this fake website to cybercrime authorities.'
    ],
    timeline: [],
    rawIndicators: { sslValid: false, domainAgeDays: 3, registrar: 'NameCheap Inc.', honeypotMatches: 12, aiToxicityScore: 91, telegramOrWhatsappHop: true, upfrontFeeRequested: true }
  });

  const presetUrls = [
    { label: 'Infosys Phishing Lookalike', url: 'https://infosys-careers-apply.xyz/internship-registration' },
    { label: 'Genuine Infosys Careers', url: 'https://www.infosys.com/careers/' },
    { label: 'TCS Fake Onboarding', url: 'https://tcs-global-onboarding.xyz/deposit-verify' },
    { label: 'Google Summer Phishing', url: 'https://google-internship-portal.link/form' }
  ];

  const handleSimulateInspection = async (testUrl: string) => {
    setSimUrl(testUrl);
    setIsSimAnalyzing(true);
    try {
      const res = await ScamShieldAPI.analyzeUrl(testUrl);
      setSimResult(res);
    } catch {
      // keep previous
    } finally {
      setIsSimAnalyzing(false);
    }
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText('d:\\HACKSPORA 2.0\\scamshield\\extension');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 3000);
  };

  // Generate & Download the actual Manifest V3 zip package
  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();

      // Extension Manifest V3
      zip.file('manifest.json', JSON.stringify({
        manifest_version: 3,
        name: "ScamShield - AI Cybersecurity Threat Detector",
        version: "2.0.0",
        description: "Real-time threat intelligence and deterministic risk analysis protecting students and job seekers against phishing & internship scams.",
        permissions: ["activeTab", "storage", "tabs"],
        host_permissions: [
          "http://localhost:8000/*",
          "http://127.0.0.1:8000/*",
          "https://*/*"
        ],
        action: {
          default_popup: "popup.html",
          default_title: "ScamShield Threat Inspection"
        },
        background: {
          service_worker: "background.js"
        },
        content_scripts: [
          {
            matches: ["<all_urls>"],
            js: ["content.js"],
            run_at: "document_idle"
          }
        ]
      }, null, 2));

      // Service Worker
      zip.file('background.js', `// ScamShield Manifest V3 Background Service Worker
const API_BASE_URL = "http://localhost:8000/api";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[ScamShield Extension] Background Service Worker installed.");
  chrome.action.setBadgeBackgroundColor({ color: "#06B6D4" });
  chrome.action.setBadgeText({ text: "ON" });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    inspectTabSecurity(tabId, tab.url);
  }
});

async function inspectTabSecurity(tabId, url) {
  try {
    const response = await fetch(\`\${API_BASE_URL}/analyze/url\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url })
    });

    if (response.ok) {
      const data = await response.json();
      const score = data.riskScore;
      let badgeColor = "#10B981";
      let badgeText = "SAFE";

      if (score >= 80) {
        badgeColor = "#EF4444";
        badgeText = "CRIT";
      } else if (score >= 55) {
        badgeColor = "#F97316";
        badgeText = "HIGH";
      } else if (score >= 25) {
        badgeColor = "#F59E0B";
        badgeText = "WARN";
      }

      chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });
      chrome.storage.local.set({ [url]: data });
    }
  } catch (err) {
    console.warn("[ScamShield Extension] Backend inspection offline or unreachable:", err);
  }
}`);

      // Content Script
      zip.file('content.js', `// ScamShield Page DOM Telemetry Extractor
(() => {
  function scanPageDOM() {
    const text = document.body ? document.body.innerText : "";
    const forms = document.querySelectorAll("form");
    const paymentKeywords = ["upi", "gpay", "phonepe", "paytm", "deposit", "security fee", "registration fee", "caution fee", "refundable"];
    
    let detectedSignals = [];
    const lowerText = text.toLowerCase();
    for (const kw of paymentKeywords) {
      if (lowerText.includes(kw)) {
        detectedSignals.push(\`Keyword: \${kw}\`);
      }
    }

    if (forms.length > 0 && detectedSignals.length > 0) {
      chrome.runtime.sendMessage({
        type: "SCAMSHIELD_PAGE_TELEMETRY",
        url: window.location.href,
        signals: detectedSignals,
        formsCount: forms.length
      });
    }
  }

  if (document.readyState === "complete") {
    scanPageDOM();
  } else {
    window.addEventListener("load", scanPageDOM);
  }
})();`);

      // Popup HTML
      zip.file('popup.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ScamShield</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="header">
    <div class="logo-box">🛡️ <strong>ScamShield</strong></div>
    <div id="statusBadge" class="status-badge">Inspecting...</div>
  </div>
  <div class="card">
    <div class="score-row">
      <span class="score-label">Risk Score</span>
      <span id="scoreValue" class="score-value">--/100</span>
    </div>
    <div id="summaryText" class="summary">Analyzing tab security...</div>
  </div>
  <div class="actions">
    <button id="openReportBtn" class="btn">View Full Forensics Report</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>`);

      // Popup CSS
      zip.file('popup.css', `body {
  width: 320px;
  background-color: #030712;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
}
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.logo-box { color: #38bdf8; font-size: 14px; font-weight: bold; }
.status-badge { font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 4px; background: #06b6d4; color: #020617; }
.card { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.score-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.score-label { font-size: 12px; color: #94a3b8; }
.score-value { font-size: 18px; font-weight: bold; color: #38bdf8; }
.summary { font-size: 12px; color: #cbd5e1; line-height: 1.4; }
.btn { width: 100%; padding: 10px; border-radius: 6px; background: #06b6d4; color: #020617; font-weight: bold; border: none; cursor: pointer; }
.btn:hover { background: #38bdf8; }`);

      // Popup JS
      zip.file('popup.js', `document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;

  try {
    const res = await fetch("http://localhost:8000/api/analyze/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url })
    });
    if (res.ok) {
      const data = await res.json();
      document.getElementById("scoreValue").innerText = data.riskScore + " / 100";
      document.getElementById("summaryText").innerText = data.summary;
      const badge = document.getElementById("statusBadge");
      badge.innerText = data.riskLevel;
      badge.style.background = data.riskScore >= 80 ? "#EF4444" : (data.riskScore >= 55 ? "#F97316" : "#10B981");
      document.getElementById("openReportBtn").onclick = () => {
        chrome.tabs.create({ url: "http://localhost:5173/?report=" + data.id });
      };
    }
  } catch (e) {
    document.getElementById("summaryText").innerText = "Make sure FastAPI backend is active on http://localhost:8000";
  }
});`);

      // Readme instructions in the zip
      zip.file('README_INSTALL.txt', `SCAMSHIELD CHROME / BRAVE / EDGE EXTENSION INSTALLATION:

1. Open your browser and navigate to:
   - Chrome: chrome://extensions
   - Edge:   edge://extensions
   - Brave:  brave://extensions

2. Turn on the "Developer mode" toggle switch in the top-right corner.

3. Click the "Load unpacked" button in the top-left corner.

4. Select the folder containing these extracted extension files.

5. ScamShield is now installed! Pin the shield icon to your toolbar.
   Whenever you visit any job portal, ScamShield automatically inspects the domain and alerts you to scam risks.`);

      // Generate zip blob and trigger download
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'scamshield-browser-extension-v2.0.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate extension zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
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
              className={`px-3 py-1.5 rounded-md transition ${selectedBrowser === 'chrome' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Chrome
            </button>
            <button
              onClick={() => setSelectedBrowser('edge')}
              className={`px-3 py-1.5 rounded-md transition ${selectedBrowser === 'edge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Edge
            </button>
            <button
              onClick={() => setSelectedBrowser('brave')}
              className={`px-3 py-1.5 rounded-md transition ${selectedBrowser === 'brave' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
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

      {/* Live Interactive Extension Tester & Browser Simulation */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Interactive Extension Live Tester</span>
            </h3>
            <p className="text-xs text-slate-400">
              Test any URL in real-time to see how the ScamShield extension audits pages and alerts the user.
            </p>
          </div>

          {/* Quick Preset Picker */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 mr-1">Presets:</span>
            {presetUrls.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateInspection(preset.url)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Realistic Browser Frame Simulation */}
        <div className="rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden relative">
          
          {/* Top Browser Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Interactive URL Input Bar */}
            <div className="flex-1 max-w-2xl bg-slate-950 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono border border-slate-800 focus-within:border-cyan-400">
              <span className="text-slate-400">https://</span>
              <input
                type="text"
                value={simUrl.replace(/^https?:\/\//, '')}
                onChange={(e) => setSimUrl(`https://${e.target.value.replace(/^https?:\/\//, '')}`)}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                placeholder="domain.com/path"
              />
              <button
                onClick={() => handleSimulateInspection(simUrl)}
                disabled={isSimAnalyzing}
                className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase transition cursor-pointer"
              >
                {isSimAnalyzing ? 'Analyzing...' : 'Audit'}
              </button>
            </div>

            {/* Extension Icon in Toolbar */}
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 ${
                (simResult?.riskScore || 0) >= 80 
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : ((simResult?.riskScore || 0) >= 55 
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-400')
              }`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{simResult?.riskScore ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Webpage Simulation Content */}
          <div className="p-6 sm:p-10 bg-gradient-to-b from-[#090e1c] to-[#040711] min-h-[460px] relative">
            
            {/* Simulated Page Background */}
            <div className="max-w-xl space-y-5 opacity-70">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-200">
                    {simResult?.verification?.claimedName || 'Corporate Careers Portal'}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    simResult?.verification?.status === 'VERIFIED'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {simResult?.verification?.status || 'UNVERIFIED'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Application review and candidate assessment intake.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-3">
                <div className="h-4 bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-800/60 rounded w-2/3" />
                <div className="h-8 bg-slate-800/40 rounded w-full" />
              </div>
            </div>

            {/* Overlaid Real Extension Popup Window */}
            <div className="absolute top-6 right-6 sm:right-10 w-80 rounded-2xl bg-gradient-to-b from-[#0c1326] to-[#060a15] border-2 border-cyan-500/50 p-5 shadow-2xl backdrop-blur-xl z-20 space-y-4">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white font-mono block">SCAMSHIELD</span>
                    <span className="text-[9px] text-slate-400 font-mono">v2.0 • Active Tab</span>
                  </div>
                </div>
                
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  (simResult?.riskScore || 0) >= 80 
                    ? 'bg-rose-500 text-white' 
                    : ((simResult?.riskScore || 0) >= 55 ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-slate-950')
                }`}>
                  {simResult?.riskLevel || 'EVALUATING'}
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                (simResult?.riskScore || 0) >= 80 
                  ? 'bg-rose-950/40 border-rose-500/30' 
                  : ((simResult?.riskScore || 0) >= 55 ? 'bg-orange-950/40 border-orange-500/30' : 'bg-emerald-950/40 border-emerald-500/30')
              }`}>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Forensic Risk Score</span>
                  <span className="text-sm font-bold text-white font-mono">{simResult?.riskLevel} RISK</span>
                </div>
                <div className={`text-2xl font-extrabold font-mono ${
                  (simResult?.riskScore || 0) >= 80 ? 'text-rose-400' : ((simResult?.riskScore || 0) >= 55 ? 'text-orange-400' : 'text-emerald-400')
                }`}>
                  {simResult?.riskScore ?? 0} <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {simResult?.summary || 'Analyzing opportunity payload against live threat feeds...'}
              </p>

              {/* Evidence Signals */}
              {simResult?.evidenceList && simResult.evidenceList.length > 0 && (
                <div className="space-y-1.5 text-xs font-mono pt-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Detected Signals:
                  </span>
                  {simResult.evidenceList.slice(0, 2).map((ev, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  if (simResult) {
                    onOpenReport(simResult);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/30"
              >
                <span>View Full Forensic Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
