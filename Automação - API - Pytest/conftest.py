from dotenv import load_dotenv
import os
import pytest

load_dotenv()

@pytest.fixture
def base_url():
    url = os.getenv("BASE_URL", "").strip().strip('"').strip("'").rstrip("/")
    if not url:
        raise ValueError("A variável BASE_URL não foi definida em .env")
    if not url.startswith(("http://", "https://")):
        # Se não vier esquema no .env, assume HTTP (conforme doc da API usada no projeto).
        url = f"http://{url}"
    return url
