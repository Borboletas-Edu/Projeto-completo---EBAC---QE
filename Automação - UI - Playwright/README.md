# Automação UI - Playwright (Python)

Projeto de automação de testes E2E para a loja EBAC usando **Playwright + Pytest**, com organização em **Page Objects** e dados de teste separados.

## Stack
- Python 3.11+
- Playwright (sync API)
- Pytest
- Faker

## URL base
A suíte usa a base URL configurada em `conftest.py`:
- `http://lojaebac.ebaconline.art.br`

## Estrutura do projeto
- `testes/`: cenários de teste
- `page_objects/`: classes com ações e seletores das páginas
- `dados/`: massa de dados para parametrização
- `Utils.py`: utilitários compartilhados (ex.: geração de e-mail/senha e alerta)
- `conftest.py`: fixture `page` e configuração de execução
- `pytest.ini`: marcadores e opções padrão do Pytest

## Instalação
```bash
pip install pytest playwright Faker pytest-sugar
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

## Marcadores disponíveis
Definidos em `pytest.ini`:
- `login`
- `cadastro`
- `carrinho`
- `detalhesConta`

## Fluxos cobertos atualmente
- Login válido, inválido e bloqueio
- Cadastro válido, inválido e com e-mail repetido
- Edição de detalhes da conta (dados pessoais e troca de senha)
- Carrinho:
  - Adicionar produto único
  - Adicionar e remover produto
  - Adicionar variações múltiplas de produto

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
