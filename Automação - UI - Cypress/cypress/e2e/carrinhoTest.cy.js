/// <reference types = 'cypress'/>

import { adicionar_produto_carrinho, adicionar_itens_diversos_carrinho  } from "../data/carrinhoData";
import DetalhesProdutoFlow from "../flow/DetalhesProdutoFlow";
import DetalhesProdutoPage from "../page/DetalhesProdutoPage";
import CarrinhoPage from "../page/CarrinhoPage";

describe('Testes na adição de produtos ao carrinho', () => {
    
    beforeEach(() => {
        cy.visit('/')
    });

    it('Teste - Adicionar um produto no carrinho', () => {
        const produto = adicionar_produto_carrinho
        DetalhesProdutoFlow.adicionarProdutoCarrinho(produto.nomeProduto, produto.input.tamanho, produto.input.cor, produto.input.quantidade)
        DetalhesProdutoPage.retornarValorProduto().then((valorProduto) => {
            const totalFormatado = (valorProduto * Number(produto.input.quantidade))
            .toFixed(2)
            .replace('.', ',');
            DetalhesProdutoPage.clicarIrParaCarrinho()
            CarrinhoPage.retornarNomeProduto(1).should('contain', `${produto.nomeProduto} - ${produto.input.tamanho}, ${produto.input.cor}`)
            CarrinhoPage.retornarValorTotalCarrinho().should('contain', `${totalFormatado}`)
        });
    });

    it('Teste - Adicionar varios  produtos no carrinho', () => {
        const nomesProdutos = [];
        const valoresProdutos = [];

        cy.wrap(adicionar_itens_diversos_carrinho).each((produto) => {
            DetalhesProdutoFlow.adicionarProdutoCarrinho(produto.nomeProduto, produto.input.tamanho, produto.input.cor, produto.input.quantidade)
            DetalhesProdutoPage.retornarValorProduto().then((valorUnitarioProduto) => {
                // Adiciona em listas separadas o valor total do item adicionado e o nome do produto
                const totalProdutoUnitario = (valorUnitarioProduto * Number(produto.input.quantidade))
                valoresProdutos.push(totalProdutoUnitario)
                nomesProdutos.push(`${produto.nomeProduto} - ${produto.input.tamanho}, ${produto.input.cor}`)
                });
        }).then(() => {
            DetalhesProdutoPage.clicarIrParaCarrinho()

            //Valida cada nome de produto da lista
            cy.wrap(nomesProdutos).each((nomeProduto, index) => {
                CarrinhoPage.retornarNomeProduto(index + 1).should('contain', nomeProduto)
            });

            //Faz a soma de todos os itens da lista e valida comparando com o valor total dos produtos
            const totalFormatado = valoresProdutos.reduce((acc, valor) => acc + valor, 0)
                .toFixed(2)
                .replace('.', ',');
            CarrinhoPage.retornarValorTotalCarrinho().should('contain', `${totalFormatado}`)
        })
    });

    it.only('Teste - Adicionar, remover e restaurar item do carrinho', () => {
        const produto = adicionar_produto_carrinho
        DetalhesProdutoFlow.adicionarProdutoCarrinho(produto.nomeProduto, produto.input.tamanho, produto.input.cor, produto.input.quantidade)
        DetalhesProdutoPage.clicarIrParaCarrinho()
        CarrinhoPage.removerItem(1)
        cy.get('.woocommerce-message').should('contain', produto.nomeProduto)
        cy.get('.woocommerce-message').should('contain', 'removido')
        cy.get('.cart-empty').should('contain', "Seu carrinho está vazio.")
        CarrinhoPage.restaurarItem()
        CarrinhoPage.retornarNomeProduto(1).should('contain', `${produto.nomeProduto} - ${produto.input.tamanho}, ${produto.input.cor}`)
        cy.get('input.input-text.qty').should('have.value', produto.input.quantidade)
    });
});
