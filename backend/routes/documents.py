from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from services.document_service import (
    extract_pdf_text,
    summarize_document,
    executive_summary
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    text = extract_pdf_text(
        file.file
    )

    summary = summarize_document(
        text
    )

    return {
        "filename": file.filename,
        "summary": summary,
        "text": text
    }


@router.post("/summarize")
def summarize_report(data: dict):

    content = data.get(
        "content",
        ""
    )

    result = executive_summary(
        content
    )

    return {
        "summary": result
    }