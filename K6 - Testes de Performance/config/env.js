function obrigatoria(nome) {
  const valor = (__ENV[nome] || "").trim();
  if (!valor) {
    throw new Error(`A variável de ambiente ${nome} não foi definida`);
  }
  return valor;
}

function normalizarBaseUrl(url) {
  const semBarra = url.replace(/\/+$/, "");
  return /^https?:\/\//.test(semBarra) ? semBarra : `http://${semBarra}`;
}

export const baseUrl = normalizarBaseUrl(obrigatoria("BASE_URL"));
export const usuario = obrigatoria("K6_USUARIO");
export const senha = obrigatoria("K6_SENHA");
