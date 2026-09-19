from fastapi import APIRouter, Request, Response, HTTPException, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, Optional
import json

from backend.config import settings
from backend.database import get_db
from backend.routers.analysis import analyze_message
from backend.schemas import AnalyzeMessageRequest

router = APIRouter(prefix="", tags=["WhatsApp Cloud API Webhook"])

@router.get("/whatsapp/webhook")
async def verify_whatsapp_webhook(
    request: Request,
    hub_mode: Optional[str] = Query(None, alias="hub.mode"),
    hub_challenge: Optional[str] = Query(None, alias="hub.challenge"),
    hub_verify_token: Optional[str] = Query(None, alias="hub.verify_token")
):
    """
    Official Meta WhatsApp Cloud API Webhook Verification Endpoint.
    Meta makes a GET request with hub.verify_token and expects hub.challenge returned.
    """
    # Fallback to query params if not caught by aliases
    qp = request.query_params
    mode = hub_mode or qp.get("hub.mode")
    challenge = hub_challenge or qp.get("hub.challenge")
    token = hub_verify_token or qp.get("hub.verify_token")
    
    if mode == "subscribe" and token == settings.WHATSAPP_VERIFY_TOKEN:
        return Response(content=challenge, media_type="text/plain")
        
    # Return 200 with verify confirmation for manual browser checks
    return {
        "status": "active",
        "service": "ScamShield WhatsApp Cloud API Ingestion Webhook",
        "webhook_endpoint": "/api/whatsapp/webhook",
        "verify_token_configured": bool(settings.WHATSAPP_VERIFY_TOKEN),
        "note": "Awaiting Meta verification request with valid hub.verify_token"
    }

def format_whatsapp_security_reply(analysis_res: dict) -> str:
    risk_score = analysis_res.get("riskScore", 0)
    risk_level = analysis_res.get("riskLevel", "UNKNOWN")
    report_id = analysis_res.get("id", "SCS-REP")
    
    status_emoji = "🚨 CRITICAL RISK" if risk_score >= 80 else ("⚠️ HIGH RISK" if risk_score >= 55 else ("🟡 MODERATE RISK" if risk_score >= 25 else "✅ LOW RISK"))
    
    lines = [
        f"🛡️ *SCAMSHIELD CYBERSECURITY VERDICT*",
        f"────────────────────────",
        f"*Threat Status:* {status_emoji}",
        f"*Risk Score:* {risk_score}/100 | *Confidence:* {analysis_res.get('confidence', 90)}%",
        f"*Category:* {analysis_res.get('tags', ['Employment Scam'])[0]}",
        "",
        f"📋 *Executive Summary:*",
        f"{analysis_res.get('summary', 'Security evaluation completed.')}",
        "",
        f"🔍 *Key Evidence Detected:*"
    ]
    
    evidence_list = analysis_res.get("evidenceList", [])
    if evidence_list:
        for ev in evidence_list[:3]:
            lines.append(f"• *{ev.get('title')}:* {ev.get('description')}")
    else:
        lines.append("• No overt malicious financial or phishing indicators identified.")
        
    lines.extend([
        "",
        f"💡 *Recommended Safe Actions:*",
        f"1. {analysis_res.get('safeActions', ['Do not send funds'])[0]}",
        f"2. Never share OTPs or government identity scans.",
        "",
        f"🔗 *Full Interactive Security Audit Report:*",
        f"http://localhost:5173/?report={report_id}",
        f"────────────────────────",
        f"_ScamShield Automated Threat Intelligence Engine_"
    ])
    
    return "\n".join(lines)

@router.post("/whatsapp/webhook")
async def handle_whatsapp_incoming_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """
    Official Meta WhatsApp Incoming Message Webhook.
    Receives JSON events, parses incoming text, invokes ScamShield risk engine, and prepares structured reply.
    """
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    # Extract message from Meta WhatsApp payload structure
    extracted_text = ""
    sender_phone = ""
    
    try:
        entries = body.get("entry", [])
        for entry in entries:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                messages = value.get("messages", [])
                for msg in messages:
                    sender_phone = msg.get("from", "")
                    if msg.get("type") == "text":
                        extracted_text = msg.get("text", {}).get("body", "")
                        break
    except Exception as e:
        print(f"[WhatsAppWebhook] Payload parse error: {e}")

    # Fallback to direct field if sent via simulator / testing
    if not extracted_text and "text" in body:
        extracted_text = body["text"]
        sender_phone = body.get("sender", "+919876543210")

    if not extracted_text:
        # Acknowledge Meta webhooks even if not a text message
        return {"status": "received", "action": "ignored_non_text_or_empty"}

    # Execute full analysis via backend analysis engine
    msg_req = AnalyzeMessageRequest(text=extracted_text, sender_info=f"WhatsApp sender: {sender_phone}")
    analysis_res = await analyze_message(msg_req, db)

    # Format structured security reply
    reply_text = format_whatsapp_security_reply(analysis_res)

    return {
        "status": "processed",
        "sender": sender_phone,
        "input_message": extracted_text,
        "analysis_id": analysis_res.get("id"),
        "risk_score": analysis_res.get("riskScore"),
        "risk_level": analysis_res.get("riskLevel"),
        "whatsapp_formatted_reply": reply_text,
        "report_url": f"http://localhost:5173/?report={analysis_res.get('id')}"
    }

@router.post("/whatsapp/simulate")
async def simulate_whatsapp_interaction(req: AnalyzeMessageRequest, db: AsyncSession = Depends(get_db)):
    """
    Direct simulation endpoint for testing the complete WhatsApp bot conversation in the frontend.
    """
    analysis_res = await analyze_message(req, db)
    reply_text = format_whatsapp_security_reply(analysis_res)
    
    return {
        "status": "success",
        "sender": req.sender_info or "+91 98765 43210",
        "user_message": req.text,
        "analysis": analysis_res,
        "bot_reply": reply_text
    }
