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

}

export default new MinhaContaFlow()