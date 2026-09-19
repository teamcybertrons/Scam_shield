# ScamShield — Functional Full-Stack Cybersecurity Platform

> **Trust Before You Apply.** Real-time deterministic risk scoring, AI linguistic analysis, threat intelligence, and defensive honeypots protecting students and job seekers against fraudulent internships, advance-fee scams, and brand impersonation networks.

---

## 🛡️ Platform Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SCAMSHIELD ECOSYSTEM                           │
└────────────────────────────────────────────────────────────────────────┘
         │                                       │
  [React/Vite Frontend]                 [Manifest V3 Extension]
  - Scanner & Live Report View          - Active Tab DOM/URL Extraction
  - Campaign Node-Link Graph            - Backend Risk Inspection Popup
  - SOC Threat Intel Dashboard                  │
  - Honeypot Telemetry Stream                   │
  - WhatsApp Interactive Bot                    │
         │                                       │
         └───────────────────┬───────────────────┘
                             │ HTTP REST API
                             ▼
 ┌───────────────────────────────────────────────────────────────────────┐
 │                       FASTAPI BACKEND API                             │
 │   /api/analyze/url       │ /api/analyze/message  │ /api/analyze/ocr   │
 │   /api/reports           │ /api/threats          │ /api/campaigns     │
 │   /api/honeypot/ingest   │ /api/indicators       │ /api/whatsapp      │
 └───────────────────────────┬───────────────────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
 ┌─────────────────────┐           ┌─────────────────────┐
 │    AI ANALYSIS      │           │   RISK ENGINE       │
 │ - Language & Urgency│           │ - Deterministic 0-100│
 │ - Impersonation     │ ────────► │ - Domain Risk (0-30)│
 │ - Payment Traps     │           │ - Payment Risk(0-25)│
 │ - Structured JSON   │           │ - Identity Risk     │
 └─────────────────────┘           └──────────┬──────────┘
                                              │
            ┌─────────────────────────────────┴──┐
            ▼                                    ▼
 ┌─────────────────────┐              ┌────────────────────┐
 │ COMPANY VERIFIER    │              │  URL ANALYZER      │
 │ - Brand Registry    │              │ - Typosquatting    │
 │ - Domain Matching   │              │ - Lookalikes / TLD │
 └──────────┬──────────┘              └──────────┬─────────┘
            │                                    │
            └─────────────────┬──────────────────┘
                              │
                              ▼
 ┌───────────────────────────────────────────────────────────────────────┐
 │                         DATABASE LAYER                                │
 │   SQLAlchemy ORM (PostgreSQL / SQLite fallback)                       │
 │   - users, analyses, risk_signals, evidence, indicators               │
 │   - domains, reports, campaigns, campaign_relationships, honeypot_ev  │
 └───────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **Python**: 3.10+ (Tested on Python 3.14)

### 2. Backend Startup (FastAPI)
```bash
# 1. Install backend Python dependencies
pip install -r backend/requirements.txt

# 2. Start the FastAPI backend server (Runs on port 8000)
python -m backend.main
```
The backend initializes the database automatically, seeds threat intelligence indicators and campaign clusters, and serves API endpoints on `http://localhost:8000`.

*Interactive Swagger API Docs are available at:* `http://localhost:8000/docs`

