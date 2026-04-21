import Utils

# DETALHES_PESSOAIS_VALIDOS = (primeiro nome, ultimo nome, nome de exibição, email)
DETALHES_PESSOAIS_VALIDOS = [
    ("PrimeiroNomeTeste", "UltimoNomeTeste", "NomeExibiçãoTeste", Utils.gerar_email_unico()),
]

# DETALHES_PESSOAIS_INVALIDOS = (primeiro nome, ultimo nome, nome de exibição, email, mensagem_erro)
DETALHES_PESSOAIS_INVALIDOS = (
    ("", "UltimoNomeTeste", "NomeExibiçãoTeste", Utils.gerar_email_unico(), "Nome é um campo obrigatório."), # Teste sem informar primeiro nome
    ("PrimeiroNomeTeste", "", "NomeExibiçãoTeste", Utils.gerar_email_unico(), "Sobrenome é um campo obrigatório."), # Teste sem informar ultimo nome
    ("PrimeiroNomeTeste", "UltimoNomeTeste", "", Utils.gerar_email_unico(), "Nome de exibição é um campo obrigatório."), # Teste sem informar nome de exibição
    ("PrimeiroNomeTeste", "UltimoNomeTeste", "NomeExibiçãoTeste", "", "Endereço de e-mail é um campo obrigatório."), # Teste sem informar email
    ("PrimeiroNomeTeste", "UltimoNomeTeste", "NomeExibiçãoTeste", "emailInvalido@123433", "Informe um endereço de e-mail válido."),  # Teste informando e-mail invalido
    #("1234", "UltimoNomeTeste", "NomeExibiçãoTeste", Utils.gerar_email_unico(), "Informe um Nome válido."), # Teste informando primeiro nome invalido - Sempre retorna erro, caso de correção
    #("PrimeiroNomeTeste", "1234", "NomeExibiçãoTeste", Utils.gerar_email_unico(), "Informe um Sobrenome válido."), # Teste informando ultimo nome invalido - Sempre retorna erro, caso de correção
    #("PrimeiroNomeTeste", "UltimoNomeTeste", "1234", Utils.gerar_email_unico(), "Informe Nome de exibição válido."), # Teste informando nome de exibição invalido - Sempre retorna erro, caso de correção
)

#ATUALIZAÇÂO_SENHA_INVALIDO = (senha_atual, nova_senha, confirmar_nova_senha, mensagem de erro)
ATUALIZACAO_SENHA_INVALIDO = (
    ("", "SenhaNova002+!/;", "SenhaNova002+!/;", "Digite sua senha atual."), #Teste com senha atual em branco
    ("Senha01", "", "SenhaNova002+!/;", "As novas senhas não são iguais."), #Teste com nova senha em branco
    ("Senha01", "SenhaNova002+!/;", "", "Informe sua senha novamente."), #Teste com confirmar nova senha em branco
    ("Senha01", "", "", "Preencha todos os campos de senha."), # Teste com apenas a senha atual informada
    ("Senha01", "SenhaDivergente", "SenhaNova002+!/;", "As novas senhas não são iguais."), #Teste com senhas divergentes
    ("SenhaInvalida", "SenhaNova002+!/;", "SenhaNova002+!/;", "Sua senha atual está incorreta.") #Teste com senha atual incorreta
)
