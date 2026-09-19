import React, { useState } from 'react';
import { AnalysisResult, ActiveTab, RiskLevel } from '../../types';
import { mockCases } from '../../data/mockCases';
import { RiskBadge } from '../common/RiskBadge';
import { 
  UserCheck, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Bookmark, 
  Search, 
  Filter, 
  Clock, 
  ExternalLink, 
  FileText, 
  Trash2,
  Download
} from 'lucide-react';

interface UserProtectionViewProps {
  onSelectReport: (report: AnalysisResult) => void;
  savedReports: AnalysisResult[];
}

export const UserProtectionView: React.FC<UserProtectionViewProps> = ({
  onSelectReport,
  savedReports
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveSubTab] = useState<'history' | 'saved'>('history');

  const historyItems: AnalysisResult[] = [
    mockCases[0], // Infosys
    mockCases[1], // Google
    mockCases[2], // Apex
    mockCases[3], // Microsoft
  ];

  const filteredHistory = historyItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.targetValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.verification.claimedName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = activeFilter === 'All' || item.riskLevel === activeFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              STUDENT CYBER DEFENSE VAULT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            My Protection Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Personal historical log of analyzed opportunities, fraud alerts avoided, and bookmarked security reports.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
          ACCOUNT: <strong className="text-white font-mono">student.alex@campus.edu</strong>
        </div>
      </div>

      {/* Top 3 Protection Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Opportunities Checked</span>
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-4xl font-extrabold font-mono text-white">
            27
          </div>
          <p className="text-xs text-slate-400 mt-1">Verified via URL, chat & offer letters</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">High Risk Detected</span>
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-4xl font-extrabold font-mono text-rose-400">
            8
          </div>
          <p className="text-xs text-slate-400 mt-1">Direct payment scams & spoofed recruiters</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Estimated Loss Avoided</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-extrabold font-mono text-emerald-400">
            ₹24,500
          </div>
          <p className="text-xs text-slate-400 mt-1">12 fraudulent registration fee demands averted</p>
        </div>
      </div>

      {/* Section Tabs: History vs Saved Reports */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 pb-2 px-1 text-sm font-mono font-bold transition border-b-2 cursor-pointer ${
            activeTab === 'history'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Analysis History ({historyItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex items-center gap-2 pb-2 px-1 text-sm font-mono font-bold transition border-b-2 cursor-pointer ${
            activeTab === 'saved'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Reports ({savedReports.length > 0 ? savedReports.length : 1})</span>
        </button>
      </div>

      {/* Tab 1: Analysis History */}
      {activeTab === 'history' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search past reports by company, link..."
                className="bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white font-mono placeholder:text-slate-500 outline-none focus:border-cyan-400 w-64 sm:w-80"
              />
            </div>

            {/* Severity Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['All', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeFilter === f
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* History List */}
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectReport(item)}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-1">
                    <RiskBadge level={item.riskLevel} size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                        {item.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono truncate max-w-sm sm:max-w-xl mt-0.5">
                      {item.targetValue}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                      <span>Claimed: <strong className="text-slate-300">{item.verification.claimedName}</strong></span>
                      <span>•</span>
                      <span>{item.analyzedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <div className="text-right font-mono hidden sm:block">
                    <div className="text-sm font-bold text-white">
                      {item.riskScore} <span className="text-slate-500 text-xs">/100</span>
                    </div>
                    <span className="text-[10px] text-cyan-400">
                      {item.confidence}% Conf
                    </span>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-900 group-hover:bg-cyan-500/20 text-slate-300 group-hover:text-cyan-300 border border-slate-800 text-xs font-mono transition flex items-center gap-1">
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Saved Reports Vault */}
      {activeTab === 'saved' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase font-mono">
              Bookmarked Security Audits
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Exportable Evidence Reports
            </span>
          </div>

          <div className="space-y-3">
            {[mockCases[0]].map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <Bookmark className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {item.id} • Saved on 19 Sep 2026
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectReport(item)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-mono transition"
                  >
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
