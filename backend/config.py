import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "ScamShield Intelligence Engine"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./scamshield.db")
    
    # AI Engine
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "hybrid") # hybrid, gemini, openai, local
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY", None)
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", None)
    
    # WhatsApp Cloud API
    WHATSAPP_TOKEN: Optional[str] = os.getenv("WHATSAPP_TOKEN", "scamshield_mock_wa_token")
    WHATSAPP_VERIFY_TOKEN: str = os.getenv("WHATSAPP_VERIFY_TOKEN", "scamshield_verify_token_2025")
    WHATSAPP_PHONE_NUMBER_ID: Optional[str] = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "100234567890123")
    
    # Supabase / JWT Auth
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "scamshield-super-secret-key-32-chars-long!")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Honeypot
    HONEYPOT_INGEST_SECRET: str = os.getenv("HONEYPOT_INGEST_SECRET", "scamshield_honey_secret_99")
    
    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
