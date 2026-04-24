import pytest
from playwright.sync_api import sync_playwright

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
        contexto = navegador.new_context(base_url="http://lojaebac.ebaconline.art.br")
        page = contexto.new_page()

        yield page

        contexto.close()
        navegador.close()
