from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "EcoOps AI"
    app_env: str = "development"
    api_v1_prefix: str = "/api/v1"
    frontend_origin: str = "http://localhost:5173"
    database_url: str = "postgresql+psycopg://ecoops:ecoops_dev_only@localhost:5432/ecoops"
    model_api_key: str = ""
    meta_base_url: str = "https://api.meta.ai/v1"
    meta_text_model: str = "muse-spark-1.3"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
