# GoXceed

## Overview

GoXceed is an AI-powered business intelligence platform that helps users research companies, analyze documents, generate reports, and interact with an AI assistant through a unified interface.

The platform combines business research, document intelligence, AI chat, report management, and user authentication into a single workflow.

---

## Features

### AI Chat Assistant

* General-purpose AI assistant
* Structured responses with headings, bullet points, and tables
* Business, productivity, and content-related assistance
* PDF attachment support for document-based question answering

### Business Research

* Company and industry research generation
* Market analysis
* Competitor analysis
* SWOT analysis
* Strategic recommendations
* Structured report generation

### Document Analysis

* PDF document upload
* Automated document summarization
* Key insight extraction
* Business-focused analysis
* Report creation from analyzed documents

### Reports Management

* Save generated reports
* View report history
* Open individual reports
* Delete reports
* Persistent report storage

### User Authentication

* User registration
* User login
* Session management
* Protected application access

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Markdown
* Lucide React

### Backend

* FastAPI
* Python
* OpenRouter API
* PyPDF
* Pydantic
* Uvicorn

### Storage

* JSON-based local storage
* Report persistence
* User persistence

---

## Project Structure

```text
GoXceed/

├── backend/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── pages/
│   ├── services/
│   ├── layouts/
│   ├── components/
│   └── App.jsx
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd GoXceed
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_api_key
```

Run backend:

```bash
uvicorn app:app --reload
```

Backend runs at:

```text
http://https://mvp-backend-production-2943.up.railway.app:8000
```

---

### Frontend Setup

```bash
npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Modules

### Authentication

* User Registration
* User Login

### AI Chat

* General AI conversations
* Document-based question answering

### Business Research

* Company analysis
* Industry insights
* SWOT analysis
* Strategic recommendations

### Document Analysis

* PDF upload
* Text extraction
* Summarization
* Insight generation

### Reports

* Save reports
* View reports
* Delete reports

---

## Workflow

### Business Research

```text
User Input
      ↓
Research Generation
      ↓
Structured Analysis
      ↓
Save Report
```

### Document Analysis

```text
Upload PDF
      ↓
Text Extraction
      ↓
AI Analysis
      ↓
Report Generation
```

### AI Chat with PDF

```text
Upload PDF
      ↓
Extract Content
      ↓
Ask Questions
      ↓
Document-Based Answers
```

---

## Future Enhancements

* Full Retrieval-Augmented Generation (RAG)
* Vector database integration
* Multi-document chat
* Conversation history
* PDF export
* WhatsApp integration
* Team collaboration features
* Cloud database integration

---

## Authors

Developed as an AI-powered business intelligence and document analysis platform.

---

## License

This project is intended for educational and demonstration purposes.
