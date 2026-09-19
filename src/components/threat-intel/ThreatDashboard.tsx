import React, { useState, useEffect } from 'react';
import { 
  threatOverviewMetrics, 
  timeSeriesActivityData, 
  scamCategoryDistribution, 
  threatHotspots, 
  recentThreatIndicators 
} from '../../data/threatData';
import { ThreatIndicator, RiskLevel } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { ScamShieldAPI } from '../../services/api';
import { 
  Activity, 
  ShieldAlert, 
  Globe, 
  CreditCard, 
  UserX, 
  Search, 
  Filter, 
  ExternalLink,
  MapPin,
  TrendingUp,
  Radio,
  Clock,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const ThreatDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [indicators, setIndicators] = useState<ThreatIndicator[]>(recentThreatIndicators);
  const [selectedIndicator, setSelectedIndicator] = useState<ThreatIndicator | null>(recentThreatIndicators[0]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchLiveThreats = async () => {
      const data = await ScamShieldAPI.getThreats();
      if (data && data.length > 0) {
        setIndicators(data);
        setSelectedIndicator(data[0]);
        setIsLive(true);
      }
    };
    fetchLiveThreats();
  }, []);

  const filteredIndicators = indicators.filter((item) => {
    const matchesSearch = item.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.targetedBrand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              SOC THREAT INTELLIGENCE RADAR
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Global Cyber Threat Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time telemetry of fraudulent internship syndicates, burner domains, and spoofed recruitment networks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>INGESTION: 1.4K/sec</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 font-bold">{isLive ? 'FASTAPI DATABASE LIVE' : 'SOC ONLINE'}</span>
        </div>
      </div>

      {/* Top 4 SOC Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Active Threats</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">
            {threatOverviewMetrics.activeThreats}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active campaigns across 32 states</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Suspicious Domains</span>
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {threatOverviewMetrics.suspiciousDomains}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Typo-squatted recruitment domains</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Payment Scams</span>
            <CreditCard className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-400">
            {threatOverviewMetrics.paymentScams}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Flagged UPI handles & mule accounts</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/25 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Impersonation Attempts</span>
            <UserX className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-purple-400">
            {threatOverviewMetrics.impersonationAttempts}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Spoofed HR recruiters on WhatsApp/TG</p>
        </div>
      </div>

      {/* 2-Column Charts: Time Series Activity + Scam Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Time Series Area Chart */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                TEMPORAL TREND
              </span>
              <h3 className="text-sm font-bold text-white">
                Threat Activity Over 24 Hours
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded">
              LIVE HOURLY INGEST
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesActivityData}>
                <defs>
                  <linearGradient id="colorIntern" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPayment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#070b16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="paymentFraud" name="Payment Fraud" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPayment)" />
                <Area type="monotone" dataKey="internshipScams" name="Internship Scams" stroke="#f43f5e" fillOpacity={1} fill="url(#colorIntern)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              <span>Internship Scams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-cyan-400" />
              <span>Payment Fraud</span>
            </div>
          </div>
        </div>

        {/* Right: Scam Category Donut Chart */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                THREAT TYPOLOGY
              </span>
              <h3 className="text-sm font-bold text-white">
                Scam Category Distribution
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded">
              TOTAL: 100%
            </span>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scamCategoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {scamCategoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#070b16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {scamCategoryDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-white ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Dark Map Geographic Intelligence Section */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
              REGIONAL TELEMETRY
            </span>
            <h3 className="text-base font-bold text-white">
              Aggregated Threat Origin & Attack Concentration Hotspots
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            PRIVACY GUARANTEE: AGGREGATED METRICS ONLY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {threatHotspots.map((spot) => (
            <div
              key={spot.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <div>
                  <h5 className="text-xs font-bold text-white">{spot.city}</h5>
                  <span className="text-[10px] font-mono text-slate-400">{spot.threats} Intercepts</span>
                </div>
              </div>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                spot.status === 'HIGH' ? 'bg-rose-500/15 text-rose-400' : 'bg-amber-500/15 text-amber-400'
              }`}>
                {spot.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Threat Indicators Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              ACTIVE THREAT INDICATORS STREAM ({indicators.length} IOCs Indexed)
            </h3>
            <p className="text-xs text-slate-400">
              Live indicators captured by honeypots, background extensions, and student verification reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search indicators, domains, brands..."
                className="bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white font-mono placeholder:text-slate-500 outline-none focus:border-cyan-400 w-52 sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Fake Internship">Fake Internship</option>
              <option value="Job Offer Scam">Job Offer Scam</option>
              <option value="Crypto Phishing">Crypto Phishing</option>
              <option value="Recruiter Impersonation">Recruiter Impersonation</option>
              <option value="Data Harvest">Data Harvest</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Indicator / Target</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Targeted Brand</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">First Seen</th>
                <th className="py-3 px-3">Reports</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIndicators.map((ind) => (
                <tr 
                  key={ind.id} 
                  onClick={() => setSelectedIndicator(ind)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="py-3 px-3 font-semibold text-white truncate max-w-xs">
                    {ind.indicator}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {ind.type}
                  </td>
                  <td className="py-3 px-3 text-cyan-300">
                    {ind.targetedBrand}
                  </td>
                  <td className="py-3 px-3">
                    <RiskBadge level={ind.severity as any} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {ind.firstSeen}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-200">
                    {ind.reportsCount}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ind.status === 'Active' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                        : ind.status === 'Takedown Issued'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {ind.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
