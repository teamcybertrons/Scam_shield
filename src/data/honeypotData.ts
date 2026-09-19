import { HoneypotLog } from '../types';

export const honeypotOverviewMetrics = {
  messagesCaptured: 2481,
  uniqueDomains: 392,
  paymentIndicators: 684,
  campaignClusters: 71,
  decoysActive: 48,
  avgDetectionLatency: '1.4s'
};

export const honeypotLogs: HoneypotLog[] = [
  {
    id: 'HP-8821',
    timestamp: '19 Sep 2026, 14:28:10',
    source: 'WhatsApp Decoy',
    scamPattern: 'Internship Offer Fee Extortion',
    extractedIndicators: {
      domains: ['infosys-careers-apply.xyz'],
      paymentIds: ['infosys.hr.recruitment@paytm'],
      phoneNumbers: ['+91 98712 34567']
    },
    urgencyLevel: 'HIGH',
    snippet: 'Congratulations Candidate! Your resume was shortlisted for Summer Intern role. Pay ₹1,999 registration fee immediately to freeze your slot.',
    clusterTag: 'ShadowOffer-Batch-9'
  },
  {
    id: 'HP-8820',
    timestamp: '19 Sep 2026, 14:15:42',
    source: 'Telegram Trap',
    scamPattern: 'Crypto Developer Seed Phishing',
    extractedIndicators: {
      domains: ['apex-protocol-airdrop-jobs.network'],
      paymentIds: ['0x71C...982b (Malicious Contract)'],
      phoneNumbers: []
    },
    urgencyLevel: 'CRITICAL',
    snippet: 'Dev Testnet Task: Connect Web3 wallet and enter 12-word seed key in sandbox console to unlock $4,500 monthly stipend grant.',
    clusterTag: 'InfernoClaw-Web3'
  },
  {
    id: 'HP-8819',
    timestamp: '19 Sep 2026, 13:52:19',
    source: 'Job Board Seed',
    scamPattern: 'Amazon Remote Rating Task Scam',
    extractedIndicators: {
      domains: ['amazon-remote-evaluator.site'],
      paymentIds: ['task-deposit-wallet@icici'],
      phoneNumbers: ['+91 98110 44219']
    },
    urgencyLevel: 'HIGH',
    snippet: 'Part-time E-Commerce Reviewer: Earn ₹2,500/day by rating products. Deposit ₹500 initial task unlock fee to start earning commission.',
    clusterTag: 'TaskDeposit-Fraud-Ring'
  },
  {
    id: 'HP-8818',
    timestamp: '19 Sep 2026, 13:20:04',
    source: 'Form Honey',
    scamPattern: 'Microsoft Campus Ambassador Impersonation',
    extractedIndicators: {
      domains: ['msft-careers-forms.xyz'],
      paymentIds: [],
      phoneNumbers: ['+91 97720 11982']
    },
    urgencyLevel: 'MEDIUM',
    snippet: 'Microsoft FastTrack Student Ambassador: Submit Aadhaar card copy, college ID photo, and personal phone number for direct interview pass.',
    clusterTag: 'DataHarvest-Campus-2026'
  },
  {
    id: 'HP-8817',
    timestamp: '19 Sep 2026, 12:44:55',
    source: 'Email Ingestion',
    scamPattern: 'Wipro Fresher Joining Letter Scam',
    extractedIndicators: {
      domains: ['wipro-campus-onboarding.tech'],
      paymentIds: ['wipro.onboarding.fee@okhdfcbank'],
      phoneNumbers: ['+91 99882 33441']
    },
    urgencyLevel: 'HIGH',
    snippet: 'Dear Applicant, Attached is your provisional joining letter for Wipro Project Engineer role. Transfer ₹3,500 medical test insurance fee to finalize.',
    clusterTag: 'ProvisionalJoining-ScamGroup'
  }
];

export const honeypotClusters = [
  { name: 'ShadowOffer-Batch-9', threatCount: 198, activeDomains: 14, severity: 'HIGH', status: 'Active Telemetry' },
  { name: 'InfernoClaw-Web3', threatCount: 84, activeDomains: 8, severity: 'CRITICAL', status: 'Active Telemetry' },
  { name: 'TaskDeposit-Fraud-Ring', threatCount: 312, activeDomains: 23, severity: 'HIGH', status: 'Takedowns Initiated' },
  { name: 'DataHarvest-Campus-2026', threatCount: 76, activeDomains: 6, severity: 'MEDIUM', status: 'Monitored' },
  { name: 'ProvisionalJoining-ScamGroup', threatCount: 145, activeDomains: 11, severity: 'HIGH', status: 'Active Telemetry' }
];
