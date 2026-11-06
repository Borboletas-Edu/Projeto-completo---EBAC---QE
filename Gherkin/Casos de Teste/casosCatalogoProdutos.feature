# language: pt

Funcionalidade: Casos de teste - US001 - Catálogo de produtos
    Como cliente da EBAC-SHOP
    Quero visualizar um catálogo de produtos
    Para poder escolher um ou mais itens e seguir para o pagamento

Contexto:
    Dado que eu acesse a página de produtos da loja EBAC

@CT-US001-01 @feliz @manual @RN01
Cenário: CT-US001-01 - Exibir imagem, nome, valor e avaliação de cada item
    Dado que a loja possua produtos cadastrados
    Então cada item deve exibir imagem, nome, valor e avaliação

@CT-US001-02 @feliz @manual @RN02
Cenário: CT-US001-02 - Opções ao passar o mouse na visualização em grade
    Dado que a visualização esteja em grade
    Quando eu posicionar o mouse sobre um produto
    E interagir com cada opção
    Então devem ser exibidas as opções salvar, comparar, ver opções e ver rapidamente
    E todas devem permitir interação

@CT-US001-03 @alternativo @manual @RN03
Cenário: CT-US001-03 - Opções na visualização em lista
    Quando eu alternar para a visualização em lista
    E interagir com cada opção
    Então devem ser exibidas as opções salvar, comparar, ver opções e ver rapidamente
    E todas devem permitir interação

@CT-US001-04 @alternativo @manual @RN04 @particao-de-equivalencia
Esquema do Cenário: CT-US001-04 - Ordenação dos produtos
    Dado que existam produtos com preços e avaliações distintos
    Quando eu ordenar por <ordenacao>
    Então a lista deve ser reordenada conforme <ordenacao>

    Exemplos:
        | ordenacao              |
        | popularidade           |
        | média de classificação |
        | mais recente           |
        | menor preço            |
        | maior preço            |

@CT-US001-05 @alternativo @manual @RN05 @transicao-de-estado
Cenário: CT-US001-05 - Alternar entre visualização em grade e em lista
    Dado que a página de produtos esteja aberta
    Quando eu alternar para a visualização em lista
    Então os produtos devem ser exibidos em lista
    Quando eu alternar para a visualização em grade
    Então os produtos devem ser exibidos em grade

@CT-US001-06 @negativo @manual @RN04 @valor-limite
Cenário: CT-US001-06 - Ordenação com um único produto na lista
    Dado que a categoria possua apenas 1 produto
    Quando eu aplicar cada critério de ordenação
    Então a página não deve apresentar erro
    E o produto deve continuar sendo exibido
