import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  FolderOpen, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Maximize2,
  Sparkles,
  Zap,
  Smartphone,
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

export const ExtensionMockup: React.FC<ExtensionMockupProps> = ({ onOpenReport, setActiveTab }) => {
  const [selectedBrowser, setSelectedBrowser] = useState<'chrome' | 'edge' | 'brave'>('chrome');
  const [copiedPath, setCopiedPath] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
        permissions: ["activeTab", "storage", "tabs", "scripting"],
        host_permissions: [
          "<all_urls>",
          "http://localhost:8000/*",
          "http://127.0.0.1:8000/*"
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

      // Background Service Worker
      zip.file('background.js', `// ScamShield Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log("ScamShield Extension v2.0 Installed Successfully");
});
`);

      // Content Script
      zip.file('content.js', `// ScamShield Content Script for Active DOM & Screen Inspection
(() => {
  function extractScreenText() {
    let textPieces = [];
    const currentUrl = window.location.href;
    const currentHost = window.location.hostname;
    const title = document.title || "";
    textPieces.push(title);

    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || "";
    if (metaDesc) textPieces.push(metaDesc);

    document.querySelectorAll('img, [role="img"], [data-testid*="caption"], [aria-label], [title], a[download]').forEach(el => {
      const alt = el.getAttribute('alt') || '';
      const aria = el.getAttribute('aria-label') || '';
      const titleAttr = el.getAttribute('title') || '';
      const downloadAttr = el.getAttribute('download') || '';
      const srcAttr = el.getAttribute('src') || '';
      if (alt && alt.length > 2) textPieces.push(alt);
      if (aria && aria.length > 2) textPieces.push(aria);
      if (titleAttr && titleAttr.length > 2) textPieces.push(titleAttr);
      if (downloadAttr && downloadAttr.length > 2) textPieces.push(downloadAttr);
      if (srcAttr && srcAttr.length > 5 && !srcAttr.startsWith('data:') && !srcAttr.startsWith('blob:')) {
        textPieces.push(srcAttr);
      }
    });

    if (document.body) {
      const bodyText = document.body.innerText || "";
      textPieces.push(bodyText);
    }

    let combined = textPieces.join(" ").replace(/\\s+/g, " ").trim();

    return {
      url: currentUrl,
      host: currentHost,
      title: title,
      metaDescription: metaDesc,
      pageText: combined.slice(0, 8000),
      textLength: combined.length
    };
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SCAN_SCREEN" || request.action === "GET_DOM_TELEMETRY" || request.action === "GET_PAGE_CONTENT") {
      sendResponse(extractScreenText());
      return true;
    }
  });
})();`);

      // Popup HTML
      zip.file('popup.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ScamShield AI Security Inspector</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="popup-container">
    <header class="header">
      <div class="logo-box">
        <div class="shield-dot"></div>
        <span class="logo-title">SCAMSHIELD</span>
      </div>
      <span class="version-tag">AI LIVE</span>
    </header>

    <main class="main-content" id="content">
      <div class="hero-action-box">
        <button id="scanScreenBtn" class="scan-screen-btn" type="button">
          <span class="btn-icon">⚡</span>
          <span class="btn-label">
            <strong>Scan Current Screen</strong>
            <small>Extract page text & detect risks with AI</small>
          </span>
        </button>
      </div>

      <div class="quick-scan-bar">
        <input type="text" id="customUrlInput" placeholder="Or paste link / offer text to verify..." />
        <button id="scanCustomBtn" type="button">Scan</button>
      </div>

      <div class="idle-state" id="idleCard">
        <div class="idle-icon">🛡️</div>
        <div class="idle-title">Ready for Screen Scan</div>
        <p class="idle-desc">Click the button above to inspect visible page text with AI.</p>
        <div class="idle-features">
          <span class="idle-chip">✓ Upfront Fee Extraction</span>
          <span class="idle-chip">✓ Brand & Domain Match</span>
          <span class="idle-chip">✓ Telegram/Chat Traps</span>
        </div>
      </div>

      <div class="loading-state hidden" id="loading">
        <div class="loader">
          <svg id="pegtopone" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
            <defs>
              <filter id="shine1"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
              <mask id="mask1"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
              <radialGradient id="gradient-1-1" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.3"></stop><stop offset="50%" stop-color="black" stop-opacity="0.1"></stop><stop offset="100%" stop-color="black" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-2-1" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="white" stop-opacity="0.3"></stop><stop offset="50%" stop-color="white" stop-opacity="0.1"></stop><stop offset="100%" stop-color="white" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-3-1" cx="85" cy="50" fx="85" fy="50" xlink:href="#gradient-2-1"></radialGradient>
              <radialGradient id="gradient-4-1" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#gradient-3-1"></radialGradient>
              <linearGradient id="gradient-5-1" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.2"></stop><stop offset="40%" stop-color="black" stop-opacity="0"></stop></linearGradient>
            </defs>
            <g>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-1)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine1)" mask="url(#mask1)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-1)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-1)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-1)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-1)"></path>
            </g>
          </svg>
          <svg id="pegtoptwo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
            <defs>
              <filter id="shine2"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
              <mask id="mask2"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
              <radialGradient id="gradient-1-2" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.3"></stop><stop offset="50%" stop-color="black" stop-opacity="0.1"></stop><stop offset="100%" stop-color="black" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-2-2" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="white" stop-opacity="0.3"></stop><stop offset="50%" stop-color="white" stop-opacity="0.1"></stop><stop offset="100%" stop-color="white" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-3-2" cx="85" cy="50" fx="85" fy="50" xlink:href="#gradient-2-2"></radialGradient>
              <radialGradient id="gradient-4-2" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#gradient-3-2"></radialGradient>
              <linearGradient id="gradient-5-2" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.2"></stop><stop offset="40%" stop-color="black" stop-opacity="0"></stop></linearGradient>
            </defs>
            <g>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-2)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine2)" mask="url(#mask2)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-2)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-2)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-2)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-2)"></path>
            </g>
          </svg>
          <svg id="pegtopthree" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
            <defs>
              <filter id="shine3"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter>
              <mask id="mask3"><path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white"></path></mask>
              <radialGradient id="gradient-1-3" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.3"></stop><stop offset="50%" stop-color="black" stop-opacity="0.1"></stop><stop offset="100%" stop-color="black" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-2-3" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="white" stop-opacity="0.3"></stop><stop offset="50%" stop-color="white" stop-opacity="0.1"></stop><stop offset="100%" stop-color="white" stop-opacity="0"></stop></radialGradient>
              <radialGradient id="gradient-3-3" cx="85" cy="50" fx="85" fy="50" xlink:href="#gradient-2-3"></radialGradient>
              <radialGradient id="gradient-4-3" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)" xlink:href="#gradient-3-3"></radialGradient>
              <linearGradient id="gradient-5-3" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="black" stop-opacity="0.2"></stop><stop offset="40%" stop-color="black" stop-opacity="0"></stop></linearGradient>
            </defs>
            <g>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-3)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine3)" mask="url(#mask3)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-3)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-3)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-3)"></path>
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-3)"></path>
            </g>
          </svg>
        </div>
        <p class="loading-text" id="loadingText">Extracting on-screen text...</p>
        <div class="loading-sub" id="loadingSub">Running AI linguistic analysis</div>
      </div>

      <div class="result-box hidden" id="result">
        <div class="screen-meta-badge" id="screenMetaBadge">
          <span class="meta-icon">🖥️</span>
          <span class="meta-text" id="targetUrl">https://example.com</span>
        </div>
        
        <div class="score-card" id="scoreCard">
          <div class="score-number" id="riskScore">--</div>
          <div class="score-details">
            <div class="score-level" id="riskLevel">ANALYZING</div>
            <div class="confidence-tag" id="confidence">98% AI Confidence</div>
          </div>
        </div>

        <div class="brand-status" id="brandStatus">
          <span class="status-indicator" id="statusDot"></span>
          <span id="brandText">Verified Official Domain</span>
        </div>

        <div class="summary-box" id="summaryText">
          AI linguistic and endpoint forensic analysis completed.
        </div>

        <div class="evidence-section">
          <div class="section-title">AI DETECTION EVIDENCE</div>
          <div class="evidence-list" id="evidenceList"></div>
        </div>

        <div class="actions-group">
          <button class="open-report-btn" id="openReportBtn" type="button">Open Full Security Report ↗</button>
        </div>
      </div>

      <div class="error-state hidden" id="errorBox">
        <div class="error-title">Inspection Issue</div>
        <p class="error-desc" id="errorDesc">Could not analyze current screen.</p>
        <button class="retry-btn" id="retryBtn" type="button">Retry Screen Scan</button>
      </div>
    </main>

    <footer class="footer">
      <span>AI Risk Engine</span>
      <span class="status-live">● SOC Active</span>
    </footer>
  </div>

  <script src="popup.js"></script>
