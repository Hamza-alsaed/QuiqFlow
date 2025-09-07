from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "QuiqFlow"
    app_env: str = "development"
    app_debug: bool = True
    database_url: str = "sqlite:///./test.db"
    jwt_secret: str = "changeme"   # default — override in .env for production
    token_expire_minutes: int = 60

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}

settings = Settings()
