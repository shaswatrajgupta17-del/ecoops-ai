from fastapi import APIRouter, HTTPException
from openai import OpenAI

from app.core.config import settings
from app.schemas.incident import EvidenceSignals, RiskAssessment

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok", "service": settings.app_name}


@router.post("/ai/test")
def test_meta_connection():
    if not settings.model_api_key:
        raise HTTPException(
            status_code=503,
            detail="MODEL_API_KEY is not configured in backend/.env",
        )

    try:
        client = OpenAI(
            base_url=settings.meta_base_url,
            api_key=settings.model_api_key,
        )
        response = client.responses.create(
            model=settings.meta_text_model,
            input="Reply with exactly: ECOOPS_META_CONNECTION_OK",
        )
        return {
            "status": "connected",
            "model": settings.meta_text_model,
            "response": response.output_text,
        }
    except Exception as exc:
        # Do not return secrets or full request headers to the browser.
        raise HTTPException(
            status_code=502,
            detail=f"Meta Model API request failed: {type(exc).__name__}",
        ) from exc


@router.post("/incidents/score", response_model=RiskAssessment)
def score_incident(signals: EvidenceSignals):
    weights = {
        "visual": 0.25,
        "occupancy": 0.25,
        "meter": 0.35,
        "historical": 0.15,
    }
    available = {
        key: value
        for key, value in signals.model_dump().items()
        if value is not None
    }
    if not available:
        raise HTTPException(
            status_code=422,
            detail="At least one evidence signal is required.",
        )

    denominator = sum(weights[key] for key in available)
    score = sum(weights[key] * value for key, value in available.items()) / denominator
    score = round(score, 1)

    if score >= 80:
        priority = "high"
    elif score >= 55:
        priority = "medium"
    else:
        priority = "low"

    return RiskAssessment(
        risk_score=score,
        priority=priority,
        evidence_used=list(available.keys()),
        provisional_weights=weights,
        note=(
            "Prototype score only. Validate weights and thresholds against "
            "labeled operational data before real-world use."
        ),
    )
