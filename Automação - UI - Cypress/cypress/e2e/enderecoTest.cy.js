/// <reference types = 'cypress'/>

import { enderecoEntregaValido, enderecoEntregaAusenciaCampos, enderecoEntregaValoresIncorretos, enderecoFaturamentoValido, enderecoFaturamentoAusenciaCampos, enderecoFaturamentoValoresIncorretos } from "../data/enderecosData";
import MinhaContaFlow from "../flow/MinhaContaFlow";
import MinhaContaPage from "../page/MinhaContaPage";
import Utils from "../support/Utils";

describe('Testes nos endereços salvos para a conta', () => {
    
    beforeEach(() => {
        MinhaContaPage.acessarMinhaConta()
        MinhaContaFlow.realizarCadastro(Utils.criarEmail(), Utils.criarSenha())
        MinhaContaPage.clicarEnderecos()    
    });

    it('Teste - Atualizar endereço de entrega com dados validos', () => {
        const dados = enderecoEntregaValido
        MinhaContaPage.clicarEditarEnderecoEntrega()
        MinhaContaFlow.editarEnderecoEntrega(
            dados.input.primeiroNome,
            dados.input.ultimoNome,
            dados.input.empresaNome,
            dados.input.pais,
            dados.input.endereco,
            dados.input.complemento,
            dados.input.cidade,
            dados.input.estado,
            dados.input.cep
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", "Endereço alterado com sucesso.")
    });

    enderecoEntregaAusenciaCampos.forEach(dados => {
        it(`Teste - ${dados.nomeTeste}`, () => {
            MinhaContaPage.clicarEditarEnderecoEntrega()
            MinhaContaFlow.editarEnderecoEntrega(
                dados.input.primeiroNome,
                dados.input.ultimoNome,
                dados.input.empresaNome,
                dados.input.pais,
                dados.input.endereco,
                dados.input.complemento,
                dados.input.cidade,
                dados.input.estado,
                dados.input.cep
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", dados.mensagemErro)
        });
    });
    
    enderecoEntregaValoresIncorretos.forEach(dados => {
        it(`Teste - ${dados.nomeTeste}`, () => {
            MinhaContaPage.clicarEditarEnderecoEntrega()
            MinhaContaFlow.editarEnderecoEntrega(
                dados.input.primeiroNome,
                dados.input.ultimoNome,
                dados.input.empresaNome,
                dados.input.pais,
                dados.input.endereco,
                dados.input.complemento,
                dados.input.cidade,
                dados.input.estado,
                dados.input.cep
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", dados.mensagemErro)
        });
    });

    it('Teste - Atualizar endereço de faturamento com dados validos', () => {
        const dados = enderecoFaturamentoValido
        MinhaContaPage.clicarEditarEnderecoFaturamento()
        MinhaContaFlow.editarEnderecoFaturamento(
            dados.input.primeiroNome,
            dados.input.ultimoNome,
            dados.input.empresaNome,
            dados.input.pais,
            dados.input.endereco,
            dados.input.complemento,
            dados.input.cidade,
            dados.input.estado,
            dados.input.cep,
            dados.input.telefone,
            dados.input.email
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", "Endereço alterado com sucesso.")
    });

    enderecoFaturamentoAusenciaCampos.forEach(dados => {
        it(`Teste - ${dados.nomeTeste}`, () => {
            MinhaContaPage.clicarEditarEnderecoEntrega()
            MinhaContaFlow.editarEnderecoEntrega(
                dados.input.primeiroNome,
                dados.input.ultimoNome,
                dados.input.empresaNome,
                dados.input.pais,
                dados.input.endereco,
                dados.input.complemento,
                dados.input.cidade,
                dados.input.estado,
                dados.input.cep, 
                dados.input.telefone,
                dados.input.email
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", dados.mensagemErro)
        });
    });

    enderecoFaturamentoValoresIncorretos.forEach(dados => {
        it(`Teste - ${dados.nomeTeste}`, () => {
            MinhaContaPage.clicarEditarEnderecoEntrega()
            MinhaContaFlow.editarEnderecoEntrega(
                dados.input.primeiroNome,
                dados.input.ultimoNome,
                dados.input.empresaNome,
                dados.input.pais,
                dados.input.endereco,
                dados.input.complemento,
                dados.input.cidade,
                dados.input.estado,
                dados.input.cep, 
                dados.input.telefone,
                dados.input.email
        )
        cy.get('.woocommerce-notices-wrapper').should("contain", dados.mensagemErro)
        });
    });
    
});