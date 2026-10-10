from datetime import datetime
from pydantic import BaseModel, HttpUrl, ConfigDict

class URLCreate(BaseModel):
    original_url: HttpUrl
    name: str

class URLResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    short_code: str
    original_url: str
    click_count: int
    created_at: datetime
