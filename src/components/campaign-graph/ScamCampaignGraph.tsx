import React, { useState } from 'react';
import { campaignGraphNodes, campaignGraphEdges } from '../../data/campaignGraphData';
import { CampaignNode } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Network, 
  Building2, 
  Globe, 
  MessageSquare, 
  Link, 
  ShieldAlert, 
  CreditCard, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Info,
  Clock,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ScamCampaignGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<CampaignNode>(campaignGraphNodes[0]);
  const [scale, setScale] = useState(1);

  const getIcon = (type: CampaignNode['type']) => {
    switch (type) {
      case 'company': return Building2;
      case 'domain': return Globe;
      case 'whatsapp': return MessageSquare;
      case 'url': return Link;
      case 'campaign': return ShieldAlert;
      case 'payment': return CreditCard;
      default: return Network;
    }
  };

  const getNodeColor = (type: CampaignNode['type'], isSelected: boolean) => {
    if (isSelected) {
      return 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400';
    }
    switch (type) {
      case 'company':
        return 'bg-purple-950/60 border-purple-500/40 text-purple-300 hover:border-purple-400';
      case 'domain':
        return 'bg-blue-950/60 border-blue-500/40 text-blue-300 hover:border-blue-400';
      case 'whatsapp':
        return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400';
      case 'url':
        return 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:border-amber-400';
      case 'campaign':
        return 'bg-rose-950/80 border-rose-500/50 text-rose-300 hover:border-rose-400';
      case 'payment':
        return 'bg-red-950/80 border-red-500/50 text-red-300 hover:border-red-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              GRAPH NEURAL INTELLIGENCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Scam Campaign Intelligence Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Multi-tier topological map exposing connections between spoofed corporate brands, domains, WhatsApp senders, and UPI payment mules.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setScale(s => Math.min(s + 0.15, 1.4))}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(s => Math.max(s - 0.15, 0.7))}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            title="Reset Zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Graph Canvas Area */}
        <div className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-[#070d1d] via-[#050914] to-[#03060d] border border-cyan-500/25 p-4 sm:p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl h-[620px]">
          
          {/* Canvas Cyber Grid Background */}
          <div className="absolute inset-0 cyber-grid-dense opacity-40 pointer-events-none" />

          {/* Canvas Floating Legend */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] font-mono backdrop-blur-md">
            <span className="flex items-center gap-1 text-purple-400">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Company
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Domain
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> WhatsApp
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Campaign
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Payment
            </span>
          </div>

          {/* Interactive Transform Container */}
          <div 
            className="relative w-full h-full transition-transform duration-300 origin-center select-none"
            style={{ transform: `scale(${scale})` }}
          >
            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
              </defs>

              {campaignGraphEdges.map((edge) => {
                const source = campaignGraphNodes.find(n => n.id === edge.from);
                const target = campaignGraphNodes.find(n => n.id === edge.to);
                if (!source || !target) return null;

                const isConnectedToSelected = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);

                return (
                  <g key={edge.id}>
                    <line
                      x1={source.x}
                      y1={source.y + 20}
                      x2={target.x}
                      y2={target.y + 20}
                      stroke={isConnectedToSelected ? '#38bdf8' : 'rgba(100, 116, 139, 0.4)'}
                      strokeWidth={isConnectedToSelected ? '2.5' : '1.2'}
                      strokeDasharray={edge.animated ? '5,5' : 'none'}
                      className={edge.animated ? 'animate-pulse' : ''}
                    />
                    {edge.label && (
                      <text
                        x={(source.x + target.x) / 2}
                        y={(source.y + target.y) / 2 + 15}
                        fill={isConnectedToSelected ? '#38bdf8' : '#64748b'}
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="bg-slate-900"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {campaignGraphNodes.map((node) => {
              const Icon = getIcon(node.type);
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`z-10 p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all duration-200 shadow-lg ${getNodeColor(node.type, isSelected)} ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div className="p-1 rounded-lg bg-slate-950/60">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold font-mono truncate max-w-[140px] sm:max-w-[180px]">
                      {node.label}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {node.type.toUpperCase()} • {node.reports} reports
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
            Click any node to inspect forensics
          </div>
        </div>

        {/* Right: Selected Node Forensics Inspector Side Panel */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Info className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                INDICATOR INSPECTOR
              </h3>
            </div>
            <RiskBadge level={selectedNode.risk} size="sm" />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Selected Node
              </span>
              <h4 className="text-base font-bold text-white font-mono break-all">
                {selectedNode.label}
              </h4>
              <span className="inline-block text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1">
                TYPE: {selectedNode.type.toUpperCase()}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Threat Status:</span>
                <span className="text-rose-400 font-semibold">{selectedNode.status}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Community Reports:</span>
                <span className="text-white font-bold">{selectedNode.reports} Victims</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Associated Campaigns:</span>
                <span className="text-cyan-400 font-bold">{selectedNode.associatedCampaigns} Clusters</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>First Seen Telemetry:</span>
                <span className="text-slate-300">{selectedNode.firstSeen}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Tactical Intelligence Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {selectedNode.details}
              </p>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Automated Countermeasure:</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Indicator pushed to browser extension blocker & National Cyber Crime blacklist feed.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
