import os

import pytest
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()


def obter_base_url():
    url = os.getenv("BASE_URL", "").strip().strip('"').strip("'").rstrip("/")
    if not url:
        raise ValueError("A variável BASE_URL não foi definida (.env ou variável de ambiente).")
    if not url.startswith(("http://", "https://")):
        url = f"http://{url}"
    return url

def pytest_collection_modifyitems(items):
    for item in items:
        if getattr(item, "originalname", None):
            item.name = item.originalname
        if "[" in item.nodeid:
            item._nodeid = item.nodeid.split("[", 1)[0]

@pytest.fixture
def page():
    with sync_playwright() as pw:
        navegador = pw.chromium.launch(headless=True)
        contexto = navegador.new_context(base_url=obter_base_url())
        page = contexto.new_page()

        yield page

        contexto.close()
        navegador.close()
