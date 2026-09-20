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
  ChevronDown,
  Layers,
  Plus,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ScamShieldAPI } from '../../services/api';
import { SoundFX } from '../../services/soundEffects';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(SoundFX.getMuted());
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
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
    badgeColor?: string;
  }[] = [
    { 
      id: 'home', 
      label: 'Platform Overview', 
      desc: 'Main threat hub & live AI intelligence overview', 
      icon: Sparkles 
    },
    { 
      id: 'scanner', 
      label: 'AI Threat Scanner', 
      desc: 'Deep multi-vector URL, text & screenshot forensics', 
      icon: Search, 
      badge: 'Live Engine',
      badgeColor: 'bg-cyan-500/20 text-cyan-300'
    },
    { 
      id: 'threat-intel', 
      label: 'SOC Threat Radar', 
      desc: 'Live database telemetry & verified threat IOCs', 
      icon: Activity,
      badge: 'Real DB',
      badgeColor: 'bg-purple-500/20 text-purple-300'
    },
    { 
      id: 'extension', 
      label: 'Browser Extension', 
      desc: 'Manifest V3 active tab cyber defense & real-time warnings', 
      icon: Globe,
      badge: 'v2.1',
      badgeColor: 'bg-emerald-500/20 text-emerald-300'
    },
    { 
      id: 'whatsapp-bot', 
      label: 'WhatsApp AI Bot', 
      desc: '+91 80727 19603 socket bot for chat & photo audits', 
      icon: MessageSquare,
      badge: 'Baileys',
      badgeColor: 'bg-emerald-500/20 text-emerald-300'
    },
  ];

  const currentModule = navModules.find(m => m.id === activeTab) || navModules[0];
  const CurrentIcon = currentModule.icon;

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-300">
      
      {/* Floating Glassmorphism Island Bar */}
      <div 
        className={`relative rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#060b17]/92 backdrop-blur-2xl border border-cyan-500/35 shadow-2xl shadow-black/80' 
            : 'bg-[#070e1e]/85 backdrop-blur-xl border border-cyan-500/25 shadow-xl shadow-cyan-950/20'
        } p-2 sm:px-5 sm:py-2.5 flex items-center justify-between gap-3`}
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

        {/* 2. Center: Single Unified Menu+ Dropdown Trigger (Desktop) */}
        <div className="hidden md:flex items-center relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border ${
              dropdownOpen
                ? 'bg-slate-900 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:text-white hover:bg-slate-900/80 shadow-inner'
            }`}
          >
            <div className="flex items-center gap-2">
              <CurrentIcon className="w-4 h-4 text-cyan-400" />
              <span>Menu</span>
              <span className="text-cyan-400 font-extrabold">+</span>
              <span className="text-slate-400 text-[11px] font-normal">({currentModule.label})</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Unified Mega Dropdown Floating Island */}
          {dropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] rounded-2xl bg-[#070d1c]/95 border border-cyan-500/35 p-3 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-800/80 px-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  ScamShield Defense Modules
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  5 Integrated Systems
                </span>
              </div>

              <div className="space-y-1.5">
                {navModules.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/20 border border-cyan-400/40 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/30 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor || 'bg-cyan-500/20 text-cyan-300'}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Right: Sound FX, Engine Status & Threat Scanner CTA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Sound FX Toggle Button */}
          <button
            onClick={() => {
              const newMuted = SoundFX.toggleMute();
              setIsAudioMuted(newMuted);
            }}
            className={`p-2 rounded-full border transition flex items-center justify-center cursor-pointer ${
              isAudioMuted 
                ? 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300' 
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 shadow-sm shadow-cyan-500/20'
            }`}
            title={isAudioMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle Sound Effects"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono shadow-sm">
            <span className={`w-2 h-2 rounded-full ${backendOnline !== false ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-emerald-300 font-semibold">
              {backendOnline !== false ? 'Engine Online' : 'Connecting...'}
            </span>
          </div>

          {/* Quick Scan Primary CTA */}
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
            {navModules.map((item) => {
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
