from page_objects.page_minha_conta import MinhaContaPage
from playwright.sync_api  import expect
from dados.dados_enderecos import *
import pytest
import Utils

@pytest.mark.endereco
class TesteEndereco():

    @pytest.fixture(autouse=True)
    def setup(self, page):
        self.MinhaConta = MinhaContaPage(page)
        self.MinhaConta.acessar_minha_conta()
        self.MinhaConta.realizar_cadastro(Utils.gerar_email_unico(), Utils.gerar_senha_unica())
        self.MinhaConta.acessar_endereco()

    @pytest.mark.parametrize("nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email, mensagem_erro", ENDERECO_FATURAMENTO_VALIDO)
    def teste_realizar_alteracao_endereco_faturamento_dados_validos(self, nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email, mensagem_erro):
        self.MinhaConta.editar_endereco_faturamento(nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email)
        self.MinhaConta.clicar_salvar_enderecos()
        mensagem_alerta = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
        expect(mensagem_alerta).to_contain_text(mensagem_erro)

    @pytest.mark.parametrize("nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email, mensagem_erro", ENDERECO_FATURAMENTO_INVALIDO)
    def teste_realizar_alteracao_endereco_faturamento_dados_invalidos(self,nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email, mensagem_erro):
        self.MinhaConta.editar_endereco_faturamento(nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email)
        self.MinhaConta.clicar_salvar_enderecos()
        mensagem_alerta = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
        expect(mensagem_alerta).to_contain_text(mensagem_erro)

    @pytest.mark.parametrize("nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro", ENDERECO_ENTREGA_VALIDO)
    def teste_realizar_alteracao_endereco_entrega_dados_validos(self, nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro):
        self.MinhaConta.editar_endereco_entrega(nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado)
        self.MinhaConta.clicar_salvar_enderecos()
        mensagem_alerta = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
        expect(mensagem_alerta).to_contain_text(mensagem_erro)

    @pytest.mark.parametrize("nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro", ENDERECO_ENTREGA_INVALIDO)
    def teste_realizar_alteracao_endereco_entrega_dados_invalidos(self, nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro):
        self.MinhaConta.editar_endereco_entrega(nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado)
        self.MinhaConta.clicar_salvar_enderecos()
        mensagem_alerta = Utils.retornar_mensagem_alerta(self.MinhaConta.page)
        expect(mensagem_alerta).to_contain_text(mensagem_erro)
