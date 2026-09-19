export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface EvidenceItem {
  id: string;
  category: 'payment' | 'domain' | 'identity' | 'content' | 'urgency' | 'technical';
  title: string;
  severity: RiskLevel;
  confidence: number;
  description: string;
  detectedQuote?: string;
  evidenceSource: string;
  recommendation: string;
}

export interface RiskBreakdown {
  domainRisk: { score: number; max: number; label: string; desc: string };
  paymentRisk: { score: number; max: number; label: string; desc: string };
  identityRisk: { score: number; max: number; label: string; desc: string };
  contentRisk: { score: number; max: number; label: string; desc: string };
  reputationRisk: { score: number; max: number; label: string; desc: string };
}

export interface TimelineStep {
  time: string;
  event: string;
  status: 'clean' | 'flagged' | 'warning' | 'info';
  detail: string;
}

export interface CompanyVerification {
  claimedName: string;
  claimedDomain: string;
  observedDomain: string;
  isDomainMatch: boolean;
  status: 'VERIFIED' | 'SUSPICIOUS_MISMATCH' | 'UNVERIFIED_BRAND' | 'TYPOSQUATTING';
  officialWebsite?: string;
  officialCareersUrl?: string;
  notes: string;
}

export interface AnalysisResult {
  id: string;
  title: string;
  targetType: 'URL' | 'MESSAGE' | 'SCREENSHOT';
  targetValue: string;
  analyzedAt: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  confidence: number; // 0 - 100
  summary: string;
  criticalSignalsCount: number;
  warningSignalsCount: number;
  breakdown: RiskBreakdown;
  timeline: TimelineStep[];
  evidenceList: EvidenceItem[];
  verification: CompanyVerification;
  safeActions: string[];
  tags: string[];
  rawIndicators: {
    sslValid: boolean;
    domainAgeDays: number;
    registrar: string;
    honeypotMatches: number;
    aiToxicityScore: number;
    telegramOrWhatsappHop: boolean;
    upfrontFeeRequested: boolean;
  };
}

export interface ThreatIndicator {
  id: string;
  indicator: string;
  type: 'Domain' | 'UPI/Payment' | 'Telegram Channel' | 'WhatsApp Sender' | 'Phishing Form' | 'Malicious APK';
  severity: RiskLevel;
  firstSeen: string;
  reportsCount: number;
  status: 'Active' | 'Takedown Issued' | 'Investigating' | 'Blocked';
  category: 'Fake Internship' | 'Job Offer Scam' | 'Crypto Phishing' | 'Recruiter Impersonation' | 'Data Harvest';
  targetedBrand: string;
}

export interface CampaignNode {
  id: string;
  label: string;
  type: 'company' | 'domain' | 'whatsapp' | 'url' | 'campaign' | 'payment';
  risk: RiskLevel;
  iconName: string;
  x: number;
  y: number;
  reports: number;
  firstSeen: string;
  details: string;
  status: string;
  associatedCampaigns: number;
}

export interface CampaignEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface HoneypotLog {
  id: string;
  timestamp: string;
  source: 'WhatsApp Decoy' | 'Telegram Trap' | 'Job Board Seed' | 'Form Honey' | 'Email Ingestion';
  scamPattern: string;
  extractedIndicators: {
    domains: string[];
    paymentIds: string[];
    phoneNumbers: string[];
  };
  urgencyLevel: RiskLevel;
  snippet: string;
  clusterTag: string;
}

export type ActiveTab = 
  | 'home' 
  | 'scanner' 
  | 'report' 
  | 'threat-intel' 
  | 'campaign-graph' 
  | 'honeypot' 
  | 'extension' 
  | 'whatsapp-bot' 
  | 'user-protection' 
  | 'security-center';
