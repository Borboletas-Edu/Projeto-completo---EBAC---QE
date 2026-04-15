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

Cenário: Não permitir cadastro de cupons com ID igual

Cenário: Listar todos cupons

Cenário: Listar cupom com ID válido

Cenário: Listar cupom com ID inválido

Cenário: Editar cupom com ID válido

Cenário: Editar cupom com ID inválido

