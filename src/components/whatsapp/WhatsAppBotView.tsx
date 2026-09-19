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
  AlertTriangle
} from 'lucide-react';
import { ActiveTab, AnalysisResult } from '../../types';
import { analyzeOpportunityInput } from '../../utils/dynamicAnalyzer';

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
  analysis?: AnalysisResult;
}

export const WhatsAppBotView: React.FC<WhatsAppBotViewProps> = ({ onOpenReport, setActiveTab }) => {
  const initialAnalysis = analyzeOpportunityInput(
    'MESSAGE',
    'https://careers.google.com'
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Is this official: https://careers.google.com ?',
      time: '14:31'
    },
    {
      id: 'm2',
      sender: 'bot',
      isReportCard: true,
      analysis: initialAnalysis,
      time: '14:31'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const dynamicResult = analyzeOpportunityInput('MESSAGE', query);
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        isReportCard: true,
        analysis: dynamicResult,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>REAL-TIME WHATSAPP INTEGRATION SIMULATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Security Analyst, Inside WhatsApp.
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Forward offer messages, suspicious links, or offer details directly into the chat to receive instant multi-vector forensic audits.
        </p>
      </div>

      {/* Grid: WhatsApp Phone Mockup + QR Scanner Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        
        {/* Left: Interactive Smartphone WhatsApp Chat Simulation */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md rounded-[38px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl overflow-hidden relative">
            
            {/* Phone Top Notch Bar */}
            <div className="bg-[#1f2c34] px-5 py-3 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  🛡️
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>ScamShield Bot</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Official Defense Bot
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Video className="w-4 h-4 hover:text-white cursor-pointer" />
                <Phone className="w-4 h-4 hover:text-white cursor-pointer" />
                <MoreVertical className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Chat Body Window */}
            <div className="h-[440px] bg-[#0b141a] p-4 overflow-y-auto space-y-3">
              
              <div className="text-center my-2">
                <span className="text-[10px] bg-[#182229] text-slate-400 px-3 py-1 rounded-full border border-slate-800">
                  Messages are encrypted client-side with zero retention.
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
                    /* Dynamic Bot Analysis Response Card */
                    <div className="bg-[#1f2c34] text-slate-100 rounded-2xl rounded-tl-sm p-3.5 max-w-[92%] shadow-lg space-y-2.5 border border-slate-700/80">
                      
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          <span>🛡️ ScamShield AI Audit</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white ${
                          msg.analysis?.riskLevel === 'HIGH' 
                            ? 'bg-rose-500' 
                            : msg.analysis?.riskLevel === 'MEDIUM'
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}>
                          {msg.analysis?.riskLevel || 'ANALYZED'}
                        </span>
                      </div>

                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 font-mono text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Risk Score:</span>
                          <span className={
                            (msg.analysis?.riskScore || 0) > 70 
                              ? 'text-rose-400' 
                              : (msg.analysis?.riskScore || 0) > 40
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }>
                            {msg.analysis?.riskScore || 0} / 100
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">
                          {msg.analysis?.title || 'Opportunity Verification'}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          Signals Detected ({msg.analysis?.evidenceList.length || 0}):
                        </span>
                        <div className="text-[11px] space-y-1 font-mono">
                          {msg.analysis?.evidenceList.slice(0, 3).map((ev, idx) => (
                            <div key={idx} className="flex items-start gap-1 text-slate-300">
                              <span>{ev.severity === 'HIGH' ? '🔴' : (ev.severity === 'MEDIUM' ? '🟠' : '🟢')}</span>
                              <span>{ev.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                        {msg.analysis?.summary}
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
                placeholder="Type job link or message to test..."
                className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-white placeholder:text-slate-400 outline-none border border-transparent focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

        {/* Right: Connect WhatsApp Bot Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-md space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>Real-Time In-Chat Verification</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test any message in the live interactive phone simulator on the left. Type any company link or suspicious text to see ScamShield analyze it live.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">1</span>
                <div>
                  <span className="text-xs font-bold text-white block">Forward Suspicious Chats</span>
                  <span className="text-[11px] text-slate-400">Pass text, shortlinks, or recruiters without leaving your app</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">2</span>
                <div>
                  <span className="text-xs font-bold text-white block">Multi-Vector Check</span>
                  <span className="text-[11px] text-slate-400">Analyzes fee extortion, spoofed domains, and urgency tactics</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">3</span>
                <div>
                  <span className="text-xs font-bold text-white block">Explainable Risk Card</span>
                  <span className="text-[11px] text-slate-400">Clear advice on whether to proceed or block</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('scanner')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Switch to Desktop Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
