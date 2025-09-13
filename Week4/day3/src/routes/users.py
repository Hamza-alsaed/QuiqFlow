# src/routes/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from src.models.user_schema import UserCreate, UserResponse, UserUpdate
from src.models.user_schema import BaseResponse
from src.core.db import get_db, MockDBSession

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=BaseResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: MockDBSession = Depends(get_db)):
    created = await db.add_user(user.dict(exclude={"password"}))  # store hashed password in auth layer
    return BaseResponse(success=True, data=created)

@router.get("/", response_model=BaseResponse)
async def list_users(db: MockDBSession = Depends(get_db)):
    users = await db.get_users()
    return BaseResponse(success=True, data=users)

@router.get("/{user_id}", response_model=BaseResponse)
async def get_user(user_id: int, db: MockDBSession = Depends(get_db)):
    user = await db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return BaseResponse(success=True, data=user)

@router.put("/{user_id}", response_model=BaseResponse)
async def update_user(user_id:int, patch: UserUpdate, db: MockDBSession = Depends(get_db)):
    updated = await db.update_user(user_id, patch.dict(exclude_none=True))
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return BaseResponse(success=True, data=updated)

@router.delete("/{user_id}", response_model=BaseResponse)
async def delete_user(user_id:int, db: MockDBSession = Depends(get_db)):
    deleted = await db.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return BaseResponse(success=True, data=deleted)
