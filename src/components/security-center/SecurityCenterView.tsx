import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Cpu, 
  Database, 
  EyeOff, 
  FileCheck, 
  KeyRound, 
  Network, 
  CheckCircle2, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SecurityCenterViewProps {
  onOpenScanner: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SecurityCenterView: React.FC<SecurityCenterViewProps> = ({ onOpenScanner, setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBERSECURITY ARCHITECTURE & ETHICAL AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Security Architecture & Privacy By Design
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          &ldquo;Your data should not become another threat.&rdquo; ScamShield is built on transparent explainability, zero-trust telemetry, and cryptographic privacy guarantees.
        </p>
      </div>

      {/* SECTION 21: Privacy Guarantees 4-Grid */}
      <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/25 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-mono uppercase">
              Core Student Privacy Commitments
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
            ZERO-CREDENTIAL INGESTION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              🚫
            </div>
            <h4 className="text-sm font-bold text-white">
              Zero Password Retention
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never ingest or store applicant passwords, account recovery keys, or wallet seed phrases.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              🚫
            </div>
            <h4 className="text-sm font-bold text-white">
              Zero OTP & Bank Storage
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All two-factor codes and bank transaction numbers are masked on client before any AI evaluation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h4 className="text-sm font-bold text-white">
              Client-Side Screenshot Masking
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uploaded offer letters undergo automated OCR redaction to sanitize student names & roll numbers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              🌐
            </div>
            <h4 className="text-sm font-bold text-white">
              Anonymized SOC Telemetry
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Public threat radar indicators only track malicious hostnames and fraud patterns, never student identities.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 20: 5-Stage Intelligence Architecture Visual Diagram */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            SECURITY PIPELINE
          </span>
          <h2 className="text-2xl font-bold text-white">
            Explainable Multi-Vector Threat Model
          </h2>
          <p className="text-xs text-slate-400">
            How ScamShield turns raw links and screenshots into high-confidence verifiable security scores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          {/* Stage 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
            <div className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
              STAGE 01
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              DNS & WHOIS Probe
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts domain age, nameserver anomalies, registrar privacy proxy flags, and TLS certificate transparency logs.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
            <div className="text-[10px] font-mono font-bold text-purple-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
              STAGE 02
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              NLP Intent Engine
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scans message semantics for artificial urgency, guaranteed hiring promises, and pressure tactics.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
            <div className="text-[10px] font-mono font-bold text-rose-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
              STAGE 03
            </div>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 w-fit">
              <KeyRound className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              Payment Trap Detector
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parses UPI IDs, QR codes, wallet drainer bytecode, and illegal registration fee demands.
            </p>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
            <div className="text-[10px] font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
              STAGE 04
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              Honeypot Cross-Match
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-references against live decoy logs and known active scam syndicate clusters.
            </p>
          </div>

          {/* Stage 5 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-400 space-y-3 relative shadow-lg shadow-cyan-500/10">
            <div className="text-[10px] font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
              STAGE 05
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">
              Explainable Report
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Produces transparent 0-100 risk score, exact quote evidence, and safe verification URLs.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 32: Explainability vs Black-Box Notice */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-base font-bold text-white font-mono">
            OUR UX ETHICS: EVIDENCE & VERIFICATION OVER BLIND LABELS
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ScamShield never simply outputs a generic &ldquo;THIS IS A SCAM&rdquo; black-box verdict. We provide exact observed evidence, confidence intervals, and step-by-step instructions to verify opportunities through official company registries.
          </p>
        </div>

        <button
          onClick={onOpenScanner}
          className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-2 flex-shrink-0"
        >
          <span>Run Security Scan Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
