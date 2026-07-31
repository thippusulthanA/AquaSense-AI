import os
from typing import List

try:
    from pydantic_settings import BaseSettings, SettingsConfigDict
    USE_CONFIG_DICT = True
except ImportError:
    from pydantic import BaseSettings
    USE_CONFIG_DICT = False

class Settings(BaseSettings):
    PROJECT_NAME: str = "AquaSense-AI Platform"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = os.getenv("SECRET_KEY", "aquasense_super_secret_jwt_key_2026_master")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours

    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "aquasense_db")
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:postgres@localhost:5432/aquasense_db"
    )

    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/1")
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/2")

    UPLOAD_DIR: str = "./uploads"
    REPORT_DIR: str = "./reports"

    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://localhost:80,http://127.0.0.1:5173"
    VITE_API_BASE_URL: str = "http://localhost:8000/api/v1"
    VITE_WS_URL: str = "ws://localhost:8000/ws"

    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    if USE_CONFIG_DICT:
        model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")
    else:
        class Config:
            case_sensitive = True
            env_file = ".env"
            extra = "ignore"

settings = Settings()
