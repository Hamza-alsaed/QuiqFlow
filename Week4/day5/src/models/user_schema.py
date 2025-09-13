from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    id: int
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
