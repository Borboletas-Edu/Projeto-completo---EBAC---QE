/// <reference types = 'cypress'/>

class MinhaContaPage {


//extra

    acessarMinhaConta() {
        cy.visit('minha-conta')
    }

    retornarTextoAlerta() {
        return cy.get('.woocommerce-error').invoke('text')
    }

    sairConta(){
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').click()
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
}

export default new MinhaContaPage()