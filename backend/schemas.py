from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# Common
class RiskBreakdownCategory(BaseModel):
    score: int
    max: int
    label: str
    desc: str

class RiskBreakdownSchema(BaseModel):
    domainRisk: RiskBreakdownCategory
    paymentRisk: RiskBreakdownCategory
    identityRisk: RiskBreakdownCategory
    contentRisk: RiskBreakdownCategory
    reputationRisk: RiskBreakdownCategory

class EvidenceItemSchema(BaseModel):
    id: str
    category: str
    title: str
    severity: str # LOW, MEDIUM, HIGH, CRITICAL
    confidence: int
    description: str
    detectedQuote: Optional[str] = None
    evidenceSource: str
    recommendation: str

class CompanyVerificationSchema(BaseModel):
    claimedName: str
    claimedDomain: str
    observedDomain: str
    isDomainMatch: bool
    status: str # VERIFIED, SUSPICIOUS_MISMATCH, UNVERIFIED_BRAND, TYPOSQUATTING, UNAVAILABLE
    officialWebsite: Optional[str] = None
    officialCareersUrl: Optional[str] = None
    notes: str

class TimelineStepSchema(BaseModel):
    time: str
    event: str
    status: str
    detail: str

# Requests
class AnalyzeUrlRequest(BaseModel):
    url: str = Field(..., example="https://infosys-careers.top/internship-registration")
    claimed_organization: Optional[str] = None

class AnalyzeMessageRequest(BaseModel):
    text: str = Field(..., example="Congratulations! You are shortlisted for Infosys Remote Internship. Pay ₹2500 laptop fee.")
    sender_info: Optional[str] = None

class AnalyzeScreenshotRequest(BaseModel):
    image_base64: Optional[str] = None
    extracted_text: Optional[str] = None
    source_context: Optional[str] = None

# Structured AI Analysis Output Schema
class AIAnalysisOutput(BaseModel):
    risk_summary: str
    risk_category: str
    signals: List[str]
    evidence: List[Dict[str, Any]]
    recommendations: List[str]
    confidence: int

# Full Analysis & Report Schema
class AnalysisResponse(BaseModel):
    id: str
    title: str
    targetType: str # URL, MESSAGE, SCREENSHOT
    targetValue: str
    analyzedAt: str
    riskScore: int # 0 - 100
    riskLevel: str # LOW, MODERATE, HIGH, CRITICAL
    confidence: int
    summary: str
    criticalSignalsCount: int
    warningSignalsCount: int
    breakdown: RiskBreakdownSchema
    timeline: List[TimelineStepSchema]
    evidenceList: List[EvidenceItemSchema]
    verification: CompanyVerificationSchema
    safeActions: List[str]
    tags: List[str]
    rawIndicators: Dict[str, Any]

# Indicators
class IndicatorResponse(BaseModel):
    id: str
    indicator: str
    type: str
    severity: str
    firstSeen: str
    reportsCount: int
    status: str
    category: str
    targetedBrand: str

# Honeypot
class HoneypotIngestRequest(BaseModel):
    source: str = Field(..., example="WhatsApp Decoy")
    snippet: str = Field(..., example="Pay 2500 security deposit to join TCS internship")
    cluster_tag: Optional[str] = "Auto-Ingest"
    sender_identity: Optional[str] = None

class HoneypotEventResponse(BaseModel):
    id: str
    timestamp: str
    source: str
    scamPattern: str
    extractedIndicators: Dict[str, List[str]]
    urgencyLevel: str
    snippet: str
    clusterTag: str

# Campaigns
class CampaignNodeSchema(BaseModel):
    id: str
    label: str
    type: str
    risk: str
    reports: int
    details: str

class CampaignEdgeSchema(BaseModel):
    id: str
    from_: str = Field(..., alias="from")
    to: str
    label: Optional[str] = None
    animated: Optional[bool] = True

class CampaignGraphResponse(BaseModel):
    campaign_id: str
    campaign_name: str
    description: str
    threat_actor: str
    risk_level: str
    nodes: List[CampaignNodeSchema]
    edges: List[CampaignEdgeSchema]

# WhatsApp Cloud API Webhook
class WhatsAppWebhookVerification(BaseModel):
    mode: Optional[str] = None
    challenge: Optional[str] = None
    verify_token: Optional[str] = None

class WhatsAppIncomingMessage(BaseModel):
    object: Optional[str] = "whatsapp_business_account"
    entry: Optional[List[Dict[str, Any]]] = None

# Auth
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None
    organization: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]
