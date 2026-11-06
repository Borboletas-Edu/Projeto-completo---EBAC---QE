# Automação UI - Cypress

Testes end-to-end da interface web da EBAC-SHOP com **Cypress** (JavaScript), organizados em camadas de dados, páginas, fluxos e especificações.

## Objetivo

Validar os principais fluxos do cliente na loja, com cenários positivos e negativos:

- Cadastro de cliente
- Login
- Edição dos detalhes da conta
- Edição de endereços (entrega e faturamento)
- Adição e remoção de produtos no carrinho

## Stack

| Ferramenta | Uso |
|---|---|
| Cypress `^15.14.0` | Execução dos testes E2E |
| Faker (`@faker-js/faker`) | Geração de e-mails e senhas únicos |
| dotenv | Leitura do `.env` no `cypress.config.js` |
| Mochawesome (+ merge e report generator) | Relatório HTML |

## Pré-requisitos

- Node.js 20+ (a pipeline usa Node 22)
- npm
- Google Chrome (opcional; a pipeline executa com `--browser chrome`)

## Estrutura do projeto

```text
.
├── cypress/
│   ├── data/                    # massa de testes (válidos e inválidos)
│   │   ├── cadastroData.js
│   │   ├── carrinhoData.js
│   │   ├── detalhesContaData.js
│   │   ├── enderecosData.js
│   │   └── loginData.js
│   ├── e2e/                     # especificações
│   │   ├── cadastroTest.cy.js
│   │   ├── carrinhoTest.cy.js
│   │   ├── detalhesContaTest.cy.js
│   │   ├── enderecoTest.cy.js
│   │   └── loginTest.cy.js
│   ├── flow/                    # operações de negócio (combinam ações de páginas)
│   │   ├── DetalhesProdutoFlow.js
│   │   └── MinhaContaFlow.js
│   ├── page/                    # Page Objects (seletores e ações)
│   │   ├── CarrinhoPage.js
│   │   ├── DetalhesProdutoPage.js
│   │   ├── HomePage.js
│   │   ├── MinhaContaPage.js
│   │   └── ProdutosPage.js
│   └── support/
│       ├── e2e.js
│       ├── estoqueApi.js        # setup de estoque via API do WooCommerce
│       └── Utils.js             # geração de e-mail e senha únicos
├── cypress.config.js
├── package.json
└── .env.example
```

## Configuração do ambiente

Copie `.env.example` para `.env` (não versionado) e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `BASE_URL` | URL base da loja | `http://lojaebac.ebaconline.art.br` |
| `API_USUARIO` | Usuário admin da API do WooCommerce (setup de estoque) | — |
| `API_SENHA` | Senha desse usuário | — |

O `cypress.config.js` carrega o `.env` com `dotenv` e para com uma mensagem clara se `BASE_URL` não estiver definida. `API_USUARIO`/`API_SENHA` só são exigidas pelos testes de carrinho.

## Instalação

```bash
npm install
```

## Como executar

| Comando | O que faz |
|---|---|
| `npm test` | Executa todos os testes em modo headless |
| `npm run open` | Abre o runner interativo do Cypress |
| `npm run test:report` | Limpa relatórios antigos, executa os testes e gera o relatório HTML |
| `npx cypress run --spec cypress/e2e/loginTest.cy.js` | Executa uma especificação |

## Relatórios

O reporter é o **Mochawesome**. Com `npm run test:report`:

1. limpa `cypress/reports`;
2. executa os testes (JSONs em `cypress/reports/mocha`);
3. consolida em `cypress/reports/report.json`;
4. gera o HTML em `cypress/reports/html/report.html`.

As pastas `cypress/reports/` e `cypress/screenshots/` não são versionadas.

## Cenários cobertos

Total: **54 cenários** (os casos com `forEach` geram um teste por item da massa de dados).

| Especificação | Cenários | Qtd. |
|---|---|---|
| `cadastroTest.cy.js` | Cadastro válido; sem e-mail, sem senha, sem ambos; e-mail com formato inválido (validação nativa `type="email"` do navegador) | 5 |
| `loginTest.cy.js` | Login válido; senha errada; usuário errado; usuário e senha errados; campos obrigatórios ausentes | 7 |
| `detalhesContaTest.cy.js` | Atualização de dados pessoais; troca de senha; dados pessoais inválidos | 11 |
| `enderecoTest.cy.js` | Entrega: válido, campos ausentes e valores inválidos; faturamento: válido, campos ausentes e valores inválidos | 28 |
| `carrinhoTest.cy.js` | Adicionar um produto e validar total; adicionar vários produtos e somar total; remover e restaurar item | 3 |

## Padrões e boas práticas

- **Camadas:** `data/` (massa), `page/` (Page Objects), `flow/` (operações de negócio, ex.: `realizarLogin`, `editarEnderecoFaturamento`, `adicionarProdutoCarrinho`) e `e2e/` (asserções).
- **Testes orientados a dados:** cenários negativos gerados com `forEach` a partir de `data/`.
- **Massa dinâmica:** e-mails e senhas únicos (`Utils.js`) para evitar conflito de cadastro.
- **Setup de dados via API:** antes dos testes de carrinho, `cy.task('garantirEstoque')` (`support/estoqueApi.js`) consulta a API REST do WooCommerce (`/wp-json/wc/v3`) e, se uma variação usada em `carrinhoData.js` estiver com estoque abaixo do mínimo (10 ou a quantidade do teste), repõe para 100 unidades. A task roda no lado Node, então as credenciais de admin não chegam ao navegador.

## Integração contínua

Job **E2E - Cypress** do workflow [`qa.yml`](../.github/workflows/qa.yml): `npm ci`, execução no Chrome e publicação de `cypress/reports` e `cypress/screenshots` como artefato `cypress-reports`.

| Variável no job | Secret |
|---|---|
| `BASE_URL` | `BASE_URL` |
| `API_USUARIO` | `USER_EMAIL` |
| `API_SENHA` | `USER_SENHA` |

## Limitações e pontos de atenção

- Os 4 cenários de **nome e sobrenome inválidos** em `enderecoTest.cy.js` são pulados (`it.skip`) por um defeito da aplicação (BUG-002 no documento: valores numéricos são aceitos). Eles são marcados com o campo `bugConhecido` em `enderecosData.js`; para reativá-los, basta remover esse campo.
- O setup de estoque altera dados reais da loja de testes (estoque das variações usadas).
