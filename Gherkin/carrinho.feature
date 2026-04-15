# language: pt

Funcionalidade: Carrinho de compras
    Como cliente da EBAC-SHOP
    Quero adicionar minhas compras no Carrinho
    Para validar todos itens selecionados antes de seguir para o pagamento

Contexto:
    Dado que eu esteja na página do produto

Cenário: Remover item do carrinho
    Dado que o carrinho possua 1 item
    Quando eu remover esse produto
    Então o carrinho deve ser atualizado
    E a mensagem "Seu carrinho está vazio" deve ser exibida

Cenário: Seguir para pagamento e retornar
    Dado que o carrinho possui itens
    Quando prosseguir para o pagamento
    E retornar ao carrinho
    Então os itens devem permanecer no carrinho

Cenário: Não permitir adicionar item indisponível ao carrinho
    Quando eu tentar adicionar um item indisponível ao carrinho
    Então o botão de adicionar deve ficar desabilitado

Esquema do Cenário: Adicinar itens ao carrinho
    Quando eu adicionar <quantidade> itens ao carrinho
    Então o carrinho deve conter <quantidae> item(ns)
    
    Exemplos:
        | quantidade |
        | 0          |
        | 1          |
        | 2          |
        | 3          |

Cenário: Adição de produtos com variações no carrinho
    Dado que eu esteja na página de um produto
    Quando adicionar o produto com cor <cor> e tamanho <tamanho>
    E adicionar novamente o produto com cor <cor2> e tamanho <tamanho2>
    Então o carrinho deve exibir <quantidade_itens> item(ns)
    E a quantidade total do produto deve ser <quantidade_total>

    Exemplos:
        | cor  | tamanho | cor2  | tamanho2 | quantidade_itens | quantidade_total |
        | azul | M       | azul  | M        | 1                | 2                |
        | azul | M       | azul  | G        | 2                | 2                |
        | azul | M       | verde | M        | 2                | 2                |

Esquema do Cenário: Aplicação de desconto conforme valor do carrinho
    Dado que o valor total do carrinho seja <valor>
    Quando eu visualizar o carrinho
    Então deve ser aplicado <desconto>% de desconto
    E o valor atualizado deve ser igual a <valor final>

    Exemplos:
        | valor | desconto | valor final |
        | 150   | 0        | 150         |
        | 200   | 10       | 180         |
        | 600   | 10       | 540         |
        | 601   | 15       | 510.85      |
        | 1000  | 15       | 850         |