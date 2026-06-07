from fastapi import APIRouter
from services.report_service import (
    save_report,
    get_reports,
    get_report,
    delete_report
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/")
def fetch_reports():
    return get_reports()


@router.get("/{report_id}")
def fetch_report(report_id: str):
    return get_report(report_id)


@router.post("/save")
def create_report(data: dict):

    title = data.get(
        "title",
        "Untitled Report"
    )

    content = data.get(
        "content",
        ""
    )

    source_file = data.get(
        "source_file",
        "Unknown"
    )

    return save_report(
        title,
        content,
        source_file
    )


@router.delete("/{report_id}")
def remove_report(report_id: str):
    return delete_report(
        report_id
    )