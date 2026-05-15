import { usuariosLogin } from "../../data/loginPayload.js";
import Request from "../../utils/Request.js";
import { check } from "k6";

export const options = {
  stages: [
    {duration: '20s', target: 20},
    {duration: '20s', target: 40},
    {duration: '20s', target: 60},
    {duration: '20s', target: 80},
    {duration: '10s', target: 0},
  ]
};

const url = "http://lojaebac.ebaconline.art.br/public/authUser";

export default function () {
  const user = usuariosLogin()

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
