import os

from pypdf import PdfReader

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def extract_pdf_text(file):

    reader = PdfReader(file)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def summarize_document(text):

    text = text[:50000]

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "system",
                "content": """
You are a senior business analyst and management consultant.

Analyze the document and create a professional business report.

IMPORTANT RULES:

- Return clean markdown only.
- Use proper markdown headings (#, ##).
- Use markdown tables only when useful.
- Use bullet points where appropriate.
- Do NOT use decorative separators such as ---.
- Do NOT use excessive bold formatting.
- Do NOT repeat information.
- Do NOT include placeholders such as [Your Name].
- Do NOT mention being an AI.
- Do NOT invent facts not present in the document.
- Keep insights concise and executive-friendly.

Use EXACTLY this structure:

# Executive Summary

Provide a concise overview of the document.

# Key Findings

Summarize the most important findings.

# Risks

Identify major risks, concerns, or challenges.

# Opportunities

Identify growth opportunities, strengths, or advantages.

# Recommendations

Provide practical recommendations based on the document.

# Conclusion

Provide a short overall assessment.
"""
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    return response.choices[0].message.content

def executive_summary(text):

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "system",
                "content": """
Create an executive summary.

Rules:
- Maximum 8 bullet points
- Short and concise
- Business language
- Focus on key findings
- Return markdown bullet points only
"""
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    return response.choices[0].message.content