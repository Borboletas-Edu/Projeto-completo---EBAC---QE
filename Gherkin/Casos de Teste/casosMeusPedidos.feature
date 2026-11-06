# language: pt

Funcionalidade: Casos de teste - US003 - Meus Pedidos
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos pedidos realizados
    Para validar e acompanhar todos os dados dos itens solicitados pelo meu usuário

Contexto:
    Dado que eu esteja autenticado como cliente

@CT-US003-01 @feliz @manual @RN01
Cenário: CT-US003-01 - Pedido pago aparece na lista
    Dado que eu possua um pedido pago
    Quando eu acessar Minha Conta 
    E clicar em "Pedidos"
    Então o pedido pago deve ser listado

@CT-US003-02 @feliz @manual @RN02
Cenário: CT-US003-02 - Colunas Pedido, Data, Status e Total
    Dado que eu possua pedidos realizados
    Quando eu acessar Minha Conta 
    E clicar em "Pedidos"
    Então cada pedido deve exibir número, data, status e total

@CT-US003-03 @alternativo @manual @RN03
Cenário: CT-US003-03 - Ação de visualizar disponível em cada pedido
    Dado que eu possua pedidos realizados
    Quando eu acessar Minha Conta 
    E clicar em "Pedidos"
    Então cada pedido deve possuir a opção de visualizar

@CT-US003-04 @alternativo @manual @RN04
Cenário: CT-US003-04 - Detalhes completos do pedido
    Dado que eu possua pedidos realizados
    Quando eu clicar em "Visualizar" em um pedido
    Então deve ser carregada uma nova tela
    E devem ser exibidos Pedido, Data, Status, Nome do produto, Valor de cada produto e Valor total
    E devem ser exibidos Método de pagamento e Detalhes do endereço

@CT-US003-05 @negativo @manual @RN01 @particao-de-equivalencia
Cenário: CT-US003-05 - Cliente sem pedidos
    Dado que eu não possua pedidos realizados
    Quando eu acessar Minha Conta
    E clicar em "Pedidos"
    Então deve ser exibida a informação de que nenhum pedido foi feito

@CT-US003-06 @negativo @manual @RN04 @particao-de-equivalencia
Cenário: CT-US003-06 - Acessar pedido de outro cliente
    Dado que exista um pedido que pertença a outro cliente
    Quando eu informar na URL o número desse pedido
    Então o pedido não deve ser exibido
    E o acesso deve ser negado
