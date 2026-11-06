# Trabalho de Conclusão - Engenheiro de Qualidade de Software

Estratégia de qualidade e automação de testes da loja virtual **EBAC-SHOP** (http://lojaebac.ebaconline.art.br/), desenvolvidas como trabalho de conclusão do curso "Engenheiro de Qualidade de Software" da EBAC.

## Autor

- Eduardo de Araujo Soares
- Telefone: (11) 94551-6126
- E-mail: eduardo.a.soares2005@gmail.com
- LinkedIn: www.linkedin.com/in/eduardo2005

## Objetivo

Aplicar, de ponta a ponta, o fluxo de trabalho de um Quality Engineer sobre oito histórias de usuário: critérios de aceite em Gherkin, casos de teste, automação de UI e de API, testes de performance, integração contínua e registro de bugs.

## Stack

| Camada | Ferramentas |
|---|---|
| Critérios e casos de teste | Gherkin (BDD, em português) |
| UI (E2E) | Cypress (JavaScript) e Playwright + Pytest (Python) |
| API | Supertest + Jest + Ajv (JavaScript) e Pytest + Requests (Python) |
| Performance | K6 |
| Relatórios | Mochawesome, Allure, jest-html-reporters e K6 Web Dashboard |
| Integração contínua | GitHub Actions |

## Estrutura do repositório

| Pasta | Conteúdo | Cenários |
|---|---|---|
| [`Gherkin`](Gherkin/README.md) | Critérios de aceite e os 49 casos de teste das 8 histórias | 49 casos |
| [`Automação - UI - Cypress`](Automação%20-%20UI%20-%20Cypress/README.md) | Testes E2E com Cypress, incluindo setup de estoque via API | 54 |
| [`Automação - UI - Playwright`](Automação%20-%20UI%20-%20Playwright/README.md) | Testes E2E com Playwright e Pytest | 36 |
| [`Automação - API - Supertest`](Automação%20-%20API%20-%20Supertest/README.md) | Testes da API de cupons com validação de contrato | 12 |
| [`Automação - API - Pytest`](Automação%20-%20API%20-%20Pytest/README.md) | Testes da API de cupons com Pytest | 7 |
| [`K6 - Testes de Performance`](K6%20-%20Testes%20de%20Performance/README.md) | Testes de carga, pico e estresse de login e cadastro | 6 scripts |
| `Documentação` | Trabalho de conclusão (DOCX e PDF) | — |
| `.github/workflows` | Workflow de integração contínua (`qa.yml`) | — |

Cada projeto tem um README próprio com pré-requisitos, configuração, execução, relatórios e cenários.

## Histórias de usuário cobertas

| História | Funcionalidade | Gherkin | Automação |
|---|---|---|---|
| US-0001 | Adicionar item ao carrinho | sim | UI (Cypress e Playwright) |
| US-0002 | Login na plataforma | sim | UI (Cypress e Playwright) e performance (K6) |
| US-0003 | API de cupons | sim | API (Supertest e Pytest) |
| US001 | Catálogo de produtos | sim | manual |
| US002 | Painel Minha Conta | sim | manual |
| US003 | Meus pedidos | sim | manual |
| US004 | Endereços | sim | UI (Cypress e Playwright) |
| US005 | Detalhes da conta | sim | UI (Cypress e Playwright) |

Os casos de teste estão na seção 2.3 do documento e em `Gherkin/Casos de Teste`.

## Como executar

1. Entre na pasta do projeto desejado;
2. copie `.env.example` para `.env` e preencha as variáveis (os arquivos `.env` não são versionados);
3. instale as dependências e execute conforme o README do projeto.

## Integração contínua

O workflow [`.github/workflows/qa.yml`](.github/workflows/qa.yml) é executado manualmente (Actions > "QA - Testes automatizados" > Run workflow) e roda um job por projeto, em sequência: Playwright → Cypress → Supertest → Pytest (API) → K6. Cada job roda mesmo que o anterior falhe, o job "Resultado geral" falha se qualquer um deles falhar e os relatórios ficam como artefatos para download.

| Secret | Usado por |
|---|---|
| `BASE_URL` | URL raiz da loja, sem `/wp-json` (Playwright, Cypress e K6) |
| `API_BASE_URL` | URL da API, com `/wp-json` (Supertest e Pytest; vira `BASE_URL` dentro do job) |
| `USER_EMAIL`, `USER_SENHA` | Supertest, Pytest e Cypress (setup de estoque, como `API_USUARIO`/`API_SENHA`) |
| `UI_USUARIO`, `UI_SENHA` | Playwright |
| `K6_USUARIO`, `K6_SENHA` | K6 |

## Limitações e pontos de atenção

Bugs encontrados na aplicação e registrados na seção 2.8 do documento. Os testes correspondentes ficam **pulados** (skip, com o bug no motivo) para não reprovar a pipeline; basta remover o skip quando o bug for corrigido:

| Bug | Descrição | Testes afetados |
|---|---|---|
| BUG-001 | O login não é bloqueado após 3 tentativas com senha incorreta | Playwright: `teste_bloqueio_login` |
| BUG-002 | Nome e sobrenome do endereço aceitam valores apenas numéricos | Cypress: 4 cenários de nome/sobrenome inválidos (entrega e faturamento) em `enderecoTest.cy.js` |
