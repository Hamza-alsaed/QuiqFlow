from typing import Generator

# Mock DB session
class MockDBSession:
    def __init__(self):
        self.users = []

    def add_user(self, user):
        self.users.append(user)

    def get_users(self):
        return self.users
    
    def get_user_by_id(self, user_id: int):
        return next((u for u in self._users if u["id"] == user_id), None)

    def get_user_by_username(self, username: str):
        return next((u for u in self._users if u["username"] == username), None)

# Dependency injection
def get_db() -> Generator:
    db = MockDBSession()
    try:
        yield db
    finally:
        pass
