# Automação Performance - K6

Projeto de testes de performance para a loja EBAC usando **K6**, cobrindo os fluxos de `login` e `cadastro` com cenários de `load`, `spike` e `stress`.

## Stack
- K6 (scripts em JavaScript)
- Node.js (execução via `npm run`)
- K6 Web Dashboard (relatório HTML nativo do K6)
- Faker (`@faker-js/faker`)

## URL base
Os cenários usam a API da loja configurada em cada script:
- `http://lojaebac.ebaconline.art.br`

## Estrutura

```text
.
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

- `data/`: massa de dados reutilizável (ex.: usuários de login)
- `utils/Request.js`: camada simples para métodos HTTP (`get`, `post`, `put`)
- `tests/`: cenários por tipo de carga:
  - `load`: subida gradual e estabilização (perfil exigido no TCC: 20 usuários virtuais, 2 minutos no total e rampup de 20 segundos)
  - `spike`: pico abrupto de usuários
  - `stress`: carga acima do normal para achar limite


## Boas práticas usadas

- Reuso de payload por função (`usuariosLogin`)
- Uso de `check()` para validar status e mensagem de resposta
- Geração de dados dinâmicos para cadastro, evitando conflito de usuário já existente
