from fastapi import APIRouter , Depends ,status ,Query
from sqlalchemy.orm import session
from fastapi.responses import RedirectResponse

from app.database.connection import getdb
from app.schemas.url import URLCreate ,URLResponse
from app.services.url import create_short_url , redirect_to_original_url ,get_all_urls, delete_url


router = APIRouter(prefix="/api/urls" , tags=["Urls"])
redirect_router = APIRouter(tags=["Redirect"])

@router.post("/",response_model=URLResponse , status_code=status.HTTP_201_CREATED)
def create_url(url_data:URLCreate , db:session=Depends(getdb)):
    return create_short_url(db,url_data)

@router.get("/" , status_code=status.HTTP_200_OK)
def show_all_urls(search:str | None=Query(default=None ,max_lenth=200) ,db:session=Depends(getdb)):
    return get_all_urls(db,search)

@redirect_router.get("/{short_code}")
def redirect(short_code:str,db:session=Depends(getdb)):
    original_url = redirect_to_original_url(db,short_code)
    return RedirectResponse(url=original_url,status_code=307)
    

@router.delete('/{url_id}',status_code=status.HTTP_204_NO_CONTENT)
def remove_url(url_id , db:session=Depends(getdb)):
    return delete_url(db,url_id)
    
    

    
