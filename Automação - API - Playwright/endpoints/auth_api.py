import requests

class AuthAPI:

    def __init__(self):
        self.base_url = "http://lojaebac.ebaconline.art.br/public/authUser"

    def obter_token_autenticação(self, email, senha):
    
        payload = { "email": email, "password": senha}
        
        response = requests.post(self.base_url,  json=payload)
        response_json = response.json()
        if response.status_code == 200:
            print("Autenticação realizada com Sucesso")
        else:
            print(f"Erro ao realizar autenticação. Erro: {response_json}" )
        token = response_json["data"]["token"] 
        return token

