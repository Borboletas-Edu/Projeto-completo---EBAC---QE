# Automação API - Pytest (Python)

Projeto de testes automatizados de API para validação do endpoint de cupons do WooCommerce (`/wc/v3/coupons`) usando **Pytest + Requests**, com relatório **Allure**.

## Stack
- Python 3.10+
- Pytest
- Requests
- python-dotenv
- Allure (`allure-pytest` + `allure-commandline`)

## Objetivo

Validar cenários de cadastro de cupom, cobrindo casos positivos e negativos, como:

- cadastro válido;
- ausência de campos obrigatórios;
- valor negativo;
- tentativa de cadastro duplicado.

## Estrutura do Projeto

```text
.
├── conftest.py
├── pytest.ini
├── utils.py
├── README.md
└── Teste/
    └── coupom/
        ├── payload_cupom.py
        └── test_coupom.py
```

## Pré-requisitos

- Python 3.10+
- `pip`
- Node.js (para abrir o relatório Allure com `npx`)
- Java (necessário para abrir relatório Allure localmente)

## Dependências

```bash
pip install -r requirements.txt
```

## Configuração de Ambiente

1. Crie o arquivo `.env` na raiz do projeto (ou copie de `.env.example`):

2. Preencha as variáveis:

```env
USER_EMAIL="seu-email" // email de acesso para api
USER_SENHA="sua-senha" // senha de acesso para api
BASE_URL="lojaebac.ebaconline.art.br/wp-json"
```

### Observações importantes

- A autenticação utilizada é `Basic Auth`.
- O projeto adiciona automaticamente `http://` caso o `BASE_URL` não venha com esquema.
- O `BASE_URL` deve apontar para o prefixo da API (`.../wp-json`), pois os testes concatenam `/wc/v3/coupons`.

## Como Executar os Testes

Executar toda a suíte:

```bash
pytest
```

Executar apenas os testes de cupom pelo marcador:

```bash
pytest -m ApiCupom
```

Executar arquivo específico:

```bash
pytest Teste/coupom/test_coupom.py
```

## Relatório Allure
O projeto já está configurado no `pytest.ini` para gerar resultados do Allure automaticamente a cada execução:
- `--alluredir=allure-results`
- `--clean-alluredir`

Depois de rodar os testes (`pytest`), abra o relatório com:
```bash
npx allure-commandline serve allure-results
```

Para gerar uma versão estática:
```bash
npx allure-commandline generate allure-results -o allure-report --clean
```

Se o terminal estiver no VS Code Snap e aparecer erro de `libpthread/GLIBC_PRIVATE`, use:
```bash
env -u SNAP -u SNAP_NAME -u SNAP_REVISION -u SNAP_ARCH -u SNAP_COOKIE -u GTK_PATH -u GTK_MODULES npx allure-commandline serve allure-results
```

## Marcadores disponíveis
Definidos em `pytest.ini`:
- `ApiCupom`

## Cenários Cobertos

- `teste_cadastrar_cupom_valido`
- `teste_cadastrar_cupom_sem_codigo`
- `teste_cadastrar_cupom_sem_quantidade`
- `teste_cadastrar_cupom_com_valor_negativa`
- `teste_cadastrar_cupom_sem_tipo`
- `teste_cadastrar_cupom_sem_descricao`
- `teste_cadastrar_cupom_com_dados_iguais`

## Observações Técnicas

- Os payloads são centralizados em `Teste/coupom/payload_cupom.py`.
- Códigos de cupom dinâmicos são gerados via `uuid` para evitar colisão.
- A fixture `base_url` está em `conftest.py`.
- A montagem do header de autenticação está em `utils.py`.
