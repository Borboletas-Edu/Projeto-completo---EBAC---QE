# language: pt

Funcionalidade: US002 - Painel Minha Conta
    Como cliente da EBAC-SHOP
    Quero possuir uma tela reservada para mim quando realizar o cadastro
    Para ter controle de dados e pedidos referentes ao meu usuário

@RN01
Cenário: Exibir mensagem de boas-vindas
    Dado que eu esteja autenticado como cliente
    Quando eu acessar a página "Minha Conta"
    Então deve ser exibida uma mensagem de boas-vindas com o meu nome de usuário

@RN02
Cenário: Realizar logout da conta
    Dado que eu esteja autenticado como cliente
    Quando eu clicar na opção "Sair"
    Então a minha sessão deve ser encerrada
    E devo ser direcionado para a tela de login

@RN03
Cenário: Disponibilizar o painel somente com login ativo
    Dado que eu esteja autenticado como cliente
    Quando eu acessar a página "Minha Conta"
    Então o painel deve ser exibido com as opções Pedidos, Downloads, Endereços, Detalhes da conta e Sair

@RN04
Cenário: Exibir tela de login ou registro sem login ativo
    Dado que eu não esteja autenticado
    Quando eu acessar a página "Minha Conta"
    Então devem ser exibidos os formulários de login e de registro
    E o painel não deve ser exibido

@RN04
Cenário: Bloquear o painel após o logout
    Dado que eu tenha realizado o logout
    Quando eu voltar para a página "Minha Conta" pelo histórico do navegador
    Então o painel não deve ser exibido para uma sessão encerrada
