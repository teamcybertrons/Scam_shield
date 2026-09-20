import React, { useState, useEffect } from 'react';
import { ActiveTab, AnalysisResult } from './types';
import { mockCases } from './data/mockCases';
import { ScamShieldAPI } from './services/api';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { TrustMetrics } from './components/landing/TrustMetrics';
import { FeatureGrid } from './components/landing/FeatureGrid';
import { CTASection } from './components/landing/CTASection';
import { ScannerEngine } from './components/scanner/ScannerEngine';
import { ScanningAnimation } from './components/scanner/ScanningAnimation';
import { AnalysisReportView } from './components/scanner/AnalysisReportView';
import { ThreatDashboard } from './components/threat-intel/ThreatDashboard';
import { ExtensionView } from './components/extension/ExtensionView';
import { WhatsAppBotView } from './components/whatsapp/WhatsAppBotView';
import { SoundFX } from './services/soundEffects';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentResult, setCurrentResult] = useState<AnalysisResult>(mockCases[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningTarget, setScanningTarget] = useState<string>(mockCases[0].targetValue);
  const [, setSavedReports] = useState<AnalysisResult[]>([mockCases[0]]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check URL query parameters on initial mount (e.g., ?report=SCS-1234)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reportId = params.get('report');
    if (reportId) {
      ScamShieldAPI.getReport(reportId).then((rep) => {
        if (rep) {
          setCurrentResult(rep);
          setActiveTab('report');
          showToast(`Loaded Report: ${reportId}`);
        }
      });
    }

    // Load initial stored reports from backend
    ScamShieldAPI.listReports().then((reps) => {
      if (reps && reps.length > 0) {
        setSavedReports(reps);
      }
    });
  }, []);

  // Dynamic real-time scan execution via FastAPI backend with coordinated animation
  const handleExecuteScan = async (type: 'URL' | 'MESSAGE' | 'SCREENSHOT', value: string) => {
    setScanningTarget(value || 'Opportunity Input');
    setIsScanning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Run API analysis and minimum animation delay in parallel
      const apiCallPromise = (async () => {
        if (type === 'URL') {
          return await ScamShieldAPI.analyzeUrl(value);
        } else if (type === 'MESSAGE') {
          return await ScamShieldAPI.analyzeMessage(value);
        } else {
          return await ScamShieldAPI.analyzeScreenshot(value);
        }
      })();

      const minAnimationPromise = new Promise(resolve => setTimeout(resolve, 2200));

      const [result] = await Promise.all([apiCallPromise, minAnimationPromise]);

      if (result) {
        setCurrentResult(result);
        setSavedReports(prev => [result, ...prev.filter(r => r.id !== result.id)]);
        setIsScanning(false);
        setActiveTab('report');
        SoundFX.playScoreReveal(result.riskScore);
        showToast(`Security Audit Generated: ${result.id} (Score: ${result.riskScore}/100)`);
      }
    } catch (err) {
      console.error('Scan execution error:', err);
      setIsScanning(false);
      showToast('Scan failed to complete. Please check input and retry.');
    }
  };

  const handleSaveReport = (report: AnalysisResult) => {
    setSavedReports(prev => [report, ...prev.filter(r => r.id !== report.id)]);
    showToast(`Report ${report.id} saved successfully.`);
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
          />
        ) : (
          <>
            {/* 1. Platform Overview / Landing View */}
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

            {/* 2. Interactive Threat Scanner View */}
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

            {/* 4. Threat Intelligence View */}
            {activeTab === 'threat-intel' && (
              <ThreatDashboard />
            )}

            {/* 5. Browser Extension Showcase */}
            {activeTab === 'extension' && (
              <ExtensionView
                setActiveTab={setActiveTab}
                onOpenReport={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 6. WhatsApp Bot View */}
            {activeTab === 'whatsapp-bot' && (
              <WhatsAppBotView
                onOpenReport={(res) => {
                  if (res) setCurrentResult(res);
                  setActiveTab('report');
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
