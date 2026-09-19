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
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface WhatsAppBotViewProps {
  onOpenReport: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  time: string;
  isReportCard?: boolean;
}

export const WhatsAppBotView: React.FC<WhatsAppBotViewProps> = ({ onOpenReport, setActiveTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Is this internship legitimate? I received this on Telegram: https://infosys-careers-apply.xyz/internship-registration',
      time: '14:31'
    },
    {
      id: 'm2',
      sender: 'bot',
      isReportCard: true,
      time: '14:32'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        isReportCard: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>OFFICIAL WHATSAPP BUSINESS VERIFIED</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Security Analyst, Inside WhatsApp.
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Forward offer messages, suspicious links, or screenshots directly in your daily chat app to receive instant explainable threat intelligence.
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
                    {isTyping ? 'Analyzing threat indicators...' : 'Official AI Threat Analyst'}
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
                  🔒 Messages are end-to-end encrypted & redacted
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
                      
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          <span>🛡️ ScamShield AI Analysis</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                          HIGH 🔴
                        </span>
                      </div>

                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 font-mono text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Risk Score:</span>
                          <span className="text-rose-400">88 / 100</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Status: <strong className="text-rose-400">DANGEROUS PHISHING OFFER</strong>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          Detected Red Flags:
                        </span>
                        <div className="text-rose-300 text-[11px] space-y-0.5 font-mono">
                          <div>🔴 Mandatory ₹1,999 registration fee</div>
                          <div>🟠 Typo-squatted domain (.xyz)</div>
                          <div>🟠 High pressure 30-min timer</div>
                          <div>🟠 Unverified recruiter on Telegram</div>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200">
                        <strong>Recommendation:</strong> Do NOT pay or share Aadhaar/OTP. Legitimate companies never charge fees.
                      </div>

                      <button
                        onClick={onOpenReport}
                        className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>View Full Forensics Report</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <div className="flex justify-end text-[10px] text-slate-400">
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded-lg w-36">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                  <span>Scanning...</span>
                </div>
              )}

            </div>

            {/* WhatsApp Typing Form */}
            <form onSubmit={handleSend} className="bg-[#1f2c34] p-2.5 flex items-center gap-2 border-t border-slate-800">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type opportunity URL or text..."
                className="flex-1 bg-[#2a3942] border-none text-xs text-white rounded-full px-4 py-2 outline-none placeholder:text-slate-400"
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
              Instant ScamShield on Mobile
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every student uses WhatsApp. ScamShield delivers enterprise-grade threat telemetry directly into chat threads without needing heavy app installs.
            </p>
          </div>

          {/* QR Code Demo Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="w-40 h-40 bg-white p-3 rounded-xl mx-auto flex items-center justify-center shadow-lg">
              {/* Stylized QR SVG representation */}
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
                Try ScamShield Bot
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Scan QR or message <strong className="text-emerald-400 font-mono">+91 99000 SCAM1</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-slate-300">
              <span>Webhook Processing Latency:</span>
              <span className="text-emerald-400 font-bold">1.2s</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-slate-300">
              <span>Automated OCR on Chat Images:</span>
              <span className="text-cyan-400 font-bold">Enabled</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
