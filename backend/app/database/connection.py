from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.settings import DATABASE_URL

engine = create_engine(DATABASE_URL)

SessionLocal= sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

def getdb():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
