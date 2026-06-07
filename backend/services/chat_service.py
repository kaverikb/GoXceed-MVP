import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_response(
    message: str,
    document: str = None
):
    system_prompt = """
You are a professional business AI assistant.
Always structure responses clearly.
Rules:
- Use markdown headings
- Use bullet points
- Use numbered steps when appropriate
- Use markdown tables for comparisons
- Avoid large text blocks
- Keep responses concise
"""
    if document:
        system_prompt += """
You are currently answering questions
about an uploaded PDF.
IMPORTANT:
- Answer ONLY using the document.
- Do not invent information.
- If the answer is not present,
  say:
"The uploaded document does not contain this information."
"""
        user_prompt = f"""
DOCUMENT:
{document}
QUESTION:
{message}
"""
    else:
        user_prompt = message

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    return response.choices[0].message.content