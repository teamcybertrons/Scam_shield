import React, { useState, useEffect } from 'react';
import { 
  honeypotOverviewMetrics, 
  honeypotLogs as defaultLogs, 
  honeypotClusters 
} from '../../data/honeypotData';
import { HoneypotLog } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { ScamShieldAPI } from '../../services/api';
import { 
  Radio, 
  Database, 
  Globe, 
  CreditCard, 
  Layers, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  AlertTriangle,
  Zap,
  ArrowRight,
  PlusCircle,
  Send
} from 'lucide-react';

export const HoneypotDashboard: React.FC = () => {
  const [logs, setLogs] = useState<HoneypotLog[]>(defaultLogs);
  const [selectedLog, setSelectedLog] = useState<HoneypotLog>(defaultLogs[0]);
  const [newBaitText, setNewBaitText] = useState('');
  const [newBaitSource, setNewBaitSource] = useState<'WhatsApp Decoy' | 'Telegram Trap' | 'Job Board Seed' | 'Email Ingestion'>('WhatsApp Decoy');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoneypot = async () => {
      const data = await ScamShieldAPI.getHoneypotEvents();
      if (data && data.length > 0) {
        setLogs(data);
        setSelectedLog(data[0]);
      }
    };
    fetchHoneypot();
  }, []);

  const handleIngestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBaitText.trim()) return;

    setIsIngesting(true);
    const created = await ScamShieldAPI.ingestHoneypotEvent(newBaitSource, newBaitText, 'Live-Community-Trap');
    setIsIngesting(false);

    if (created) {
      setLogs(prev => [created, ...prev]);
      setSelectedLog(created);
      setNewBaitText('');
      setIngestSuccessMsg(`Telemetric event ${created.id} ingested and indexed into threat database!`);
      setTimeout(() => setIngestSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
              DEFENSIVE HONEYPOT DECOY SENSORS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Honeypot Intelligence Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Automated defensive honeypot traps safely capture and dissect active scam funnels, extracting UPI mule accounts and burner URLs in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 px-3 py-2 rounded-xl">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>ZERO REAL USER DATA INGESTED (PII SCRUBBED)</span>
        </div>
      </div>

      {/* Top 4 Honeypot Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Messages Captured</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-400">
            {(honeypotOverviewMetrics.messagesCaptured + logs.length - defaultLogs.length).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Intercepted by seed email & decoy accounts</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Unique Domains</span>
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-purple-400">
            {honeypotOverviewMetrics.uniqueDomains}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Scraped phishing & impersonation hosts</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Payment Indicators</span>
            <CreditCard className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">
            {honeypotOverviewMetrics.paymentIndicators}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">UPI IDs & fraudulent payment checkouts</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Campaign Clusters</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {honeypotOverviewMetrics.campaignClusters}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Coordinated syndicate groups mapped</p>
        </div>
      </div>

      {/* Live Ingestion Form (Real Backend Pipeline) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white font-mono uppercase">
              DEFENSIVE INGESTION PIPELINE (TEST POST /api/honeypot/ingest)
            </h3>
          </div>
          {ingestSuccessMsg && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
              ✓ {ingestSuccessMsg}
            </span>
          )}
        </div>

        <form onSubmit={handleIngestSubmit} className="flex flex-col sm:flex-row gap-3">
          <select
            value={newBaitSource}
            onChange={(e) => setNewBaitSource(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400 sm:w-48"
          >
            <option value="WhatsApp Decoy">WhatsApp Decoy</option>
            <option value="Telegram Trap">Telegram Trap</option>
            <option value="Job Board Seed">Job Board Seed</option>
            <option value="Email Ingestion">Email Ingestion</option>
          </select>

          <input
            type="text"
            value={newBaitText}
            onChange={(e) => setNewBaitText(e.target.value)}
            placeholder="Paste suspicious decoy message snippet (e.g. Pay ₹2500 security deposit via UPI to hr.tcs@oksbi on tcs-apply.xyz)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 font-sans outline-none focus:border-cyan-400"
            required
          />

          <button
            type="submit"
            disabled={isIngesting}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isIngesting ? 'Ingesting...' : 'Ingest to Honeypot'}</span>
          </button>
        </form>
      </div>

      {/* 2-Column: Live Intercepted Telemetry Feed + Forensics Dissector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Intercepted Decoy Logs List */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                LIVE INTERCEPTED DECOY STREAMS ({logs.length} Traps)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              FASTAPI LIVE INGEST
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {logs.map((log) => {
              const isSelected = selectedLog.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-bold">{log.id} • {log.source}</span>
                    <RiskBadge level={log.urgencyLevel as any} size="sm" />
                  </div>

                  <h4 className="text-xs font-bold text-white">
                    {log.scamPattern}
                  </h4>

                  <p className="text-[11px] text-slate-300 line-clamp-2 italic font-mono bg-slate-900/80 p-2 rounded border border-slate-800">
                    &ldquo;{log.snippet}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span>Cluster: <strong className="text-cyan-300">{log.clusterTag}</strong></span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Indicator Extraction Dissector */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                AUTOMATED INDICATOR EXTRACTOR
              </span>
              <h3 className="text-base font-bold text-white font-mono">
                {selectedLog.id} Forensics Dissection
              </h3>
            </div>
            <RiskBadge level={selectedLog.urgencyLevel as any} size="md" />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Intercepted Bait Message (Sanitized):
            </span>
            <p className="text-xs text-rose-200 leading-relaxed italic bg-rose-950/20 p-3 rounded-lg border border-rose-500/20 font-mono">
              &ldquo;{selectedLog.snippet}&rdquo;
            </p>
          </div>

          {/* Extracted Artifacts */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Extracted Phishing Domains:</span>
              <div className="space-y-1">
                {selectedLog.extractedIndicators.domains && selectedLog.extractedIndicators.domains.length > 0 ? (
                  selectedLog.extractedIndicators.domains.map((d, i) => (
                    <div key={i} className="text-cyan-300 font-bold bg-slate-900 p-1.5 rounded border border-slate-800">
                      {d}
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">None detected</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Extracted Payment / Wallet Handles:</span>
              <div className="space-y-1">
                {selectedLog.extractedIndicators.paymentIds && selectedLog.extractedIndicators.paymentIds.length > 0 ? (
                  selectedLog.extractedIndicators.paymentIds.map((p, i) => (
                    <div key={i} className="text-rose-400 font-bold bg-slate-900 p-1.5 rounded border border-slate-800">
                      {p}
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">None detected</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Burner Senders / Recruiter Handles:</span>
              <div className="space-y-1">
                {selectedLog.extractedIndicators.phoneNumbers && selectedLog.extractedIndicators.phoneNumbers.length > 0 ? (
                  selectedLog.extractedIndicators.phoneNumbers.map((ph, i) => (
                    <div key={i} className="text-amber-300 font-bold bg-slate-900 p-1.5 rounded border border-slate-800">
                      {ph}
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">None detected</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-mono">Takedown Notice Broadcast:</span>
            <span className="font-mono font-bold text-emerald-400">DISPATCHED TO REGISTRARS</span>
          </div>

        </div>

      </div>

      {/* Active Campaign Clusters */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-mono uppercase">
          ACTIVE THREAT CAMPAIGN CLUSTERS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {honeypotClusters.map((cluster, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono truncate">{cluster.name}</span>
                <RiskBadge level={cluster.severity as any} size="sm" />
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Threat Detections:</span>
                <span className="text-cyan-300 font-bold">{cluster.threatCount}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Active Burner Domains:</span>
                <span className="text-white font-bold">{cluster.activeDomains}</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 pt-1">
                Status: {cluster.status}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
