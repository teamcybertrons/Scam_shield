import React from 'react';
import { AnalysisResult } from '../../types';
import { mockCases } from '../../data/mockCases';
import { Play, Sparkles, Shield, ShieldAlert, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface DemoBarProps {
  currentCaseId: string;
  onSelectCase: (testCase: AnalysisResult) => void;
  onLaunchDemoFlow: () => void;
  isScanning: boolean;
}

export const DemoBar: React.FC<DemoBarProps> = ({
  currentCaseId,
  onSelectCase,
  onLaunchDemoFlow,
  isScanning
}) => {
  return (
    <div className="bg-slate-950/95 border-b border-cyan-500/20 py-2 px-3 sm:px-6 text-xs sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Hackathon Demo Badge & Quick Action */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium text-[11px] tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>HACKATHON DEMO CONTROLS</span>
          </div>
          
          <button
            onClick={onLaunchDemoFlow}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer active:scale-95"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isScanning ? 'Running Security Engine...' : 'Launch Live Demo Scan'}</span>
          </button>
        </div>

        {/* Right: 4 Pre-Configured Test Scenarios */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-slate-400 font-medium text-xs hidden md:inline">Test Scenarios:</span>
          
          {/* Case 1: Low Risk */}
          <button
            onClick={() => onSelectCase(mockCases[1])}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
              currentCaseId === mockCases[1].id
                ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 font-semibold'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>Case 1: Legit SWE (12)</span>
          </button>

          {/* Case 2: High Risk */}
          <button
            onClick={() => onSelectCase(mockCases[0])}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
              currentCaseId === mockCases[0].id
                ? 'bg-rose-500/20 border-rose-500/80 text-rose-300 font-semibold'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-rose-500/40 hover:text-rose-300'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-rose-400 flex-shrink-0" />
            <span>Case 2: Fake Fee (91)</span>
          </button>

          {/* Case 3: Critical Phishing */}
          <button
            onClick={() => onSelectCase(mockCases[2])}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
              currentCaseId === mockCases[2].id
                ? 'bg-red-500/20 border-red-500/80 text-red-300 font-semibold'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-red-500/40 hover:text-red-300'
            }`}
          >
            <AlertOctagon className="w-3 h-3 text-red-400 flex-shrink-0" />
            <span>Case 3: Web3 Drainer (96)</span>
          </button>

          {/* Case 4: Medium Risk */}
          <button
            onClick={() => onSelectCase(mockCases[3])}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
              currentCaseId === mockCases[3].id
                ? 'bg-amber-500/20 border-amber-500/80 text-amber-300 font-semibold'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            <Shield className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span>Case 4: Spoofed Brand (64)</span>
          </button>

        </div>
      </div>
    </div>
  );
};
