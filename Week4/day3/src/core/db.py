import asyncio
from typing import AsyncGenerator
from datetime import datetime
from copy import deepcopy

class MockDBSession:
    def __init__(self):
        self._users = []
        self._next_id = 1

    async def add_user(self, user_dict):
        user = deepcopy(user_dict)
        user["id"] = self._next_id
        now = datetime.utcnow()
        user["created_at"] = now
        user["updated_at"] = now
        self._users.append(user)
        self._next_id += 1
        # simulate IO
        await asyncio.sleep(0)
        return user

    async def get_users(self):
        await asyncio.sleep(0)
        return deepcopy(self._users)

    async def get_user(self, user_id: int):
        await asyncio.sleep(0)
        for u in self._users:
            if u["id"] == user_id:
                return deepcopy(u)
        return None

    async def update_user(self, user_id: int, patch: dict):
        await asyncio.sleep(0)
        for u in self._users:
            if u["id"] == user_id:
                u.update(patch)
                u["updated_at"] = datetime.utcnow()
                return deepcopy(u)
        return None

    async def delete_user(self, user_id:int):
        await asyncio.sleep(0)
        for i,u in enumerate(self._users):
            if u["id"] == user_id:
                return self._users.pop(i)
        return None

# async dependency generator
async def get_db():
    db = MockDBSession()
    try:
        yield db
    finally:
        pass
