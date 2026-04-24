import Utils

# ENDERECO_FATURAMENTO_VALIDO = (nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email)
ENDERECO_FATURAMENTO_VALIDO = [
    ("Eduardo", "Silva", "Empresa Teste", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Endereço alterado com sucesso."),
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Endereço alterado com sucesso."),
]

# ENDERECO_FATURAMENTO_INVALIDO = (nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, telefone, email, mensagem_erro)
ENDERECO_FATURAMENTO_INVALIDO = (
    ("", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Nome é um campo obrigatório."), # Teste sem informar nome
    ("Eduardo", "", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Sobrenome é um campo obrigatório."), # Teste sem informar sobrenome
    ("Eduardo", "Silva", "", "Brasil", "", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Endereço é um campo obrigatório."), # Teste sem informar endereco
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "", "Sao Paulo", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "CEP é um campo obrigatório."), # Teste sem informar cep
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "", "Sao Paulo", "11999999999", Utils.gerar_email_unico(), "Cidade é um campo obrigatório."), # Teste sem informar cidade
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "", Utils.gerar_email_unico(), "Telefone é um campo obrigatório."), # Teste sem informar telefone
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "11999999999", "", "Endereço de e-mail é um campo obrigatório."), # Teste sem informar email
)

# ENDERECO_ENTREGA_VALIDO = (nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro)
ENDERECO_ENTREGA_VALIDO = [
    ("Eduardo", "Silva", "Empresa Teste", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "Endereço alterado com sucesso.")
]

# ENDERECO_ENTREGA_INVALIDO = (nome, sobrenome, nome_empresa, pais, endereco, dados_extra, cep, cidade, estado, mensagem_erro)
ENDERECO_ENTREGA_INVALIDO = (
    ("", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "Nome é um campo obrigatório."), # Teste sem informar nome
    ("Eduardo", "", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "Sobrenome é um campo obrigatório."), # Teste sem informar sobrenome
    ("Eduardo", "Silva", "", "Brasil", "", "Apto 12", "01310-100", "Sao Paulo", "Sao Paulo", "Endereço é um campo obrigatório."), # Teste sem informar endereco
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "", "Sao Paulo", "Sao Paulo", "CEP é um campo obrigatório."), # Teste sem informar cep
    ("Eduardo", "Silva", "", "Brasil", "Rua das Flores, 100", "Apto 12", "01310-100", "", "Sao Paulo", "Cidade é um campo obrigatório.") # Teste sem informar cidade
)
