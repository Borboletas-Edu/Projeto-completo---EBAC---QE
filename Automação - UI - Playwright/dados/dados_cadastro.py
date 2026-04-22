import Utils

#CADASTRO_INVALIDO = [(email, senha, mensagem_alerta)]
CADASTRO_INVALIDO = [(Utils.gerar_email_unico(), "", "Digite a senha da conta."), #Teste sem informar uma senha
                     ("", Utils.gerar_senha_unica(), "Informe um endereço de e-mail válido."),  #Teste sem informar um email
                     ("", "", "Informe um endereço de e-mail válido."), #Teste sem informar email e senha
                     ("testeEmailInvalido@teste", Utils.gerar_senha_unica(), "Informe um endereço de e-mail válido.") #Teste informando email sem ".com"  ao final
                     ]