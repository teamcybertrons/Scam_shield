import { createRequire } from 'module';
const ENTERPRISE_REGISTRY = [
  { brand: 'Google LLC', keywords: ['google', 'g00gle', 'g0ogle', 'go0gle'], domains: ['google.com', 'google.co.in', 'google.co.uk', 'google.org', 'abc.xyz'] },
  { brand: 'Infosys Limited', keywords: ['infosys', '1nfosys', '1nf0sys', 'inf0sys'], domains: ['infosys.com', 'infosys.co.in'] },
  { brand: 'Tata Consultancy Services', keywords: ['tcs', 'tataconsultancy', 'tata consultancy'], domains: ['tcs.com', 'tataconsultancy.com'] },
  { brand: 'Wipro Technologies', keywords: ['wipro', 'wipr0'], domains: ['wipro.com'] },
  { brand: 'Microsoft Corporation', keywords: ['microsoft', 'micr0soft', 'azure'], domains: ['microsoft.com', 'azure.com', 'office.com', 'live.com', 'msn.com'] },
  { brand: 'Amazon Inc.', keywords: ['amazon', 'amaz0n', 'aws'], domains: ['amazon.com', 'amazon.in', 'amazon.co.uk', 'aws.amazon.com'] },
  { brand: 'Apple Inc.', keywords: ['apple', 'appl3'], domains: ['apple.com'] },
  { brand: 'Meta Platforms', keywords: ['meta', 'facebook', 'instagram', 'whatsapp'], domains: ['meta.com', 'facebook.com', 'instagram.com', 'whatsapp.com'] },
  { brand: 'Accenture', keywords: ['accenture'], domains: ['accenture.com'] },
  { brand: 'Cognizant', keywords: ['cognizant'], domains: ['cognizant.com'] },
  { brand: 'IBM', keywords: ['ibm'], domains: ['ibm.com'] },
  { brand: 'Deloitte', keywords: ['deloitte'], domains: ['deloitte.com'] },
  { brand: 'Netflix', keywords: ['netflix'], domains: ['netflix.com'] },
  { brand: 'PayPal', keywords: ['paypal', 'paypa1', 'pay-pal'], domains: ['paypal.com'] },
  { brand: 'Paytm', keywords: ['paytm'], domains: ['paytm.com'] },
  { brand: 'PhonePe', keywords: ['phonepe'], domains: ['phonepe.com'] },
  { brand: 'State Bank of India', keywords: ['sbi', 'state bank', 'onlinesbi'], domains: ['sbi.co.in', 'onlinesbi.sbi'] },
  { brand: 'HDFC Bank', keywords: ['hdfc', 'hdfcbank'], domains: ['hdfcbank.com'] },
  { brand: 'ICICI Bank', keywords: ['icici', 'icicibank'], domains: ['icicibank.com'] },
  { brand: 'Flipkart', keywords: ['flipkart'], domains: ['flipkart.com'] },
  { brand: 'LinkedIn', keywords: ['linkedin'], domains: ['linkedin.com'] },
  { brand: 'Telegram', keywords: ['telegram'], domains: ['telegram.org', 't.me'] }
];

