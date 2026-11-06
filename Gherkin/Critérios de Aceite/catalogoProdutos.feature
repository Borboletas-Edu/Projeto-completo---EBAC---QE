# language: pt

Funcionalidade: US001 - Catálogo de produtos
    Como cliente da EBAC-SHOP
    Quero visualizar um catálogo de produtos
    Para poder escolher um ou mais itens e seguir para o pagamento

Contexto:
    Dado que eu acesse a página de produtos da loja EBAC

@RN01
Cenário: Exibir imagem, nome, valor e avaliação em cada item
    Então cada item do catálogo deve exibir uma imagem
    E deve exibir o nome do produto
    E deve exibir o valor do produto
    E deve exibir a avaliação do produto

@RN02
Cenário: Exibir opções ao posicionar o mouse na visualização em grade
    Dado que a visualização esteja em grade
    Quando eu posicionar o mouse sobre um produto
    Então devem ser exibidas as opções salvar, comparar, ver opções e ver rapidamente
    E cada opção deve permitir interação

@RN03
Cenário: Exibir opções na visualização em lista
    Dado que a visualização esteja em lista
    Então devem ser exibidas as opções salvar, comparar, ver opções e ver rapidamente
    E cada opção deve permitir interação

@RN04
Esquema do Cenário: Ordenar os produtos
    Quando eu ordenar os produtos por <ordenacao>
    Então a lista deve ser reordenada conforme <criterio>

    Exemplos:
        | ordenacao                | criterio                     |
        | popularidade             | produtos mais populares      |
        | média de classificação   | maior média de avaliações    |
        | mais recente             | data de cadastro decrescente |
        | menor preço              | preço crescente              |
        | maior preço              | preço decrescente            |

@RN05
Cenário: Alternar entre visualização em grade e em lista
    Dado que a visualização esteja em grade
    Quando eu alternar para a visualização em lista
    Então os produtos devem ser exibidos em lista
    Quando eu alternar para a visualização em grade
    Então os produtos devem ser exibidos em grade
