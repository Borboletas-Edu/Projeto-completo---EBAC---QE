

class ProdutoPage:

    def __init__(self, page):
        self.page = page

 #Acessar produto   
    def acessar_catalogo_produtos(self):
        self.page.goto("produtos")

    def pesquisar_e_selecionar_produto(self, nome_produto): #Utiliza a barra de pesquisa para selecionar um produto pelo nome
        self.page.get_by_role("textbox", name="Enter your search").fill(nome_produto)
        self.page.get_by_role("button", name="Search ").click()
        self.page.get_by_role("listitem").filter(has_text=nome_produto).click()

    def selecionar_produto_bloco(self): #Permite selecionar um produto do bloco de itens
        self.page.locator(".product-block.grid").first.click()
        
    def acessar_produto_url(self, nome_produto):
        self.page.goto(f"/product/{nome_produto}")
        self.page.locator("form.variations_form").wait_for(state="visible")
#ações na pagina do produto

    def retorna_valor_produto(self):
        valor_produto = self.page.locator(".price bdi").inner_text()
        return valor_produto

    def selecionar_tamanho_produto(self, tamanho_produto):
        self.page.locator(f'[data-attribute_name*="size"] [data-value="{tamanho_produto}"]').click()
    
    def selecionar_cor_produto(self, cor_produto):
        self.page.locator(f'[data-attribute_name*="color"] [data-value="{cor_produto}"]').click()

    def selecionar_quantidade_produto(self, quantidade_produto):
        self.page.get_by_role("spinbutton", name="Qty").fill(quantidade_produto)

    def clicar_comprar(self):
        self.page.get_by_role("button", name="Comprar").click()
    
    def clicar_ir_para_carrinho(self):
        self.page.get_by_role("link", name="Ver carrinho").click()
