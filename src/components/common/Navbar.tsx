import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  Activity, 
  Network, 
  Radio, 
  Globe, 
  MessageSquare, 
  UserCheck, 
  Lock, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Wifi
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
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check backend health periodically
  useEffect(() => {
    const check = async () => {
      const health = await ScamShieldAPI.checkHealth();
      setBackendOnline(health !== null);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navModules: { 
    id: ActiveTab; 
    label: string; 
    desc: string;
    icon: React.ComponentType<{ className?: string }>; 
    badge?: string;
  }[] = [
    { id: 'home', label: 'Platform Overview', desc: 'Main dashboard & interactive security preview', icon: Sparkles },
    { id: 'scanner', label: 'Threat Scanner', desc: 'Deep multi-vector URL, text & screenshot analyzer', icon: Search, badge: 'Live API' },
    { id: 'threat-intel', label: 'Threat Intelligence', desc: 'SOC time-series feeds & global attack vectors', icon: Activity },
    { id: 'extension', label: 'Browser Extension', desc: 'Manifest V3 active tab cyber defense', icon: Globe },
    { id: 'whatsapp-bot', label: 'WhatsApp Bot', desc: 'Meta Cloud API webhook & live analysis in chat', icon: MessageSquare },
  ];

  const currentModule = navModules.find(m => m.id === activeTab) || navModules[0];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/15 shadow-2xl shadow-black/80'
          : 'bg-[#030712]/85 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 shadow-md shadow-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-cyan-500/30 transition-all">
              <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                Scam<span className="text-cyan-400">Shield</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                TRUST BEFORE YOU APPLY
              </span>
            </div>
          </div>

          {/* Single Unified Dropdown Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
            
            {/* Direct Home Overview Button */}
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Overview
            </button>

            {/* Unified Ecosystem Mega Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  menuDropdownOpen || activeTab !== 'home'
                    ? 'bg-slate-900 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <currentModule.icon className="w-4 h-4 text-cyan-400" />
                  <span>Platform Modules</span>
                  <span className="text-[10px] text-slate-400 font-normal">({currentModule.label})</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {menuDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] rounded-2xl bg-[#080e1c] border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 px-2">
                    <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      ScamShield Security Ecosystem
                    </span>
                    <span className="text-[10px] text-slate-400">
                      5 Integrated Defense Modules
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {navModules.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMenuDropdownOpen(false);
                          }}
                          className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500/15 border border-cyan-500/40 text-white'
                              : 'bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-0.5 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Action CTAs & Backend Connection Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Backend Health Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={backendOnline ? 'text-emerald-300' : 'text-amber-300'}>
                {backendOnline ? 'FastAPI Online' : 'Connecting Engine...'}
              </span>
            </div>

            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Threat Scanner</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              <Search className="w-3 h-3" />
              <span>Analyze</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b16] border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          <div className="grid grid-cols-1 gap-1.5">
            {navModules.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs text-left font-medium transition ${
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
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenScanner();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition shadow-lg shadow-cyan-500/20"
            >
              Launch Threat Scanner ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
