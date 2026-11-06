# Gherkin - Critérios de Aceite e Casos de Teste

Escrita em Gherkin (BDD, em português) dos critérios de aceite e dos 49 casos de teste das 8 histórias de usuário da EBAC-SHOP.

## Objetivo

- Registrar, em linguagem de negócio, o que cada funcionalidade deve fazer (critérios de aceite);
- Detalhar como cada funcionalidade será testada (casos de teste), com rastreabilidade até a regra de negócio, o tipo de fluxo, a técnica e a situação da automação.

Os arquivos `.feature` são documentação: não são executados por um runner Cucumber. Os testes automatizados estão nos projetos Cypress, Playwright, Supertest e Pytest, e a tag `@automatizado` indica que o caso possui um teste equivalente em código.

## Estrutura do projeto

```text
.
├── Critérios de Aceite/         # o que a funcionalidade deve fazer (seção 2.2 do documento)
│   ├── apiCupons.feature
│   ├── carrinho.feature
│   ├── catalogoProdutos.feature
│   ├── detalhesConta.feature
│   ├── enderecos.feature
│   ├── login.feature
│   ├── meusPedidos.feature
│   └── painelMinhaConta.feature
└── Casos de Teste/              # um cenário por caso de teste (seção 2.3 do documento)
    ├── casosApiCupons.feature
    ├── casosCarrinho.feature
    ├── casosCatalogoProdutos.feature
    ├── casosDetalhesConta.feature
    ├── casosEnderecos.feature
    ├── casosLogin.feature
    ├── casosMeusPedidos.feature
    └── casosPainelMinhaConta.feature
```

## Cenários cobertos

| História | Funcionalidade | Critérios de Aceite | Casos de Teste | Casos |
|---|---|---|---|---|
| US-0001 | Adicionar item ao carrinho | `carrinho.feature` | `casosCarrinho.feature` | 6 |
| US-0002 | Login na plataforma | `login.feature` | `casosLogin.feature` | 6 |
| US-0003 | API de cupons | `apiCupons.feature` | `casosApiCupons.feature` | 8 |
| US001 | Catálogo de produtos | `catalogoProdutos.feature` | `casosCatalogoProdutos.feature` | 6 |
| US002 | Painel Minha Conta | `painelMinhaConta.feature` | `casosPainelMinhaConta.feature` | 5 |
| US003 | Meus pedidos | `meusPedidos.feature` | `casosMeusPedidos.feature` | 6 |
| US004 | Endereços | `enderecos.feature` | `casosEnderecos.feature` | 6 |
| US005 | Detalhes da conta | `detalhesConta.feature` | `casosDetalhesConta.feature` | 6 |
| **Total** | | | | **49** |

## Padrões e boas práticas

- `# language: pt` no início de cada arquivo;
- `Contexto` para o pré-requisito comum;
- `Esquema do Cenário` + `Exemplos` para variações de dados (partição de equivalência e valor limite);
- Cada história possui ao menos 4 critérios de aceite;
- O título de cada caso começa com o ID usado no documento (ex.: `CT-US0001-01 - Adicionar um produto ao carrinho`).

### Tags dos casos de teste

| Tag | Significado |
|---|---|
| `@CT-US0001-01` | ID do caso |
| `@feliz`, `@alternativo`, `@negativo` | Tipo de fluxo |
| `@automatizado`, `@manual` | Situação da automação |
| `@RN01`... | Regra de negócio validada (histórias US001 a US005) |
| `@valor-limite`, `@particao-de-equivalencia`, `@tabela-de-decisao`, `@transicao-de-estado` | Técnica aplicada, quando houver |
