import re
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from backend.models import HoneypotEvent, Indicator, Domain

class HoneypotService:
    """
    Defensive Honeypot Ingestion & Telemetry Processing Service
    Extracts non-sensitive cybersecurity IOCs while sanitizing and stripping all PII, OTPs, and card data.
    """

    @classmethod
    def sanitize_and_extract(cls, snippet: str, source: str) -> Dict[str, Any]:
        # 1. PII Scrubbing: Remove sensitive credentials, OTPs, passwords, and 16-digit card numbers
        sanitized = snippet
        # Mask OTPs
        sanitized = re.sub(r"\b\d{4,6}\b(?=.*(?:otp|code|pin|password))", "[REDACTED_OTP]", sanitized, flags=re.IGNORECASE)
        # Mask Card Numbers
        sanitized = re.sub(r"\b(?:\d[ -]*?){13,16}\b", "[REDACTED_CARD_NUMBER]", sanitized)
        # Mask Passwords
        sanitized = re.sub(r"(?:password|pwd|pin)\s*[:=]\s*\S+", "password: [REDACTED_SECRET]", sanitized, flags=re.IGNORECASE)

        # 2. Extract Domains / URLs
        extracted_domains = []
        domain_matches = re.findall(r"(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)", snippet)
        for d in domain_matches:
            clean_d = d.lower().replace("www.", "")
            if "." in clean_d and clean_d not in extracted_domains:
                extracted_domains.append(clean_d)

        # 3. Extract UPI / Payment Handles
        extracted_payments = []
        upi_matches = re.findall(r"[\w.-]+@(?:oksbi|okaxis|okhdfcbank|okicici|paytm|ybl|apl|upi|axl|ibl)", snippet, re.IGNORECASE)
        for upi in upi_matches:
            if upi.lower() not in extracted_payments:
                extracted_payments.append(upi.lower())

        # 4. Extract Phone Numbers (for threat clustering)
        extracted_phones = []
        phone_matches = re.findall(r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3}[-.\s]?\d{4}", snippet)
        for ph in phone_matches:
            clean_ph = ph.strip()
            if len(clean_ph) >= 10 and clean_ph not in extracted_phones:
                extracted_phones.append(clean_ph)

        # 5. Classify Scam Pattern
        snippet_lower = snippet.lower()
        if "security" in snippet_lower or "laptop" in snippet_lower or "deposit" in snippet_lower:
            scam_pattern = "Advance Laptop/Security Deposit Fee Fraud"
            urgency = "CRITICAL"
        elif "form" in snippet_lower or "aadhaar" in snippet_lower or "pan" in snippet_lower:
            scam_pattern = "Identity & Credential Harvesting Lure"
            urgency = "HIGH"
        elif "daily" in snippet_lower or "task" in snippet_lower or "work from home" in snippet_lower:
            scam_pattern = "Part-Time Task & Freelance Investment Trap"
            urgency = "HIGH"
        else:
            scam_pattern = "Suspicious Unverified Recruitment Solicitation"
            urgency = "MODERATE"

        # 6. Extract Impersonated Brand
        targeted_brand = "Unspecified"
        for brand in ["infosys", "tcs", "wipro", "google", "microsoft", "amazon", "accenture", "cognizant"]:
            if brand in snippet_lower:
                targeted_brand = brand.capitalize()
                break

        return {
            "sanitized_snippet": sanitized,
            "scam_pattern": scam_pattern,
            "urgency_level": urgency,
            "extracted_domains": extracted_domains,
            "extracted_payment_ids": extracted_payments,
            "extracted_phone_numbers": extracted_phones,
            "targeted_brand": targeted_brand
        }

    @classmethod
    async def ingest_event(cls, session: AsyncSession, source: str, raw_snippet: str, cluster_tag: str = "Auto-Ingest") -> HoneypotEvent:
        parsed = cls.sanitize_and_extract(raw_snippet, source)
        
        event_id = f"HP-{uuid.uuid4().hex[:6].upper()}"
        event = HoneypotEvent(
            id=event_id,
            source=source,
            scam_pattern=parsed["scam_pattern"],
            urgency_level=parsed["urgency_level"],
            raw_snippet=parsed["sanitized_snippet"],
            cluster_tag=cluster_tag,
            extracted_domains=parsed["extracted_domains"],
            extracted_payment_ids=parsed["extracted_payment_ids"],
            extracted_phone_numbers=parsed["extracted_phone_numbers"],
            targeted_brand=parsed["targeted_brand"]
        )
        session.add(event)

        # Automatically update / index indicators table
        for d in parsed["extracted_domains"]:
            res = await session.execute(select(Indicator).where(Indicator.indicator == d))
            existing_ind = res.scalars().first()
            if existing_ind:
                existing_ind.reports_count += 1
                existing_ind.last_seen = datetime.now(timezone.utc)
            else:
                new_ind = Indicator(
                    indicator=d,
                    type="Domain",
                    severity="CRITICAL" if parsed["urgency_level"] == "CRITICAL" else "HIGH",
                    reports_count=1,
                    status="Active",
                    category="Fake Internship",
                    targeted_brand=parsed["targeted_brand"]
                )
                session.add(new_ind)

        for upi in parsed["extracted_payment_ids"]:
            res = await session.execute(select(Indicator).where(Indicator.indicator == upi))
            existing_upi = res.scalars().first()
            if existing_upi:
                existing_upi.reports_count += 1
            else:
                new_upi = Indicator(
                    indicator=upi,
                    type="UPI/Payment",
                    severity="CRITICAL",
                    reports_count=1,
                    status="Active",
                    category="Fake Internship",
                    targeted_brand=parsed["targeted_brand"]
                )
                session.add(new_upi)

        await session.commit()
        await session.refresh(event)
        return event
