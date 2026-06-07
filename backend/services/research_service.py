import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_research(topic):

    prompt = f"""
Create a professional business research report.

Research Topic:
{topic}

Return the report STRICTLY in markdown format.

Structure:

# Executive Summary

# Company / Industry Overview

# Market Analysis

# Competitor Analysis
Competitor Analysis must be presented as a markdown table.

# SWOT Analysis
SWOT Analysis must be presented as a 4-column markdown table:
| Strengths | Weaknesses | Opportunities | Threats |

# Key Trends

# Risks

# Growth Opportunities

# Strategic Recommendations

# Conclusion

Rules:
- Use markdown headings
- Use markdown tables where useful
- Use bullet points for insights
- Be concise but detailed
- Do not output one large paragraph
- Make the report presentation-ready
- SWOT Analysis must always be a markdown table
- Competitor Analysis must always be a markdown table
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "system",
                "content": """
You are a senior business research analyst.

Always generate structured business reports.

Formatting Rules:
- Use valid markdown only
- Never use HTML tags such as <br>
- Never output raw formatting characters
- Never create fake tables using tabs or spaces
- Use proper markdown tables
- Use markdown bullet lists
- Use markdown numbered lists
- Keep reports clean and professional
- Never add commas or unnecessary punctuation at the end of bullet points
- Keep bullet points clean and concise
- Do not add trailing punctuation unless grammatically necessary
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def summarize_research(content):

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b:free",
        messages=[
            {
                "role": "system",
                "content": """
Create an executive summary.

Rules:
- Use proper markdown only
- Use markdown headings (#, ##) only for section titles
- Never output raw HTML such as <br>
- Never use dashed separators like ------------ or -----------
- Use proper markdown tables instead
- Use bullet points for lists
- Use numbered lists when appropriate
- Keep formatting clean and presentation-ready
- Ensure all tables are valid markdown tables
"""
            },
            {
                "role": "user",
                "content": content
            }
        ]
    )

    return response.choices[0].message.content