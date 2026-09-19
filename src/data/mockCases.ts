import { AnalysisResult } from '../types';

export const mockCases: AnalysisResult[] = [
  // CASE 2: Fake internship asking for payment (Primary Default Demo)
  {
    id: 'SS-2026-8F42A',
    title: 'Infosys Summer Internship Program 2026 (Spoofed Offer)',
    targetType: 'URL',
    targetValue: 'https://infosys-careers-apply.xyz/internship-registration?ref=telegram_batch4',
    analyzedAt: '19 Sep 2026, 14:32 IST',
    riskScore: 91,
    riskLevel: 'HIGH',
    confidence: 94,
    summary: 'High probability of fraudulent employment scam. Multiple critical anomalies detected: Upfront mandatory payment fee, newly registered typo-squatted domain, and recruiter redirect to unverified Telegram channel.',
    criticalSignalsCount: 4,
    warningSignalsCount: 2,
    breakdown: {
      domainRisk: { score: 25, max: 25, label: 'Domain & SSL Risk', desc: 'Domain registered 6 days ago via privacy proxy; not affiliated with Infosys Ltd.' },
      paymentRisk: { score: 23, max: 25, label: 'Payment Anomalies', desc: 'Demands ₹1,999 security deposit/seat confirmation fee prior to offer rollout.' },
      identityRisk: { score: 18, max: 20, label: 'Identity & Brand Match', desc: 'Claimed enterprise recruiter using free Gmail and Telegram handles.' },
      contentRisk: { score: 14, max: 15, label: 'Content & Urgency Engine', desc: 'High urgency triggers: "Offer expires in 30 minutes", guaranteed selection.' },
      reputationRisk: { score: 8, max: 15, label: 'Global Threat Reputation', desc: 'Cross-referenced in 37 independent student incident reports this week.' }
    },
    timeline: [
      { time: '14:32:01', event: 'URL & Header Extracted', status: 'clean', detail: 'Resolved IP 194.26.29.110 (AS208091 - Burner VPS provider)' },
      { time: '14:32:02', event: 'Domain Age & WHOIS Evaluated', status: 'flagged', detail: 'Domain created on 13 Sep 2026 (6 days old). Zero enterprise DNS records.' },
      { time: '14:32:03', event: 'Redirect Chain & Form Inspected', status: 'flagged', detail: 'Redirects to static phishing form hosted on third-party cloud storage.' },
      { time: '14:32:04', event: 'Company Identity Checked', status: 'flagged', detail: 'Claimed entity "Infosys Ltd." but official domain is "infosys.com".' },
      { time: '14:32:05', event: 'Payment Request Detected', status: 'flagged', detail: 'Detected UPI payment gateway trigger: "infosys.hr.recruitment@paytm"' },
      { time: '14:32:06', event: 'Risk Engine Completed', status: 'warning', detail: 'Synthesized 7 intelligence vectors; generated high-confidence threat profile.' }
    ],
    evidenceList: [
      {
        id: 'ev-1',
        category: 'payment',
        title: 'Upfront Registration Fee Demanded',
        severity: 'HIGH',
        confidence: 98,
        description: 'Opportunity demands upfront registration or laptop security deposit before technical evaluation.',
        detectedQuote: 'Pay ₹1,999 to confirm your guaranteed internship slot & training kit dispatch.',
        evidenceSource: 'DOM text analysis & Payment form field parser',
        recommendation: 'Legitimate companies (including Infosys, TCS, Wipro) NEVER charge candidates for internships or training.'
      },
      {
        id: 'ev-2',
        category: 'domain',
        title: 'Domain Mismatch & Typo-Squatting',
        severity: 'HIGH',
        confidence: 96,
        description: 'Observed domain is using a deceptive multi-part name mimicking a global technology brand.',
        detectedQuote: 'Claimed: Infosys Ltd (infosys.com) vs Observed: infosys-careers-apply.xyz',
        evidenceSource: 'WHOIS & Official Registry Cross-Verification Engine',
        recommendation: 'Check the job posting strictly on official portal: https://www.infosys.com/careers'
      },
      {
        id: 'ev-3',
        category: 'identity',
        title: 'Recruiter Contact Channel Bypass',
        severity: 'HIGH',
        confidence: 92,
        description: 'Application instructs candidates to communicate exclusively via Telegram/WhatsApp burner handles.',
        detectedQuote: 'Send screenshot of transaction to HR Priya on Telegram @infosys_recruitment_hub',
        evidenceSource: 'Contact link & Telegram protocol inspector',
        recommendation: 'Never communicate with corporate recruiters outside verified enterprise email domains (@infosys.com).'
      },
      {
        id: 'ev-4',
        category: 'urgency',
        title: 'Artificial Scarcity & High-Pressure Countdown',
        severity: 'MEDIUM',
        confidence: 89,
        description: 'Page uses manipulative countdown timers to induce panic and rash payment decisions.',
        detectedQuote: 'Only 3 seats remaining for Bangalore batch! Offer auto-cancels in 28:14.',
        evidenceSource: 'JavaScript DOM Timer & Psychological Manipulation Classifier',
        recommendation: 'Take time to verify independently; genuine recruitment drives have structured hiring timelines.'
      }
    ],
    verification: {
      claimedName: 'Infosys Limited',
      claimedDomain: 'infosys.com',
      observedDomain: 'infosys-careers-apply.xyz',
      isDomainMatch: false,
      status: 'SUSPICIOUS_MISMATCH',
      officialWebsite: 'https://www.infosys.com',
      officialCareersUrl: 'https://www.infosys.com/careers',
      notes: 'No authorization or relationship exists between Infosys Ltd. and this newly registered domain.'
    },
    safeActions: [
      'Do NOT send any money, processing fees, or refundable deposits.',
      'Do NOT share Aadhaar, PAN card, bank details, or OTPs.',
      'Search for the exact job/internship ID on the verified portal: https://www.infosys.com/careers',
      'Report the phishing URL and UPI ID to ScamShield Honeypot & National Cyber Crime Portal (cybercrime.gov.in).'
    ],
    tags: ['Fake Internship', 'UPI Fee Fraud', 'Spoofed Brand', 'Telegram Recruitment'],
    rawIndicators: {
      sslValid: true,
      domainAgeDays: 6,
      registrar: 'NameCheap Privacy Shield',
      honeypotMatches: 37,
      aiToxicityScore: 0.88,
      telegramOrWhatsappHop: true,
      upfrontFeeRequested: true
    }
  },

  // CASE 1: Legitimate internship
  {
    id: 'SS-2026-1E90B',
    title: 'Google India — Software Engineering Summer Intern 2026',
    targetType: 'URL',
    targetValue: 'https://careers.google.com/jobs/results/9284102938472910-software-engineer-intern-summer-2026/',
    analyzedAt: '19 Sep 2026, 12:15 IST',
    riskScore: 12,
    riskLevel: 'LOW',
    confidence: 97,
    summary: 'Verified authentic opportunity. The application is hosted on the official Google Careers corporate infrastructure with full DNS, EV SSL, and corporate authentication.',
    criticalSignalsCount: 0,
    warningSignalsCount: 0,
    breakdown: {
      domainRisk: { score: 1, max: 25, label: 'Domain & SSL Risk', desc: 'Direct corporate subdomain of google.com with multi-year authoritative DNS.' },
      paymentRisk: { score: 0, max: 25, label: 'Payment Anomalies', desc: 'No payment gateways, fees, or monetary requests found.' },
      identityRisk: { score: 2, max: 20, label: 'Identity & Brand Match', desc: 'Verified Google LLC enterprise certificates and official careers backend.' },
      contentRisk: { score: 5, max: 15, label: 'Content & Urgency Engine', desc: 'Standard formal recruitment specifications with realistic eligibility criteria.' },
      reputationRisk: { score: 4, max: 15, label: 'Global Threat Reputation', desc: 'Zero threat reports in global threat intelligence feeds.' }
    },
    timeline: [
      { time: '12:15:01', event: 'URL & DNS Resolved', status: 'clean', detail: 'Resolved to Google Edge Anycast Infrastructure' },
      { time: '12:15:02', event: 'Enterprise SSL Validated', status: 'clean', detail: 'Google Trust Services Extended Certificate valid' },
      { time: '12:15:03', event: 'Brand & Identity Verification', status: 'clean', detail: 'Matches authoritative corporate entity: Google LLC' },
      { time: '12:15:04', event: 'Monetary Check', status: 'clean', detail: 'Zero fee triggers detected. Clean hiring portal.' },
      { time: '12:15:05', event: 'Threat Telemetry Lookup', status: 'clean', detail: 'Domain reputation score: 99.8 / 100 (Safe)' }
    ],
    evidenceList: [
      {
        id: 'ev-legit-1',
        category: 'domain',
        title: 'Authoritative Enterprise Domain',
        severity: 'LOW',
        confidence: 99,
        description: 'URL resides on the verified corporate domain owned by Google LLC.',
        detectedQuote: 'careers.google.com with official Google Account OAuth sign-in',
        evidenceSource: 'Authoritative DNS & TLS Certificate Validation',
        recommendation: 'Safe to proceed with application submission.'
      }
    ],
    verification: {
      claimedName: 'Google LLC',
      claimedDomain: 'google.com',
      observedDomain: 'careers.google.com',
      isDomainMatch: true,
      status: 'VERIFIED',
      officialWebsite: 'https://about.google',
      officialCareersUrl: 'https://careers.google.com',
      notes: 'Fully authenticated enterprise hiring domain.'
    },
    safeActions: [
      'Proceed with standard preparation on official Google Careers portal.',
      'Submit your resume without paying any third-party intermediary.',
      'Check application status directly in your Google Careers dashboard.'
    ],
    tags: ['Verified Enterprise', 'No Fee', 'Official Google Portal'],
    rawIndicators: {
      sslValid: true,
      domainAgeDays: 9850,
      registrar: 'MarkMonitor Inc.',
      honeypotMatches: 0,
      aiToxicityScore: 0.02,
      telegramOrWhatsappHop: false,
      upfrontFeeRequested: false
    }
  },

  // CASE 3: Phishing Web3 / Crypto Job Scam
  {
    id: 'SS-2026-9C33F',
    title: 'Apex Web3 Protocol — Remote Solidity Developer (Seed Phrase Phishing)',
    targetType: 'URL',
    targetValue: 'https://apex-protocol-airdrop-jobs.network/apply-web3-intern',
    analyzedAt: '19 Sep 2026, 13:48 IST',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    confidence: 98,
    summary: 'CRITICAL SECURITY THREAT: Malicious phishing attack targeting digital wallets and private recovery phrases under the guise of an automated developer testnet verification.',
    criticalSignalsCount: 5,
    warningSignalsCount: 1,
    breakdown: {
      domainRisk: { score: 25, max: 25, label: 'Domain & SSL Risk', desc: 'Newly spun phishing domain with malicious smart-contract integration.' },
      paymentRisk: { score: 25, max: 25, label: 'Payment Anomalies', desc: 'Prompts users to connect Web3 wallet and authorize malicious permit approvals.' },
      identityRisk: { score: 20, max: 20, label: 'Identity & Brand Match', desc: 'Impersonating decentralized finance foundation with forged logos.' },
      contentRisk: { score: 14, max: 15, label: 'Content & Urgency Engine', desc: 'Promises $4,500/month stipend for entry level with immediate approval.' },
      reputationRisk: { score: 12, max: 15, label: 'Global Threat Reputation', desc: 'Linked to active drainer syndicate "InfernoClaw" in honeypot logs.' }
    },
    timeline: [
      { time: '13:48:01', event: 'Web3 Injector Detected', status: 'flagged', detail: 'Script executes wallet connection prompt on page load' },
      { time: '13:48:02', event: 'Drainer Signature Matched', status: 'flagged', detail: 'Matched malicious contract ABI bytecode in honeypot database' },
      { time: '13:48:03', event: 'Credential Harvesting Form', status: 'flagged', detail: 'Contains input field asking for 12-word seed phrase "for sandbox verification"' },
      { time: '13:48:04', event: 'Immediate Threat Alert Generated', status: 'flagged', detail: 'Severity classified as CRITICAL DRAINER' }
    ],
    evidenceList: [
      {
        id: 'ev-crit-1',
        category: 'technical',
        title: 'Wallet Drainer & Seed Phrase Harvesting',
        severity: 'CRITICAL',
        confidence: 99,
        description: 'Application form prompts user to input recovery passphrases or sign token drain permissions.',
        detectedQuote: 'Enter your 12-word recovery phrase to sync testnet developer node credentials.',
        evidenceSource: 'DOM Inspector & Web3 ABI Analyzer',
        recommendation: 'NEVER share private keys or seed phrases under any circumstances.'
      },
      {
        id: 'ev-crit-2',
        category: 'domain',
        title: 'Deceptive Domain & Free TLD',
        severity: 'CRITICAL',
        confidence: 95,
        description: 'Domain registered 48 hours ago on bulletproof hosting.',
        detectedQuote: 'apex-protocol-airdrop-jobs.network',
        evidenceSource: 'Threat Intelligence DNS Stream',
        recommendation: 'Close this tab immediately and do not interact with wallet extensions.'
      }
    ],
    verification: {
      claimedName: 'Apex Protocol Foundation',
      claimedDomain: 'apexprotocol.io',
      observedDomain: 'apex-protocol-airdrop-jobs.network',
      isDomainMatch: false,
      status: 'SUSPICIOUS_MISMATCH',
      officialWebsite: 'https://apexprotocol.io',
      notes: 'Active phishing campaign impersonating Apex Protocol.'
    },
    safeActions: [
      'IMMEDIATELY CLOSE the website. Do not connect MetaMask, Phantom, or any wallet.',
      'If you typed your seed phrase anywhere, transfer your assets to a fresh wallet immediately.',
      'Report this URL to Google Safe Browsing and ScamShield Threat Cloud.'
    ],
    tags: ['Web3 Phishing', 'Wallet Drainer', 'Seed Phrase Theft', 'Critical Risk'],
    rawIndicators: {
      sslValid: true,
      domainAgeDays: 2,
      registrar: 'Tucows Domains',
      honeypotMatches: 84,
      aiToxicityScore: 0.96,
      telegramOrWhatsappHop: true,
      upfrontFeeRequested: true
    }
  },

  // CASE 4: Microsoft Cloud Campus Drive Impersonation (Medium Risk)
  {
    id: 'SS-2026-4A71D',
    title: 'Microsoft Azure Student Ambassador & Intern FastTrack',
    targetType: 'URL',
    targetValue: 'https://msft-careers-forms.xyz/azure-internship-drive-2026',
    analyzedAt: '19 Sep 2026, 11:04 IST',
    riskScore: 64,
    riskLevel: 'MEDIUM',
    confidence: 86,
    summary: 'Moderate risk opportunity. No direct monetary fee requested yet, but domain is an unverified third-party form using Microsoft trademarks without authorization.',
    criticalSignalsCount: 1,
    warningSignalsCount: 3,
    breakdown: {
      domainRisk: { score: 19, max: 25, label: 'Domain & SSL Risk', desc: 'Domain msft-careers-forms.xyz is not owned by Microsoft Corporation.' },
      paymentRisk: { score: 6, max: 25, label: 'Payment Anomalies', desc: 'No payment required on initial form; may introduce fee in follow-up email.' },
      identityRisk: { score: 17, max: 20, label: 'Identity & Brand Match', desc: 'Uses Microsoft logos and trademarked styling without authorization.' },
      contentRisk: { score: 12, max: 15, label: 'Content & Urgency Engine', desc: 'Uses urgency slogans and asks for college ID scan & personal phone numbers.' },
      reputationRisk: { score: 10, max: 15, label: 'Global Threat Reputation', desc: 'Flagged by 12 community members as unofficial lead capture farm.' }
    },
    timeline: [
      { time: '11:04:01', event: 'Domain Checked against Enterprise Registry', status: 'flagged', detail: 'Failed Microsoft SPF / DKIM verification' },
      { time: '11:04:02', event: 'Data Harvesting Form Parsed', status: 'warning', detail: 'Collects Student ID card photos and WhatsApp numbers' },
      { time: '11:04:03', event: 'Reputation Feed Match', status: 'warning', detail: 'Identified as student lead-generation funnel / course marketing disguise' }
    ],
    evidenceList: [
      {
        id: 'ev-med-1',
        category: 'identity',
        title: 'Trademark Infringement & Unverified Host',
        severity: 'MEDIUM',
        confidence: 90,
        description: 'Website impersonates official Microsoft branding but operates on an unrelated .xyz generic domain.',
        detectedQuote: 'Official Microsoft Azure Campus Hiring Portal 2026',
        evidenceSource: 'Brand Registry & WHOIS Identity Engine',
        recommendation: 'Apply only through Microsoft Careers: https://careers.microsoft.com'
      },
      {
        id: 'ev-med-2',
        category: 'content',
        title: 'Student Data Harvesting Funnel',
        severity: 'MEDIUM',
        confidence: 84,
        description: 'Collects detailed personal documents (college ID, transcript) into an unsecured Google Sheet backend.',
        detectedQuote: 'Upload scanned copy of your College Student ID card to verify eligibility.',
        evidenceSource: 'Form Action Backend Inspector',
        recommendation: 'Do not upload identity cards to unofficial forms.'
      }
    ],
    verification: {
      claimedName: 'Microsoft Corporation',
      claimedDomain: 'microsoft.com',
      observedDomain: 'msft-careers-forms.xyz',
      isDomainMatch: false,
      status: 'SUSPICIOUS_MISMATCH',
      officialWebsite: 'https://www.microsoft.com',
      officialCareersUrl: 'https://careers.microsoft.com',
      notes: 'Not an authorized Microsoft student hiring portal.'
    },
    safeActions: [
      'Do not upload government or college identity cards to this form.',
      'Check the official Microsoft Student Ambassador program at studentambassadors.microsoft.com.',
      'Verify the recruiter identity on LinkedIn using verified Microsoft work email.'
    ],
    tags: ['Lead Harvesting', 'Brand Impersonation', 'Data Privacy Warning'],
    rawIndicators: {
      sslValid: true,
      domainAgeDays: 19,
      registrar: 'Hostinger Operations',
      honeypotMatches: 12,
      aiToxicityScore: 0.62,
      telegramOrWhatsappHop: false,
      upfrontFeeRequested: false
    }
  }
];
