"""
ScamShield WhatsApp Business / Cloud API Handler
Handles incoming webhook events, executes ScamShield risk analysis, and sends formatted WhatsApp security advisories.
"""
import os
import httpx
from typing import Dict, Any

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
SCAMSHIELD_API_URL = os.getenv("SCAMSHIELD_API_URL", "http://127.0.0.1:8000/api")

async def send_whatsapp_reply(to_number: str, text_message: str):
    """
    Sends message using official Meta Graph API v21.0
    """
    if not WHATSAPP_TOKEN or not WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_TOKEN == "scamshield_mock_wa_token":
        print(f"[WhatsApp Mock Dispatch] To: {to_number}\nMessage:\n{text_message}\n")
        return {"status": "mock_dispatched"}

    url = f"https://graph.facebook.com/v21.0/{WHATSAPP_PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": text_message}
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(url, headers=headers, json=payload)
        return res.json()
