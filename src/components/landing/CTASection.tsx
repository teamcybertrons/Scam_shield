import React from 'react';
import { Search, Activity, ShieldCheck, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { ActiveTab } from '../../types';
import { Card3DTilt } from '../common/Card3DTilt';

interface CTASectionProps {
  onOpenScanner: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenScanner, setActiveTab }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card3DTilt maxTilt={8} scale={1.02}>
          <div className="rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900/90 to-[#060a16] border border-cyan-500/40 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            
            {/* Cyber Corner HUD Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>PROTECT YOUR CAREER & FINANCIAL IDENTITY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 font-sans leading-tight">
              Don&apos;t Trust Blindly. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Verify Before You Apply.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-9 leading-relaxed font-sans">
              Evaluate digital opportunities with ScamShield before paying upfront fees, sharing sensitive identity credentials, or signing deceptive employment offers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenScanner}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Analyze an Opportunity</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('whatsapp-bot')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 hover:text-white font-bold text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>💬 Test on WhatsApp Bot</span>
              </button>
            </div>

          </div>
        </Card3DTilt>
      </div>
    </section>
  );
};
