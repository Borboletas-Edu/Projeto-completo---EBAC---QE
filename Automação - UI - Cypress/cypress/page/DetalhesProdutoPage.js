/// <reference types = 'cypress'/>

class DetalhesProdutoPage{

    selecionarTamanho(tamanho){
        let tamanhoTratado = tamanho.toUpperCase()
        cy.get(`.button-variable-item-${tamanhoTratado}`).click()
    }   

    selecionarCor(cor){
        cy.get(`.button-variable-item-${cor}`).click() //Tem que ser em inglês e com a primeira letra em maiusculo
    }

    selecionarQuantidade(quantidade){
        cy.get('[name="quantity"]').clear()
        cy.get('[name="quantity"]').type(quantidade)
    }

    clicarListaDesejos(){
        cy.get('.yith-wcwl-icon').click()
    }

    clicarComparar(){
        cy.get('.compare').click()
    }

    clicarComprar(){
        cy.get('.single_add_to_cart_button').click()
    }

    clicarIrParaCarrinho(){
        cy.get('.woocommerce-message > .button').click()
    }

    retornarValorProduto(){
        return cy.get('.price > .woocommerce-Price-amount > bdi')
        .invoke('text')
        .then((texto) => Number(texto.replace(/[^\d,.-]/g, '').replace(',', '.').trim()));
    }
    

}

export default new DetalhesProdutoPage()