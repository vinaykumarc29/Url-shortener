from pydantic import BaseModel , HttpUrl ,ConfigDict

class URLCreate(BaseModel):
    original_url : HttpUrl

class URLResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    short_code:str
    original_url:str
    click_count:int
    