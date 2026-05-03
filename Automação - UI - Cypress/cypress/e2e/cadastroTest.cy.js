/// <reference types = 'cypress'/>

import { cadastroDadosInvalidos, cadastroDadosValidos } from "../data/cadastroData";
import MinhaContaFlow from "../flow/MinhaContaFlow";
import MinhaContaPage from "../page/MinhaContaPage";

describe('Testes no cadastro de clientes', () => {
    
    beforeEach(() => {
        MinhaContaPage.acessarMinhaConta()
    });

    it('Teste - Cadastro valido', () => {
        MinhaContaFlow.realizarCadastro(cadastroDadosValidos.input.usuario, cadastroDadosValidos.input.senha)
        cy.get('.woocommerce-MyAccount-navigation-link--orders > a').should('be.visible')
    });

    cadastroDadosInvalidos.forEach(caso => {
        it(`Teste - ${caso.nomeTeste}`, () => {
            MinhaContaFlow.realizarCadastro(caso.input.usuario, caso.input.senha)
            MinhaContaPage.retornarTextoAlerta().should('contain', caso.mensagemErro)
        });
    });
    
    });
