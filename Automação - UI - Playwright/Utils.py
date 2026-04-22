from faker import Faker
import random

fake = Faker()

def gerar_email_unico():
    email = f"{fake.first_name()}{random.randint(0, 10000)}@EmailDeTeste.com"
    return email
    
def gerar_senha_unica():
    senha = fake.password()
    return senha

def retornar_mensagem_alerta(page):
    return page.get_by_role("alert")
