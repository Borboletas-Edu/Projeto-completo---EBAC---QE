class MinhaContaPage:

    def __init__(self, page):
        self.page = page

#Acessar
    def acessar_minha_conta(self):
        self.page.goto('/minha-conta')

#login
    def realizar_login(self, usuario, senha):
        self.page.locator("#username").fill(usuario)
        self.page.locator("#password").fill(senha)
        self.page.get_by_role("button", name="Login").click()

    def realizar_cadastro(self, email, senha):
        self.page.locator("#reg_email").fill(email)
        self.page.locator("#reg_password").fill(senha)
        self.page.get_by_role("button", name="register").click()
        
        #Evita problemas de carregamento com click falso
        try:
            self.page.get_by_role("button", name="register").click(timeout=1000) 
        except:
            pass

    def recuperar_senha(self, email_recuperacao):
        self.page.get_by_role("link", name="Lost your password?").click()
        self.page.get_by_role("textbox", name="Nome de usuário ou e-mail").fill(email_recuperacao)
        self.page.get_by_role("button", name="Redefinir senha").click()

#Painel
    def logout_conta(self):
        self.page.get_by_role("link", name="Painel").click()
        self.page.get_by_role("link", name="Sair", exact=True).click()

#Pedidos
    def retorna_dados_pedido(self):
        # Retorna os dados do último pedido realizado para validação em teste.
        self.page.get_by_role("link", name=" Pedidos").click()
        self.page.get_by_role("link", name="Visualizar").first.click()

        tabela_detalhes = self.page.locator("table.woocommerce-table--order-details") # Define a tabela dos itens de referência.

        nomes_itens = tabela_detalhes.locator(
            "tbody tr.woocommerce-table__line-item td.product-name a"
        ).all_inner_texts()
        nomes_itens = [nome.strip() for nome in nomes_itens] # Faz a limpeza dos nomes para garantir nenhum espaço extra.

        total_pedido = tabela_detalhes.locator("tfoot tr", has_text="Total:").locator("td").inner_text().strip() # Retorna apenas a coluna do total.

        local_data = self.page.locator("mark.order-date")
        data_pedido = local_data.inner_text().strip() # Retorna o texto completo que possui a data para validar se a data está dentro do esperado.

        dados_pedido = {
            "nome_itens": nomes_itens,
            "data": data_pedido,
            "valor_total": total_pedido,
        }

        return dados_pedido

#Downloads

#Endereços
    def editar_endereco_faturamento(self):
        print("Em produção") # Campo obrigatório.
        print("Em produção") # Campo opcional.

    def editar_endereco_entrega(self):
        print("Em produção") # Campo obrigatório.
        print("Em produção") # Campo opcional.

#Detalhes da conta
    def acessar_detalhes_conta(self):
        self.page.get_by_role("link", name=" Detalhes da conta").click()

    def preencher_dados_pessoais(self, primeiro_nome, ultimo_nome, nome_exibicao, email): # Deixe as variáveis de senha vazias para não preenchê-las.
        self.page.locator("#account_first_name").fill(primeiro_nome)
        self.page.locator("#account_last_name").fill(ultimo_nome)
        self.page.locator("#account_display_name").fill(nome_exibicao)
        self.page.locator("#account_email").fill(email)

    def preencher_troca_senha(self, senha_atual, senha_nova, confirmar_senha_nova):
        self.page.locator("#password_current").fill(senha_atual)
        self.page.locator("#password_1").fill(senha_nova)
        self.page.locator("#password_2").fill(confirmar_senha_nova)
        
    def salvar_alteracoes_detalhes_conta(self):
        self.page.get_by_role("button", name="Save changes").click()

#Sair
    def botao_logout(self):
        self.page.get_by_role("link", name=" Sair").click()
