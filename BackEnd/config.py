import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MYSQL_USER: str = 'username123'
    MYSQL_PASSWORD: str = 'fakepassword123'
    MYSQL_HOST: str = '127.0.0.1'
    MYSQL_DB: str = 'db_name123'
    COHERE_API_KEY: str = 'fake123Key'

    class Config:
        env_file = ".env"

settings = Settings()