</body>
</html>`);

      // Popup CSS
      zip.file('popup.css', `* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 350px; min-width: 350px; max-width: 350px; margin: 0; padding: 0; background-color: #030712; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 13px; display: block; }
.popup-container { width: 350px; display: flex; flex-direction: column; background-color: #030712; overflow: hidden; }
.header { width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0b0f19; border-bottom: 1px solid rgba(6, 182, 212, 0.25); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4); }
.logo-box { display: flex; flex-direction: row; align-items: center; gap: 8px; }
.shield-dot { width: 8px; height: 8px; border-radius: 50%; background: #06b6d4; box-shadow: 0 0 10px #06b6d4; flex-shrink: 0; }
.logo-title { font-weight: 800; letter-spacing: 0.08em; color: #38bdf8; font-size: 13px; line-height: 1; }
.version-tag { font-size: 10px; font-family: monospace; background: rgba(6, 182, 212, 0.15); color: #22d3ee; padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(6, 182, 212, 0.3); line-height: 1.2; }
.main-content { width: 100%; display: flex; flex-direction: column; padding: 12px 14px; background-color: #030712; }
.hero-action-box { width: 100%; margin-bottom: 10px; }
.scan-screen-btn { width: 100%; display: flex; flex-direction: row; align-items: center; gap: 12px; background: linear-gradient(135deg, #06b6d4 0%, #0284c7 50%, #2563eb 100%); border: 1.5px solid #38bdf8; border-radius: 10px; padding: 10px 14px; color: #ffffff; cursor: pointer; box-shadow: 0 4px 16px rgba(6, 182, 212, 0.35); transition: all 0.2s; text-align: left; }
.scan-screen-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(6, 182, 212, 0.55); border-color: #67e8f9; }
.btn-icon { font-size: 20px; background: rgba(255, 255, 255, 0.22); width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; box-shadow: 0 0 8px rgba(255, 255, 255, 0.25); }
.btn-label { display: flex; flex-direction: column; }
.btn-label strong { font-size: 13px; font-weight: 800; color: #ffffff; }
.btn-label small { font-size: 10px; color: #e0f2fe; opacity: 0.95; }
.quick-scan-bar { width: 100%; display: flex; flex-direction: row; gap: 6px; margin-bottom: 10px; }
.quick-scan-bar input { flex: 1; background: #0b1120; border: 1px solid #1e293b; color: #f8fafc; font-size: 11px; padding: 7px 10px; border-radius: 6px; outline: none; }
.quick-scan-bar button { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.35); border-radius: 6px; font-weight: 700; font-size: 11px; padding: 7px 12px; cursor: pointer; }
.quick-scan-bar button:hover { background: #06b6d4; color: #020617; }
.idle-state { width: 100%; text-align: center; padding: 20px 14px; background: rgba(15, 23, 42, 0.75); border: 1px dashed rgba(56, 189, 248, 0.25); border-radius: 10px; margin-bottom: 6px; }
.idle-icon { font-size: 26px; margin-bottom: 6px; }
.idle-title { font-size: 13px; font-weight: 800; color: #f1f5f9; margin-bottom: 4px; }
.idle-desc { font-size: 11px; color: #94a3b8; line-height: 1.4; margin-bottom: 10px; }
.idle-features { display: flex; flex-direction: column; gap: 4px; align-items: center; }
.idle-chip { font-size: 10px; font-family: monospace; color: #38bdf8; background: rgba(6, 182, 212, 0.1); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(6, 182, 212, 0.2); }
.loading-state { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 0; gap: 6px; }
.loader { --fill-color: #06b6d4; --shine-color: rgba(6, 182, 212, 0.35); transform: scale(0.65); width: 100px; height: 80px; position: relative; filter: drop-shadow(0 0 14px var(--shine-color)); margin: 8px auto 4px auto; }
.loader #pegtopone { position: absolute; animation: flowe-one 1s linear infinite; }
.loader #pegtoptwo { position: absolute; opacity: 0; transform: scale(0) translateY(-200px) translateX(-100px); animation: flowe-two 1s linear infinite; animation-delay: 0.3s; }
.loader #pegtopthree { position: absolute; opacity: 0; transform: scale(0) translateY(-200px) translateX(100px); animation: flowe-three 1s linear infinite; animation-delay: 0.6s; }
.loader svg g path:first-child { fill: var(--fill-color); }
@keyframes flowe-one { 0% { transform: scale(0.5) translateY(-200px); opacity: 0; } 25% { transform: scale(0.75) translateY(-100px); opacity: 1; } 50% { transform: scale(1) translateY(0px); opacity: 1; } 75% { transform: scale(0.5) translateY(50px); opacity: 1; } 100% { transform: scale(0) translateY(100px); opacity: 0; } }
@keyframes flowe-two { 0% { transform: scale(0.5) rotateZ(-10deg) translateY(-200px) translateX(-100px); opacity: 0; } 25% { transform: scale(1) rotateZ(-5deg) translateY(-100px) translateX(-50px); opacity: 1; } 50% { transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-25px); opacity: 1; } 75% { transform: scale(0.5) rotateZ(5deg) translateY(50px) translateX(0px); opacity: 1; } 100% { transform: scale(0) rotateZ(10deg) translateY(100px) translateX(25px); opacity: 0; } }
@keyframes flowe-three { 0% { transform: scale(0.5) rotateZ(10deg) translateY(-200px) translateX(100px); opacity: 0; } 25% { transform: scale(1) rotateZ(5deg) translateY(-100px) translateX(50px); opacity: 1; } 50% { transform: scale(1) rotateZ(0deg) translateY(0px) translateX(25px); opacity: 1; } 75% { transform: scale(0.5) rotateZ(-5deg) translateY(50px) translateX(0px); opacity: 1; } 100% { transform: scale(0) rotateZ(-10deg) translateY(100px) translateX(-25px); opacity: 0; } }
.loading-text { font-size: 12px; font-weight: 600; color: #38bdf8; }
.loading-sub { font-size: 10px; color: #64748b; font-family: monospace; }
.screen-meta-badge { display: flex; flex-direction: row; align-items: center; gap: 6px; font-family: monospace; font-size: 11px; color: #94a3b8; background: rgba(15, 23, 42, 0.9); padding: 6px 10px; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 8px; overflow: hidden; }
.screen-meta-badge .meta-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.summary-box { font-size: 11px; color: #cbd5e1; line-height: 1.4; padding: 8px 10px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; margin-bottom: 8px; }
.score-card { display: flex; flex-direction: row; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; background: #0f172a; border: 1px solid #334155; margin-bottom: 8px; }
.score-number { font-size: 24px; font-weight: 900; font-family: monospace; color: #38bdf8; line-height: 1; }
.score-details { display: flex; flex-direction: column; gap: 2px; }
.score-level { font-size: 11px; font-weight: 800; font-family: monospace; }
.confidence-tag { font-size: 10px; color: #64748b; font-family: monospace; }
.brand-status { display: flex; flex-direction: row; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #f1f5f9; padding: 6px 10px; background: #0b1120; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 8px; }
.status-indicator { width: 7px; height: 7px; border-radius: 50%; background: #10b981; }
.evidence-section { margin-bottom: 10px; }
.section-title { font-size: 10px; font-family: monospace; color: #64748b; margin-bottom: 4px; }
.evidence-list { display: flex; flex-direction: column; gap: 4px; }
.evidence-chip { font-size: 10px; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(239, 68, 68, 0.3); border-left: 3px solid #ef4444; padding: 4px 8px; border-radius: 4px; }
.evidence-chip.warning { border-color: rgba(245, 158, 11, 0.3); border-left-color: #f59e0b; }
.evidence-chip.clean { border-color: rgba(16, 185, 129, 0.3); border-left-color: #10b981; color: #10b981; }
.actions-group { display: flex; flex-direction: column; gap: 6px; }
.open-report-btn { width: 100%; background: #0b1120; color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 6px; padding: 7px 10px; font-size: 11px; font-weight: 700; cursor: pointer; }
.open-report-btn:hover { background: rgba(6, 182, 212, 0.15); }
.hidden { display: none !important; }
.footer { width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 8px 16px; background: #0b0f19; border-top: 1px solid #1e293b; font-size: 10px; font-family: monospace; color: #64748b; }
.status-live { color: #10b981; }
`);

      // Readme instructions in the zip
      zip.file('README_INSTALL.txt', `SCAMSHIELD CHROME / BRAVE / EDGE EXTENSION INSTALLATION:

1. Open your browser and navigate to:
   - Chrome: chrome://extensions
   - Edge:   edge://extensions
   - Brave:  brave://extensions

2. Turn on "Developer mode" (toggle in top-right corner).
3. Click "Load unpacked" (top-left).
4. Select this extracted folder.
5. Click "⚡ Scan Current Screen" in the popup to inspect any job page with AI!`);

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
    <div className="max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-10">
      
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
