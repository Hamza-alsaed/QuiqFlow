# src/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from src.core.config import settings
from src.core.db import get_db, MockDBSession
from src.models.base_response import BaseResponse
from src.models.user_schema import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter(prefix="/auth", tags=["auth"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed: str) -> bool:
    return pwd_context.verify(plain_password, hashed)

def create_token(data: dict, expires_minutes:int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes or settings.token_expire_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret, algorithm="HS256")

@router.post("/register", response_model=BaseResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: MockDBSession = Depends(get_db)):
    # store hashed password in user record
    user_dict = user.dict()
    hashed = hash_password(user_dict.pop("password"))
    user_record = await db.add_user({**user_dict, "password_hash": hashed})
    return BaseResponse(success=True, data={"id": user_record["id"]})

@router.post("/login", response_model=BaseResponse)
async def login(email: str, password: str, db: MockDBSession = Depends(get_db)):
    users = await db.get_users()
    # naive search
    user = next((u for u in users if u["email"] == email), None)
    if not user or not verify_password(password, user.get("password_hash","")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user["email"], "user_id": user["id"]})
    return BaseResponse(success=True, data={"token": token})
