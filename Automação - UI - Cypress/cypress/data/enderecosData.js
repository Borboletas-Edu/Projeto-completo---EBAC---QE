const primeiroNome = "PrimeiroNomeTeste"
const ultimoNome = "UltimoNomeTeste"
const empresaNome = "EmpresaNomeTeste"
const pais = "Brasil"
const endereco = "São Paulo"
const complemento = "Casa"
const cidade = "São Paulo"
const estado = "São Paulo"
const cep = "68625-590" //CEP aleatorio


export const enderecoEntregaValido = {
    nomeTeste: "Cadastro do endereço de entrega com dados válidos",
    input: {
        primeiroNome:  primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    }
    
}

export const enderecoEntregaAusenciaCampos = [
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar primeiro nome",
    input: {
        primeiroNome: "",
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "Nome é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar ultimo nome",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: "",
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "Sobrenome é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar empresa nome",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: "",
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "Endereço alterado com sucesso."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar pais",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: "",
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "País é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar endereço",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: "",
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "Endereço é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar complemento",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: "",
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: "Endereço alterado com sucesso."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar cidade",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: "",
        estado: estado,
        cep: cep
    },
    mensagemErro: "Cidade é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar estado",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: "",
        cep: cep
    },
    mensagemErro: "Estado é um campo obrigatório."
    },
    {
    nomeTeste: "Cadastro do endereço de entrega sem informar cep",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: ""
    },
    mensagemErro: "CEP é um campo obrigatório."
    }
]

export const enderecoEntregaValoresIncorretos = [
    {
    nomeTeste: "Cadastro do endereço de entrega informando nome invalido",
    input: {
        primeiroNome: "12345",
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: "",
        estado: estado,
        cep: cep
    },
    mensagemErro: ""
    },
    {
    nomeTeste: "Cadastro do endereço de entrega informando sobrenome invalido",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: "12345",
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    },
    mensagemErro: ""
    },
    {
    nomeTeste: "Cadastro do endereço de entrega informando cep invalido",
    input: {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        empresaNome: empresaNome,
        pais: pais,
        endereco: endereco,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: "111111111"
    },
    mensagemErro: ""
    }
]


