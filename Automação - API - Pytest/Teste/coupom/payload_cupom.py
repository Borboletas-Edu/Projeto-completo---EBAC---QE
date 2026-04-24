from utils import gerar_codigo_cupom

def criar_payload_cupom(codigo_cupom, quantidede_cupom, tipo_desconto, descricao):
    payload = {
        "code": codigo_cupom,
        "amount": quantidede_cupom,
        "discount_type": tipo_desconto,
        "description": descricao
    }
    return payload

PAYLOAD_VALIDO = criar_payload_cupom(gerar_codigo_cupom() , "10.00", "fixed_product", "Cupom de desconto de teste")

PAYLOAD_SEM_CODIGO = criar_payload_cupom("" , "10.00", "fixed_product", "Cupom de desconto de teste")

PAYLOAD_SEM_VALOR = criar_payload_cupom(gerar_codigo_cupom() , "", "fixed_product", "Cupom de desconto de teste")

PAYLOAD_VALOR_NEGATIVA = criar_payload_cupom(gerar_codigo_cupom() , "-10.00", "fixed_product", "Cupom de desconto de teste")

PAYLOAD_SEM_TIPO = criar_payload_cupom(gerar_codigo_cupom() , "10.00", "", "Cupom de desconto de teste") 

PAYLOAD_SEM_DESCRICAO = criar_payload_cupom(gerar_codigo_cupom() , "10.00", "fixed_product", "")

PAYLOAD_DADOS_REPETIDOS = criar_payload_cupom(gerar_codigo_cupom() , "10.00", "fixed_product", "Cupom de desconto de teste")

