import Utils from "../support/Utils"

const primeiroNome = "PrimeiroNomeTeste"
const ultimoNome = "UltimoNomeTeste"
const nomeExibicao = "NomeExibicaoTeste"
const senhaAtual = "Senh@Forte!01"
const senhaNova = "Senh@Nova!02"


export const detalhes_pessoais_validos = {
    nomeTeste: "Atualizar dados pessoais com dados validos",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome:ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: senhaAtual,
        senhaNova: senhaNova,
        senhaNovaConfirmacao: senhaNova
    }
    }

export const atualizar_senha_dados_validos = {
    nomeTeste: "Atualizar dados pessoais com dados validos",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome:ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: senhaAtual,
        senhaNova: senhaNova,
        senhaNovaConfirmacao: senhaNova
    }
    }

export const detalhes_pessoais_invalidos = [
    {
    nomeTeste: "Atualizar dados pessoas sem informar primeiro nome",
    input: {
        primeiroNome: "",
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: "",
        senhaNova: "",
        senhaNovaConfirmacao: "Nome é um campo obrigatório."
    },
    mensagemErro: ""
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar ultimo nome",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: "",
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: "",
        senhaNova: "",
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Sobrenome é um campo obrigatório."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar nome exibicao",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: "",
        email: Utils.criarEmail(),
        senhaAtual: "",
        senhaNova: "",
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Nome de exibição é um campo obrigatório."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar email",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: "",
        senhaAtual: "",
        senhaNova: "",
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Endereço de e-mail é um campo obrigatório."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar senha atual",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: "",
        senhaNova: senhaNova,
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Digite sua senha atual."
    },
    {
    nomeTeste: "Atualizar dados pessoas informando senha atual errada",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: "SenhaErrada01",
        senhaNova: senhaNova,
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Sua senha atual está incorreta."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar nova senha",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: senhaAtual,
        senhaNova: "",
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "As novas senhas não são iguais."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar confirmação da nova senha",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: senhaAtual,
        senhaNova: senhaNova,
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Informe sua senha novamente."
    },
    {
    nomeTeste: "Atualizar dados pessoas sem informar senh nova e confirmação",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        nomeExibicao: nomeExibicao,
        email: Utils.criarEmail(),
        senhaAtual: senhaAtual,
        senhaNova: "",
        senhaNovaConfirmacao: ""
    },
    mensagemErro: "Preencha todos os campos de senha."
    }


]
