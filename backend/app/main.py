from fastapi import FastAPI 
from app.routes.url import router as url_router , redirect_router

from app.database.base import Base
from app.database.connection import engine
from fastapi.middleware.cors import CORSMiddleware


from app.config.settings import FRONTEND_URL

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Url Shortner",
    description="A URL Shortening service build with FastApi"
)

configured_origins = [
    url.strip().rstrip("/")
    for url in FRONTEND_URL.split(",")
    if url.strip()
]

origins = list(dict.fromkeys([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    *configured_origins
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(url_router)
app.include_router(redirect_router)

@app.get('/')
def root():
    return {
        "message": "Url Shortner service is running"
    }

@app.get('/health')
def health_check():
    return {
        "status": "healthy"
    }




