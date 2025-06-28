import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MYSQL_USER: str = os.getenv('MYSQL_USER', 'u445193631_RB')
    MYSQL_PASSWORD: str = os.getenv('MYSQL_PASSWORD', 'Esite198118#')
    MYSQL_HOST: str = os.getenv('MYSQL_HOST', '217.21.87.103')
    MYSQL_DB: str = os.getenv('MYSQL_DB', 'u445193631_ResumeBuilder')

settings = Settings()
