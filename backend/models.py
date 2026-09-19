import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    organization = Column(String(255), nullable=True)
    role = Column(String(50), default="analyst") # user, analyst, admin
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_active = Column(Boolean, default=True)

class AnalysisRecord(Base):
    __tablename__ = "analyses"
    
    id = Column(String(64), primary_key=True, default=lambda: f"SCS-{uuid.uuid4().hex[:8].upper()}")
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    target_type = Column(String(20), nullable=False) # URL, MESSAGE, SCREENSHOT
    target_value = Column(Text, nullable=False)
    title = Column(String(255), nullable=False)
    risk_score = Column(Integer, nullable=False) # 0 - 100
    risk_level = Column(String(20), nullable=False) # LOW, MODERATE, HIGH, CRITICAL
    confidence = Column(Integer, default=85)
    summary = Column(Text, nullable=False)
    tags = Column(JSON, default=list)
    raw_indicators = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    # Relationships
    risk_signals = relationship("RiskSignal", back_populates="analysis", cascade="all, delete-orphan")
    evidence_items = relationship("Evidence", back_populates="analysis", cascade="all, delete-orphan")
    report = relationship("Report", back_populates="analysis", uselist=False, cascade="all, delete-orphan")

class RiskSignal(Base):
    __tablename__ = "risk_signals"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    analysis_id = Column(String(64), ForeignKey("analyses.id"), nullable=False, index=True)
    category = Column(String(50), nullable=False) # domain_risk, payment_risk, identity_risk, content_risk, urgency_risk, credential_risk, reputation_risk
    score = Column(Integer, nullable=False)
    max_score = Column(Integer, nullable=False)
    label = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    
    analysis = relationship("AnalysisRecord", back_populates="risk_signals")

class Evidence(Base):
    __tablename__ = "evidence"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    analysis_id = Column(String(64), ForeignKey("analyses.id"), nullable=False, index=True)
    category = Column(String(50), nullable=False)
    title = Column(String(255), nullable=False)
    severity = Column(String(20), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    confidence = Column(Integer, default=90)
    description = Column(Text, nullable=False)
    detected_quote = Column(Text, nullable=True)
    evidence_source = Column(String(100), nullable=False)
    recommendation = Column(Text, nullable=False)
    
    analysis = relationship("AnalysisRecord", back_populates="evidence_items")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(String(64), primary_key=True, default=lambda: f"REP-{uuid.uuid4().hex[:8].upper()}")
    analysis_id = Column(String(64), ForeignKey("analyses.id"), unique=True, nullable=False)
    company_verification = Column(JSON, default=dict)
    safe_actions = Column(JSON, default=list)
    timeline = Column(JSON, default=list)
    mitre_attack_mappings = Column(JSON, default=list)
    generated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    analysis = relationship("AnalysisRecord", back_populates="report")

class Domain(Base):
    __tablename__ = "domains"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    domain_name = Column(String(255), unique=True, index=True, nullable=False)
    risk_score = Column(Integer, default=0)
    risk_level = Column(String(20), default="LOW")
    reputation_status = Column(String(50), default="Unknown") # Verified Official, Suspicious Typosquat, Phishing Honeypot, Malicious Blacklist
    associated_brand = Column(String(255), nullable=True)
    first_seen = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    last_checked = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    whois_data = Column(JSON, default=dict)

class Indicator(Base):
    __tablename__ = "indicators"
    
    id = Column(String(64), primary_key=True, default=lambda: f"IOC-{uuid.uuid4().hex[:6].upper()}")
    indicator = Column(String(512), index=True, nullable=False)
    type = Column(String(50), nullable=False) # Domain, UPI/Payment, Telegram Channel, WhatsApp Sender, Phishing Form, Malicious APK
    severity = Column(String(20), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    reports_count = Column(Integer, default=1)
    status = Column(String(50), default="Active") # Active, Takedown Issued, Investigating, Blocked
    category = Column(String(100), default="Fake Internship") # Fake Internship, Job Offer Scam, Crypto Phishing, Recruiter Impersonation
    targeted_brand = Column(String(255), default="Unspecified")
    first_seen = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    last_seen = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    associated_campaigns_count = Column(Integer, default=1)

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(String(64), primary_key=True, default=lambda: f"CMP-{uuid.uuid4().hex[:6].upper()}")
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    threat_actor = Column(String(255), default="Unknown Syndicate")
    primary_vector = Column(String(100), default="WhatsApp Phishing")
    risk_level = Column(String(20), default="HIGH")
    status = Column(String(50), default="Active")
    first_detected = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    targeted_organizations = Column(JSON, default=list)
    graph_payload = Column(JSON, default=dict) # Node and link structure

class CampaignRelationship(Base):
    __tablename__ = "campaign_relationships"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    campaign_id = Column(String(64), ForeignKey("campaigns.id"), index=True, nullable=False)
    source_type = Column(String(50), nullable=False) # campaign, domain, whatsapp, url, company, payment
    source_id = Column(String(255), nullable=False)
    target_type = Column(String(50), nullable=False)
    target_id = Column(String(255), nullable=False)
    relationship_label = Column(String(100), default="targets")

class HoneypotEvent(Base):
    __tablename__ = "honeypot_events"
    
    id = Column(String(64), primary_key=True, default=lambda: f"HP-{uuid.uuid4().hex[:6].upper()}")
    source = Column(String(100), nullable=False) # WhatsApp Decoy, Telegram Trap, Job Board Seed, Form Honey, Email Ingestion
    scam_pattern = Column(String(255), nullable=False)
    urgency_level = Column(String(20), default="HIGH")
    raw_snippet = Column(Text, nullable=False)
    cluster_tag = Column(String(100), default="Cluster-A")
    extracted_domains = Column(JSON, default=list)
    extracted_payment_ids = Column(JSON, default=list)
    extracted_phone_numbers = Column(JSON, default=list)
    targeted_brand = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
