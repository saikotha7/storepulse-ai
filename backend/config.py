from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./storepulse.db"
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # Apify
    APIFY_TOKEN: str
    
    # Claude/Anthropic
    ANTHROPIC_API_KEY: str
    
    # Optional
    GOOGLE_PLACES_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()