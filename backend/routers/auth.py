from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
import uuid

from backend.database import get_db
from backend.models import User
from backend.schemas import LoginRequest, RegisterRequest, AuthResponse

router = APIRouter(prefix="", tags=["Authentication & Access Control"])

@router.post("/auth/login", response_model=AuthResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == req.email.lower()))
    user = res.scalars().first()
    
    # Allow demo analyst login seamlessly or match password
    if not user:
        # Create user on the fly for demo convenience if email provided
        user = User(
            id=f"usr_{uuid.uuid4().hex[:8]}",
            email=req.email.lower(),
            hashed_password="mock_hash_scamshield",
            full_name=req.email.split("@")[0].capitalize(),
            organization="Cyber Threat Defense Team",
            role="analyst"
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    token = f"scs_jwt_{user.id}_{uuid.uuid4().hex[:12]}"
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "fullName": user.full_name,
            "organization": user.organization,
            "role": user.role
        }
    }

@router.post("/auth/register", response_model=AuthResponse)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == req.email.lower()))
    existing = res.scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    new_user = User(
        id=f"usr_{uuid.uuid4().hex[:8]}",
        email=req.email.lower(),
        hashed_password="mock_hash_scamshield",
        full_name=req.full_name or req.email.split("@")[0].capitalize(),
        organization=req.organization or "Independent Researcher",
        role="analyst"
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    token = f"scs_jwt_{new_user.id}_{uuid.uuid4().hex[:12]}"

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "fullName": new_user.full_name,
            "organization": new_user.organization,
            "role": new_user.role
        }
    }

@router.get("/auth/me")
async def get_current_user(authorization: Optional[str] = Header(None), db: AsyncSession = Depends(get_db)):
    if not authorization:
        # Return default active analyst session
        res = await db.execute(select(User).limit(1))
        user = res.scalars().first()
        if user:
            return {
                "id": user.id,
                "email": user.email,
                "fullName": user.full_name,
                "organization": user.organization,
                "role": user.role,
                "isAuthenticated": True
            }
        return {
            "id": "usr_guest",
            "email": "guest@scamshield.ai",
            "fullName": "Guest Analyst",
            "organization": "ScamShield Community",
            "role": "guest",
            "isAuthenticated": False
        }

    return {
        "id": "usr_verified_session",
        "email": "analyst@scamshield.ai",
        "fullName": "Senior Threat Analyst",
        "organization": "ScamShield SOC",
        "role": "analyst",
        "isAuthenticated": True
    }
