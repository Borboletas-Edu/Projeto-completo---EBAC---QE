/// <reference types = 'cypress'/>

class ProdutosPage {

//Acesso

    acessarPaginaProdutos(){
        cy.visit("/produtos")
    }

//Seleção do produto

    selecionarProdutoBloco(numeroProduto){
        cy.get('.product-block > .block-inner').eq(numeroProduto-1).click()
    }
    
    clicarVerOpcoes(numeroProduto){
        cy.get('.product-block > .row > .col-lg-8 > .caption-list > .meta > .groups-button > .add-cart > .button').eq(numeroProduto).click()
    }

    clicarVisualizacaoRapida(numeroProduto){
        cy.get('.product-block > .row > .col-lg-8 > .caption-list > .meta > .groups-button > .quick-view > .button > span > .zmdi').eq(numeroProduto).click()
    }
   
    clicarSalvarProdutoListaDesejos(numeroProduto){
        cy.get('.product-block > .row > .col-lg-8 > .caption-list > .meta > .groups-button > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist > .yith-wcwl-icon').eq(numeroProduto).click()
    }
   
    clicarCompara(numeroProduto){
        cy.get('.product-block > .row > .col-lg-8 > .caption-list > .meta > .groups-button > .yith-compare > .compare').eq(numeroProduto).click()
    }
   

//intereções gerais

    alterarNumPagina(numeroPagina){
        cy.get(`:nth-child(${numeroPagina}) > .page-numbers`).click()
    }

    alternarVisualizacaoLista(){
        cy.get('.list > .fa').click()
    }

    alternarVisualizacaoBloco(){
        cy.get('.grid > .fa').click()
    }

}

export default new ProdutosPage()