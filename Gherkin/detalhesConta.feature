# language: pt

Funcionalidade: US005 - Detalhes da conta
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos detalhes da conta
    Para editar e salvar dados atrelados ao meu usuário

Contexto:
    Dado que eu esteja autenticado como cliente
    E que eu acesse a opção "Detalhes da conta" no painel Minha Conta

@RN01 @RN02
Esquema do Cenário: Validar campos obrigatórios
    Quando eu deixar o campo <campo> vazio
    E clicar em "Salvar alterações"
    Então o sistema deve impedir o salvamento
    E deve exibir a mensagem "<campo> é um campo obrigatório."

    Exemplos:
        | campo              |
        | Nome               |
        | Sobrenome          |
        | Nome de exibição   |
        | Endereço de e-mail |

@RN01
Cenário: Atualizar informações pessoais com dados válidos
    Quando eu preencher nome, sobrenome, nome de exibição e e-mail válidos
    E clicar em "Salvar alterações"
    Então as alterações devem ser salvas

@RN03
Cenário: Salvar sem preencher a seção de alteração de senha
    Quando eu preencher os campos obrigatórios com dados válidos
    E deixar todos os campos de alteração de senha vazios
    E clicar em "Salvar alterações"
    Então as alterações devem ser salvas
    E a senha não deve ser alterada

@RN03 @RN04
Cenário: Alterar a senha com todos os campos preenchidos
    Quando eu informar a senha atual correta
    E informar a nova senha e a confirmação idênticas
    E clicar em "Salvar alterações"
    Então a senha deve ser alterada

@RN04
Esquema do Cenário: Exigir todos os campos de senha quando algum for preenchido
    Quando eu preencher somente o campo <preenchido> da seção de senha
    E clicar em "Salvar alterações"
    Então o sistema deve impedir a ação
    E deve exibir a mensagem "Preencha todos os campos de senha."

    Exemplos:
        | preenchido          |
        | senha atual         |
        | nova senha          |
        | confirmação da nova senha |

@RN05
Esquema do Cenário: Validar o formato do e-mail
    Quando eu informar o e-mail "<email>"
    E clicar em "Salvar alterações"
    Então deve ser exibida a mensagem de e-mail inválido

    Exemplos:
        | email            |
        | emailsemarroba   |
        | teste.com        |
