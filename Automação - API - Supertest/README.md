# Automação de API com Supertest - Endpoint de Cupons

Projeto de testes automatizados de API para o endpoint de cupons (`/wc/v3/coupons`) da EBAC-SHOP, utilizando `Jest`, `Supertest` e validação de contrato com `Ajv`.

## Objetivo

- Validar listagem de todos os cupons e busca por ID;
- Validar o cadastro de cupons com os campos obrigatórios (`code`, `amount`, `discount_type`, `description`);
- Validar regras de negócio (código não repetido, valor negativo, tipo de desconto);
- Validar **contrato** das respostas de sucesso e de erro;
- Validar que a API exige autenticação.

## Estrutura do Projeto

```text
.
├── config/
│   └── env.js
├── contracts/
│   ├── cupomSchema.js
│   └── erroSchema.js
├── data/
│   └── payloadCupom.js
├── tests/
│   └── cupom/
│       ├── cupomGet.test.js
│       └── cupomPost.test.js
├── utils/
│   ├── auth.js
│   ├── cupomApi.js
│   └── validarContrato.js
├── jest.config.js
├── package.json
└── .env.exemple
```

## Pré-requisitos

- Node.js 18+
- `npm`

## Instalação

```bash
npm install
```

## Configuração de Ambiente

1. Copie o arquivo `.env.exemple` para `.env` na raiz desta pasta.
2. Preencha as variáveis:

```env
USER_EMAIL="usuario-da-api"
USER_SENHA="senha-da-api"
BASE_URL="http://lojaebac.ebaconline.art.br/wp-json"
```

### Observações importantes

- A autenticação é `Basic Auth`.
- O `BASE_URL` deve apontar para o prefixo da API (`.../wp-json`); os testes concatenam `/wc/v3/coupons`.
- Caso o `BASE_URL` venha sem `http://`, o projeto adiciona automaticamente.
- O arquivo `.env` não é versionado.

## Como Executar os Testes

```bash
npm test
```

Somente os testes de cupom:

```bash
npm run test:cupom
```

## Relatório

Ao final da execução é gerado o relatório HTML em `reports/relatorio-api-cupons.html` (via `jest-html-reporters`). Abra o arquivo no navegador. A pasta `reports/` não é versionada.

## Validação de Contrato

Os schemas ficam em `contracts/` e são validados com `Ajv`:

- `cupomSchema.js`: recurso de cupom (campos, tipos e valores permitidos de `discount_type`), usado em resposta de item e de lista;
- `erroSchema.js`: corpo de erro padrão (`code`, `message`, `data.status`).

Cada teste valida o `status`, os campos de negócio e o contrato. Se o contrato quebrar, a asserção mostra o campo e o motivo.

## Cenários Cobertos

**GET**
- listar todos os cupons (200 + contrato da lista);
- buscar cupom por ID válido (200 + contrato);
- buscar cupom por ID inexistente (404 + contrato de erro);
- listar sem autenticação (401).

**POST**
- cadastrar cupom válido (201 + contrato);
- cadastrar cupom sem descrição (opcional);
- cupom sem código (400);
- cupom com valor negativo (400);
- cupom sem tipo de desconto (400);
- cupom com tipo de desconto inexistente (400);
- cupom com código repetido (400);
- cadastrar sem autenticação (401).

## Observações Técnicas

- Os payloads ficam em `data/payloadCupom.js` e são **funções**, gerando um código novo a cada uso e evitando colisão.
- `utils/cupomApi.js` concentra as chamadas HTTP (camada de serviço), mantendo os testes limpos.
- A API devolve o `code` do cupom em minúsculas; os testes consideram isso.
- Os testes criam os próprios dados (`beforeAll`), sem depender de cupons pré-existentes.
- Existe também a automação equivalente em Pytest em `Automação - API - Pytest`.