### 3. Frontend Startup (React + Vite)
```bash
# 1. Install frontend dependencies
npm install

# 2. Start Vite development server (Runs on port 5173)
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧩 Monorepo Directory Structure

```
scamshield/
├── backend/                  # FastAPI REST API Backend
│   ├── routers/              # API Routers (analysis, threats, campaigns, whatsapp, auth)
│   ├── services/             # Core Cybersecurity Engines
│   │   ├── url_analyzer.py   # DNS, lookalikes, typosquatting & TLD forensics
│   │   ├── company_verifier.py # Authoritative enterprise domain cross-check
│   │   ├── ai_engine.py      # Structured AI linguistic & social engineering parser
│   │   ├── risk_engine.py    # Deterministic 0-100 composite risk scoring
│   │   └── honeypot_service.py # Decoy telemetry ingestion & PII scrubbing
│   ├── config.py             # Environment configuration (Pydantic Settings)
│   ├── database.py           # SQLAlchemy async engine & seed migration
│   ├── models.py             # Relational database models
│   ├── schemas.py            # Pydantic v2 schemas
│   ├── requirements.txt      # Python dependencies
│   └── main.py               # FastAPI entrypoint with CORS & lifespan hooks
├── extension/                # Manifest V3 Browser Extension
│   ├── manifest.json         # Extension Manifest V3 configuration
│   ├── background.js         # Service worker & active tab security badge
│   ├── content.js            # Page DOM telemetry extractor
│   ├── popup.html            # Extension popup user interface
│   ├── popup.css             # Extension styling
│   └── popup.js              # Communicates with backend /api/analyze/url
├── whatsapp/                 # WhatsApp Business / Cloud API Module
│   ├── bot_handler.py        # Meta Cloud API message dispatcher
│   └── simulator.py          # Interactive CLI simulator for webhook testing
├── shared/                   # Shared Schema Definitions
│   └── schemas.json          # Canonical JSON schemas
├── src/                      # Frontend Application (React + TypeScript + Tailwind)
│   ├── components/           # Reusable UI modules (Scanner, Graph, Honeypot, etc.)
│   ├── services/             # API client services (ScamShieldAPI)
│   ├── types/                # TypeScript type definitions
│   └── App.tsx               # Main application routing & state management
├── .env.example              # Environment variables template
└── README.md                 # Complete system documentation
```

---

## 🔍 Core Functional Engines

### 1. Deterministic Risk Engine (`backend/services/risk_engine.py`)
Computes an explainable 0–100 risk score based on transparent weighted forensic dimensions:
- **Domain Risk (0–30)**: Direct IP hostnames, typosquatting, disposable TLDs (`.top`, `.xyz`, `.club`), SSL missing.
- **Payment Risk (0–25)**: Advance fees, laptop deposits, security charges, UPI VPA solicitation.
- **Identity & Credential Risk (0–20)**: Off-channel Aadhaar/PAN requests, unverified Google Form redirects.
- **Social Engineering & Urgency (0–15)**: Countdown pressure ("within 2 hours", "slots filling fast"), direct offer bypass claims.
- **Reputation Risk (0–10)**: Brand mismatch against verified enterprise registry.

*Risk Classification*:
- `0 - 24`: **LOW**
- `25 - 54`: **MODERATE**
- `55 - 79`: **HIGH**
- `80 - 100`: **CRITICAL**

### 2. Company Verification Service (`backend/services/company_verifier.py`)
Maintains an authoritative registry of Global & Indian Tech Giants (Infosys, TCS, Wipro, Google, Microsoft, Amazon, Accenture, Cognizant, etc.). Distinguishes:
- `VERIFIED`: Exact match with official enterprise domain and hiring guidelines.
- `SUSPICIOUS_MISMATCH`: Claimed brand detected on an unauthorized lookalike domain.
- `UNVERIFIED_BRAND`: Organization mentioned in third-party unmonitored channels.
- `Verification unavailable`: Safely reports unavailable data instead of fabricating false conclusions.

### 3. Structured AI Analysis Engine (`backend/services/ai_engine.py`)
Returns strictly typed JSON outputs:
```json
{
  "risk_summary": "High-confidence recruitment scam detected combining upfront monetary demands with high-pressure artificial urgency.",
  "risk_category": "Advance Fee Recruitment Fraud",
  "signals": ["Payment Request: Upfront fee", "Urgency Signal: 2-hour deadline"],
  "evidence": [...],
  "recommendations": ["Do NOT pay any requested fee or deposit.", "Block and report sender."],
  "confidence": 94
}
```

### 4. Defensive Honeypot Pipeline (`backend/services/honeypot_service.py`)
- Ingests scam lures from decoy sensors (`POST /api/honeypot/ingest`).
- **PII Scrubbing**: Automatically scrubs passwords, OTPs, banking credentials, and card numbers.
- **Indicator Extraction**: Extracts and indexes domains, UPI VPAs, and burner phone numbers into the global threat registry.

---

## 🌐 Manifest V3 Browser Extension Installation

1. Open Google Chrome, Brave, or Microsoft Edge.
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner).
4. Click **Load unpacked**.
5. Select the `scamshield/extension` directory.
6. The ScamShield shield icon will appear in your browser toolbar, querying `http://localhost:8000/api/analyze/url` for active tab threat detection.

---

## 💬 WhatsApp Business Cloud API & CLI Simulator

### Meta Cloud API Webhook Endpoints:
- `GET /api/whatsapp/webhook` — Webhook verification endpoint (supports `hub.mode`, `hub.challenge`, `hub.verify_token`).
- `POST /api/whatsapp/webhook` — Incoming message receiver parsing messages and returning structured security advisories.

### Running the WhatsApp CLI Simulator:
```bash
python whatsapp/simulator.py
```
Allows selecting preset phishing scenarios or inputting custom text to observe real-time webhook parsing and generated WhatsApp replies.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & active engine telemetry |
| `POST` | `/api/analyze/url` | URL forensic analysis & lookalike detection |
| `POST` | `/api/analyze/message` | AI social engineering & payment analysis |
| `POST` | `/api/analyze/screenshot` | OCR text & screenshot document audit |
| `GET` | `/api/reports` | List stored forensic audit reports |
| `GET` | `/api/reports/{id}` | Retrieve individual structured security report |
| `GET` | `/api/threats` | Global threat indicator feed (IOCs) |
| `GET` | `/api/indicators` | Query indexed threat indicators |
| `GET` | `/api/campaigns` | Campaign node-link graph intelligence |
| `POST` | `/api/honeypot/ingest` | Ingest and sanitize honeypot decoy event |
| `GET` | `/api/honeypot/events` | List intercepted decoy telemetry events |
| `GET` | `/api/whatsapp/webhook` | Meta WhatsApp Cloud API verification |
| `POST` | `/api/whatsapp/webhook` | Meta WhatsApp incoming message handler |
| `POST` | `/api/whatsapp/simulate` | Interactive WhatsApp bot simulator |
| `POST` | `/api/auth/login` | Analyst access authentication |

---

## 🔒 Security Best Practices
- **Dual DB Architecture**: Zero-config SQLite in development; PostgreSQL with asyncpg in production.
- **Sanitization & Redaction**: Strict client-side and server-side PII scrubbing in all analysis and honeypot pipelines.
- **No Hardcoded Secrets**: Secrets and tokens managed strictly via `.env` file.
