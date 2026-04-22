

class ProdutoAPI:
    def __init__(self, client):
        self.client = client

    def criar_produto(self):
        payload = {
            "auth": 
            "name": "ProdutoTesteEdu",
            "price": "90.00",
            "quantity": "5",
            "categories": "any",
            "description": "any",
            "photos": "any",
            "popular": "any",
            "visible": "any",
            "location": "any",
            "additionalDetails": "Teste Produto Edu",
        }

        response = self.client.post("/addProduct", payload)
        return response.json()