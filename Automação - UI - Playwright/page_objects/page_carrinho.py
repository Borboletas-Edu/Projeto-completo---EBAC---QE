class CarrinhoPage:

    def __init__(self, page):
        self.page = page

    def extrair_dados_carrinho(self): #retorna nome_produto, valor, quantidade e valor total de cada um dos itens adicionados no carrinho
        linhas = self.page.locator("tr.cart_item")
        resultados = []

        for i in range(linhas.count()):
            linha = linhas.nth(i)

            nome_produto = linha.locator(".product-name a").inner_text().strip()

            valor = linha.locator(".product-price .amount").inner_text().strip()

            quantidade = linha.locator(".product-quantity input.qty").input_value()

            valor_total = linha.locator(".product-subtotal .amount").inner_text().strip()

            resultados.append(
                (nome_produto, valor, quantidade, valor_total)
            )

        return resultados


    def remover_item_carrinho(self):
        self.page.locator("tr.cart_item .product-remove a.remove").first.click()
    
    def clicar_concluir_compra(self):
        self.page.get_by_role("link", name="Concluir compra").click()

    def retornar_total_itens(self):
        total_itens = self.page.get_by_role("cell", name="R$").nth(3).inner_text().strip()
        return total_itens
    
    def aplicar_coupon(self, coupon):
        self.page.get_by_role("textbox", name="Coupon:").fill(coupon)
        self.page.get_by_role("button", name="Apply Coupon").click()