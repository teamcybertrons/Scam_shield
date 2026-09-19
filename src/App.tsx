import React, { useState } from 'react';
import { ActiveTab, AnalysisResult } from './types';
import { mockCases } from './data/mockCases';
import { analyzeOpportunityInput } from './utils/dynamicAnalyzer';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { TrustMetrics } from './components/landing/TrustMetrics';
import { LiveScannerPreview } from './components/landing/LiveScannerPreview';
import { FeatureGrid } from './components/landing/FeatureGrid';
import { CTASection } from './components/landing/CTASection';
import { ScannerEngine } from './components/scanner/ScannerEngine';
import { ScanningAnimation } from './components/scanner/ScanningAnimation';
import { AnalysisReportView } from './components/scanner/AnalysisReportView';
import { ThreatDashboard } from './components/threat-intel/ThreatDashboard';
import { ScamCampaignGraph } from './components/campaign-graph/ScamCampaignGraph';
import { HoneypotDashboard } from './components/honeypot/HoneypotDashboard';
import { ExtensionMockup } from './components/extension/ExtensionMockup';
import { WhatsAppBotView } from './components/whatsapp/WhatsAppBotView';
import { UserProtectionView } from './components/user-protection/UserProtectionView';
import { SecurityCenterView } from './components/security-center/SecurityCenterView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningTarget, setScanningTarget] = useState<string>('');
  const [savedReports, setSavedReports] = useState<AnalysisResult[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dynamic real-time scan execution
  const handleExecuteScan = (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => {
    const analysisResult = analyzeOpportunityInput(type, value);
    setScanningTarget(value || analysisResult.targetValue);
    setIsScanning(true);
    setCurrentResult(analysisResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanCompleted = () => {
    setIsScanning(false);
    setActiveTab('report');
    if (currentResult) {
      showToast(`Security Audit Generated: ${currentResult.id}`);
    }
  };

  const handleSaveReport = (report: AnalysisResult) => {
    if (!savedReports.some(r => r.id === report.id)) {
      setSavedReports(prev => [report, ...prev]);
    }
    showToast(`Report ${report.id} bookmarked to My Protection vault.`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Sticky Translucent Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsScanning(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenScanner={() => {
          setIsScanning(false);
          setActiveTab('scanner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-cyan-500/50 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* Scanning Animation State Overlay */}
        {isScanning ? (
          <ScanningAnimation
            targetValue={scanningTarget}
            onComplete={handleScanCompleted}
          />
        ) : (
          <>
            {/* 1. Landing Page View */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                <HeroSection
                  setActiveTab={setActiveTab}
                  onOpenScanner={() => {
                    setActiveTab('scanner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <TrustMetrics />
                <LiveScannerPreview
                  onRunScan={handleExecuteScan}
                  activeResult={currentResult}
                  onViewFullReport={() => {
                    setActiveTab('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  setActiveTab={setActiveTab}
                />
                <FeatureGrid setActiveTab={setActiveTab} />
                <CTASection
                  onOpenScanner={() => {
                    setActiveTab('scanner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {/* 2. Interactive Scanner View */}
            {activeTab === 'scanner' && (
              <ScannerEngine
                onAnalyze={handleExecuteScan}
              />
            )}

            {/* 3. Full Risk Report View */}
            {activeTab === 'report' && (
              <AnalysisReportView
                result={currentResult}
                onBackToScanner={() => setActiveTab('scanner')}
                setActiveTab={setActiveTab}
                onSaveReport={handleSaveReport}
              />
            )}

            {/* 4. SOC Threat Intelligence View */}
            {activeTab === 'threat-intel' && (
              <ThreatDashboard />
            )}

            {/* 5. Scam Campaign Intelligence Graph */}
            {activeTab === 'campaign-graph' && (
              <ScamCampaignGraph />
            )}

            {/* 6. Honeypot Decoy Telemetry View */}
            {activeTab === 'honeypot' && (
              <HoneypotDashboard />
            )}

            {/* 7. Browser Extension Showcase */}
            {activeTab === 'extension' && (
              <ExtensionMockup
                onOpenReport={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                setActiveTab={setActiveTab}
              />
            )}

            {/* 8. WhatsApp Bot Simulation */}
            {activeTab === 'whatsapp-bot' && (
              <WhatsAppBotView
                onOpenReport={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                setActiveTab={setActiveTab}
              />
            )}

            {/* 9. User Protection Vault & History */}
            {activeTab === 'user-protection' && (
              <UserProtectionView
                onSelectReport={(report) => {
                  setCurrentResult(report);
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                savedReports={savedReports}
              />
            )}

            {/* 10. Security Architecture & Privacy Center */}
            {activeTab === 'security-center' && (
              <SecurityCenterView
                onOpenScanner={() => {
                  setActiveTab('scanner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                setActiveTab={setActiveTab}
              />
            )}
          </>
        )}

      </main>

      {/* Persistent Global Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
};

export default App;
