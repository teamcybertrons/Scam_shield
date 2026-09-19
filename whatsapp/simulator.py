"""
ScamShield WhatsApp Webhook Simulator
Enables instant end-to-end testing of the WhatsApp bot pipeline via command line.
"""
import sys
import httpx
import json

WEBHOOK_URL = "http://127.0.0.1:8000/api/whatsapp/webhook"

SAMPLE_SCENARIOS = {
    "1": {
        "title": "Fake Internship Demanding ₹2,500 Laptop Deposit",
        "text": "Congratulations! You have been selected for the Infosys Remote Summer Internship. Please deposit ₹2,500 refundable laptop security fee via UPI to securityfee.tcs@oksbi within 2 hours to confirm your seat.",
        "sender": "+91 98765 43210"
    },
    "2": {
        "title": "Phishing Google Offer with Credential Form",
        "text": "Google Talent Team: Direct selection for Data Analyst Intern. Submit your Aadhaar, PAN card, and bank statement at http://google-careers.xyz/verify immediately.",
        "sender": "+1 (415) 555-0199"
    },
    "3": {
        "title": "Legitimate Campus Drive Confirmation",
        "text": "Dear Candidate, Thank you for registering for the TCS National Qualifier Test. Please access your hall ticket directly on the official portal at https://www.tcs.com/careers.",
        "sender": "+91 22 6778 9999"
    }
}

def run_simulation():
    print("=" * 60)
    print("🛡️  SCAMSHIELD WHATSAPP BOT WEBHOOK SIMULATOR")
    print("=" * 60)
    print("Select a test scenario:")
    for k, v in SAMPLE_SCENARIOS.items():
        print(f"[{k}] {v['title']}")
    print("[4] Custom message")
    
    choice = input("\nEnter choice (1-4) [default: 1]: ").strip() or "1"
    
    if choice in SAMPLE_SCENARIOS:
        scenario = SAMPLE_SCENARIOS[choice]
        message_text = scenario["text"]
        sender = scenario["sender"]
    else:
        message_text = input("Enter custom message text: ")
        sender = "+91 98765 00000"

    payload = {
        "object": "whatsapp_business_account",
        "entry": [{
            "changes": [{
                "value": {
                    "messages": [{
                        "from": sender,
                        "type": "text",
                        "text": {"body": message_text}
                    }]
                }
            }]
        }]
    }

    print("\n[>>] Dispatching webhook payload to FastAPI backend...")
    try:
        res = httpx.post(WEBHOOK_URL, json=payload, timeout=10.0)
        print(f"[<<] Webhook Response (HTTP {res.status_code}):\n")
        data = res.json()
        print("--- WhatsApp Formatted Reply Sent to User ---")
        print(data.get("whatsapp_formatted_reply", json.dumps(data, indent=2)))
    except Exception as e:
        print(f"[!] Error contacting webhook: {e}")

if __name__ == "__main__":
    run_simulation()
