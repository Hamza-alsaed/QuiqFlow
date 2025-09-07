# Week4/day4/src/routes/users.py
from fastapi import APIRouter, HTTPException
from typing import Optional
from src.models.user_schema import UserSchema
from src.models.base_response import BaseResponse
from src.core.db import db  # your mock DB

router = APIRouter()

# In-memory "database" for demo purposes
_fake_user_id = 1

@router.post("/users", response_model=BaseResponse)
def create_user(user: UserSchema):
    global _fake_user_id
    user_dict = user.dict()
    user_dict["id"] = _fake_user_id
    _fake_user_id += 1
    db.add_user(user_dict)
    return BaseResponse(success=True, data=user_dict)

@router.get("/users", response_model=BaseResponse)
def get_all_users():
    users = db.get_users()
    return BaseResponse(success=True, data=users)


@router.get("/users/{user_id}", response_model=BaseResponse)
def get_user(user_id: int):
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with id {user_id} not found")
    return BaseResponse(success=True, data=user)
