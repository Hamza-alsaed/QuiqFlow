from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "QuiqFlow"
    app_env: str = "development"
    app_debug: bool = True
    openai_api_key: str
    whisper_model: str = "whisper-1"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
