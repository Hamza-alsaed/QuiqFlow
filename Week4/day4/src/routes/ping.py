from fastapi import APIRouter
from src.models.base_response import BaseResponse

router = APIRouter()

@router.get("/ping", response_model=BaseResponse)
def ping():
    return BaseResponse(success=True, data={"message": "pong"})