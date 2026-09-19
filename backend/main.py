from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from backend.config import settings
from backend.database import init_db
from backend.routers import analysis, threats, campaigns, whatsapp, auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables and seed data on startup
    try:
        await init_db()
        print("[ScamShield Backend] Database tables & threat intelligence seeds initialized successfully.")
    except Exception as e:
        print(f"[ScamShield Backend] Database init warning: {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Deterministic Risk Scoring, AI Linguistic Analysis, Threat Intelligence & Honeypot Ingestion Engine",
    version="2.0.0",
    lifespan=lifespan
)

# CORS Configuration allowing Vite dev server, Next.js, and Chrome Extensions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Index Route providing service directory and quick links
@app.get("/", response_class=HTMLResponse, tags=["Index"])
async def root_index():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ScamShield API Engine</title>
        <style>
            body {
                background-color: #030712;
                color: #f1f5f9;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
                padding: 40px 20px;
                max-width: 800px;
                margin: 0 auto;
                line-height: 1.6;
            }
            .card {
                background: #0f172a;
                border: 1px solid #06b6d4;
                border-radius: 16px;
                padding: 30px;
                box-shadow: 0 0 30px rgba(6, 182, 212, 0.15);
            }
            h1 { color: #38bdf8; margin-top: 0; display: flex; align-items: center; gap: 10px; }
            .badge { background: #06b6d4; color: #020617; font-size: 12px; font-weight: bold; padding: 3px 8px; border-radius: 6px; }
            .links { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 25px; }
            .btn {
                display: block;
                background: #1e293b;
                color: #38bdf8;
                text-decoration: none;
                padding: 12px 16px;
                border-radius: 8px;
                border: 1px solid #334155;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn:hover { background: #06b6d4; color: #020617; border-color: #06b6d4; }
            .frontend-btn {
                background: linear-gradient(135deg, #06b6d4, #2563eb);
                color: white;
                border: none;
            }
            .frontend-btn:hover { opacity: 0.9; color: white; }
            code { background: #020617; padding: 2px 6px; border-radius: 4px; color: #38bdf8; }
            ul { padding-left: 20px; color: #94a3b8; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🛡️ ScamShield Intelligence API <span class="badge">v2.0 ONLINE</span></h1>
            <p>The ScamShield Cybersecurity REST API backend is active and serving real-time deterministic risk assessments, threat intelligence, honeypot streams, and WhatsApp Cloud webhooks.</p>
            
            <div class="links">
                <a href="http://localhost:5173" class="btn frontend-btn">🌐 Open Web Application (Port 5173) ↗</a>
                <a href="/docs" class="btn">📖 Interactive Swagger API Docs ↗</a>
                <a href="/api/health" class="btn">🩺 Engine Health Status ↗</a>
                <a href="/api/threats" class="btn">🚨 Live Threat Indicators (IOCs) ↗</a>
                <a href="/api/reports" class="btn">📊 Stored Security Audits ↗</a>
                <a href="/api/campaigns" class="btn">🕸️ Campaign Graph Intelligence ↗</a>
            </div>

            <h3 style="margin-top: 30px; color: #e2e8f0;">Active Endpoint Forensics</h3>
            <ul>
                <li><code>POST /api/analyze/url</code> — Deep DNS, lookalike domain & SSL analysis</li>
                <li><code>POST /api/analyze/message</code> — NLP social engineering & fee extortion audit</li>
                <li><code>POST /api/honeypot/ingest</code> — Automated decoy indicator extraction</li>
                <li><code>POST /api/whatsapp/webhook</code> — Meta WhatsApp Cloud API incoming handler</li>
            </ul>
        </div>
    </body>
    </html>
    """

# Root Health Check
@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "ScamShield Cybersecurity Engine",
        "version": "2.0.0",
        "environment": settings.ENVIRONMENT,
        "database": "connected",
        "engines": {
            "url_analyzer": "active",
            "company_verifier": "active",
            "ai_engine": "active",
            "risk_engine": "active",
            "honeypot_pipeline": "active"
        }
    }

# Register all Routers under /api
app.include_router(analysis.router, prefix="/api")
app.include_router(threats.router, prefix="/api")
app.include_router(campaigns.router, prefix="/api")
app.include_router(whatsapp.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
