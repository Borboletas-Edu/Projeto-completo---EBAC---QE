# language: pt

Funcionalidade: Casos de teste - US005 - Detalhes da conta
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos detalhes da conta
    Para editar e salvar dados atrelados ao meu usuário

Contexto:
    Dado que eu esteja autenticado como cliente
    E que eu acesse a opção "Detalhes da conta" no painel Minha Conta

@CT-US005-01 @feliz @automatizado @RN01
Cenário: CT-US005-01 - Atualizar informações pessoais com dados válidos
    Quando eu alterar nome, sobrenome, nome de exibição e e-mail com dados válidos
    E clicar em "Salvar alterações"
    Então as alterações devem ser salvas com mensagem de sucesso

@CT-US005-02 @feliz @automatizado @RN03
Cenário: CT-US005-02 - Alterar senha com todos os campos preenchidos
    Quando eu informar a senha atual correta, a nova senha e a confirmação idêntica
    E clicar em "Salvar alterações"
    Então a senha deve ser alterada com mensagem de sucesso

@CT-US005-03 @negativo @automatizado @RN01 @RN02 @tabela-de-decisao
Esquema do Cenário: CT-US005-03 - Campos obrigatórios em branco
    Quando eu deixar o campo <campo> vazio
    E clicar em "Salvar alterações"
    Então o salvamento deve ser impedido
    E deve ser exibida a mensagem "<campo> é um campo obrigatório."

    Exemplos:
        | campo              |
        | Nome               |
        | Sobrenome          |
        | Nome de exibição   |
        | Endereço de e-mail |

@CT-US005-04 @negativo @automatizado @RN04 @tabela-de-decisao
Esquema do Cenário: CT-US005-04 - Senha: preencher apenas alguns campos da seção
    Quando eu preencher somente <preenchido> na seção de senha
    E clicar em "Salvar alterações"
    Então a ação deve ser impedida
    E deve ser exibida a mensagem "Preencha todos os campos de senha."

    Exemplos:
        | preenchido                |
        | a senha atual             |
        | a nova senha              |
        | a confirmação da senha    |

@CT-US005-05 @negativo @automatizado @RN05 @particao-de-equivalencia
Cenário: CT-US005-05 - E-mail sem arroba
    Quando eu informar o e-mail "emailsemarroba"
    E clicar em "Salvar alterações"
    Então deve ser exibida a mensagem informando que o e-mail é inválido

@CT-US005-06 @alternativo @automatizado @RN03 @particao-de-equivalencia
Cenário: CT-US005-06 - Salvar sem preencher a seção de senha (opcional)
    Quando eu alterar apenas os dados pessoais
    E deixar toda a seção de senha vazia
    E clicar em "Salvar alterações"
    Então os dados devem ser salvos
    E a senha deve ser mantida
