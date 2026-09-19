import React, { useState, useEffect } from 'react';
import { Shield, Check, Loader2, Cpu, Database, Globe, CreditCard, Sparkles } from 'lucide-react';

interface ScanningAnimationProps {
  onComplete?: () => void;
  targetValue: string;
}

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({ onComplete, targetValue }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: 'Extracting indicators & network headers', icon: Globe, detail: 'Parsing ASN routing, TLS cipher suite, WHOIS registration details...' },
    { title: 'Inspecting URL redirects & SSL certificate chain', icon: Shield, detail: 'Traversing HTTP hops, checking CRL revocation & certificate transparency logs...' },
    { title: 'Analyzing NLP urgency triggers & payment intents', icon: CreditCard, detail: 'Scanning for UPI IDs, upfront seat deposits, advance registration fees...' },
    { title: 'Checking authoritative corporate identity signals', icon: Database, detail: 'Cross-verifying claimed enterprise against official DNS, trademarks, & verified directories...' },
    { title: 'Evaluating multi-vector neural risk engine', icon: Cpu, detail: 'Synthesizing forensic security vectors; computing calibrated threat score...' },
    { title: 'Generating cryptographic evidence report', icon: Sparkles, detail: 'Formatting risk breakdown, verified evidence quotes, and safe action checklist...' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, 320);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 rounded-2xl bg-gradient-to-b from-[#0e162a] via-[#080e1d] to-[#050811] border border-cyan-500/40 shadow-2xl backdrop-blur-xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono tracking-tight">
              SCAMSHIELD INTELLIGENCE ENGINE
            </h3>
            <p className="text-xs text-slate-400 font-mono truncate max-w-sm sm:max-w-md">
              Target: {targetValue || 'https://opportunity-verification.in'}
            </p>
          </div>
        </div>
        <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>SCANNING</span>
        </div>
      </div>

      {/* Central Radar Visualization */}
      <div className="relative flex justify-center items-center py-6 mb-8">
        {/* Outer Circle with Sweep */}
        <div className="relative w-40 h-40 rounded-full border border-cyan-500/30 flex items-center justify-center overflow-hidden bg-slate-950/60 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 border border-cyan-500/20 rounded-full scale-75" />
          <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-50" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-cyan-500/20 -translate-x-1/2" />
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/20 -translate-y-1/2" />
          
          {/* Radar rotating sweep */}
          <div 
            className="absolute inset-0 animate-radar"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(56, 189, 248, 0.4) 0deg, rgba(56, 189, 248, 0.05) 60deg, transparent 60deg)'
            }}
          />

          <Shield className="w-10 h-10 text-cyan-400 relative z-10 animate-pulse" />
        </div>
      </div>

      {/* 6 Step Progress List */}
      <div className="space-y-3 font-mono">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-start justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950/50 text-white scale-[1.01]'
                  : 'bg-slate-950/40 border-slate-800/50 text-slate-600 opacity-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <span className="text-[10px] text-slate-500">{idx + 1}</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">
                      {step.title}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 animate-pulse">
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  {isCurrent && (
                    <p className="text-[11px] text-cyan-300/80 mt-1 font-sans">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-mono">
                {isDone ? (
                  <span className="text-emerald-400 font-bold">DONE</span>
                ) : isCurrent ? (
                  <span className="text-cyan-400">ANALYZING</span>
                ) : (
                  <span className="text-slate-600">QUEUED</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
