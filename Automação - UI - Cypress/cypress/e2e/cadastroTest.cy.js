/// <reference types = 'cypress'/>

import { cadastroDadosInvalidos, cadastroDadosValidos, cadastroEmailFormatoInvalido } from "../data/cadastroData";
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

    it(`Teste - ${cadastroEmailFormatoInvalido.nomeTeste}`, () => {
        MinhaContaFlow.realizarCadastro(cadastroEmailFormatoInvalido.input.usuario, cadastroEmailFormatoInvalido.input.senha)

        // Validação nativa do navegador (type="email"): o campo fica inválido e o envio é bloqueado.
        // Não comparamos o texto do balão, pois ele muda conforme o idioma do navegador.
        MinhaContaPage.campoEmailCadastro()
            .should('have.attr', 'type', 'email')
            .then(($input) => {
                const campo = $input[0]
                expect(campo.checkValidity(), 'campo de e-mail válido').to.be.false
                expect(campo.validity.typeMismatch, 'formato de e-mail inválido').to.be.true
                expect(campo.validationMessage, 'mensagem de validação do navegador').to.not.be.empty
            })

        // Como o formulário não é enviado, o WooCommerce não exibe erro e o usuário continua deslogado.
        cy.get('.woocommerce-error').should('not.exist')
        cy.get('.woocommerce-MyAccount-navigation').should('not.exist')
    });
    
    });
