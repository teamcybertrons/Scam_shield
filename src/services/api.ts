import { AnalysisResult, ThreatIndicator, HoneypotLog } from '../types';
import { mockCases } from '../data/mockCases';
import { analyzeOpportunityInput } from '../utils/dynamicAnalyzer';

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return (import.meta.env.VITE_API_URL as string).replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:8000/api';
    }
    // On Vercel / Production domain, use same-origin /api route
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:8000/api';
};

const API_BASE = getApiBase();

export interface BackendHealth {
  status: string;
  service: string;
  version: string;
  environment: string;
  database: string;
  engines: Record<string, string>;
}

export const ScamShieldAPI = {
  // 1. Health Check
  async checkHealth(): Promise<BackendHealth | null> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch {
      return null;
    }
  },

  // 2. URL Analysis
  async analyzeUrl(url: string, claimedOrg?: string): Promise<AnalysisResult> {
    try {
      const res = await fetch(`${API_BASE}/analyze/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, claimed_organization: claimedOrg })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Backend offline, falling back to local engine:', e);
    }
    return analyzeOpportunityInput('URL', url);
  },

  // 3. Message Analysis
  async analyzeMessage(text: string, senderInfo?: string): Promise<AnalysisResult> {
    try {
      const res = await fetch(`${API_BASE}/analyze/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sender_info: senderInfo })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Backend offline, falling back to local engine:', e);
    }
    return analyzeOpportunityInput('MESSAGE', text);
  },

  // 4. Screenshot / OCR Analysis
  async analyzeScreenshot(extractedText: string, imageBase64?: string): Promise<AnalysisResult> {
    try {
      const res = await fetch(`${API_BASE}/analyze/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extracted_text: extractedText, image_base64: imageBase64 })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Backend offline, falling back to local engine:', e);
    }
    return analyzeOpportunityInput('SCREENSHOT', extractedText);
  },

  // 5. Get Report by ID
  async getReport(id: string): Promise<AnalysisResult | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Fetch report failed:', e);
    }
    const found = mockCases.find(c => c.id === id);
    return found || null;
  },

  // 6. List Stored Reports
  async listReports(): Promise<AnalysisResult[]> {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('[API Client] List reports failed, using mock cache:', e);
    }
    return mockCases;
  },

  // 7. Threat Indicators
  async getThreats(): Promise<ThreatIndicator[]> {
    try {
      const res = await fetch(`${API_BASE}/threats`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Threats fetch failed:', e);
    }
    return [];
  },

  // 8. Campaign Intelligence Graph
  async getCampaigns(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/campaigns`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Campaigns fetch failed:', e);
    }
    return [];
  },

  async getCampaignDetail(campaignId: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/campaigns/${campaignId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Campaign detail failed:', e);
    }
    return null;
  },

  // 9. Honeypot Telemetry
  async getHoneypotEvents(): Promise<HoneypotLog[]> {
    try {
      const res = await fetch(`${API_BASE}/honeypot/events`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Honeypot fetch failed:', e);
    }
    return [];
  },

  async ingestHoneypotEvent(source: string, snippet: string, clusterTag?: string): Promise<HoneypotLog | null> {
    try {
      const res = await fetch(`${API_BASE}/honeypot/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, snippet, cluster_tag: clusterTag })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Ingest honeypot failed:', e);
    }
    return null;
  },

  // 10. WhatsApp Bot Webhook Simulation
  async simulateWhatsApp(text: string, sender?: string): Promise<{ bot_reply: string; analysis: AnalysisResult } | null> {
    try {
      const res = await fetch(`${API_BASE}/whatsapp/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sender_info: sender || '+91 98765 43210' })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] WhatsApp simulation failed:', e);
    }
    return null;
  },

  // 11. Authentication
  async login(email: string, password: string) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] Login failed:', e);
    }
    return null;
  },

  async getCurrentUser() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[API Client] User profile check failed:', e);
    }
    return {
      id: 'usr_analyst_01',
      email: 'analyst@scamshield.ai',
      fullName: 'SOC Threat Analyst',
      organization: 'Cyber Defense Intelligence',
      role: 'analyst',
      isAuthenticated: true
    };
  }
};
