from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List, Optional
from datetime import datetime, timezone

from backend.database import get_db
from backend.models import Indicator, HoneypotEvent
from backend.schemas import (
    IndicatorResponse, HoneypotIngestRequest, HoneypotEventResponse
)
from backend.services.honeypot_service import HoneypotService

router = APIRouter(prefix="", tags=["Threat Intelligence & Honeypot"])

@router.get("/threats", response_model=List[IndicatorResponse])
@router.get("/indicators", response_model=List[IndicatorResponse])
async def get_indicators(
    limit: int = Query(50, ge=1, le=200),
    severity: Optional[str] = None,
    type: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Indicator).order_by(desc(Indicator.reports_count))
    if severity:
        query = query.where(Indicator.severity == severity.upper())
    if type:
        query = query.where(Indicator.type == type)
    query = query.limit(limit)
    
    res = await db.execute(query)
    indicators = list(res.scalars().all())
    
    return [
        {
            "id": ind.id,
            "indicator": ind.indicator,
            "type": ind.type,
            "severity": ind.severity,
            "firstSeen": ind.first_seen.strftime("%Y-%m-%d") if ind.first_seen else "2025-01-15",
            "reportsCount": ind.reports_count,
            "status": ind.status,
            "category": ind.category,
            "targetedBrand": ind.targeted_brand
        }
        for ind in indicators
    ]

@router.post("/indicators", response_model=IndicatorResponse)
async def create_indicator(ind_data: IndicatorResponse, db: AsyncSession = Depends(get_db)):
    new_ind = Indicator(
        id=ind_data.id,
        indicator=ind_data.indicator,
        type=ind_data.type,
        severity=ind_data.severity,
        reports_count=ind_data.reportsCount,
        status=ind_data.status,
        category=ind_data.category,
        targeted_brand=ind_data.targetedBrand
    )
    db.add(new_ind)
    await db.commit()
    await db.refresh(new_ind)
    return ind_data

@router.post("/honeypot/ingest", response_model=HoneypotEventResponse)
async def ingest_honeypot_event(req: HoneypotIngestRequest, db: AsyncSession = Depends(get_db)):
    event = await HoneypotService.ingest_event(
        session=db,
        source=req.source,
        raw_snippet=req.snippet,
        cluster_tag=req.cluster_tag or "Auto-Decoy"
    )
    return {
        "id": event.id,
        "timestamp": event.created_at.strftime("%Y-%m-%d %H:%M:%S") if event.created_at else datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"),
        "source": event.source,
        "scamPattern": event.scam_pattern,
        "extractedIndicators": {
            "domains": event.extracted_domains or [],
            "paymentIds": event.extracted_payment_ids or [],
            "phoneNumbers": event.extracted_phone_numbers or []
        },
        "urgencyLevel": event.urgency_level,
        "snippet": event.raw_snippet,
        "clusterTag": event.cluster_tag
    }

@router.get("/honeypot/events", response_model=List[HoneypotEventResponse])
async def get_honeypot_events(limit: int = Query(50, ge=1, le=200), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(HoneypotEvent).order_by(desc(HoneypotEvent.created_at)).limit(limit))
    events = list(res.scalars().all())
    
    return [
        {
            "id": ev.id,
            "timestamp": ev.created_at.strftime("%Y-%m-%d %H:%M:%S") if ev.created_at else "2025-02-01 10:00:00",
            "source": ev.source,
            "scamPattern": ev.scam_pattern,
            "extractedIndicators": {
                "domains": ev.extracted_domains or [],
                "paymentIds": ev.extracted_payment_ids or [],
                "phoneNumbers": ev.extracted_phone_numbers or []
            },
            "urgencyLevel": ev.urgency_level,
            "snippet": ev.raw_snippet,
            "clusterTag": ev.cluster_tag
        }
        for ev in events
    ]
