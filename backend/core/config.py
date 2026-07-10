import os

from dotenv import load_dotenv


load_dotenv()


class Settings:

    MONGO_URL = os.getenv(
        "MONGO_URL",
        "mongodb://localhost:27017"
    )

    DATABASE_NAME = os.getenv(
        "DATABASE_NAME",
        "smartsupport_ai"
    )

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "secret"
    )

    ALGORITHM = os.getenv(
        "ALGORITHM",
        "HS256"
    )

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "30"
        )
    )

    OLLAMA_MODEL = os.getenv(
        "OLLAMA_MODEL",
        "llama3.1:8b"
    )


settings = Settings()