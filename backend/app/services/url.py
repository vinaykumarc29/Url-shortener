import secrets
import string

from sqlalchemy.orm import session
from fastapi import HTTPException

from app.models.url import URL
from app.schemas.url import URLCreate , URLResponse


def create_short_url(db:session , url_data:URLCreate)-> URL:
    original_url = str(url_data.original_url)

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
        short_code=short_code
    )

    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    return new_url

def redirect_to_original_url(db:session,short_code:str)->str:
    url = db.query(URL).filter(URL.short_code == short_code).first()

    if not url:
        raise HTTPException(
            status_code=404,
            detail="Invalid Short Code"
        )

    original_url = url.original_url
    url.click_count += 1 

    db.commit()

    return original_url


def get_url_analytics(db:session,short_code:str)->URL:
    url = db.query(URL).filter(URL.short_code == short_code).first()

    if not url:
        raise HTTPException(status_code=404,detail="Invalid Short_code")

    return url

def get_all_urls(db:session)->URL:
    urls = db.query(URL).all()
    return urls

