from typing import Generator

# Mock DB session
class MockDBSession:
    def __init__(self):
        self.users = []

    def add_user(self, user):
        self.users.append(user)

    def get_users(self):
        return self.users

# Dependency injection
def get_db() -> Generator:
    db = MockDBSession()
    try:
        yield db
    finally:
        pass
