from dados.dados_login import LOGIN_VALIDO, LOGIN_INVALIDO
from page_objects.page_minha_conta import MinhaContaPage
from playwright.sync_api import expect
import pytest
import Utils

@pytest.mark.login
class TesteLogin:

    @pytest.fixture(autouse=True)
    def setup(self, page): #Sempre acessa a página "Minha conta" antes de cada teste
        self.MinhaConta = MinhaContaPage(page)
        self.MinhaConta.acessar_minha_conta()

    def teste_login_valido(self):
        self.MinhaConta.realizar_login(LOGIN_VALIDO['email'], LOGIN_VALIDO["senha"])
        detalhes_conta = self.MinhaConta.page.get_by_role("link", name="Painel")
        expect(detalhes_conta).to_be_visible()

    @pytest.mark.parametrize("email, senha, mensagem_alerta", LOGIN_INVALIDO)
    def teste_login_invalido(self, email, senha, mensagem_alerta):
        self.MinhaConta.realizar_login(email, senha)
        mensagem_erro = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
        print(f"mensagem_erro: {mensagem_erro}")
        print(f"mensagem_alerta: {mensagem_alerta}")
        expect(mensagem_erro).to_contain_text(mensagem_alerta)
        
    def teste_bloqueio_login(self): 
        for c in range(3):
            self.MinhaConta.realizar_login("admin", "senhaErrada")
            mensagem_erro = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
            expect(mensagem_erro).to_contain_text("A senha informada para o usuário admin está incorreta.")
        expect(mensagem_erro).to_contain_text("Acesso para o usuario admin bloqueado por 15 minutos.")
