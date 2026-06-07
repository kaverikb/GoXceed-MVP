from fastapi import APIRouter
from pydantic import BaseModel

from services.research_service import (
    generate_research,
    summarize_research
)

router = APIRouter(
    prefix="/research",
    tags=["Research"]
)


class ResearchRequest(BaseModel):
    company: str


class SummaryRequest(BaseModel):
    content: str


@router.post("/")
def research(request: ResearchRequest):

    result = generate_research(
        request.company
    )

    return {
        "research": result
    }


@router.post("/summarize")
def summarize(
    request: SummaryRequest
):

    result = summarize_research(
        request.content
    )

    return {
        "summary": result
    }