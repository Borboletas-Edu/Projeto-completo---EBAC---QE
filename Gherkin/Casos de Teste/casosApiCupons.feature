# language: pt

Funcionalidade: Casos de teste - Api de Cupons
    Como administrador da EBAC-SHOP
    Quero criar, listar, editar e deletar cupons
    Para ter controle total sobre a disponibilidade de cupons

Contexto:
    Dado que eu esteja autenticado na API com Basic Auth

@CT-US0003-01 @feliz @automatizado
Cenário: CT-US0003-01 - Cadastrar cupom com todos os campos válidos
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com os dados:
        | code        | amount | discount_type | description     |
        | <único>     | 10.00  | fixed_product | Cupom de teste  |
    Então o status da resposta deve ser 201
    E o corpo deve seguir o contrato do cupom
    E os dados retornados devem ser iguais aos enviados

@CT-US0003-02 @feliz @automatizado
Cenário: CT-US0003-02 - Listar todos os cupons
    Dado que existam cupons cadastrados
    Quando eu realizar uma requisição GET para "/wc/v3/coupons"
    Então o status da resposta deve ser 200
    E deve ser retornada uma lista de cupons
    E cada item deve seguir o contrato do cupom

@CT-US0003-03 @alternativo @automatizado @particao-de-equivalencia
Cenário: CT-US0003-03 - Buscar cupom por ID válido
    Dado que exista um cupom cadastrado
    Quando eu realizar uma requisição GET para "/wc/v3/coupons/{id}" com o ID desse cupom
    Então o status da resposta deve ser 200
    E o cupom retornado deve ter o ID informado
    E o corpo deve seguir o contrato do cupom

@CT-US0003-04 @negativo @automatizado @particao-de-equivalencia
Cenário: CT-US0003-04 - Buscar cupom por ID inexistente
    Quando eu realizar uma requisição GET para "/wc/v3/coupons/999999999"
    Então o status da resposta deve ser 404
    E o código de erro deve ser "woocommerce_rest_shop_coupon_invalid_id"

@CT-US0003-05 @negativo @automatizado @particao-de-equivalencia
Cenário: CT-US0003-05 - Cadastrar cupom sem código
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com o código vazio
    Então o status da resposta deve ser 400
    E o código de erro deve ser "woocommerce_rest_empty_coupon_code"

@CT-US0003-06 @negativo @automatizado @valor-limite
Cenário: CT-US0003-06 - Cadastrar cupom com valor negativo
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com o valor "-10.00"
    Então o status da resposta deve ser 400
    E o código de erro deve ser "coupon_invalid_amount"

@CT-US0003-07 @negativo @automatizado @particao-de-equivalencia
Cenário: CT-US0003-07 - Cadastrar cupom com código repetido
    Dado que já exista um cupom cadastrado com um determinado código
    Quando eu realizar uma nova requisição POST com o mesmo código
    Então o status da resposta deve ser 400
    E o código de erro deve ser "woocommerce_rest_coupon_code_already_exists"

@CT-US0003-08 @negativo @automatizado @tabela-de-decisao
Esquema do Cenário: CT-US0003-08 - Acessar a API sem autenticação
    Dado que eu não envie o cabeçalho Authorization
    Quando eu realizar uma requisição <metodo> para "/wc/v3/coupons"
    Então o status da resposta deve ser 401
    E o corpo de erro deve seguir o contrato

    Exemplos:
        | metodo |
        | GET    |
        | POST   |
