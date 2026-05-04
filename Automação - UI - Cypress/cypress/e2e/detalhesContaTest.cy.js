/// <reference types = 'cypress'/>

import { detalhes_pessoais_invalidos, detalhes_pessoais_validos, atualizar_senha_dados_validos } from "../data/detalhesContaData";
import MinhaContaFlow from "../flow/MinhaContaFlow";
import MinhaContaPage from "../page/MinhaContaPage";
import Utils from "../support/Utils";

describe('Testes nos detalhes da conta', () => {
    
    beforeEach(() => {
        MinhaContaPage.acessarMinhaConta() 
    });

    it(`Teste - Atualizar com dados validos as informações pessoais`, () => {
        const dados = detalhes_pessoais_validos
        MinhaContaFlow.realizarCadastro(dados.input.email, dados.input.senhaAtual)
        MinhaContaPage.clicarDetalhesConta()
        MinhaContaFlow.editarDetalhesConta(
            dados.input.primeiroNome, 
            dados.input.ultimoNome, 
            dados.input.nomeExibicao,
            dados.input.email,
            dados.input.senhaAtual,
            dados.input.senhaNova,
            dados.input.senhaNovaConfirmacao
        )
        cy.get('.woocommerce-MyAccount-navigation-link--dashboard > a').should("be.visible")
    });

    it("Teste - Atualizar com dados validos a senha", () => {
        const dados = atualizar_senha_dados_validos
        const email = dados.input.email
        MinhaContaFlow.realizarCadastro(email, dados.input.senhaAtual)
        MinhaContaPage.clicarDetalhesConta()
        MinhaContaFlow.editarDetalhesConta(
            dados.input.primeiroNome, 
            dados.input.ultimoNome, 
            dados.input.nomeExibicao,
            dados.input.email,
            dados.input.senhaAtual,
            dados.input.senhaNova,
            dados.input.senhaNovaConfirmacao
        )
        MinhaContaPage.sairConta()
        MinhaContaFlow.realizarLogin(email, dados.input.senhaNova)
        cy.get('.woocommerce-MyAccount-navigation-link--dashboard > a').should("be.visible")
    });

    detalhes_pessoais_invalidos.forEach(dados => {
        it(`Teste - ${dados.nomeTeste}`, () => {
            MinhaContaFlow.realizarCadastro(Utils.criarEmail(), Utils.criarSenha())
            MinhaContaPage.clicarDetalhesConta()
            MinhaContaFlow.editarDetalhesConta(
                dados.input.primeiroNome, 
                dados.input.ultimoNome, 
                dados.input.nomeExibicao,
                dados.input.email,
                dados.input.senhaAtual,
                dados.input.senhaNova,
                dados.input.senhaNovaConfirmacao
            )
            MinhaContaPage.retornarTextoAlerta().should("contain", dados.mensagemErro)
        });
    });

});