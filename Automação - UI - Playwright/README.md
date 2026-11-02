# Automação UI - Playwright (Python)

Projeto de automação de testes E2E para a loja EBAC usando **Playwright + Pytest**, com organização em **Page Objects** e dados de teste separados.

## Stack
- Python 3.11+
- Playwright (sync API)
- Pytest
- Allure (`allure-pytest` + `allure-commandline`)
- Faker

## Configuração de ambiente
Copie `.env.example` para `.env` (não versionado) e preencha:

```env
BASE_URL=lojaebac.ebaconline.art.br   # URL base da loja (http:// é assumido se não houver esquema)
UI_USUARIO=                           # usuário válido usado nos testes de login
UI_SENHA=                             # senha desse usuário
```

A `BASE_URL` é lida em `conftest.py` e as credenciais em `dados/dados_login.py`. Sem essas variáveis os testes não executam.

## Estrutura do projeto
- `testes/`: cenários de teste
- `page_objects/`: classes com ações e seletores das páginas
- `dados/`: massa de dados para parametrização
- `Utils.py`: utilitários compartilhados (ex.: geração de e-mail/senha e alerta)
- `conftest.py`: fixture `page` e configuração de execução
- `pytest.ini`: marcadores e opções padrão do Pytest

## Instalação
```bash
pip install -r requirements.txt
python -m playwright install chromium
```

## Como executar
Rodar toda a suíte:
```bash
pytest
```

Rodar por marcador:
```bash
pytest -m login
pytest -m cadastro
pytest -m carrinho
pytest -m detalhesConta
```

Rodar um arquivo específico:
```bash
pytest testes/teste_carrinho.py
```

## Relatório Allure
O projeto já está configurado no `pytest.ini` para gerar resultados do Allure automaticamente a cada execução:
- `--alluredir=allure-results`
- `--clean-alluredir`

Depois de rodar os testes (`pytest`), abra o relatório com:
```bash
npx allure-commandline serve allure-results
```

Se o terminal estiver no VS Code Snap e aparecer erro de `libpthread/GLIBC_PRIVATE`, use:
```bash
env -u SNAP -u SNAP_NAME -u SNAP_REVISION -u SNAP_ARCH -u SNAP_COOKIE -u GTK_PATH -u GTK_MODULES npx allure-commandline serve allure-results
```

## Marcadores disponíveis
Definidos em `pytest.ini`:
- `login`
- `cadastro`
- `carrinho`
- `detalhesConta`
- `endereco`

## Fluxos cobertos atualmente
- Login válido, inválido e bloqueio
- Cadastro válido, inválido e com e-mail repetido
- Edição de detalhes da conta (dados pessoais e troca de senha)
- Carrinho:
  - Adicionar produto único
  - Adicionar e remover produto
  - Adicionar variações múltiplas de produto
  - Cadastro de endereço válido e inválido
  
## Dados de teste
As massas ficam em `dados/`:
- `dados_login.py`
- `dados_cadastro.py`
- `dados_detalhes_conta.py`
- `dados_produtos.py`

Exemplo (produto/carrinho):
- `PRODUTO_UNICO = [("XS", "Blue", 1)]`
- `VARIACOES_PRODUTO = [("S", "Green", 1), ...]`

## Boas práticas adotadas
- Reuso com Page Object Model
- Parametrização com `@pytest.mark.parametrize`
- Massa de dados desacoplada dos testes
- Uso de `expect` (Playwright) e `assert` simples quando apropriado

```
