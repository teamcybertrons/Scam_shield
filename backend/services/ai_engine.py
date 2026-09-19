import re
import json
from typing import Dict, Any, List, Optional
import httpx
from backend.config import settings

class AIEngine:
    """
    AI Cybersecurity Intelligence Engine
    Produces strictly structured JSON analysis examining urgency, payment demands,
    credential harvesting, brand impersonation, and social engineering patterns.
    """

    @classmethod
    async def analyze_text(cls, content: str, context_type: str = "MESSAGE") -> Dict[str, Any]:
        """
        Main entry point for AI analysis.
        Uses external LLM (Gemini or OpenAI) if API key configured, otherwise runs
        deterministic structured semantic NLP analysis.
        """
        # If Gemini API Key is configured, attempt live call with fallback
        if settings.GEMINI_API_KEY and settings.AI_PROVIDER in ("gemini", "hybrid"):
            try:
                gemini_res = await cls._call_gemini_api(content, context_type)
                if gemini_res:
                    return gemini_res
            except Exception as e:
                print(f"[AIEngine] Gemini API fallback triggered: {e}")

        # If OpenAI API Key is configured
        if settings.OPENAI_API_KEY and settings.AI_PROVIDER in ("openai", "hybrid"):
            try:
                openai_res = await cls._call_openai_api(content, context_type)
                if openai_res:
                    return openai_res
            except Exception as e:
                print(f"[AIEngine] OpenAI API fallback triggered: {e}")

        # High-precision Built-in Cybersecurity NLP Inference
        return cls._run_local_nlp_inference(content, context_type)

    @classmethod
    def _run_local_nlp_inference(cls, text: str, context_type: str) -> Dict[str, Any]:
        text_lower = text.lower()
        signals: List[str] = []
        evidence: List[Dict[str, Any]] = []
        recommendations: List[str] = []
        
        # 1. Payment Requests / Upfront Fees
        payment_patterns = [
            (r"(?:₹|rs\.?|inr|\$)\s*\d+[\d,]*", "Explicit monetary amount detected"),
            (r"(?:security|laptop|training|registration|processing|caution|bond)\s*(?:deposit|fee|charge|amount)", "Upfront fee/deposit requirement"),
            (r"(?:upi|gpay|phonepe|paytm|qr\s*code|bank\s*transfer|vpa)", "Direct merchant/UPI transaction solicitation"),
            (r"(?:refundable|reimbursed\s*in\s*first\s*salary)", "False refund guarantee promise (classic advance fee scam lure)")
        ]
        payment_detected = False
        for pattern, label in payment_patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                payment_detected = True
                signals.append(f"Payment Request: {label}")
                evidence.append({
                    "category": "payment",
                    "title": "Upfront Payment or Deposit Demand Detected",
                    "severity": "CRITICAL",
                    "confidence": 98,
                    "description": f"The communication asks the applicant for money ({label}). Legitimate employers NEVER charge applicants.",
                    "detected_quote": matches[0] if isinstance(matches[0], str) else str(matches[0]),
                    "evidence_source": "NLP Linguistic Parser",
                    "recommendation": "Do not send money or complete any UPI/QR payment."
                })
                break

        # 2. Artificial Urgency & High-Pressure Tactics
        urgency_patterns = [
            (r"(?:within\s*\d+\s*(?:hours|hrs|mins|minutes)|by\s*today|deadline\s*in|expires\s*in)", "Strict short-window countdown"),
            (r"(?:urgent|immediately|slots?\s*filling\s*fast|limited\s*seats|last\s*chance)", "Scarcity & high-pressure psychological manipulation")
        ]
        urgency_detected = False
        for pattern, label in urgency_patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                urgency_detected = True
                signals.append(f"Urgency Signal: {label}")
                evidence.append({
                    "category": "urgency",
                    "title": "Artificial Urgency / Short Countdown Pressure",
                    "severity": "HIGH",
                    "confidence": 92,
                    "description": "Scammers enforce tight deadlines to prevent applicants from verifying credentials or consulting mentors.",
                    "detected_quote": matches[0] if isinstance(matches[0], str) else str(matches[0]),
                    "evidence_source": "Social Engineering Heuristic",
                    "recommendation": "Pause and verify through official channels before reacting under pressure."
                })
                break

        # 3. Credential & Identity Harvesting
        credential_patterns = [
            (r"(?:aadhaar|pan\s*card|passport|bank\s*account|otp|password|debit\s*card)", "High-risk identity document collection"),
            (r"(?:fill\s*this\s*google\s*form|forms\.gle|bit\.ly|tinyurl)", "Third-party unofficial form redirection")
        ]
        credential_detected = False
        for pattern, label in credential_patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                credential_detected = True
                signals.append(f"Credential Risk: {label}")
                evidence.append({
                    "category": "identity",
                    "title": "Identity Document / Financial Credential Harvesting",
                    "severity": "HIGH",
                    "confidence": 90,
                    "description": "Request for sensitive personal identifiers or banking details outside enterprise HRIS portals.",
                    "detected_quote": matches[0] if isinstance(matches[0], str) else str(matches[0]),
                    "evidence_source": "PII Protection Engine",
                    "recommendation": "Never share government IDs or banking details on unverified channels."
                })
                break

        # 4. Unrealistic Promises & Guarantees
        unrealistic_patterns = [
            (r"(?:no\s*interview|direct\s*selection|guaranteed\s*placement|100%\s*selection)", "Bypassed interview process guarantee"),
            (r"(?:stipend\s*(?:of\s*)?(?:₹|rs\.?|inr)?\s*(?:4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|[1-9]\d{2}),?\d{3})", "Disproportionately high entry stipend offer"),
            (r"(?:work\s*from\s*home\s*2\s*hours|earn\s*(?:daily|per\s*day))", "Task-based work from home scheme")
        ]
        for pattern, label in unrealistic_patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                signals.append(f"Unrealistic Lure: {label}")
                evidence.append({
                    "category": "content",
                    "title": "Unrealistic Employment Claim / Direct Selection Lure",
                    "severity": "HIGH",
                    "confidence": 88,
                    "description": "Scammers promise immediate offers without standard technical evaluations to trigger emotional excitement.",
                    "detected_quote": matches[0] if isinstance(matches[0], str) else str(matches[0]),
                    "evidence_source": "Recruitment Norms Engine",
                    "recommendation": "Enterprise tech organizations always conduct multi-round technical evaluations."
                })
                break

        # 5. Channel Migration (Telegram / WhatsApp / Personal Email)
        channel_patterns = [
            (r"(?:t\.me\/|telegram|whatsapp|wa\.me\/|gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)", "Off-platform migration to unmonitored messaging app")
        ]
        for pattern, label in channel_patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                signals.append(f"Communication Channel: {label}")
                evidence.append({
                    "category": "technical",
                    "title": "Personal / Unofficial Communication Channel",
                    "severity": "MEDIUM",
                    "confidence": 85,
                    "description": "Recruitment initiated from personal free webmail (e.g. Gmail) or anonymous messaging channels.",
                    "detected_quote": matches[0] if isinstance(matches[0], str) else str(matches[0]),
                    "evidence_source": "Channel Forensics",
                    "recommendation": "Require the recruiter to contact you from an official corporate email domain."
                })
                break

        # Synthesize Risk Category & Summary
        if payment_detected and urgency_detected:
            risk_category = "Advance Fee Recruitment Fraud (Critical Severity)"
            risk_summary = "High-confidence recruitment scam detected combining upfront monetary demands (security/laptop deposit) with high-pressure artificial urgency."
            recommendations = [
                "Do NOT pay any requested fee or deposit.",
                "Block and report the sender on WhatsApp/Telegram.",
                "Cross-check your application status on the official company careers portal.",
                "Submit threat telemetry to ScamShield Honeypot network."
            ]
        elif payment_detected:
            risk_category = "Paid Internship / Financial Solicitation Trap"
            risk_summary = "Monetary payment or registration fee demanded under the guise of an employment opportunity."
            recommendations = [
                "Never pay for job applications, equipment bonds, or screening tests.",
                "Report this posting to your college placement cell and cybercrime authorities."
            ]
        elif credential_detected:
            risk_category = "Credential & Identity Harvesting Scheme"
            risk_summary = "Communication solicits sensitive personal credentials (Aadhaar/PAN/banking) via unverified forms or direct messages."
            recommendations = [
                "Refuse to upload identity documents on Google Forms or unverified links.",
                "Verify recruiter identity on LinkedIn and official corporate directory."
            ]
        elif len(signals) > 0:
            risk_category = "Suspicious Unverified Recruitment Solicitation"
            risk_summary = "Multiple anomalies detected including unverified communication channels and irregular hiring claims."
            recommendations = [
                "Verify the opportunity on the enterprise official careers website.",
                "Do not click unverified links."
            ]
        else:
            risk_category = "Benign / Standard Communication"
            risk_summary = "No overt red flags, financial extortion, or identity harvesting patterns detected in linguistic analysis."
            recommendations = [
                "Continue standard security vigilance.",
                "Confirm interview invites match corporate email domains."
            ]

        confidence = 94 if len(evidence) >= 2 else (85 if len(evidence) == 1 else 75)

        return {
            "risk_summary": risk_summary,
            "risk_category": risk_category,
            "signals": signals,
            "evidence": evidence,
            "recommendations": recommendations,
            "confidence": confidence
        }

    @classmethod
    async def _call_gemini_api(cls, text: str, context_type: str) -> Optional[Dict[str, Any]]:
        # Structured Gemini REST API call
        prompt = f"""
Analyze this {context_type} for cybersecurity risks, specifically job/internship scams, phishing, impersonation, and payment traps.
Input Text:
\"\"\"{text}\"\"\"

Return a valid JSON object matching EXACTLY this schema:
{{
  "risk_summary": "Concise 1-2 sentence executive threat summary",
  "risk_category": "Standard category name",
  "signals": ["Signal 1", "Signal 2"],
  "evidence": [
    {{
      "category": "payment|domain|identity|content|urgency|technical",
      "title": "Short title",
      "severity": "LOW|MEDIUM|HIGH|CRITICAL",
      "confidence": 90,
      "description": "Why this is dangerous",
      "detected_quote": "extracted text",
      "evidence_source": "AI Semantic Inspection",
      "recommendation": "Action to take"
    }}
  ],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "confidence": 90
}}
"""
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            })
            if resp.status_code == 200:
                data = resp.json()
                raw_json_str = data["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(raw_json_str)
        return None

    @classmethod
    async def _call_openai_api(cls, text: str, context_type: str) -> Optional[Dict[str, Any]]:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {"Authorization": f"Bearer {settings.OPENAI_API_KEY}", "Content-Type": "application/json"}
        prompt = f"Analyze for job scams / phishing: {text}"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, headers=headers, json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "You are a cybersecurity intelligence system. Output strictly valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                "response_format": {"type": "json_object"}
            })
            if resp.status_code == 200:
                data = resp.json()
                return json.loads(data["choices"][0]["message"]["content"])
        return None
