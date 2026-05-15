import Request from "../../utils/Request.js";
import { check } from "k6";

export const options = {
  stages: [
    {duration: '5s', target: 20},
    {duration: '20s', target: 20},
    {duration: '10s', target: 10},
  ]
};

const url = "http://lojaebac.ebaconline.art.br/public/addUser";

export default function () {
  const unique = `${__VU}_${__ITER}_${Date.now()}`;
  
  const res = Request.post(url, {
    email: `user_${unique}@test.com`,
    password: `Senha@${unique}`,
  });

  check(res, {
    "status é igual a 200": (r) => {
      const ok = r.status === 200;
      if (!ok) console.log(`Erro status: ${r.status} | body: ${r.body}`);
      return ok;
    },
    "mensagem de retorno está correta": (r) => {
      const body = r.json();
      return body.message === "User added";
    },
  });
}
