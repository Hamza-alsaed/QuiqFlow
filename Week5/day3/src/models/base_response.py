from pydantic import BaseModel
from typing import Optional

class BaseResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
