# Projeto: Trabalho de Conclusão - Engenheiro de Qualidade de Software

Autor: Eduardo de Araujo Soares  
Telefone: (11) 94551-6126  
E-mail: eduardo.a.soares2005@gmail.com  
LinkedIn: www.linkedin.com/in/eduardo2005

## Sobre o projeto

Este repositório tem como objetivo sintetizar, em diversas tarefas, grande parte dos módulos apresentados no curso de "Engenharia de Qualidade de Software", oferecido pela EBAC.

## O que este repositório contém

- `Automação - API - Cypress`: implementações de automação de testes de API com Cypress.
- `Automação - API - Pytest`: implementações de automação de testes de API com Pytest.
- `Automação - API - Supertest`: automação de testes de API (cupons) com Supertest, Jest e validação de contrato (Ajv).
- `Automação - Mobile - android`: materiais e práticas de automação de testes mobile para Android.
- `Automação - UI - Cypress`: testes de interface (UI) com Cypress.
- `Automação - UI - Playwright`: testes de interface (UI) com Playwright.
- `Casos de Teste`: planilha com os casos de teste das 8 histórias de usuário (técnicas, prioridade e status de automação).
- `Documentação`: documento do trabalho de conclusão (resumo, estratégia, critérios, casos de teste, automações e referências).
- `Gherkin`: critérios de aceitação em BDD para as 8 histórias de usuário (US-0001 a US-0003 e US001 a US005).
- `K6 - Testes de Performance`: implementações de testes de performance com k6.

Cada pasta possui um `README` próprio com a explicação do projeto e instruções de execução.

## Histórias de usuário cobertas

| História | Funcionalidade | Gherkin | Casos de teste | Automação |
|---|---|---|---|---|
| US-0001 | Adicionar item ao carrinho | sim | sim | UI (Cypress e Playwright) |
| US-0002 | Login na plataforma | sim | sim | UI (Cypress e Playwright) e K6 |
| US-0003 | API de cupons | sim | sim | API (Supertest e Pytest) |
| US001 | Catálogo de produtos | sim | sim | planejado (Mobile) |
| US002 | Painel Minha Conta | sim | sim | manual |
| US003 | Meus pedidos | sim | sim | manual |
| US004 | Endereços | sim | sim | UI (Cypress e Playwright) |
| US005 | Detalhes da conta | sim | sim | UI (Cypress e Playwright) |

## Testes de performance

Os testes de carga do K6 (login e cadastro) seguem o perfil do TCC: 20 usuários virtuais, 2 minutos de execução e rampup de 20 segundos.
