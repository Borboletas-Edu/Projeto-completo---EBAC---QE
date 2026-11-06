# Testes de Performance - K6

Testes de performance da EBAC-SHOP com **K6**, cobrindo os fluxos de **login** (`POST /public/authUser`) e **cadastro de usuário** (`POST /public/addUser`) nos cenários de carga (load), pico (spike) e estresse (stress).

## Objetivo

- Medir tempo de resposta e taxa de erro dos endpoints de login e cadastro;
- Atender ao perfil exigido no TCC para o teste de carga: 20 usuários virtuais, 2 minutos de execução e rampup de 20 segundos;
- Falhar a execução automaticamente quando os limites de desempenho (thresholds) forem violados.

## Stack

| Ferramenta | Uso |
|---|---|
| K6 | Execução dos scripts de carga (JavaScript) |
| K6 Web Dashboard | Relatório HTML nativo |
| dotenv-cli | Carrega o `.env` nos scripts do `npm run` |
| Node.js / npm | Execução dos scripts do `package.json` |

## Pré-requisitos

- K6 instalado: https://grafana.com/docs/k6/latest/set-up/install-k6/
- Node.js 20+ e npm (a pipeline usa Node 22)

## Estrutura do projeto

```text
.
├── config/
│   ├── env.js                   # leitura e validação das variáveis de ambiente
│   └── thresholds.js            # limites de desempenho por tipo de teste
├── data/
│   └── loginPayload.js          # usuário e senha de login
├── tests/
│   ├── load/
│   │   ├── cadastroLoad.js
│   │   └── loginLoad.js
│   ├── spike/
│   │   ├── cadastroSpike.js
│   │   └── loginSpike.js
│   └── stress/
│       ├── cadastroStress.js
│       └── loginStress.js
├── utils/
│   └── Request.js               # camada HTTP (get, post, put)
├── package.json
└── .env.example
```

## Configuração do ambiente

Copie `.env.example` para `.env` (não versionado) e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `BASE_URL` | URL base da loja | `http://lojaebac.ebaconline.art.br` |
| `K6_USUARIO` | Usuário usado nos testes de login | `user1_ebac` |
| `K6_SENHA` | Senha desse usuário | — |

O K6 não lê `.env` sozinho; por isso os scripts do `npm run` usam `dotenv -- k6 run ...`.

## Instalação

```bash
npm install
```

## Como executar

| Comando | Cenário |
|---|---|
| `npm run test:login:load` | Login - carga |
| `npm run test:login:spike` | Login - pico |
| `npm run test:login:stress` | Login - estresse |
| `npm run test:cadastro:load` | Cadastro - carga |
| `npm run test:cadastro:spike` | Cadastro - pico |
| `npm run test:cadastro:stress` | Cadastro - estresse |

## Relatórios

Cada script gera um relatório HTML do **K6 Web Dashboard** em `reports/<fluxo>-<cenario>.html` (ex.: `reports/login-load.html`). Durante a execução, o dashboard ao vivo fica em `http://localhost:5665`. A pasta `reports/` não é versionada.

```bash
xdg-open reports/login-load.html
```

## Cenários cobertos

Total: **6 scripts** (2 fluxos × 3 tipos de carga). Cada iteração valida com `check()` o status 200 e a mensagem de retorno.

| Tipo | Estágios | Pico de VUs |
|---|---|---|
| `load` | 20 s subindo até 20 VUs + 1 min 40 s mantendo 20 VUs | 20 |
| `spike` | 10 → 80 VUs em 5 s, 20 s em 80 VUs, queda para 0 | 80 |
| `stress` | Degraus de 20 em 20 VUs a cada 20 s até 80, queda para 0 | 80 |

### Thresholds

Definidos em `config/thresholds.js`. Se algum limite for violado, o K6 encerra com código `99` e a execução falha.

| Tipo | `http_req_failed` | `http_req_duration` | `checks` |
|---|---|---|---|
| `load` | < 5% | p(95) < 8 s e p(99) < 10 s | > 95% |
| `spike` | < 10% | p(95) < 15 s | > 90% |
| `stress` | < 10% | p(95) < 15 s | > 90% |

Os limites foram calibrados com execuções reais contra a loja (no load com 20 VUs: p(95) ≈ 6,6 s e p(99) ≈ 7,6 s).

## Padrões e boas práticas

- **Configuração centralizada:** variáveis em `config/env.js` (falha com mensagem clara se faltar alguma) e limites em `config/thresholds.js`.
- **Camada HTTP:** `utils/Request.js` isola as chamadas do K6.
- **Massa dinâmica no cadastro:** e-mail e senha únicos por VU e iteração, evitando conflito de usuário existente.

## Integração contínua

Job **Performance - K6** do workflow [`qa.yml`](../.github/workflows/qa.yml): instala o K6 (`grafana/setup-k6-action`) e as dependências npm, executa os 6 cenários (cada um roda mesmo que o anterior falhe) e publica `reports/` como artefato `k6-reports`.

| Variável no job | Secret |
|---|---|
| `BASE_URL` | `BASE_URL` |
| `K6_USUARIO` | `K6_USUARIO` |
| `K6_SENHA` | `K6_SENHA` |

## Limitações e pontos de atenção

- Os testes de login usam apenas o `user1_ebac`; os demais usuários fornecidos retornaram erro 400 na validação do endpoint.
- Os thresholds de spike e stress ainda não foram calibrados com uma execução real.
- Os testes de cadastro criam usuários reais na loja de testes a cada execução.
