import pytest
from dados.dados_login import LOGIN_VALIDO, LOGIN_INVALIDO
from page_objects.minha_conta_page import MinhaContaPage

@pytest.mark.login
class TesteLogin:

    @pytest.fixture(autouse=True)
    def setup(self, page): #Sempre acessa a página "Minha conta" antes de cada teste
        self.page = MinhaContaPage(page)
        self.page.acessar_minha_conta()

    @pytest.mark.parametrize("email, senha, mensagem_alerta", LOGIN_INVALIDO)
    def teste_login_invalido(self, email, senha, mensagem_alerta):
        self.page.realizar_login(email, senha)
        assert mensagem_alerta in self.page.retornar_mensagem_alerta #Testar
        
    @pytest.mark.parametrize("email, senha, mensagem_alerta", LOGIN_VALIDO)
    def teste_login_valido(self):
        self.page.realizar_login("admin", "admin123")
        self.page.retornar_mensagem_alerta()
        assert "" in self.page.retornar_mensagem_alerta #Ajustar colocando validação

    def teste_bloqueio_login(self):
        for c in range(3):
            self.page.realizar_login("admin", "senhaErrada")
        assert "" in self.page.retornar_mensagem_alerta #Ajustar colocando validação