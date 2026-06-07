import json
import uuid
from datetime import datetime

REPORT_FILE = "database/reports.json"


def save_report(title, content, source_file):
    report = {
        "id": str(uuid.uuid4()),
        "title": title,
        "date": datetime.now().strftime("%d %b %Y"),
        "type": "Document Analysis",
        "source_file": source_file,
        "content": content
    }

    try:
        with open(REPORT_FILE, "r", encoding="utf-8") as f:
            reports = json.load(f)
    except:
        reports = []

    reports.append(report)

    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        json.dump(reports, f, indent=2)

    return report


def get_reports():
    try:
        with open(REPORT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []


def get_report(report_id):
    reports = get_reports()

    for report in reports:
        if report["id"] == report_id:
            return report

    return None

def delete_report(report_id):

    reports = get_reports()

    updated_reports = [
        report
        for report in reports
        if report["id"] != report_id
    ]

    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        json.dump(
            updated_reports,
            f,
            indent=2
        )

    return {
        "success": True
    }