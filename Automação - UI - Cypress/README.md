# Automação UI - Cypress

Este repositório contém a automação de testes de interface da loja EBAC, implementada com **Cypress** e organizada em camadas para facilitar manutenção, reaproveitamento de código e evolução para CI/CD.

## Objetivo do projeto

Validar os principais fluxos de usuário da aplicação web:

- Cadastro de cliente
- Login
- Edição de detalhes da conta
- Edição de endereços (entrega e faturamento)
- Adição e remoção de produtos no carrinho

A automação foi construída para cobrir cenários positivos e negativos, com dados controlados e geração dinâmica de credenciais quando necessário.

## Stack e dependências

- Node.js
- Cypress `^15.14.0`
- Faker `^10.4.0`
- Mochawesome + Merge + Report Generator
- Mocha JUnit Reporter

Arquivo de referência: `package.json`.

## Estrutura da pasta

```text
.
├── cypress.config.js
├── package.json
├── cypress
│   ├── data
│   │   ├── cadastroData.js
│   │   ├── loginData.js
│   │   ├── detalhesContaData.js
│   │   ├── enderecosData.js
│   │   └── carrinhoData.js
│   ├── e2e
│   │   ├── cadastroTest.cy.js
│   │   ├── loginTest.cy.js
│   │   ├── detalhesContaTest.cy.js
│   │   ├── enderecoTest.cy.js
│   │   └── carrinhoTest.cy.js
│   ├── flow
│   │   ├── MinhaContaFlow.js
│   │   └── DetalhesProdutoFlow.js
│   ├── page
│   │   ├── HomePage.js
│   │   ├── ProdutosPage.js
│   │   ├── DetalhesProdutoPage.js
│   │   ├── MinhaContaPage.js
│   │   └── CarrinhoPage.js
│   └── support
│       ├── e2e.js
│       └── Utils.js
```

## Padrão de automação utilizado

### 1) `data/` (massa de testes)
Contém dados para cenários válidos e inválidos. Isso permite:

- Separar regra de negócio dos testes
- Escalar cenários com `forEach`
- Facilitar manutenção de mensagens esperadas

### 2) `page/` (Page Objects)
Centraliza seletores e ações de elementos por página. Benefícios:

- Menor duplicação de código
- Facilidade para corrigir quebra de seletor
- Maior legibilidade dos testes

### 3) `flow/` (orquestração)
Camada de fluxo que combina ações de páginas para representar operações de negócio, por exemplo:

- `realizarLogin`
- `realizarCadastro`
- `editarDetalhesConta`
- `editarEnderecoEntrega`
- `adicionarProdutoCarrinho`

### 4) `e2e/` (especificações)
Contém os testes finais com asserções, mantendo foco no comportamento esperado.

## Cenários implementados

### Cadastro (`cadastroTest.cy.js`)

- Cadastro válido
- Cadastro com dados inválidos (matriz de casos)

### Login (`loginTest.cy.js`)

- Login válido
- Senha inválida
- Usuário inválido
- Usuário e senha inválidos
- Campos obrigatórios ausentes

### Detalhes da conta (`detalhesContaTest.cy.js`)

- Atualização de dados pessoais com sucesso
- Alteração de senha com validação de novo login
- Validações com dados inválidos

### Endereço (`enderecoTest.cy.js`)

- Atualização de endereço de entrega (sucesso e falhas)
- Atualização de endereço de faturamento (sucesso e falhas)
- Validação de ausência de campos e formatos inválidos

### Carrinho (`carrinhoTest.cy.js`)

- Adição de 1 produto e validação de total
- Adição de múltiplos itens e soma total
- Remoção de item e validação de carrinho vazio

## Configuração atual do Cypress

No `cypress.config.js`:

- `baseUrl`: `http://lojaebac.ebaconline.art.br/`
- Reporter: `mochawesome`
- Diretório de saída de relatório: `cypress/reports/mocha`

## Como executar localmente

1. Instale dependências:

```bash
npm install
```

2. Executar em modo headless:

```bash
npm run test
```

3. Abrir runner interativo:

```bash
npm run open
```

4. Executar e gerar relatório consolidado:

```bash
npm run test:report
```

## Relatórios

Com `npm run test:report`, o fluxo é:

1. Limpa relatórios antigos
2. Executa os testes
3. Consolida JSONs
4. Gera HTML

Saída esperada:

- `cypress/reports/report.json`
- `cypress/reports/html/report.html`

## Boas práticas aplicadas

- Separação em camadas (`data`, `page`, `flow`, `e2e`)
- Reuso de fluxo para reduzir duplicação
- Massa dinâmica para evitar conflito de cadastro (`Utils`)
- Cobertura de cenários positivos e negativos
