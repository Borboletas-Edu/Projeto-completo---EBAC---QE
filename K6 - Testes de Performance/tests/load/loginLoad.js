import { baseUrl } from "../../config/env.js";
import { thresholds } from "../../config/thresholds.js";
import { usuarioLogin } from "../../data/loginPayload.js";
import Request from "../../utils/Request.js";
import { check } from "k6";

export const options = {
  thresholds: thresholds.load,
  // Requisito do TCC: 20 usuários virtuais, 2 minutos de execução e rampup de 20 segundos
  stages: [
    {duration: '20s', target: 20},
    {duration: '1m40s', target: 20},
  ]
};

const url = `${baseUrl}/public/authUser`;

export default function () {
  const user = usuarioLogin()

  const res = Request.post(url, {
    email: user.email,
    password: user.password,
  });

  check(res, {
    "status é igual a 200": (r) => {
      const ok = r.status === 200;
      if (!ok) console.log(`Erro status: ${r.status} | body: ${r.body}`);
      return ok;
    },
    "mensagem de retorno está correta": (r) => {
      const body = r.json();
      return body.message === "login successfully";
    },
  });
}
