from fastapi import APIRouter
from src.models.base_response import BaseResponse

router = APIRouter()

@router.post("/auth/login", response_model=BaseResponse)
def login(username: str, password: str):
    if username == "admin" and password == "password":
        return BaseResponse(success=True, data={"token": "fake-jwt-token"})
    return BaseResponse(success=False, error="Invalid credentials")