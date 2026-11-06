# Automação API - Pytest (Python)

Testes automatizados da API de cupons do WooCommerce (`/wc/v3/coupons`) da EBAC-SHOP com **Pytest** e **Requests**, com relatório **Allure**.

## Objetivo

Validar o cadastro de cupons, cobrindo casos positivos e negativos:

- cadastro válido;
- ausência de campos (código, valor, tipo de desconto, descrição);
- valor negativo;
- cadastro com código repetido.

## Stack

| Ferramenta | Uso |
|---|---|
| Pytest `9.0.2` | Execução, fixtures e marcadores |
| Requests | Requisições HTTP |
| python-dotenv | Leitura do `.env` |
| allure-pytest | Resultados para o relatório Allure |

## Pré-requisitos

- Python 3.10+ (a pipeline usa Python 3.12)
- pip
- Node.js e Java (apenas para abrir o relatório Allure localmente)

## Estrutura do projeto

```text
.
├── Teste/
│   └── cupom/
│       ├── payload_cupom.py     # payloads de cupom
│       └── test_cupom.py       # cenários de teste
├── conftest.py                  # fixture `base_url`
├── pytest.ini                   # marcadores e opções padrão
├── requirements.txt
├── utils.py                     # header Basic Auth e geração de código de cupom
└── .env.example
```

## Configuração do ambiente

Copie `.env.example` para `.env` (não versionado) e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `BASE_URL` | Prefixo da API, com `/wp-json` (`http://` é assumido se não houver esquema) | `lojaebac.ebaconline.art.br/wp-json` |
| `USER_EMAIL` | Usuário da API (Basic Auth) | — |
| `USER_SENHA` | Senha desse usuário | — |

Os testes concatenam `/wc/v3/coupons` ao `BASE_URL`.

## Instalação

```bash
pip install -r requirements.txt
```

## Como executar

| Comando | O que faz |
|---|---|
| `pytest` | Executa toda a suíte |
| `pytest -m ApiCupom` | Executa pelo marcador de cupons |
| `pytest Teste/cupom/test_cupom.py` | Executa um arquivo |

## Relatórios

O `pytest.ini` já gera os resultados do **Allure** a cada execução (`--alluredir=allure-results --clean-alluredir`). Para abrir:

```bash
npx allure-commandline serve allure-results
```

Para gerar uma versão estática:

```bash
npx allure-commandline generate allure-results -o allure-report --clean
```

Se o terminal for o VS Code instalado via Snap e aparecer erro de `libpthread/GLIBC_PRIVATE`:

```bash
env -u SNAP -u SNAP_NAME -u SNAP_REVISION -u SNAP_ARCH -u SNAP_COOKIE -u GTK_PATH -u GTK_MODULES npx allure-commandline serve allure-results
```

As pastas `allure-results/` e `allure-report/` não são versionadas.

## Cenários cobertos

Total: **7 cenários** (marcador `ApiCupom`).

| Teste | Resultado esperado |
|---|---|
| `teste_cadastrar_cupom_valido` | 201 e campos devolvidos iguais aos enviados |
| `teste_cadastrar_cupom_sem_codigo` | 400 (`woocommerce_rest_empty_coupon_code`) |
| `teste_cadastrar_cupom_sem_quantidade` | 201 (valor do desconto é opcional) |
| `teste_cadastrar_cupom_com_valor_negativo` | 400 (`coupon_invalid_amount`) |
| `teste_cadastrar_cupom_sem_tipo` | 400 (`rest_invalid_param`) |
| `teste_cadastrar_cupom_sem_descricao` | 201 (descrição é opcional) |
| `teste_cadastrar_cupom_com_dados_iguais` | 400 ao repetir o código |

## Padrões e boas práticas

- **Payloads centralizados** em `Teste/cupom/payload_cupom.py`.
- **Massa dinâmica:** códigos de cupom gerados com `uuid` para evitar colisão.
- **Fixtures:** `base_url` em `conftest.py`; autenticação montada em `utils.py`.

## Integração contínua

Job **API - Pytest** do workflow [`qa.yml`](../.github/workflows/qa.yml): instala as dependências, executa `pytest` e publica `allure-results` como artefato `pytest-api-allure-results`.

| Variável no job | Secret |
|---|---|
| `BASE_URL` | `API_BASE_URL` |
| `USER_EMAIL` | `USER_EMAIL` |
| `USER_SENHA` | `USER_SENHA` |

## Limitações e pontos de atenção

- Os testes criam cupons reais na loja de testes a cada execução.
- Existe uma automação equivalente em Supertest, com validação de contrato, em [`Automação - API - Supertest`](../Automação%20-%20API%20-%20Supertest/README.md).
