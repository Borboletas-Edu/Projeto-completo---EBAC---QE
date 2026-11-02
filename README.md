# Projeto: Trabalho de Conclusão - Engenheiro de Qualidade de Software

Autor: Eduardo de Araujo Soares  
Telefone: (11) 94551-6126  
E-mail: eduardo.a.soares2005@gmail.com  
LinkedIn: www.linkedin.com/in/eduardo2005

## Sobre o projeto

Este repositório tem como objetivo sintetizar, em diversas tarefas, grande parte dos módulos apresentados no curso de "Engenharia de Qualidade de Software", oferecido pela EBAC.

## O que este repositório contém

- `Automação - API - Pytest`: implementações de automação de testes de API com Pytest.
- `Automação - API - Supertest`: automação de testes de API (cupons) com Supertest, Jest e validação de contrato (Ajv).
- `Automação - UI - Cypress`: testes de interface (UI) com Cypress.
- `Automação - UI - Playwright`: testes de interface (UI) com Playwright.
- `Documentação`: documento do trabalho de conclusão (resumo, estratégia, critérios de aceitação, 49 casos de teste, automações, integração contínua, testes de performance e referências).
- `Gherkin`: critérios de aceitação em BDD para as 8 histórias de usuário (US-0001 a US-0003 e US001 a US005).
- `K6 - Testes de Performance`: implementações de testes de performance com k6.

Cada pasta possui um `README` próprio com a explicação do projeto e instruções de execução.

## Integração contínua (GitHub Actions)

O workflow [`.github/workflows/qa.yml`](.github/workflows/qa.yml) executa manualmente (Actions > "QA - Testes automatizados" > Run workflow) um job por projeto, em sequência: Playwright, Cypress, Supertest, Pytest (API) e K6. Cada job roda mesmo que o anterior falhe, e o job "Resultado geral" falha se qualquer um deles falhar. Os relatórios ficam como artefatos para download.

Secrets necessários (Settings > Secrets and variables > Actions):

| Secret | Usado por |
|---|---|
| `BASE_URL` | URL raiz da loja, sem `/wp-json` (Playwright, Cypress, K6) |
| `API_BASE_URL` | URL da API, com `/wp-json` (Supertest, Pytest API; vira `BASE_URL` dentro do job) |
| `USER_EMAIL`, `USER_SENHA` | Supertest, Pytest API |
| `UI_USUARIO`, `UI_SENHA` | Playwright |
| `K6_USUARIOS`, `K6_SENHA` | K6 |

## Histórias de usuário cobertas

| História | Funcionalidade | Gherkin | Casos de teste (documento, seção 4.3) | Automação |
|---|---|---|---|---|
| US-0001 | Adicionar item ao carrinho | sim | sim | UI (Cypress e Playwright) |
| US-0002 | Login na plataforma | sim | sim | UI (Cypress e Playwright) e K6 |
| US-0003 | API de cupons | sim | sim | API (Supertest e Pytest) |
| US001 | Catálogo de produtos | sim | sim | manual |
| US002 | Painel Minha Conta | sim | sim | manual |
| US003 | Meus pedidos | sim | sim | manual |
| US004 | Endereços | sim | sim | UI (Cypress e Playwright) |
| US005 | Detalhes da conta | sim | sim | UI (Cypress e Playwright) |

## Testes de performance

Os testes de carga do K6 (login e cadastro) seguem o perfil do TCC: 20 usuários virtuais, 2 minutos de execução e rampup de 20 segundos.
