# language: pt

Funcionalidade: Casos de teste - US002 - Painel Minha Conta
    Como cliente da EBAC-SHOP
    Quero possuir uma tela reservada para mim quando realizar o cadastro
    Para ter controle de dados e pedidos referentes ao meu usuário

@CT-US002-01 @feliz @manual @RN01
Cenário: CT-US002-01 - Exibir mensagem de boas-vindas
    Dado que eu esteja autenticado como cliente
    Quando eu acessar a página "Minha Conta"
    Então deve ser exibida uma mensagem de boas-vindas com o meu nome de usuário

@CT-US002-02 @feliz @manual @RN02 @transicao-de-estado
Cenário: CT-US002-02 - Realizar logout
    Dado que eu esteja autenticado como cliente
    Quando eu clicar em "Sair"
    Então a minha sessão deve ser encerrada
    E a tela de login deve ser exibida

@CT-US002-03 @alternativo @manual @RN03 @particao-de-equivalencia
Cenário: CT-US002-03 - Painel disponível com login ativo
    Dado que eu esteja autenticado como cliente
    Quando eu acessar a página "Minha Conta"
    Então o painel deve exibir Pedidos, Downloads, Endereços, Detalhes da conta e Sair

@CT-US002-04 @negativo @manual @RN04 @particao-de-equivalencia
Cenário: CT-US002-04 - Acessar o painel sem login ativo
    Dado que eu não esteja autenticado
    Quando eu acessar diretamente a página "Minha Conta"
    Então devem ser exibidas as telas de login e de registro
    E o painel não deve ser exibido

@CT-US002-05 @negativo @manual @RN03 @RN04 @transicao-de-estado
Cenário: CT-US002-05 - Voltar ao painel após o logout pelo histórico do navegador
    Dado que eu tenha acabado de clicar em "Sair"
    Quando eu usar o botão voltar do navegador
    Então o painel não deve ser exibido para a sessão encerrada
