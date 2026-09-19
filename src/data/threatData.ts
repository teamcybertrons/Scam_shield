import { ThreatIndicator } from '../types';

export const threatOverviewMetrics = {
  activeThreats: 326,
  suspiciousDomains: 184,
  paymentScams: 219,
  impersonationAttempts: 143,
  blockedTakedowns: 98,
  honeypotCaptures24h: 1420
};

export const timeSeriesActivityData = [
  { time: '00:00', internshipScams: 18, jobPhishing: 12, paymentFraud: 24, impersonations: 10 },
  { time: '03:00', internshipScams: 12, jobPhishing: 8, paymentFraud: 15, impersonations: 6 },
  { time: '06:00', internshipScams: 25, jobPhishing: 19, paymentFraud: 32, impersonations: 14 },
  { time: '09:00', internshipScams: 68, jobPhishing: 42, paymentFraud: 78, impersonations: 39 },
  { time: '12:00', internshipScams: 94, jobPhishing: 61, paymentFraud: 112, impersonations: 58 },
  { time: '15:00', internshipScams: 86, jobPhishing: 54, paymentFraud: 95, impersonations: 52 },
  { time: '18:00', internshipScams: 72, jobPhishing: 46, paymentFraud: 81, impersonations: 44 },
  { time: '21:00', internshipScams: 45, jobPhishing: 28, paymentFraud: 54, impersonations: 26 },
];

export const scamCategoryDistribution = [
  { name: 'Internship Scams', value: 38, color: '#f43f5e' },
  { name: 'Job Offer Phishing', value: 27, color: '#f59e0b' },
  { name: 'UPI / Payment Fees', value: 18, color: '#38bdf8' },
  { name: 'Brand Impersonation', value: 12, color: '#8b5cf6' },
  { name: 'Data Harvesting', value: 5, color: '#10b981' },
];

export const threatHotspots = [
  { id: '1', city: 'Bengaluru, IN', threats: 142, lat: 12.9716, lng: 77.5946, status: 'HIGH' },
  { id: '2', city: 'Delhi NCR, IN', threats: 188, lat: 28.6139, lng: 77.2090, status: 'HIGH' },
  { id: '3', city: 'Mumbai, IN', threats: 94, lat: 19.0760, lng: 72.8777, status: 'MEDIUM' },
  { id: '4', city: 'Hyderabad, IN', threats: 76, lat: 17.3850, lng: 78.4867, status: 'MEDIUM' },
  { id: '5', city: 'Pune, IN', threats: 53, lat: 18.5204, lng: 73.8567, status: 'MEDIUM' },
  { id: '6', city: 'Chennai, IN', threats: 41, lat: 13.0827, lng: 80.2707, status: 'LOW' },
  { id: '7', city: 'Kolkata, IN', threats: 38, lat: 22.5726, lng: 88.3639, status: 'LOW' },
  { id: '8', city: 'Global Burner VPS (Frankfurt)', threats: 215, lat: 50.1109, lng: 8.6821, status: 'HIGH' }
];

export const recentThreatIndicators: ThreatIndicator[] = [
  {
    id: 'IND-901',
    indicator: 'infosys-careers-apply.xyz',
    type: 'Domain',
    severity: 'HIGH',
    firstSeen: 'Today, 14:32',
    reportsCount: 37,
    status: 'Active',
    category: 'Fake Internship',
    targetedBrand: 'Infosys'
  },
  {
    id: 'IND-902',
    indicator: 'tcs-digital-drive-2026.online',
    type: 'Domain',
    severity: 'HIGH',
    firstSeen: 'Today, 13:10',
    reportsCount: 52,
    status: 'Takedown Issued',
    category: 'Fake Internship',
    targetedBrand: 'TCS'
  },
  {
    id: 'IND-903',
    indicator: 'wipro.hr.registration@okaxis',
    type: 'UPI/Payment',
    severity: 'HIGH',
    firstSeen: 'Today, 11:45',
    reportsCount: 29,
    status: 'Blocked',
    category: 'Fake Internship',
    targetedBrand: 'Wipro'
  },
  {
    id: 'IND-904',
    indicator: 't.me/google_careers_india_hr',
    type: 'Telegram Channel',
    severity: 'CRITICAL',
    firstSeen: 'Today, 10:20',
    reportsCount: 88,
    status: 'Investigating',
    category: 'Recruiter Impersonation',
    targetedBrand: 'Google'
  },
  {
    id: 'IND-905',
    indicator: 'apex-protocol-airdrop-jobs.network',
    type: 'Domain',
    severity: 'CRITICAL',
    firstSeen: 'Today, 09:05',
    reportsCount: 84,
    status: 'Active',
    category: 'Crypto Phishing',
    targetedBrand: 'Apex Protocol'
  },
  {
    id: 'IND-906',
    indicator: 'msft-careers-forms.xyz',
    type: 'Domain',
    severity: 'MEDIUM',
    firstSeen: 'Yesterday, 18:30',
    reportsCount: 12,
    status: 'Active',
    category: 'Data Harvest',
    targetedBrand: 'Microsoft'
  },
  {
    id: 'IND-907',
    indicator: 'amazon-remote-evaluator.site',
    type: 'Domain',
    severity: 'HIGH',
    firstSeen: 'Yesterday, 16:15',
    reportsCount: 44,
    status: 'Takedown Issued',
    category: 'Job Offer Scam',
    targetedBrand: 'Amazon'
  },
  {
    id: 'IND-908',
    indicator: '+91 98712 34567 (HR Ananya)',
    type: 'WhatsApp Sender',
    severity: 'HIGH',
    firstSeen: 'Yesterday, 14:02',
    reportsCount: 63,
    status: 'Blocked',
    category: 'Recruiter Impersonation',
    targetedBrand: 'Deloitte'
  },
  {
    id: 'IND-909',
    indicator: 'accenture-campus-fastrack.tech',
    type: 'Domain',
    severity: 'HIGH',
    firstSeen: '2 days ago',
    reportsCount: 31,
    status: 'Blocked',
    category: 'Fake Internship',
    targetedBrand: 'Accenture'
  },
  {
    id: 'IND-910',
    indicator: 'internship-security-deposit@ybl',
    type: 'UPI/Payment',
    severity: 'HIGH',
    firstSeen: '2 days ago',
    reportsCount: 49,
    status: 'Blocked',
    category: 'Fake Internship',
    targetedBrand: 'Multiple Brands'
  }
];
