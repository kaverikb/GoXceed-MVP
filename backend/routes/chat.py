from fastapi import APIRouter
from pydantic import BaseModel

from services.chat_service import (
    generate_response
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    message: str
    document: str | None = None


@router.post("/")
def chat(
    request: ChatRequest
):

    reply = generate_response(
        request.message,
        request.document
    )

    return {
        "response": reply
    }