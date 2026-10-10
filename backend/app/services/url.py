import secrets
import string

from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException

from app.models.url import URL
from app.schemas.url import URLCreate , URLResponse


def create_short_url(db:Session , url_data:URLCreate)-> URL:
    original_url = str(url_data.original_url)
    name = str(url_data.name)

    while True:
        short_code = "".join(
            secrets.choice(string.ascii_letters+string.digits)
            for _ in range(7)
        )

        short_code_exists = db.query(URL).filter(URL.short_code == short_code).first()

        if not short_code_exists:
            break

    new_url = URL(
        original_url=original_url,
        short_code=short_code,
        name=name
    )

    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    return new_url

def redirect_to_original_url(db:Session,short_code:str)->str:
    url = db.query(URL).filter(URL.short_code == str(short_code)).first()

    if not url:
        raise HTTPException(
            status_code=404,
            detail="Invalid Short Code"
        )

    original_url = url.original_url
    url.click_count += 1 

    db.commit()

    return original_url

def get_all_urls(db:Session , search:str )->URL:
    query = db.query(URL)
        
    if search and search.strip():
        term = f"%{search.strip()}%"
        
        query = query.filter(
            or_(
                URL.name.ilike(term),
                URL.short_code.ilike(term)
            )
        )
        
        return query.order_by(URL.id.desc()).all()
    
    return query.order_by(URL.id.desc()).all()
    

def delete_url(db: Session, url_id: int) -> None:
    url = db.query(URL).filter(URL.id == url_id).first()

    if not url:
        raise HTTPException(status_code=404, detail="Url doesn't exist")

    db.delete(url)
    db.commit()

