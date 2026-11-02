# language: pt

Funcionalidade: US003 - Meus Pedidos
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos pedidos realizados
    Para validar e acompanhar todos os dados dos itens solicitados pelo meu usuário

Contexto:
    Dado que eu esteja autenticado como cliente
    E que eu acesse a opção "Pedidos" no painel Minha Conta

@RN01
Cenário: Exibir pedidos pagos
    Dado que eu possua um pedido pago
    Então o pedido deve aparecer na lista de pedidos

@RN02
Cenário: Exibir Pedido, Data, Status e Total de cada pedido
    Dado que eu possua pedidos realizados
    Então cada pedido deve exibir o número do pedido
    E deve exibir a data
    E deve exibir o status
    E deve exibir o total

@RN03
Cenário: Disponibilizar a ação de visualizar em cada pedido
    Dado que eu possua pedidos realizados
    Então cada pedido deve possuir a opção de ação "Visualizar"

@RN04
Cenário: Exibir os detalhes completos do pedido
    Dado que eu possua pedidos realizados
    Quando eu clicar na ação "Visualizar" de um pedido
    Então deve ser carregada uma nova tela
    E devem ser exibidos Pedido, Data, Status e Nome do produto
    E devem ser exibidos Valor de cada produto e Valor total
    E devem ser exibidos Método de pagamento e Detalhes do endereço

@RN01
Cenário: Cliente sem pedidos
    Dado que eu não possua pedidos realizados
    Então deve ser exibida a informação de que nenhum pedido foi feito
