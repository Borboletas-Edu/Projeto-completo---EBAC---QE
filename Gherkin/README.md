# Gherkin - Critérios de Aceitação

Critérios de aceitação em linguagem Gherkin (BDD, em português) para as histórias de usuário do projeto EBAC-SHOP.

## Arquivos

| Arquivo | História | Funcionalidade |
|---|---|---|
| `carrinho.feature` | US-0001 | Adicionar item ao carrinho |
| `login.feature` | US-0002 | Login na plataforma |
| `apiCupons.feature` | US-0003 | API de cupons |
| `catalogoProdutos.feature` | US001 | Catálogo de produtos |
| `painelMinhaConta.feature` | US002 | Painel Minha Conta |
| `meusPedidos.feature` | US003 | Meus pedidos |
| `enderecos.feature` | US004 | Endereços |
| `detalhesConta.feature` | US005 | Detalhes da conta |

As histórias US001 a US005 foram escritas para este trabalho, com as regras de negócio (RN01, RN02...) descritas no documento do TCC. Cada cenário recebe a tag da regra que valida (ex.: `@RN04`). Cada arquivo traz o formato **Como / Quero / Para** no cabeçalho.

## Padrão

- `# language: pt` no início de cada arquivo;
- `Contexto` para o pré-requisito comum;
- `Esquema do Cenário` + `Exemplos` para variações de dados (partição de equivalência e valor limite);
- Cada história possui ao menos 4 cenários, incluindo caminho feliz, alternativo e negativo.

## Observação

As mensagens de erro de Endereços e Detalhes da conta seguem as regras RN01 do documento e os testes de UI. Os cenários de Catálogo, Painel e Meus Pedidos descrevem o comportamento esperado e devem ser confirmados na execução manual.
