/// <reference types = 'cypress'/>

class MinhaContaPage {

//extra

    acessarMinhaConta() {
        cy.visit('minha-conta')
    }

    retornarTextoAlerta() {
        return cy.get('.woocommerce-error').invoke('text')
    }

//login

    informarUsuarioLogin(usuario) {
        cy.get('[name="username"]').type(usuario)
    }
    
    informarSenhaLogin(senha) {
        cy.get('#password').type(senha)
    }
    
    clicarLogin() {
        cy.get('[name="login"]').click()
    }


//Cadastro

    informarUsuarioCadastro(email) {
        cy.get('[name="email"]').type(email)
    }
    
    informarSenhaCadastro(senha) {
        cy.get('#reg_password').type(senha)
    }
    
    clicarCadastrar() {
        cy.get('[name="register"]').click()
    }

//Pedidos



//Endereços



//Detalhes conta

    clicarDetalhesConta(){
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    }

    informarPrimeiroNomeDetalhesConta(primeiroNome){
        cy.get('[name="account_first_name"]').clear()
        if(primeiroNome){
            cy.get('[name="account_first_name"]').type(primeiroNome)
        }
    }

    informarUltimoNomeDetalhesConta(ultimoNome){
        cy.get('[name="account_last_name"]').clear()
        if(ultimoNome){
            cy.get('[name="account_last_name"]').type(ultimoNome)
        }
    }

    informarNomeExibicaoDetalhesConta(nomeExibicao){  
        cy.get('[name="account_display_name"]').clear()
        if(nomeExibicao){
            cy.get('[name="account_display_name"]').type(nomeExibicao)
        }
    }

    informarEmailDetalhesConta(email){
        cy.get('[name="account_email"]').clear()
        if(email){
            cy.get('[name="account_email"]').type(email)
        }   
    }

    informarSenhaAtualDetalhesConta(senha){
        cy.get('[name="password_current"]').clear()
        if(senha){
            cy.get('[name="password_current"]').type(senha)
        }
    }

    informarNovaSenhaDetalhesConta(novaSenha){
        cy.get('[name="password_1"]').clear()
        if(novaSenha){
            cy.get('[name="password_1"]').type(novaSenha)
        }
    }

    informarConfirmarSenha(novaSenhaConfirmar){
        cy.get('[name="password_2"]').clear()
        if(novaSenhaConfirmar){
            cy.get('[name="password_2"]').type(novaSenhaConfirmar)
        }
    }

    clicarSalvarAlteracoesDetalhesConta(){
        cy.get('[name="save_account_details"]').click()
    }

//Sair
    sairConta(){
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').click()
    } 
      
}
export default new MinhaContaPage()
