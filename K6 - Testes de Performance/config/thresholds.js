// Critérios de aceite de performance por tipo de teste.
export const thresholds = {
  load: {
    http_req_failed: ["rate<0.05"],                    // menos de 5% de erros
    http_req_duration: ["p(95)<8000", "p(99)<10000"], // 95% abaixo de 8s e 99% abaixo de 10s
    checks: ["rate>0.95"],                             // mais de 95% dos checks aprovados
  },
  spike: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<15000"],
    checks: ["rate>0.90"],
  },
  stress: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<15000"],
    checks: ["rate>0.90"],
  },
};
