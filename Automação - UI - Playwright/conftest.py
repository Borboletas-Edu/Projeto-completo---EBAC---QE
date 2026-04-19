import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture
def pagina():
    with sync_playwright() as pw:
        navegador = pw.chromium.launch(headless=False)
        contexto = navegador.new_context(base_url="http://lojaebac.ebaconline.art.br")
        pagina = contexto.new_page()

        yield pagina

        contexto.close()
        navegador.close()
