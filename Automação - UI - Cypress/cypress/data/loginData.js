import Utils from "../support/Utils";

export const loginSemCamposObrigatorios = [
    {
        nomeTeste: "Login sem senha",
        input: {
        usuario: "admin",
        senha: ""
        },
        mensagemErro: "O campo da senha está vazio"
    },
    {
       nomeTeste: "Login sem usuario",
        input: {
        usuario: "",
        senha: "admin123"
        },
        mensagemErro: "Nome de usuário é obrigatório." 
    }, 
    {
       nomeTeste: "Login sem senha e usuario",
        input: {
        usuario: "",
        senha: ""
        },
        mensagemErro: "Nome de usuário é obrigatório." 
    }

]
