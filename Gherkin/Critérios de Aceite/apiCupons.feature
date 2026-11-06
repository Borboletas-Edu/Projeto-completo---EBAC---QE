# language: pt

Funcionalidade: Api de Cupons
    Como administrador da EBAC-SHOP
    Quero criar, listar, editar e deletar cupons
    Para ter controle total sobre a disponibilidade de cupons

Contexto:
    Dado que eu esteja autenticado como admin

Esquema do Cenário: Acesso não autorizado à API de cupons
    Dado que eu não esteja autenticado
    Quando eu realizar uma requisição <metodo> para <url>
    Então o status da resposta deve ser 401
    E deve retornar uma mensagem de erro informando que a autenticação é obrigatória

    Exemplos:
        | metodo | url              |
        | GET    | /wc/v3/coupons   |
        | POST   | /wc/v3/coupons   |
        | GET    | /wc/v3/coupons/1 |
        | PUT    | /wc/v3/coupons/1 |
        | PATCH  | /wc/v3/coupons/1 |
        | DELETE | /wc/v3/coupons/1 |

Cenário: Cadastrar cupom com sucesso
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com os dados:
        | code   | amount | discount_type | description |
        | DESC10 | 10     | fixed_product | Cupom teste |
    Então o status da resposta deve ser 201
    E o cupom deve ser criado com sucesso

Esquema do Cenário: Validação de erro ao cadastrar cupom
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com os dados:
        | code   | amount   | discount_type   | description |
        | <code> | <amount> | <tipo_desconto> | <descricao> |

    Então o status da resposta deve ser 400
    E deve retornar a mensagem "<mensagem>"

    Exemplos:
        | code   | amount | tipo_desconto | descricao   | mensagem                  |
        | %%&&*  | 10     | fixed_product | Cupom teste | Código inválido           |
        | DESC20 | -10    | fixed_product | Cupom teste | Valor inválido            |
        | DESC30 | abc    | fixed_product | Cupom teste | Valor inválido            |
        | DESC40 | 10     | invalido      | Cupom teste | Tipo de desconto inválido |

Cenário: Não permitir cadastro de cupons com código repetido
    Dado que já exista um cupom cadastrado com o código "DESC10"
    Quando eu realizar uma requisição POST para "/wc/v3/coupons" com o código "DESC10"
    Então o status da resposta deve ser 400
    E deve retornar o código de erro "woocommerce_rest_coupon_code_already_exists"

Cenário: Listar todos cupons
    Dado que existam cupons cadastrados
    Quando eu realizar uma requisição GET para "/wc/v3/coupons"
    Então o status da resposta deve ser 200
    E a resposta deve ser uma lista de cupons
    E cada cupom deve seguir o contrato definido

Cenário: Listar cupom com ID válido
    Dado que exista um cupom cadastrado
    Quando eu realizar uma requisição GET para "/wc/v3/coupons/{id}" com o ID desse cupom
    Então o status da resposta deve ser 200
    E o cupom retornado deve ter o mesmo ID informado

Cenário: Listar cupom com ID inválido
    Quando eu realizar uma requisição GET para "/wc/v3/coupons/999999999"
    Então o status da resposta deve ser 404
    E deve retornar o código de erro "woocommerce_rest_shop_coupon_invalid_id"

Cenário: Editar cupom com ID válido
    Dado que exista um cupom cadastrado
    Quando eu realizar uma requisição PUT para "/wc/v3/coupons/{id}" com a descrição "Cupom editado"
    Então o status da resposta deve ser 200
    E a descrição do cupom deve ser "Cupom editado"

Cenário: Editar cupom com ID inválido
    Quando eu realizar uma requisição PUT para "/wc/v3/coupons/999999999"
    Então o status da resposta deve ser 404
    E deve retornar o código de erro "woocommerce_rest_shop_coupon_invalid_id"
