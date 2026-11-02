import { usuarios, senha } from "../config/env.js";

export function  usuariosLogin(){
    return { email: usuarios[__ITER % usuarios.length], password: senha }
}
