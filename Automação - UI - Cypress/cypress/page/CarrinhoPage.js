/// <reference types = 'cypress'/>

class CarrinhoPage {
    
    removerItem(numProduto){
        cy.get('.remove > .fa').eq(numProduto-1).click()
    }

    restaurarItem(){
        cy.get('.restore-item').click()
    }

    alterarQuantidadeProduto(numProduto, quantidadeProduto){
        cy.get('input.qty').eq(numProduto-1).type(quantidadeProduto)
    }

    clicarConcluirCompra(){
        cy.get('.checkout-button').click()
    }

    adicionarCupom(){
        cy.get('[name="coupon_code"]').type(cupom)
        cy.get('[name="coupon_code"]').click()
    }

//Dados para validação

    retornarNomeProduto(numProduto){
        return cy.get('.product-name > a').eq(numProduto-1).invoke('text')
    }

    retornarValorTotalCarrinho(){
        return cy.get('strong > .woocommerce-Price-amount > bdi')
        .invoke('text')
        .then((texto) => {
            const valorTratado = texto.replace(/[^\d,.-]/g, '').trim();
            return valorTratado
        });
    }

}

export default new CarrinhoPage()