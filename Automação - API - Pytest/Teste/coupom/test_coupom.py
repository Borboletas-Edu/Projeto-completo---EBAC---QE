from payload_cupom import PAYLOAD_VALIDO, PAYLOAD_SEM_CODIGO, PAYLOAD_SEM_VALOR, PAYLOAD_VALOR_NEGATIVA, PAYLOAD_SEM_TIPO, PAYLOAD_SEM_DESCRICAO, PAYLOAD_DADOS_REPETIDOS 
from utils import retorna_auth
import requests
import pytest

@pytest.mark.ApiCupom
class TesteCupom:
    
    @pytest.fixture(autouse=True)
    def setup(self, base_url): #Base_url vem direto de conftest
        self.url = f"{base_url}/wc/v3/coupons"
        self.auth = retorna_auth()

    def teste_cadastrar_cupom_valido(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_VALIDO)
        retorno = response.json()
        assert response.status_code == 201
        assert retorno["code"] == PAYLOAD_VALIDO["code"].lower()
        assert retorno["amount"] == PAYLOAD_VALIDO["amount"]
        assert retorno["discount_type"] == PAYLOAD_VALIDO["discount_type"]
        assert retorno["description"] == PAYLOAD_VALIDO["description"]
        
    def teste_cadastrar_cupom_sem_codigo(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_SEM_CODIGO)
        retorno = response.json()
        assert response.status_code == 400
        assert retorno["code"] == "woocommerce_rest_empty_coupon_code"
        assert retorno["message"] == "O código do cupom não pode estar vazio."
        
    def teste_cadastrar_cupom_sem_quantidade(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_SEM_VALOR)
        retorno = response.json()
        assert response.status_code == 201
        assert retorno["code"] == PAYLOAD_SEM_VALOR["code"].lower()
        assert retorno["discount_type"] == PAYLOAD_SEM_VALOR["discount_type"]
        assert retorno["description"] == PAYLOAD_SEM_VALOR["description"]

    def teste_cadastrar_cupom_com_valor_negativa(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_VALOR_NEGATIVA)
        retorno = response.json()
        assert response.status_code == 400
        assert retorno["code"] == "coupon_invalid_amount"
        assert retorno["message"] == "Valor de desconto inválido"

    def teste_cadastrar_cupom_sem_tipo(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_SEM_TIPO)
        retorno = response.json()
        assert response.status_code == 400
        assert retorno["code"] == "rest_invalid_param"
        assert "discount_type" in retorno["message"]
        
    def  teste_cadastrar_cupom_sem_descricao(self):
        response = requests.post(url = self.url, headers = self.auth, json = PAYLOAD_SEM_DESCRICAO)
        retorno = response.json()
        assert response.status_code == 201
        assert retorno["code"] == PAYLOAD_SEM_DESCRICAO["code"].lower()
        assert retorno["amount"] == PAYLOAD_SEM_DESCRICAO["amount"]
        assert retorno["discount_type"] == PAYLOAD_SEM_DESCRICAO["discount_type"]
        assert retorno["description"] == PAYLOAD_SEM_DESCRICAO["description"]     

    def teste_cadastrar_cupom_com_dados_iguais(self):
        payload = PAYLOAD_DADOS_REPETIDOS
        response_primeiro_cadastro = requests.post(url = self.url, headers = self.auth, json = payload)
        response_segundo_cadastro = requests.post(url = self.url, headers = self.auth, json = payload)
        retorno_segundo_cadastro = response_segundo_cadastro.json()
        
        assert response_primeiro_cadastro.status_code == 201
        assert response_segundo_cadastro.status_code == 400

        assert retorno_segundo_cadastro["code"] == "woocommerce_rest_coupon_code_already_exists"
        assert retorno_segundo_cadastro["message"] == "O código de cupom já existe"
