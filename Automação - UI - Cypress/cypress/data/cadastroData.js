import Utils from "../support/Utils"

export const cadastroDadosValidos = {
    nomeTeste: "Cadastro valido",
        input: {
            usuario: Utils.criarEmail(),
            senha: Utils.criarSenha()
        }
}

export const cadastroDadosInvalidos = [
    {
        nomeTeste: "Cadastro sem usuario",
        input: {
            usuario: "",
            senha: Utils.criarSenha()
        },
        mensagemErro: "Informe um endereço de e-mail válido."
    },
    {
        nomeTeste: "Cadastro sem senha",
        input: {
            usuario: Utils.criarEmail(),
            senha: ""
        },
        mensagemErro: "Digite a senha da conta."
    },
    {
        nomeTeste: "Cadastro sem email e senha",
        input: {
            usuario: "",
            senha: ""
        },
        mensagemErro: "Informe um endereço de e-mail válido."
    }
]

// O campo de e-mail é <input type="email">: o próprio navegador bloqueia o envio
// do formulário (validação nativa do HTML5), então não há mensagem do WooCommerce.
export const cadastroEmailFormatoInvalido = {
    nomeTeste: "Cadastro com e-mail inválido",
    input: {
        usuario: "emailInvalido",
        senha: Utils.criarSenha()
    }
}