# Gherkin - Critérios de Aceite e Casos de Teste

Escrita em Gherkin (BDD, em português) das 8 histórias de usuário do projeto EBAC-SHOP, organizada em duas pastas:

| Pasta | O que contém | Seção do documento |
|---|---|---|
| `Critérios de Aceite/` | Critérios de aceitação de cada história (o que a funcionalidade deve fazer) | 4.2 |
| `Casos de Teste/` | Os 49 casos de teste, um cenário por caso (como e o que será testado) | 4.3 |

Os arquivos `.feature` são documentação: não são executados por um runner Cucumber. Os testes automatizados são código (Cypress, Playwright, Supertest e Pytest), e a tag `@automatizado` indica que o caso possui um teste equivalente em código.

## Histórias

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


## Padrão

- `# language: pt` no início de cada arquivo;
- `Contexto` para o pré-requisito comum;
- `Esquema do Cenário` + `Exemplos` para variações de dados (partição de equivalência e valor limite);
- Cada história possui ao menos 4 critérios de aceite.

## Tags dos casos de teste

O título de cada cenário começa com o ID do caso (ex.: `CT-US0001-01 - Adicionar um produto ao carrinho`), igual ao do documento. Cada um recebe tags para filtrar e rastrear:

- `@CT-US0001-01`: ID do caso;
- `@feliz`, `@alternativo` ou `@negativo`: tipo de fluxo;
- `@automatizado` ou `@manual`: situação da automação (nem todos os casos estão automatizados);
- `@RN01`...: regra de negócio validada (histórias US001 a US005);
- `@valor-limite`, `@particao-de-equivalencia`, `@tabela-de-decisao`, `@transicao-de-estado`: técnica aplicada, quando houver.


