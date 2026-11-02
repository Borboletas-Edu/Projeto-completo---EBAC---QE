import os

from dotenv import load_dotenv

load_dotenv()

USUARIO = os.getenv("UI_USUARIO", "").strip()
SENHA = os.getenv("UI_SENHA", "")

if not USUARIO or not SENHA:
    raise ValueError("Defina UI_USUARIO e UI_SENHA (.env ou variável de ambiente) para os testes de login.")

LOGIN_VALIDO = {"email": USUARIO, "senha": SENHA}

MSG_USUARIO_NAO_REGISTRADO = "O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."

LOGIN_INVALIDO = [(USUARIO, "senhaErrada", f"A senha informada para o usuário {USUARIO} está incorreta."),
                  ("userErrado", "admin123", MSG_USUARIO_NAO_REGISTRADO),
                  ("userErrado", "senhaErrada", MSG_USUARIO_NAO_REGISTRADO),
                  ("", "senhaErrada", "Nome de usuário é obrigatório."),
                  (USUARIO, "", "O campo da senha está vazio"),
                  ("", "", "Nome de usuário é obrigatório."),
                ]
