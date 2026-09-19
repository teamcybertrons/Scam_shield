import re
from typing import Dict, Any, Optional

# Authoritative Verified Registry of Global & Indian Tech Giants
VERIFIED_ENTERPRISE_REGISTRY = {
    "infosys": {
        "official_name": "Infosys Limited",
        "official_domain": "infosys.com",
        "official_careers": "https://www.infosys.com/careers/",
        "cin_or_reg": "L85110KA1981PLC013115",
        "verified_hiring_policy": "Infosys NEVER charges any fee at any stage of its recruitment process, nor charges fees for laptop/security.",
        "domains": ["infosys.com", "career.infosys.com", "infosysbpm.com"]
    },
    "tcs": {
        "official_name": "Tata Consultancy Services Limited",
        "official_domain": "tcs.com",
        "official_careers": "https://www.tcs.com/careers",
        "cin_or_reg": "L22210MH1995PLC084781",
        "verified_hiring_policy": "TCS does not charge any application or interview fees, security deposits, or laptop caution money.",
        "domains": ["tcs.com", "tcsion.com", "ibegin.tcs.com", "nextstep.tcs.com"]
    },
    "wipro": {
        "official_name": "Wipro Enterprises Limited",
        "official_domain": "wipro.com",
        "official_careers": "https://careers.wipro.com/",
        "cin_or_reg": "L32102KA1945PLC020800",
        "verified_hiring_policy": "Wipro does not ask for money for interviews, offers, background verification or assets.",
        "domains": ["wipro.com", "careers.wipro.com"]
    },
    "google": {
        "official_name": "Google LLC / Alphabet Inc.",
        "official_domain": "google.com",
        "official_careers": "https://careers.google.com/",
        "cin_or_reg": "US-DE-3582691",
        "verified_hiring_policy": "Google never requests monetary transactions, equipment deposits, or Telegram chats for official hiring.",
        "domains": ["google.com", "careers.google.com"]
    },
    "microsoft": {
        "official_name": "Microsoft Corporation",
        "official_domain": "microsoft.com",
        "official_careers": "https://careers.microsoft.com/",
        "cin_or_reg": "US-WA-600413485",
        "verified_hiring_policy": "Microsoft never charges fees for employment applications or asset distribution.",
        "domains": ["microsoft.com", "careers.microsoft.com"]
    },
    "amazon": {
        "official_name": "Amazon.com, Inc.",
        "official_domain": "amazon.com",
        "official_careers": "https://www.amazon.jobs/",
        "cin_or_reg": "US-DE-2827360",
        "verified_hiring_policy": "Amazon hiring processes are conducted solely via amazon.jobs or verified Amazon email domains.",
        "domains": ["amazon.com", "amazon.jobs"]
    },
    "accenture": {
        "official_name": "Accenture plc",
        "official_domain": "accenture.com",
        "official_careers": "https://www.accenture.com/careers",
        "cin_or_reg": "IE-480984",
        "verified_hiring_policy": "Accenture does not charge any placement fee or bond deposit at any stage.",
        "domains": ["accenture.com", "indiacampus.accenture.com"]
    },
    "cognizant": {
        "official_name": "Cognizant Technology Solutions",
        "official_domain": "cognizant.com",
        "official_careers": "https://careers.cognizant.com/",
        "cin_or_reg": "US-NJ-0100720448",
        "verified_hiring_policy": "Cognizant official recruitment takes place through careers.cognizant.com.",
        "domains": ["cognizant.com", "careers.cognizant.com"]
    },
    "paypal": {
        "official_name": "PayPal Holdings, Inc.",
        "official_domain": "paypal.com",
        "official_careers": "https://careers.pypl.com/",
        "cin_or_reg": "US-DE-5674390",
        "verified_hiring_policy": "PayPal authentication and payments are strictly processed on verified paypal.com domains. Never submit credentials on lookalike domains.",
        "domains": ["paypal.com", "paypalobjects.com", "pypl.com"]
    },
    "apple": {
        "official_name": "Apple Inc.",
        "official_domain": "apple.com",
        "official_careers": "https://jobs.apple.com/",
        "cin_or_reg": "US-CA-C0806592",
        "verified_hiring_policy": "Apple never requires payment for applications or interview equipment.",
        "domains": ["apple.com", "jobs.apple.com"]
    },
    "meta": {
        "official_name": "Meta Platforms, Inc.",
        "official_domain": "meta.com",
        "official_careers": "https://www.metacareers.com/",
        "cin_or_reg": "US-DE-3838355",
        "verified_hiring_policy": "Meta only recruits through official metacareers.com portal.",
        "domains": ["meta.com", "metacareers.com", "facebook.com"]
    },
    "netflix": {
        "official_name": "Netflix, Inc.",
        "official_domain": "netflix.com",
        "official_careers": "https://jobs.netflix.com/",
        "cin_or_reg": "US-DE-2741913",
        "verified_hiring_policy": "Netflix does not charge applicants or use third-party messaging handles.",
        "domains": ["netflix.com", "jobs.netflix.com"]
    },
    "sbi": {
        "official_name": "State Bank of India",
        "official_domain": "onlinesbi.sbi",
        "official_careers": "https://sbi.co.in/careers",
        "cin_or_reg": "IN-SBI-0001",
        "verified_hiring_policy": "SBI recruitment is hosted exclusively on sbi.co.in/careers. No fee collection via personal UPI.",
        "domains": ["onlinesbi.sbi", "sbi.co.in", "bank.sbi"]
    },
    "hdfc": {
        "official_name": "HDFC Bank Limited",
        "official_domain": "hdfcbank.com",
        "official_careers": "https://www.hdfcbank.com/careers",
        "cin_or_reg": "L65920MH1994PLC080618",
        "verified_hiring_policy": "HDFC Bank does not charge candidates for interviews or offers.",
        "domains": ["hdfcbank.com"]
    },
    "icici": {
        "official_name": "ICICI Bank Limited",
        "official_domain": "icicibank.com",
        "official_careers": "https://www.icicicareers.com/",
        "cin_or_reg": "L24299PB1994PLC034789",
        "verified_hiring_policy": "ICICI Bank recruitment is conducted solely on icicicareers.com.",
        "domains": ["icicibank.com", "icicicareers.com"]
    }
}

