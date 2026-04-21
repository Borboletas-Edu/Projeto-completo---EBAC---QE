from dados.dados_detalhes_conta import DETALHES_PESSOAIS_VALIDOS, DETALHES_PESSOAIS_INVALIDOS, ATUALIZACAO_SENHA_INVALIDO
from page_objects.minha_conta_page import MinhaContaPage
from playwright.sync_api import expect
import pytest
import Utils

@pytest.mark.detalhesConta
class TesteDetalhesConta:
    
    @pytest.fixture(autouse=True)
    def setup(self, page):
        #Instanciando
        self.MinhaConta = MinhaContaPage(page)
        
        #Criando dados dinamicos para os testes
        self.email = Utils.gerar_email_unico()
        self.senha = Utils.gerar_senha_unica()

        #Métodos que devem ser executados antes de cada teste
        self.MinhaConta.acessar_minha_conta()
        self.MinhaConta.realizar_cadastro(self.email, self.senha)
        self.MinhaConta.acessar_detalhes_conta()

#Sessão - Detalhes da conta
    @pytest.mark.parametrize("primeiro_nome, ultimo_nome, nome_exibicao, email", DETALHES_PESSOAIS_VALIDOS)
    def teste_editar_conta_dados_validos(self, primeiro_nome, ultimo_nome, nome_exibicao, email):
        #Validando edição
        self.MinhaConta.preencher_dados_pessoais(primeiro_nome, ultimo_nome, nome_exibicao, email)
        self.MinhaConta.salvar_alteracoes_detalhes_conta()
        expect(self.MinhaConta.retornar_mensagem_alerta()).to_contain_text("Detalhes da conta modificados com sucesso.")
        
        #Validando se os novos dados realente foram salvos
        self.MinhaConta.logout_conta()
        self.MinhaConta.realizar_login(email, self.senha) #Realiza o login com o email alterado para validar aplicação
        detalhes_conta = self.MinhaConta.page.get_by_role("link", name="Painel")
        expect(detalhes_conta).to_be_visible()

    def teste_editar_conta_dados_invalidos(self):
        for primeiro_nome, ultimo_nome, nome_exibicao, email, mensagem_erro in DETALHES_PESSOAIS_INVALIDOS:
            self.MinhaConta.page.reload(wait_until="domcontentloaded")
            expect(self.MinhaConta.page.get_by_role("textbox", name="First name *")).to_be_visible(timeout=10000)
            self.MinhaConta.preencher_dados_pessoais(primeiro_nome, ultimo_nome, nome_exibicao, email)
            self.MinhaConta.salvar_alteracoes_detalhes_conta()
            alerta = self.MinhaConta.retornar_mensagem_alerta()
            expect(alerta).to_be_visible()
            expect(alerta).to_contain_text(mensagem_erro)

    @pytest.mark.parametrize("primeiro_nome, ultimo_nome, nome_exibicao, email", DETALHES_PESSOAIS_VALIDOS)
    def teste_atualizar_senha_dados_validos(self, primeiro_nome, ultimo_nome, nome_exibicao, email):
        
        #Prenche dados obrigatorios
        self.MinhaConta.preencher_dados_pessoais(primeiro_nome, ultimo_nome, nome_exibicao, self.email)
        
        #Defini uma senha nova e testa o fluxo
        senha_nova = "testeSenhaNova"
        self.MinhaConta.preencher_troca_senha(self.senha, senha_nova, senha_nova)
        self.MinhaConta.salvar_alteracoes_detalhes_conta()
        expect(self.MinhaConta.retornar_mensagem_alerta()).to_contain_text("Detalhes da conta modificados com sucesso.")
        self.MinhaConta.logout_conta()
        self.MinhaConta.realizar_login(self.email, senha_nova)
        detalhes_conta = self.MinhaConta.page.get_by_role("link", name="Painel")
        expect(detalhes_conta).to_be_visible()

    @pytest.mark.parametrize("primeiro_nome, ultimo_nome, nome_exibicao, email", DETALHES_PESSOAIS_VALIDOS)
    def teste_atualizar_senha_dados_invalido(self, primeiro_nome, ultimo_nome, nome_exibicao, email):
        #Define os dados para atualizações de senha e valida os tratamentos para os erros
        for senha_atual, senha_nova, confirmar_senha_nova, mensagem_alerta in ATUALIZACAO_SENHA_INVALIDO:
            #Prenche dados obrigatorios
            self.MinhaConta.preencher_dados_pessoais(primeiro_nome, ultimo_nome, nome_exibicao, self.email)
            self.MinhaConta.preencher_troca_senha(senha_atual, senha_nova, confirmar_senha_nova)
            self.MinhaConta.salvar_alteracoes_detalhes_conta()
            expect(self.MinhaConta.retornar_mensagem_alerta()).to_contain_text(mensagem_alerta)
            self.MinhaConta.page.reload()

#Sessão - Endereços
    """ def teste_editar_dados_envio_validos(self):
        print("em produção")

    def teste_editar_dados_envio_invalidos(self):
        print("em produção")
"""
