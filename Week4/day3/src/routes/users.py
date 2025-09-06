from fastapi import APIRouter, Depends
from src.models.user_schema import UserSchema
from src.core.db import get_db, MockDBSession

router = APIRouter()
_fake_user_id = 1

@router.post("/users", response_model=UserSchema)
def create_user(user: UserSchema, db: MockDBSession = Depends(get_db)):
    global _fake_user_id
    user.id = _fake_user_id
    _fake_user_id += 1
    db.add_user(user)
    return user

@router.get("/users", response_model=list[UserSchema])
def list_users(db: MockDBSession = Depends(get_db)):
    return db.get_users()
