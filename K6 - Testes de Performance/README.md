# K6 - Testes de Performance

Projeto de testes de performance com K6 para os fluxos de `login` e `cadastro`.

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

## Padrão dos testes

- `data/`: massa de dados reutilizável (ex.: usuários de login)
- `utils/Request.js`: camada simples para métodos HTTP (`get`, `post`, `put`)
- `tests/`: cenários por tipo de carga:
  - `load`: subida gradual e estabilização
  - `spike`: pico abrupto de usuários
  - `stress`: carga acima do normal para achar limite

## Boas práticas usadas

- Reuso de payload por função (`usuariosLogin`)
- Uso de `check()` para validar status e mensagem de resposta
- Geração de dados dinâmicos para cadastro, evitando conflito de usuário já existente

## Observações importantes

- Em K6, `duration` de `stages` precisa de unidade (`s`, `m`), por exemplo: `"5s"`.
- Erros como `invalid character '<'` indicam que a API devolveu HTML (e não JSON), geralmente por erro, redirecionamento ou resposta intermediária.
- Para endpoints autenticados, prefira separar claramente a estratégia de token (ex.: autenticar uma vez e reutilizar quando fizer sentido no cenário).

## Evolução e escala

- Com a adoção de variáveis de ambiente (`.env`), o projeto pode escalar para execução em múltiplos ambientes (ex.: `dev`, `hml`, `prod`) sem alterar os arquivos de teste.
- A criação de uma camada dedicada de coleta de token (e reutilização controlada) permite construir cenários mais complexos, com autenticação desacoplada do fluxo principal de carga.
- Com o escalar do projeto, ele pode ser integrado ao Grafana para geração de relatórios e acompanhamento contínuo dos indicadores de performance.
