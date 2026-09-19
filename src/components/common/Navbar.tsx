import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  Activity, 
  Globe, 
  MessageSquare, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ScamShieldAPI } from '../../services/api';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenScanner
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic backend health check
  useEffect(() => {
    const check = async () => {
      const health = await ScamShieldAPI.checkHealth();
      setBackendOnline(health !== null);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  const navLinks: { 
    id: ActiveTab; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'scanner', label: 'Threat Scanner', icon: Search, badge: 'Live AI' },
    { id: 'threat-intel', label: 'SOC Threat Radar', icon: Activity },
    { id: 'extension', label: 'Browser Extension', icon: Globe },
    { id: 'whatsapp-bot', label: 'WhatsApp Bot', icon: MessageSquare },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/92 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl shadow-black/80'
          : 'bg-[#030712]/75 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* 1. Left: Brand Logo & Tag */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border border-cyan-400/40 shadow-lg shadow-cyan-500/15 group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-none">
                  Scam<span className="text-cyan-400">Shield</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hidden sm:inline-block">
                  AI v2.4
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
                TRUST BEFORE YOU APPLY
              </span>
            </div>
          </div>

          {/* 2. Center: Sleek Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-slate-950/60 border border-slate-800/80 shadow-inner">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-transparent text-cyan-300 border border-cyan-400/40 shadow-md shadow-cyan-500/10 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-cyan-400 text-slate-950' 
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Live Telemetry Indicator & CTA Action */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Live Socket Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono shadow-sm">
              <span className={`w-2 h-2 rounded-full ${backendOnline !== false ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-emerald-300 font-semibold">
                {backendOnline !== false ? 'SOC Engine Online' : 'Connecting...'}
              </span>
            </div>

            {/* Launch Threat Scanner CTA */}
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Threat Scanner</span>
              <span className="sm:hidden">Scan</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070d1c]/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between px-2 text-[11px] font-mono text-slate-400">
            <span>Deterministic AI Engine</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
