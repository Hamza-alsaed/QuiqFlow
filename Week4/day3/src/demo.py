from src.core.config import settings
from src.models.user_schema import UserSchema

print("Loaded Settings:", settings.model_dump())

user = UserSchema(id=1, name="Hamza", email="hamza@example.com")
print("UserSchema example:", user)
