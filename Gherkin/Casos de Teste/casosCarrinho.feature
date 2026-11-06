# language: pt

Funcionalidade: Casos de teste - Carrinho de compras
    Como cliente da EBAC-SHOP
    Quero adicionar minhas compras no Carrinho
    Para validar todos itens selecionados antes de seguir para o pagamento

@CT-US0001-01 @feliz @automatizado
Cenário: CT-US0001-01 - Adicionar um produto ao carrinho
    Dado que o produto esteja disponível em estoque
    Quando eu acessar a página do produto
    E escolher a cor e o tamanho
    E clicar em "Comprar"
    E acessar o carrinho
    Então o produto deve ser exibido no carrinho com quantidade 1
    E o subtotal deve estar correto

@CT-US0001-02 @feliz @automatizado
Cenário: CT-US0001-02 - Adicionar vários produtos diferentes ao carrinho
    Dado que existam produtos disponíveis em estoque
    Quando eu adicionar o produto A ao carrinho
    E adicionar o produto B ao carrinho
    E acessar o carrinho
    Então o carrinho deve exibir os 2 produtos
    E o total deve ser a soma dos subtotais

@CT-US0001-03 @alternativo @automatizado
Cenário: CT-US0001-03 - Remover item e restaurar pelo link "Desfazer"
    Dado que o carrinho possua 1 item
    Quando eu clicar no ícone de remover
    E clicar em "Desfazer"
    Então o item deve voltar ao carrinho

@CT-US0001-04 @negativo @manual @valor-limite
Esquema do Cenário: CT-US0001-04 - Limite de itens do mesmo produto (10)
    Dado que o produto esteja disponível com estoque superior a 10 unidades
    Quando eu informar a quantidade <quantidade> no carrinho
    E atualizar o carrinho
    Então o resultado deve ser "<resultado>"

    Exemplos:
        | quantidade | resultado                                         |
        | 9          | quantidade aceita                                 |
        | 10         | quantidade aceita                                 |
        | 11         | quantidade bloqueada com mensagem de limite       |

@CT-US0001-05 @negativo @manual @valor-limite
Esquema do Cenário: CT-US0001-05 - Limite de valor total do carrinho (R$ 990,00)
    Dado que o carrinho possua o valor total de R$ <valor>
    Quando eu tentar concluir a compra
    Então o resultado deve ser "<resultado>"

    Exemplos:
        | valor  | resultado                                      |
        | 989,99 | valor aceito                                   |
        | 990,00 | valor aceito                                   |
        | 990,01 | compra bloqueada com mensagem de limite        |

@CT-US0001-06 @alternativo @manual @particao-de-equivalencia @valor-limite
Esquema do Cenário: CT-US0001-06 - Desconto conforme faixa de valor do carrinho
    Dado que o carrinho possua o valor total de R$ <valor>
    Quando eu visualizar o carrinho
    Então deve ser aplicado <desconto>% de desconto

    Exemplos:
        | valor  | desconto |
        | 199,99 | 0        |
        | 200,00 | 10       |
        | 600,00 | 10       |
        | 601,00 | 15       |
        | 990,00 | 15       |
