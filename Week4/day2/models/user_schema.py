from pydantic import BaseModel, Field, EmailStr, field_validator

class UserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    age: int = Field(..., ge=13, le=120)

    @field_validator('username')
    def username_no_spaces(cls, v):
        if ' ' in v:
            raise ValueError('username cannot contain spaces')
        return v
