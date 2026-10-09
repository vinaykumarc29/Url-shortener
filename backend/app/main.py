from fastapi import FastAPI 
from app.routes.url import router as url_router
from app.database.base import Base
from app.database.connection import engine


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Url Shortner",
    description="A URL Shortening service build with FastApi"
)

app.include_router(url_router)

@app.get('/')
def root():
    return {
        "message":"Url Shortner service is running"
    }




