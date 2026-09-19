import asyncio
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.pool import NullPool
from backend.config import settings
from backend.models import Base, User, AnalysisRecord, RiskSignal, Evidence, Report, Domain, Indicator, Campaign, HoneypotEvent

# Configure connection args for SQLite vs Supabase PgBouncer Transaction Pooler
connect_args = {}
poolclass = None

if "sqlite" in settings.DATABASE_URL:
    connect_args = {"check_same_thread": False}
else:
    # Supabase / PgBouncer pooler compatibility
    connect_args = {
        "statement_cache_size": 0,
        "prepared_statement_cache_size": 0
    }
    poolclass = NullPool

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    connect_args=connect_args,
    poolclass=poolclass if poolclass else None
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def seed_initial_threat_data(session: AsyncSession):
    from sqlalchemy import select
    res = await session.execute(select(Indicator).limit(1))
    if res.scalars().first() is not None:
        return # Already seeded

    # 1. Seed Indicators
    indicators = [
        Indicator(
            id="IOC-INFOSYS-TOP",
            indicator="infosys-careers.top",
            type="Domain",
            severity="CRITICAL",
            reports_count=142,
            status="Active",
            category="Fake Internship",
            targeted_brand="Infosys Ltd",
            associated_campaigns_count=4
        ),
        Indicator(
            id="IOC-TCS-ONBOARD",
            indicator="tcs-global-onboarding.xyz",
            type="Domain",
            severity="HIGH",
            reports_count=89,
            status="Investigating",
            category="Job Offer Scam",
            targeted_brand="Tata Consultancy Services",
            associated_campaigns_count=2
        ),
        Indicator(
            id="IOC-UPI-DEPOSIT",
            indicator="securityfee.tcs@oksbi",
            type="UPI/Payment",
            severity="CRITICAL",
            reports_count=312,
            status="Blocked",
            category="Fake Internship",
            targeted_brand="TCS & Infosys Decoys",
            associated_campaigns_count=5
        ),
        Indicator(
            id="IOC-TG-OFFER",
            indicator="t.me/Google_Summer_Intern_2025_HR",
            type="Telegram Channel",
            severity="HIGH",
            reports_count=64,
            status="Active",
            category="Recruiter Impersonation",
            targeted_brand="Google",
            associated_campaigns_count=2
        ),
        Indicator(
            id="IOC-WA-RECRUITER",
            indicator="+1 (415) 890-4122",
            type="WhatsApp Sender",
            severity="HIGH",
            reports_count=215,
            status="Blocked",
            category="Fake Internship",
            targeted_brand="Microsoft / Cognizant",
            associated_campaigns_count=3
        ),
        Indicator(
            id="IOC-FORM-HARVEST",
            indicator="forms.gle/xK99qZaWpLmN",
            type="Phishing Form",
            severity="HIGH",
            reports_count=77,
            status="Takedown Issued",
            category="Data Harvest",
            targeted_brand="Accenture",
            associated_campaigns_count=1
        )
    ]
    for ind in indicators:
        session.add(ind)

    # 2. Seed Campaigns
    campaign1 = Campaign(
        id="CMP-SHADOW-HIRE",
        name="Operation ShadowHire - Apex Syndicate",
        description="Coordinated fake internship syndicate impersonating top IT services firms across India and SEA with fraudulent ₹2,500 security deposit demands.",
        threat_actor="Apex Ghost Syndicate (Threat Group 88)",
        primary_vector="WhatsApp & Telegram Phishing",
        risk_level="CRITICAL",
        status="Active",
        targeted_organizations=["Infosys Ltd", "TCS", "Wipro"],
        graph_payload={
            "nodes": [
                {"id": "camp-1", "label": "Op: ShadowHire", "type": "campaign", "risk": "CRITICAL", "reports": 312, "details": "Active multi-channel recruitment fraud campaign targeting engineering graduates."},
                {"id": "dom-1", "label": "infosys-careers.top", "type": "domain", "risk": "CRITICAL", "reports": 142, "details": "Spoofed registration portal cloned from genuine enterprise UI."},
                {"id": "wa-1", "label": "+1 (415) 890-4122", "type": "whatsapp", "risk": "HIGH", "reports": 215, "details": "Virtual VoIP bot automated via unverified WhatsApp sender."},
                {"id": "pay-1", "label": "securityfee.tcs@oksbi", "type": "payment", "risk": "CRITICAL", "reports": 312, "details": "Mule merchant VPA harvesting security deposits."},
                {"id": "co-1", "label": "Infosys Ltd", "type": "company", "risk": "LOW", "reports": 0, "details": "Genuine Brand: Legitimate enterprise being actively impersonated."}
            ],
            "edges": [
                {"id": "e1", "from": "camp-1", "to": "dom-1", "label": "Hosts Phishing", "animated": True},
                {"id": "e2", "from": "camp-1", "to": "wa-1", "label": "Lures Targets", "animated": True},
                {"id": "e3", "from": "dom-1", "to": "pay-1", "label": "Routes Upfront Fee", "animated": True},
                {"id": "e4", "from": "wa-1", "to": "co-1", "label": "Impersonates", "animated": False},
                {"id": "e5", "from": "dom-1", "to": "co-1", "label": "Brand Lookalike", "animated": False}
            ]
        }
    )
    session.add(campaign1)

    # 3. Seed Honeypot Telemetry Events
    honeypot_events = [
        HoneypotEvent(
            id="HP-901",
            source="WhatsApp Decoy",
            scam_pattern="₹2,500 Refundable Laptop Security Deposit Lure",
            urgency_level="CRITICAL",
            raw_snippet="Congratulations! You are shortlisted for Infosys Remote Winter Internship. Pay ₹2,500 laptop insurance fee via UPI to confirm within 2 hours.",
            cluster_tag="Apex-India-Cluster",
            extracted_domains=["infosys-careers.top"],
            extracted_payment_ids=["securityfee.tcs@oksbi"],
            extracted_phone_numbers=["+1 (415) 890-4122"],
            targeted_brand="Infosys Ltd"
        ),
        HoneypotEvent(
            id="HP-902",
            source="Telegram Trap",
            scam_pattern="Direct Offer Letter without Interview + Training Bond",
            urgency_level="HIGH",
            raw_snippet="Google Summer Internship 2025: No interview required for shortlisted candidates. Submit Aadhaar and PAN scan to secure ₹45,000 stipend slot.",
            cluster_tag="Google-Telegram-Decoys",
            extracted_domains=["google-internship-portal.link"],
            extracted_payment_ids=["googlehr.deposit@ybl"],
            extracted_phone_numbers=["+91 98765 43210"],
            targeted_brand="Google"
        ),
        HoneypotEvent(
            id="HP-903",
            source="Job Board Seed",
            scam_pattern="Data Entry & Captcha Solving Task Fraud",
            urgency_level="HIGH",
            raw_snippet="Work from Home 2 hrs daily, earn ₹1,500/day. Deposit ₹999 refundable software activation key.",
            cluster_tag="Freelance-Task-Syndicate",
            extracted_domains=["quicktask-freelance.xyz"],
            extracted_payment_ids=["quickpay.tasks@paytm"],
            extracted_phone_numbers=["+91 88990 11223"],
            targeted_brand="Independent Task Portals"
        )
    ]
    for hp in honeypot_events:
        session.add(hp)

    # 4. Seed Domains
    domains = [
        Domain(
            domain_name="infosys.com",
            risk_score=2,
            risk_level="LOW",
            reputation_status="Verified Official",
            associated_brand="Infosys Ltd",
            whois_data={"registrar": "MarkMonitor Inc.", "age_years": 28, "ssl_valid": True}
        ),
        Domain(
            domain_name="infosys-careers.top",
            risk_score=94,
            risk_level="CRITICAL",
            reputation_status="Phishing Honeypot",
            associated_brand="Infosys Ltd",
            whois_data={"registrar": "NameCheap Inc.", "age_days": 4, "ssl_valid": False}
        ),
        Domain(
            domain_name="tcs.com",
            risk_score=3,
            risk_level="LOW",
            reputation_status="Verified Official",
            associated_brand="Tata Consultancy Services",
            whois_data={"registrar": "Network Solutions", "age_years": 27, "ssl_valid": True}
        )
    ]
    for dom in domains:
        session.add(dom)

    # 5. Seed default analyst user
    admin_user = User(
        id="usr_admin_analyst_01",
        email="analyst@scamshield.ai",
        hashed_password="scamshield_argon2_mock_hash",
        full_name="Chief Cyber Analyst",
        organization="ScamShield SOC",
        role="admin"
    )
    session.add(admin_user)

    await session.commit()

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        await seed_initial_threat_data(session)