class CompanyVerifier:
    """
    Company Verification Module
    Cross-checks claimed organizations against authoritative verified enterprise databases.
    Distinguishes verified matching from typosquatting, brand impersonation, or unavailable data.
    """

    @classmethod
    def verify(cls, text_or_hostname: str, explicit_claimed_org: Optional[str] = None) -> Dict[str, Any]:
        combined_text = f"{text_or_hostname} {explicit_claimed_org or ''}".lower()
        
        # 1. Identify if any known brand is claimed or referenced
        detected_brand_key = None
        for key in VERIFIED_ENTERPRISE_REGISTRY:
            if key in combined_text or (explicit_claimed_org and key in explicit_claimed_org.lower()):
                detected_brand_key = key
                break

        # 2. Extract observed hostname if URL-like
        observed_domain = ""
        domain_match = re.search(r"([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)", text_or_hostname)
        if domain_match:
            observed_domain = domain_match.group(1).lower().replace("www.", "")

        # 3. If brand is in verified registry
        if detected_brand_key:
            record = VERIFIED_ENTERPRISE_REGISTRY[detected_brand_key]
            official_domain = record["official_domain"]
            
            # Check if observed domain matches official domains list
            is_match = False
            if observed_domain:
                for valid_d in record["domains"]:
                    if observed_domain == valid_d or observed_domain.endswith("." + valid_d):
                        is_match = True
                        break
                        
            if is_match:
                return {
                    "claimedName": record["official_name"],
                    "claimedDomain": official_domain,
                    "observedDomain": observed_domain,
                    "isDomainMatch": True,
                    "status": "VERIFIED",
                    "officialWebsite": f"https://{official_domain}",
                    "officialCareersUrl": record["official_careers"],
                    "notes": f"Verified official enterprise portal. {record['verified_hiring_policy']}"
                }
            elif observed_domain and not is_match:
                # Lookalike / Typosquatting / Domain Mismatch
                return {
                    "claimedName": record["official_name"],
                    "claimedDomain": official_domain,
                    "observedDomain": observed_domain,
                    "isDomainMatch": False,
                    "status": "SUSPICIOUS_MISMATCH",
                    "officialWebsite": f"https://{official_domain}",
                    "officialCareersUrl": record["official_careers"],
                    "notes": f"CRITICAL MISMATCH: Claimed brand '{record['official_name']}' official domain is '{official_domain}', but observed endpoint is '{observed_domain}'. Notice: {record['verified_hiring_policy']}"
                }
            else:
                # Brand is mentioned in text without a clean matching domain
                return {
                    "claimedName": record["official_name"],
                    "claimedDomain": official_domain,
                    "observedDomain": observed_domain or "Unspecified/Third-party channel",
                    "isDomainMatch": False,
                    "status": "UNVERIFIED_BRAND",
                    "officialWebsite": f"https://{official_domain}",
                    "officialCareersUrl": record["official_careers"],
                    "notes": f"Claimed brand '{record['official_name']}' detected in unverified channel. Authentic careers portal: {record['official_careers']}"
                }

        # 4. If no registered brand matched
        if explicit_claimed_org:
            return {
                "claimedName": explicit_claimed_org,
                "claimedDomain": observed_domain or "Unknown",
                "observedDomain": observed_domain or "Unknown",
                "isDomainMatch": False,
                "status": "UNAVAILABLE",
                "officialWebsite": None,
                "officialCareersUrl": None,
                "notes": "Verification unavailable: Claimed organization is not indexed in authoritative global tier-1 registry. Treat unverified solicitations with caution."
            }
        else:
            return {
                "claimedName": "Independent / Unspecified",
                "claimedDomain": observed_domain or "Unknown",
                "observedDomain": observed_domain or "Unknown",
                "isDomainMatch": False,
                "status": "UNAVAILABLE",
                "officialWebsite": None,
                "officialCareersUrl": None,
                "notes": "Verification unavailable: No explicit enterprise brand detected in input."
            }
