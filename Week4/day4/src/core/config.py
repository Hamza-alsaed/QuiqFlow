from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "QuiqFlow"
    app_env: str = "development"
    app_debug: bool = True
    database_url: str = "sqlite:///./test.db"

   
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
