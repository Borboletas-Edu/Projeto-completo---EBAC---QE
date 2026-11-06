# Automação API - Supertest

Testes automatizados da API de cupons do WooCommerce (`/wc/v3/coupons`) da EBAC-SHOP com **Jest** e **Supertest**, incluindo validação de contrato com **Ajv**.

## Objetivo

- Validar a listagem de cupons e a busca por ID;
- Validar o cadastro de cupons com os campos `code`, `amount`, `discount_type` e `description`;
- Validar regras de negócio (código não repetido, valor negativo, tipo de desconto);
- Validar o **contrato** das respostas de sucesso e de erro;
- Validar que a API exige autenticação.

## Stack

| Ferramenta | Uso |
|---|---|
| Jest `^29.7.0` | Execução e asserções |
| Supertest `^7.0.0` | Requisições HTTP |
| Ajv + ajv-formats | Validação de contrato (JSON Schema) |
| dotenv | Leitura do `.env` |
| jest-html-reporters | Relatório HTML |

## Pré-requisitos

- Node.js 20+ (a pipeline usa Node 22)
- npm

## Estrutura do projeto

```text
.
├── config/
│   └── env.js                   # leitura e validação das variáveis de ambiente
├── contracts/                   # JSON Schemas
│   ├── cupomSchema.js
│   └── erroSchema.js
├── data/
│   └── payloadCupom.js          # payloads (funções que geram código novo a cada uso)
├── tests/
│   └── cupom/
│       ├── cupomGet.test.js
│       └── cupomPost.test.js
├── utils/
│   ├── auth.js                  # header Basic Auth
│   ├── cupomApi.js              # camada de serviço (chamadas HTTP)
│   └── validarContrato.js
├── jest.config.js
├── package.json
└── .env.example
```

## Configuração do ambiente

Copie `.env.example` para `.env` (não versionado) e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `BASE_URL` | Prefixo da API, com `/wp-json` (`http://` é assumido se não houver esquema) | `http://lojaebac.ebaconline.art.br/wp-json` |
| `USER_EMAIL` | Usuário da API (Basic Auth) | — |
| `USER_SENHA` | Senha desse usuário | — |

Os testes concatenam `/wc/v3/coupons` ao `BASE_URL`.

## Instalação

```bash
npm install
```

## Como executar

| Comando | O que faz |
|---|---|
| `npm test` | Executa todos os testes |
| `npm run test:cupom` | Executa apenas os testes de cupom |

## Relatórios

Ao final da execução é gerado `reports/relatorio-api-cupons.html` (via `jest-html-reporters`). Abra o arquivo no navegador. A pasta `reports/` não é versionada.

## Cenários cobertos

Total: **12 cenários**.

| Arquivo | Cenários | Qtd. |
|---|---|---|
| `cupomGet.test.js` | Listar todos (200 + contrato); buscar por ID válido (200 + contrato); ID inexistente (404 + contrato de erro); sem autenticação (401) | 4 |
| `cupomPost.test.js` | Cadastro válido (201 + contrato); sem descrição (opcional); sem código (400); valor negativo (400); sem tipo de desconto (400); tipo inexistente (400); código repetido (400); sem autenticação (401) | 8 |

## Padrões e boas práticas

- **Camada de serviço:** `utils/cupomApi.js` concentra as chamadas HTTP e mantém os testes limpos.
- **Validação de contrato:** `cupomSchema.js` (campos, tipos e valores permitidos de `discount_type`, usado em item e lista) e `erroSchema.js` (`code`, `message`, `data.status`). Se o contrato quebrar, a asserção mostra o campo e o motivo.
- **Massa dinâmica:** payloads são funções e geram um código novo a cada uso; os testes criam os próprios dados (`beforeAll`), sem depender de cupons existentes.
- A API devolve o `code` do cupom em minúsculas; os testes consideram isso.

## Integração contínua

Job **API - Supertest** do workflow [`qa.yml`](../.github/workflows/qa.yml): `npm ci`, `npm test` e publicação de `reports/` como artefato `supertest-reports`.

| Variável no job | Secret |
|---|---|
| `BASE_URL` | `API_BASE_URL` |
| `USER_EMAIL` | `USER_EMAIL` |
| `USER_SENHA` | `USER_SENHA` |

## Limitações e pontos de atenção

- Os testes criam cupons reais na loja de testes a cada execução.
- Existe uma automação equivalente em Pytest em [`Automação - API - Pytest`](../Automação%20-%20API%20-%20Pytest/README.md).
