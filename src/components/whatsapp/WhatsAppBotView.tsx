import React, { useState } from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  Bot,
  ImageIcon,
  Link2,
  FileText,
  Maximize2,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { ActiveTab, AnalysisResult } from '../../types';
import { Card3DTilt } from '../common/Card3DTilt';

interface WhatsAppBotViewProps {
  onOpenReport: (result?: AnalysisResult) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const WhatsAppBotView: React.FC<WhatsAppBotViewProps> = ({ onOpenReport }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const sampleReportData: AnalysisResult = {
    id: 'SS-2026-76LL7',
    title: 'Infosys Limited — Threat & Identity Audit',
    targetType: 'SCREENSHOT',
    targetValue: 'IMMEDIATE SELECTION - INTERNSHIP OFFER LETTER (Infosys Career Recruitment Hub)',
    analyzedAt: '2026-09-19T23:54:00Z',
    riskScore: 87,
    riskLevel: 'CRITICAL',
    confidence: 96,
    summary: 'High-confidence employment scam detected! Mandatory ₹2,499 fee deposit demanded via unverified UPI and spoofed recruiter contact handle.',
    criticalSignalsCount: 2,
    warningSignalsCount: 1,
    breakdown: {
      domainRisk: { score: 28, max: 30, label: 'Domain Authenticity Risk', desc: 'Spoofed recruiting channel' },
      paymentRisk: { score: 25, max: 25, label: 'Financial Solicitation Risk', desc: 'Mandatory upfront laptop deposit demanded' },
      identityRisk: { score: 18, max: 20, label: 'Identity & Brand Match', desc: 'Recruiter communicating via public @gmail webmail' },
      contentRisk: { score: 14, max: 15, label: 'Social Engineering & Urgency', desc: 'Artificial 24-hour expiration pressure' },
      reputationRisk: { score: 8, max: 10, label: 'Enterprise Reputation Index', desc: 'Flagged across global threat telemetry' }
    },
    timeline: [
      { time: '11:54:01', event: 'Photo Ingestion', status: 'clean', detail: 'Received high-res offer letter image from WhatsApp client.' },
      { time: '11:54:02', event: 'Neural OCR Extraction', status: 'flagged', detail: 'Extracted fee text: "MANDATORY LAPTOP & REGISTRATION SECURITY DEPOSIT: ₹2,499".' },
      { time: '11:54:03', event: 'Threat Triangulation', status: 'flagged', detail: 'Matched known advance fee scam pattern with 96% AI confidence.' }
    ],
    evidenceList: [
      {
        id: 'ev-1',
        category: 'payment',
        title: 'Upfront Fee / Deposit Demand',
        severity: 'CRITICAL',
        confidence: 96,
        description: 'Upfront Mandatory Fee / Deposit demanded (e.g. ₹2,499 laptop/registration fee). Legitimate employers never charge candidates.',
        evidenceSource: 'Payment Regex Engine',
        recommendation: 'Do NOT transfer money via UPI, QR, or bank deposit.'
      },
      {
        id: 'ev-2',
        category: 'identity',
        title: 'Free Webmail Recruiter Impersonation',
        severity: 'CRITICAL',
        confidence: 95,
        description: 'Claimed official recruiter is communicating via public webmail (recruitment.infosys.hr@gmail.com).',
        evidenceSource: 'Mail MX Inspector',
        recommendation: 'Verify openings only via official corporate portals.'
      }
    ],
    verification: {
      claimedName: 'Infosys Limited',
      claimedDomain: 'infosys.com',
      observedDomain: 'infosys.security.deposit@oksbi',
      isDomainMatch: false,
      status: 'SUSPICIOUS_MISMATCH',
      officialWebsite: 'https://www.infosys.com',
      officialCareersUrl: 'https://www.infosys.com/careers',
      notes: 'Unverified recruitment channel.'
    },
    safeActions: [
      'Do NOT pay any upfront fees, registration charges, or laptop deposits.',
      'Do NOT share Aadhaar, PAN card, or bank OTPs.',
      'Report suspicious recruiter numbers to the National Cyber Crime Portal.'
    ],
    tags: ['Infosys', 'Scam', 'SCREENSHOT'],
    rawIndicators: {
      sslValid: false,
      domainAgeDays: 0,
      registrar: 'None',
      honeypotMatches: 1,
      aiToxicityScore: 0.9,
      telegramOrWhatsappHop: true,
      upfrontFeeRequested: true
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-lg max-h-[90vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <img 
              src="/whatsapp_bot_live_screenshot.jpg" 
              alt="Live WhatsApp Bot Screenshot Full" 
              className="w-full h-auto object-contain max-h-[88vh]" 
            />
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>PRODUCTION WHATSAPP CYBER BOT ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Live WhatsApp Cyber Defense Bot
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Anyone can send photos of offer letters, forward links, or paste recruiter messages to get an instant AI risk score directly in WhatsApp chat.
        </p>
      </div>

      {/* Main Grid: Real Screenshot Showcase + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left: Real Screenshot Showcase with 3D Tilt */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <Card3DTilt maxTilt={10} scale={1.02} className="w-full max-w-sm">
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative group border border-emerald-500/30 bg-slate-900">
              {/* Actual Screenshot Image */}
              <div 
                onClick={() => setIsZoomed(true)}
                className="relative cursor-zoom-in group-hover:border-emerald-500/40 transition shadow-inner bg-black"
              >
                <img 
                  src="/whatsapp_bot_live_screenshot.jpg" 
                  alt="Live WhatsApp Bot Conversation Screenshot" 
                  className="w-full h-auto object-contain transition duration-300 group-hover:scale-[1.01]" 
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-4">
                  <span className="text-xs text-white font-mono bg-slate-900/95 px-3 py-1.5 rounded-lg border border-emerald-500/50 shadow-lg">
                    🔍 Click to expand full screenshot
                  </span>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </div>

        {/* Right: Live Connection, QR Code & Capabilities */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Real WhatsApp Click-to-Chat Card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Live WhatsApp Bot</h3>
                  <p className="text-xs text-emerald-400 font-mono">Direct Socket Protocol</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40 font-bold">
                ● ONLINE & ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Scan the QR code with your mobile camera or click below to message the bot directly on WhatsApp.
            </p>

            {/* QR Code Deep Link */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <div className="w-48 h-48 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center shadow-xl border border-slate-700">
                <img 
                  src="/whatsapp_official_qr.jpg" 
                  alt="Official WhatsApp Cyber Defense Bot QR Code" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div>
                <span className="text-sm font-mono text-emerald-400 font-bold tracking-wide">
                  +91 80727 19603
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Scan with camera or WhatsApp to start chat
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Launch Link */}
            <a
              href="https://wa.me/918072719603"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#00a884] hover:bg-[#009172] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Bot on WhatsApp (+91 80727 19603) ↗</span>
            </a>
          </div>

          {/* Capabilities */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
              ⚡ Multi-Modal Threat Inspection
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <ImageIcon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">Photo & OCR Analysis</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Extracts text from offer letters, payment receipts, and QR codes to detect monetary deposit traps.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <Link2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">URL & Link Inspection</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Inspects domain WHOIS age, typosquatting, TLS certificate, and disposable phishing TLDs.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <FileText className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">Text & Chat Forensics</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Detects recruiter impersonation, urgency countdown pressure, and unauthorized contact channel hops.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance telemetry */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-center font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <div className="text-emerald-400 font-bold text-sm">~25ms</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Socket Response Time</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <div className="text-cyan-400 font-bold text-sm">98.4%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">AI Neural Precision</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
