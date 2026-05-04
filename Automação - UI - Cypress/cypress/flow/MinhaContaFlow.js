import MinhaContaPage from "../page/MinhaContaPage";

class MinhaContaFlow {
    
    realizarLogin(usuario, senha){
        //Caso o usuario esteja vazio, não preenche o campo
        if(usuario){
            MinhaContaPage.informarUsuarioLogin(usuario)
        }
        //Caso o senha esteja vazio, não preenche o campo
        if (senha){
            MinhaContaPage.informarSenhaLogin(senha)
        }
        MinhaContaPage.clicarLogin()
    }

    realizarCadastro(email, senha){
        if(email){
            MinhaContaPage.informarUsuarioCadastro(email)
        }
        if(senha){
            MinhaContaPage.informarSenhaCadastro(senha)
        }
        MinhaContaPage.clicarCadastrar()

    }

    editarDetalhesConta(primeiroNome, ultimoNome, nomeExibicao, email, senhaAtual, senhaNova, senhaNovaConfirmacao){
        MinhaContaPage.informarPrimeiroNomeDetalhesConta(primeiroNome)
        MinhaContaPage.informarUltimoNomeDetalhesConta(ultimoNome)
        MinhaContaPage.informarNomeExibicaoDetalhesConta(nomeExibicao)
        MinhaContaPage.informarEmailDetalhesConta(email)
        MinhaContaPage.informarSenhaAtualDetalhesConta(senhaAtual)
        MinhaContaPage.informarNovaSenhaDetalhesConta(senhaNova)
        MinhaContaPage.informarConfirmarSenha(senhaNovaConfirmacao)
        MinhaContaPage.clicarSalvarAlteracoesDetalhesConta()
    }

    editarEnderecoEntrega(primeiroNome, ultimoNome, empresaNome, pais, endereco, complemento, cidade, estado, cep){
        MinhaContaPage.informarPrimeiroNomeEnderecoEntrega(primeiroNome)
        MinhaContaPage.informarUltimoNomeEnderecoEntrega(ultimoNome)
        MinhaContaPage.informarNomeEmpresaEnderecoEntrega(empresaNome)
        MinhaContaPage.informarPaisEnderecoEntrega(pais)
        MinhaContaPage.informarEnderecoEntrega(endereco)
        MinhaContaPage.informarComplementoEnderecoEntrega(complemento)
        MinhaContaPage.informarCidadeEnderecoEntrega(cidade)
        MinhaContaPage.informarEstadoEnderecoEntrega(estado)
        MinhaContaPage.informarCepEnderecoEntrega(cep)
        MinhaContaPage.clicarSalvarEnderecoEntrega()
    }

    

}

export default new MinhaContaFlow()