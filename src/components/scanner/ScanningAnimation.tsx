import React, { useState, useEffect } from 'react';
import { Shield, Check, Loader2, Cpu, Database, Globe, CreditCard, Sparkles, Crosshair } from 'lucide-react';
import { Card3DTilt } from '../common/Card3DTilt';
import { SoundFX } from '../../services/soundEffects';

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

  // Play initial scan start sound
  useEffect(() => {
    SoundFX.playScanStart();
  }, []);

  useEffect(() => {
    // Play sound for step pulse
    SoundFX.playStepPulse(currentStepIndex);

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          SoundFX.playStepPulse(next);
          return next;
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
    <div className="max-w-3xl mx-auto my-12 px-4">
      <Card3DTilt maxTilt={8} scale={1.01}>
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e162a]/95 via-[#080e1d]/95 to-[#040811] border border-cyan-500/40 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          
          {/* Cyber Corner HUD Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                  SCAMSHIELD MULTI-VECTOR ENGINE
                </h3>
                <p className="text-xs text-slate-400 font-mono truncate max-w-[200px] sm:max-w-md">
                  Target: {targetValue || 'Opportunity Forensic Target'}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>ACTIVE SCAN</span>
            </div>
          </div>

          {/* 3D Central Radar HUD Visualization */}
          <div className="relative flex flex-col items-center justify-center py-4 mb-6">
            
            {/* Outer Concentric Animated Rings */}
            <div className="relative w-44 h-44 rounded-full border border-cyan-500/40 flex items-center justify-center overflow-hidden bg-slate-950/80 shadow-2xl">
              
              {/* Radial glow backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,transparent_75%)]" />
              
              {/* Outer Counter-Rotating Dashed Ring */}
              <div className="absolute inset-2 border border-dashed border-cyan-400/30 rounded-full animate-spin-slow" />
              
              {/* Inner Rotating Ring */}
              <div className="absolute inset-6 border border-cyan-500/20 rounded-full" />
              <div className="absolute inset-10 border border-indigo-500/30 rounded-full" />
              
              {/* Crosshair lines */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/30 -translate-x-1/2" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/30 -translate-y-1/2" />
              
              {/* Rotating Radar Scanner Sweep */}
              <div 
                className="absolute inset-0 animate-radar"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(56, 189, 248, 0.45) 0deg, rgba(56, 189, 248, 0.05) 60deg, transparent 60deg)'
                }}
              />

              {/* Central Glowing Shield Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-slate-900 border border-cyan-400/80 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Soundwave Telemetry Signal Bars */}
            <div className="flex items-center gap-1 mt-4">
              {[40, 75, 55, 90, 65, 85, 45, 95, 60, 80, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-cyan-400/80 rounded-full animate-pulse"
                  style={{
                    height: `${h * 0.22}px`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* 6 Step Progress List with 3D Depth */}
          <div className="space-y-2.5 font-mono">
            {steps.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all duration-300 flex items-start justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                      : isCurrent
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/50 text-white scale-[1.01]'
                      : 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-50'
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
      </Card3DTilt>
    </div>
  );
};
