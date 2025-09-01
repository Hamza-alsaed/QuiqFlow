from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str
    app_version: str
    debug: bool
    database_url: str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# Load settings
settings = Settings()
