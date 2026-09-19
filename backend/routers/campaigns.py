from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any

from backend.database import get_db
from backend.models import Campaign

router = APIRouter(prefix="", tags=["Campaigns & Graph Intelligence"])

@router.get("/campaigns")
async def get_campaigns(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Campaign))
    campaigns = list(res.scalars().all())
    
    # Return formatted campaign intelligence list
    return [
        {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "threatActor": c.threat_actor,
            "primaryVector": c.primary_vector,
            "riskLevel": c.risk_level,
            "status": c.status,
            "targetedOrganizations": c.targeted_organizations or [],
            "graph": c.graph_payload or {}
        }
        for c in campaigns
    ]

@router.get("/campaigns/{campaign_id}")
async def get_campaign_detail(campaign_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    camp = res.scalars().first()
    if not camp:
        # Try finding by first campaign
        res = await db.execute(select(Campaign).limit(1))
        camp = res.scalars().first()
        
    if not camp:
        raise HTTPException(status_code=404, detail="Campaign not found")
        
    return {
        "id": camp.id,
        "name": camp.name,
        "description": camp.description,
        "threatActor": camp.threat_actor,
        "primaryVector": camp.primary_vector,
        "riskLevel": camp.risk_level,
        "status": camp.status,
        "targetedOrganizations": camp.targeted_organizations or [],
        "graph": camp.graph_payload or {}
    }
