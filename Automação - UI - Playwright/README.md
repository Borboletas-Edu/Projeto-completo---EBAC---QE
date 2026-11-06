# Automação UI - Playwright (Python)

Testes end-to-end da interface web da EBAC-SHOP com **Playwright** (API síncrona) e **Pytest**, organizados em Page Objects e massa de dados separada.

## Objetivo

Validar os principais fluxos do cliente na loja, com cenários positivos e negativos:

- Cadastro de cliente
- Login (incluindo bloqueio após tentativas inválidas)
- Edição dos detalhes da conta
- Edição de endereços (entrega e faturamento)
- Adição e remoção de produtos no carrinho

## Stack

| Ferramenta | Uso |
|---|---|
| Playwright `1.58.0` | Automação do navegador (Chromium) |
| Pytest `9.0.2` | Execução, fixtures, marcadores e parametrização |
| Faker | Geração de e-mails e senhas únicos |
| python-dotenv | Leitura do `.env` |
| allure-pytest | Resultados para o relatório Allure |
| pytest-sugar | Saída de terminal mais legível |

## Pré-requisitos

- Python 3.10+ (a pipeline usa Python 3.12)
- pip
- Node.js e Java (apenas para abrir o relatório Allure localmente)

## Estrutura do projeto

```text
.
├── dados/                       # massa de dados para parametrização
│   ├── dados_cadastro.py
│   ├── dados_detalhes_conta.py
│   ├── dados_enderecos.py
│   ├── dados_login.py
│   └── dados_produtos.py
├── page_objects/                # seletores e ações por página
│   ├── page_carrinho.py
│   ├── page_minha_conta.py
│   └── page_produto.py
├── testes/                      # cenários de teste
│   ├── teste_cadastro.py
│   ├── teste_carrinho.py
│   ├── teste_detalhes_conta.py
│   ├── teste_endereco.py
│   └── teste_login.py
├── conftest.py                  # fixture `page` e leitura da BASE_URL
├── pytest.ini                   # marcadores e opções padrão
├── requirements.txt
├── Utils.py                     # geração de e-mail/senha e leitura de alertas
└── .env.example
```

## Configuração do ambiente

Copie `.env.example` para `.env` (não versionado) e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `BASE_URL` | URL base da loja (`http://` é assumido se não houver esquema) | `lojaebac.ebaconline.art.br` |
| `UI_USUARIO` | Usuário válido usado nos testes de login | — |
| `UI_SENHA` | Senha desse usuário | — |

A `BASE_URL` é lida em `conftest.py` e as credenciais em `dados/dados_login.py`. Sem essas variáveis os testes não executam.

## Instalação

```bash
pip install -r requirements.txt
python -m playwright install chromium
```

## Como executar

| Comando | O que faz |
|---|---|
| `pytest` | Executa toda a suíte |
| `pytest -m login` | Executa por marcador (`login`, `cadastro`, `carrinho`, `detalhesConta`, `endereco`) |
| `pytest testes/teste_carrinho.py` | Executa um arquivo |

## Relatórios

O `pytest.ini` já gera os resultados do **Allure** a cada execução (`--alluredir=allure-results --clean-alluredir`). Para abrir:

```bash
npx allure-commandline serve allure-results
```

Se o terminal for o VS Code instalado via Snap e aparecer erro de `libpthread/GLIBC_PRIVATE`:

```bash
env -u SNAP -u SNAP_NAME -u SNAP_REVISION -u SNAP_ARCH -u SNAP_COOKIE -u GTK_PATH -u GTK_MODULES npx allure-commandline serve allure-results
```

A pasta `allure-results/` não é versionada.

## Cenários cobertos

Total: **36 cenários** (contando cada combinação de `@pytest.mark.parametrize`).

| Arquivo | Marcador | Cenários | Qtd. |
|---|---|---|---|
| `teste_cadastro.py` | `cadastro` | Cadastro válido; dados inválidos; e-mail já cadastrado | 6 |
| `teste_login.py` | `login` | Login válido; credenciais inválidas; bloqueio após 3 tentativas | 8 |
| `teste_detalhes_conta.py` | `detalhesConta` | Dados pessoais válidos e inválidos; troca de senha válida e inválida | 4 |
| `teste_endereco.py` | `endereco` | Faturamento e entrega: dados válidos e campos obrigatórios ausentes | 15 |
| `teste_carrinho.py` | `carrinho` | Adicionar produto; adicionar e remover; adicionar variações | 3 |

## Padrões e boas práticas

- **Page Object Model:** seletores e ações isolados em `page_objects/`.
- **Testes orientados a dados:** `@pytest.mark.parametrize` com massas em `dados/`.
- **Massa dinâmica:** e-mails e senhas únicos (`Utils.py`); os testes de carrinho criam um usuário novo para começar com o carrinho vazio.
- **Asserções:** `expect` do Playwright (com espera automática) e `assert` simples quando apropriado.

## Integração contínua

Job **E2E - Playwright** do workflow [`qa.yml`](../.github/workflows/qa.yml): instala as dependências e o Chromium, executa `pytest` e publica `allure-results` como artefato `playwright-allure-results`.

| Variável no job | Secret |
|---|---|
| `BASE_URL` | `BASE_URL` |
| `UI_USUARIO` | `UI_USUARIO` |
| `UI_SENHA` | `UI_SENHA` |

## Limitações e pontos de atenção

- `teste_bloqueio_login` falha por um defeito da aplicação (BUG-001 no documento: o login não é bloqueado após 3 tentativas).
- A fixture `page` abre um navegador novo por teste, o que deixa a suíte mais lenta (cerca de 4 minutos).
