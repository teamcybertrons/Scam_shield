import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic health check
  useEffect(() => {
    const check = async () => {
      const health = await ScamShieldAPI.checkHealth();
      setBackendOnline(health !== null);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { 
    id: ActiveTab; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'scanner', label: 'Threat Scanner', icon: Search, badge: 'Live' },
    { id: 'threat-intel', label: 'SOC Radar', icon: Activity },
    { id: 'extension', label: 'Extension', icon: Globe },
    { id: 'whatsapp-bot', label: 'WhatsApp Bot', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      
      {/* Floating Glassmorphism Island Bar */}
      <div 
        className={`relative rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#060b17]/90 backdrop-blur-2xl border border-cyan-500/35 shadow-2xl shadow-black/80' 
            : 'bg-[#070e1e]/80 backdrop-blur-xl border border-cyan-500/20 shadow-xl shadow-cyan-950/20'
        } p-2 sm:px-5 sm:py-2.5 flex items-center justify-between gap-2 overflow-hidden`}
      >
        {/* Top subtle neon light accent */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* 1. Left: Brand Logo */}
        <div 
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border border-cyan-400/50 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-none">
              Scam<span className="text-cyan-400">Shield</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest hidden sm:inline-block">
              AI CYBER DEFENSE
            </span>
          </div>
        </div>

        {/* 2. Center: Floating Nav Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-full border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/20 text-cyan-300 border border-cyan-400/40 shadow-md shadow-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isActive 
                      ? 'bg-cyan-400 text-slate-950' 
                      : 'bg-cyan-500/15 text-cyan-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 3. Right: Live Telemetry Status & Quick Scan CTA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800/90 text-[11px] font-mono shadow-sm">
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="text-emerald-300 font-semibold">
              {backendOnline !== false ? 'Engine Online' : 'Connecting...'}
            </span>
          </div>

          {/* Quick Scan Primary CTA Button */}
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Threat Scanner</span>
            <span className="sm:hidden">Scan</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Floating Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-3 rounded-2xl bg-[#080e1e]/95 border border-cyan-500/30 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
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

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between px-2 text-[11px] font-mono text-slate-400">
            <span>FastAPI Multi-Vector Engine</span>
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
