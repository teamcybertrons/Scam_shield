import React from 'react';
import { Search, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types';

interface CTASectionProps {
  onOpenScanner: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenScanner, setActiveTab }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-cyan-950/50 via-slate-900/90 to-[#070b18] border border-cyan-500/30 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROTECT YOUR CAREER & FINANCES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            &ldquo;Don&apos;t trust blindly.&rdquo; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Verify Before You Apply.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join over 1.2 million students who evaluate digital opportunities with ScamShield before paying fees, sharing credentials, or signing deceptive offers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Analyze an Opportunity</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('whatsapp-bot')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 hover:text-white font-semibold text-sm border border-emerald-500/40 hover:border-emerald-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <span>💬 Test on WhatsApp Bot</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
