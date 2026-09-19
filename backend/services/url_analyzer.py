import re
from urllib.parse import urlparse, parse_qs
from typing import Dict, Any, List

SUSPICIOUS_TLDS = {
    "top", "xyz", "club", "work", "click", "gq", "cf", "cc", "link", "live", "shop", "buzz", "tk", "ml", "ga", "cfd"
}

KNOWN_ENTERPRISE_BRANDS = {
    "infosys": "infosys.com",
    "tcs": "tcs.com",
    "tataconsultancy": "tcs.com",
    "wipro": "wipro.com",
    "google": "google.com",
    "microsoft": "microsoft.com",
    "amazon": "amazon.com",
    "accenture": "accenture.com",
    "cognizant": "cognizant.com",
    "meta": "meta.com",
    "apple": "apple.com",
    "netflix": "netflix.com",
    "deloitte": "deloitte.com",
    "ey": "ey.com",
    "pwc": "pwc.com",
    "kpmg": "kpmg.com",
    "ibm": "ibm.com",
    "oracle": "oracle.com"
}

class URLAnalyzer:
    """
    URL Analysis Module
    Performs deterministic cyber forensic analysis on given URLs without relying on external fragile lookups alone.
    """
    
    @staticmethod
    def analyze(raw_url: str, claimed_org: str = None) -> Dict[str, Any]:
        if not raw_url.startswith(("http://", "https://")):
            # If no scheme provided, default to https for parsing
            parsed = urlparse("https://" + raw_url)
            has_explicit_scheme = False
        else:
            parsed = urlparse(raw_url)
            has_explicit_scheme = True
            
        hostname = (parsed.hostname or "").lower()
        protocol = parsed.scheme if has_explicit_scheme else "unknown"
        path = parsed.path or "/"
        query_params = parse_qs(parsed.query)
        
        signals: List[Dict[str, Any]] = []
        domain_risk_score = 0
        is_lookalike = False
        targeted_brand = None
        
        # 1. IP Address as Hostname
        is_ip = bool(re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", hostname))
        if is_ip:
            domain_risk_score += 25
            signals.append({
                "category": "domain",
                "title": "Raw IP Address Hostname Detected",
                "severity": "CRITICAL",
                "confidence": 95,
                "description": f"URL uses direct numerical IP '{hostname}' instead of a registered domain name.",
                "recommendation": "Never submit credentials or payments to raw IP hostnames."
            })
            
        # 2. Extract TLD
        parts = hostname.split(".")
        tld = parts[-1] if len(parts) > 1 else ""
        if tld in SUSPICIOUS_TLDS:
            domain_risk_score += 15
            signals.append({
                "category": "domain",
                "title": f"High-Risk Phishing TLD (.{tld})",
                "severity": "HIGH",
                "confidence": 88,
                "description": f"The domain uses the '.{tld}' top-level domain frequently associated with disposable phishing infrastructure.",
                "recommendation": "Verify why an established enterprise would host official recruitment on a cheap disposable TLD."
            })
            
        # 3. Brand Lookalike / Typosquatting / Hyphenation Check
        for brand, official_domain in KNOWN_ENTERPRISE_BRANDS.items():
            if brand in hostname:
                targeted_brand = brand.capitalize()
                # Check if this hostname is the exact official domain or genuine subdomain
                is_official = hostname == official_domain or hostname.endswith("." + official_domain)
                if not is_official:
                    is_lookalike = True
                    domain_risk_score += 30
                    signals.append({
                        "category": "domain",
                        "title": f"Brand Impersonation / Lookalike Domain ({targeted_brand})",
                        "severity": "CRITICAL",
                        "confidence": 98,
                        "description": f"Hostname '{hostname}' contains '{brand}' but does not resolve to the genuine domain '{official_domain}'.",
                        "recommendation": f"Official careers for {targeted_brand} are hosted exclusively at https://{official_domain}."
                    })
                break
                
        # 4. Homoglyphs & Leetspeak (e.g. g00gle, 1nfosys, paypa1)
        homoglyph_patterns = [
            (r"[0o][0o]gle", "google"),
            (r"1nf[o0]sys", "infosys"),
            (r"micr[o0]s[o0]ft", "microsoft"),
            (r"amaz[o0]n", "amazon"),
            (r"tc[s5]-", "tcs")
        ]
        for pattern, brand_name in homoglyph_patterns:
            if re.search(pattern, hostname) and not is_lookalike:
                is_lookalike = True
                domain_risk_score += 30
                signals.append({
                    "category": "domain",
                    "title": f"Homoglyph / Typosquatting Pattern Detected ({brand_name})",
                    "severity": "CRITICAL",
                    "confidence": 96,
                    "description": f"Hostname '{hostname}' uses leetspeak or character substitution to mimic '{brand_name}'.",
                    "recommendation": "Do not enter passwords or personal identity data."
                })
                break

        # 5. Excessive Subdomains or Hyphen chaining
        if len(parts) > 3 or hostname.count("-") >= 2:
            domain_risk_score += 10
            signals.append({
                "category": "domain",
                "title": "Complex / Hyphenated Hostname Obfuscation",
                "severity": "MEDIUM",
                "confidence": 75,
                "description": f"Domain contains {hostname.count('-')} hyphens and multiple nested subdomains commonly seen in automated phishing kits.",
                "recommendation": "Inspect root domain ownership before interacting."
            })
            
        # 6. Protocol security
        ssl_valid = protocol == "https"
        if protocol == "http":
            domain_risk_score += 15
            signals.append({
                "category": "domain",
                "title": "Unencrypted HTTP Protocol",
                "severity": "HIGH",
                "confidence": 99,
                "description": "The page uses unencrypted HTTP. Legitimate corporate portals mandate HTTPS TLS encryption.",
                "recommendation": "Never transmit sensitive identity or financial information over plain HTTP."
            })

        # 7. Suspicious Path or Form Keywords
        suspicious_paths = ["/apply-now", "/deposit", "/security-fee", "/registration-fee", "/payment", "/internship-fee"]
        for p in suspicious_paths:
            if p in path.lower():
                domain_risk_score += 10
                signals.append({
                    "category": "content",
                    "title": f"Suspicious Endpoint Path '{p}'",
                    "severity": "HIGH",
                    "confidence": 85,
                    "description": f"Path contains direct payment or registration fee funnel keywords '{p}'.",
                    "recommendation": "Legitimate enterprise internships NEVER require registration fees."
                })
                break

        # Normalize score
        domain_risk_score = min(domain_risk_score, 100)
        
        return {
            "hostname": hostname,
            "protocol": protocol,
            "path": path,
            "query_params": {k: v[0] if len(v) == 1 else v for k, v in query_params.items()},
            "tld": tld,
            "is_ip": is_ip,
            "is_lookalike": is_lookalike,
            "targeted_brand": targeted_brand,
            "ssl_valid": ssl_valid,
            "domain_risk_score": domain_risk_score,
            "signals": signals
        }
