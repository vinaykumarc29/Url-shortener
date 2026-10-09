from fastapi import APIRouter , Depends ,status ,Query
from sqlalchemy.orm import session

from app.database.connection import getdb
from app.schemas.url import URLCreate ,URLResponse
from app.services.url import create_short_url , redirect_to_original_url , get_url_analytics ,get_all_urls, delete_url


router = APIRouter(prefix="/api/urls" , tags=["Urls"])

@router.post("/",response_model=URLResponse , status_code=status.HTTP_201_CREATED)
def create_url(url_data:URLCreate , db:session=Depends(getdb)):
    return create_short_url(db,url_data)

@router.get("/" , status_code=status.HTTP_200_OK)
def show_all_urls(search:str | None=Query(default=None ,max_lenth=200) ,db:session=Depends(getdb)):
    return get_all_urls(db,search)

@router.get("/{short_code}", status_code=status.HTTP_200_OK)
def redirect(short_code:str,db:session=Depends(getdb)):
    return redirect_to_original_url(db,short_code)

@router.get("/{short_code}/analytics",status_code=status.HTTP_200_OK)
def show_analytics(short_code:str , db:session=Depends(getdb)):
    return get_url_analytics(db,short_code)

@router.delete('/{url_id}',status_code=status.HTTP_204_NO_CONTENT)
def remove_url(url_id , db:session=Depends(getdb)):
    return delete_url(db,url_id)
    
    

    
