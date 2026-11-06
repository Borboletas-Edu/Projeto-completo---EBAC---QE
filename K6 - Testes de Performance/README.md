# Automação Performance - K6

Projeto de testes de performance para a loja EBAC usando **K6**, cobrindo os fluxos de `login` e `cadastro` com cenários de `load`, `spike` e `stress`.

## Stack
- K6 (scripts em JavaScript)
- Node.js (execução via `npm run`)
- K6 Web Dashboard (relatório HTML nativo do K6)
- Faker (`@faker-js/faker`)
- dotenv-cli (carrega o `.env` nos scripts do `npm run`)

## Variáveis de ambiente
Os scripts leem as variáveis via `config/env.js` (`__ENV`). Veja `.env.example`:

| Variável | Uso |
|---|---|
| `BASE_URL` | URL base da loja (ex.: `http://lojaebac.ebaconline.art.br`) |
| `K6_USUARIO` | usuário de login (ex.: `user1_ebac`) |
| `K6_SENHA` | senha do usuário acima |

O K6 não carrega `.env` sozinho, por isso os scripts do `npm run` usam o [`dotenv-cli`](https://www.npmjs.com/package/dotenv-cli) (`dotenv -- k6 run ...`) para carregar o `.env` antes de chamar o `k6`. Basta instalar as dependências, copiar o `.env.example` para `.env`, preencher e rodar:
```bash
npm install
cp .env.example .env
npm run test:login:load
```
Na pipeline não existe `.env`: as variáveis vêm dos secrets do GitHub.

## Estrutura

```text
.
├── config/
│   ├── env.js
│   └── thresholds.js
├── data/
│   └── loginPayload.js
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
├── reports/            # relatórios HTML gerados a cada execução
├── utils/
│   └── Request.js
├── .env.example
└── package.json
```

## Pré-requisitos

- Node.js instalado (para usar `npm run`)
- K6 instalado na máquina

Instalação do K6:

- Linux/macOS/Windows: https://grafana.com/docs/k6/latest/set-up/install-k6/

## Como executar

Executar os scripts pelo `package.json`:

```bash
npm run test:login:load
npm run test:login:spike
npm run test:login:stress

npm run test:cadastro:load
npm run test:cadastro:spike
npm run test:cadastro:stress
```

## Relatório HTML (K6 Web Dashboard)
O K6 não usa Allure. O projeto já está configurado nos scripts do `package.json` para gerar um relatório HTML a cada execução (`--out web-dashboard=export=reports/<cenario>.html`).

Depois de rodar um teste, abra o arquivo gerado no navegador, por exemplo:
```bash
xdg-open reports/login-load.html
```

Relatórios gerados:
- `reports/login-load.html`, `reports/login-spike.html`, `reports/login-stress.html`
- `reports/cadastro-load.html`, `reports/cadastro-spike.html`, `reports/cadastro-stress.html`

Para acompanhar ao vivo durante a execução, o dashboard fica em `http://localhost:5665`.

A pasta `reports/` está no `.gitignore`.

## Padrão dos testes

- `data/`: massa de dados reutilizável (ex.: usuário de login)
- `utils/Request.js`: camada simples para métodos HTTP (`get`, `post`, `put`)
- `tests/`: cenários por tipo de carga:
  - `load`: subida gradual e estabilização (perfil exigido no TCC: 20 usuários virtuais, 2 minutos no total e rampup de 20 segundos)
  - `spike`: pico abrupto de usuários
  - `stress`: carga acima do normal para achar limite


## Thresholds (critérios de aceite)
Definidos em `config/thresholds.js` e aplicados em todos os cenários. Se algum limite for violado, o K6 encerra com código `99` e a execução (local ou na pipeline) falha.

| Tipo | `http_req_failed` | `http_req_duration` | `checks` |
|---|---|---|---|
| `load` | < 5% | p(95) < 8s e p(99) < 10s | > 95% |
| `spike` | < 10% | p(95) < 15s | > 90% |
| `stress` | < 10% | p(95) < 15s | > 90% |

Os limites foram calibrados com base nas execuções reais contra a loja (no load com 20 VUs, p(95) ≈ 6,6s e p(99) ≈ 7,6s).

## Boas práticas usadas

- Reuso de payload por função (`usuarioLogin`)
- Uso de `check()` para validar status e mensagem de resposta
- Geração de dados dinâmicos para cadastro, evitando conflito de usuário já existente
