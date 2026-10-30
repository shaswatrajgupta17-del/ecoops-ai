from typing import Literal
from pydantic import BaseModel, Field


class EvidenceSignals(BaseModel):
    visual: float | None = Field(default=None, ge=0, le=100)
    occupancy: float | None = Field(default=None, ge=0, le=100)
    meter: float | None = Field(default=None, ge=0, le=100)
    historical: float | None = Field(default=None, ge=0, le=100)


class RiskAssessment(BaseModel):
    risk_score: float
    priority: Literal["low", "medium", "high"]
    evidence_used: list[str]
    provisional_weights: dict[str, float]
    note: str
