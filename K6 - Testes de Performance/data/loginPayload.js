import { usuario, senha } from "../config/env.js";

export function usuarioLogin() {
    return { email: usuario, password: senha }
}
