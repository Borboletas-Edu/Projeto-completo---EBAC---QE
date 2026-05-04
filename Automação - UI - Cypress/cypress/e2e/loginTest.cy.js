/// <reference types = 'cypress'/>

import { loginSemCamposObrigatorios } from "../data/loginData";
import MinhaContaFlow from "../flow/MinhaContaFlow";
import MinhaContaPage from "../page/MinhaContaPage";
import Utils from "../support/Utils";

describe('Testes no login', () => {
    let email
    let senha
    let emailErrado
    let senhaErrada

    beforeEach(() => {
        MinhaContaPage.acessarMinhaConta()
        email = Utils.criarEmail()
        senha = Utils.criarSenha()
        emailErrado = 'emailErrado123@emailErrado.com'
        senhaErrada = "SenhaErrada"
        MinhaContaFlow.realizarCadastro(email, senha)
        MinhaContaPage.sairConta()
    })

    it('Teste - Login valido', () => {
        MinhaContaFlow.realizarLogin(email, senha)
        cy.get('.woocommerce-MyAccount-navigation-link--orders > a').should('be.visible')
    })

    it('Teste - Login com senha errada', () => {
        MinhaContaFlow.realizarLogin(email, senhaErrada)
        MinhaContaPage.retornarTextoAlerta().should("contain", `A senha fornecida para o e-mail ${email} está incorreta. Perdeu a senha?`)
    })

    it('Teste - Login com usuario errado', () => {
        MinhaContaFlow.realizarLogin(emailErrado, senha)
        MinhaContaPage.retornarTextoAlerta().should("contain", "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.")
    })

    it('Teste - Login com usuario e senha errados', () => {
        MinhaContaFlow.realizarLogin(emailErrado, senhaErrada)
        MinhaContaPage.retornarTextoAlerta().should("contain", "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.")
    })

    loginSemCamposObrigatorios.forEach(caso => {
        it(`Teste - ${caso.nomeTeste}`, () => {
            MinhaContaFlow.realizarLogin(caso.input.usuario, caso.input.senha)
            MinhaContaPage.retornarTextoAlerta().should("contain", caso.mensagemErro)
        })
    })

 })
