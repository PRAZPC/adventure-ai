from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import  settings
from routers import job,story
from db.database import create_table

create_table()

app = FastAPI(
    title="Adventure AI",
    description="llm ",
    version="1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(CORSMiddleware,
                   allow_origins=settings.ALLOWED_ORIGINS,
                   allow_methods=["*"],
                   allow_credentials=True,
                   allow_headers=["*"])
app.include_router(story.router,prefix=settings.API_PREFIX)
app.include_router(job.router,prefix=settings.API_PREFIX)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app",host="0.0.0.0",port=8000,reload=True)
