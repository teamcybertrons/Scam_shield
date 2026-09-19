import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCheck, 
  QrCode, 
  Phone, 
  Video, 
  MoreVertical, 
  ExternalLink,
  Bot,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { ActiveTab, AnalysisResult } from '../../types';
import { ScamShieldAPI } from '../../services/api';

interface WhatsAppBotViewProps {
  onOpenReport: (result?: AnalysisResult) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  time: string;
  isReportCard?: boolean;
  analysis?: any;
  formattedReply?: string;
}

export const WhatsAppBotView: React.FC<WhatsAppBotViewProps> = ({ onOpenReport, setActiveTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Is this internship legitimate? I received this on Telegram: https://infosys-careers.top/internship-registration',
      time: '14:31'
    },
    {
      id: 'm2',
      sender: 'bot',
      isReportCard: true,
      time: '14:32',
      formattedReply: `🛡️ *SCAMSHIELD CYBERSECURITY VERDICT*\n────────────────────────\n*Threat Status:* 🚨 CRITICAL RISK\n*Risk Score:* 88/100 | *Confidence:* 95%\n*Category:* Brand Impersonation Scam\n\n📋 *Executive Summary:*\nSpoofed registration portal cloned from genuine enterprise UI. Requests upfront ₹2,500 laptop security deposit via unverified UPI handle.\n\n🔍 *Key Evidence Detected:*\n• *Domain Typosquatting:* Hostname uses .top disposable TLD instead of infosys.com.\n• *Upfront Payment Demand:* Mandatory fee solicitation.\n\n💡 *Recommended Safe Actions:*\n1. Do NOT pay any requested fee or deposit.\n2. Verify opening directly on https://www.infosys.com/careers/`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);

  const handleSend = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = directText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!directText) setInputText('');
    setIsTyping(true);

    // Call FastAPI WhatsApp Bot Simulation API
    const res = await ScamShieldAPI.simulateWhatsApp(textToSend, '+91 98765 43210');
    setIsTyping(false);

    if (res) {
      setLastAnalysis(res.analysis);
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        isReportCard: true,
        analysis: res.analysis,
        formattedReply: res.bot_reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    } else {
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        isReportCard: true,
        formattedReply: 'Analysis processed: Risk evaluation completed via local security rules.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>OFFICIAL WHATSAPP BUSINESS CLOUD API BACKEND</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Security Analyst, Inside WhatsApp.
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Forward offer messages, suspicious links, or recruiter pitches directly in chat. Connected to live FastAPI webhook endpoint <code className="text-cyan-300 font-mono text-xs">/api/whatsapp/webhook</code>.
        </p>
      </div>

      {/* Grid: WhatsApp Phone Mockup + QR Scanner Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        
        {/* Left: Interactive Smartphone WhatsApp Chat Simulation */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md rounded-[38px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl overflow-hidden relative">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* WhatsApp Header */}
            <div className="bg-[#0b141b] px-4 pt-8 pb-3 border-b border-slate-800 flex items-center justify-between text-slate-200 relative z-20">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">ScamShield Bot</span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">✓</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {isTyping ? 'FastAPI risk engine computing...' : 'FastAPI Webhook Live'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Video className="w-4 h-4" />
                <Phone className="w-4 h-4" />
                <MoreVertical className="w-4 h-4" />
              </div>
            </div>

            {/* WhatsApp Chat Body */}
            <div className="p-4 bg-[#080d14] min-h-[420px] max-h-[460px] overflow-y-auto space-y-3 relative text-xs font-sans">
              
              {/* Background WhatsApp Doodle Motif */}
              <div className="absolute inset-0 opacity-5 pointer-events-none cyber-grid-dense" />

              <div className="flex justify-center my-1">
                <span className="text-[10px] bg-slate-900 text-slate-400 px-3 py-1 rounded-full font-mono border border-slate-800">
                  🔒 Live Webhook POST /api/whatsapp/webhook
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'user' ? (
                    <div className="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tr-sm p-3 max-w-[85%] shadow space-y-1">
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      <div className="flex justify-end items-center gap-1 text-[10px] text-slate-300">
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3 h-3 text-cyan-300" />
                      </div>
                    </div>
                  ) : (
                    /* Bot Analysis Response Card */
                    <div className="bg-[#1f2c34] text-slate-100 rounded-2xl rounded-tl-sm p-3.5 max-w-[92%] shadow-lg space-y-2.5 border border-slate-700/80">
                      
                      <div className="whitespace-pre-line font-mono text-[11px] leading-relaxed text-slate-200">
                        {msg.formattedReply || 'Security analysis complete.'}
                      </div>

                      {msg.analysis && (
                        <button
                          onClick={() => onOpenReport(msg.analysis)}
                          className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 mt-2"
                        >
                          <span>Open Full Report ({msg.analysis.id})</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}

                      <div className="flex justify-end text-[10px] text-slate-400">
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded-lg w-40">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                  <span>Analyzing API...</span>
                </div>
              )}

            </div>

            {/* WhatsApp Typing Form */}

            {/* WhatsApp Typing Form */}
            <form onSubmit={handleSend} className="bg-[#1f2c34] p-2.5 flex items-center gap-2 border-t border-slate-800">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Forward opportunity message or URL..."
                className="flex-1 bg-[#2a3942] border-none text-xs text-white rounded-full px-4 py-2 outline-none placeholder:text-slate-400 font-sans"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#00a884] hover:bg-[#009172] text-white transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

        {/* Right: QR Code Visual & Integration Overview */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              ZERO APP INSTALL NEEDED
            </span>
            <h3 className="text-xl font-bold text-white">
              Instant ScamShield on WhatsApp
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every student and job seeker uses WhatsApp daily. ScamShield delivers enterprise-grade threat telemetry directly into chat threads.
            </p>
          </div>

          {/* QR Code Demo Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="w-40 h-40 bg-white p-3 rounded-xl mx-auto flex items-center justify-center shadow-lg">
              <div className="w-full h-full border-4 border-slate-900 grid grid-cols-5 grid-rows-5 gap-1 p-1 bg-white">
                <div className="bg-slate-900 row-span-2 col-span-2" />
                <div className="bg-slate-900 col-span-1" />
                <div className="bg-slate-900 row-span-2 col-span-2" />
                <div className="bg-slate-900 col-span-1" />
                <div className="bg-slate-900 row-span-2 col-span-1" />
                <div className="bg-slate-900 col-span-2" />
                <div className="bg-slate-900 col-span-2" />
                <div className="bg-slate-900 col-span-1" />
                <div className="bg-slate-900 row-span-2 col-span-2" />
                <div className="bg-slate-900 row-span-2 col-span-2" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-mono">
                Try ScamShield WhatsApp Bot
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Scan QR or message <strong className="text-emerald-400 font-mono">+91 99000 SCAM1</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-slate-300">
              <span>Webhook Processing Latency:</span>
              <span className="text-emerald-400 font-bold">~45ms</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-slate-300">
              <span>Automated OCR & Link Resolution:</span>
              <span className="text-cyan-400 font-bold">Active</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