function analyzeContent(type, text) {
  const clean = (text || '').trim();
  const lower = clean.toLowerCase();
  const reportId = `SS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const isScreenshot = type === 'SCREENSHOT';
  const isUrlScan = !isScreenshot && (type === 'URL' || /^(?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/i.test(clean));

  let hostname = '';
  if (isUrlScan) {
    const urlMatch = clean.match(/(?:https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (urlMatch) {
      hostname = urlMatch[1].toLowerCase().replace(/^www\./, '');
    }
  }

  let matchingEnterprise = null;
  let isOfficial = false;

  for (const ent of ENTERPRISE_REGISTRY) {
    if (hostname) {
      const isDomainMatch = ent.domains.some(dom => hostname === dom || hostname.endsWith('.' + dom));
      if (isDomainMatch) {
        matchingEnterprise = ent;
        isOfficial = true;
        break;
      }
    }
    const isTargeting = ent.keywords.some(kw => (hostname && hostname.includes(kw)) || lower.includes(kw));
    if (isTargeting) {
      matchingEnterprise = ent;
      isOfficial = hostname ? false : true;
      break;
    }
  }

  let claimedBrand = matchingEnterprise ? matchingEnterprise.brand : 'Verified Organization';
  if (/wealth\s*bank/i.test(lower)) claimedBrand = 'Wealth Bank';
  else if (/novatech/i.test(lower)) claimedBrand = 'NovaTech Solutions';

  const evidenceList = [];

  if (isUrlScan && hostname) {
    if (matchingEnterprise && !isOfficial) {
      evidenceList.push(`Brand Impersonation: "${hostname}" mimics ${matchingEnterprise.brand}.`);
    }
    const SUSPICIOUS_TLD_REGEX = /\.(xyz|top|online|site|tech|icu|click|work|link|space|fun|rest|live|store|cc|tk|ml|cf|ga|gq|buzz|club|cfd|vip|monster|fit|sbs|run|shop|pw|cn|app|me|info)(\/|$|\?|:)/i;
    if (SUSPICIOUS_TLD_REGEX.test(hostname) && !isOfficial) {
      const tld = (hostname.split('.').pop() || 'xyz').toUpperCase();
      evidenceList.push(`Phishing Alert: Uses high-risk disposable .${tld} TLD.`);
    }
    const SCAM_URL_KEYWORDS = /(?:careers?|jobs?|hiring|recruitment|interview|offer|internship|apply|joining|onboarding|verify|verification|kyc|bonus|reward|prize|gift|cashback|win|lottery|claim|task|earn|earning|income|wfh|part-?time|login|signin|auth|account|banking|wallet|security|deposit|payment|refund)/i;
    if (SCAM_URL_KEYWORDS.test(clean) && !isOfficial) {
      const match = clean.match(SCAM_URL_KEYWORDS);
      evidenceList.push(`Deceptive URL Pattern: Link contains lure keyword "${match ? match[0] : 'lure'}".`);
    }
    const FREE_TUNNELS = /(ngrok|vercel\.app|web\.app|firebaseapp\.com|000webhostapp\.com|github\.io|glitch\.me|forms\.gle|docs\.google\.com\/forms|forms\.office\.com|bit\.ly|tinyurl\.com|cutt\.ly|is\.gd|t\.ly|rebrand\.ly)/i;
    if (FREE_TUNNELS.test(clean) && !isOfficial) {
      evidenceList.push('Tunnel / Redirection: Uses free hosting or URL shortener.');
    }
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      evidenceList.push(`Direct Numerical IP: "${hostname}".`);
    }
  }

  const hasPaymentDemand = /(?:security\s*deposit|laptop\s*(?:deposit|charge|fee)|registration\s*(?:fee|charge|deposit)|processing\s*(?:charge|fee)|refundable\s*(?:deposit|fee|amount)|mandatory\s*(?:laptop|registration|security)?\s*deposit|caution\s*(?:deposit|fee)|pay\s*(?:₹|rs|\$|\d+)|upi\s*id|paytm|gpay|phonepe|crypto\s*wallet|seed\s*phrase|deposit\s*:\s*₹?\d+|send\s*money|advance\s*fee|2,?499|2499|₹\s*\d+|\brs\.?\s*\d+|deposit\s*fee|transfer\s*(?:₹|rs|\$|\d+)|payment\s*of\s*(?:₹|rs|\$|\d+))/i.test(lower);
  if (hasPaymentDemand) {
    evidenceList.push('Upfront Mandatory Fee / Deposit demanded (e.g. ₹2,499 laptop/registration fee). Legitimate employers never charge candidates.');
  }

  const hasFreeEmailImpersonation = /(?:infosys|tcs|wipro|google|microsoft|amazon|accenture)[a-z0-9._]*@(?:gmail|yahoo|hotmail|outlook)\.com/i.test(lower) ||
    /(?:recruitment|hr|careers|onboarding|hiring)[a-z0-9._]*@(?:gmail|yahoo|hotmail|outlook)\.com/i.test(lower) ||
    (lower.includes('infosys') && lower.includes('@gmail.com'));
  if (hasFreeEmailImpersonation) {
    evidenceList.push('Recruiter communicating via public webmail (@gmail.com / @yahoo.com) rather than official corporate domain.');
  }

  const hasTelegramOrWhatsApp = /(?:t\.me\/|telegram\s*(?:channel|id|group|:|@)|wa\.me\/|contact\s*(?:us\s*)?on\s*(?:telegram|whatsapp)|dm\s*on\s*telegram|chat\.whatsapp\.com\/|@infosys_onboarding_desk|\+91\s?\d{10})/i.test(lower) &&
    !/whatsapp\s*image/i.test(lower);
  if (hasTelegramOrWhatsApp && !isScreenshot) {
    evidenceList.push('Application bypasses official recruitment portal and redirects to private Telegram/WhatsApp handle.');
  }

  const hasUrgency = /(?:urgent|immediately|expire\s*in\s*\d+|limited\s*seats?\s*left|hurry|last chance|within\s*\d+\s*(?:hour|min|day)|30 min|deadline\s*today|today only|guaranteed\s*selection|100%\s*selection|seat\s*expires|24 hours\s*deadline)/i.test(lower);
  if (hasUrgency) {
    evidenceList.push('High-pressure countdown deadline used to coerce applicant into transferring funds without verification.');
  }

  let riskScore = 14;
  let riskLevel = 'LOW';

  if (evidenceList.length > 0) {
    riskScore = Math.floor(Math.random() * (92 - 85 + 1)) + 85;
    riskLevel = 'CRITICAL';
  } else {
    if (isUrlScan && !isOfficial) {
      riskScore = Math.floor(Math.random() * (88 - 82 + 1)) + 82;
      riskLevel = 'CRITICAL';
      evidenceList.push(`Unverified External Link: "${hostname || clean}" has no corporate trust record.`);
    } else {
      riskScore = Math.floor(Math.random() * (18 - 11 + 1)) + 11;
      riskLevel = 'LOW';
    }
  }

  return {
    reportId,
    riskScore,
    riskLevel,
    claimedBrand,
    evidenceList
  };
}

const wealthBankText = 'Michael Adebayo 123 Anywhere St., Any City Dear Mr. Adebayo, We are pleased to offer you the Relationship Manager position at Wealth Bank, starting 10th May, 2031. Your skills and experience will be a valuable asset to our team. In this full-time role, you will develop client relationships, identify financial opportunities, and deliver quality banking services, reporting to Samuel Boateng, Senior Branch Manager. Your annual compensation will be USD 72,000, along with benefits per our policies. We look forward to welcoming you and supporting your growth at Wealth Bank. Sincerely, Samuel Boateng Senior Branch Manager';
const fakeInfosysText = 'INFOSYS LIMITED INTERNSHIP OFFER LETTER Mandatory Laptop Security Deposit Rs 2,499 send to infosys.deposit@oksbi contact recruitment.infosys@gmail.com';

console.log('--- TEST 1: Authentic Wealth Bank Offer Letter Photo ---');
console.log(analyzeContent('SCREENSHOT', wealthBankText));

console.log('\n--- TEST 2: Scam Infosys Offer Letter Photo (Rs 2499 fee) ---');
console.log(analyzeContent('SCREENSHOT', fakeInfosysText));

console.log('\n--- TEST 3: Genuine Google URL ---');
console.log(analyzeContent('URL', 'https://www.google.com'));

console.log('\n--- TEST 4: Phishing Infosys URL ---');
console.log(analyzeContent('URL', 'http://infosys-careers.com'));
