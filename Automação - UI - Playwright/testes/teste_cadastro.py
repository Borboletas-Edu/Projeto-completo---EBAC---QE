from page_objects.page_minha_conta import MinhaContaPage
from dados.dados_cadastro import CADASTRO_INVALIDO
from playwright.sync_api import expect
import pytest
import Utils

@pytest.mark.cadastro
class TesteCadastro:
    
    @pytest.fixture(autouse=True)
    def setup(self, page):
        #Acessando página
        self.MinhaConta = MinhaContaPage(page)
        self.MinhaConta.acessar_minha_conta()

        #Definindo dados dinamicos
        self.email = Utils.gerar_email_unico()
        self.senha = Utils.gerar_senha_unica()

    def teste_cadastro_valido(self):
        self.MinhaConta.realizar_cadastro(self.email, self.senha)
        detalhes_conta = self.MinhaConta.page.get_by_role("link", name="Painel")
        expect(detalhes_conta).to_be_visible()

    @pytest.mark.parametrize("email, senha, mensagem_alerta", CADASTRO_INVALIDO)
    def teste_cadastro_dados_invalidos(self, email, senha, mensagem_alerta):
        self.MinhaConta.realizar_cadastro(email, senha)
        expect(Utils.retornar_mensagem_alerta(self.MinhaConta.page)).to_contain_text(mensagem_alerta)

    def teste_cadastro_dados_repetidos(self):
        self.MinhaConta.realizar_cadastro(self.email, self.senha)
        self.MinhaConta.logout_conta()
        self.MinhaConta.realizar_cadastro(self.email, self.senha)
        expect(Utils.retornar_mensagem_alerta(self.MinhaConta.page)).to_contain_text("Uma conta já está registrada com seu endereço de e-mail.")
