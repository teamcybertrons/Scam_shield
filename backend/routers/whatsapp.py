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
    claimed_brand = analysis_res.get("verification", {}).get("claimedName") or "Company"
    
    is_scam = risk_score >= 80 or risk_level == "CRITICAL"
    
    if is_scam:
        evidence_list = analysis_res.get("evidenceList", [])
        main_flag = evidence_list[0].get("description", "Upfront fee extortion detected.") if evidence_list else "Upfront fee extortion detected."
        return (
            f"🛡️ *ScamShield: 🚨 {risk_score}% CRITICAL RISK*\n"
            f"━━━━━━━━━━━━━━━━━━━━\n"
            f"• *Entity:* {claimed_brand}\n"
            f"• *Alert:* {main_flag}\n"
            f"• *Action:* ❌ *DO NOT PAY MONEY!* Block & report.\n"
            f"━━━━━━━━━━━━━━━━━━━━\n"
            f"🔗 ID: {report_id}"
        )
    else:
        return (
            f"🛡️ *ScamShield: ✅ {risk_score}% LOW RISK*\n"
            f"━━━━━━━━━━━━━━━━━━━━\n"
            f"• *Entity:* {claimed_brand}\n"
            f"• *Status:* Verified authentic. Zero fees or scam traps found.\n"
            f"• *Action:* ✅ Safe to proceed through official portal.\n"
            f"━━━━━━━━━━━━━━━━━━━━\n"
            f"🔗 ID: {report_id}"
        )


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
    media_type = "text"
    
    try:
        entries = body.get("entry", [])
        for entry in entries:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                messages = value.get("messages", [])
                for msg in messages:
                    sender_phone = msg.get("from", "")
                    msg_type = msg.get("type", "text")
                    if msg_type == "text":
                        extracted_text = msg.get("text", {}).get("body", "")
                        media_type = "text"
                        break
                    elif msg_type in ("image", "document"):
                        media_type = "image"
                        caption = msg.get("image", {}).get("caption", "") or msg.get("document", {}).get("caption", "")
                        filename = msg.get("document", {}).get("filename", "") or "Uploaded_Document.jpeg"
                        extracted_text = caption or f"Photo/Attachment received: {filename}"
                        break
    except Exception as e:
        print(f"[WhatsAppWebhook] Payload parse error: {e}")

    # Fallback to direct fields if sent via simulator / testing
    if not extracted_text and "text" in body:
        extracted_text = body["text"]
        sender_phone = body.get("sender", "+919876543210")
        media_type = body.get("media_type", "text")

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
        "media_type": media_type,
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
    Accepts text, links, or image descriptions/OCR transcripts.
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

