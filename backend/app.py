from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.research import router as research_router
from routes.documents import router as documents_router
from routes.reports import router as reports_router

app = FastAPI(
    title="GoXceed API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://go-xceed-mvp.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(research_router)
app.include_router(documents_router)
app.include_router(reports_router)


@app.get("/")
def home():
    return {
        "status": "running",
        "project": "GoXceed"
    }