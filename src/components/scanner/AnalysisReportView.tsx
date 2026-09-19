import React, { useState } from 'react';
import { 
  AnalysisResult, 
  ActiveTab,
  EvidenceItem 
} from '../../types';
import { RadialRiskMeter } from '../common/RadialRiskMeter';
import { RiskBadge } from '../common/RiskBadge';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Building2, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Download, 
  Bookmark, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Copy,
  Printer,
  Info,
  Globe,
  Lock,
  ArrowRight
} from 'lucide-react';

interface AnalysisReportViewProps {
  result: AnalysisResult;
  onBackToScanner: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSaveReport?: (result: AnalysisResult) => void;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  result,
  onBackToScanner,
  setActiveTab,
  onSaveReport
}) => {
  const [expandedEvidence, setExpandedEvidence] = useState<Record<string, boolean>>({
    'ev-1': true,
    'ev-2': true
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleEvidence = (id: string) => {
    setExpandedEvidence(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSave = () => {
    setIsSaved(true);
    if (onSaveReport) {
      onSaveReport(result);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const { breakdown, verification } = result;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={onBackToScanner}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 hover:text-cyan-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SCANNER</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition hidden sm:flex"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              isSaved
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                : 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved to Vault' : 'Save Report'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 8: Header Banner */}
      <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/25 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                SCAMSHIELD SECURITY REPORT
              </span>
              <RiskBadge level={result.riskLevel} size="lg" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {result.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <div>
                Report ID: <span className="text-white font-bold">{result.id}</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Analyzed: {result.analyzedAt}</span>
              </div>
              <span className="text-slate-700">•</span>
              <div>
                Target: <span className="text-cyan-300 truncate inline-block max-w-xs align-bottom">{result.targetValue}</span>
              </div>
            </div>
          </div>

          {/* Radial Meter inside Header */}
          <div className="flex justify-center lg:justify-end">
            <RadialRiskMeter
              score={result.riskScore}
              riskLevel={result.riskLevel}
              confidence={result.confidence}
              size={180}
            />
          </div>

        </div>
      </div>

      {/* 2-Column Grid: Risk Breakdown Bars & Evidence Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Risk Breakdown Bars */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Risk Breakdown by Vector
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Score: {result.riskScore} / 100
            </span>
          </div>

          <div className="space-y-4">
            
            {/* Domain Risk */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{breakdown.domainRisk.label}</span>
                <span className="text-rose-400 font-bold">{breakdown.domainRisk.score} / {breakdown.domainRisk.max}</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(breakdown.domainRisk.score / breakdown.domainRisk.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{breakdown.domainRisk.desc}</p>
            </div>

            {/* Payment Risk */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{breakdown.paymentRisk.label}</span>
                <span className="text-rose-400 font-bold">{breakdown.paymentRisk.score} / {breakdown.paymentRisk.max}</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(breakdown.paymentRisk.score / breakdown.paymentRisk.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{breakdown.paymentRisk.desc}</p>
            </div>

            {/* Identity Risk */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{breakdown.identityRisk.label}</span>
                <span className="text-amber-400 font-bold">{breakdown.identityRisk.score} / {breakdown.identityRisk.max}</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(breakdown.identityRisk.score / breakdown.identityRisk.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{breakdown.identityRisk.desc}</p>
            </div>

            {/* Content Risk */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{breakdown.contentRisk.label}</span>
                <span className="text-amber-400 font-bold">{breakdown.contentRisk.score} / {breakdown.contentRisk.max}</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(breakdown.contentRisk.score / breakdown.contentRisk.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{breakdown.contentRisk.desc}</p>
            </div>

            {/* Reputation Risk */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{breakdown.reputationRisk.label}</span>
                <span className="text-cyan-400 font-bold">{breakdown.reputationRisk.score} / {breakdown.reputationRisk.max}</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(breakdown.reputationRisk.score / breakdown.reputationRisk.max) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{breakdown.reputationRisk.desc}</p>
            </div>

          </div>
        </div>

        {/* Right Column: SECTION 9: Vertical Evidence Timeline */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Evidence Execution Timeline
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">
              All 6 stages verified
            </span>
          </div>

          <div className="relative pl-6 space-y-5 border-l border-slate-800 font-mono text-xs">
            {result.timeline.map((item, idx) => {
              const isFlagged = item.status === 'flagged';
              const isWarning = item.status === 'warning';

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                    isFlagged ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-slate-400 text-[11px]">
                      {item.time}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                      isFlagged 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                        : isWarning 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-0.5">
                    {item.event}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* SECTION 10: "Why was this flagged?" Expandable Evidence Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
              DEEP INSPECTION AUDIT
            </span>
            <h2 className="text-xl font-bold text-white">
              Why was this flagged?
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {result.evidenceList.length} Forensics Captured
          </span>
        </div>

        <div className="space-y-3">
          {result.evidenceList.map((ev: EvidenceItem) => {
            const isExpanded = !!expandedEvidence[ev.id];
            const isCrit = ev.severity === 'HIGH' || ev.severity === 'CRITICAL';

            return (
              <div
                key={ev.id}
                className="rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition overflow-hidden"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleEvidence(ev.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">
                      {isCrit ? (
                        <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      )}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white">
                          {ev.title}
                        </h4>
                        <RiskBadge level={ev.severity} size="sm" />
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {ev.confidence}% Confidence
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {ev.description}
                      </p>
                    </div>
                  </div>

                  <button className="p-1 rounded bg-slate-800 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Forensics Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
                    {ev.detectedQuote && (
                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 font-mono text-xs">
                        <span className="text-[10px] text-rose-400 uppercase tracking-widest block mb-1">
                          DETECTED FRAUDULENT PHRASE / SIGNATURE:
                        </span>
                        <p className="text-rose-200 italic">
                          « &quot;{ev.detectedQuote}&quot; »
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block">Evidence Source</span>
                        <span className="text-slate-300">{ev.evidenceSource}</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block">Safety Recommendation</span>
                        <span className="text-emerald-400 font-sans">{ev.recommendation}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 11: Company Verification Card */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono">
              COMPANY IDENTITY & DOMAIN VALIDATION
            </h3>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
            verification.status === 'VERIFIED'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {verification.status === 'VERIFIED' ? '✓ VERIFIED OFFICIAL DOMAIN' : '⚠ NOT VERIFIED / MISMATCH'}
          </span>
        </div>

        {/* Claimed vs Observed Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Claimed Identity */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              CLAIMED ORGANIZATION
            </span>
            <div className="text-sm font-bold text-white">
              {verification.claimedName}
            </div>
            <div className="text-xs font-mono text-cyan-400">
              {verification.claimedDomain}
            </div>
          </div>

          {/* Observed Domain */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              OBSERVED HOST DOMAIN
            </span>
            <div className="text-sm font-bold text-rose-400 font-mono truncate">
              {verification.observedDomain}
            </div>
            <div className="text-xs text-slate-400">
              {verification.isDomainMatch ? 'Domain matched enterprise registry' : 'Unrelated burner proxy host'}
            </div>
          </div>

          {/* Relationship Result */}
          <div className={`p-4 rounded-xl border space-y-1 ${
            verification.isDomainMatch
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'bg-rose-950/20 border-rose-500/30'
          }`}>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ENTERPRISE RELATIONSHIP
            </span>
            <div className={`text-sm font-bold ${verification.isDomainMatch ? 'text-emerald-400' : 'text-rose-400'}`}>
              {verification.isDomainMatch ? 'Official Enterprise Asset' : 'Unauthorized Third-Party'}
            </div>
            <p className="text-[11px] text-slate-400">
              {verification.notes}
            </p>
          </div>

        </div>

        {verification.officialCareersUrl && (
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Official hiring channel for {verification.claimedName}:</span>
            </div>
            <a
              href={verification.officialCareersUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono font-bold hover:underline"
            >
              <span>{verification.officialCareersUrl}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* SECTION 12: Safe Action Panel */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-[#0a1020] to-slate-950 border border-cyan-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              DEFENSIVE PROTOCOL
            </span>
            <h3 className="text-lg font-bold text-white">
              What should you do?
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            ACTIONABLE GUIDANCE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.safeActions.map((action, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 font-mono font-bold text-xs">
                {i + 1}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Need to double check an official career listing?
          </p>
          <a
            href={verification.officialCareersUrl || 'https://google.com'}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <span>Verify Official Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};
