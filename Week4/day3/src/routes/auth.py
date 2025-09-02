from fastapi import APIRouter

router = APIRouter()

@router.post("/auth/login")
def login(username: str, password: str):
    if username == "admin" and password == "password":
        return {"token": "fake-jwt-token"}
    return {"error": "Invalid credentials"}
