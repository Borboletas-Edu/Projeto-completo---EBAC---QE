from dados.dados_produtos import PRODUTO_UNICO, VARIACOES_PRODUTO
from page_objects.page_minha_conta import MinhaContaPage
from page_objects.page_carrinho import CarrinhoPage
from page_objects.page_produto import ProdutoPage
from playwright.sync_api import expect
import pytest
import Utils

@pytest.mark.carrinho
class TesteCarrinho:
    
    @pytest.fixture(autouse=True)
    def setup(self, page):
        self.Produto = ProdutoPage(page)
        self.MinhaConta = MinhaContaPage(page)
        self.Carrinho = CarrinhoPage(page)
        self.MinhaConta.acessar_minha_conta()
        self.MinhaConta.realizar_cadastro(Utils.gerar_email_unico(), Utils.gerar_senha_unica()) #Garante reset do carrinho a cada teste
        self.nome_produto = "eos-v-neck-hoodie"

    @pytest.mark.parametrize("tamanho, cor, quantidade", PRODUTO_UNICO)    
    def teste_adicionar_produto_ao_carrinho(self, tamanho, cor, quantidade):
        self.Produto.acessar_produto_url(self.nome_produto) #Acessando o produto diretamente pela sua URL
        self.Produto.selecionar_tamanho_produto(tamanho)
        self.Produto.selecionar_cor_produto(cor)
        self.Produto.selecionar_quantidade_produto(quantidade)
        self.Produto.clicar_comprar()
        valor_produto = self.Produto.retorna_valor_produto()
        self.Produto.clicar_ir_para_carrinho()
        valor_total_produto = self.Carrinho.retornar_total_itens()
        dados = self.Carrinho.extrair_dados_carrinho()
        nome_esperado = self.nome_produto.replace("-", "").lower()
        nome_exibido = dados[0][0].replace("-", "").replace(" ", "").lower()
        assert nome_esperado in nome_exibido
        assert valor_produto == valor_total_produto

    @pytest.mark.parametrize("tamanho, cor, quantidade", PRODUTO_UNICO)    
    def teste_adicionar_e_remover_produto_do_carrinho(self, tamanho, cor, quantidade):
        self.Produto.acessar_produto_url(self.nome_produto) #Acessando o produto diretamente pela sua URL
        self.Produto.selecionar_tamanho_produto(tamanho)
        self.Produto.selecionar_cor_produto(cor)
        self.Produto.selecionar_quantidade_produto(quantidade)
        self.Produto.clicar_comprar()
        self.Produto.clicar_ir_para_carrinho()
        self.Carrinho.remover_item_carrinho()
        expect(self.Carrinho.page.get_by_text("Seu carrinho está vazio.")).to_be_visible()
        expect(self.Carrinho.page.get_by_text("removido")).to_be_visible()

    
    def teste_adicionar_produtos_variados_no_carrinho(self):
        for tamanho, cor, quantidade in VARIACOES_PRODUTO:
            self.Produto.acessar_produto_url(self.nome_produto) #Acessando o produto diretamente pela sua URL
            self.Produto.selecionar_tamanho_produto(tamanho)
            self.Produto.selecionar_cor_produto(cor)
            self.Produto.selecionar_quantidade_produto(quantidade)
            self.Produto.clicar_comprar()
        self.Produto.clicar_ir_para_carrinho()
        dados = self.Carrinho.extrair_dados_carrinho()

        #Any retorna True e Falso validando as condições, All obriga que todas as varaições sejam testadas
        assert (
            len(dados) == len(VARIACOES_PRODUTO)
            and all(
                any(
                    tamanho.lower() in nome_item.lower()
                    and cor.lower() in nome_item.lower()
                    and int(quantidade_item) == int(quantidade)
                    for nome_item, _, quantidade_item, _ in dados
                )
                for tamanho, cor, quantidade in VARIACOES_PRODUTO)), "Carrinho diferente do esperado para as variações de produto"
        
    def teste_validar_aplicacao_de_desconto_sobre_o_total_do_carrinho(self): #Deve utilizar o campo de busca
        print("Teste em produção") 
