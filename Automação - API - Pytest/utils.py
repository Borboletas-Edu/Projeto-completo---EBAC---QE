from dotenv import load_dotenv
from uuid import uuid4
import base64
import os

def gerar_codigo_cupom(prefixo="TesteEduGanhe10"):
    return f"{prefixo}-{uuid4().hex[:8]}"

def retorna_auth():
    
    load_dotenv()

    email = os.getenv("USER_EMAIL")
    senha = os.getenv("USER_SENHA")
    if not email or not senha:
        raise ValueError("Defina USER_EMAIL e USER_SENHA no .env para autenticação Basic.")

    # monta o basic auth
    credentials = f"{email}:{senha}"
    encoded = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {encoded}"
    }
    return headers
