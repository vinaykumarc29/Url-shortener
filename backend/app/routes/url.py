from fastapi import APIRouter , Depends ,status
from sqlalchemy.orm import session

from app.database.connection import getdb
from app.schemas.url import URLCreate ,URLResponse
from app.services.url import create_short_url , redirect_to_original_url , get_url_analytics ,get_all_urls


router = APIRouter(prefix="/api/urls" , tags=["Urls"])

@router.post("/",response_model=URLResponse , status_code=status.HTTP_201_CREATED)
def create_url(url_data:URLCreate , db:session=Depends(getdb)):
    return create_short_url(db,url_data)

@router.get("/{short_code}", tags=['Urls'])
def redirect(short_code:str,db:session=Depends(getdb)):
    return redirect_to_original_url(db,short_code)

@router.get("/{short_code}/analytics",tags=['urls'])
def show_analytics(short_code:str , db:session=Depends(getdb)):
    return get_url_analytics(db,short_code)

@router.get("/",tags=['urls'])
def show_all_urls(db:session=Depends(getdb)):
    return get_all_urls(db)
    
