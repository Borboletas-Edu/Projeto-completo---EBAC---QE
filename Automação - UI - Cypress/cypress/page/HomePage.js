class HomePage {


    clicarCarrinho(){
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    }

    clicarListaDesejos(){
        cy.get('.fa-heart-o').click()
    }

    realizarBuscaProduto(nomeProduto){
        cy.get('#search-form-modal-kDMbv > .search-form > .btn').click()
        cy.get(".tbay-search form-control .input-sm .ui-autocomplete-input").type(nomeProduto)
        cy.get("cy.get('#searchformshow-kDMbv > .modal-dialog > .modal-content > .modal-body > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search')").click()
        cy.get('.product-block').first().click()
    }

}

export default new HomePage()